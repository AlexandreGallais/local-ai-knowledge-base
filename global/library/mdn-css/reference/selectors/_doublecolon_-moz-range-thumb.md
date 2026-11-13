---
title: "`::-moz-range-thumb` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_-moz-range-thumb/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::-moz-range-thumb` CSS pseudo-element

The **`::-moz-range-thumb`** CSS pseudo-element is a Mozilla extension that represents the _thumb_ (i.e., virtual knob) of an `` of `type="range"`. The user can move the thumb along the input's track to alter its numerical value.

> **Note:**
> Using `::-moz-range-thumb` with anything but an `` doesn't match anything and has no effect.

## Syntax

```css
::-moz-range-thumb {
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
input[type="range"]::-moz-range-thumb {
  background-color: green;
}
```

### Result

A progress bar using this style might look something like this:

## Specifications

Not part of any standard.

## See also

- The pseudo-elements used by Gecko to style other parts of a range input:
  - `::-moz-range-track` represents the groove in which the thumb slides.
  - `::-moz-range-progress` represents the lower portion of the track.

- Similar pseudo-elements used by other browsers:
  - `::-webkit-slider-thumb`, pseudo-element supported by WebKit and Blink (Safari, Chrome, and Opera)

- CSS-Tricks: Styling Cross-Browser Compatible Range Inputs with CSS
- QuirksMode: Styling and scripting sliders
