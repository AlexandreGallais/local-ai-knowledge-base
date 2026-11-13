---
title: "BackgroundFetchEvent: registration property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchevent/registration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchEvent: registration property

The **`registration`** read-only property of the `BackgroundFetchEvent` interface returns a `BackgroundFetchRegistration` object.

## Value

A `BackgroundFetchRegistration`.

## Examples

In this example, if the user clicks on the user interface displaying the download progress, this fires the `backgroundfetchclick` event. The current `BackgroundFetchRegistration` is returned by calling `event.registration`.

```js
addEventListener("backgroundfetchclick", (event) => {
  console.log(event.registration);
});
```
