export default function FashionVideoCard({ video, onSelect }) {
  return (
    <article className="fashion-video-card">
      <button className="fashion-video-trigger" type="button" onClick={onSelect} aria-label={`View details for ${video.title}`}>
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
      </button>
      <div className="fashion-video-caption">
        <h3>{video.title}</h3>
        {video.description && <p>{video.description}</p>}
      </div>
    </article>
  )
}
