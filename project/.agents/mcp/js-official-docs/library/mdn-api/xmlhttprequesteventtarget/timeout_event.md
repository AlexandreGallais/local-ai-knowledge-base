---
title: "XMLHttpRequestEventTarget: timeout event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequesteventtarget/timeout_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequestEventTarget: timeout event

The **`timeout`** event is fired when progression is terminated due to preset time expiring.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("timeout", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ontimeout = (event) => { }
```

## Event type

A `ProgressEvent`. Inherits from `Event`.

## Examples

### Usage with XMLHttpRequest

Using the `ontimeout` event handler property (but note that this replaces other event listeners added using `ontimeout`, if any):

```js
const client = new XMLHttpRequest();
client.open("GET", "http://www.example.org/example.txt");
client.timeout = 5000;
client.ontimeout = () => {
  console.error("Timeout!!");
};

client.send();
```

You could also set up the event handler using the `addEventListener()` method:

```js
client.addEventListener("timeout", () => {
  console.error("Timeout!!");
});
```

### Usage with XMLHttpRequestUpload

You can use the `timeout` event to detect an upload that stopped because it was too slow. For a complete code example that uploads a file and displays a progress bar, see the main `XMLHttpRequestUpload` page.

The timeout is set on the `XMLHttpRequest` object using the `XMLHttpRequest.timeout` property.

```js
// In case of a timeout we hide the progress bar
// Note that this event can be listened to on the xhr object too
function errorAction(event) {
  progressBar.classList.remove("visible");
  log.textContent = `Upload failed: ${event.type}`;
}
xhr.upload.addEventListener("timeout", errorAction);
```

## See also

- Related events: `loadstart`, `load`, `loadend`, `progress`, `error`, `abort`
- Monitoring progress
