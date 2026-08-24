# Amthromax SEO Production Release Checklist

## Pre-Release Verification Checklist

### 1. Corporate Identity & Naming
- [x] Company name `Amthromax` spelled consistently across all components, metadata, and schemas.
- [x] Canonical domain `https://amthromax.com` configured without trailing slash mismatches.
- [x] Official contact email `contact@amthromax.com` and social profiles verified.

### 2. Structured Data (JSON-LD)
- [x] `Organization` schema injected with `@id: "https://amthromax.com/#organization"`.
- [x] `WebSite` schema injected with `@id: "https://amthromax.com/#website"` and `SearchAction`.
- [x] `SoftwareApplication` schema for Codehoomer AI (`https://amthromax.com/codehoomer#software`).
- [x] `SoftwareApplication` / `Product` schemas for all products in catalog.
- [x] `BlogPosting` schema on all individual blog post routes.
- [x] Validated JSON-LD syntax using Google Rich Results Test & Schema Validator.

### 3. Metadata & Canonical URLs
- [x] Page titles formatted with clean brand suffixes (`Title | Amthromax`).
- [x] Unique meta descriptions configured for all key routes.
- [x] Canonical `<link rel="canonical" href="..." />` tags resolved dynamically via `SEO.tsx`.
- [x] OpenGraph (`og:title`, `og:description`, `og:image`, `og:url`) and Twitter cards set.

### 4. Search Engine Crawling & Sitemaps
- [x] `public/robots.txt` permits major search engine and AI LLM crawlers.
- [x] `public/robots.txt` disallows private/auth routes (`/login`, `/register`, `/auth/`, `/profile`).
- [x] `public/robots.txt` points to `https://amthromax.com/sitemap.xml`.
- [x] `scripts/generate-sitemap.cjs` executed and `public/sitemap.xml` updated with all core routes.

### 5. Verification & Testing
- [x] `npm run lint` passes without errors.
- [x] `npm run build` executes cleanly (`tsc -b && vite build && node scripts/generate-sitemap.cjs`).
