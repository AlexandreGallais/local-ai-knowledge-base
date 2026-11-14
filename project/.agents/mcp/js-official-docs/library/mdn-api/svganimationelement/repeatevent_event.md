---
title: "SVGAnimationElement: repeatEvent event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimationelement/repeatevent_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAnimationElement: repeatEvent event

The **`repeatEvent`** event of the `SVGAnimationElement` interface is fired when the element's local timeline repeats. It will be fired each time the element repeats, after the first iteration.

> **Note:**
> Associated with the `repeatEvent` event is an integer that indicates which repeat iteration is beginning; this can be found in the `detail` property of the event object. The value is a 0-based integer, but the repeat event is not raised for the first iteration and so the observed values will be >= 1. This is supported in Firefox, but not in Chrome.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("repeatEvent", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onrepeat = (event) => { }
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

You can also create an event listener for the `repeat` event using the `onrepeat` event handler property (but note that this replaces other event listeners added using `onrepeat`, if any):

```js
animateElem.onrepeat = () => {
  console.log("repeatEvent fired");
};
```

## See also

- SVG animation with SMIL
- `beginEvent` event
- `endEvent` event
