import { useEffect, useRef } from "react";

export const useInfiniteScroll = (onReachEnd, enabled = true) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          onReachEnd();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [onReachEnd, enabled]);

  return ref;
};
