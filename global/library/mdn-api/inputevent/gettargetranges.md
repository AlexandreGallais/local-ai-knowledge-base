---
title: "InputEvent: getTargetRanges() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/inputevent/gettargetranges/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InputEvent: getTargetRanges() method

The **`getTargetRanges()`** method of the `InputEvent` interface returns an array of `StaticRange` objects that will be affected by a change to the DOM if the input event is not canceled.

This allows web apps to override text edit behavior before the browser modifies the DOM tree, and provides more control over input events to improve performance.

Depending on the value of `inputType` and the current editing host, the expected return value of this method varies:

       | inputType
       | Editing host
       | Response of `getTargetRanges()`

       | `"historyUndo"` or `"historyRedo"`
       | Any
       | empty Array

       | All remaining
       | `contenteditable`
       |
        an Array of
        `StaticRange`
        objects associated with event

       | All remaining
       |
        `input`
        or `textarea`

       |
        an empty Array

## Syntax

```js
getTargetRanges()
```

### Parameters

None.

### Return value

An array of `StaticRange` objects.

## Examples

### Feature Detection

The following function returns true if `beforeinput`, and thus
`getTargetRanges`, is supported.

```js
function isBeforeInputEventAvailable() {
  return (
    window.InputEvent &&
    typeof InputEvent.prototype.getTargetRanges === "function"
  );
}
```

### Basic usage

The following example selects a `contenteditable` element and utilizes the
`beforeinput`
event to log the result of `getTargetRanges()`.

```js
const editableElem = document.querySelector('[contenteditable="true"]');

editableElem.addEventListener("beforeinput", (e) => {
  const targetRanges = e.getTargetRanges();
  console.log(targetRanges);
});
```
