/**
 * Amthromax Privacy & Security Audit Logger
 * Logs audit events safely without capturing plaintext passwords, secrets, or raw payload credentials.
 */

export type AuditActionType =
  | "CONSENT_GRANTED"
  | "CONSENT_UPDATED"
  | "CONSENT_WITHDRAWN"
  | "DATA_EXPORT_REQUESTED"
  | "DATA_EXPORT_COMPLETED"
  | "ACCOUNT_DELETION_REQUESTED"
  | "ACCOUNT_DELETION_CANCELLED"
  | "ACCOUNT_DELETED"
  | "PRIVACY_SETTINGS_CHANGED"
  | "API_KEY_CREATED"
  | "API_KEY_REVOKED"
  | "AI_PRIVACY_CONFIG_UPDATED"
  | "GPC_SIGNAL_HONORED"
  | "PRIVACY_REQUEST_SUBMITTED";

export interface AuditEvent {
  id: string;
  action: AuditActionType;
  actorId: string;
  actorEmail?: string;
  timestamp: string;
  details?: Record<string, any>;
  ipAddress?: string;
}

const AUDIT_LOG_STORAGE_KEY = "amthromax_privacy_audit_logs";

export function logAuditEvent(
  action: AuditActionType,
  actorId: string,
  actorEmail?: string,
  details?: Record<string, any>
): AuditEvent {
  const event: AuditEvent = {
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    action,
    actorId,
    actorEmail,
    timestamp: new Date().toISOString(),
    details: sanitizeAuditDetails(details),
    ipAddress: "Client Execution Session",
  };

  try {
    const existing = getAuditLogs();
    const updated = [event, ...existing].slice(0, 100); // Keep latest 100 logs locally
    localStorage.setItem(AUDIT_LOG_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Fail silently in case storage is disabled
  }

  return event;
}

export function getAuditLogs(): AuditEvent[] {
  try {
    const saved = localStorage.getItem(AUDIT_LOG_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Fallback
  }
  return [];
}

/**
 * Sanitizes details object to prevent passwords or secrets from leaking into audit trails.
 */
function sanitizeAuditDetails(details?: Record<string, any>): Record<string, any> | undefined {
  if (!details) return undefined;
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(details)) {
    const lowerKey = key.toLowerCase();
    if (
      lowerKey.includes("password") ||
      lowerKey.includes("secret") ||
      lowerKey.includes("token") ||
      lowerKey.includes("key")
    ) {
      sanitized[key] = "[REDACTED_SECRET]";
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}
