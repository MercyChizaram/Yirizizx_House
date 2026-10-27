function formatPrice(price, currency = 'NGN') {
  if (price == null || price === '') return 'Ask for price'
  try {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price)
  } catch {
    return `${currency} ${price}`
  }
}

export default function ProductCard({ product, onSelect }) {
  return (
    <article className="product-card">
      <button className="product-image-link" type="button" onClick={onSelect} aria-label={`View details for ${product.title}`}>
        {product.imageUrl ? <img className="product-image" src={product.imageUrl} alt={product.imageAlt || product.imageDescription || product.title} loading="lazy" /> : <div className="image-placeholder" role="img" aria-label={product.imageDescription || `Image for ${product.title} coming soon`}><span>YH</span><small>{product.imageDescription || 'IMAGE COMING SOON'}</small></div>}
        <span className="image-index">YH / {product.category || 'MADE TO ORDER'}</span>
      </button>
      <div className="product-info">
        <div><h3>{product.title}</h3><p>{product.description || product.category || 'Designed with intention. Made to be worn.'}</p></div>
        <span className="product-price">{formatPrice(product.price, product.currency)}</span>
      </div>
      <button className="text-link details-trigger" type="button" onClick={onSelect}>View details <span aria-hidden="true">↗</span></button>
    </article>
  )
}
