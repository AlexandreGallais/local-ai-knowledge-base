---
title: "`::-webkit-progress-value` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_-webkit-progress-value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::-webkit-progress-value` CSS pseudo-element

The **`::-webkit-progress-value`** CSS pseudo-element represents the filled-in portion of the bar of a `<progress>` element. It is a child of the `::-webkit-progress-bar` pseudo-element.

> **Note:**
> In order to let `::-webkit-progress-value` take effect, `appearance` needs to be set to `none` on the `<progress>` element.

## Syntax

```css
::-webkit-progress-value {
  /* ... */
}
```

## Examples

This example will only work in browsers based on Blink or WebKit.

### HTML

```html
<progress value="10" max="50"></progress>
```

### CSS

```css
progress {
  -webkit-appearance: none;
}

::-webkit-progress-value {
  background-color: orange;
}
```

### Result screenshot

A progress bar using the style above would look like this:

## Specifications

Not part of any standard.

## See also

- The pseudo-elements used by WebKit/Blink to style other parts of a `<progress>` element:
  - `::-webkit-progress-bar`
  - `::-webkit-progress-inner-element`

- `::-moz-progress-bar`
