---
title: "HTMLGeolocationElement: validationstatuschange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlgeolocationelement/validationstatuschange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLGeolocationElement: validationstatuschange event

The **`validationstatuschange`** event of the `HTMLGeolocationElement` interface is fired whenever the `<geolocation>` element's `isValid` value changes.

This occurs as a result of a blocker being added to or removed from a `<geolocation>` element.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("validationstatuschange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onvalidationstatuschange = (event) => { }
```

## Event type

An `Event`.

## Examples

### Using `validationstatuschange` to report invalid reasons

In our Exploring invalid reasons demo (source code), we use a `validationstatuschange` event handler to report when a `<geolocation>` element becomes valid, and report the invalid reason when it becomes invalid:

```js
geo.addEventListener("validationstatuschange", () => {
  if (geo.isValid) {
    reasonElem.textContent = `<geolocation> is valid`;
  } else {
    reasonElem.textContent = `Invalid reason: ${geo.invalidReason}`;
  }
});
```

Whenever the validation status changes, we check whether the `<geolocation>` element is valid using `HTMLGeolocationElement.isValid`, and if so, print a message confirming this to the `` element text content. If the `<geolocation>` element is invalid, we print the `HTMLGeolocationElement.invalidReason` to the `` element text content.

See the `HTMLGeolocationElement.invalidReason` page for a full walkthrough of this example.

## See also

- `<geolocation>` element
