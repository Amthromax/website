import React, { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = "https://amthromax.com/images/logo.png",
  type = "website",
  url
}) => {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Helper to update or create meta tags
    const updateMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Update Meta Description
    updateMetaTag("name", "description", description);

    // Update Open Graph tags
    updateMetaTag("property", "og:title", title);
    updateMetaTag("property", "og:description", description);
    updateMetaTag("property", "og:image", image);
    updateMetaTag("property", "og:type", type);
    const currentUrl = url || window.location.href;
    updateMetaTag("property", "og:url", currentUrl);

    // Update Twitter card tags
    updateMetaTag("name", "twitter:title", title);
    updateMetaTag("name", "twitter:description", description);
    updateMetaTag("name", "twitter:image", image);
    updateMetaTag("name", "twitter:card", "summary_large_image");

    // Ensure Robots tag allows index and follow
    updateMetaTag("name", "robots", "index, follow");

    // Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", currentUrl);
  }, [title, description, image, type, url]);

  return null;
};

export default SEO;
