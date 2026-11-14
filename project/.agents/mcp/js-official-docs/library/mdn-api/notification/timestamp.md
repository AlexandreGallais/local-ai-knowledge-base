---
title: "Notification: timestamp property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notification/timestamp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Notification: timestamp property

The **`timestamp`** read-only property of the
`Notification` interface returns a number, as
specified in the `timestamp` option of the
`Notification()` constructor.

The notification's timestamp can represent the time, in milliseconds since 00:00:00 UTC
on 1 January 1970, of the event for which the notification was created, or it can be an
arbitrary timestamp that you want associated with the notification. For example, a
timestamp for an upcoming meeting could be set in the future, whereas a timestamp for a
missed message could be set in the past.

## Value

A number representing a timestamp, given as Unix time in milliseconds.

## Examples

The following snippet fires a notification; a simple `options` object is
created, then the notification is fired using the `Notification()`
constructor.

```js
const dts = Math.floor(Date.now());

const options = {
  body: "Your code submission has received 3 new review comments.",
  timestamp: dts,
};

const n = new Notification("New review activity", options);

console.log(n.timestamp); // Logs the timestamp
```

## See also

- Using the Notifications API
