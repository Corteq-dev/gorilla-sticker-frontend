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
            container.setLooping(true);
          } else {
            container.pause();
            container.setLooping(false);
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Adjust the threshold based on your needs
      });

      observer.observe(container);

      // Check if the element is initially visible
      if (container.getBoundingClientRect().top < window.innerHeight)
        container.play();

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
      mode="normal"
    />
  );
};

export default LazyLoadedLottie;
