/**
 * Amthromax AI Data Privacy & Secret Redaction Engine
 * 
 * Protects sensitive enterprise data, API keys, credentials, and PII
 * before prompts or documents are passed to third-party AI model providers.
 */

export interface AIPrivacyConfig {
  redactSecretsBeforeInference: boolean;
  redactPiiBeforeInference: boolean;
  disableProviderTraining: boolean;
  zeroDataRetentionMode: boolean;
}

export const DEFAULT_AI_PRIVACY_CONFIG: AIPrivacyConfig = {
  redactSecretsBeforeInference: true,
  redactPiiBeforeInference: true,
  disableProviderTraining: true, // Request AI providers to not use data for training
  zeroDataRetentionMode: true,
};

export const AI_PRIVACY_STORAGE_KEY = "amthromax_ai_privacy_config";

export function getAIPrivacyConfig(): AIPrivacyConfig {
  try {
    const saved = localStorage.getItem(AI_PRIVACY_STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_AI_PRIVACY_CONFIG, ...JSON.parse(saved) };
    }
  } catch {
    // Fallback
  }
  return DEFAULT_AI_PRIVACY_CONFIG;
}

export function saveAIPrivacyConfig(config: Partial<AIPrivacyConfig>): AIPrivacyConfig {
  const updated = { ...getAIPrivacyConfig(), ...config };
  try {
    localStorage.setItem(AI_PRIVACY_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore
  }
  return updated;
}

/**
 * Secret & Credential Redaction Patterns
 * Prevents API keys, Bearer tokens, passwords, private keys, and authorization headers from being sent to LLMs.
 */
const SECRET_REDACTION_RULES: { name: string; pattern: RegExp; replacement: string }[] = [
  {
    name: "Amthromax API Key",
    pattern: /\bamx_[a-zA-Z0-9_-]{20,}\b/g,
    replacement: "[REDACTED_AMTHROMAX_API_KEY]",
  },
  {
    name: "OpenAI API Key",
    pattern: /\bsk-[a-zA-Z0-9_]{32,}\b/g,
    replacement: "[REDACTED_OPENAI_KEY]",
  },
  {
    name: "GitHub Token",
    pattern: /\bgh[pousr]_[a-zA-Z0-9]{36}\b/g,
    replacement: "[REDACTED_GITHUB_TOKEN]",
  },
  {
    name: "Bearer Token",
    pattern: /Bearer\s+[a-zA-Z0-9\._\-]+/gi,
    replacement: "Bearer [REDACTED_TOKEN]",
  },
  {
    name: "Generic Password Field",
    pattern: /(["']?password["']?\s*:\s*["'])([^"']+)(["'])/gi,
    replacement: '$1[REDACTED_PASSWORD]$3',
  },
  {
    name: "RSA/EC Private Key",
    pattern: /-----BEGIN (RSA|EC|OPENSSH|PRIVATE) KEY-----[\s\S]+?-----END \1 KEY-----/g,
    replacement: "[REDACTED_PRIVATE_KEY]",
  },
  {
    name: "Credit Card Pattern",
    pattern: /\b(?:\d[ -]*?){13,16}\b/g,
    replacement: "[REDACTED_PAYMENT_CARD]",
  },
];

/**
 * PII Redaction Rules (Optional enhancement)
 */
const PII_REDACTION_RULES: { name: string; pattern: RegExp; replacement: string }[] = [
  {
    name: "Aadhaar Number Pattern",
    pattern: /\b[2-9]{1}\d{3}\s?\d{4}\s?\d{4}\b/g,
    replacement: "[REDACTED_AADHAAR_NUMBER]",
  },
  {
    name: "PAN Card Pattern",
    pattern: /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g,
    replacement: "[REDACTED_PAN_CARD]",
  },
];

/**
 * Sanitizes input text before dispatching to third-party AI models.
 */
export function sanitizePromptForAIPrivacy(prompt: string): { sanitizedPrompt: string; redactedCount: number } {
  if (!prompt) return { sanitizedPrompt: "", redactedCount: 0 };

  const config = getAIPrivacyConfig();
  let sanitized = prompt;
  let redactedCount = 0;

  if (config.redactSecretsBeforeInference) {
    for (const rule of SECRET_REDACTION_RULES) {
      const matches = sanitized.match(rule.pattern);
      if (matches) {
        redactedCount += matches.length;
        sanitized = sanitized.replace(rule.pattern, rule.replacement);
      }
    }
  }

  if (config.redactPiiBeforeInference) {
    for (const rule of PII_REDACTION_RULES) {
      const matches = sanitized.match(rule.pattern);
      if (matches) {
        redactedCount += matches.length;
        sanitized = sanitized.replace(rule.pattern, rule.replacement);
      }
    }
  }

  return { sanitizedPrompt: sanitized, redactedCount };
}
