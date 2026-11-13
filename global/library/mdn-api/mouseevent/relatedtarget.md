---
title: "MouseEvent: relatedTarget property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mouseevent/relatedtarget/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MouseEvent: relatedTarget property

The **`MouseEvent.relatedTarget`** read-only property is the secondary target for the mouse event, if there is one.

That is:

       | Event name
       | `target`
       | `relatedTarget`

       | `mouseenter`
       |
        The `EventTarget` the pointing device entered to

       |
        The `EventTarget` the pointing device exited from

       | `mouseleave`
       |
        The `EventTarget` the pointing device exited from

       |
        The `EventTarget` the pointing device entered to

       | `mouseout`
       |
        The `EventTarget` the pointing device exited from

       |
        The `EventTarget` the pointing device entered to

       | `mouseover`
       |
        The `EventTarget` the pointing device entered to

       |
        The `EventTarget` the pointing device exited from

       | `dragenter`
       |
        The `EventTarget` the pointing device entered to

       |
        The `EventTarget` the pointing device exited from

       | `dragleave`
       |
        The `EventTarget` the pointing device exited from

       |
        The `EventTarget` the pointing device entered to

For events with no secondary target, `relatedTarget` returns
`null`.

`FocusEvent.relatedTarget` is a similar property for focus events.

## Value

An `EventTarget` object or `null`.

## Examples

Try moving your mouse cursor into and out of the red and blue boxes.

### HTML

```html
<body id="body">
  <div id="outer">
    <div id="red"></div>
    <div id="blue"></div>
  </div>
  <p id="log"></p>
</body>
```

### CSS

```css
#outer {
  width: 250px;
  height: 125px;
  display: flex;
}

#red {
  flex-grow: 1;
  background: red;
}

#blue {
  flex-grow: 1;
  background: blue;
}

#log {
  max-height: 120px;
  overflow-y: scroll;
}
```

### JavaScript

```js
const mouseoutLog = document.getElementById("log"),
  red = document.getElementById("red"),
  blue = document.getElementById("blue");

red.addEventListener("mouseover", overListener);
red.addEventListener("mouseout", outListener);
blue.addEventListener("mouseover", overListener);
blue.addEventListener("mouseout", outListener);

function outListener(event) {
  let related = event.relatedTarget ? event.relatedTarget.id : "unknown";

  mouseoutLog.innerText = `\nfrom ${event.target.id} into ${related} ${mouseoutLog.innerText}`;
}

function overListener(event) {
  let related = event.relatedTarget ? event.relatedTarget.id : "unknown";

  mouseoutLog.innerText = `\ninto ${event.target.id} from ${related} ${mouseoutLog.innerText}`;
}
```

## See also

- `MouseEvent`
