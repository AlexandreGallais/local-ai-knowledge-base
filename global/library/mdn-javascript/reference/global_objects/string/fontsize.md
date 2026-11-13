---
title: "String.prototype.fontsize()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/fontsize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.fontsize()

The **`fontsize()`** method of `String` values creates a string that embeds this string in a `` element (`str`), which causes this string to be displayed in the specified font size.

> **Note:**
> All HTML wrapper methods are deprecated and only standardized for compatibility purposes. For the case of `fontsize()`, the `` element itself has been removed from the HTML specification and shouldn't be used anymore. Web developers should use CSS properties instead.

## Syntax

```js
fontsize(size)
```

### Parameters

- `size`
    An integer between 1 and 7, or a string representing a signed integer between 1 and 7.

### Return value

A string beginning with a `` start tag (double quotes in `size` are replaced with `"`), then the text `str`, and then a `` end tag.

## Description

The `fontsize()` method itself simply joins the string parts together without any validation or normalization. However, to create valid `` elements, When you specify size as an integer, you set the font size of `str` to one of the 7 defined sizes. You can specify `size` as a string such as `"-2"` or `"+3"` to adjust the font size of `str` relative to 3, the default value.

## Examples

### Using fontsize()

The code below creates an HTML string and then replaces the document's body with it:

```js
const contentString = "Hello, world";

document.body.innerHTML = contentString.fontsize(7);
```

This will create the following HTML:

```html
<font size="7">Hello, world</font>
```

> **Warning:**
> This markup is invalid, because `font` is no longer a valid element.

Instead of using `fontsize()` and creating HTML text directly, you should use CSS to manipulate fonts. For example, you can manipulate `font-size` through the `element.style` attribute:

```js
document.getElementById("yourElemId").style.fontSize = "7pt";
```

## See also

- Polyfill of `String.prototype.fontsize` in `core-js`
- es-shims polyfill of `String.prototype.fontsize`
- HTML wrapper methods
- ``
