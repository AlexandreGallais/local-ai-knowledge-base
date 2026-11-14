---
title: "`:hover` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_hover/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:hover` CSS pseudo-class

The **`:hover`** CSS pseudo-class matches an element when a user interacts with it using a pointing device. The pseudo-class is generally triggered when the user moves the cursor (mouse pointer) over an element without pressing the mouse button.

```css
.joinBtn {
  width: 10em;
  height: 5ex;
  background-color: gold;
  border: 2px solid firebrick;
  border-radius: 10px;
  font-weight: bold;
  color: black;
  cursor: pointer;
}

.joinBtn:hover {
  background-color: bisque;
}
```

```html
<p>Would you like to join our quest?</p>
<button class="joinBtn">Confirm</button>
```

Styles defined by the `:hover` pseudo-class will be overridden by any subsequent link-related pseudo-class (`:link`, `:visited`, or `:active`) that has at least equal specificity. To style links appropriately, put the `:hover` rule after the `:link` and `:visited` rules but before the `:active` one, as defined by the _LVHA-order_: `:link` — `:visited` — `:hover` — `:active`.

> **Note:**
> The `:hover` pseudo-class is problematic on touchscreens. Depending on the browser, the `:hover` pseudo-class might never match, match only for a moment after touching an element, or continue to match even after the user has stopped touching and until the user touches another element. Web developers should make sure that content is accessible on devices with limited or non-existent hovering capabilities.

## Syntax

```css
:hover {
  /* ... */
}
```

## Examples

### Basic <example-value>

#### HTML

```html
<a href="#">Try hovering over this link.</a>
```

#### CSS

```css
a {
  background-color: powderblue;
  transition: background-color 0.5s;
}

a:hover {
  background-color: gold;
}
```

#### Result

## See also

- Chromium bug #370155: Don't make `:hover` sticky on tap on sites that set a mobile viewport
- Chromium bug #306581: Immediately show hover and active states on touch when page isn't scrollable.
