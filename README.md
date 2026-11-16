# Hafiz Mubashir Sikander – Portfolio

A static, build-free portfolio: plain HTML, CSS and JavaScript. No frameworks.

## Structure
- `index.html` – markup, SVG icon sprite, SEO and structured data
- `css/styles.css` – design tokens (spacing, type, radii, colour, light/dark) and components
- `css/animations.css` – motion system (reveals, travelling borders, shimmer, orbit, reduced-motion)
- `js/projects.js` – **all content data**: projects `P`, skills `SK`, recommendations `Q`, filters `F`, roles, contact config
- `js/main.js` – behaviour (nav, theme, filters, case-study dialog, carousel, form, footer)
- `assets/profile-photo.webp` – profile photo
- `assets/projects/` – per-project thumbnails, icons and screenshots

## Run locally
Open `index.html`, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Deploy (free)
- **Netlify:** drag this folder onto https://app.netlify.com/drop
- **Vercel:** `npx vercel` in this folder
- **GitHub Pages:** push to a repo, then Settings > Pages > deploy from the main branch

## Things to configure (top of `js/projects.js`)
1. `FORM_ENDPOINT` – paste your Formspree URL. While empty, the form never claims success and points visitors to LinkedIn.
2. `CONTACT_EMAIL` – optional public email. While empty, all "copy email" actions are hidden.
3. **Profile photo** – `assets/profile-photo.webp` is a clean 720×720 square crop. To change it, replace that file (square, 600×600 or larger).

## Content notes
- Statistics, filter counts, footer links and "used in" skill tooltips are all derived from the data arrays. Add a project to `P` and everything updates.
- **Project images** live in `assets/projects/<id>/`: `icon.png` (transparent corners), `thumb-600/900/1200.webp` (2:1, used with `srcset` so cards stay sharp on every screen) and `shots/` (case-study gallery). They are wired up by the `window.PM` map at the bottom of `js/projects.js`.
- **Add or replace a screenshot:** drop the file in `assets/projects/<id>/shots/` (WebP, at least 2x the on-screen size) and add/edit one `[file, width, height, caption]` row in `PM`.
- **New project:** add it to `P`, add a matching `PM` entry, and export a 2:1 thumbnail (1200x600 plus 900 and 600 wide) and a square icon. A project without a `PM` entry falls back to the letter tile.
- Technology icons load from the Devicon CDN (pinned version); each tile falls back to a monogram if offline.
- Fonts (Inter, Space Grotesk) load from Google Fonts with `display=swap`.
