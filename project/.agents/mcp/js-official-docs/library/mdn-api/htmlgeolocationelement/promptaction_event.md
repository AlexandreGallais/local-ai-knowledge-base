---
title: "HTMLGeolocationElement: promptaction event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlgeolocationelement/promptaction_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLGeolocationElement: promptaction event

The **`promptaction`** event of the `HTMLGeolocationElement` interface is fired whenever the user activates the `<geolocation>` element and selects an option from the resulting dialog, either to grant or deny `geolocation` permission.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("promptaction", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpromptaction = (event) => { }
```

## Event type

An `Event`.

## Examples

### Using `promptaction` to respond to user permission choices

In our Embedded map demo (source code), we use a `promptaction` event handler to respond to the user making a choice in the `<geolocation>` permission prompt:

```js
geo.addEventListener("promptaction", notifyUserGrantPermission);
```

In the `notifyUserGrantPermission()` function, we use the `HTMLGeolocationElement.permissionStatus` property to check whether the permission status is `denied` or `prompt` and if so, we ask the user to press the button again and allow location. We don't need to ask this if they already granted permission.

```js
function notifyUserGrantPermission() {
  if (geo.permissionStatus === "denied" || geo.permissionStatus === "prompt") {
    statusElem.textContent =
      'Please press the "Use location" button again and allow location for this site.';
  }
}
```

See the main `HTMLGeolocationElement` page for a full walkthrough of this example.

## See also

- `<geolocation>` element
