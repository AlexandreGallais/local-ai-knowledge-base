---
title: "Notification: renotify property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notification/renotify/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Notification: renotify property

The **`renotify`** read-only property of the
`Notification` interface specifies whether the user should be notified
after a new notification replaces an old one, as specified in the `renotify`
option of the `Notification()` constructor.

## Value

A boolean value. `false` is the default; `true` makes
the notification renotify the user.

## Examples

The following snippet is intended to fire a notification that renotifies the user after
it has been replaced; a simple `options` object is created, and then the
notification is fired using the `Notification()` constructor.

```js
const options = {
  body: "Your code submission has received 3 new review comments.",
  renotify: true,
};

const n = new Notification("New review activity", options);

console.log(n.renotify); // true
```

## See also

- Using the Notifications API
