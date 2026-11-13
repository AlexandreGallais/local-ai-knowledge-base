---
title: "`user-modify` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/user-modify/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `user-modify` CSS property

The **`user-modify`** property has no effect in Firefox. It was originally planned to determine whether or not the content of an element can be edited by a user.

> **Warning:**
> This property has been replaced by the `contenteditable` attribute.

## Syntax

```css
/* Keyword values */
user-modify: read-only;
user-modify: read-write;
user-modify: write-only;

/* Global values */
user-modify: inherit;
user-modify: initial;
user-modify: revert;
user-modify: unset;
```

### Values

This property is specified as one of the following keyword values:

- `read-only`
    Default value. Contents are read-only.
- `read-write`
    The user is able to read and write contents.
- `read-write-plaintext-only`
    Same as `read-write`, but rich text formatting will be lost.
- `write-only`
    The user is able to edit the content, but not to read it.

## Examples

### HTML

```html
<div class="readwrite">The user is able to change this text.</div>
```

### CSS

```css
.readwrite {
  -moz-user-modify: read-write;
  -webkit-user-modify: read-write;
}
```

## Specifications

Not part of any standard.

## See also

- `-moz-user-focus`
- `-moz-user-input`
- `-moz-user-select`
