---
title: "Window: online event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/online_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: online event

The **`online`** event of the `Window` interface is fired when the browser has gained access to the network and the value of `Navigator.onLine` switches to `true`.

> **Note:**
> This event shouldn't be used to determine the availability of a particular website. Network problems or firewalls might still prevent the website from being reached.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("online", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ononline = (event) => { }
```

## Event type

A generic `Event`.

## Event handler aliases

In addition to the `Window` interface, the event handler property `ononline` is also available on the following targets:

- `HTMLBodyElement`
- `HTMLFrameSetElement`
- `SVGSVGElement`

## Examples

```js
// addEventListener version
window.addEventListener("online", (event) => {
  console.log("You are now connected to the network.");
});

// ononline version (but note that this replaces other event listeners
// added using ononline, if any)
window.ononline = (event) => {
  console.log("You are now connected to the network.");
};
```

## See also

- `offline`
