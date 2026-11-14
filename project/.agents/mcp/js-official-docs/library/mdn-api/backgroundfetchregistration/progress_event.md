---
title: "BackgroundFetchRegistration: progress event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchregistration/progress_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchRegistration: progress event

The **`progress`** event of the `BackgroundFetchRegistration` interface thrown when the associated background fetch progresses.

Practically, this event is fired when any of the following properties will return a new value:

- `uploaded`,
- `downloaded`,
- `result`, or
- `failureReason`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("progress", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onprogress = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Example

The following example demonstrates how to log the progress of a download. The code first checks that a `downloadTotal` was provided when the background fetch was registered. This is then used to calculate the percentage, based on the `downloaded` property.

```js
bgFetch.addEventListener("progress", () => {
  if (!bgFetch.downloadTotal) return;
  const percent = Math.round(
    (bgFetch.downloaded / bgFetch.downloadTotal) * 100,
  );
  console.log(`Download progress: ${percent}%`);
});
```
