---
name: responsive-design
description: Analyze and improve responsive behavior in Blazor components. Use when user asks to "make this responsive", "check mobile layout", "improve responsive design", "fix mobile view", "add breakpoints", or "optimize for tablets".
version: 1.0.0
---

# Responsive Design Skill

Analyze, validate, and enhance responsive design patterns in Blazor components following the project's mobile-first approach.

## When to Use

Invoke this skill when the user requests:
- "Make this component responsive"
- "Check the mobile layout"
- "Improve responsive design"
- "Fix mobile view"
- "Add tablet breakpoints"
- "Optimize for different screen sizes"
- "Make the table responsive"

## Workflow

### 1. Discovery Phase

**Identify target components:**
- If user specifies a component, analyze that file
- If user says "check responsive design", scan all components with `.razor.css` files
- List components found and their current responsive state

### 2. Analysis Phase

For each component, check:

**Mobile-First Structure:**
- ✅ Default styles target mobile (no media queries needed)
- ✅ Desktop/tablet enhancements in `@media (min-width: 641px)`
- ❌ Desktop-first (starts with desktop, uses max-width queries)

**Responsive Patterns:**
- `.desktop-only` class usage for hiding non-essential content on mobile
- Flexible layouts (flexbox, grid with responsive columns)
- Responsive typography (relative units, not fixed px)
- Touch-friendly targets (minimum 44px touch area on mobile)

**Common Issues:**
- Fixed widths causing horizontal scroll on mobile
- Hidden overflow cutting off content
- Small touch targets (< 44px)
- Desktop-only features without mobile alternatives
- Missing breakpoint for tablet landscape (641px)

### 3. Recommendation Phase

Generate a prioritized list of improvements:

**Priority 1 - Critical (breaks mobile UX):**
- Horizontal scroll issues
- Illegible text sizes
- Unusable touch targets
- Completely hidden critical content

**Priority 2 - Important (degrades UX):**
- Suboptimal layouts on tablet
- Too much information density on mobile
- Poor use of screen real estate

**Priority 3 - Enhancement:**
- Additional breakpoints for better scaling
- Micro-interactions for touch
- Progressive disclosure patterns

### 4. Implementation Phase

For each improvement:

1. **Explain the issue** with visual examples if helpful
2. **Show the fix** with before/after CSS
3. **Apply changes** to component CSS files
4. **Validate** by describing how it will look at different breakpoints

## Project Standards

### Breakpoint Strategy
- **Mobile**: Default (no media query) - 0px to 640px
- **Desktop/Tablet**: `@media (min-width: 641px)` - 641px and up

### CSS Conventions
- Use kebab-case for class names
- Scoped CSS in co-located `.razor.css` files
- Component-specific styles only (no global utilities)

### Common Patterns

**Grid Layouts:**
```css
/* Mobile: 1 column */
.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

/* Desktop: Multiple columns */
@media (min-width: 641px) {
    .grid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
}
```

**Hiding Content:**
```css
/* Hide on mobile */
.desktop-only {
    display: none;
}

/* Show on desktop */
@media (min-width: 641px) {
    .desktop-only {
        display: block; /* or flex, grid, etc. */
    }
}
```

**Responsive Tables:**
```css
/* Mobile: Stack cells vertically or hide columns */
table {
    font-size: 0.875rem;
}

.desktop-only {
    display: none;
}

/* Desktop: Full table */
@media (min-width: 641px) {
    table {
        font-size: 1rem;
    }
    
    .desktop-only {
        display: table-cell;
    }
}
```

## Example Interactions

### Example 1: Make Weather Component Responsive

**User**: "The weather table is hard to read on mobile"

**Skill Output**:
```
Analyzing Weather.razor and Weather.razor.css...

Current state:
✅ Mobile-first CSS structure
✅ Summary column hidden on mobile (.desktop-only)
❌ Date format too verbose for mobile
❌ Temperature cells could be larger

Recommendations:

Priority 1: Adjust date format
- Show short date on mobile (MM/DD)
- Show full date on desktop

Priority 2: Increase temperature font size on mobile
- Better visual hierarchy
- Easier to scan

Applying changes to Weather.razor.css...
```

### Example 2: New Component Needs Responsive Design

**User**: "Make the ProductList component responsive"

**Skill Output**:
```
Analyzing ProductList.razor...

No CSS file found. Creating ProductList.razor.css with mobile-first structure...

Implementing responsive grid:
- Mobile: 1 column, card layout
- Desktop: 3-4 column grid, side-by-side cards

Created ProductList.razor.css with:
✅ Mobile-first card layout
✅ Responsive grid at 641px breakpoint
✅ Touch-friendly button sizing
✅ Proper spacing and typography scaling
```

## Testing Checklist

After implementing responsive improvements, verify:

- [ ] Component renders correctly at 320px (small mobile)
- [ ] Component renders correctly at 640px (large mobile)
- [ ] Component renders correctly at 641px (desktop threshold)
- [ ] Component renders correctly at 1024px (desktop)
- [ ] No horizontal scrolling on any viewport
- [ ] All interactive elements are touch-friendly (≥44px)
- [ ] Content hierarchy is clear at all sizes
- [ ] No content is permanently inaccessible on mobile

## Output Format

Always provide:
1. **Analysis summary** - What was checked, what was found
2. **Prioritized recommendations** - Grouped by priority
3. **Implementation details** - Actual code changes with explanations
4. **Validation notes** - How to verify the improvements work

Keep explanations concise but informative. Show code snippets for all changes made.
