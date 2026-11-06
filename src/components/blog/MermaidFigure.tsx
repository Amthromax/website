import React, { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

interface MermaidFigureProps {
  /** The diagram definition, without the fence. */
  chart: string;
  /** Caption shown under the figure. */
  caption?: string;
}

/* Mermaid is heavy and most posts have no diagrams, so it is imported on
   demand the first time a figure renders and shared from then on. */
let mermaidPromise: Promise<typeof import("mermaid").default> | null = null;

const loadMermaid = () => {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid").then((m) => m.default);
  }
  return mermaidPromise;
};

const palette = (dark: boolean) =>
  dark
    ? {
        background: "#0b0b0c",
        primaryColor: "#17171a",
        primaryTextColor: "#f4f4f5",
        primaryBorderColor: "#3f3f46",
        lineColor: "#71717a",
        secondaryColor: "#121214",
        tertiaryColor: "#0b0b0c",
        textColor: "#e4e4e7",
      }
    : {
        background: "#ffffff",
        primaryColor: "#f6f6f7",
        primaryTextColor: "#1d1d1f",
        primaryBorderColor: "#d4d4d8",
        lineColor: "#8a8a8f",
        secondaryColor: "#fafafa",
        tertiaryColor: "#ffffff",
        textColor: "#3f3f46",
      };

/**
 * One Mermaid diagram, rendered in the browser. Falls back to the definition
 * as preformatted text if Mermaid cannot parse it, so a broken diagram never
 * takes the article down with it.
 */
const MermaidFigure: React.FC<MermaidFigureProps> = ({ chart, caption }) => {
  const { isDark } = useTheme();
  const reactId = useId();
  const mounted = useRef(true);
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    mounted.current = true;
    let cancelled = false;

    loadMermaid()
      .then(async (mermaid) => {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          themeVariables: { fontSize: "14px", ...palette(isDark) },
        });

        /* The id has to be a valid CSS selector; useId wraps its value in
           colons, which Mermaid's own querySelector chokes on. */
        const id = `mmd-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;
        const { svg: out } = await mermaid.render(id, chart);
        if (!cancelled && mounted.current) setSvg(out);
      })
      .catch(() => {
        if (!cancelled && mounted.current) setFailed(true);
      });

    return () => {
      cancelled = true;
      mounted.current = false;
    };
  }, [chart, isDark, reactId]);

  return (
    <figure className="my-10">
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 dark:border-white/10 dark:bg-[#0b0b0c]">
        {svg ? (
          <div
            className="[&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
            /* Mermaid output, generated in the browser from the article's own
               definition and rendered with securityLevel "strict". */
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : failed ? (
          <pre className="overflow-x-auto text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            {chart}
          </pre>
        ) : (
          <div className="h-32 animate-pulse rounded-xl bg-gray-100 dark:bg-white/5" />
        )}
      </div>

      {caption && (
        <figcaption className="mt-3 text-center text-xs sm:text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default MermaidFigure;
