---
title: "Notification: icon property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notification/icon/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Notification: icon property

The **`icon`** read-only property of the `Notification` interface returns a string containing the URL of a small image that reinforces the notification — for example, an app logo or a photo of the message sender. It is displayed alongside the notification title and body.

See Notifications with different images for a comparison of the three image options.

## Value

A string.

## Examples

In our To-do list app (view the app running live), we use the `Notification()`
constructor to fire a notification, passing it arguments to specify the body, icon and
title we want.

```js
const notification = new Notification("To do list", {
  body: text,
  icon: img,
});
```

## See also

- Using the Notifications API
