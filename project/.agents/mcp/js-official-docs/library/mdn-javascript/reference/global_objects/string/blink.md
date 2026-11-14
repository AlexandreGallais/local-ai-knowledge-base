---
title: "String.prototype.blink()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/blink/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.blink()

The **`blink()`** method of `String` values creates a string that embeds this string in a `<blink>` element (`<blink>str</blink>`), which used to cause a string to blink in old browsers.

> **Note:**
> All HTML wrapper methods are deprecated and only standardized for compatibility purposes. For the case of `blink()`, the `<blink>` element itself is removed from modern browsers, and blinking text is frowned upon by several accessibility standards. Avoid using the element in any way.

## Syntax

```js
blink()
```

### Parameters

None.

### Return value

A string beginning with a `<blink>` start tag, then the text `str`, and then a `</blink>` end tag.

## Examples

### Using blink()

The code below creates an HTML string and then replaces the document's body with it:

```js
const contentString = "Hello, world";

document.body.innerHTML = contentString.blink();
```

This will create the following HTML:

```html
<blink>Hello, world</blink>
```

> **Warning:**
> This markup is invalid, because `blink` is no longer a valid element.

You should avoid blinking elements altogether.

## See also

- Polyfill of `String.prototype.blink` in `core-js`
- es-shims polyfill of `String.prototype.blink`
- HTML wrapper methods
