/**
 * Amthromax Global Privacy Control (GPC) Engine
 * Detects browser GPC signals (`navigator.globalPrivacyControl`) and auto-triggers opt-out preferences.
 */

import { logAuditEvent } from "./auditLogger";

export interface GPCStatus {
  isGpcDetected: boolean;
  signalSource: "navigator.globalPrivacyControl" | "header" | "none";
  optOutApplied: boolean;
  detectedAt: string;
}

export const GPC_STATUS_STORAGE_KEY = "amthromax_gpc_signal_status";

/**
 * Detects whether the user's browser transmits a Global Privacy Control (GPC) opt-out signal.
 */
export function detectGPC(): GPCStatus {
  let isGpcDetected = false;
  let signalSource: GPCStatus["signalSource"] = "none";

  if (typeof window !== "undefined") {
    // Check standard W3C GPC property
    const nav = window.navigator as any;
    if (nav.globalPrivacyControl === true || nav.globalPrivacyControl === "1" || (window as any).globalPrivacyControl === true) {
      isGpcDetected = true;
      signalSource = "navigator.globalPrivacyControl";
    }
  }

  const status: GPCStatus = {
    isGpcDetected,
    signalSource,
    optOutApplied: isGpcDetected,
    detectedAt: new Date().toISOString(),
  };

  try {
    if (isGpcDetected) {
      localStorage.setItem(GPC_STATUS_STORAGE_KEY, JSON.stringify(status));
    }
  } catch {
    // Storage silent catch
  }

  return status;
}

/**
 * Ensures GPC opt-out signal automatically overrides optional marketing and analytics trackers.
 */
export function syncGPCWithConsent(userAnalytics: boolean, userMarketing: boolean): { analytics: boolean; marketing: boolean; gpcActive: boolean } {
  const gpc = detectGPC();
  if (gpc.isGpcDetected) {
    // GPC active: Force disable optional tracking
    logAuditEvent("GPC_SIGNAL_HONORED", "current_user", undefined, {
      signalSource: gpc.signalSource,
      action: "AUTO_OPT_OUT_ANALYTICS_AND_MARKETING",
    });
    return {
      analytics: false,
      marketing: false,
      gpcActive: true,
    };
  }

  return {
    analytics: userAnalytics,
    marketing: userMarketing,
    gpcActive: false,
  };
}
