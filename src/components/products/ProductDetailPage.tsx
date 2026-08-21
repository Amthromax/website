import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import SEO from "../layout/SEO";
import { COMPANY_CONFIG } from "../../config/company";

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const product = COMPANY_CONFIG.products.find(
    (p) => p.id === productId || p.id.toLowerCase() === (productId || "").toLowerCase()
  );

  if (!product) {
    return (
      <div className="py-32 text-center bg-white dark:bg-black min-h-[85vh] font-sans">
        <SEO title="Product Not Found | Amthromax" description="The requested product could not be found." />
        <div className="max-w-md mx-auto space-y-6 px-6">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Product Not Found</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            The product architecture page you requested does not exist or has been relocated.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="inline-block px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-bold hover:opacity-90 transition-all shadow-md cursor-pointer"
          >
            Back to Products Portfolio
          </button>
        </div>
      </div>
    );
  }

  const productSchema = {
    "@type": "SoftwareApplication",
    "@id": `${product.url}/#software`,
    "name": product.name,
    "url": product.url,
    "description": product.description,
    "applicationCategory": product.category,
    "operatingSystem": "Cloud Infrastructure / Cross-Platform",
    "provider": {
      "@id": "https://amthromax.com/#organization"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-50 font-sans transition-colors duration-300">
      <SEO
        title={`${product.name} | Amthromax AI Software`}
        description={product.description}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/products" },
          { name: product.name, url: `/products/${product.id}` }
        ]}
        schema={productSchema}
      />

      <main>
        {/* Header Banner */}
        <section className="relative py-24 md:py-32 bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6">
            <div className="flex justify-center items-center gap-2">
              <Link
                to="/products"
                className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white uppercase tracking-wider transition-colors"
              >
                Products
              </Link>
              <span className="text-gray-400 dark:text-gray-600">/</span>
              <span className="text-xs font-normal text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal font-sans tracking-tight leading-tight text-gray-900 dark:text-white">
              {product.name}
            </h1>

            <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed">
              {product.tagline}
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 font-medium text-xs rounded-full transition-all shadow-md flex items-center gap-2"
              >
                <span>Request Enterprise Access</span>
                <span>↗</span>
              </a>
              <Link
                to="/docs"
                className="px-8 py-3.5 bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 dark:bg-black dark:text-white dark:border-white/20 dark:hover:bg-white/10 font-medium text-xs rounded-full transition-all"
              >
                Read Technical Docs
              </Link>
            </div>
          </div>
        </section>

        {/* Product Overview & Features */}
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-28 space-y-20">
          <div className="max-w-4xl mx-auto space-y-6 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-normal">
              PRODUCT ARCHITECTURE
            </span>
            <h2 className="text-3xl md:text-5xl font-normal font-sans tracking-tight text-gray-900 dark:text-white">
              System Capabilities &amp; Overview
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
              {product.description}
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {product.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-8 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl space-y-3 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-2xl bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white font-normal text-sm flex items-center justify-center">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-normal text-gray-900 dark:text-white font-sans">{feat}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-normal">
                  Engineered with production-grade fault tolerance, granular event monitoring, and enterprise zero-trust protocol isolation.
                </p>
              </div>
            ))}
          </div>

          {/* Code Integration Preview */}
          <div className="bg-[#0d0d0f] text-gray-100 rounded-[32px] p-8 md:p-12 border border-white/10 space-y-6 shadow-2xl font-mono text-sm overflow-x-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-sans text-xs">
              <span className="font-normal text-gray-400 uppercase tracking-widest">
                Integration Example (SDK / API)
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-white/80 font-normal">
                {product.id}.ts
              </span>
            </div>
            <pre className="text-xs md:text-sm leading-relaxed text-gray-300">
{`import { AmthromaxClient } from '@amthromax/sdk';

const amthromax = new AmthromaxClient({
  apiKey: process.env.AMTHROMAX_API_KEY,
  environment: 'production'
});

// Execute ${product.name} payload
const result = await amthromax.products.execute({
  productId: '${product.id}',
  params: {
    mode: 'autonomous',
    quantumSecurity: true
  }
});

console.log('Product Execution Response:', result);`}
            </pre>
          </div>

          {/* Internal Linking & Next Steps */}
          <div className="p-10 rounded-[32px] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-normal font-sans text-gray-900 dark:text-white">
                Ready to deploy {product.name}?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-normal">
                Connect with our engineering team or explore integration guides in our developer documentation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href="/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium text-xs rounded-full hover:opacity-90 transition-all shadow-sm"
              >
                Contact Sales
              </a>
              <Link
                to="/developers"
                className="px-6 py-3 bg-white dark:bg-black text-gray-900 dark:text-white border border-gray-200 dark:border-white/20 font-medium text-xs rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
              >
                Developer Hub
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
