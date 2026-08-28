import React, { useEffect } from "react";
import { COMPANY_CONFIG } from "../../config/company";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: string;
  url?: string;
  breadcrumbs?: BreadcrumbItem[];
  schema?: Record<string, any> | Array<Record<string, any>>;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = COMPANY_CONFIG.description,
  keywords = [
    "Amthromax",
    "AI software company",
    "enterprise AI platform",
    "intelligent agents",
    "intelligent automation",
    "developer infrastructure",
    "AI APIs",
    "enterprise software"
  ],
  image = COMPANY_CONFIG.ogImage,
  type = "website",
  url,
  breadcrumbs,
  schema,
  noindex = false
}) => {
  useEffect(() => {
    // 1. Formatted Title Tag
    const formattedTitle = title
      ? title.includes("Amthromax")
        ? title
        : `${title} | Amthromax`
      : `${COMPANY_CONFIG.name} — Artificial Intelligence Company`;

    document.title = formattedTitle;

    // Helper function to update or create meta element
    const updateMetaTag = (attrName: string, attrVal: string, contentVal: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentVal);
    };

    // 2. Canonical URL Resolution
    const currentPath = window.location.pathname === "/" ? "/" : window.location.pathname;
    const canonicalUrl = url || `${COMPANY_CONFIG.url}${currentPath}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 3. Core Meta Tags
    updateMetaTag("name", "description", description);
    updateMetaTag("name", "keywords", keywords.join(", "));
    updateMetaTag(
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    // 4. OpenGraph Tags
    updateMetaTag("property", "og:site_name", COMPANY_CONFIG.name);
    updateMetaTag("property", "og:title", formattedTitle);
    updateMetaTag("property", "og:description", description);
    updateMetaTag("property", "og:image", image);
    updateMetaTag("property", "og:type", type);
    updateMetaTag("property", "og:url", canonicalUrl);

    // 5. Twitter Card Tags
    updateMetaTag("name", "twitter:card", "summary_large_image");
    updateMetaTag("name", "twitter:title", formattedTitle);
    updateMetaTag("name", "twitter:description", description);
    updateMetaTag("name", "twitter:image", image);

    // 6. JSON-LD Knowledge Graph Generation
    const organizationEntity = {
      "@type": "Organization",
      "@id": `${COMPANY_CONFIG.url}/#organization`,
      "name": COMPANY_CONFIG.name,
      "legalName": COMPANY_CONFIG.legalName,
      "url": `${COMPANY_CONFIG.url}/`,
      "logo": {
        "@type": "ImageObject",
        "@id": `${COMPANY_CONFIG.url}/#logo`,
        "url": COMPANY_CONFIG.logo,
        "caption": COMPANY_CONFIG.name
      },
      "description": "Amthromax is an artificial intelligence and software company.",
      "email": COMPANY_CONFIG.email,
      "sameAs": COMPANY_CONFIG.socialProfiles,
      "brand": [
        { "@id": `${COMPANY_CONFIG.url}/codehoomer#software` },
        { "@id": `${COMPANY_CONFIG.url}/helleious#software` },
        { "@id": `${COMPANY_CONFIG.url}/orarqlow#software` }
      ]
    };

    const websiteEntity = {
      "@type": "WebSite",
      "@id": `${COMPANY_CONFIG.url}/#website`,
      "url": `${COMPANY_CONFIG.url}/`,
      "name": COMPANY_CONFIG.name,
      "alternateName": "Amthromax AI",
      "description": COMPANY_CONFIG.description,
      "publisher": {
        "@id": `${COMPANY_CONFIG.url}/#organization`
      }
    };

    const webpageEntity = {
      "@type": "WebPage",
      "@id": `${canonicalUrl}/#webpage`,
      "url": canonicalUrl,
      "name": formattedTitle,
      "description": description,
      "isPartOf": {
        "@id": `${COMPANY_CONFIG.url}/#website`
      },
      "about": {
        "@id": `${COMPANY_CONFIG.url}/#organization`
      }
    };

    const jsonLdGraph: any[] = [organizationEntity, websiteEntity, webpageEntity];

    // Add Breadcrumbs if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      jsonLdGraph.push({
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}/#breadcrumb`,
        "itemListElement": breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": crumb.name,
          "item": crumb.url.startsWith("http") ? crumb.url : `${COMPANY_CONFIG.url}${crumb.url}`
        }))
      });
    }

    // Append custom page-specific schema objects if provided
    if (schema) {
      if (Array.isArray(schema)) {
        jsonLdGraph.push(...schema);
      } else {
        jsonLdGraph.push(schema);
      }
    }

    const fullLdPayload = {
      "@context": "https://schema.org",
      "@graph": jsonLdGraph
    };

    // Inject JSON-LD Script into <head>
    let scriptTag = document.getElementById("amthromax-jsonld-schema") as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "amthromax-jsonld-schema";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(fullLdPayload, null, 2);

    return () => {
      // Clean up script on unmount if needed
    };
  }, [title, description, keywords, image, type, url, breadcrumbs, schema, noindex]);

  return null;
};

export default SEO;
