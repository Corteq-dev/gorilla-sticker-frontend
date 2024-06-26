import { useEffect, useRef } from "react";

const LazyLoadedVideo = ({ videoSource }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) video.play();
        else video.pause();
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    });

    observer.observe(video);

    // Check if the element is initially visible
    if (
      video.getBoundingClientRect().top < window.innerHeight &&
      video.getBoundingClientRect().left < window.innerWidth
    ) {
      setTimeout(() => {
        video.play();
      }, 500);
    }

    return () => {
      observer.disconnect();
    };
  }, [videoSource]);

  return (
    <video
      ref={videoRef}
      src={videoSource}
      width="90"
      height="90"
      playsInline
      loop
      muted
      type="video/webm"
    />
  );
};

export default LazyLoadedVideo;
