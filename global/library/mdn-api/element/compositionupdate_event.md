---
title: "Element: compositionupdate event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/compositionupdate_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: compositionupdate event

The **`compositionupdate`** event is fired when a new character is received in the context of a text composition session controlled by a text composition system such as an input method editor.

For example, this event could be fired while a user enters a Chinese character using a Pinyin Input method editor.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("compositionupdate", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncompositionupdate = (event) => { }
```

## Event type

A `CompositionEvent`. Inherits from `UIEvent` and `Event`.

## Examples

```js
const inputElement = document.querySelector('input[type="text"]');

inputElement.addEventListener("compositionupdate", (event) => {
  console.log(`generated characters were: ${event.data}`);
});
```

### Live example

#### HTML

```html
<div class="control">
  <p>First select textbox, then to open IME:</p>
  <ul>
    <li>on macOS type <kbd>option</kbd> + <kbd>`</kbd></li>
    <li>on Windows type <kbd>windows</kbd> + <kbd>.</kbd></li>
  </ul>
  <label for="example">Example input</label>
  <input type="text" id="example" name="example" />
</div>

<div class="event-log">
  <label for="eventLog">Event log:</label>
  <textarea
    readonly
    class="event-log-contents"
    rows="8"
    cols="25"
    id="eventLog"></textarea>
  <button class="clear-log">Clear</button>
</div>
```

```css
body {
  padding: 0.2rem;
  display: grid;
  grid-template-areas: "control log";
}

.control {
  grid-area: control;
}

.event-log {
  grid-area: log;
}

.event-log-contents {
  resize: none;
}

label,
button {
  display: block;
}

input[type="text"] {
  margin: 0.5rem 0;
}

kbd {
  border-radius: 3px;
  padding: 1px 2px 0;
  border: 1px solid black;
}
```

#### JavaScript

```js
const inputElement = document.querySelector('input[type="text"]');
const log = document.querySelector(".event-log-contents");
const clearLog = document.querySelector(".clear-log");

clearLog.addEventListener("click", () => {
  log.textContent = "";
});

function handleEvent(event) {
  log.textContent += `${event.type}: ${event.data}\n`;
}

inputElement.addEventListener("compositionstart", handleEvent);
inputElement.addEventListener("compositionupdate", handleEvent);
inputElement.addEventListener("compositionend", handleEvent);
```

#### Result

## See also

- Related events: `compositionstart`, `compositionend`.
