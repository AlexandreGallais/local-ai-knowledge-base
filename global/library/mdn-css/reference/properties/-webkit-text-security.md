---
title: "`-webkit-text-security` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/-webkit-text-security/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-webkit-text-security` CSS property

**`-webkit-text-security`** is a non-standard CSS property that obfuscates characters in a `<form>` field (such as `` or `<textarea>`) by replacing them with a shape. It only affects fields that are _not_ of `type=password`.

## Syntax

```css
-webkit-text-security: circle;
-webkit-text-security: disc;
-webkit-text-security: square;
-webkit-text-security: none;

/* Global values */
-webkit-text-security: inherit;
-webkit-text-security: initial;
-webkit-text-security: revert;
-webkit-text-security: revert-layer;
-webkit-text-security: unset;
```

## Examples

### Obscuring a text input

Try typing in the field below. If your browser supports this property, the characters should be visually replaced with squares.

#### HTML

```html
<label for="name">Name:</label> <input type="text" name="name" id="name" />
```

#### CSS

```css
input {
  -webkit-text-security: square;
}
```

#### Result

## Specifications

Not part of any standard.

## See also

- WebKit CSS extensions
