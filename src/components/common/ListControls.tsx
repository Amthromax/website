import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type SortKey = "newest" | "oldest" | "title";
export type LayoutKey = "grid" | "rows";

export const SORT_LABELS: Record<SortKey, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  title: "Title A–Z",
};

/** Sorts by date both ways, or by title. Shared so every feed orders alike. */
export function sortItems<T extends { title: string; date: string }>(items: T[], sortBy: SortKey): T[] {
  return [...items].sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
    return sortBy === "oldest" ? -diff : diff;
  });
}

const IconFunnel = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M2 3h12l-4.6 5.2v4.2l-2.8 1.4V8.2z" />
  </svg>
);

const IconSort = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5">
    <path d="M2.5 4h11M2.5 8h7M2.5 12h3.5" />
  </svg>
);

const IconGrid = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
    <rect x="1.5" y="1.5" width="5.6" height="5.6" rx="1.4" />
    <rect x="8.9" y="1.5" width="5.6" height="5.6" rx="1.4" />
    <rect x="1.5" y="8.9" width="5.6" height="5.6" rx="1.4" />
    <rect x="8.9" y="8.9" width="5.6" height="5.6" rx="1.4" />
  </svg>
);

const IconRows = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
    <rect x="1.5" y="2.4" width="13" height="2.6" rx="1.3" />
    <rect x="1.5" y="6.7" width="13" height="2.6" rx="1.3" />
    <rect x="1.5" y="11" width="13" height="2.6" rx="1.3" />
  </svg>
);

const TRIGGER_ON =
  "border-[#1d1d1f] bg-[#1d1d1f] text-white dark:border-white dark:bg-white dark:text-black";
const TRIGGER_OFF =
  "border-[#e5e5e7] bg-white text-[#1d1d1f] hover:bg-[#f5f5f7] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10";
const PANEL =
  "absolute right-0 z-30 mt-2 origin-top-right rounded-2xl border border-[#e5e5e7] bg-white p-1.5 shadow-[0_18px_44px_-20px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-[#161617]";

const itemClass = (active: boolean) =>
  `flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition-colors cursor-pointer ${
    active
      ? "bg-[#f5f5f7] text-[#1d1d1f] dark:bg-white/10 dark:text-white"
      : "text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f] dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
  }`;

const MENU_MOTION = {
  initial: { opacity: 0, y: -6, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.97 },
  transition: { duration: 0.18, ease: "easeOut" as const },
};

interface ListControlsProps {
  categories: string[];
  /** The value that means "no filter"; defaults to "All". */
  allLabel?: string;
  selectedCategory: string;
  onSelectCategory: (c: string) => void;
  sortBy: SortKey;
  onSortBy: (s: SortKey) => void;
  layout: LayoutKey;
  onLayout: (l: LayoutKey) => void;
  /** Rendered at the far left of the bar when given. */
  count?: number;
  /** Singular noun for the count, pluralised with an s. */
  noun?: string;
  className?: string;
  /** Pass the label a category renders under, when it differs from its value. */
  labelFor?: (c: string) => string;
}

/**
 * Filter, sort and layout controls for a card feed. Filtering drives whatever
 * state the page already uses for its category chips, so the two surfaces
 * cannot disagree.
 */
const ListControls: React.FC<ListControlsProps> = ({
  categories,
  allLabel = "All",
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortBy,
  layout,
  onLayout,
  count,
  noun = "article",
  className = "",
  labelFor = (c) => c,
}) => {
  const [openMenu, setOpenMenu] = useState<"filter" | "sort" | null>(null);

  // One click anywhere else closes whichever menu is open; Escape does too.
  useEffect(() => {
    if (openMenu === null) return;
    const close = () => setOpenMenu(null);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("click", close);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  const filtered = selectedCategory !== allLabel;

  return (
    <div className={`flex items-center justify-end gap-2 ${className}`}>
      {count !== undefined && (
        <span className="mr-auto text-xs font-medium text-[#86868b] dark:text-gray-500 tabular-nums">
          {count} {count === 1 ? noun : `${noun}s`}
        </span>
      )}

      {/* Filter */}
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={openMenu === "filter"}
          onClick={() => setOpenMenu(openMenu === "filter" ? null : "filter")}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-300 cursor-pointer ${
            openMenu === "filter" || filtered ? TRIGGER_ON : TRIGGER_OFF
          }`}
        >
          <IconFunnel />
          <span>{filtered ? labelFor(selectedCategory) : "Filter"}</span>
        </button>

        <AnimatePresence>
          {openMenu === "filter" && (
            <motion.div role="menu" {...MENU_MOTION} className={`${PANEL} max-h-72 w-52 overflow-y-auto`}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="menuitemradio"
                  aria-checked={selectedCategory === cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    setOpenMenu(null);
                  }}
                  className={itemClass(selectedCategory === cat)}
                >
                  <span>{labelFor(cat)}</span>
                  {selectedCategory === cat && <span aria-hidden="true">&#10003;</span>}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sort */}
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={openMenu === "sort"}
          onClick={() => setOpenMenu(openMenu === "sort" ? null : "sort")}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-300 cursor-pointer ${
            openMenu === "sort" ? TRIGGER_ON : TRIGGER_OFF
          }`}
        >
          <IconSort />
          <span>Sort</span>
        </button>

        <AnimatePresence>
          {openMenu === "sort" && (
            <motion.div role="menu" {...MENU_MOTION} className={`${PANEL} w-48`}>
              {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="menuitemradio"
                  aria-checked={sortBy === key}
                  onClick={() => {
                    onSortBy(key);
                    setOpenMenu(null);
                  }}
                  className={itemClass(sortBy === key)}
                >
                  <span>{SORT_LABELS[key]}</span>
                  {sortBy === key && <span aria-hidden="true">&#10003;</span>}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Layout */}
      <div className="flex items-center gap-0.5 rounded-full border border-[#e5e5e7] bg-white p-0.5 dark:border-white/10 dark:bg-white/5">
        {([["grid", IconGrid, "Grid view"], ["rows", IconRows, "List view"]] as const).map(
          ([key, Icon, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={layout === key}
              aria-label={label}
              title={label}
              onClick={() => onLayout(key)}
              className={`rounded-full p-2 transition-all duration-300 cursor-pointer ${
                layout === key
                  ? "bg-[#1d1d1f] text-white dark:bg-white dark:text-black"
                  : "text-[#86868b] hover:text-[#1d1d1f] dark:text-gray-500 dark:hover:text-white"
              }`}
            >
              <Icon />
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ListControls;
