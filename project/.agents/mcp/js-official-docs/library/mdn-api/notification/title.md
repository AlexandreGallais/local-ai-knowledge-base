---
title: "Notification: title property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notification/title/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Notification: title property

The **`title`** read-only property of the
`Notification` interface indicates the title of the notification, as
specified in the `title` parameter of the
`Notification()` constructor.

## Value

A string.

## Examples

```js
function spawnNotification(theBody, theIcon, theTitle) {
  const options = {
    body: theBody,
    icon: theIcon,
  };

  const n = new Notification(theTitle, options);

  console.log(n.title);
}
```

## See also

- Using the Notifications API
