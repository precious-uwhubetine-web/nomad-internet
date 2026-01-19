# Nomad Internet - AI Coding Agent Instructions

## Project Overview
This is a collection of static promotional landing pages for Nomad Internet's various marketing campaigns and programs. Each campaign is self-contained with its own HTML, CSS, and JavaScript—no build process, database, or backend required. Pages are deployed as-is to a web server and accessed directly.

## Project Structure

```
nomad-internet/
├── index.html                      # Hub page with campaign links
├── index.css                       # Global base styles (typography, resets)
├── assets/                         # Shared images, fonts, SVGs
├── black-friday/                   # Black Friday 2024 campaign
├── black-friday-homepage/          # Black Friday homepage variant
├── bundles/                        # Bundle offer pages
├── compare-plan-features-popup/    # Feature comparison modal
├── holiday-sales-december-2025/    # Holiday campaign (archived)
├── holiday-sales-december-2025-2/  # Holiday campaign variant
├── january-2026-homepage/          # January 2026 homepage
├── off-grid-membership-bundle/     # Off-grid membership offer
├── pay-now-popup/                  # Payment flow modal (multi-step)
├── recycle-nomad/                  # Device recycling campaign
├── redemption-program/             # $75 redemption with API
├── redemption-program-success/     # Redemption success page
├── remote-worker-membership-bundle/# Remote worker offer
├── travelers-membership-bundle/    # Traveler membership offer
└── trucking/                       # Trucking industry campaign
```

## Key Architectural Patterns

### 1. Responsive Scaling with CSS Variables
All pages use a `--scale-factor` CSS variable for responsive design instead of media queries. This allows the entire layout to scale smoothly from mobile to desktop without breakpoints.

```css
:root {
  --scale-factor: 0.85;  /* Set per-component, typically 0.75–1.0 */
}

.hero {
  height: calc(800px * var(--scale-factor));     /* Heights scale */
  gap: calc(24px * var(--scale-factor));         /* Spacing scales */
  font-size: calc(16px * var(--scale-factor));   /* Typography scales */
  padding: calc(20px * var(--scale-factor));     /* Padding scales */
}
```

**Why this approach**: Single `--scale-factor` value controls the entire component's visual size. To adjust layout, modify the CSS variable in the component—no media query clutter. Expected range: 0.65–1.0 for full viewport coverage.

### 2. Global Stylesheet Inheritance
Every campaign page imports **both** stylesheets in this order:
```html
<link href="../index.css" rel="stylesheet" />  <!-- Global base -->
<link href="styles.css" rel="stylesheet" />    <!-- Campaign-specific -->
```

[index.css](index.css) provides:
- Font imports (Plus Jakarta Sans)
- Box-sizing, margin, padding resets
- Base typography defaults
- Smooth scroll behavior
- Animation definitions (e.g., `@keyframes jump`, `@keyframes slider`)

Follow this pattern for **all new campaigns**.

### 3. BEM-like Naming Convention with Campaign Prefix
CSS classes use a hierarchical, campaign-prefixed naming pattern to avoid conflicts across the entire repository:

```css
.black-friday-hero                          /* Root component */
.black-friday-hero-slide                    /* Child element */
.black-friday-hero-slide-content            /* Grandchild element */
.black-friday-hero-main-top-offer-expiry    /* Deep hierarchy with camel-case modifiers */
```

**Convention**: `{campaign-name}-{component}-{sub-component}-{element}-{modifier}`

This eliminates naming conflicts between campaigns and clarifies ownership. See [black-friday/styles.css](black-friday/styles.css) (~1320 lines) for extensive examples.

### 4. DOM Manipulation via Vanilla JavaScript
No frameworks (React, Vue, etc.). Direct DOM manipulation with standard APIs:

**Toggle patterns** ([black-friday/script.js](black-friday/script.js#L1-L92)):
```javascript
const blackFridayResidentialPlansToggleSelectNewUser = () => {
  const toggleActive = document.querySelector('.black-friday-residential-plans-header-toggle div');
  toggleActive.style.left = 'calc(4px * var(--scale-factor))';  // Visual toggle

  document.querySelectorAll('.black-friday-residential-plans-user-item-link')
    .forEach((link) => link.style.display = 'block');
};
```

**Accordion/FAQ patterns** ([black-friday/script.js](black-friday/script.js#L130-L153)):
- Only one item expanded at a time
- Uses `dataset` attributes (`item.dataset.expanded`) to track state
- Toggle visibility by setting `display` and rotating icons

**Multi-step forms** ([pay-now-popup/script.js](pay-now-popup/script.js)):
- Step components toggled with `display: 'flex'` / `display: 'none'`
- Radio inputs with data attributes for plan selection
- Loaders shown during async operations

### 5. External API Integration
The redemption program integrates with a webhook API for eligibility checking:

**API**: `https://app.lrlos.com/webhook/Check-Eligibility`

[redemption-program/script.js](redemption-program/script.js) pattern:
```javascript
const validateEmail = (email) => {
  return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

const checkEligibility = (target) => {
  const email = document.getElementById('redemption-program-check-eligibility-form-email-input').value;

  target.innerHTML = `<span class="redemption-program-check-eligibility-loader"></span>`;
  target.disabled = true;

  fetch(`https://app.lrlos.com/webhook/Check-Eligibility?email=${email}`)
    .then((response) => response.json())
    .then((response) => {
      if (response.error) {
        // Handle: "already redeemed", "customer not found"
      } else {
        const data = response[0];
        // Process eligibility data
      }
    });
};
```

**Error handling**: API returns `error` field with values like `"already redeemed"` or `"customer not found"`. Show appropriate UI states for each case.

### 6. Event Initialization Pattern
Pages use `addEventListener("DOMContentLoaded", ...)` or `document.addEventListener("DOMContentLoaded", function() {...})` to initialize interactivity **after** DOM is ready. Scripts use `defer` attribute:

```html
<script src="script.js" defer></script>
```

This ensures:
- Page renders before JS executes
- DOM elements are guaranteed to exist
- Consistent initialization order across campaigns

### 7. Countdown Timers
[redemption-program/script.js](redemption-program/script.js#L1-L19) implements a 5-minute countdown that resets automatically:

```javascript
addEventListener("DOMContentLoaded", () => {
  let countDownDate = new Date(new Date().getTime() + 5*60000);  // +5 min from now

  const x = setInterval(() => {
    const distance = countDownDate - new Date().getTime();
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector('.countdown-display').innerHTML = `${minutes}m ${seconds}s`;

    if (distance < 0) {
      countDownDate = new Date(new Date().getTime() + 5*60000);  // Reset
    }
  }, 1000);
});
```

### 8. Mobile Menu Toggling
[bundles/script.js](bundles/script.js#L1-L30) shows the responsive hamburger pattern:

```javascript
document.addEventListener("DOMContentLoaded", function() {
  const menuButton = document.getElementById('bundles-header-content-menu-button');
  const mobileMenu = document.getElementById('bundles-header-mobile-menu');

  menuButton.addEventListener('click', function() {
    mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
  });

  window.addEventListener("resize", function() {
    if (window.innerWidth > 768) {
      mobileMenu.style.display = 'none';  // Hide on desktop
    }
  });
});
```

### 9. Modal/Popup Patterns
Popups ([compare-plan-features-popup](compare-plan-features-popup), [pay-now-popup](pay-now-popup)) use a container + modal pattern with click-outside-to-close:

```javascript
const payNowPopupContainer = document.getElementById('pay-now-popup-container');
const payNowPopup = document.getElementById('pay-now-popup');

payNowPopupContainer.addEventListener('click', () => closePayNowPopup());
payNowPopup.addEventListener('click', (e) => e.stopPropagation());  // Prevent bubbling
```

The container covers the full viewport; clicking outside the modal closes it.

## Common Patterns & Conventions

### CSS Animation Pattern
Campaigns use CSS keyframe animations for visual effects (defined in [index.css](index.css)):

```css
@keyframes slider {
  0% { transform: translateX(0); }
  50% { transform: translateX(50px); }
  100% { transform: translateX(0); }
}

@keyframes jump {
  0% { bottom: 50vh; }
  50% { bottom: 55vh; }
  75% { bottom: 50vh; }
}

.hero-slide-content {
  animation: slider 4s infinite;
}
```

See [black-friday/styles.css](black-friday/styles.css#L30) for real-world usage.

### Loader Pattern
Shown during async operations (API calls, form submission):

```javascript
target.innerHTML = `<span class="redemption-program-check-eligibility-loader"></span>`;
target.disabled = true;

// After async operation completes:
target.innerHTML = defaultButtonContent;
target.disabled = false;
```

CSS for loader:
```css
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### State Management via Dataset
Use HTML5 `dataset` attributes to track UI state:

```javascript
const faqItems = document.querySelectorAll('.black-friday-faq ul li');

faqItems.forEach((item) => {
  item.addEventListener('click', () => {
    if (item.dataset.expanded) {
      item.dataset.expanded = '';  // Clear = collapsed
      collapseQuestion(item);
    } else {
      item.dataset.expanded = true;  // Set = expanded
      expandQuestion(item);
    }
  });
});
```

This avoids separate state objects and keeps logic tied to DOM elements.

### Icon Toggling
Rotate icons during transitions (e.g., accordion open/close):

```javascript
const iconContainer = trigger.querySelector('span');
iconContainer.innerHTML = `<svg>...</svg>`;

if (isOpen) {
  iconContainer.style.transform = 'rotate(180deg)';
} else {
  iconContainer.style.transform = 'rotate(0deg)';
}
```

### Event Listeners
Always use `DOMContentLoaded` to ensure DOM is ready:

```javascript
addEventListener("DOMContentLoaded", () => {
  // Initialize interactivity here
  document.querySelectorAll('.toggle-button').forEach((btn) => {
    btn.addEventListener('click', toggleState);
  });
});
```

Different variations exist across campaigns:
- `addEventListener("DOMContentLoaded", ...)`
- `document.addEventListener("DOMContentLoaded", function() {...})`
- `window.addEventListener('DOMContentLoaded', () => {...})`

All are equivalent; use whichever style matches the campaign you're editing.

## Development Workflow

- **No build step** → Edit HTML/CSS/JS directly and test in browser
- **Version control** → Git repo initialized; review changes before merging
- **Cross-campaign consistency** → Use `index.css` global styles; avoid duplicating base styles
- **Testing** → Open each campaign's index.html in browser; check form validation (email), API responses, toggle states
- **Scaling adjustments** → When adjusting layout, modify `--scale-factor` value in the component's CSS, not media queries
- **Class naming** → Always prefix with campaign name to avoid conflicts (e.g., `.bundles-header`, `.january-2026-homepage-hero`)

## CSS Scale Factor Values by Campaign

Different campaigns use different `--scale-factor` defaults based on content density:

- **`0.85`**: Most campaigns (black-friday, holiday-sales)
- **`0.75`**: Content-dense pages (compare-plan-features-popup, pay-now-popup)
- **`0.9`**: Spacious layouts (membership bundles)

Always set `--scale-factor` on the root component class, not `:root`. This allows multiple components with different scales on the same page.

```css
.black-friday-hero {
  --scale-factor: 0.85;  /* Black Friday component scales at 0.85 */
}

.compare-plan-features-popup {
  --scale-factor: 0.75;  /* Popup component scales at 0.75 */
}
```

## Things to Avoid

- ❌ Adding media queries—use `calc()` with `--scale-factor` instead
- ❌ Framework dependencies (React, Vue, etc.)—keep pages static HTML + vanilla JS
- ❌ Global class names across campaigns—use BEM pattern with campaign prefix
- ❌ Hardcoding layout values—always use CSS variables for dimensions that might scale
- ❌ Inline styles for logic—use classes and datasets instead
- ❌ Mixing state management approaches—use datasets or data attributes consistently
- ❌ Fetch API without error handling—always check `response.error` and handle edge cases

## File Locations to Reference

- **Global styles**: [index.css](index.css)
- **Global animations**: [index.css](index.css#L30)
- **Toggle patterns**: [black-friday/script.js](black-friday/script.js#L1-L92) (toggle functions)
- **Accordion/FAQ pattern**: [black-friday/script.js](black-friday/script.js#L130-L153)
- **Mobile menu pattern**: [bundles/script.js](bundles/script.js)
- **Modal/popup pattern**: [pay-now-popup/script.js](pay-now-popup/script.js) (multi-step modal)
- **Comparison popup**: [compare-plan-features-popup/script.js](compare-plan-features-popup/script.js)
- **API integration**: [redemption-program/script.js](redemption-program/script.js)
- **Complex layouts**: [black-friday/styles.css](black-friday/styles.css) (~1320 lines)

## Creating a New Campaign

1. **Create directory**: `mkdir {campaign-name}`
2. **Create files**: `index.html`, `styles.css`, `script.js`
3. **Import stylesheets** in HTML head:
   ```html
   <link href="../index.css" rel="stylesheet" />
   <link href="styles.css" rel="stylesheet" />
   <script src="script.js" defer></script>
   ```
4. **Set `--scale-factor`** on root component in `styles.css`
5. **Use BEM naming**: All CSS classes start with `{campaign-name}-`
6. **Initialize on DOMContentLoaded**: All JS should be wrapped in `addEventListener("DOMContentLoaded", ...)`
7. **Test responsiveness**: Verify layout scales properly with different `--scale-factor` values
