---
title: "Element: transitionrun event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/transitionrun_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: transitionrun event

The **`transitionrun`** event is fired when a CSS transition is first created, i.e., before any `transition-delay` has begun.

This event is not cancelable.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("transitionrun", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ontransitionrun = (event) => { }
```

## Event type

A `TransitionEvent`. Inherits from `Event`.

## Examples

This code adds a listener to the `transitionrun` event:

```js
el.addEventListener("transitionrun", () => {
  console.log(
    "Transition is running but hasn't necessarily started transitioning yet",
  );
});
```

The same, but using the `ontransitionrun` property instead of `addEventListener()` (but note that this replaces other event listeners added using `ontransitionrun`, if any):

```js
el.ontransitionrun = () => {
  console.log(
    "Transition started running, and will start transitioning when the transition delay has expired",
  );
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

To this, we'll add some JavaScript to indicate where the `transitionstart` and `transitionrun` events fire.

```js
const el = document.querySelector(".transition");
const message = document.querySelector(".message");

el.addEventListener("transitionrun", () => {
  message.textContent = "transitionrun fired";
});

el.addEventListener("transitionstart", () => {
  message.textContent = "transitionstart fired";
});

el.addEventListener("transitionend", () => {
  message.textContent = "transitionend fired";
});
```

The difference is that:

- `transitionrun` fires when the transition is created (i.e., at the start of any delay).
- `transitionstart` fires when the actual animation has begun (i.e., at the end of any delay).

The `transitionrun` will occur even if the transition is canceled before the delay expires. If there is no transition delay or if transition-delay is negative, both `transitionrun` and `transitionstart` are fired.

## See also

- The `TransitionEvent` interface
- CSS properties: `transition`, `transition-delay`, `transition-duration`, `transition-property`, `transition-timing-function`
- Related events: `transitionend`, `transitionstart`, `transitioncancel`
