---
title: "FeaturePolicy: allowsFeature() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/featurepolicy/allowsfeature/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FeaturePolicy: allowsFeature() method

The **`allowsFeature()`** method of
the `FeaturePolicy` interface enables introspection of individual
directives of the Permissions Policy it is run on. It returns a `Boolean`
that is `true` if and only if the specified feature is allowed in the
specified context (or the default context if no context is specified).

## Syntax

```js
allowsFeature(feature)
allowsFeature(feature, origin)
```

### Parameters

- `feature`
    The specific feature name to check its availability.
- `origin` (optional)
    The specific origin name to check its availability. If not specified, the default origin will be used.

### Return value

A `Boolean` that is `true` if and only if the feature is
allowed.

## Example

The following example queries whether or not the document is allowed to use camera API
by the Permissions Policy. Please note that Camera API might be restricted by the
Permissions API, if the user did not grant the corresponding permission yet.

```js
// First, get the Feature Policy object
const featurePolicy = document.featurePolicy;

// Then query feature for specific
const allowed = featurePolicy.allowsFeature("camera");

if (allowed) {
  console.log("FP allows camera.");
} else {
  console.log("FP does not allows camera.");
}
```
