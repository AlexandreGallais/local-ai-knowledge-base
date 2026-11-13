---
title: "FeaturePolicy: allowedFeatures() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/featurepolicy/allowedfeatures/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FeaturePolicy: allowedFeatures() method

The **`allowedFeatures()`** method of
the `FeaturePolicy` interface returns a list of directive names of all
features allowed by the Permissions Policy. This enables introspection of individual directives
of the Permissions Policy it is run on. As such, `allowedFeatures()` method
returns a subset of directives returned by `features()`.

## Syntax

```js
allowedFeatures()
```

### Parameters

None.

### Return value

An array of strings representing the Permissions Policy directive names that are allowed by
the Permissions Policy this method is called on.

## Example

The following example logs all the allowed directives for the current document. Please
note that these features might be restricted by the Permissions API, if the user did not
grant the corresponding permission yet.

```js
// First, get the Permissions Policy object
const featurePolicy = document.featurePolicy;

// Then query feature for specific
const allowed = featurePolicy.allowedFeatures();

for (const directive of allowed) {
  console.log(directive);
}
```
