---
title: "Notification: silent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notification/silent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Notification: silent property

The **`silent`** read-only property of the
`Notification` interface specifies whether the notification should be
silent, i.e., no sounds or vibrations should be issued regardless of the device
settings. This is controlled via the `silent` option of the
`Notification()` constructor.

## Value

A boolean value or `null`. If set to `true`, the notification is silent; if set to `null` (the default value), the device's default settings are respected.

## Examples

The following snippet fires a silent notification. An
`options` object is created, and the notification is fired in response to a button click using the
`Notification()` constructor. The code also includes rudimentary permissions handling, requesting permission from the user to fire notifications if it has not already been granted.

```js
const btn = document.querySelector("button");

const options = {
  body: "No annoying pings or vibrations?",
  silent: true,
};

function requestSilentNotification() {
  const n = new Notification("Silent notification", options);
  console.log(n.silent); // should return true
}

btn.addEventListener("click", () => {
  if (Notification.permission === "granted") {
    requestSilentNotification();
  } else {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        requestSilentNotification();
      } else {
        console.log("Notification permission was not granted");
      }
    });
  }
});
```

## See also

- Using the Notifications API
