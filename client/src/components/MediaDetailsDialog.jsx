import { useEffect } from 'react'
import SocialLinks from './SocialLinks.jsx'

function formatPrice(price, currency = 'NGN') {
  if (price == null || price === '') return 'Ask for price'
  try {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price)
  } catch {
    return `${currency} ${price}`
  }
}

function whatsappLink(item) {
  const number = (item.whatsappNumber || import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')
  const price = item.price != null ? ` (${formatPrice(item.price, item.currency)})` : ''
  const message = `Hello Yirizizx_House! I'm interested in ${item.title}${price}. Is it available?`
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`
}

export default function MediaDetailsDialog({ item, socialLinks, onClose }) {
  const isVideo = item.kind === 'video'

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="detail-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="detail-dialog" role="dialog" aria-modal="true" aria-labelledby="detail-title">
        <button className="detail-close" type="button" onClick={onClose} aria-label="Close details">×</button>
        <div className="detail-media">
          {isVideo ? (
            <video className="detail-visual" src={item.videoUrl} poster={item.posterUrl || undefined} autoPlay muted loop playsInline preload="metadata" aria-label={item.description || item.title} />
          ) : item.imageUrl ? (
            <img className="detail-visual" src={item.imageUrl} alt={item.imageAlt || item.imageDescription || item.title} />
          ) : (
            <div className="detail-placeholder"><span>YH</span><small>{item.imageDescription || 'IMAGE COMING SOON'}</small></div>
          )}
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{isVideo ? 'THE FILM EDIT' : item.category || 'YIRIZIZX_HOUSE'}</p>
          <h2 id="detail-title">{item.title}</h2>
          {!isVideo && <p className="detail-price">{formatPrice(item.price, item.currency)}</p>}
          <p className="detail-description">{item.description || (isVideo ? 'A closer look at Yirizizx House.' : 'Designed with intention. Made to be worn.')}</p>
          <div className="detail-social-block">
            <p className="detail-label">Find us on</p>
            <SocialLinks links={socialLinks} className="social-links detail-social-links" />
          </div>
          {!isVideo && <a className="button detail-whatsapp" href={whatsappLink(item)} target="_blank" rel="noreferrer">Enquire on WhatsApp <span aria-hidden="true">↗</span></a>}
        </div>
      </section>
    </div>
  )
}
