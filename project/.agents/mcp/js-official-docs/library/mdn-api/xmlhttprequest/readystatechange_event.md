---
title: "XMLHttpRequest: readystatechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequest/readystatechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequest: readystatechange event

The `readystatechange` event is fired whenever the `readyState` property of the `XMLHttpRequest` changes.

> **Warning:**
> This should not be used with synchronous requests and must
> not be used from native code.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("readystatechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onreadystatechange = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Examples

```js
const xhr = new XMLHttpRequest();
const method = "GET";
const url = "https://developer.mozilla.org/";

xhr.open(method, url, true);
xhr.onreadystatechange = () => {
  // In local files, status is 0 upon success in Mozilla Firefox
  if (xhr.readyState === XMLHttpRequest.DONE) {
    const status = xhr.status;
    if (status === 0 || (status >= 200 && status < 400)) {
      // The request has been completed successfully
      console.log(xhr.responseText);
    } else {
      // Oh no! There has been an error with the request!
    }
  }
};
xhr.send();
```
