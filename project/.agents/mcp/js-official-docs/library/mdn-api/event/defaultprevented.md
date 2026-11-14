---
title: "Event: defaultPrevented property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/event/defaultprevented/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Event: defaultPrevented property

The **`defaultPrevented`** read-only property of the `Event` interface returns a boolean value indicating whether or not the call to `Event.preventDefault()` canceled the event.

## Value

A boolean value, where `true` indicates that the default user agent action was prevented, and `false` indicates that it was not.

## Example

This example logs attempts to visit links from two `` elements. JavaScript is used to prevent the second link from working.

### HTML

```html
<p><a id="link1" href="#link1">Visit link 1</a></p>
<p><a id="link2" href="#link2">Try to visit link 2</a> (you can't)</p>
<p id="log"></p>
```

### JavaScript

```js
function stopLink(event) {
  event.preventDefault();
}

function logClick(event) {
  const log = document.getElementById("log");

  if (event.target.tagName === "A") {
    log.innerText = event.defaultPrevented
      ? `Sorry, but you cannot visit this link!\n${log.innerText}`
      : `Visiting link…\n${log.innerText}`;
  }
}

const a = document.getElementById("link2");
a.addEventListener("click", stopLink);
document.addEventListener("click", logClick);
```
