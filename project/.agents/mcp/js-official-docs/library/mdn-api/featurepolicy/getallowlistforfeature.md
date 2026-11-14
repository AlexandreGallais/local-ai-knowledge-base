---
title: "FeaturePolicy: getAllowlistForFeature() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/featurepolicy/getallowlistforfeature/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FeaturePolicy: getAllowlistForFeature() method

The **`getAllowlistForFeature()`**
method of the `FeaturePolicy` interface enables querying of the allowlist for a specific feature for the current Permissions Policy.

## Syntax

```js
getAllowlistForFeature(feature)
```

### Parameters

- `feature`
    The specific feature name to get its allowlist.

### Return value

An array of strings containing the serialized list of allowed origins for the feature. If a wildcard (`*`) is used, the array will contain `*`.

### Exceptions

The function will raise a warning if the specified Permissions Policy directive name is not
known. However, it will also return empty array, indicating that no origin is allowed to
use the feature.

## Example

The following example prints all the origins that are allowed to use Camera API by the
Permissions Policy. Please note that Camera API might also be restricted by the Permissions API, if the user did not grant the corresponding permission.

```js
// First, get the FeaturePolicy object
const featurePolicy = document.featurePolicy;

// Query for specific feature
const allowlist = featurePolicy.getAllowlistForFeature("camera");

for (const origin of allowlist) {
  console.log(origin);
}
```
