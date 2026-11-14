---
title: "`font-kerning` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/font-kerning/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-kerning` CSS property

The **`font-kerning`** CSS property sets the use of the kerning information stored in a font.

```css
font-kerning: auto;
```

```css
font-kerning: normal;
```

```css
font-kerning: none;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    "We took Tracy to see 'THE WATERFALL' in W. Virginia."
  </div>
</section>
```

```css
section {
  font-family: serif;
}
```

_Kerning_ affects how letters are spaced. In _well-kerned_ fonts, this feature makes character spacing more uniform and pleasant to read by reducing white space between certain character combinations.

In the image below, for instance, the examples on the left do not use kerning, while the ones on the right do:

## Syntax

```css
font-kerning: auto;
font-kerning: normal;
font-kerning: none;

/* Global values */
font-kerning: inherit;
font-kerning: initial;
font-kerning: revert;
font-kerning: revert-layer;
font-kerning: unset;
```

### Values

This property is specified as one of the following keyword values:

- `auto`
    The browser determines whether font kerning should be used or not. For example, some browsers will disable kerning on small fonts, since applying it could harm the readability of text.
- `normal`
    Font kerning information stored in the font must be applied.
- `none`
    Font kerning information stored in the font is disabled.

## Examples

### Enabling and disabling kerning

#### HTML

```html
<div id="kern"></div>
<div id="no-kern"></div>
<textarea id="input">AV T. ij</textarea>
```

#### CSS

```css
div {
  font-size: 2rem;
  font-family: serif;
}

#no-kern {
  font-kerning: none;
}

#kern {
  font-kerning: normal;
}
```

#### JavaScript

```js
const input = document.getElementById("input");
const kern = document.getElementById("kern");
const noKern = document.getElementById("no-kern");

input.addEventListener("keyup", () => {
  kern.textContent = input.value; /* Update content */
  noKern.textContent = input.value;
});

kern.textContent = input.value; /* Initialize content */
noKern.textContent = input.value;
```

## See also

- `font-variant`, `font-variant-position`, `font-variant-east-asian`, `font-variant-caps`, `font-variant-ligatures`, `font-variant-numeric`, `font-variant-alternates`, `font-synthesis`, `letter-spacing`
