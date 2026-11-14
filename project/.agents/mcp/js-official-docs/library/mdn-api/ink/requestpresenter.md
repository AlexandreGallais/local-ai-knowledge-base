---
title: "Ink: requestPresenter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ink/requestpresenter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Ink: requestPresenter() method

The **`requestPresenter()`** method of the `Ink` interface returns a `Promise` that fulfills with a `DelegatedInkTrailPresenter` object to handle rendering strokes.

## Syntax

```js
requestPresenter(param)
```

### Parameters

- `param` (optional)
    An object that contains the following property:
    - `presentationArea` (optional)
        An `Element` inside which rendering of ink strokes is confined (the element's border box, to be precise). If `param` is not included, or `presentationArea` is set to `null`, ink rendering is confined to the containing viewport by default.

### Return value

A `Promise` that resolves to a `DelegatedInkTrailPresenter` object instance.

### Exceptions

- `Error` `DOMException`
    An error is thrown and the operation is aborted if `presentationArea` is not a valid `Element`, or is not in the same document as the associated `Ink` object.

## Example

```js
async function inkInit() {
  const ink = navigator.ink;
  let presenter = await ink.requestPresenter({ presentationArea: canvas });

  // …
}
```
