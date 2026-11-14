---
title: "`::-webkit-progress-bar` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_-webkit-progress-bar/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::-webkit-progress-bar` CSS pseudo-element

The **`::-webkit-progress-bar`** CSS pseudo-element represents the entire bar of a `<progress>` element. Normally it's only visible as the unfilled portion of the bar, since by default it's rendered below the `::-webkit-progress-value` pseudo-element. It is a child of the `::-webkit-progress-inner-element` pseudo-element and the parent of the `::-webkit-progress-value` pseudo-element.

> **Note:**
> For `::-webkit-progress-value` to take effect, `appearance` needs to be set to `none` on the `<progress>` element.

## Syntax

```css
::-webkit-progress-bar {
  /* ... */
}
```

## Examples

### HTML

```html
<progress value="10" max="50"></progress>
```

### CSS

```css
progress {
  -webkit-appearance: none;
}

::-webkit-progress-bar {
  background-color: orange;
}
```

### Result

The code above results in a progress bar that looks like this when using a WebKit or Blink browser:

## Specifications

Not part of any standard.

## See also

- The pseudo-elements used by WebKit/Blink to style other parts of a `<progress>` element:
  - `::-webkit-progress-value`
  - `::-webkit-progress-inner-element`

- `::-moz-progress-bar`
