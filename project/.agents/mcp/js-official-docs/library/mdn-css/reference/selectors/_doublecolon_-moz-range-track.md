---
title: "`::-moz-range-track` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_-moz-range-track/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::-moz-range-track` CSS pseudo-element

The **`::-moz-range-track`** CSS pseudo-element is a Mozilla extension that represents the _track_ (i.e., groove) in which the indicator slides in an `` of `type="range"`.

> **Note:**
> Using `::-moz-range-track` with anything but an `` doesn't match anything and has no effect.

## Syntax

```css
::-moz-range-track {
  /* ... */
}
```

## Examples

### HTML

```html
<input type="range" min="0" max="100" step="5" value="50" />
```

### CSS

```css
input[type="range"]::-moz-range-track {
  background-color: green;
}
```

### Result

A range slider using this style might look something like this:

## Specifications

Not part of any standard.

## See also

- The pseudo-elements used by Gecko to style other parts of a range input:
  - `::-moz-range-thumb` represents the indicator that slides in the groove.
  - `::-moz-range-progress` represents the lower portion of the track.

- Similar pseudo-elements used by other browsers:
  - `::-webkit-slider-runnable-track`, pseudo-element supported by WebKit and Blink (Safari, Chrome, and Opera)

- CSS-Tricks: Styling Cross-Browser Compatible Range Inputs with CSS
- QuirksMode: Styling and scripting sliders
