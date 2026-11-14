---
title: "HTMLGeolocationElement: promptdismiss event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlgeolocationelement/promptdismiss_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLGeolocationElement: promptdismiss event

The **`promptdismiss`** event of the `HTMLGeolocationElement` interface is fired whenever the user activates the `<geolocation>` element and dismisses the resulting dialog, by pressing the "close" button or the `Esc` key.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("promptdismiss", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpromptdismiss = (event) => { }
```

## Event type

An `Event`.

## Examples

### Using `promptdismiss` to respond to user permission dismissal

In our Embedded map demo (source code), we use a `promptdismiss` event handler to respond to the user dismissing the `<geolocation>` permission prompt:

```js
geo.addEventListener("promptdismiss", notifyUserRetrySelection);
```

In the `notifyUserRetrySelection()` function, we ask the user to press the button again and allow location.

```js
function notifyUserRetrySelection() {
  statusElem.textContent =
    'Please press the "Use location" button again and allow location for this site.';
}
```

See the main `HTMLGeolocationElement` page for a full walkthrough of this example.

## See also

- `<geolocation>` element
