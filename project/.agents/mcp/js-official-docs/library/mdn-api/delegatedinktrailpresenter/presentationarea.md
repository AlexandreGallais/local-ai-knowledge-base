---
title: "DelegatedInkTrailPresenter: presentationArea property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/delegatedinktrailpresenter/presentationarea/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DelegatedInkTrailPresenter: presentationArea property

The **`presentationArea`** read-only property of the `DelegatedInkTrailPresenter` interface returns the `Element` inside which rendering of ink strokes is confined.

If the preceding `Ink.requestPresenter()` method call included a specific `presentationArea` element definition, then that will be the element returned. Otherwise, the default is returned, which is the containing viewport.

This area is always the client coordinates for the element's border box, so moving the element or scrolling the element requires no recalculation on the developer's part.

## Value

An `Element`.

## Example

```js
async function inkInit() {
  const ink = navigator.ink;
  const presenter = await ink.requestPresenter({ presentationArea: canvas });
  console.log(presenter.presentationArea);

  // …
}
```
