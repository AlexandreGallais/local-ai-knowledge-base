---
title: "MessagePort: start() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/messageport/start/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MessagePort: start() method

The **`start()`** method of the `MessagePort`
interface starts the sending of messages queued on the port. This method is only needed
when using `EventTarget.addEventListener`; it is implied when using
`onmessage`.

## Syntax

```js
start()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

In the following code block, you can see a `handleMessage` handler function,
run when a message is sent back to this document using `onmessage`:

```js
channel.port1.onmessage = handleMessage;
function handleMessage(e) {
  para.innerHTML = e.data;
}
```

Another option would be to do this using `EventTarget.addEventListener`,
however, when this method is used, you need to explicitly call `start()` to
begin the flow of messages to this document:

```js
channel.port1.addEventListener("message", handleMessage);
function handleMessage(e) {
  para.innerHTML = e.data;
  textInput.value = "";
}

channel.port1.start();
```

## See also

- Using channel messaging
