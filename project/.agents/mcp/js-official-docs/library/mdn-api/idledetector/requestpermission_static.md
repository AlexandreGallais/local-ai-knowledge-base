---
title: "IdleDetector: requestPermission() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idledetector/requestpermission_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IdleDetector: requestPermission() static method

The **`requestPermission()`** static method of the `IdleDetector`
interface returns a `Promise` that resolves with a string when the user has chosen
whether to grant the origin access to their idle state. Resolves with
`"granted"` on acceptance and `"denied"` on refusal.

## Syntax

```js
IdleDetector.requestPermission()
```

### Parameters

None.

### Return value

A `Promise` that resolves with `"granted"` or `"denied"`.

## Security

Transient user activation is required. The user has to interact with the page or a UI element in order for this feature to work.

## Examples

The following example uses a `click` event on a button to trigger requesting the user for permission to detect when user is idle.

```js
startButton.addEventListener("click", async () => {
  if ((await IdleDetector.requestPermission()) !== "granted") {
    console.error("Idle detection permission denied.");
    return;
  }
});
```
