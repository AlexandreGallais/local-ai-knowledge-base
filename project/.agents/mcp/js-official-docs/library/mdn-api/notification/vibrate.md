---
title: "Notification: vibrate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notification/vibrate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Notification: vibrate property

The **`vibrate`** read-only property of the `Notification`
interface specifies a vibration pattern
for the device's vibration hardware to emit when the notification fires. This is
specified in the `vibrate` option of the
`Notification()` constructor.

## Value

A vibration pattern, as specified in the Vibration API spec.

## Examples

The following snippet is intended to create a notification that also triggers a device
vibration; a simple `options` object is created, and then the notification is
fired using the `Notification()` constructor.

```js
const options = {
  body: "Your code submission has received 3 new review comments.",
  vibrate: [200, 100, 200],
};

const n = new Notification("New review activity", options);

console.log(n.vibrate); // [200, 100, 200]
```

## See also

- Using the Notifications API
