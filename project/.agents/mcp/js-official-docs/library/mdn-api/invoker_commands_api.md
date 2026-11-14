---
title: "Invoker Commands API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/invoker_commands_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Invoker Commands API

The **Invoker Commands API** provides a way to declaratively assign behaviors to buttons, allowing control of interactive elements when the button is enacted (clicked or invoked via a keypress, such as the spacebar or return key).

## Concepts and usage

A common pattern on the web is to have `` elements control various aspects of the page, such as opening and closing `popovers` or `<dialog>` elements, formatting text, and more.

Historically creating these kinds of controls has required JavaScript event listeners added to the button which can then call the APIs on the element they control. The `commandForElement` and `command` properties provide a way to do this declaratively for a limited set of actions. This can be advantageous for built-in commands as the user does not have to wait for JavaScript to download and execute to make these buttons interactive.

## HTML attributes

- `commandfor`
    Turns a `` element into a command invoker, controlling the given interactive element; takes the ID of the element to control as its value.
- `command`
    Specifies the action to be performed on an element being controlled by a control ``, specified via the `commandfor` attribute.

## Interfaces

- `CommandEvent`
    Represents an event notifying the user that a command has been issued. It is the event object for the `command` event. The event fires on element referenced by `commandForElement`.

## Extensions to other interfaces

### Instance properties

- `HTMLButtonElement.commandForElement`
    Gets and sets the element being controlled by the button. The JavaScript equivalent of the `commandfor` HTML attribute.
- `HTMLButtonElement.command`
    Gets and sets the action to be performed on the element being controlled by the button. Reflects the value of the `command` HTML attribute.

### Events

- `command` event
    Fired on the element referenced by the button.

## Examples

### Creating declarative popovers

```html
<button commandfor="mypopover" command="toggle-popover">
  Toggle the popover
</button>
<div id="mypopover" popover>
  <button commandfor="mypopover" command="hide-popover">Close</button>
  Popover content
</div>
```

### Creating declarative dialogs

```html
<button commandfor="mydialog" command="show-modal">Show modal dialog</button>
<dialog id="mydialog">
  <button commandfor="mydialog" command="close">Close</button>
  Dialog Content
</dialog>
```

### Creating custom commands

```html
<button commandfor="my-img" command="--rotate-left">Rotate left</button>
<button commandfor="my-img" command="--rotate-right">Rotate right</button>
<img id="my-img" src="photo.jpg" alt="[add appropriate alt text here]" />
```

```js
const myImg = document.getElementById("my-img");

myImg.addEventListener("command", (event) => {
  if (event.command === "--rotate-left") {
    myImg.style.rotate = "-90deg";
  } else if (event.command === "--rotate-right") {
    myImg.style.rotate = "90deg";
  }
});
```

## See also

- `command` property
- `commandForElement` property
- `CommandEvent` interface
