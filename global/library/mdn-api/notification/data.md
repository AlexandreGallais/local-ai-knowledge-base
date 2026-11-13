---
title: "Notification: data property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notification/data/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Notification: data property

The **`data`** read-only property of the
`Notification` interface returns a structured clone of the notification's
data, as specified in the `data` option of the
`Notification()` constructor.

The notification's data can be any arbitrary data that you want associated with the
notification.

## Value

A structured clone.

## Examples

The following snippet fires a notification; a simple `options` object is
created, then the notification is fired using the `Notification()`
constructor.

```js
const options = {
  body: "Your code submission has received 3 new review comments.",
  data: {
    url: "https://example.com/review/12345",
    status: "open",
  },
};

const n = new Notification("New review activity", options);

console.log(n.data); // Logs the data object
```

## See also

- Using the Notifications API
