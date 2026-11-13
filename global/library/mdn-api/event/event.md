---
title: "Event: Event() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/event/event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Event: Event() constructor

The **`Event()`** constructor creates a new `Event` object. An event created in this way is called a _synthetic event_, as opposed to an event fired by the browser, and can be dispatched by a script.

## Syntax

```js
new Event(type)
new Event(type, options)
```

### Values

- `type`
    A string with the name of the event.
- `options` (optional)
    An object with the following properties:
    - `bubbles` (optional)
        A boolean value indicating whether the event bubbles. The default is
        `false`.
    - `cancelable` (optional)
        A boolean value indicating whether the event can be canceled. The
        default is `false`.
    - `composed` (optional)
        A boolean value indicating whether the event will trigger listeners
        outside of a shadow root (see `Event.composed` for more details). The
        default is `false`.

### Return value

A new `Event` object.

## Example

```js
// create a look event that bubbles up and cannot be canceled

const evt = new Event("look", { bubbles: true, cancelable: false });
document.dispatchEvent(evt);

// event can be dispatched from any element, not only the document
myDiv.dispatchEvent(evt);
```

## See also

- `Event`
- `EventTarget.dispatchEvent()`
- Creating and dispatching events
