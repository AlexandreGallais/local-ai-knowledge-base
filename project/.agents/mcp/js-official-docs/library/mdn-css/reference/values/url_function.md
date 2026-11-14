---
title: "`url()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/url_function/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `url()` CSS function

The **`url()`** CSS function is used to include a file. The parameter is an absolute URL, a relative URL, a blob URL, or a data URL. The **`url()`** function can be passed as a parameter of another CSS function, like the `attr` function. Depending on the property for which it is a value, the resource sought can be an image, font, or a stylesheet. The `url()` functional notation is the value for the `<url>` data type.

> **Note:**
> There is a difference between a URI and a URL. A URI identifies a resource. A URL is a type of URI, and describes the _location_ of a resource. A URI can be either a URL or a name (URN) of a resource.
>
> In CSS Level 1, the `url()` functional notation described only true URLs. In CSS Level 2, the definition of `url()` was extended to describe any URI, whether a URL or a URN. Confusingly, this meant that `url()` could be used to create a `<uri>` CSS data type. This change was not only awkward but, debatably, unnecessary, since URNs are rarely used in actual CSS. To alleviate the confusion, CSS Level 3 returned to the narrower, initial definition. Now, `url()` denotes only true `<url>`s.

Relative URLs are resolved relative to the stylesheet URL, not the web page URL. However, when a `url()` is used within a custom property (e.g., `--my-image: url(foo.jpg)`), the relative URL is not resolved immediately. It is resolved when the custom property is evaluated via `var()` substitution in a standard property. The base URL at that point is the stylesheet where the `var()` reference appears, not where the custom property was defined.

The **`url()`** function can be included as a value for
`background`, `background-image`, `border-image`, `border-image-source`, `content`, `cursor`, `filter`, `list-style`, `list-style-image`, `mask`, `mask-image`, `offset-path`, `clip-path`,
src as part of a `@font-face` block, and @counter-style/`symbol`

## Syntax

```css
/* Basic usage */
url("https://example.com/images/myImg.jpg");
url('https://example.com/images/myImg.jpg');
url(https://example.com/images/myImg.jpg);
url("data:image/jpeg;base64,iRxVB0…");
url(myImg.jpg);
url(#IDofSVGpath);

/* associated properties */
background-image: url("star.gif");
list-style-image: url('../images/bullet.jpg');
content: url("my-icon.jpg");
cursor: url(my-cursor.cur);
border-image-source: url(/media/diamonds.png);
src: url('fantastic-font.woff');
offset-path: url(#path);
mask-image: url("masks.svg#mask1");

/* Properties with fallbacks */
cursor: url(pointer.cur), pointer;

/* Associated short-hand properties */
background: url('star.gif') bottom right repeat-x blue;
border-image: url("/media/diamonds.png") 30 fill / 30px / 30px space;

/* As a parameter in another CSS function */
background-image: cross-fade(20% url(first.png), url(second.png));
mask-image: image(url(mask.png), skyblue, linear-gradient(black, transparent));

/* as part of a non-shorthand multiple value */
content: url(star.svg) url(star.svg) url(star.svg) url(star.svg) url(star.svg);

/* at-rules */
@document url("https://www.example.com/") { /* … */ }
@import url("https://www.example.com/style.css");
@namespace url(http://www.w3.org/1999/xhtml);
```

### Values

- `<string>`
    A string specifying a URL, which is a relative or absolute address, or pointer, to the web resource to be included, or a data URL. You can also use a hash URL to reference the ID of an SVG shape or an SVG filter.

    The quotes are generally optional—they are required if the URL includes parentheses, whitespace, or quotes (unless these characters are escaped), or if the address includes control characters above 0x7e. Normal string syntax rules apply: double quotes cannot occur inside double quotes and single quotes cannot occur inside single quotes unless escaped.

- `<url-modifier>`
    In the future, the `url()` function may support specifying a modifier, an identifier or a functional notation, which alters the meaning of the URL string. This is not supported and not fully defined in the specification.

## Examples

### As the background property value

```css
body {
  background: url("https://mdn.github.io/shared-assets/images/examples/leopard.jpg")
    #0000dd no-repeat fixed;
}
```

### For setting an image as a list bullet

```html
<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```

```css
ul {
  font-size: 3rem;
  margin: 0;
}
```

```css
ul {
  list-style: outside
    url("https://mdn.github.io/shared-assets/images/examples/firefox-logo.svg");
}
```

### Usage in the content property

#### HTML

```html
<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```

#### CSS

```css
li::after {
  content: " - "
    url("https://mdn.github.io/shared-assets/images/examples/star-white_16x16.png");
}
```

#### Result

### Using a data URL

#### CSS

```css
body {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='45'%3E%3Cpath d='M10 10h60' stroke='%2300F' stroke-width='5'/%3E%3Cpath d='M10 20h60' stroke='%230F0' stroke-width='5'/%3E%3Cpath d='M10 30h60' stroke='red' stroke-width='5'/%3E%3C/svg%3E");
}
```

### Usage in filters

When a URL is used as a path for a filter, the URL must be one of the following:

1. The path to an SVG file with the ID of the filter appended.
2. the ID of the filter, if the SVG already exists on the page.

```css
.blur {
  filter: url("my-file.svg#svg-blur"); /* the URL of an SVG file used as a filter */
}

.inline-blur {
  filter: url("#svg-blur"); /* the ID of an SVG that is embedded in the HTML page */
}
```

## See also

- `gradient`
- `element()`
- `image()`
- `image-set()`
- `cross-fade()`
