---
title: "Window: afterprint event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/afterprint_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: afterprint event

The **`afterprint`** event is fired after the associated document has started printing or the print preview has been closed.

The `beforeprint` and `afterprint` events allow pages to change their content before printing starts (perhaps to remove a banner, for example) and then revert those changes after printing has completed. In general, you should prefer the use of a `@media print` CSS at-rule, but it may be necessary to use these events in some cases.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("afterprint", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onafterprint = (event) => { }
```

## Event type

A generic `Event`.

## Examples

Using `addEventListener()`:

```js
window.addEventListener("afterprint", (event) => {
  console.log("After print");
});
```

Using the `onafterprint` event handler property (but note that this replaces other event listeners added using `onafterprint`, if any):

```js
window.onafterprint = (event) => {
  console.log("After print");
};
```

## See also

- Related events: `beforeprint`
