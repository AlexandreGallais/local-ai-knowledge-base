---
title: "`-moz-user-focus` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/-moz-user-focus/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-moz-user-focus` CSS property

The **`-moz-user-focus`** CSS property is used to indicate whether an element can have the focus.

By setting its value to `ignore`, you can disable focusing the element, which means that the user will not be able to activate the element, and the element will be skipped in the tab sequence.
The default is `none`, which disables focusing on the element and removes focus on other elements if there is an attempt to select the element.

## Syntax

```css
/* Keyword values */
-moz-user-focus: none;
-moz-user-focus: normal;
-moz-user-focus: ignore;

/* Global values */
-moz-user-focus: inherit;
-moz-user-focus: initial;
-moz-user-focus: unset;
```

### Values

This property is specified as one of the following keyword values:

- `ignore`
    The element does not accept keyboard focus and will be skipped in the tab order.
- `normal`
    The element can accept keyboard focus.
- `none`
    The element does not accept keyboard focus.
    Attempting to select the element removes focus from any other element.

## Examples

### HTML

```html
<input class="ignored" value="The user cannot focus on this element." />
```

### CSS

```css
.ignored {
  -moz-user-focus: ignore;
}
```

## Specifications

Not part of any standard.

## See also

- `-moz-user-input`
- `user-modify`
- `-moz-user-select`
