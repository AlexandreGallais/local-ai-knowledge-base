---
title: "String.prototype.small()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/small/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.small()

The **`small()`** method of `String` values creates a string that embeds this string in a `` element (`str`), which causes this string to be displayed in a small font.

> **Note:**
> All HTML wrapper methods are deprecated and only standardized for compatibility purposes. Use DOM APIs such as `document.createElement()` instead.

## Syntax

```js
small()
```

### Parameters

None.

### Return value

A string beginning with a `` start tag, then the text `str`, and then a `` end tag.

## Examples

### Using small()

The code below creates an HTML string and then replaces the document's body with it:

```js
const contentString = "Hello, world";

document.body.innerHTML = contentString.small();
```

This will create the following HTML:

```html
<small>Hello, world</small>
```

Instead of using `small()` and creating HTML text directly, you should use DOM APIs such as `document.createElement()`. For example:

```js
const contentString = "Hello, world";
const elem = document.createElement("small");
elem.innerText = contentString;
document.body.appendChild(elem);
```

## See also

- Polyfill of `String.prototype.small` in `core-js`
- es-shims polyfill of `String.prototype.small`
- HTML wrapper methods
- ``
