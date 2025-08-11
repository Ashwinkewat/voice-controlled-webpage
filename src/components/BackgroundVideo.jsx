export default function BackgroundVideo() {
  return (
    <video autoPlay muted loop id="bg-video">
      <source
        src="https://videos.pexels.com/video-files/2759477/2759477-uhd_2560_1440_30fps.mp4"
        type="video/mp4"
      />
      Your browser does not support HTML5 video.
    </video>
  );
}
