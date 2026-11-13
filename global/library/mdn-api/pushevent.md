---
title: "PushEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushEvent

The **`PushEvent`** interface of the Push API represents a push message that has been received. This event is sent to the global scope of a `ServiceWorker`. It contains the information sent from an application server to a `PushSubscription`.

## Constructor

- `PushEvent()`
    Creates a new `PushEvent` object.

## Instance properties

_Inherits properties from its parent, `ExtendableEvent`. Additional properties:_

- `PushEvent.data` (read-only)
    Returns a reference to a `PushMessageData` object containing data sent to the `PushSubscription`.

## Instance methods

_Inherits methods from its parent, `ExtendableEvent`_.

## Examples

The following example takes data from a `PushEvent` and displays it on all of the service worker's clients.

```js
self.addEventListener("push", (event) => {
  if (!(self.Notification && self.Notification.permission === "granted")) {
    return;
  }

  const data = event.data?.json() ?? {};
  const title = data.title || "Something Has Happened";
  const message =
    data.message || "Here's something you might want to check out.";
  const icon = "images/new-notification.png";

  const notification = new self.Notification(title, {
    body: message,
    tag: "simple-push-demo-notification",
    icon,
  });

  notification.addEventListener("click", () => {
    clients.openWindow(
      "https://example.blog.com/2015/03/04/something-new.html",
    );
  });
});
```

## See also

- Push API
- Service Worker API
