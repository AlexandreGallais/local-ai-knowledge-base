---
title: "`user-select` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/user-select/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `user-select` CSS property

The **`user-select`** CSS property controls whether the user can select text. This doesn't have any effect on content loaded as part of a browser's user interface (its chrome), except in textboxes.

```css
user-select: none;
```

```css
user-select: text;
```

```css
user-select: all;
```

```html
<section id="default-example">
  <p id="example-element">Try to select this text</p>
</section>
```

```css
#example-element {
  font-size: 1.5rem;
}
```

## Syntax

```css
/* Keyword values */
user-select: none;
user-select: auto;
user-select: text;
user-select: all;

/* Global values */
user-select: inherit;
user-select: initial;
user-select: revert;
user-select: revert-layer;
user-select: unset;
```

> **Note:**
> `user-select` is not an inherited property, though the initial `auto` value makes it behave like it is inherited most of the time. WebKit/Chromium-based browsers _do_ implement the property as inherited, which violates the behavior described in the spec, and this will bring some issues. Until now, Chromium has chosen to fix the issues to make the final behavior meet the specifications.

### Values

- `none`
    The text of the element and its sub-elements is not selectable. Note that the `Selection` object can contain these elements.
- `auto`
    The used value of `auto` is determined as follows:
    - On the `::before` and `::after` pseudo elements, the used value is `none`
    - If the used value of `user-select` on the parent of this element is `none`, the used value is `none`
    - Otherwise, if the used value of `user-select` on the parent of this element is `all`, the used value is `all`
    - Otherwise, the used value is `text`

- `text`
    The text can be selected by the user.
- `all`
    The content of the element shall be selected atomically: If a selection would contain part of the element, then the selection must contain the entire element including all its descendants. If a double-click or context-click occurred in sub-elements, the highest ancestor with this value will be selected.

> **Note:**
> The CSS basic user interface module defines a `contain` value for the `user-select` property to enable selection to start within the element to be contained by the bounds of that element, however, this is not supported in any browsers.

## Examples

### HTML

```html
<p>You should be able to select this text.</p>
<p class="unselectable">Hey, you can't select this text!</p>
<p class="all">Clicking once will select all of this text.</p>
```

### CSS

```css
.unselectable {
  -webkit-user-select: none; /* Safari */
  user-select: none;
}

.all {
  -webkit-user-select: all;
  user-select: all;
}
```

## See also

- `::selection` pseudo-element
- The JavaScript `Selection` object
