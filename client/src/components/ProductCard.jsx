function formatPrice(price, currency = 'NGN') {
  if (price == null || price === '') return 'Ask for price'
  try {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price)
  } catch {
    return `${currency} ${price}`
  }
}

function whatsappLink(product) {
  const number = (product.whatsappNumber || import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')
  const message = `Hello Yirizizx_House! I'm interested in ${product.title}${product.price != null ? ` (${formatPrice(product.price, product.currency)})` : ''}. Is it available?`
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`
}

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <a className="product-image-link" href={whatsappLink(product)} target="_blank" rel="noreferrer" aria-label={`Ask about ${product.title} on WhatsApp`}>
        {product.imageUrl ? <img className="product-image" src={product.imageUrl} alt={product.imageAlt || product.imageDescription || product.title} loading="lazy" /> : <div className="image-placeholder" role="img" aria-label={product.imageDescription || `Image for ${product.title} coming soon`}><span>YH</span><small>{product.imageDescription || 'IMAGE COMING SOON'}</small></div>}
        <span className="image-index">YH / {product.category || 'MADE TO ORDER'}</span>
      </a>
      <div className="product-info">
        <div><h3>{product.title}</h3><p>{product.description || product.category || 'Designed with intention. Made to be worn.'}</p></div>
        <span className="product-price">{formatPrice(product.price, product.currency)}</span>
      </div>
      <a className="text-link" href={whatsappLink(product)} target="_blank" rel="noreferrer">Enquire on WhatsApp <span aria-hidden="true">↗</span></a>
    </article>
  )
}
