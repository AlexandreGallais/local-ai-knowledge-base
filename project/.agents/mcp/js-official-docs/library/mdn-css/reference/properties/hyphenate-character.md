---
title: "`hyphenate-character` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/hyphenate-character/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `hyphenate-character` CSS property

The **`hyphenate-character`** CSS property sets the character (or string) used at the end of a line before a hyphenation break.

Both automatic and soft hyphens are displayed according to the specified hyphenate-character value.

```css
hyphenate-character: auto;
```

```css
hyphenate-character: "=";
```

```css
hyphenate-character: "—";
```

```html
<section id="default-example">
  <p id="example-element">An extra­ordinarily long English word!</p>
</section>
```

```css
#example-element {
  border: 2px dashed #999999;
  font-size: 1.5rem;
  text-align: left;
  width: 7rem;
  hyphens: auto;
}
```

## Syntax

```css
hyphenate-character: <string>;
hyphenate-character: auto;
```

The value either sets the string to use instead of a hyphen, or indicates that the user agent should select an appropriate string based on the current typographic conventions (default).

### Values

- `<string>`
    The `<string>` to use at the end of the line before a hyphenation break.
    The user agent may truncate this value if too many characters are used.
- `auto`
    The user-agent selects an appropriate string based on the content language's typographic conventions.
    This is the default property value, and only needs to be explicitly set in order to override a different inherited value.

## Examples

This example shows two identical blocks of text that have `hyphens` set to ensure that they break wherever needed, and on soft hyphen breaks (created using `&shy;`).
The first block has the value of the hyphen changed to the equals symbol (`=`).
The second block has no hyphenate-character set, which is equivalent to `hyphenate-character: auto` for user agents that support this property.

### HTML

```html
<dl>
  <dt><code>hyphenate-character: "="</code></dt>
  <dd id="string" lang="en">Superc&shy;alifragilisticexpialidocious</dd>
  <dt><code>hyphenate-character is not set</code></dt>
  <dd lang="en">Superc&shy;alifragilisticexpialidocious</dd>
</dl>
```

### CSS

```css
dd {
  width: 90px;
  border: 1px solid black;
  hyphens: auto;
}

dd#string {
  -webkit-hyphenate-character: "=";
  hyphenate-character: "=";
}
```

## See also

- Related CSS properties: `hyphens`, `overflow-wrap`.
