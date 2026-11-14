---
title: "Document: createEvent() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/createevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: createEvent() method

> **Warning:**
> Many methods used with `createEvent`, such as `initCustomEvent`, are deprecated.
> Use event constructors instead.

Creates an event of the type specified. The
returned object should be first initialized and can then be passed to
`EventTarget.dispatchEvent`.

## Syntax

```js
createEvent(type)
```

### Parameters

- `type`
    A string that represents the type of event to be created. Possible event types include `"UIEvents"`, `"MouseEvents"`, `"MutationEvents"`, and `"HTMLEvents"`. See Notes section for details.

### Return value

An Event object.

## Examples

```js
// Create the event.
const event = document.createEvent("Event");

// Define that the event name is 'build'.
event.initEvent("build", true, true);

// Listen for the event.
elem.addEventListener("build", (e) => {
  // e.target matches elem
});

// Target can be any Element or other EventTarget.
elem.dispatchEvent(event);
```

## Notes

Event type strings suitable for passing to `createEvent()` are listed in the
DOM standard — see the table in step 2. Bear in mind that most event objects now have constructors, which
are the modern recommended way to create event object instances.

## See also

- Creating and dispatching events
