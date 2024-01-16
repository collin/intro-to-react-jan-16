import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();
  const pathRef = useRef(pathname);

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    if (pathname === pathRef.current) return;
    document.querySelector("#lesson-contents")?.scrollTo(0, 0);
    pathRef.current = pathname;
  }, [pathname]);

  return null;
};
