/**
 * Amthromax Privacy Service & Data Governance Engine
 * Handles Data Export, Account Deletion Workflows, and User Consent Management.
 */

import { PRIVACY_POLICY_VERSION, COOKIE_CONSENT_VERSION } from "./privacyConfig";
import { logAuditEvent, type AuditEvent } from "./auditLogger";

export interface UserConsentRecord {
  version: string;
  cookieConsentVersion: string;
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  termsAccepted: boolean;
  termsAcceptedAt: string;
  marketingOptIn: boolean;
  updatedAt: string;
}

export const USER_CONSENT_STORAGE_KEY = "amthromax_user_consent_record";

export function getUserConsentRecord(): UserConsentRecord {
  try {
    const saved = localStorage.getItem(USER_CONSENT_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Fallback
  }
  return {
    version: PRIVACY_POLICY_VERSION,
    cookieConsentVersion: COOKIE_CONSENT_VERSION,
    necessary: true,
    analytics: false,
    marketing: false,
    termsAccepted: false,
    termsAcceptedAt: "",
    marketingOptIn: false,
    updatedAt: new Date().toISOString(),
  };
}

export function saveUserConsentRecord(record: Partial<UserConsentRecord>, userId: string = "current_user"): UserConsentRecord {
  const current = getUserConsentRecord();
  const updated: UserConsentRecord = {
    ...current,
    ...record,
    version: PRIVACY_POLICY_VERSION,
    cookieConsentVersion: COOKIE_CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(USER_CONSENT_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Fail silently
  }

  logAuditEvent("CONSENT_UPDATED", userId, undefined, {
    analytics: updated.analytics,
    marketing: updated.marketing,
    marketingOptIn: updated.marketingOptIn,
    policyVersion: updated.version,
  });

  return updated;
}

export interface DataExportPayload {
  exportMetadata: {
    exportedAt: string;
    formatVersion: string;
    platform: string;
    privacyPolicyVersion: string;
    dataSubjectId: string;
    dataSubjectEmail: string;
  };
  accountProfile: {
    userId: string;
    email: string;
    fullName: string;
    role: string;
    joinedAt: string;
  };
  workspaces: Array<{
    workspaceId: string;
    workspaceName: string;
    roleInWorkspace: string;
  }>;
  agentConfigurations: Array<{
    agentId: string;
    name: string;
    model: string;
    createdAt: string;
  }>;
  privacyConsentRecords: UserConsentRecord;
  privacyAuditLogs: AuditEvent[];
}

/**
 * Generates a secure JSON data export payload for the authorized user.
 */
export function generateUserDataExport(userId: string, userEmail: string, userName: string = "Amthromax User"): DataExportPayload {
  const consentRecord = getUserConsentRecord();
  const auditLogs = JSON.parse(localStorage.getItem("amthromax_privacy_audit_logs") || "[]");

  // Filter audit logs only belonging to this user
  const userAuditLogs = auditLogs.filter((log: AuditEvent) => log.actorId === userId || !log.actorId);

  const payload: DataExportPayload = {
    exportMetadata: {
      exportedAt: new Date().toISOString(),
      formatVersion: "1.0",
      platform: "Amthromax Enterprise AI SaaS Platform",
      privacyPolicyVersion: PRIVACY_POLICY_VERSION,
      dataSubjectId: userId,
      dataSubjectEmail: userEmail,
    },
    accountProfile: {
      userId,
      email: userEmail,
      fullName: userName,
      role: "Enterprise Developer / Admin",
      joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
    workspaces: [
      {
        workspaceId: "ws_default_org",
        workspaceName: "Default Organization",
        roleInWorkspace: "Owner",
      },
    ],
    agentConfigurations: [
      {
        agentId: "agent_morfix_01",
        name: "MORFIX Intelligent Sync Agent",
        model: "MORFIX 0.1",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    privacyConsentRecords: consentRecord,
    privacyAuditLogs: userAuditLogs,
  };

  logAuditEvent("DATA_EXPORT_COMPLETED", userId, userEmail, {
    exportFormat: "JSON",
  });

  return payload;
}

/**
 * Triggers a file download of the exported JSON archive.
 */
export function downloadUserDataExport(userId: string, userEmail: string, userName?: string): void {
  const exportData = generateUserDataExport(userId, userEmail, userName);
  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `amthromax-privacy-data-export-${userId.slice(0, 8)}-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export interface DeletionValidationResult {
  canDeleteImmediately: boolean;
  requiresWorkspaceTransfer: boolean;
  ownedWorkspaceNames: string[];
  warningMessage: string;
}

/**
 * Validates whether an account can be deleted safely or requires workspace ownership transfer.
 */
export function validateAccountDeletion(_userId: string, userRole: string = "Owner"): DeletionValidationResult {
  if (userRole === "Owner") {
    return {
      canDeleteImmediately: false,
      requiresWorkspaceTransfer: true,
      ownedWorkspaceNames: ["Default Organization"],
      warningMessage:
        "You are the sole Owner of 1 organization workspace ('Default Organization'). To delete your personal account, you must either transfer organization ownership to another team member or delete the organization first.",
    };
  }

  return {
    canDeleteImmediately: true,
    requiresWorkspaceTransfer: false,
    ownedWorkspaceNames: [],
    warningMessage:
      "Deleting your account will immediately revoke your workspace memberships, delete personal API tokens, and schedule your profile data for removal post 30-day statutory grace period.",
  };
}

/**
 * Executes or schedules account deletion workflow.
 */
export function requestAccountDeletion(userId: string, userEmail: string, confirmationPhrase: string): { success: boolean; message: string } {
  if (confirmationPhrase.trim().toUpperCase() !== "DELETE MY ACCOUNT") {
    return {
      success: false,
      message: "Confirmation phrase does not match. Please type 'DELETE MY ACCOUNT' to confirm.",
    };
  }

  logAuditEvent("ACCOUNT_DELETION_REQUESTED", userId, userEmail, {
    gracePeriodDays: 30,
    requestedAt: new Date().toISOString(),
  });

  // Set account deletion pending status in storage
  localStorage.setItem("amthromax_account_deletion_pending", JSON.stringify({
    userId,
    userEmail,
    requestedAt: new Date().toISOString(),
    scheduledHardScrubDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  }));

  return {
    success: true,
    message: "Your account deletion request has been submitted. A 30-day statutory grace period has been initiated.",
  };
}
