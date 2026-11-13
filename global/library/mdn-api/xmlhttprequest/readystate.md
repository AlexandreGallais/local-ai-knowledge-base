---
title: "XMLHttpRequest: readyState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequest/readystate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequest: readyState property

The **`readyState`** read-only property of the `XMLHttpRequest` interface returns the state an XMLHttpRequest client is in. An XHR client exists in one of the following states:

| Value | State              | Description                                                     |
| ----- | ------------------ | --------------------------------------------------------------- |
| `0`   | `UNSENT`           | Client has been created. `open()` not called yet.               |
| `1`   | `OPENED`           | `open()` has been called.                                       |
| `2`   | `HEADERS_RECEIVED` | `send()` has been called, and headers and status are available. |
| `3`   | `LOADING`          | Downloading; `responseText` holds partial data.                 |
| `4`   | `DONE`             | The operation is complete.                                      |

- UNSENT
    The XMLHttpRequest client has been created, but the open() method hasn't been called yet.
- OPENED
    open() method has been invoked. During this state, the request headers can be set using the setRequestHeader() method and the send() method can be called which will initiate the fetch.
- HEADERS_RECEIVED
    send() has been called, all redirects (if any) have been followed and the response headers have been received.
- LOADING
    Response's body is being received. If `responseType` is "text" or empty string, `responseText` will have the partial text response as it loads.
- DONE
    The fetch operation is complete. This could mean that either the data transfer has been completed successfully or failed.

## Example

```js
const xhr = new XMLHttpRequest();
console.log("UNSENT", xhr.readyState); // readyState will be 0

xhr.open("GET", "/api", true);
console.log("OPENED", xhr.readyState); // readyState will be 1

xhr.onprogress = () => {
  console.log("LOADING", xhr.readyState); // readyState will be 3
};

xhr.onload = () => {
  console.log("DONE", xhr.readyState); // readyState will be 4
};

xhr.send(null);
```
