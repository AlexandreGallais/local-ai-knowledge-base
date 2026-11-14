---
title: "String.prototype.link()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/link/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.link()

The **`link()`** method of `String` values creates a string that embeds this string in an `` element (`str`), to be used as a hypertext link to another URL.

> **Note:**
> All HTML wrapper methods are deprecated and only standardized for compatibility purposes. Use DOM APIs such as `document.createElement()` instead.

## Syntax

```js
link(url)
```

### Parameters

- `url`
    Any string that specifies the `href` attribute of the `` element; it should be a valid URL (relative or absolute), with any `&` characters escaped as `&`.

### Return value

A string beginning with an `` start tag (double quotes in `url` are replaced with `"`), then the text `str`, and then an `` end tag.

## Examples

### Using link()

The code below creates an HTML string and then replaces the document's body with it:

```js
const contentString = "MDN Web Docs";

document.body.innerHTML = contentString.link("https://developer.mozilla.org/");
```

This will create the following HTML:

```html
<a href="https://developer.mozilla.org/">MDN Web Docs</a>
```

Instead of using `link()` and creating HTML text directly, you should use DOM APIs such as `document.createElement()`. For example:

```js
const contentString = "MDN Web Docs";
const elem = document.createElement("a");
elem.href = "https://developer.mozilla.org/";
elem.innerText = contentString;
document.body.appendChild(elem);
```

## See also

- Polyfill of `String.prototype.link` in `core-js`
- es-shims polyfill of `String.prototype.link`
- HTML wrapper methods
- ``
