---
title: "MessagePort: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/messageport/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MessagePort: close() method

The **`close()`** method of the `MessagePort`
interface disconnects the port, so it is no longer active. This stops the flow of
messages to that port.

## Syntax

```js
close()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

In the following code block, you can see a `handleMessage` handler function,
run when a message is sent back to this document using
`EventTarget.addEventListener`.

```js
channel.port1.addEventListener("message", handleMessage);
function handleMessage(e) {
  para.innerHTML = e.data;
  textInput.value = "";
}

channel.port1.start();
```

You could stop messages being sent at any time using

```js
channel.port1.close();
```

## See also

- Using channel messaging
