# Google Search Console Verification & Crawl Setup Guide

## Overview
This document provides step-by-step instructions for site operators to verify ownership of `https://amthromax.com` in Google Search Console (GSC), submit sitemaps, inspect URLs, and optimize indexation.

---

## Step 1: Add Domain Property to Google Search Console

1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Select **Add Property** → Choose **Domain** property type.
3. Enter `amthromax.com` (this covers `https://amthromax.com`, `http://`, `www`, and subdomains).

---

## Step 2: Verification Methods

### Method A: DNS TXT Record (Recommended for Domain Property)
1. Copy the TXT record provided by Google (e.g., `google-site-verification=xxxx...`).
2. Log into your DNS provider (e.g., Cloudflare, Namecheap, Route 53).
3. Add a `TXT` record:
   - **Host/Name**: `@`
   - **Value**: `google-site-verification=xxxx...`
   - **TTL**: Auto / 300 seconds.
4. Return to Search Console and click **Verify**.

### Method B: HTML Meta Tag (URL Prefix Property fallback)
1. Copy the meta tag provided: `<meta name="google-site-verification" content="xxxx..." />`.
2. Add the tag inside `index.html` within the `<head>` section.
3. Deploy changes and click **Verify**.

---

## Step 3: Submit XML Sitemap

1. In Google Search Console, navigate to **Sitemaps** under the *Indexing* menu.
2. Enter the sitemap URL: `sitemap.xml` (full URL: `https://amthromax.com/sitemap.xml`).
3. Click **Submit**.
4. Verify status shows **Success** and total URLs discovered matches site pages.

---

## Step 4: URL Inspection & Indexing Request

1. Use the **URL Inspection Tool** at the top of GSC.
2. Test critical URLs:
   - `https://amthromax.com/`
   - `https://amthromax.com/about`
   - `https://amthromax.com/codehoomer`
   - `https://amthromax.com/products`
3. Click **Request Indexing** for newly published or updated pages.

---

## Step 5: Post-Launch Monitoring

- Check **Pages** report weekly for indexation errors, 404s, or canonical mismatches.
- Check **Rich Results** / **Structured Data** status for syntax errors.
- Inspect **Performance** report for search queries, impressions, and click-through rates.
