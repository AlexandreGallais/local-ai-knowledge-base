---
title: "EventTarget: addEventListener() method (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/eventtarget/addeventlistener/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EventTarget: addEventListener() method

The **`addEventListener()`** method of the `EventTarget` interface
sets up a function that will be called whenever the specified event is delivered to the target.

Common targets are `Element`, or its children, `Document`, and `Window`,
but the target may be any object that supports events (such as `IDBRequest`).

> **Note:**
> The `addEventListener()` method is the _recommended_ way to register an event listener. The benefits are as follows:
>
> - It allows adding more than one handler for an event. This is particularly
>   useful for libraries, JavaScript modules, or any other kind of
>   code that needs to work well with other libraries or extensions.
> - In contrast to using an `onXYZ` property, it gives you finer-grained control of the phase when the listener is activated (capturing vs. bubbling).
> - It works on any event target, not just HTML or SVG elements.

The method `addEventListener()` works by adding a function, or an object that implements a `handleEvent()` function, to the list of event listeners for the specified event type
on the `EventTarget` on which it's called. If the function or object is already in the list of event listeners for this target, the function or object is not added a second time.

> **Note:**
> If a particular anonymous function is in the list of event listeners registered for a certain target, and then later in the code, an identical anonymous function is given in an `addEventListener` call, the second function will _also_ be added to the list of event listeners for that target.
>
> Indeed, anonymous functions are not identical even if defined using
> the _same_ unchanging source-code called repeatedly, **even if in a loop**.
>
> Repeatedly defining the same unnamed function in such cases can be
> problematic. (See Memory issues, below.)

If an event listener is added to an `EventTarget` from inside another listener —
that is, during the processing of the event —
that event will not trigger the new listener.
However, the new listener may be triggered during a later stage of event flow,
such as during the bubbling phase.

## Syntax

```js
addEventListener(type, listener)
addEventListener(type, listener, options)
addEventListener(type, listener, useCapture)
```

### Parameters

- `type`
    A case-sensitive string representing the event type to listen for.
- `listener`
    The object that receives a notification (an object that implements the
    `Event` interface) when an event of the specified type occurs. This must
    be `null`, an object with a `handleEvent()` method, or a JavaScript
    function. See
    The event listener callback for details on the callback itself.
- `options` (optional)
    An object that specifies characteristics about the event listener. The available
    options are:
    - `capture` (optional)
        A boolean value indicating that events of this type will be dispatched
        to the registered `listener` before being dispatched to any
        `EventTarget` beneath it in the DOM tree. If not specified, defaults to `false`.
    - `once` (optional)
        A boolean value indicating that the `listener`
        should be invoked at most once after being added. If `true`, the
        `listener` would be automatically removed when invoked. If not specified, defaults to `false`.
    - `passive` (optional)
        A boolean value that, if `true`, indicates that the function specified by `listener` will never call `preventDefault()`. If a passive listener calls `preventDefault()`, nothing will happen and a console warning may be generated.

        If this option is not specified, it defaults to `false` — except that it defaults to `true` for `wheel`, `mousewheel`, `touchstart`, and `touchmove` events on `Window`, `Document`, `Document.documentElement`, and `Document.body`. See Using passive listeners to learn more.

    - `signal` (optional)
        An `AbortSignal`. The listener will be removed when the `abort()` method of the `AbortController` which owns the `AbortSignal` is called. If not specified, no `AbortSignal` is associated with the listener.

- `useCapture` (optional)
    A boolean value indicating whether events of this type will be dispatched to
    the registered `listener` _before_ being dispatched to
    any `EventTarget` beneath it in the DOM tree. Events that are bubbling
    upward through the tree will not trigger a listener designated to use capture. Event
    bubbling and capturing are two ways of propagating events that occur in an element
    that is nested within another element, when both elements have registered a handle for
    that event. The event propagation mode determines the order in which elements receive
    the event. See the DOM spec and JavaScript Event order for a detailed explanation.
    If not specified, `useCapture` defaults to `false`.

    > **Note:**
    > For event listeners attached to the event target, the event is in the target phase, rather than the capturing and bubbling phases.
    > Event listeners in the _capturing_ phase are called before event listeners in the target and bubbling phases.

- `wantsUntrusted` (optional) (non-standard)
    A Firefox (Gecko)-specific parameter. If `true`, the listener receives
    synthetic events dispatched by web content (the default is `false` for
    browser chrome and `true` for regular web pages). This
    parameter is useful for code found in add-ons, as well as the browser itself.

### Return value

None (`undefined`).

## Usage notes

### The event listener callback

The event listener can be specified as either a callback function or
an object whose `handleEvent()` method serves as the callback function.

The callback function itself has the same parameters and return value as the
`handleEvent()` method; that is, the callback accepts a single parameter: an
object based on `Event` describing the event that has occurred, and it
returns nothing.

For example, an event handler callback that can be used to handle both
`fullscreenchange` and
`fullscreenerror` might look like this:

```js
function handleEvent(event) {
  if (event.type === "fullscreenchange") {
    /* handle a full screen toggle */
  } else {
    /* handle a full screen toggle error */
  }
}
```

### The value of "this" within the handler

It is often desirable to reference the element on which the event handler was fired,
such as when using a generic handler for a set of similar elements.

When attaching a handler function to an element using `addEventListener()`,
the value of `this` inside the handler will be a reference to
the element. It will be the same as the value of the `currentTarget` property of
the event argument that is passed to the handler.

```js
myElement.addEventListener("click", function (e) {
  console.log(this.className); // logs the className of myElement
  console.log(e.currentTarget === this); // logs `true`
});
```

As a reminder, arrow functions do not have their own `this` context.

```js
myElement.addEventListener("click", (e) => {
  console.log(this.className); // WARNING: `this` is not `myElement`
  console.log(e.currentTarget === this); // logs `false`
});
```

If an event handler (for example, `onclick`) is specified on an element in the HTML source, the JavaScript code in the attribute value is effectively wrapped in a handler function that binds the value of `this` in a manner consistent with the `addEventListener()`; an occurrence of `this` within the code represents a reference to the element.

```html
<table id="my-table" onclick="console.log(this.id);">
  <!-- `this` refers to the table; logs 'my-table' -->
  …
</table>
```

Note that the value of `this` inside a function, _called by_ the code
in the attribute value, behaves as per standard rules. This is
shown in the following example:

```html
<script>
  function logID() {
    console.log(this.id);
  }
</script>
<table id="my-table" onclick="logID();">
  <!-- when called, `this` will refer to the global object -->
  …
</table>
```

The value of `this` within `logID()` is a reference to the global
object `Window` (or `undefined` in the case of strict mode.

#### Specifying "this" using bind()

The `Function.prototype.bind()` method lets you establish a fixed
`this` context for all subsequent calls — bypassing problems where it's unclear what `this` will be, depending on
the context from which your function was called. Note, however, that you'll need to keep
a reference to the listener around so you can remove it later.

This is an example with and without `bind()`:

```js
class Something {
  name = "Something Good";
  constructor(element) {
    // bind causes a fixed `this` context to be assigned to `onclick2`
    this.onclick2 = this.onclick2.bind(this);
    element.addEventListener("click", this.onclick1);
    element.addEventListener("click", this.onclick2); // Trick
  }
  onclick1(event) {
    console.log(this.name); // undefined, as `this` is the element
  }
  onclick2(event) {
    console.log(this.name); // 'Something Good', as `this` is bound to the Something instance
  }
}

const s = new Something(document.body);
```

Another solution is using a special function called `handleEvent()` to catch
any events:

```js
class Something {
  name = "Something Good";
  constructor(element) {
    // Note that the listeners in this case are `this`, not this.handleEvent
    element.addEventListener("click", this);
    element.addEventListener("dblclick", this);
  }
  handleEvent(event) {
    console.log(this.name); // 'Something Good', as this is bound to newly created object
    switch (event.type) {
      case "click":
        // some code here…
        break;
      case "dblclick":
        // some code here…
        break;
    }
  }
}

const s = new Something(document.body);
```

Another way of handling the reference to `this` is to use an arrow function, which doesn't create a separate `this` context.

```js
class SomeClass {
  name = "Something Good";

  register() {
    window.addEventListener("keydown", (e) => {
      this.someMethod(e);
    });
  }

  someMethod(e) {
    console.log(this.name);
    switch (e.code) {
      case "ArrowUp":
        // some code here…
        break;
      case "ArrowDown":
        // some code here…
        break;
    }
  }
}

const myObject = new SomeClass();
myObject.register();
```

### Getting data into and out of an event listener

Event listeners only take one argument,
an `Event` or a subclass of `Event`,
which is automatically passed to the listener, and the return value is ignored.
Therefore, to get data into and out of an event listener, instead of passing the data through parameters and return values, you need to create closures instead.

The functions passed as event listeners have access to all variables declared in the outer scopes that contain the function.

```js
const myButton = document.getElementById("my-button-id");
let someString = "Data";

myButton.addEventListener("click", () => {
  console.log(someString);
  // 'Data' on first click,
  // 'Data Again' on second click

  someString = "Data Again";
});

console.log(someString); // Expected Value: 'Data' (will never output 'Data Again')
```

Read the function guide for more information about function scopes.

### Memory issues

```js
const elems = document.getElementsByTagName("*");

// Case 1
for (const elem of elems) {
  elem.addEventListener("click", (e) => {
    // Do something
  });
}

// Case 2
function processEvent(e) {
  // Do something
}

for (const elem of elems) {
  elem.addEventListener("click", processEvent);
}
```

In the first case above, a new (anonymous) handler function is created with each
iteration of the loop. In the second case, the same previously declared function is used
as an event handler, which results in smaller memory consumption because there is only
one handler function created. Moreover, in the first case, it is not possible to call
`removeEventListener()` because no
reference to the anonymous function is kept (or here, not kept to any of the multiple
anonymous functions the loop might create.) In the second case, it's possible to do
`myElement.removeEventListener("click", processEvent, false)`
because `processEvent` is the function reference.

Actually, regarding memory consumption, the lack of keeping a function reference is not
the real issue; rather it is the lack of keeping a _static_ function reference.

### Using passive listeners

If an event has a default action — for example, a `wheel` event that scrolls the container by default — the browser is in general unable to start the default action until the event listener has finished, because it doesn't know in advance whether the event listener might cancel the default action by calling `Event.preventDefault()`. If the event listener takes too long to execute, this can cause a noticeable delay, also known as jank, before the default action can be executed.

By setting the `passive` option to `true`, an event listener declares that it will not cancel the default action, so the browser can start the default action immediately, without waiting for the listener to finish. If the listener does then call `Event.preventDefault()`, this will have no effect.

To realize the scroll performance benefits of passive listeners in legacy code, the specification for `addEventListener()` defines the default value of the `passive` option as `true` for the `wheel`, `mousewheel`, `touchstart`, and `touchmove` events on `Window`, `Document`, `Document.documentElement`, and `Document.body`. For other events and targets, the default is `false`. A passive listener cannot cancel the event, so the browser does not need to wait for it to finish before scrolling.

Because of that, when you want to override that behavior and ensure the `passive` option is `false`, you must explicitly set the option to `false` (rather than relying on the default).

You don't need to worry about the value of `passive` for the basic `scroll` event.
Since it can't be canceled, event listeners can't block page rendering anyway.

See Improving scroll performance using passive listeners for an example showing the effect of passive listeners.
