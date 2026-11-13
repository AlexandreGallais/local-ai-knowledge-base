---
title: "Event: currentTarget property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/event/currenttarget/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Event: currentTarget property

The **`currentTarget`** read-only property of the `Event` interface identifies the element to which the event handler has been attached.

This will not always be the same as the element on which the event was fired, because the event may have fired on a descendant of the element with the handler, and then bubbled up to the element with the handler. The element on which the event was fired is given by `Event.target`.

Note that the value of `currentTarget` is only available in a handler for the event. Outside an event handler it will be `null`. This means that, for example, if you take a reference to the `Event` object inside an event handler and then access its `currentTarget` property outside the event handler, its value will be `null`.

## Value

An `EventTarget` representing the object to which the current event handler is attached.

## Examples

### currentTarget versus target

This example illustrates the difference between `currentTarget` and `target`.

#### HTML

The page has a "parent" `` containing a "child" ``.

```html
<div id="parent">
  Click parent
  <div id="child">Click child</div>
</div>

<button id="reset">Reset</button>
<pre id="output"></pre>
```

```css
button,
div,
pre {
  margin: 0.5rem;
}

div {
  padding: 1rem;
  border: 1px solid black;
}
```

#### JavaScript

The event handler is attached to the parent. It logs the value of `event.currentTarget` and `event.target`.

We also have a "Reset" button that just reloads the example.

```js
const output = document.querySelector("#output");
const parent = document.querySelector("#parent");
parent.addEventListener("click", (event) => {
  const currentTarget = event.currentTarget.getAttribute("id");
  const target = event.target.getAttribute("id");
  output.textContent = `Current target: ${currentTarget}\n`;
  output.textContent += `Target: ${target}`;
});

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => document.location.reload());
```

#### Result

If you click inside the child ``, then `target` identifies the child. If you click inside the parent ``, then `target` identifies the parent.

In both cases, `currentTarget` identifies the parent, because that's the element that the handler is attached to.

## See also

- Learn: Event bubbling
