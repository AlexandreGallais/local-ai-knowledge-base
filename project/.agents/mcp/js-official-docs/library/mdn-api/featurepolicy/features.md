---
title: "FeaturePolicy: features() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/featurepolicy/features/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FeaturePolicy: features() method

The **`features()`** method of the
`FeaturePolicy` interface returns a list of names of all features
supported by the User Agent. Feature whose name appears on the list might not be
allowed by the Permissions Policy of the current execution context and/or might not be
accessible because of user's permissions.

## Syntax

```js
features()
```

### Parameters

None.

### Return value

A list of strings that represent names of all Permissions Policy directives supported by
the user agent.

## Example

The following example logs all the supported directives in the console.

```js
// Get the FeaturePolicy object
const featurePolicy = document.featurePolicy;

// Retrieve the list of all supported Permissions Policy directives
const supportedDirectives = featurePolicy.features();

// Print out each directive into the console
for (const directive of supportedDirectives) {
  console.log(directive);
}
```
