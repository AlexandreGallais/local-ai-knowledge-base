---
title: "`:any-link` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_any-link/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:any-link` CSS pseudo-class

The **`:any-link`** CSS pseudo-class selector represents an element that acts as the source anchor of a hyperlink, independent of whether it has been visited. In other words, it matches every `` or `<area>` element that has an `href` attribute. Thus, it matches all elements that match `:link` or `:visited`.

```css
p {
  font-weight: bold;
}

a:any-link {
  color: forestgreen;
  text-decoration-color: hotpink;
}
```

```html
<p>Pages that you might have visited:</p>
<ul>
  <li>
    <a href="https://developer.mozilla.org">MDN Web Docs</a>
  </li>
  <li>
    <a href="https://www.youtube.com/YouTube">Google</a>
  </li>
</ul>
<p>Pages unlikely to be in your history:</p>
<ul>
  <li>
    <a href="https://developer.mozilla.org/missing-3">Random MDN page</a>
  </li>
  <li>
    <a href="https://example.com/missing-3">Random Example page</a>
  </li>
</ul>
```

## Syntax

```css
:any-link {
  /* ... */
}
```

## Examples

### HTML

```html
<a href="https://example.com">External link</a><br />
<a href="#">Internal target link</a><br />
<a>Placeholder link (won't get styled)</a>
```

### CSS

```css
a:any-link {
  border: 1px solid blue;
  color: orange;
}

/* WebKit browsers */
a:-webkit-any-link {
  border: 1px solid blue;
  color: orange;
}
```

## See also

- Creating links
- Matches HTML elements: `` and `<area>` with an `href` attribute
- Related CSS selectors:
  - `:visited`
  - `:link`
