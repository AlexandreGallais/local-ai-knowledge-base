---
title: "CustomEvent: CustomEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/customevent/customevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CustomEvent: CustomEvent() constructor

The **`CustomEvent()`** constructor creates a new `CustomEvent` object.

## Syntax

```js
new CustomEvent(type)
new CustomEvent(type, options)
```

### Parameters

- `type`
    A string providing the name of the event. Event names are case-sensitive.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `detail` (optional)
        An event-dependent value associated with the event. This value is then available to the handler using the `CustomEvent.detail` property.
        It defaults to `null`.

### Return value

A new `CustomEvent` object.

## Example

```js
// create custom events
const catFound = new CustomEvent("animalfound", {
  detail: {
    name: "cat",
  },
});
const dogFound = new CustomEvent("animalfound", {
  detail: {
    name: "dog",
  },
});

const element = document.createElement("div"); // create a <div> element

// add an appropriate event listener
element.addEventListener("animalfound", (e) => console.log(e.detail.name));

// dispatch the events
element.dispatchEvent(catFound);
element.dispatchEvent(dogFound);

// "cat" and "dog" logged in the console
```

Additional examples can be found at Creating and dispatching events.

## See also

- `CustomEvent`
- Creating and dispatching events
