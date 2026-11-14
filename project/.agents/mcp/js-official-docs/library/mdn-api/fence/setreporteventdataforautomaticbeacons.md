---
title: "Fence: setReportEventDataForAutomaticBeacons() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fence/setreporteventdataforautomaticbeacons/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Fence: setReportEventDataForAutomaticBeacons() method

The **`setReportEventDataForAutomaticBeacons()`** method of the
`Fence` interface specifies event data that will be sent when a navigation occurs inside a `<fencedframe>`. This data will be sent via an automatic beacon to one or more specific URLs registered via the `registerAdBeacon()` method of the Protected Audience API, for the purpose of collecting reporting data for ad auction results.

> **Note:**
> `reportEvent()` provides similar report data submission, except in that case the submission is triggered via an explicit method call rather than a navigation.

## Syntax

```js
setReportEventDataForAutomaticBeacons(event)
```

### Parameters

- `event`
    an object representing the data to send. The possible properties are as follows:
    - `eventType`
        A string representing the type of event that is being reported. The available values are:
        - `reserved.top_navigation_start`: An event fired when a top-level navigation begins.
        - `reserved.top_navigation_commit`: An event fired when a top-level navigation completes.
    - `eventData`
        A string representing the data to be sent.
    - `destination`
        An array containing one or more enumerated values representing destination types. These are the involved parties that will receive the data to their registered URLs (i.e., via `registerAdBeacon()`). The possible values are:
        - `"buyer"`: The bidder in the ad auction.
        - `"seller"`: The top-level seller running the ad auction.
        - `"component-seller"`: The seller for a component auction in a multi-level auction.
        - `"direct-seller"`: The seller that directly ran the auction the buyer bid in. If the ad was a single-level auction, the value used will be `"seller"`. If the ad was a multi-level auction, the value used will be `"component-seller"`.
        - `"shared-storage-select-url"`: A Shared Storage API storage location, as defined in a `Window.sharedStorage.selectURL()` method call.
    - `once` (optional)
        A boolean value. If set to `true`, the automatic beacon will only be sent for the next event, and beacons will not be sent for subsequent events until `setReportEventDataForAutomaticBeacons()` is invoked again. For example, when used with a `click` handler this can be used to send beacon data only for specific top-level navigations, rather than for every top-level navigation. This property defaults to `false`.

### Return value

None (`Undefined`).

## Examples

```js
window.fence.setReportEventDataForAutomaticBeacons({
  eventType: "reserved.top_navigation_start",
  eventData: "an example string",
  destination: ["seller", "buyer"],
});
```

## See also

- Fenced frames on privacysandbox.google.com
- The Privacy Sandbox on privacysandbox.google.com
