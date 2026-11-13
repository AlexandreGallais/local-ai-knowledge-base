---
title: "String.prototype.big()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/big/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.big()

The **`big()`** method of `String` values creates a string that embeds this string in a `<big>` element (`<big>str</big>`), which causes this string to be displayed in a big font.

> **Note:**
> All HTML wrapper methods are deprecated and only standardized for compatibility purposes. For the case of `big()`, the `<big>` element itself has been removed from the HTML specification and shouldn't be used anymore. Web developers should use CSS properties instead.

## Syntax

```js
big()
```

### Parameters

None.

### Return value

A string beginning with a `<big>` start tag, then the text `str`, and then a `</big>` end tag.

## Examples

### Using big()

The code below creates an HTML string and then replaces the document's body with it:

```js
const contentString = "Hello, world";

document.body.innerHTML = contentString.big();
```

This will create the following HTML:

```html
<big>Hello, world</big>
```

> **Warning:**
> This markup is invalid, because `big` is no longer a valid element.

Instead of using `big()` and creating HTML text directly, you should use CSS to manipulate fonts. For example, you can manipulate `font-size` through the `element.style` attribute:

```js
document.getElementById("yourElemId").style.fontSize = "2em";
```

## See also

- Polyfill of `String.prototype.big` in `core-js`
- es-shims polyfill of `String.prototype.big`
- HTML wrapper methods
- `<big>`
