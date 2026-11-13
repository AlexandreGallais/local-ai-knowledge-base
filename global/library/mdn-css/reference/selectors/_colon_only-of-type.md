---
title: "`:only-of-type` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_only-of-type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:only-of-type` CSS pseudo-class

The **`:only-of-type`** CSS pseudo-class represents an element that has no siblings of the same type (tag name).

```css
a:only-of-type {
  color: fuchsia;
}

dd:only-of-type {
  background-color: bisque;
}
```

```html
<p>
  To find out more about <b>QUIC</b>, check <a href="#">RFC 9000</a> and
  <a href="#">RFC 9114</a>.
</p>

<dl>
  <dt>Published</dt>
  <dd>2021</dd>
  <dd>2022</dd>
</dl>

<p>Details about <b>QPACK</b> can be found in <a href="#">RFC 9204</a>.</p>

<dl>
  <dt>Published</dt>
  <dd>2022</dd>
</dl>
```

## Syntax

```css
:only-of-type {
  /* ... */
}
```

## Examples

### Styling elements with no siblings of the same type

#### HTML

```html
<main>
  <div>I am `div` #1.</div>
  <p>I am the only `p` among my siblings.</p>
  <div>I am `div` #2.</div>
  <div>
    I am `div` #3.
    <i>I am the only `i` child.</i>
    <em>I am `em` #1.</em>
    <em>I am `em` #2.</em>
  </div>
</main>
```

#### CSS

```css
main :only-of-type {
  color: red;
}
```

#### Result

## See also

- `:only-child`
- `:first-of-type`
- `:last-of-type`
- `:nth-of-type`
