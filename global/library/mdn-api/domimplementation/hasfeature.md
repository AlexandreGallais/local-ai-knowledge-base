---
title: "DOMImplementation: hasFeature() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domimplementation/hasfeature/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMImplementation: hasFeature() method

The
**`DOMImplementation.hasFeature()`** method returns a
boolean flag indicating if a given feature is supported. It is
deprecated and modern browsers return `true` in all cases.

The different implementations fairly diverged in what kind of features were reported.
The latest version of the spec settled to force this method to always return
`true`, where the functionality was accurate and in use.

## Syntax

```js
hasFeature(feature, version)
```

### Parameters

- `feature`
    A string representing the feature name.
- `version`
    A string representing the version of the specification defining
    the feature.

### Return value

A boolean value of `true`.

## See also

- The `DOMImplementation` interface it belongs to.
