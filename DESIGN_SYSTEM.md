# Personal Blog — UI Style Guide

This document describes the visual system used by the personal blog page. It is intended as a practical handoff for applying the same style to an existing interface.

## Design character

The style is editorial and deliberately quiet: a warm paper surface, dark navy typography, generous space, hairline dividers, and deliberate violet accents. Pixel styling is a structural accent, not a theme. It appears in grids, geometric artwork, and small square marks; the rest of the interface stays modern and restrained.

Avoid rounded cards, heavy shadows, gradients on ordinary UI, glass effects, oversized iconography, and motion for its own sake.

## Type

Use two roles only:

| Role | Font | Use |
| --- | --- | --- |
| Display / body | `Geist`, `Arial`, sans-serif | Headings, paragraphs, article titles, primary UI copy |
| Utility | `Geist Mono`, monospace | Navigation, dates, labels, indexes, buttons, footer metadata |

Headline rules:

- Weight: `500`
- Tracking: `-0.075em` for large headings; `-0.05em` for article titles
- Line-height: `0.94–0.98`
- Use a serif italic (`Georgia, serif`) only to emphasize one or two words in a large headline.

Utility text should be all caps where useful, at `10–11px`, with minimal letter spacing. It works best as metadata rather than paragraph copy.

## Tokens

```css
:root {
  --background: #f3eee6;
  --surface: #faf7f2;
  --surface-elevated: #fffcf8;
  --navy: #10233b;
  --foreground: #10233b;
  --foreground-muted: #687184;
  --brand: #7257e8;
  --brand-hover: #6247d7;
  --brand-soft: #e9e3ff;
  --border: rgba(18, 34, 56, 0.12);
  --border-strong: rgba(18, 34, 56, 0.2);
}
```

`--background` is the default warm-paper page background; `--surface` and `--surface-elevated` provide quiet separation where it is genuinely needed. `--navy` is the preferred text and high-emphasis colour; use `--foreground-muted` for supporting copy. `--border` is for subtle rules and `--border-strong` for active or structural dividers.

`--brand` is the personal brand colour and the sole high-energy accent. Use it for primary actions, active navigation, links, focus rings, and selected states. Use `--brand-hover` only for interaction feedback and `--brand-soft` for a restrained tint. Do not introduce a competing saturated blue, acid green, or generic black; the warm background, violet, and navy relationship is the visual signature.

## Layout

- Content container: `max-width: 1440px`, centered.
- Desktop side inset: `4.2%` of viewport width.
- Header height: `93px`; a single lower border.
- Vertical sections have generous padding (`80–135px`).
- The feature section uses a two-column editorial layout: visual left, copy right.
- Post lists are rows with a fixed index column, flexible copy column, and trailing arrow column.

For mobile, use `24px` side padding, stack the feature columns, and hide nonessential navigation items instead of squeezing them.

## Core UI patterns

### Header

Use a plain wordmark plus a minimal square symbol. Navigation has no pill containers or background fills. Links change colour on hover.

```css
.header {
  height: 93px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  font: 11px 'Geist Mono', monospace;
}
```

### Text links and buttons

Primary actions are text links with an underline/bottom border and a simple arrow. Use a rectangular outline button only inside a strong colour block.

```css
.text-link {
  color: var(--navy);
  font: 11px 'Geist Mono', monospace;
  border-bottom: 1px solid currentColor;
  padding-bottom: 8px;
}

.outline-button {
  border: 1px solid currentColor;
  padding: 16px 18px;
  font: 11px 'Geist Mono', monospace;
}
```

### Article row

Rows should feel like a table of contents: one thin border, a small index, title, supporting sentence, and directional arrow. Do not wrap each row in a card.

```css
.post {
  display: grid;
  grid-template-columns: 91px 1fr 38px;
  gap: 17px;
  padding: 29px 0 27px;
  border-bottom: 1px solid var(--border);
}
```

The only hover effect needed is a small left inset and a faint `--brand-soft` wash.

## Pixel artwork

Build pixel-style visuals from CSS geometry, not illustrations or game assets. The feature artwork uses:

- a thin, square grid (`repeating-linear-gradient`)
- one outlined violet circle
- a few hard-edged rectangles
- a diagonal plane
- optional warm paper or violet accent

Keep shapes large and sparse. This is the bridge between the modern editorial page and pixel-art influence.

## Matrix layer

The background matrix is intentionally independent from page content:

```jsx
<div className="matrix" aria-hidden="true">
  {symbols.map((symbol, index) => <span key={index}>{symbol}</span>)}
</div>
```

It is `position: absolute`, `pointer-events: none`, and lives directly inside the page wrapper. That makes it safe to upgrade later without changing layout or interaction behavior.

For an interactive version:

1. Keep the grid and symbols as the static fallback.
2. Add a client-side animation only when the matrix is visible in the viewport.
3. Animate opacity, position, or symbol substitution at low frequency; avoid continuous rapid scrolling.
4. Respect `prefers-reduced-motion` and disable the animation there.
5. Never make the layer intercept clicks or reduce text contrast.

## Applying the style elsewhere

1. Add the two fonts and token block to the project’s global stylesheet or design-token layer.
2. Convert existing cards into bordered editorial rows where appropriate.
3. Replace generic rounded buttons with text actions, reserving outline buttons for coloured feature modules.
4. Standardize labels, dates, tags, and nav items on `Geist Mono`.
5. Use violet sparingly—one or two strong areas per screen is usually enough. Navy remains the default for text and high-emphasis structure.
6. Add the matrix element at the page level only, behind content, rather than to each component.

The live reference implementation is in `app/page.tsx` and `app/globals.css`.
