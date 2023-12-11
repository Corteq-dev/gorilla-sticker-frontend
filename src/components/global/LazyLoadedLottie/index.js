import { useEffect, useRef } from "react";

const LazyLoadedLottie = ({ animationPath, style }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            container.play();
          } else {
            container.pause();
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: "0px",
        threshold: 0.3, // Adjust the threshold based on your needs
      });

      observer.observe(container);

      // Check if the element is initially visible
      if (
        container.getBoundingClientRect().top < window.innerHeight &&
        container.getBoundingClientRect().left < window.innerWidth
      ) {
        setTimeout(() => {
          container.play();
        }, 500);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [animationPath]);

  return (
    <tgs-player
      ref={containerRef}
      src={animationPath}
      style={style}
      loop
      mode="normal"
    />
  );
};

export default LazyLoadedLottie;
