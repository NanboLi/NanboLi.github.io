# Design and content notes

## Current default — B, book page

The owner selected B. It is now the shared site design, implemented directly in `_sass/_ink.scss` and the page layouts rather than loading review overrides. Background `#FBF8F1`, text `#37352F`, secondary text `#776B5E`, accent `#8B4D3B`, dividers `#E6DED0`. The home has an 860px outer width, an arch-cropped portrait and profile icons, biography first, artwork in the middle, then a 660px News reading column.

Publications and CV share the same palette, navigation and footer, with a 760px document width, compact serif headings, warm dividers, aligned year/section columns, and a single-column mobile layout. Publication detail pages inherit the same typography and colors. Decorative uppercase page kickers were removed; publication venue metadata remains. Content, resource URLs and the downloadable CV PDF are unchanged in this styling iteration.

Current artwork: `images/landscape-book.jpg` (1800 × 600) and `images/landscape-book-mobile.jpg` (840 × 280). The built-in imagegen editor removed the floating curve in the sky from the previous original; the river contours, moon, mountains and reeds remain. The original generation and previous optimized assets are preserved.

Validation: Jekyll production build and the 15-page structural/resource checks pass. Home, Publications, CV and HGM detail checked at 375, 768 and 1440px with no horizontal overflow or failed eager images. Desktop and mobile screenshots are in `../previews/book-*.png`. Existing text contrast for B remains 11.56:1 (primary), 4.89:1 (secondary), 6.14:1 (links). No deployment was performed.

Sky-curve edit prompt (built-in imagegen):

> Use case: precise-object-edit. Edit the supplied landscape illustration with one surgical change only: remove the single thin blue-grey curve floating in the sky. This unnatural long line starts around 8.5% width / 27% height, curves up toward the center sky, and ends near 62% width / 38% height. Reconstruct the pale sky and any faint distant mountain areas under that line seamlessly. Preserve everything else: exactly the same wide composition and aspect ratio, mountain silhouettes and colors, apricot moon, reeds in the lower left, mist, texture, all river/water contour lines in the lower half. Do NOT remove or change the flowing lines in the water. Do NOT add objects, reframe, recolor, sharpen, simplify, change lighting, or redesign the illustration. Output the clean original artwork without the floating sky curve.

## Visual direction — second iteration (historical)

Fresh white `#FFFFFF`, cool ink `#23383C`, muted text `#607477`, blue-green links `#356E73`. The homepage has a contained abstract landscape, a portrait and biography row, then a separate News section. The name is the main heading; the old About me heading, uppercase decorative labels, overlapping portrait, sidebar, repeated navigation links and contact invitation are removed. Contact links use small emoji with visible text labels; decorative emoji are hidden from assistive technology. Long-form pages retain their compact headers.

The original portrait is retained at its natural ratio. On mobile, portrait, identity, biography, contact links and News form one reading sequence. At desktop widths, the portrait is 176px wide; maximum site width is 1040px. The white background and fewer rules reduce visual density without hiding content.

The reference for the original composition and the owner's requested Share footer is https://www.robertavaltorta.com/. No artwork or code was copied from it.

## Artwork and lettering

Generated with the built-in imagegen tool. Current assets: `images/abstract-landscape.jpg` (1800px, about 85KB) and `images/abstract-landscape-mobile.jpg` (840px, about 18KB). Both are optimized JPEG derivatives with responsive positioning. Earlier `ink-landscape` assets are retained for comparison but are no longer referenced. Original portrait: `images/alula.JPG`.

`images/name-hanli.svg` is original path-based lettering of 李南伯 inspired by Zhang Qian stele's blunt angular strokes and broad structure. It is an interpretation, not a tracing or an authentic Zhang Qian font. The header and homepage identity use the same asset with accessible Chinese alt text. No font download or third-party font service is required.

The homepage Share row uses Twitter and LinkedIn compose links. WeChat expands a local QR code targeting the production homepage, never localhost. `images/share-home.svg` was generated using Python qrcode 8.2; no generator package or JavaScript is required by the deployed website. No share is posted automatically and no external widget loads on page view.

Generation prompt:

> Create an original extremely minimal contemporary abstract landscape banner for a researcher's website. Ultra-wide aspect ratio around 4:1. A fresh, luminous white ground, NOT cream or beige, no paper texture. Art direction: sophisticated contemporary East Asian gallery print, radical reduction and generous negative space. Only three or four broad abstract gestural forms suggesting distant hills and water, low in the frame and predominantly on the right half: a pale icy celadon translucent plane, a slightly darker desaturated blue-green curved silhouette, one small deep petrol ink accent. A tiny pale circular moon may float near the right, very subtle. Crisp yet organic cut-paper-like silhouettes with a few soft translucent edges, NOT a realistic landscape. Most of the image remains completely white. Absolutely no trees, no rocks, no buildings, no detailed peaks, no ink splatter, no grain, no typography, no signature, no border, no lettering. Quiet, airy, modern, abstract and elegant. Keep the darkest form small, balanced with a wide expanse of empty white on the left. Flat 2D art, not a mockup or a photo.

## Content sources checked during implementation

- Huxley–Gödel Machine: https://arxiv.org/abs/2510.21614 — title, author order, contribution summary; https://github.com/metauto-ai/HGM — official code and ICLR 2026 Oral announcement.
- SlotSPE: https://arxiv.org/abs/2512.01116 and https://arxiv.org/html/2512.01116v3 — title, authors, equal contribution, ICLR venue and summary; https://github.com/zylvemvet/SlotSPE — official code. Poster designation retained from the owner's existing homepage.
- FACTS: https://arxiv.org/abs/2410.20922 and https://proceedings.iclr.cc/paper_files/paper/2025/hash/ac58b418745b3e5f10c80110c963969f-Abstract-Conference.html — title, authors and venue; https://github.com/NanboLi/FACTS — official code. Poster designation retained from the existing homepage.
- MulMON: https://proceedings.neurips.cc/paper/2020/file/3d9dabe52805a1ea21864b09f3397593-Paper.pdf — authors, NeurIPS 2020 and official code URL.
- Duplicate Latent Representation Suppression: https://www.research.ed.ac.uk/en/publications/duplicate-latent-representation-suppression-for-multi-object-vari/ — replaced the unrelated IEEE link with the university's accepted manuscript PDF.
- Original repository biography, CV and News supply appointments, education, internships, funding and announcement months. These months remain unchanged; news dates only express month precision in the UI.

The downloadable CV PDF remains unchanged and is maintained separately from the web CV. Unused template source pages remain in the repository, explicitly excluded from builds. The original template's license is retained.

## Validation

- Jekyll 3.9.3 production build passes on Ruby 3.3.12. Logger 1.5.3 is pinned because Jekyll's logger wrapper is incompatible with the fiber-local Logger implementation shipped with this Ruby.
- `scripts/check_site.rb` passes for 15 generated HTML pages: local resources, semantic landmarks, seven publications grouped by year, primary navigation, five recent and three archived updates, retained redirects, and template exclusions.
- Browser checks at 375, 768 and 1440 CSS pixels pass for Home, Publications, CV, HGM and MulMON detail pages: no horizontal overflow or broken images. Home, Publications and CV contain no executable scripts; navigation and disclosure are native HTML.
- Keyboard checks: the first Tab reaches the visible skip link with a solid focus outline; Enter opens Earlier updates and exposes all three older entries.
- Browser redirects `/about/` and `/about.html` reach Home; `/resume` reaches CV.
- Local PDF response: HTTP 200, 50,944 bytes; original PDF unchanged.
- Current text contrast on white: primary 12.34:1, secondary 4.93:1, links 5.79:1 (WCAG AA for normal text).
- Desktop and mobile screenshots are saved outside the repository in the workspace's `previews/` directory. The local preview is served on 127.0.0.1:4000. Nothing was published.

### Second iteration checks

- Jekyll build and all 15-page structural/resource checks pass.
- Home visually reviewed at 375, 768 and 1440 CSS pixels; no horizontal overflow. Shared Publications and CV styles checked at 375 and 1440px; no overflow or failed image loads.
- Earlier updates opens with Enter and exposes three archived entries; WeChat disclosure opens and closes with Enter. Its QR asset loads locally when expanded; macOS Vision decoded the rendered screenshot to `https://nanboli.github.io/`. Share links target the production homepage.
- Screenshots: `../previews/home-v2-desktop.png` and `../previews/home-v2-mobile.png` (outside the site repository).

## Third iteration — concrete annotations and design alternatives

The homepage now crops the original portrait to a short rectangle with CSS `object-fit: cover` and `object-position: 50% 66%`. Six contact/profile links sit directly below the portrait. Emoji were replaced by recognizable platform SVG marks from Font Awesome Free 6.7.2: GitHub, Google Scholar, LinkedIn, ResearchGate, X and WeChat; the email symbol comes from its regular set. Original SVG paths and attribution comments are retained in `images/brands/`, with the upstream license in `LICENSE.txt`. Source: https://github.com/FortAwesome/Font-Awesome/tree/6.7.2/svgs. Icons have accessible link/control labels, hover titles, and 44px targets. The homepage Share row now displays icons only after its Share label.

The current artwork is `images/landscape-layered.jpg` and `images/landscape-layered-mobile.jpg`, generated with the built-in imagegen tool. It adds layered silhouettes, flowing contour lines, a muted apricot moon and sparse reeds. Earlier artwork files are retained. This generation deliberately increases compositional richness while preserving an abstract Eastern direction.

Three review-only alternatives live outside the repository at `../previews/design-options/`, served on http://127.0.0.1:4001/. `index.html` switches among desktop and mobile previews; `overview.html` compares desktop screenshots. These pages and their scripts are not part of Jekyll output or the sitemap. Their assets are self-contained on port 4001. No overall direction has yet been selected or applied to the main site.

- A: celadon gallery, background `#F2F6F3`, ink `#283B36`, links `#3A685A`; compact top banner, cropped portrait/profile icons left, main text right.
- B: book page, background `#FBF8F1`, ink `#37352F`, links `#8B4D3B`; introduction first, arch crop, artwork between introduction and a centered News column.
- C: moon-white studio, background `#F3F6FB`, rail `#E6EDF6`, ink `#293C52`, links `#375F89`; separate left profile rail and right artwork/content area.

Validation: Jekyll and all 15-page checks pass; no horizontal overflow or failed eager images in all three review variants at 375 and 768px. Desktop variants visually inspected at 1084px. The switcher updates the actual variant and the mobile viewport to 375px. Text contrast for primary/muted/link colors: A 10.88/4.77/5.82, B 11.56/4.89/6.14, C 10.41/4.99/6.13. The prior QR target remains unchanged.

Third-generation prompt (built-in imagegen):

> Use case: stylized-concept. Asset type: original panoramic fine-art illustration for a modern Chinese researcher's personal website. Primary request: modern, minimal and abstract Eastern landscape, with richer composition than three simple hills. Very wide banner, roughly 3:1. Five to six overlapping organic silhouettes of mountains, islands and a winding river, balanced across the entire width. Pale celadon, mist blue, grey jade and muted deep blue ink. A small pale apricot moon in the upper left. Several fine flowing contour lines connect the landscape like currents; one extremely spare reed silhouette in the foreground, just a few graceful brush strokes. Sophisticated contemporary printmaking and translucent ink planes, crisp calm shapes with slight tonal depth; no paper grain, no mottling or weathering. Off-white luminous background; 35% calm negative space, not mostly empty. The right and left sides should both have visual interest. No photorealism, no traditional detailed rocks or trees, no gradients that look like corporate tech branding, no text, no calligraphy, no red stamp, no website mockup. Refined, airy, balanced, clean.
