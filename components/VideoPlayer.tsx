import { useRef, useEffect } from "react";

interface VideoPlayerProps {
  src: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, className }) => {
  const videoRefSmallScreen = useRef<HTMLVideoElement>(null);
  const videoRefLargeScreen = useRef<HTMLVideoElement>(null);

  // Fonction pour synchroniser les vidéos
  const synchronizePlayPause = (sourceRef: React.RefObject<HTMLVideoElement>, targetRef: React.RefObject<HTMLVideoElement>) => {
    if (!sourceRef.current || !targetRef.current) return;

    sourceRef.current.onplay = () => {
      targetRef.current?.play();
    };
    sourceRef.current.onpause = () => {
      targetRef.current?.pause();
    };
  };

  useEffect(() => {
    synchronizePlayPause(videoRefSmallScreen, videoRefLargeScreen);
    synchronizePlayPause(videoRefLargeScreen, videoRefSmallScreen);
  }, [src]);

  return (
    <>
      {/* Vidéo pour petits écrans */}
      <video
        ref={videoRefSmallScreen}
        className={`block lg:hidden ${className}`}
        controls
        autoPlay
        loop
        src={src}
      >
        Your browser does not support the video tag.
      </video>

      {/* Vidéo pour grands écrans */}
      <video
        ref={videoRefLargeScreen}
        className={`hidden lg:block ${className}`}
        controls
        autoPlay
        loop
        src={src}
      >
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default VideoPlayer;
