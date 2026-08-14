/**
 * Amthromax Global Privacy Request Portal Service
 * Manages Data Subject Access Requests (DSAR) across GDPR, CCPA/CPRA, DPDP, LGPD, and PIPEDA.
 */

import { logAuditEvent } from "./auditLogger";
import { type PrivacyFrameworkId } from "./globalPrivacyEngine";

export type PrivacyRequestType =
  | "ACCESS"
  | "RECTIFICATION"
  | "ERASURE"
  | "PORTABILITY"
  | "RESTRICTION"
  | "OBJECTION"
  | "CONSENT_WITHDRAWAL"
  | "CCPA_OPT_OUT_SALE_SHARE";

export type PrivacyRequestStatus =
  | "PENDING"
  | "VERIFYING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REJECTED"
  | "CANCELLED";

export interface PrivacyRequestItem {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  type: PrivacyRequestType;
  status: PrivacyRequestStatus;
  jurisdiction: PrivacyFrameworkId;
  description?: string;
  createdAt: string;
  updatedAt: string;
  targetResolutionDate: string; // SLA date (30 days GDPR/DPDP, 45 days CCPA)
  verificationStatus: "UNVERIFIED" | "VERIFIED_EMAIL" | "VERIFIED_MFA";
  metadata?: Record<string, any>;
}

export const PRIVACY_REQUESTS_STORAGE_KEY = "amthromax_privacy_subject_requests";

export function getStoredPrivacyRequests(): PrivacyRequestItem[] {
  try {
    const saved = localStorage.getItem(PRIVACY_REQUESTS_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Fallback
  }
  return [];
}

export function submitPrivacyRequest(
  userId: string,
  userEmail: string,
  userName: string,
  type: PrivacyRequestType,
  jurisdiction: PrivacyFrameworkId = "GLOBAL_BASELINE",
  description?: string
): PrivacyRequestItem {
  const requests = getStoredPrivacyRequests();

  const now = new Date();
  const slaDays = jurisdiction === "US_CA_CCPA" ? 45 : 30;
  const targetDate = new Date(now.getTime() + slaDays * 24 * 60 * 60 * 1000);

  const newRequest: PrivacyRequestItem = {
    id: `prq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    userId,
    userEmail,
    userName,
    type,
    status: "PENDING",
    jurisdiction,
    description,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    targetResolutionDate: targetDate.toISOString(),
    verificationStatus: "VERIFIED_EMAIL",
  };

  const updatedRequests = [newRequest, ...requests];

  try {
    localStorage.setItem(PRIVACY_REQUESTS_STORAGE_KEY, JSON.stringify(updatedRequests));
  } catch {
    // Silent catch
  }

  logAuditEvent("PRIVACY_REQUEST_SUBMITTED", userId, userEmail, {
    requestId: newRequest.id,
    type,
    jurisdiction,
    targetResolutionDate: newRequest.targetResolutionDate,
  });

  return newRequest;
}

export function getPrivacyRequestById(requestId: string): PrivacyRequestItem | null {
  const requests = getStoredPrivacyRequests();
  return requests.find((r) => r.id === requestId) || null;
}
