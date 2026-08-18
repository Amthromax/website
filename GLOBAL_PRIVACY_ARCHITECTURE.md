# AMTHROMAX — GLOBAL PRIVACY & DATA PROTECTION ARCHITECTURE

## Executive Summary
Amthromax implements a production-grade, multi-jurisdictional **Global Privacy & Data Protection Architecture**. Headquartered in the United States (Amthromax Inc., San Francisco, CA), this architecture extends full technical mechanisms to support major international privacy regimes including **US CCPA/CPRA, EU GDPR, UK GDPR, India DPDP, Brazil LGPD, Canada PIPEDA, Australia Privacy Act, and Global Baseline controls**.

> [!IMPORTANT]
> **Legal Review Notice:** Amthromax provides software privacy controls designed to support compliance requirements. The application does not claim automatic legal certification without formal corporate counsel audit. All jurisdiction-specific regulatory decisions requiring business confirmation are tagged as `LEGAL REVIEW REQUIRED`.

---

## 1. Central Jurisdiction & Privacy Engine
The system features an automated Jurisdiction Router (`src/lib/globalPrivacyEngine.ts`) that determines the appropriate privacy framework based on:
1. User account country & billing profile
2. Browser locale & timezone (`Intl.DateTimeFormat().resolvedOptions().timeZone`)
3. Global Privacy Control (GPC) signals
4. User manual framework switcher

### Supported Frameworks
| Framework ID | Name | Region | Default Retention | Legal Basis Required | GPC Respected |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `EU_GDPR` | General Data Protection Regulation | European Union / EEA | 90 Days | Yes (Art 6) | Yes |
| `UK_GDPR` | UK Data Protection Act 2018 | United Kingdom | 90 Days | Yes (UK Art 6) | Yes |
| `US_CA_CCPA` | CCPA / CPRA | California, USA | 180 Days | No | Yes (Opt-Out) |
| `INDIA_DPDP` | Digital Personal Data Protection Act | India | 90 Days | No | Yes |
| `BRAZIL_LGPD` | Lei Geral de Proteção de Dados | Brazil | 90 Days | Yes | Yes |
| `CANADA_PIPEDA` | PIPEDA | Canada | 180 Days | No | Yes |
| `AUSTRALIA_PRIVACY_ACT` | Privacy Act 1988 & APPs | Australia | 180 Days | No | Yes |
| `GLOBAL_BASELINE` | Amthromax Universal Baseline | International | 180 Days | No | Yes |

---

## 2. Global Privacy Control (GPC) Engine
- **Standards-Based Detection (`src/lib/gpcEngine.ts`):** Listens to W3C `navigator.globalPrivacyControl` browser signals.
- **Auto Opt-Out Enforcement:** Automatically overrides optional marketing and analytics trackers without requiring explicit prompt dismissal.
- **Audit Ledger:** Records GPC signal detection in the immutable privacy audit log without collecting sensitive user tracking payloads.

---

## 3. Privacy Subject Rights & DSAR Portal
Users can access `/privacy-center` and submit formal Data Subject Access Requests at `/privacy/request`.

### Supported Rights & Request Types:
- **`ACCESS`**: Download comprehensive summary of personal data.
- **`RECTIFICATION`**: Correct inaccurate or incomplete user records.
- **`ERASURE`**: Trigger 30-day statutory deletion grace workflow.
- **`PORTABILITY`**: Download machine-readable JSON profile data export.
- **`RESTRICTION`**: Restrict processing for specific features.
- **`OBJECTION`**: Object to processing based on legitimate interests.
- **`CONSENT_WITHDRAWAL`**: Revoke marketing and analytics consent.
- **`CCPA_OPT_OUT_SALE_SHARE`**: Exercise California Do Not Sell/Share rights.

---

## 4. AI Gateway Privacy & Secret Redaction
- **AI Gateway Route (`src/lib/aiPrivacy.ts`):** Scrubs high-risk API keys, JWT tokens, AWS access keys, and passwords before transmitting prompts to LLM inference providers.
- **Provider Policy:** Operates under Commercial API terms featuring Zero Data Retention (OpenAI, Anthropic, Google Gemini API). User inputs are never used for base model training.

---

## 5. Third-Party Subprocessor Registry
| Subprocessor | Category | Purpose | Region | Safeguard |
| :--- | :--- | :--- | :--- | :--- |
| **Amazon Web Services** | Infrastructure | Micro-VM execution & vector storage | US-East / EU-Central | EU SCCs & UK IDTA |
| **Supabase Inc.** | Auth & Database | Profile storage & RLS enforcement | US / EU | EU SCCs |
| **OpenAI LLC** | LLM Inference | Model reasoning for agent workflows | United States | Zero Data Retention DPA |
| **Anthropic PBC** | LLM Inference | Code synthesis & document reasoning | United States | Commercial API Terms |
| **Google LLC (Gemini)** | LLM Inference | Multimodal agent execution | Global / US | Google Cloud DPA |
| **Stripe Inc.** | Payment Gateway | Invoicing & card tokenization | Global / US | Stripe DPA |

---

## 6. Multi-Tenant Security & Isolation
- **Row Level Security (RLS):** Every privacy query enforces strict `userId` and `workspaceId` ownership checks.
- **Data Export Security:** Export payloads (`src/lib/privacyService.ts`) never contain plaintext passwords, API secrets, or cross-tenant workspace content.
