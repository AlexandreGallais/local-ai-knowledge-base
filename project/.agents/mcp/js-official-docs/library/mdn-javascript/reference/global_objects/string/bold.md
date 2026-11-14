---
title: "String.prototype.bold()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/bold/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.bold()

The **`bold()`** method of `String` values creates a string that embeds this string in a `` element (`str`), which causes this string to be displayed as bold.

> **Note:**
> All HTML wrapper methods are deprecated and only standardized for compatibility purposes. Use DOM APIs such as `document.createElement()` instead.

## Syntax

```js
bold()
```

### Parameters

None.

### Return value

A string beginning with a `` start tag, then the text `str`, and then a `` end tag.

## Examples

### Using bold()

The code below creates an HTML string and then replaces the document's body with it:

```js
const contentString = "Hello, world";

document.body.innerHTML = contentString.bold();
```

This will create the following HTML:

```html
<b>Hello, world</b>
```

Instead of using `bold()` and creating HTML text directly, you should use DOM APIs such as `document.createElement()`. For example:

```js
const contentString = "Hello, world";
const elem = document.createElement("b");
elem.innerText = contentString;
document.body.appendChild(elem);
```

## See also

- Polyfill of `String.prototype.bold` in `core-js`
- es-shims polyfill of `String.prototype.bold`
- HTML wrapper methods
- ``
