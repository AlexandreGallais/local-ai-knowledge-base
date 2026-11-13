---
title: "`::-webkit-progress-inner-element` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_-webkit-progress-inner-element/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::-webkit-progress-inner-element` CSS pseudo-element

The **`::-webkit-progress-inner-element`** CSS pseudo-element represents the outermost container of the `<progress>` element. It is the parent of the `::-webkit-progress-bar` pseudo-element.

> **Note:**
> In order to let `::-webkit-progress-value` take effect, `appearance` needs to be set to `none` on the `<progress>` element.

## Syntax

```css
::-webkit-progress-inner-element {
  /* ... */
}
```

## Examples

These examples work only on Blink and WebKit.

### Adding a black border around the progress bar

In this example, a 2px black border is added around the progress bar.

#### HTML

```html
<progress value="10" max="50"></progress>
```

#### CSS

```css
progress {
  -webkit-appearance: none;
}

::-webkit-progress-inner-element {
  border: 2px solid black;
}
```

#### Result

#### Result screenshot

If you're not using a Blink or WebKit browser, the above code results in a progress bar looking like this:

## Specifications

Not part of any standard.

## See also

- The pseudo-elements used by WebKit/Blink to style other parts of a `<progress>` element:
  - `::-webkit-progress-bar`
  - `::-webkit-progress-value`

- `::-moz-progress-bar`
