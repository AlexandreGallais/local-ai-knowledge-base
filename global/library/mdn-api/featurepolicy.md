---
title: "FeaturePolicy"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/featurepolicy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FeaturePolicy

The `FeaturePolicy` interface represents the set of Permissions Policies applied to the current execution context.

## Instance methods

- `FeaturePolicy.allowsFeature` (experimental) (non-standard)
    Returns a Boolean that indicates whether or not a particular feature is enabled in the specified context.
- `FeaturePolicy.features` (experimental) (non-standard)
    Returns a list of names of all features supported by the User Agent. Features whose names appear on the list might not be allowed by the Permissions Policy of the current execution context and/or might be restricted by user-granted permissions.
- `FeaturePolicy.allowedFeatures` (experimental) (non-standard)
    Returns a list of names of all features supported by the User Agent and allowed by the Permissions Policy. Note that features appearing on this list might still be behind a user permission.
- `FeaturePolicy.getAllowlistForFeature` (experimental) (non-standard)
    Returns the allow for the specified feature.

## See also

- `Permissions-Policy`
- Privacy, permissions, and information security
