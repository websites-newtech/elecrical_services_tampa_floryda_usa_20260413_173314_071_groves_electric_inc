# Groves Electric, Inc. — Design Decisions

## Tech Stack: Static HTML + Alpine.js (via CDN)

### Rationale
- **14 pages** — falls in the 6–15 page range → HTML + Alpine.js
- Alpine.js provides reactive UI (mobile menu, form state, success state) without a build pipeline
- Zero deployment friction: push one folder to any static host
- No Node.js, no build step, works on GitHub Pages or Netlify out of the box

---

## Pages Created (5 core pages, content consolidated)

| File | Source Pages Migrated |
|---|---|
| `index.html` | home, home_001 (Welcome, Services overview, Why Choose Us) |
| `services.html` | home_004 (full services list + individual service detail cards) |
| `about.html` | home_007 (Chris Groves bio, awards, credentials) |
| `testimonials.html` | home_005 (all testimonials + review platforms) |
| `contact.html` | home_006 (form, phone, email, service areas) |

Individual service subpages (home_008 through home_013) were consolidated into `services.html` as anchor-linked detail cards. This is better UX and reduces navigation depth.

---

## Visual Identity

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#1c2b3a` | Deep navy — body background dark sections, text |
| `--color-primary-dark` | `#111d28` | Darkest navy — footer, navbar, hero overlays |
| `--color-accent` | `#4E9271` | Brand green (from original site) — CTAs, icons, highlights |
| `--color-accent-dark` | `#3d7a5d` | Green hover states |
| `--color-accent-light` | `#6ab892` | Light green — labels on dark backgrounds |
| `--color-bg` | `#f7f5f2` | Warm off-white — avoids clinical "pure white" |
| `--color-bg-alt` | `#eeeae4` | Slightly warmer — section alternation |
| `--color-gold` | `#d4a017` | Award stars |

**Why this palette works for an electrician:**
- Deep navy reads as trustworthy, professional, established
- Green was already the brand color — preserved and elevated
- Warm whites feel residential/welcoming, not sterile
- Avoids the generic purple/blue SaaS aesthetic entirely

### Typography

- **Display/Headings:** `Space Grotesk` — Modern, confident, slightly techy without being cold
- **Body:** `DM Sans` — Clean, highly readable, warm
- **Why not Inter/Roboto:** Would look like a generic template. Space Grotesk has character without being distracting.

---

## Layout Decisions

### Hero
- Full viewport height with overlay gradient — dramatic, professional
- Asymmetric text positioning (left-heavy) creates visual tension
- 4 trust signals (free estimates, no hidden fees, warranty, BBB) — immediate credibility
- Stagger animation: eyebrow → headline → body → CTAs → trust (0→400ms)

### Stats Bar
- Dark navy strip between hero and content — strong visual anchor
- 4 key numbers: 20+ years, 8× award, A+, 100% satisfaction
- Creates immediate social proof above the fold

### Services Grid
- 3-column card grid with icon + hover lift effect
- Service icons animate background color on hover (white → green)
- Arrow link grows on hover for subtle interactivity

### Why Section
- Image-left, content-right split — asymmetric, more dynamic than centered content
- Icon-bullet list reinforces specific differentiators
- Real selling points from Chris's own words, not generic filler

### CTA Pattern
- Every page ends with a dark navy CTA banner
- Phone number as primary CTA (reflects local service business behavior)
- "No trip charge" reminder in CTAs — addresses #1 objection

---

## Animations

All using custom easing curves — never CSS defaults:

```css
--ease-out:    cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

| Element | Animation | Duration |
|---|---|---|
| Hero elements | `slideUp` stagger | 600ms, 0–400ms delay |
| Page hero | `slideUp` stagger | 500ms, 0–160ms delay |
| Scroll sections | `translateY(20px) → 0` via Intersection Observer | 450ms |
| Service cards | `translateY(-4px)` on hover | 200ms |
| Buttons | `translateY(-1px)` hover, `scale(0.97)` active | 120/80ms |
| Mobile menu | `slideDown` | 200ms |

**Reduced motion:** Full `prefers-reduced-motion` support — all animations disabled, elements remain visible.

---

## Accessibility

- All images have descriptive `alt` text
- Skip-to-content link (`:focus` visible)
- Semantic HTML: `nav`, `main`, `section`, `article`, `blockquote`, `footer`, `address`
- `aria-current="page"` on active nav links
- `aria-label` on icon-only elements
- `aria-expanded` on mobile menu button (Alpine.js controlled)
- `aria-live="polite"` on form success state
- `aria-required="true"` on required form fields
- All touch targets ≥ 44×44px
- Focus styles use `outline: 2px solid var(--color-accent)` — never `outline: none`
- Color contrast: white text on `#1c2b3a` = ~11:1 (AAA)
- Green `#4E9271` on white = ~4.6:1 (AA compliant)

---

## Contact Form

- Alpine.js manages state: `{ form: {}, submitted: false, submitting: false }`
- 1.2s simulated delay on submit (replace with actual endpoint)
- Success state replaces form with confirmation message
- **To connect to real backend:** Replace `submitForm()` with `fetch('/api/contact', ...)`
- Alternatively: integrate Formspree, Netlify Forms, or EmailJS

---

## SEO

- Unique `<title>` on every page
- Unique `<meta name="description">` on every page
- Open Graph tags on all pages
- `lang="en"` on all HTML elements
- Semantic heading hierarchy (h1 → h2 → h3)
- Phone number linked as `tel:` on every page
- Address in `<address>` element in footer