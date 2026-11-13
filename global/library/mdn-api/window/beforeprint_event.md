---
title: "Window: beforeprint event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/beforeprint_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: beforeprint event

The **`beforeprint`** event is fired when the associated document is about to be printed or previewed for printing.

The `afterprint` and `beforeprint` events allow pages to change their content before printing starts (perhaps to remove a banner, for example) and then revert those changes after printing has completed. In general, you should prefer the use of a `@media print` CSS at-rule, but it may be necessary to use these events in some cases.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("beforeprint", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onbeforeprint = (event) => { }
```

## Event type

A generic `Event`.

## Examples

Using `addEventListener()`:

```js
window.addEventListener("beforeprint", (event) => {
  console.log("Before print");
});
```

Using the `onbeforeprint` event handler property (but note that this replaces other event listeners added using `onbeforeprint`, if any):

```js
window.onbeforeprint = (event) => {
  console.log("Before print");
};
```

## See also

- Related events: `afterprint`
