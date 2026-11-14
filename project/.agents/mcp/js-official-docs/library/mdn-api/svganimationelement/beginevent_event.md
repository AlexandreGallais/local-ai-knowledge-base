---
title: "SVGAnimationElement: beginEvent event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimationelement/beginevent_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAnimationElement: beginEvent event

The **`beginEvent`** event of the `SVGAnimationElement` interface is fired when the element local timeline begins to play. It will be raised each time the element begins the active duration (i.e., when it restarts, but not when it repeats).

It may be raised both in the course of normal (i.e., scheduled or interactive) timeline play and in the case that the element was begun with a DOM method.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("beginEvent", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onbegin = (event) => { }
```

## Event type

A `TimeEvent`. Inherits from `Event`.

## Examples

### Animated circle

```html
<svg xmlns="http://www.w3.org/2000/svg" width="300px" height="100px">
  <title>SVG SMIL Animate with Path</title>
  <circle cx="0" cy="50" r="50" fill="blue" stroke="black" stroke-width="1">
    <animateMotion path="M 0 0 H 300 Z" dur="5s" repeatCount="indefinite" />
  </circle>
</svg>

<hr />

<ul></ul>
```

```css
ul {
  height: 100px;
  border: 1px solid #dddddd;
  overflow-y: scroll;
  padding: 10px 30px;
}
```

```js
let svgElem = document.querySelector("svg");
let animateElem = document.querySelector("animateMotion");
let list = document.querySelector("ul");

animateElem.addEventListener("beginEvent", () => {
  let listItem = document.createElement("li");
  listItem.textContent = "beginEvent fired";
  list.appendChild(listItem);
});

animateElem.addEventListener("repeatEvent", (e) => {
  let listItem = document.createElement("li");
  let msg = "repeatEvent fired";
  if (e.detail) {
    msg += `; repeat number: ${e.detail}`;
  }
  listItem.textContent = msg;
  list.appendChild(listItem);
});
```

### Using the event handler property

You can also create an event listener for the `begin` event using the `onbegin` event handler property (but note that this replaces other event listeners added using `onbegin`, if any):

```js
animateElem.onbegin = () => {
  console.log("beginEvent fired");
};
```

## See also

- SVG animation with SMIL
- `endEvent` event
- `repeatEvent` event
