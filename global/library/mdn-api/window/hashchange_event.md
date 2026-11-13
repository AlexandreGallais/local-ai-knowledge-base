---
title: "Window: hashchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/hashchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: hashchange event

The **`hashchange`** event is fired when the fragment identifier of the URL has changed (the part of the URL beginning with and following the `#` symbol).

This event does not fire when the hash is modified using `history.pushState()` or `history.replaceState()`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("hashchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onhashchange = (event) => { }
```

## Event type

A `HashChangeEvent`. Inherits from `Event`.

## Event handler aliases

In addition to the `Window` interface, the event handler property `onhashchange` is also available on the following targets:

- `HTMLBodyElement`
- `HTMLFrameSetElement`
- `SVGSVGElement`

## Examples

You can use the `hashchange` event in an `addEventListener` method:

```js
window.addEventListener("hashchange", () => {
  console.log("The hash has changed!");
});
```

Or use the `onhashchange` event handler property (but note that this replaces other event listeners added using `onhashchange`, if any):

```js
function locationHashChanged() {
  if (location.hash === "#cool-feature") {
    console.log("You're visiting a cool feature!");
  }
}

window.onhashchange = locationHashChanged;
```

## See also

- `popstate` event
