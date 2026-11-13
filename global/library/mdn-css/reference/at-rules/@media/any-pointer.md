---
title: "`any-pointer` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/any-pointer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `any-pointer` CSS media feature

The **`any-pointer`** CSS media feature tests whether the user has _any_ pointing device (such as a mouse), and if so, how accurate it is.

> **Note:**
> If you want to test the accuracy of the _primary_ pointing device, use `pointer` instead.

## Syntax

The `any-pointer` feature is specified as a keyword value chosen from the list below.

- `none`
    No pointing device is available.
- `coarse`
    At least one input mechanism includes a pointing device of limited accuracy.
- `fine`
    At least one input mechanism includes an accurate pointing device.

> **Note:**
> More than one value can match if the available devices have different characteristics, although `none` only matches when none of them are pointing devices.

## Examples

This example creates a small checkbox for users with at least one fine pointer and a large checkbox for users with at least one coarse pointer. The big checkbox takes precedence because it is declared after the small one.

### HTML

```html
<input id="test" type="checkbox" /> <label for="test">Look at me!</label>
```

### CSS

```css
input[type="checkbox"]:checked {
  background: gray;
}

@media (any-pointer: fine) {
  input[type="checkbox"] {
    appearance: none;
    width: 15px;
    height: 15px;
    border: 1px solid blue;
  }
}

@media (any-pointer: coarse) {
  input[type="checkbox"] {
    appearance: none;
    width: 30px;
    height: 30px;
    border: 2px solid red;
  }
}
```

## See also

- The `pointer` media feature
