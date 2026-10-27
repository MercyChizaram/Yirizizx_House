import { useEffect, useState } from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP, FaSnapchat, FaThreads, FaTiktok, FaWhatsapp, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import ProductCard from './components/ProductCard.jsx'
import FashionVideoCard from './components/FashionVideoCard.jsx'
import { getFashionVideos, getProducts, getSocialLinks } from './lib/sanity.js'

const socialIcons = { instagram: FaInstagram, tiktok: FaTiktok, facebook: FaFacebookF, x: FaXTwitter, youtube: FaYoutube, pinterest: FaPinterestP, whatsapp: FaWhatsapp, threads: FaThreads, snapchat: FaSnapchat, linkedin: FaLinkedinIn }

export default function App() {
  const [products, setProducts] = useState([])
  const [fashionVideos, setFashionVideos] = useState([])
  const [socialLinks, setSocialLinks] = useState([])
  const [catalogState, setCatalogState] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()
    Promise.all([getProducts(controller.signal), getSocialLinks(controller.signal), getFashionVideos(controller.signal)])
      .then(([items, links, videos]) => {
        if (items) { setProducts(items); setCatalogState('connected') }
        if (links) setSocialLinks(links)
        if (videos) setFashionVideos(videos)
        if (!items) setCatalogState('unconfigured')
      })
      .catch((error) => { if (error.name !== 'AbortError') setCatalogState('error') })
    return () => controller.abort()
  }, [])

  return (
    <main>
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="Yirizizx House home"><img src="/Yirizizx_Logo.jpeg" alt="Yirizizx House — House for your Fashion Feels" /></a>
        <nav aria-label="Main navigation"><a href="#collection">Collection</a><a href="#about">Our approach</a></nav>
        <a className="header-cta" href="#collection">Explore pieces <span>↘</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-photo" role="img" aria-label="Menswear editorial portrait" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light">INDEPENDENT FASHION · LAGOS, NIGERIA</p>
          <h1>Wear your<br /><em>own story.</em></h1>
          <p className="hero-copy">Thoughtful pieces for the way you move. Designed in Lagos, made to feel like you.</p>
          <a className="button button-light" href="#collection">Discover the collection <span>↓</span></a>
        </div>
        <span className="hero-note">DESIGNED WITH INTENTION — YH</span>
      </section>

      <section className="intro" id="about">
        <p className="eyebrow">THE YIRIZIZX HOUSE POINT OF VIEW</p>
        <div className="intro-layout"><p className="intro-statement">Fashion rooted in <span>character</span>. Considered cuts, confident details, and room to make every piece your own.</p><img className="owner-photo" src="/Yirizizx_brand_face.jpeg" alt="Yirizizx_House brand owner wearing a cream shirt and brown trousers" /><a className="text-link intro-link" href="#collection">Meet the collection <span>↘</span></a></div>
      </section>

      <section className="collection" id="collection">
        <div className="section-heading"><div><p className="eyebrow">CURATED FOR YOU</p><h2>Selected pieces<span>.</span></h2></div><span className="collection-count">0{products.length} / THE CURRENT EDIT</span></div>
        <div className="product-grid">{products.map((product) => <ProductCard key={product._id} product={product} />)}</div>
        {products.length === 0 && <p className="empty-state">The collection is being prepared. Message us to ask about a custom piece.</p>}
        <p className="catalog-note" aria-live="polite">{catalogState === 'connected' ? 'Live collection · Updated by Yirizizx_House' : catalogState === 'error' ? 'The collection is temporarily unavailable. Please check back soon.' : ''}</p>
      </section>

      <section className="fashion-films" id="films">
        <div className="section-heading"><div><p className="eyebrow">A CLOSER LOOK</p><h2>In motion<span>.</span></h2></div><span className="collection-count">THE YIRIZIZX FILM EDIT</span></div>
        {fashionVideos.length > 0 ? <div className="fashion-video-grid">{fashionVideos.map((video) => <FashionVideoCard key={video._id} video={video} />)}</div> : <p className="empty-state">New film moments are coming soon.</p>}
      </section>

      <section className="contact-band"><p className="eyebrow light">MADE FOR YOUR MEASURE</p><h2>Let’s make it<br /><em>personal.</em></h2><a className="button button-outline" href={`https://wa.me/${(import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')}?text=${encodeURIComponent('Hello Yirizizx_House! I would love to discuss a custom piece.')}`} target="_blank" rel="noreferrer">Talk to the designer <span>↗</span></a></section>

      <footer className="site-footer"><a className="wordmark" href="#top">YIRIZIZX<span>_</span>HOUSE</a><p>House for your Fashion Feels.</p><div className="social-links" aria-label="Social media">{socialLinks.map((account) => { const Icon = socialIcons[account.platform?.toLowerCase()]; return <a key={`${account.platform}-${account.url}`} href={account.url} target="_blank" rel="noreferrer" aria-label={`Visit Yirizizx House on ${account.platform}`} title={account.platform}>{Icon ? <Icon aria-hidden="true" /> : <span>{account.platform?.slice(0, 1).toUpperCase()}</span>}</a> })}</div><span>© {new Date().getFullYear()} YIRIZIZX_HOUSE</span></footer>
    </main>
  )
}
