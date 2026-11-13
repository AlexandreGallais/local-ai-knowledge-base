---
title: "DelegatedInkTrailPresenter: expectedImprovement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/delegatedinktrailpresenter/expectedimprovement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DelegatedInkTrailPresenter: expectedImprovement property

The **`expectedImprovement`** read-only property of the `DelegatedInkTrailPresenter` interface returns a value, in milliseconds, indicating the latency improvement that can be expected using this presenter.

## Value

A number.

## Example

```js
async function inkInit() {
  const ink = navigator.ink;
  const presenter = await ink.requestPresenter({ presentationArea: canvas });
  console.log(presenter.expectedImprovement);

  // …
}
```

## Specifications

The feature is no longer a part of the specification.
