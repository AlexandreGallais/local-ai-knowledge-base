---
title: "Push notifications for ASP.NET Core Blazor Progressive Web Applications (PWAs) (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/progressive-web-app/push-notifications.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Push notifications for ASP.NET Core Blazor Progressive Web Applications (PWAs) (part 2 of 2)

## Display notifications

The PWA's service worker (`service-worker.js`) must handle push notifications in order for the app to display them.

The following `push` event handler in the Blazing Pizza app calls `showNotification` to create a notification for the active service worker.

In `BlazingPizza/wwwroot/service-worker.js`:

```javascript
self.addEventListener('push', event => {
  const payload = event.data.json();
  event.waitUntil(
    self.registration.showNotification('Blazing Pizza', {
      body: payload.message,
      icon: 'img/icon-512.png',
      vibrate: [100, 50, 100],
      data: { url: payload.url }
    })
  );
});
```

The preceding code doesn't take effect until after the next page load when the browser logs `Installing service worker...`. When struggling to get the service worker to update, use the **Application** tab in the browser's developer tools console. Under **Service Workers**, choose **Update** or use **Unregister** to force a new registration on the next load.

With the preceding code in place and new order placed by a user, the order moves into *Out for delivery* status after 10 seconds per the app's built-in demonstration logic. The browser receives a push notification:

When using the app in either Google Chrome or Microsoft Edge, the notification appears even if the user isn't actively using the Blazing Pizza app. However, the browser must be running, or the notification appears the next time that the browser is opened.

When using the installed PWA, the notification should be delivered even if the user isn't running the app.

## Handle notification clicks

Register a `notificationclick` event handler to process a user selecting (clicking) a push notification on their device:

* Close the notification by calling `event.notification.close`.
* Call `clients.openWindow` to create a new top-level browsing context and load the URL passed to the method.

The following example in the Blazing Pizza app takes the user to the order status page for the order that pertains to the notification. The URL is provided by the `event.notification.data.url` parameter, which is sent by the server in the notification's payload.

In the service worker file (`service-worker.js`):

```javascript
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
```

If the PWA is installed on the device, the PWA is shown on the device. If the PWA isn't installed, the user is taken to the app's page in their browser.

## Related content

* Push API (MDN documentation)
* Message Encryption for Web Push (draft-ietf-webpush-encryption-08)
* Push API (W3C Working Draft 03 September 2024)
* Service Worker API (MDN documentation)
