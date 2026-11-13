---
title: "XMLHttpRequestEventTarget: abort event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequesteventtarget/abort_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequestEventTarget: abort event

The `abort` event is fired when a request has been aborted, for example because the program called `XMLHttpRequest.abort()`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("abort", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onabort = (event) => { }
```

## Event type

A `ProgressEvent`. Inherits from `Event`.

## Examples

### Usage with XMLHttpRequest

#### HTML

```html
<div class="controls">
  <input
    class="xhr success"
    type="button"
    name="xhr"
    value="Click to start XHR (success)" />
  <input
    class="xhr error"
    type="button"
    name="xhr"
    value="Click to start XHR (error)" />
  <input
    class="xhr abort"
    type="button"
    name="xhr"
    value="Click to start XHR (abort)" />
</div>

<textarea readonly class="event-log"></textarea>
```

```css
.event-log {
  width: 25rem;
  height: 4rem;
  border: 1px solid black;
  margin: 0.5rem;
  padding: 0.2rem;
}

input {
  width: 11rem;
  margin: 0.5rem;
}
```

#### JavaScript

```js
const xhrButtonSuccess = document.querySelector(".xhr.success");
const xhrButtonError = document.querySelector(".xhr.error");
const xhrButtonAbort = document.querySelector(".xhr.abort");
const log = document.querySelector(".event-log");

function handleEvent(e) {
  log.textContent = `${log.textContent}${e.type}: ${e.loaded} bytes transferred\n`;
}

function addListeners(xhr) {
  xhr.addEventListener("loadstart", handleEvent);
  xhr.addEventListener("load", handleEvent);
  xhr.addEventListener("loadend", handleEvent);
  xhr.addEventListener("progress", handleEvent);
  xhr.addEventListener("error", handleEvent);
  xhr.addEventListener("abort", handleEvent);
}

function runXHR(url) {
  log.textContent = "";

  const xhr = new XMLHttpRequest();
  addListeners(xhr);
  xhr.open("GET", url);
  xhr.send();
  return xhr;
}

xhrButtonSuccess.addEventListener("click", () => {
  runXHR("/shared-assets/images/examples/balloon.jpg");
});

xhrButtonError.addEventListener("click", () => {
  runXHR("https://example.com/some-path");
});

xhrButtonAbort.addEventListener("click", () => {
  runXHR("/shared-assets/images/examples/balloon.jpg").abort();
});
```

#### Result

### Usage with XMLHttpRequestUpload

You can use the `abort` event to stop the upload before it finishes. For a complete code example that uploads a file and displays a progress bar, see the main `XMLHttpRequestUpload` page.

```js
// In case of an abort we hide the progress bar
// Note that this event can be listened to on the xhr object too
function errorAction(event) {
  progressBar.classList.remove("visible");
  log.textContent = `Upload failed: ${event.type}`;
}
xhr.upload.addEventListener("abort", errorAction);
```

## See also

- Related events: `loadstart`, `load`, `progress`, `error`, `loadend`
- Monitoring progress
