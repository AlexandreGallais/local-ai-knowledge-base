---
title: "String.prototype.sub()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/sub/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.sub()

The **`sub()`** method of `String` values creates a string that embeds this string in a `` element (`str`), which causes this string to be displayed as subscript.

> **Note:**
> All HTML wrapper methods are deprecated and only standardized for compatibility purposes. Use DOM APIs such as `document.createElement()` instead.

## Syntax

```js
sub()
```

### Parameters

None.

### Return value

A string beginning with a `` start tag, then the text `str`, and then a `` end tag.

## Examples

### Using sub()

The code below creates an HTML string and then replaces the document's body with it:

```js
const contentString = "Hello, world";

document.body.innerHTML = contentString.sub();
```

This will create the following HTML:

```html
<sub>Hello, world</sub>
```

Instead of using `sub()` and creating HTML text directly, you should use DOM APIs such as `document.createElement()`. For example:

```js
const contentString = "Hello, world";
const elem = document.createElement("sub");
elem.innerText = contentString;
document.body.appendChild(elem);
```

## See also

- Polyfill of `String.prototype.sub` in `core-js`
- es-shims polyfill of `String.prototype.sub`
- HTML wrapper methods
- ``
