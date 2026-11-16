# Hafiz Mubashir Sikander – Portfolio

A static, build-free portfolio: plain HTML, CSS and JavaScript. No frameworks.

## Structure
- `index.html` – markup, SVG icon sprite, SEO and structured data
- `css/styles.css` – design tokens (spacing, type, radii, colour, light/dark) and components
- `css/animations.css` – motion system (reveals, travelling borders, shimmer, orbit, reduced-motion)
- `js/projects.js` – **all content data**: projects `P`, skills `SK`, recommendations `Q`, filters `F`, roles, contact config
- `js/main.js` – behaviour (nav, theme, filters, case-study dialog, carousel, form, footer)
- `assets/profile-photo.webp` – profile photo

## Run locally
Open `index.html`, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Deploy (free)
- **Netlify:** drag this folder onto https://app.netlify.com/drop
- **Vercel:** `npx vercel` in this folder
- **GitHub Pages:** push to a repo, then Settings > Pages > deploy from the main branch

## Things to configure (top of `js/projects.js`)
1. `FORM_ENDPOINT` – paste your Formspree URL. While empty, the form never claims success and points visitors to LinkedIn.
2. `CONTACT_EMAIL` – optional public email. While empty, all "copy email" actions are hidden.
3. **Profile photo** – the current file is a low-resolution LinkedIn crop with a white ring baked in. `img{transform:scale(1.14)}` in `css/styles.css` (`.frame img`) trims that ring. When you add a clean, square photo (600×600 or larger), replace `assets/profile-photo.webp` and delete that transform.

## Content notes
- Statistics, filter counts, footer links and "used in" skill tooltips are all derived from the data arrays. Add a project to `P` and everything updates.
- Project previews are labelled placeholders. Add real screenshots only when you have approved ones.
- Technology icons load from the Devicon CDN (pinned version); each tile falls back to a monogram if offline.
- Fonts (Inter, Space Grotesk) load from Google Fonts with `display=swap`.
