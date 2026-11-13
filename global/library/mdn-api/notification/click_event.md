---
title: "Notification: click event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notification/click_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Notification: click event

The **`click`** event of the `Notification`
interface fires when the user clicks on displayed `Notification`.

The default behavior is to move the focus to the viewport of the notification's related
browsing context.
If you don't want that behavior, call `preventDefault()` on the event object.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("click", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onclick = (event) => { }
```

## Event type

A generic `Event`.

## Examples

In the following example, we use an onclick handler to open a webpage in a new tab
(specified by the inclusion of the `'_blank'` parameter) once a notification
is clicked:

```js
notification.onclick = (event) => {
  event.preventDefault(); // prevent the browser from focusing the Notification's tab
  window.open("https://www.mozilla.org", "_blank");
};
```

## See also

- Using the Notifications API
