# Nomad Internet - AI Coding Agent Instructions

## Project Overview
This is a collection of static promotional landing pages for Nomad Internet's various marketing campaigns and programs. Each campaign is a self-contained subdirectory with its own HTML, CSS, and JavaScript—no build process, database, or backend required.

## Project Structure

```
nomad-internet/
├── index.html             # Hub page linking to all campaigns
├── index.css              # Global base styles (font, reset, animations)
├── black-friday/          # Black Friday 2024 campaign
├── black-friday-homepage/ # Black Friday homepage variant
├── holiday-sales-december-2025/
├── recycle-nomad/
├── redemption-program/    # $75 redemption program with API integration
└── redemption-program-success/
```

## Key Architectural Patterns

### 1. Responsive Scaling with CSS Variables
All pages use a `--scale-factor` CSS variable for responsive design instead of media queries:
```css
.component {
  height: calc(800px * var(--scale-factor));  /* Scales with viewport */
}
```
**Why**: Allows single page to scale smoothly without breakpoints. Update `--scale-factor` in component CSS to adjust the entire layout.

### 2. Global Stylesheet Inheritance
Each campaign page imports both:
- `../index.css` → Global base styles (typography, resets)
- `styles.css` → Campaign-specific styles

Follow this pattern for new campaigns.

### 3. BEM-like Naming Convention
CSS classes follow a hierarchical naming pattern reflecting component structure:
```css
.black-friday-hero                      /* Root component */
.black-friday-hero-slide                /* Child */
.black-friday-hero-slide-content        /* Grandchild */
```
This avoids naming conflicts and clarifies component ownership across different campaigns.

### 4. DOM Manipulation via Vanilla JavaScript
No frameworks; pages use direct DOM queries and vanilla JS for interactivity:
- **Toggle functionality**: Functions like `blackFridayResidentialPlansToggleSelectNewUser()` manipulate styles directly via `style.left`, `style.display`
- **Collapsible FAQ**: Uses `dataset` attributes to track state (`item.dataset.expanded`) and toggle visibility
- **Accordion pattern**: Only one item expanded at a time (see [black-friday/script.js](black-friday/script.js#L130-L153))

### 5. External API Integration
The redemption program integrates with an external webhook API:
```javascript
const eligibilityAPIURL = 'https://app.lrlos.com/webhook/Check-Eligibility';
fetch(`${eligibilityAPIURL}?email=${email}`)
  .then((response) => response.json())
  .then((response) => { /* handle response */ })
```
**Location**: [redemption-program/script.js](redemption-program/script.js)
- Validates email format before sending
- Shows loading state during fetch
- Handles error responses: "already redeemed", "customer not found"

## Common Patterns & Conventions

### CSS Animation Pattern
Campaigns use CSS keyframe animations for visual effects:
```css
@keyframes slider {
  0% { /* start state */ }
  50% { /* mid state */ }
  100% { /* end state */ }
}

.hero-slide-content {
  animation: slider 4s infinite;
}
```
See [black-friday/styles.css](black-friday/styles.css#L30) for examples.

### Event Listeners
Pages use `addEventListener("DOMContentLoaded", ...)` to initialize interactivity **after** DOM is ready. Inline `defer` scripts ensure page load doesn't block rendering.

### Countdown Timer
[Redemption program](redemption-program/script.js#L1-L19) implements a 5-minute countdown that resets automatically:
```javascript
let countDownDate = new Date(new Date().getTime() + 5*60000);
const distance = countDownDate - now;
const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
```

## Development Workflow

- **No build step** → Edit HTML/CSS/JS directly and test in browser
- **Version control** → Git repo initialized; review changes before merging
- **Cross-campaign consistency** → Use `index.css` global styles; avoid duplicating base styles
- **Testing** → Open each campaign's index.html in browser; check form validation (email), API responses, toggle states

## Things to Avoid

- ❌ Adding media queries—use `calc()` with `--scale-factor` instead
- ❌ Framework dependencies (React, Vue, etc.)—keep pages static HTML + vanilla JS
- ❌ Global class names across campaigns—use BEM pattern with campaign prefix
- ❌ Hardcoding layout values—always use CSS variables for dimensions that might scale

## File Locations to Reference

- **Global styles**: [index.css](index.css)
- **Toggle patterns**: [black-friday/script.js](black-friday/script.js#L1-L92) (toggle functions)
- **Accordion/FAQ pattern**: [black-friday/script.js](black-friday/script.js#L130-L153)
- **API integration**: [redemption-program/script.js](redemption-program/script.js)
- **Complex layouts**: [black-friday/styles.css](black-friday/styles.css) (~1320 lines)
