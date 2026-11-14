---
title: "`:first` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_first/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:first` CSS pseudo-class

The **`:first`** CSS pseudo-class, used with the `@page` at-rule, represents the first page of a printed document. (See `:first-child` for general first element of a node.)

```css
/* Selects the first page when printing */
@page :first {
  margin-left: 50%;
  margin-top: 50%;
}
```

> **Note:**
> You can't change all CSS properties with this pseudo-class. You can only change the margins, `orphans`, `widows`, and page breaks of the document. Furthermore, you may only use absolute-length units when defining the margins. All other properties will be ignored.

## Syntax

```css
:first {
  /* ... */
}
```

## Examples

### Using `:first` for page print styles

Press the "Print!" button to print the example. The words on the first page should be somewhere around the center, while other pages will have their contents at the default position:

```html
<p>First Page.</p>
<p>Second Page.</p>
<button>Print!</button>
```

```css
@page :first {
  size: 8.5in 11in;
  margin-left: 3in;
  margin-top: 5in;
}

p {
  page-break-after: always;
  font: 1.2em sans-serif;
}
```

```js
document.querySelector("button").addEventListener("click", () => {
  window.print();
});
```

## See also

- `@page`
- Other page-related pseudo-classes: `:left`, `:right`
