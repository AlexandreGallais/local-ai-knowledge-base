---
title: "DOM events (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document_object_model/events/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOM events (part 2 of 2)

## Registering event handlers

There are two recommended approaches for registering handlers. Event handler code can be made to run when an event is triggered either by assigning it to the target element's corresponding _onevent_ property or by registering the handler as a listener for the element using the `addEventListener()` method. In either case, the handler will receive an object that conforms to the `Event` interface (or a derived interface). The main difference is that multiple event handlers can be added (or removed) using the event listener methods.

> **Warning:**
> A third approach for setting event handlers using HTML onevent attributes is not recommended! They inflate the markup and make it less readable and harder to debug. For more information, see Inline event handlers.

### Using onevent properties

By convention, JavaScript objects that fire events have corresponding "onevent" properties (named by prefixing "on" to the name of the event). These properties are called to run associated handler code when the event is fired, and may also be called directly by your own code.

To set event handler code, you can just assign it to the appropriate onevent property. Only one event handler can be assigned for every event in an element. If needed, the handler can be replaced by assigning another function to the same property.

The following example shows how to set a `greet()` function for the `click` event using the `onclick` property.

```js
const btn = document.querySelector("button");

function greet(event) {
  console.log("greet:", event);
}

btn.onclick = greet;
```

Note that an object representing the event is passed as the first argument to the event handler. This event object either implements or is derived from the `Event` interface.

### EventTarget.addEventListener

The most flexible way to set an event handler on an element is to use the `EventTarget.addEventListener` method. This approach allows multiple listeners to be assigned to an element and enables listeners to be _removed_, if needed, using `EventTarget.removeEventListener`.

> **Note:**
> The ability to add and remove event handlers allows you to, for example, have the same button performing different actions in different circumstances. In addition, in more complex programs, cleaning up old/unused event handlers can improve efficiency.

The following example shows how a `greet()` function can be set as a listener/event handler for the `click` event (you could use an anonymous function expression instead of a named function if desired). Note again that the event is passed as the first argument to the event handler.

```js
const btn = document.querySelector("button");

function greet(event) {
  console.log("greet:", event);
}

btn.addEventListener("click", greet);
```

The method can also take additional arguments/options to control aspects of how the events are captured and removed. More information can be found on the `EventTarget.addEventListener` reference page.

#### Using AbortSignal

A notable event listener feature is the ability to use an abort signal to clean up multiple event handlers at the same time.

This is done by passing the same `AbortSignal` to the `addEventListener()` call for all the event handlers that you want to be able to remove together. You can then call `abort()` on the controller owning the `AbortSignal`, and it will remove all event handlers that were added with that signal. For example, to add an event handler that we can remove with an `AbortSignal`:

```js
const controller = new AbortController();

btn.addEventListener(
  "click",
  (event) => {
    console.log("greet:", event);
  },
  { signal: controller.signal },
); // pass an AbortSignal to this handler
```

This event handler can then be removed like this:

```js
controller.abort(); // removes any/all event handlers associated with this controller
```

### Interaction of multiple event handlers

The `onevent` IDL property (for example, `element.onclick = ...`) and the HTML `onevent` content attribute (for example, ``) both target the same single handler slot. HTML loads before JavaScript could access the same element, so usually JavaScript replaces what's specified in HTML. Handlers added with `addEventListener()` are independent. Using `onevent` does not remove or replace listeners added with `addEventListener()`, and vice versa.

When an event is dispatched, listeners are called in phases. There are two phases: _capture_ and _bubble_. In the capture phase, the event starts from the highest ancestor element and moves down the DOM tree until it reaches the target. In the bubble phase, the event moves in the opposite direction. Event listeners by default listen in the bubble phase, and they can listen in the capturing phase by specifying `capture: true` with `addEventListener()`. Within a phase, listeners run in the order they were registered. The `onevent` handler is registered the first time it becomes non-null; later reassignments change only its callback, not its position in the order.

Calling `Event.stopPropagation()` prevents calling listeners on other elements later in the propagation chain. `Event.stopImmediatePropagation()` also prevents calling remaining listeners on the same element.

## See also

- Introduction to events
- Event bubbling
