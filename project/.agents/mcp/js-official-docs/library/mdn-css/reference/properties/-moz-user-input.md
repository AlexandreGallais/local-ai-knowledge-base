---
title: "`-moz-user-input` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/-moz-user-input/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-moz-user-input` CSS property

In Mozilla applications, **`-moz-user-input`** determines if an element will accept user input.

As of Firefox 60, this property can no longer grant an element the ability to accept user input if it normally does not. It may only be used to disable user input.

The `user-input` property is currently not on a standards track.

## Syntax

```css
/* Keyword values */
-moz-user-input: auto;
-moz-user-input: none;

/* Global values */
-moz-user-input: inherit;
-moz-user-input: initial;
-moz-user-input: unset;
```

### Values

This property is specified as one of the following keyword values:

- `auto`
    The element will respond to user input if it normally takes user input, such as a `<textarea>`.
- `none`
    The element does not respond to user input, and it does not become `:active`.

## Examples

### Disabling user input for an element

```css
input.example {
  /* The user will be able to select the text, but not change it. */
  -moz-user-input: none;
}
```

## Specifications

Not part of any standard.

## See also

- `-moz-user-focus`
- `-moz-user-modify`
- `-moz-user-select`
