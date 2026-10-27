export default function FashionVideoCard({ video }) {
  return (
    <article className="fashion-video-card">
      <video
        className="fashion-video"
        src={video.videoUrl}
        poster={video.posterUrl || undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={video.description || video.title}
      />
      <div className="fashion-video-caption">
        <h3>{video.title}</h3>
        {video.description && <p>{video.description}</p>}
      </div>
    </article>
  )
}
