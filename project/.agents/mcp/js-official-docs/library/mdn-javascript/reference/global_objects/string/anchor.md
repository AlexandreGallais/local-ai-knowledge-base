---
title: "String.prototype.anchor()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/anchor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.anchor()

The **`anchor()`** method of `String` values creates a string that embeds this string in an `` element with a name (`str`).

> **Note:**
> All HTML wrapper methods are deprecated and only standardized for compatibility purposes. Use DOM APIs such as `document.createElement()` instead.
>
> The HTML specification no longer allows the `` element to have a `name` attribute, so this method doesn't even create valid markup.

## Syntax

```js
anchor(name)
```

### Parameters

- `name`
    A string representing a `name` value to put into the generated `` start tag.

### Return value

A string beginning with an `` start tag (double quotes in `name` are replaced with `"`), then the text `str`, and then an `` end tag.

## Examples

### Using anchor()

The code below creates an HTML string and then replaces the document's body with it:

```js
const contentString = "Hello, world";

document.body.innerHTML = contentString.anchor("hello");
```

This will create the following HTML:

```html
<a name="hello">Hello, world</a>
```

> **Warning:**
> This markup is invalid, because `name` is no longer a valid attribute of the `` element.

Instead of using `anchor()` and creating HTML text directly, you should use DOM APIs such as `document.createElement()`. For example:

```js
const contentString = "Hello, world";
const elem = document.createElement("a");
elem.innerText = contentString;
document.body.appendChild(elem);
```

## See also

- Polyfill of `String.prototype.anchor` in `core-js`
- es-shims polyfill of `String.prototype.anchor`
- HTML wrapper methods
- ``
