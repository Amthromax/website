import type Lenis from "lenis";

/* The app's single Lenis instance, so code outside App can drive the
   scroller rather than the window underneath it. */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
