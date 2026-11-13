---
title: "Element: transitionend event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/transitionend_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: transitionend event

The **`transitionend`** event is fired when a CSS transition has completed. In the case where a transition is removed before completion, such as if the `transition-property` is removed or `display` is set to `none`, then the event will not be generated.

The `transitionend` event is fired in both directions - as it finishes transitioning to the transitioned state, and when it fully reverts to the default or non-transitioned state. If there is no transition delay or duration, if both are 0s or neither is declared, there is no transition, and none of the transition events are fired. If the `transitioncancel` event is fired, the `transitionend` event will not fire.

This event is not cancelable.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("transitionend", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ontransitionend = (event) => { }
```

## Event type

A `TransitionEvent`. Inherits from `Event`.

## Examples

This code gets an element that has a transition defined and adds a listener to the `transitionend` event:

```js
const transition = document.querySelector(".transition");

transition.addEventListener("transitionend", () => {
  console.log("Transition ended");
});
```

The same, but using `ontransitionend` (but note that this replaces other event listeners added using `ontransitionend`, if any):

```js
const transition = document.querySelector(".transition");

transition.ontransitionend = () => {
  console.log("Transition ended");
};
```

### Live example

In the following example, we have a simple `` element, styled with a transition that includes a delay:

```html
<div class="transition">Hover over me</div>
<div class="message"></div>
```

```css
.transition {
  width: 100px;
  height: 100px;
  background: red;
  transition-property: transform, background;
  transition-duration: 2s;
  transition-delay: 1s;
}

.transition:hover {
  transform: rotate(90deg);
  background: transparent;
}
```

To this, we'll add some JavaScript to indicate that the `transitionstart`, `transitionrun`, `transitioncancel` and `transitionend` events fire. In this example, to cancel the transition, stop hovering over the transitioning box before the transition ends. For the transition end event to fire, stay hovered over the transition until the transition ends.

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

The `transitionend` event is fired in both directions: when the box finishes turning and the opacity hits 0 or 1, depending on the direction.

If there is no transition delay or duration, if both are 0s or neither is declared, there is no transition, and none of the transition events are fired.

If the `transitioncancel` event is fired, the `transitionend` event will not fire.

## See also

- The `TransitionEvent` interface
- CSS properties: `transition`, `transition-delay`, `transition-duration`, `transition-property`, `transition-timing-function`
- Related events: `transitionrun`, `transitionstart`, `transitioncancel`
