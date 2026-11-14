---
title: "String.prototype.fixed()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/fixed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.fixed()

The **`fixed()`** method of `String` values creates a string that embeds this string in a `<tt>` element (`<tt>str</tt>`), which causes this string to be displayed in a fixed-width font.

> **Note:**
> All HTML wrapper methods are deprecated and only standardized for compatibility purposes. For the case of `fixed()`, the `<tt>` element itself has been removed from the HTML specification and shouldn't be used anymore. Web developers should use CSS properties instead.

## Syntax

```js
fixed()
```

### Parameters

None.

### Return value

A string beginning with a `<tt>` start tag, then the text `str`, and then a `</tt>` end tag.

## Examples

### Using fixed()

The code below creates an HTML string and then replaces the document's body with it:

```js
const contentString = "Hello, world";

document.body.innerHTML = contentString.fixed();
```

This will create the following HTML:

```html
<tt>Hello, world</tt>
```

> **Warning:**
> This markup is invalid, because `tt` is no longer a valid element.

Instead of using `fixed()` and creating HTML text directly, you should use CSS to manipulate fonts. For example, you can manipulate `font-family` through the `element.style` attribute:

```js
document.getElementById("yourElemId").style.fontFamily = "monospace";
```

## See also

- Polyfill of `String.prototype.fixed` in `core-js`
- es-shims polyfill of `String.prototype.fixed`
- HTML wrapper methods
- `<tt>`
