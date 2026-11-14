---
title: "`::-moz-range-progress` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_-moz-range-progress/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::-moz-range-progress` CSS pseudo-element

The **`::-moz-range-progress`** CSS pseudo-element is a Mozilla extension that represents the lower portion of the _track_ (i.e., groove) in which the indicator slides in an `` of `type="range"`. This portion corresponds to values lower than the value currently selected by the _thumb_ (i.e., virtual knob).

> **Note:**
> Using `::-moz-range-progress` with anything but an `` doesn't match anything and has no effect.

## Syntax

```css
::-moz-range-progress {
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
input[type="range"]::-moz-range-progress {
  background-color: green;
  height: 1em;
}
```

### Result

A progress bar using this style might look something like this:

## Specifications

Not part of any standard.

## See also

- The pseudo-elements used by Gecko to style other parts of a range input:
  - `::-moz-range-thumb` represents the indicator that slides in the groove.
  - `::-moz-range-track` represents the groove in which the thumb slides.

- CSS-Tricks: Styling Cross-Browser Compatible Range Inputs with CSS
- QuirksMode: Styling and scripting sliders
