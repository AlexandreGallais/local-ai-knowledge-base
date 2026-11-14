---
title: "Fence: getNestedConfigs() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fence/getnestedconfigs/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Fence: getNestedConfigs() method

The **`getNestedConfigs()`** method of the
`Fence` interface returns the `FencedFrameConfig`s loaded into `<fencedframe>`s embedded inside the current `<fencedframe>`.

## Syntax

```js
getNestedConfigs()
```

### Parameters

None.

### Return value

`getNestedConfigs()` has two possible return values:

- An array of 20 `FencedFrameConfig` objects, if the current `<fencedframe>`'s config was created using an API that supports nested configs (for example Protected Audience). Of these 20 configs, the first N configs are those registered through the API and the rest are padding configs that will navigate to `about:blank`, so that the number of configs is hidden and cannot leak any information.
- `null` if the current `<fencedframe>`'s config was created using an API that does not support nested configs (for example Shared Storage).

## Examples

```js
// Run inside a <fencedframe>

// Retrieve the configs of embedded fenced frames
const configs = window.fence.getNestedConfigs();

// Set a new fenced frame's config to equal one of the retrieved configs
const frame = document.createElement("fencedframe");
frame.config = configs[0];
```

## See also

- Fenced frames on privacysandbox.google.com
- The Privacy Sandbox on privacysandbox.google.com
