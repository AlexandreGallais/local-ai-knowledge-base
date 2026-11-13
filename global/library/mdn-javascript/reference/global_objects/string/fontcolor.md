---
title: "String.prototype.fontcolor()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/fontcolor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.fontcolor()

The **`fontcolor()`** method of `String` values creates a string that embeds this string in a `` element (`str`), which causes this string to be displayed in the specified font color.

> **Note:**
> All HTML wrapper methods are deprecated and only standardized for compatibility purposes. For the case of `fontcolor()`, the `` element itself has been removed from the HTML specification and shouldn't be used anymore. Web developers should use CSS properties instead.

## Syntax

```js
fontcolor(color)
```

### Parameters

- `color`
    A string expressing the color as a hexadecimal RGB triplet or as a string literal. String literals for color names are listed in the CSS color reference.

### Return value

A string beginning with a `` start tag (double quotes in `color` are replaced with `"`), then the text `str`, and then a `` end tag.

## Description

The `fontcolor()` method itself simply joins the string parts together without any validation or normalization. However, to create valid `` elements, if you express color as a hexadecimal RGB triplet, you must use the format `rrggbb`. For example, the hexadecimal RGB values for salmon are red=FA, green=80, and blue=72, so the RGB triplet for salmon is `"FA8072"`.

## Examples

### Using fontcolor()

The code below creates an HTML string and then replaces the document's body with it:

```js
const contentString = "Hello, world";

document.body.innerHTML = contentString.fontcolor("red");
```

This will create the following HTML:

```html
<font color="red">Hello, world</font>
```

> **Warning:**
> This markup is invalid, because `font` is no longer a valid element.

Instead of using `fontcolor()` and creating HTML text directly, you should use CSS to manipulate fonts. For example, you can manipulate `color` through the `element.style` attribute:

```js
document.getElementById("yourElemId").style.color = "red";
```

## See also

- Polyfill of `String.prototype.fontcolor` in `core-js`
- es-shims polyfill of `String.prototype.fontcolor`
- HTML wrapper methods
- ``
