import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP, FaSnapchat, FaThreads, FaTiktok, FaWhatsapp, FaXTwitter, FaYoutube } from 'react-icons/fa6'

const socialIcons = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  facebook: FaFacebookF,
  x: FaXTwitter,
  youtube: FaYoutube,
  pinterest: FaPinterestP,
  whatsapp: FaWhatsapp,
  threads: FaThreads,
  snapchat: FaSnapchat,
  linkedin: FaLinkedinIn,
}

export default function SocialLinks({ links, className = '' }) {
  if (!links?.length) return null

  return (
    <div className={className} aria-label="Yirizizx House social media">
      {links.map((account) => {
        const Icon = socialIcons[account.platform?.toLowerCase()]
        return (
          <a
            key={`${account.platform}-${account.url}`}
            href={account.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit Yirizizx House on ${account.platform}`}
            title={account.platform}
          >
            {Icon ? <Icon aria-hidden="true" /> : <span>{account.platform?.slice(0, 1).toUpperCase()}</span>}
          </a>
        )
      })}
    </div>
  )
}
