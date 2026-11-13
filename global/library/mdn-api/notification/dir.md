---
title: "Notification: dir property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notification/dir/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Notification: dir property

The **`dir`** read-only property of the `Notification` interface indicates the text direction of the notification, as specified in the `dir` option of the `Notification()` constructor.

## Value

A string specifying the text direction. Possible values are:

- `auto`
    adopts the browser's language setting behavior (the default.)
- `ltr`
    left to right.
- `rtl`
    right to left.

> **Note:**
> Most browsers seem to ignore explicit ltr and rtl settings, and just go with the browser-wide setting.

## Examples

The following snippet fires a notification; a simple `options` object is created, then the notification is fired using the `Notification()` constructor.

```js
const options = {
  body: "Your code submission has received 3 new review comments.",
  dir: "rtl",
};

const n = new Notification("New review activity", options);

console.log(n.dir); // "rtl"
```

## See also

- Using the Notifications API
