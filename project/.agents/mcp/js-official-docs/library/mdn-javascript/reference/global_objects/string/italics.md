---
title: "String.prototype.italics()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/italics/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.italics()

The **`italics()`** method of `String` values creates a string that embeds this string in an `` element (`str`), which causes this string to be displayed as italic.

> **Note:**
> All HTML wrapper methods are deprecated and only standardized for compatibility purposes. Use DOM APIs such as `document.createElement()` instead.

## Syntax

```js
italics()
```

### Parameters

None.

### Return value

A string beginning with an `` start tag, then the text `str`, and then an `` end tag.

## Examples

### Using italics()

The code below creates an HTML string and then replaces the document's body with it:

```js
const contentString = "Hello, world";

document.body.innerHTML = contentString.italics();
```

This will create the following HTML:

```html
<i>Hello, world</i>
```

Instead of using `italics()` and creating HTML text directly, you should use DOM APIs such as `document.createElement()`. For example:

```js
const contentString = "Hello, world";
const elem = document.createElement("i");
elem.innerText = contentString;
document.body.appendChild(elem);
```

## See also

- Polyfill of `String.prototype.italics` in `core-js`
- es-shims polyfill of `String.prototype.italics`
- HTML wrapper methods
- ``
