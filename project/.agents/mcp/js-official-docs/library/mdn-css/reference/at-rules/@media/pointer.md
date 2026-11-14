---
title: "`pointer` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/pointer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `pointer` CSS media feature

The **`pointer`** CSS media feature tests whether the user has a pointing device (such as a mouse), and if so, how accurate the _primary_ pointing device is.

> **Note:**
> If you want to test the accuracy of _any_ pointing device, use `any-pointer` instead.

## Syntax

The `pointer` feature is specified as a keyword value chosen from the list below.

- `none`
    The primary input mechanism does not include a pointing device.
- `coarse`
    The primary input mechanism includes a pointing device of limited accuracy, such as a finger on a touchscreen.
- `fine`
    The primary input mechanism includes an accurate pointing device, such as a mouse.

## Examples

This example creates a small checkbox for users with fine primary pointers and a large checkbox for users with coarse primary pointers.

### HTML

```html
<input id="test" type="checkbox" /> <label for="test">Look at me!</label>
```

### CSS

```css
input[type="checkbox"] {
  appearance: none;
  border: solid;
  margin: 0;
}

input[type="checkbox"]:checked {
  background: gray;
}

@media (pointer: fine) {
  input[type="checkbox"] {
    width: 15px;
    height: 15px;
    border-width: 1px;
    border-color: blue;
  }
}

@media (pointer: coarse) {
  input[type="checkbox"] {
    width: 30px;
    height: 30px;
    border-width: 2px;
    border-color: red;
  }
}
```

## See also

- The `any-pointer` media feature
