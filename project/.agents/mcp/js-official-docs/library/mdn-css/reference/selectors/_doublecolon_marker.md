---
title: "`::marker` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_marker/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::marker` CSS pseudo-element

The **`::marker`** CSS pseudo-element selects the marker box of a list item, which typically contains a bullet or number. It works on any element or pseudo-element set to `display: list-item`, such as the `` and `<summary>` elements.

```css
li::marker {
  content: "✝ ";
  font-size: 1.2em;
}
```

```html
<p>Group known as Mercury Seven:</p>
<ul>
  <li>Malcolm Scott Carpenter</li>
  <li>Leroy Gordon (Gordo) Cooper Jr.</li>
  <li>John Herschel Glenn Jr.</li>
  <li>Virgil Ivan (Gus) Grissom</li>
  <li>Walter Marty (Wally) Schirra Jr.</li>
  <li>Alan Bartlett Shepard Jr.</li>
  <li>Donald Kent (Deke) Slayton</li>
</ul>
```

## Allowable properties

The `::marker` pseudo-element supports a limited number of CSS properties, including:

- All animation and transition properties
- All font properties
- `color`
- `content`
- `counter-increment`, `counter-reset`, and `counter-set`
- `quotes`
- `text-combine-upright`, `unicode-bidi`, and `direction`
- `white-space`

> **Note:**
> The specification states that additional CSS properties may be supported in the future.

## Syntax

```css
::marker {
  /* ... */
}
```

## Examples

### HTML

```html
<ul>
  <li>Peaches</li>
  <li>Apples</li>
  <li>Plums</li>
</ul>
```

### CSS

```css
ul li::marker {
  color: red;
  font-size: 1.5em;
}
```

## See also

- HTML elements that have marker boxes by default: ``, ``, `<summary>`
- CSS generated content module
- CSS lists and counters module
- CSS counter styles module
