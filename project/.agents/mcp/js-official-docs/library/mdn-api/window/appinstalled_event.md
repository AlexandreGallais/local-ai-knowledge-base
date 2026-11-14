---
title: "Window: appinstalled event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/appinstalled_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: appinstalled event

The **`appinstalled`** event of the Web Manifest API is fired when the browser has successfully installed a page as an application.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("appinstalled", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onappinstalled = (event) => { }
```

## Event type

A generic `Event`.

## Examples

You can use the `appinstalled` event in an `addEventListener` method:

```js
window.addEventListener("appinstalled", () => {
  console.log("Thank you for installing our app!");
});
```

Or use the `onappinstalled` event handler property (but note that this replaces other event listeners added using `onappinstalled`, if any):

```js
window.onappinstalled = () => {
  console.log("Thank you for installing our app!");
};
```
