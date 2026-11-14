---
title: "Notification: navigate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notification/navigate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Notification: navigate property

The **`navigate`** read-only property of the `Notification` interface contains the URL the user agent will navigate to when the user activates the notification.

This is the resolved value of the URL, if any, that was specified in the `navigate` option of the `Notification()` constructor or `ServiceWorkerRegistration.showNotification()`.

Normally, activating a non-persistent notification fires the `click` event on its `Notification` object, and activating a persistent notification fires the `notificationclick` event on the `ServiceWorkerGlobalScope`.

When a notification with a navigation URL is activated by the user, the user agent navigates to the specified URL instead of firing either of these events. This allows notifications to direct users to a specific page without requiring an event handler.

## Value

A string containing a URL, or an empty string if no navigation URL has been set.

## Examples

### Reading the navigate property value

The `navigate` property returns the resolved URL string when a navigation URL has been set, or an empty string otherwise.

```js
const notification = new Notification("New message from Alice", {
  body: "Hey, are you free for lunch?",
  navigate: "/messages/alice",
});

// The property contains the resolved absolute URL
console.log(notification.navigate); // e.g. "https://example.com/messages/alice"

// Without a navigate option, the property is an empty string
const basic = new Notification("Hello!");
console.log(basic.navigate); // ""
```

### Using navigate with a service worker

When using persistent notifications through a service worker, the `navigate` option allows the notification to open a page when activated, without needing to handle the `notificationclick` event.

```js
// Inside a service worker
self.registration.showNotification("Order shipped!", {
  body: "Your order #1234 has been shipped.",
  navigate: "/orders/1234",
});
```

## See also

- Using the Notifications API
- `Notification()` constructor
- `ServiceWorkerRegistration.showNotification()`
