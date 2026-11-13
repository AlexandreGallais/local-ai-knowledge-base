---
title: "CloseWatcher: requestClose() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/closewatcher/requestclose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CloseWatcher: requestClose() method

The **`requestClose()`** method of the `CloseWatcher` interface fires a `cancel` event and if that event is not canceled with `Event.preventDefault()`, proceeds to fire a `close` event, and then finally deactivates the close watcher as if `destroy()` was called.

## Syntax

```js
requestClose()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Using the `requestClose()` method

In this example, you have your own UI component (a picker), and you want to support both the platform's default close method (e.g., the `Esc` key) and your custom close method (a close button).

The `onclick` handler of your UI component can call `requestClose` to request a close and to route your close request through the same `onclose` handler the platform close method uses.

```js
const watcher = new CloseWatcher();
const picker = setUpAndShowPickerDOMElement();
let chosenValue = null;

watcher.onclose = () => {
  chosenValue = picker.querySelector("input").value;
  picker.remove();
};

picker.querySelector(".close-button").onclick = () => {
  watcher.requestClose();
};
```
