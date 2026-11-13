import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "../../lib/lenis";

/**
 * Starts every route at the top. Lenis keeps its own scroll position, so
 * moving only the window left it to animate back up from wherever the last
 * page was; it has to be reset immediately as well, and before paint.
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
