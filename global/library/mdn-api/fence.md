---
title: "Fence"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fence/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Fence

The **`Fence`** interface of the `Fenced Frame API` contains several functions relevant to `<fencedframe>` functionality.

`Fence` objects are accessed through the `Window.fence` property, but they are only available to documents embedded inside `<fencedframe>`s (loaded via `FencedFrameConfig`s) or ``s (loaded via opaque URNs).

> **Note:**
> See How do `<fencedframe>`s work? for some description around `FencedFrameConfig`s and opaque URNs.

## Instance methods

- `getNestedConfigs()` (deprecated)
    Returns the `FencedFrameConfig`s loaded into `<fencedframe>`s embedded inside the current `<fencedframe>`.
- `reportEvent()` (deprecated)
    Triggers the submission of report data via a beacon to one or more specific URLs registered via the `registerAdBeacon()` method of the Protected Audience API, for the purpose of collecting ad auction results.
- `setReportEventDataForAutomaticBeacons()` (deprecated)
    Specifies event data that will be sent when a navigation occurs inside a `<fencedframe>`. This data will be sent via an automatic beacon to one or more specific URLs registered via the `registerAdBeacon()` method of the Protected Audience API, for the purpose of collecting reporting data for ad auction results.

## Examples

```js
window.fence.reportEvent({
  eventType: "click",
  eventData: JSON.stringify({ clickX: "123", clickY: "456" }),
  destination: ["buyer", "seller"],
});
```

## See also

- Fenced frames on privacysandbox.google.com
- The Privacy Sandbox on privacysandbox.google.com
