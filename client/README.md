# Yirizizx_House client site

Mobile-first fashion portfolio and catalog built with React + Vite. The catalog reads published `product` documents from Sanity's public read API; it starts empty until products are added. WhatsApp enquiries include the product name and price when set.

## Run the site

1. Copy `.env.example` to `.env.local`.
2. `VITE_WHATSAPP_NUMBER` is set to the supplied Yirizizx_House number in the included `.env.example`; use international digits only (without `+`).
3. Run `npm run dev` in this project.

## Set up the product dashboard (Sanity)

1. Create a Sanity account at [sanity.io](https://www.sanity.io/) and create a project with a `production` dataset. Sanity currently lists a $0 Free plan with hosted Studio, 20 seats (Admin and Viewer roles), two public datasets, 10,000 documents, 1 million API CDN requests/month, 100 GB asset storage and 100 GB bandwidth. This is a reasonable starting point for a small catalog; see [Sanity's current pricing and quotas](https://www.sanity.io/pricing) as usage grows. Choose a public dataset: the website can then read published entries without asking visitors to sign in. Never put a Sanity write token in this Vite app; the Studio is where the owner edits content.
2. Create a Sanity Studio locally in a separate folder using Sanity's current Studio setup instructions (`npm create sanity@latest`). Pick the same project and dataset. This Studio is the password-protected admin dashboard; your public Vite site is only a read-only visitor view.
3. Copy both schema files in this repo's `sanity/schemaTypes/` folder to that Studio project's `schemaTypes/` folder. In the Studio's `schemaTypes/index.js`, import both and include them in the exported schema array (alongside any existing schemas):

   ```js
   import product from './productType'
   import siteSettings from './siteSettingsType'
   export const schemaTypes = [product, siteSettings]
   ```

4. Start the Studio (`npm run dev` in the Studio folder), open its dashboard, create one **Site settings** document, and create a **Clothing item** when ready. Title is the only required catalog detail; image, image description (alt text), price, category, and description are optional and can be filled in later. Set availability off to hide an item without deleting it. The owner can add, edit, unpublish, or delete items there, without changing this website's code. To make the dashboard available online, run `npx sanity@latest deploy` from the Studio folder and choose its `*.sanity.studio` address.
5. In **Site settings**, add one row per social profile. Choose its platform and paste the profile URL. Published profile URLs appear as clickable social icons in the site footer; the owner can add or remove rows in the Studio.
6. In Sanity project settings, add the exact frontend origins under API/CORS origins: `http://localhost:5173` for local Vite and your deployed site URL when you have one. Keep credentials disabled. This lets the public website query the public dataset.
7. Copy the Sanity project ID into `.env.local` as `VITE_SANITY_PROJECT_ID`; keep `VITE_SANITY_DATASET=production`. The supplied WhatsApp number is already in `.env.local`. Restart Vite after changing environment values.
8. Deploy the Vite site to a static host and set those same `VITE_` variables in its build settings. Published Sanity content is fetched on page load; edits become visible after refresh.

The browser uses Sanity's read-only query endpoint. It requires no custom backend or visitor accounts. The schema lives here as the source of truth and is copied into the separate Studio project; Studio itself is the designer's content dashboard.

## Where things live

- `src/App.jsx`: page sections, catalog loading, and social links.
- `src/components/ProductCard.jsx`: reusable card, currency display, WhatsApp deep link.
- `src/lib/sanity.js`: isolated read-data layer, ready to replace with another API later.
- `src/index.css`: global styles, layout, and mobile breakpoints.
- `sanity/schemaTypes/`: editable item and social settings for the Sanity Studio.

React maps familiar web files into components: `index.html` is the small page shell and contains the `#root` mount point; `src/main.jsx` starts React there; `App.jsx` composes the page; smaller JSX files such as `ProductCard.jsx` describe reusable HTML-like UI; CSS stays in `index.css`. JSX is JavaScript with HTML-like syntax, and `{...}` inserts JavaScript values. `useState` stores changing screen data, while `useEffect` loads the catalog after the page appears. Vite bundles these files for the browser.
