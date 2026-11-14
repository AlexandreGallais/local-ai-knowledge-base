---
title: "HTMLGeolocationElement: HTMLGeolocationElement() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlgeolocationelement/htmlgeolocationelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLGeolocationElement: HTMLGeolocationElement() constructor

The **`HTMLGeolocationElement()`** constructor creates a new `HTMLGeolocationElement` object instance.

## Syntax

```js
new HTMLGeolocationElement()
```

### Parameters

None.

### Return value

A new `HTMLGeolocationElement` object instance, if used internally by the browser.

Developers cannot use the `HTMLGeolocationElement()` constructor directly to create a new `HTMLGeolocationElement` instance: attempting to do so results in an "illegal constructor" error.

### Examples

#### Creating a new `HTMLGeolocationElement` instance programmatically

To programmatically create a new `HTMLGeolocationElement` instance, instead of trying to use the constructor directly, you would create a new `<geolocation>` element instance using `Document.createElement()`:

```js
const geo = document.createElement("geolocation");
```

You can then use it by appending it to the DOM:

```js
document.body.append(geo);
```

## See also

- `<geolocation>` element
