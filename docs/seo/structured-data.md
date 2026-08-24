# Amthromax JSON-LD Structured Data Documentation

## Overview
Amthromax implements JSON-LD (JavaScript Object Notation for Linked Data) structured data following Schema.org standards to communicate company identity, website architecture, products, software applications, and articles to search engines.

---

## Centralized Configuration (`src/config/company.ts`)

All entity identifiers, official URLs, social links, logos, and descriptions are maintained in `src/config/company.ts` to ensure strict single-source-of-truth consistency.

---

## Primary Schemas Implemented

### 1. Organization Schema
- **Target Node**: `@id: "https://amthromax.com/#organization"`
- **Schema Type**: `Organization`
- **Fields**: `name`, `legalName`, `url`, `logo`, `description`, `email`, `sameAs`

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://amthromax.com/#organization",
  "name": "Amthromax",
  "legalName": "Amthromax Inc.",
  "url": "https://amthromax.com",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://amthromax.com/#logo",
    "url": "https://amthromax.com/images/logo.png",
    "caption": "Amthromax"
  },
  "description": "Amthromax is an AI software and technology company building enterprise AI platforms, intelligent agents, intelligent automation, developer infrastructure, APIs, and next-generation software systems.",
  "email": "contact@amthromax.com",
  "sameAs": [
    "https://linkedin.com/company/amthromax",
    "https://github.com/amthromax",
    "https://x.com/amthromax"
  ]
}
```

---

### 2. WebSite & SearchAction Schema
- **Target Node**: `@id: "https://amthromax.com/#website"`
- **Schema Type**: `WebSite`
- **Fields**: `url`, `name`, `description`, `publisher`, `potentialAction` (SearchAction)

---

### 3. Flagship SoftwareApplication Schemas
- **Codehoomer AI**: `@id: "https://amthromax.com/codehoomer#software"` (`SoftwareApplication`)
- **Helleious AI**: `@id: "https://amthromax.com/helleious#software"` (`SoftwareApplication`)
- **Orarqlow AI**: `@id: "https://amthromax.com/orarqlow#software"` (`SoftwareApplication`)
- **Relationship**: All products explicitly declare `@id: "https://amthromax.com/#organization"` as `creator` and `publisher`.

---

### 4. BlogPosting & Article Schema
- **Blog Posts**: `@id: "https://amthromax.com/blog/{id}/#article"` (`BlogPosting`)
- **Author & Publisher**: Explicitly attributes post author and company publisher ID.

---

## Validation Procedures

1. **Google Rich Results Test**: [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)
2. **Schema Markup Validator**: [https://validator.schema.org/](https://validator.schema.org/)
