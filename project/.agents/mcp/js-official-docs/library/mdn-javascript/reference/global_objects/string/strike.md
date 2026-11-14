---
title: "String.prototype.strike()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/strike/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.strike()

The **`strike()`** method of `String` values creates a string that embeds this string in a `<strike>` element (`<strike>str</strike>`), which causes this string to be displayed as struck-out text.

> **Note:**
> All HTML wrapper methods are deprecated and only standardized for compatibility purposes. For the case of `strike()`, the `<strike>` element itself has been removed from the HTML specification and shouldn't be used anymore. Web developers should use the `` for deleted content or the `` for content that is no longer accurate or no longer relevant instead.

## Syntax

```js
strike()
```

### Parameters

None.

### Return value

A string beginning with a `<strike>` start tag, then the text `str`, and then a `</strike>` end tag.

## Examples

### Using strike()

The code below creates an HTML string and then replaces the document's body with it:

```js
const contentString = "Hello, world";

document.body.innerHTML = contentString.strike();
```

This will create the following HTML:

```html
<strike>Hello, world</strike>
```

> **Warning:**
> This markup is invalid, because `strike` is no longer a valid element.

Instead of using `strike()` and creating HTML text directly, you should use DOM APIs such as `document.createElement()`. For example:

```js
const contentString = "Hello, world";
const elem = document.createElement("s");
elem.innerText = contentString;
document.body.appendChild(elem);
```

## See also

- Polyfill of `String.prototype.strike` in `core-js`
- es-shims polyfill of `String.prototype.strike`
- HTML wrapper methods
- `<strike>`
