/**
 * Amthromax Data Retention Configuration & Lifecycle Utilities
 * Centralized data retention thresholds and automated cleanup lifecycle logic.
 */

export interface RetentionPolicy {
  accountDataDays: number;
  sessionLogsDays: number;
  auditLogsDays: number;
  aiConversationsDays: number;
  uploadedFilesDays: number;
  deletedAccountsGraceDays: number;
  analyticsEventsDays: number;
}

export const DEFAULT_RETENTION_POLICY: RetentionPolicy = {
  accountDataDays: 365,
  sessionLogsDays: 30,
  auditLogsDays: 180,
  aiConversationsDays: 90,
  uploadedFilesDays: 365,
  deletedAccountsGraceDays: 30, // 30-day grace period post deletion request before hard scrub
  analyticsEventsDays: 90,
};

export const DATA_RETENTION_STORAGE_KEY = "amthromax_retention_policy";

export function getRetentionPolicy(): RetentionPolicy {
  try {
    const saved = localStorage.getItem(DATA_RETENTION_STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_RETENTION_POLICY, ...JSON.parse(saved) };
    }
  } catch {
    // Fallback to default
  }
  return DEFAULT_RETENTION_POLICY;
}

export function saveRetentionPolicy(policy: Partial<RetentionPolicy>): RetentionPolicy {
  const updated = { ...getRetentionPolicy(), ...policy };
  try {
    localStorage.setItem(DATA_RETENTION_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage errors
  }
  return updated;
}

/**
 * Evaluates whether a timestamp has exceeded a given retention threshold.
 */
export function isExceededRetention(timestampMs: number, retentionDays: number): boolean {
  const ageMs = Date.now() - timestampMs;
  const maxAgeMs = retentionDays * 24 * 60 * 60 * 1000;
  return ageMs > maxAgeMs;
}
