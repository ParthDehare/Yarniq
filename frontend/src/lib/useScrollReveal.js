import { useEffect } from 'react';

export function useScrollReveal(options = {}) {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0.15,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optionally stop observing once revealed
          // observer.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    // Give DOM time to paint before querying elements
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);
}
