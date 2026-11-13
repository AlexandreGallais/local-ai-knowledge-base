---
title: "Ink"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ink/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Ink

The **`Ink`** interface of the Ink API provides access to `DelegatedInkTrailPresenter` objects for the application to use to render ink strokes.

## Instance methods

- `requestPresenter()` (experimental)
    Returns a `Promise` that fulfills with a `DelegatedInkTrailPresenter` object to handle rendering strokes.

## Example

```js
async function inkInit() {
  const ink = navigator.ink;
  let presenter = await ink.requestPresenter({ presentationArea: canvas });

  // …
}
```
