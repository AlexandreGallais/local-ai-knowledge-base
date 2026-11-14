---
title: "Element: transitioncancel event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/transitioncancel_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: transitioncancel event

The **`transitioncancel`** event is fired when a CSS transition is canceled.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("transitioncancel", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ontransitioncancel = (event) => { }
```

## Event type

A `TransitionEvent`. Inherits from `Event`.

## Examples

This code gets an element that has a transition defined and adds a listener to the `transitioncancel` event:

```js
const transition = document.querySelector(".transition");

transition.addEventListener("transitioncancel", () => {
  console.log("Transition canceled");
});
```

The same, but using the `ontransitioncancel` property instead of `addEventListener()` (but note that this replaces other event listeners added using `ontransitioncancel`, if any):

```js
const transition = document.querySelector(".transition");

transition.ontransitioncancel = () => {
  console.log("Transition canceled");
};
```

### Live example

In the following example, we have a simple `` element, styled with a transition that includes a delay:

```html
<div class="transition"></div>
<div class="message"></div>
```

```css
.transition {
  width: 100px;
  height: 100px;
  background: red;
  transition-property: transform, background;
  transition-duration: 2s;
  transition-delay: 2s;
}

.transition:hover {
  transform: rotate(90deg);
  background: transparent;
}
```

To this, we'll add some JavaScript to indicate that the `transitionstart`, `transitionrun`, `transitioncancel`, and `transitionend` events fire. In this example, to cancel the transition, stop hovering over the transitioning box before the transition ends. For the transition end event to fire, stay hovered over the transition until the transition ends.

```js
const message = document.querySelector(".message");
const el = document.querySelector(".transition");

el.addEventListener("transitionrun", () => {
  message.textContent = "transitionrun fired";
});

el.addEventListener("transitionstart", () => {
  message.textContent = "transitionstart fired";
});

el.addEventListener("transitioncancel", () => {
  message.textContent = "transitioncancel fired";
});

el.addEventListener("transitionend", () => {
  message.textContent = "transitionend fired";
});
```

The `transitioncancel` event is fired if the transition is canceled in either direction after the `transitionrun` event occurs and before the `transitionend` is fired.

If there is no transition delay or duration, if both are 0s or neither is declared, there is no transition, and none of the transition events are fired.

If the `transitioncancel` event is fired, the `transitionend` event will not fire.

## See also

- The `TransitionEvent` interface
- CSS properties: `transition`, `transition-delay`, `transition-duration`, `transition-property`, `transition-timing-function`
- Related events: `transitionrun`, `transitionstart`, `transitionend`
