# HealthyHills eCommerce Design Guidelines

## Design Approach

**Reference-Based Strategy**: Draw inspiration from premium eCommerce platforms (Shopify stores, Etsy's artisan aesthetic) combined with health/wellness brands that emphasize natural, organic products. The design should evoke trust, purity, and premium quality through generous spacing, high-quality imagery, and refined typography.

## Core Design Principles

1. **Premium Simplicity**: Clean layouts with breathing room that let products shine
2. **Nature-First Visual Language**: Organic shapes, natural textures, and authentic product photography
3. **Trust Through Transparency**: Clear information hierarchy, honest product presentation
4. **Conversion-Optimized**: Strategic CTAs, reduced friction, progressive disclosure

---

## Typography System

**Primary Font**: Poppins (headings, nav, CTAs)
- Hero Headlines: font-bold text-5xl md:text-6xl lg:text-7xl
- Section Titles: font-semibold text-3xl md:text-4xl
- Product Names: font-medium text-xl md:text-2xl
- Navigation: font-medium text-base

**Secondary Font**: Inter (body text, descriptions)
- Body Copy: font-normal text-base leading-relaxed
- Product Descriptions: text-base md:text-lg leading-loose
- Captions/Labels: text-sm text-opacity-70

---

## Layout & Spacing System

**Tailwind Spacing Primitives**: Use units of 4, 6, 8, 12, 16, 20, 24 for consistency
- Component padding: p-4 md:p-6 lg:p-8
- Section spacing: py-16 md:py-20 lg:py-24
- Card gaps: gap-6 md:gap-8
- Container max-width: max-w-7xl mx-auto px-4 md:px-6

**Grid Systems**:
- Product grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Feature sections: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Mobile-first: Always stack to single column on mobile

---

## Homepage Structure

**Hero Section** (80vh min-height):
- Full-width background image showcasing Gilgit-Baltistan mountains/nature
- Centered content with semi-transparent overlay
- Hero headline + subheadline + dual CTAs ("Shop Now" primary, "Learn Our Story" secondary)
- Trust indicators below fold: "100% Natural" | "Sourced from Himalayas" | "Premium Quality"

**Featured Products Carousel** (py-20):
- 4-5 best-selling products with high-quality images
- Horizontal scroll on mobile, grid on desktop
- Product cards: image, name, price, quick "Add to Cart" button
- "View All Products" CTA at section end

**Category Showcase** (py-16):
- 4 large category cards in 2x2 grid (single column mobile)
- Each card: category image, overlay with category name, product count
- Hover effect: subtle zoom on image

**Value Propositions** (py-20):
- 3-column grid (stacked mobile): Icons + headline + description
- "Himalayan Purity" | "Direct from Source" | "Lab Tested Quality"

**Testimonials** (py-16):
- 3-column carousel (single column mobile)
- Customer photo, quote, name, star rating
- Subtle background treatment

**Instagram/Social Feed** (py-16):
- 6-image grid linking to social
- Encourages community engagement

**Newsletter Signup** (py-12):
- Two-column: Benefit copy left, signup form right
- "Get 10% off your first order" incentive

---

## Product Catalog

**Navigation**:
- Sticky top bar with category filters
- Left sidebar (desktop): Filters (price range, product type, certifications)
- Right content area: Product grid

**Product Grid**:
- Cards with 3:4 aspect ratio images
- Wishlist heart icon (top-right)
- Product name, price, rating stars
- "Quick View" on hover (desktop)
- "Add to Cart" button

**Filtering UI**:
- Dropdown selects for sort (Price, Popularity, Newest)
- Checkbox groups for multi-select filters
- Active filters displayed as removable chips

---

## Product Detail Pages

**Layout**: Two-column (stacked mobile)

**Left Column** (60% width):
- Large main image (square aspect)
- Thumbnail gallery below (4-6 images)
- Zoom on click/hover

**Right Column** (40% width):
- Product name (text-3xl font-bold)
- Star rating + review count link
- Price (text-2xl font-semibold)
- Short description (2-3 lines)
- Quantity selector + "Add to Cart" (large, prominent)
- "Add to Wishlist" text link
- Accordion sections: Benefits, Ingredients, Sourcing Story, Shipping Info
- Trust badges: "100% Natural" | "Lab Tested" | "Money-back Guarantee"

**Below Fold**:
- Full product description (max-w-3xl)
- Customer reviews section
- Related products carousel (4 items)

---

## Shopping Cart

**Cart Modal** (slides from right):
- Product list: thumbnail, name, price, quantity adjuster, remove
- Subtotal calculation
- "Continue Shopping" + "Checkout" CTAs
- Free shipping progress bar if applicable

**Sticky Cart Icon**: 
- Top-right nav with item count badge
- Subtle bounce animation when items added

---

## Checkout Flow

**Single-page checkout** (max-w-4xl centered):
- Left column (65%): Shipping form, payment details
- Right column (35%): Order summary, sticky on scroll
- Progress indicator: Shipping → Payment → Review
- Clear visual separation between sections (borders, backgrounds)

---

## Blog Section

**Blog Listing**:
- Hero article (full-width featured image + overlay text)
- Grid of articles: 3 columns (1 mobile)
- Article cards: featured image, category tag, title, excerpt, "Read More"

**Individual Posts**:
- max-w-prose centered
- Large featured image
- Typography: text-lg leading-relaxed for readability
- Related articles at end

---

## About & Contact Pages

**About** (storytelling layout):
- Hero with founder/team image
- Mission statement section (centered, max-w-3xl)
- Origin story with alternating image-text sections
- Team photos grid

**Contact** (two-column):
- Left: Contact form (name, email, subject, message)
- Right: Contact info, WhatsApp button, business hours, optional map

---

## Images Strategy

**Hero Images**:
- Homepage: Dramatic Gilgit-Baltistan mountain landscape with natural products in foreground (80vh)
- Category pages: Relevant natural scenery or product close-ups (60vh)

**Product Images**:
- High-resolution, white/natural background
- Multiple angles: front, detail shots, lifestyle usage
- Consistent lighting and styling across all products

**About Page**:
- Founder/team portraits
- Behind-the-scenes sourcing photos from Gilgit-Baltistan
- Product packaging and quality control images

**Blog**:
- Featured images for each article
- In-content lifestyle and educational images

---

## Component Library

**Buttons**:
- Primary: Solid with rounded corners (rounded-lg), py-3 px-8
- Secondary: Outlined variant
- Text links: Underline on hover

**Cards**:
- Product: rounded-xl, subtle shadow, hover:shadow-lg
- Blog: rounded-lg, overflow-hidden

**Forms**:
- Inputs: rounded-lg border, px-4 py-3
- Focus: ring treatment
- Labels: text-sm font-medium, mb-2

**Badges**:
- Rounded-full, px-3 py-1, text-xs font-semibold

**Icons**:
- Heroicons via CDN
- Consistent 20px or 24px sizing

---

## Animations (Minimal, Strategic)

**Scroll-Triggered** (Framer Motion):
- Product cards: Fade-in with slight upward motion (y: 20 → 0)
- Section titles: Fade-in only
- Stagger children by 0.1s in grids

**Hover States**:
- Images: scale(1.05) on 0.3s transition
- Cards: shadow elevation increase
- Buttons: Slight brightness increase (handled by component)

**Cart**:
- Modal slide-in from right (x: 100% → 0)
- Success animation when adding items (check icon scale bounce)

---

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation fully supported
- Focus indicators on all focusable elements
- Alt text for all product images
- Form validation with clear error messages
- Minimum 16px font size for body text