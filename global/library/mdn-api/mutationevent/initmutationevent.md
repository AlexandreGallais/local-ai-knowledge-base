---
title: "MutationEvent: initMutationEvent() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mutationevent/initmutationevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MutationEvent: initMutationEvent() method

The **`initMutationEvent()`** method of the `MutationEvent` interface initializes the
value of a mutation event once it's been created (normally using the `Document.createEvent()` method).

This method must be called to set the event before it is dispatched, using `EventTarget.dispatchEvent()`.

> **Note:**
> In general, you won't create these events yourself; they are created by the browser.

## Syntax

```js
initMutationEvent(type, canBubble, cancelable, relatedNode,
                  prevValue, newValue, attrName, attrChange)
```

### Parameters

- `type`
    A string to set the event's `type` to. Browsers set the following values for `MutationEvent`:
    `DOMAttrModified`, `DOMAttributeNameChanged`, `DOMCharacterDataModified`, `DOMElementNameChanged`, `DOMNodeInserted`, `DOMNodeInsertedIntoDocument`, `DOMNodeRemoved`, `DOMNodeRemovedFromDocument`, `DOMSubtreeModified`.
- `canBubble`
    A boolean indicating whether or not the event can bubble. Sets the value of `Event.bubbles`.
- `cancelable`
    A boolean indicating whether or not the event's default action can be prevented. Sets the value of `Event.cancelable`.
- `relatedNode`
    A string representing the new value of the modified node, if any. Sets the value of `MutationEvent.relatedNode`.
- `prevValue`
    A string representing the previous value of the modified node, if any. Sets the value of `MutationEvent.prevValue`.
- `newValue`
    A string representing the new value of the modified node, if any. Sets the value of `MutationEvent.newValue`.
- `attrName`
    A string representing the name of the `Attr` node changed, if any. Sets the value of `MutationEvent.attrName`.
- `attrChange`
    An integer representing the reason attribute node changed. Sets the value of `MutationEvent.attrChange`.

### Return value

None (`undefined`).
