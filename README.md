# Groves Electric, Inc. — Website

Modern, production-ready website for Groves Electric, Tampa's trusted family-owned electrical contractor.

## Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties, animations, responsive grid (no framework)
- **Alpine.js** — Lightweight reactive JS for mobile menu and contact form (CDN loaded)
- **Google Fonts** — Space Grotesk + DM Sans

## File Structure

```
website/
├── index.html              # Homepage
├── services.html           # Services page
├── about.html              # About Chris Groves
├── testimonials.html       # Customer reviews
├── contact.html            # Contact form + info
├── assets/
│   ├── css/
│   │   └── main.css        # All styles
│   ├── js/
│   │   └── main.js         # Animations, interactions
│   └── images/
│       ├── favicon.svg     # SVG favicon (lightning bolt)
│       ├── hero_001.jpg    # Hero background
│       ├── hero_002.jpg    # Services / Why section
│       ├── hero_003.jpg    # Lighting service
│       ├── image_001.svg   # (available)
│       ├── image_002.jpg   # Chris Groves / About
│       ├── image_003.jpg   # EV Charger service
│       ├── image_004.jpg   # Panel update service
│       └── image_005.jpg   # Surge protection service
├── design_decisions.md     # Design rationale
└── README.md               # This file
```

## Deployment

### Option 1: GitHub Pages (Free, Recommended)

1. Create a new GitHub repository
2. Upload this entire `website/` folder contents to the repo root
3. Go to **Settings → Pages → Source → Deploy from a branch → main**
4. Site will be live at `https://yourusername.github.io/repo-name/`

### Option 2: Netlify (Free, Custom Domain)

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click **"Add new site → Deploy manually"**
3. Drag and drop the `website/` folder
4. Site is immediately live with a Netlify subdomain
5. Add custom domain in **Site settings → Domain management**

### Option 3: Netlify via Git

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd website/
netlify deploy --prod --dir .
```

### Option 4: Any Static Host

Simply upload all files maintaining the folder structure to:
- Cloudflare Pages
- Vercel (`vercel --prod`)
- SiteGround / Bluehost / GoDaddy file manager
- Amazon S3 + CloudFront

## Image Setup

Copy the provided images to `assets/images/`:
- `hero_001.jpg` → Main hero background (electrician at work)
- `hero_002.jpg` → Used in Why/Services sections
- `hero_003.jpg` → Lighting service card
- `image_002.jpg` → About page / Welcome section (owner photo)
- `image_003.jpg` → EV charger service
- `image_004.jpg` → Panel upgrade service
- `image_005.jpg` → Surge protection service

## Contact Form Setup

The form currently uses Alpine.js with a simulated 1.2s submit delay. To make it functional:

### Option A: Formspree (Easiest)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your endpoint URL
3. Replace the `@submit.prevent="submitForm()"` in `contact.html` with:
```html
<form method="POST" action="https://formspree.io/f/YOUR_FORM_ID">
```
4. Remove Alpine.js form handling from that form

### Option B: Netlify Forms (If hosting on Netlify)
Add `netlify` attribute to the form tag:
```html
<form name="contact" netlify @submit.prevent="submitForm()">
  <input type="hidden" name="form-name" value="contact">
  ...
</form>
```

### Option C: EmailJS (Send without a backend)
1. Sign up at [emailjs.com](https://emailjs.com)
2. Create a service + email template
3. Replace `submitForm()` in the Alpine.js data:
```js
async submitForm() {
  this.submitting = true;
  await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', this.form);
  this.submitted = true;
  this.submitting = false;
}
```

## Customizations

### Update Phone Number
Search and replace `813-789-3400` and `18137893400` across all HTML files.

### Update Email
Search and replace `cgroves@groveselectricinc.com` across all files.

### Add Google Analytics
Add before `</head>` in each HTML file:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Phone Call Tracking
In `assets/js/main.js`, the phone click listener already fires. Replace the `console.log` with your gtag event:
```js
gtag('event', 'click', { event_category: 'phone', event_label: '813-789-3400' });
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Chrome for Android 90+

CSS custom properties, Grid, Flexbox, IntersectionObserver — all well-supported in these browsers.

## Performance Notes

- All images use `loading="lazy"` except the hero (above the fold)
- Fonts use `display=swap` — no FOUT blocking render
- Alpine.js loaded with `defer` — non-blocking
- No unused CSS (single stylesheet, purpose-built)
- Recommend running images through [Squoosh](https://squoosh.app) for WebP conversion

## License

Built for Groves Electric, Inc. All rights reserved.