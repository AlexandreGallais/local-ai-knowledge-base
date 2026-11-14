---
title: "Window: languagechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/languagechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: languagechange event

The **`languagechange`** event is fired at the global scope object when the user's preferred language changes.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("languagechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onlanguagechange = (event) => { }
```

## Event type

A generic `Event`.

## Event handler aliases

In addition to the `Window` interface, the event handler property `onlanguagechange` is also available on the following targets:

- `HTMLBodyElement`
- `HTMLFrameSetElement`
- `SVGSVGElement`

## Examples

You can use the `languagechange` event in an `addEventListener` method:

```js
window.addEventListener("languagechange", () => {
  console.log("languagechange event detected!");
});
```

Or use the `onlanguagechange` event handler property (but note that this replaces other event listeners added using `onlanguagechange`, if any):

```js
<example-token> = (event) => {
  console.log("languagechange event detected!");
};
```

## See also

- `navigator.language`
- `navigator.languages`
- `navigator`
