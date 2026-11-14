---
title: "Element: transitionstart event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/transitionstart_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: transitionstart event

The **`transitionstart`** event is fired when a CSS transition has actually started, i.e., after any `transition-delay` has ended.

This event is not cancelable.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("transitionstart", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ontransitionstart = (event) => { }
```

## Event type

A `TransitionEvent`. Inherits from `Event`.

## Examples

This code adds a listener to the `transitionstart` event:

```js
element.addEventListener("transitionstart", () => {
  console.log("Started transitioning");
});
```

The same, but using the `ontransitionstart` property instead of `addEventListener()` (but note that this replaces other event listeners added using `ontransitionstart`, if any):

```js
element.ontransitionstart = () => {
  console.log("Started transitioning");
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
const transition = document.querySelector(".transition");
const message = document.querySelector(".message");

transition.addEventListener("transitionrun", () => {
  message.textContent = "transitionrun fired";
});

transition.addEventListener("transitionstart", () => {
  message.textContent = "transitionstart fired";
});

transition.addEventListener("transitionend", () => {
  message.textContent = "transitionend fired";
});
```

The difference is that:

- transitionrun fires when the transition is created (i.e., at the start of any delay).
- transitionstart fires when the actual animation has begun (i.e., at the end of any delay).

## See also

- The `TransitionEvent` interface
- CSS properties: `transition`, `transition-delay`, `transition-duration`, `transition-property`, `transition-timing-function`
- Related events: `transitionend`, `transitionrun`, `transitioncancel`
