---
title: "WebGLContextEvent: statusMessage property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webglcontextevent/statusmessage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebGLContextEvent: statusMessage property

The read-only **`WebGLContextEvent.statusMessage`** property contains additional event status information, or is an empty string if no additional information is available.

## Examples

The `statusMessage` property can contain a platform dependent string with details of an event. This can occur, for example, if the `webglcontextcreationerror` event is fired.

```js
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

canvas.addEventListener("webglcontextcreationerror", (e) => {
  console.log(
    `WebGL context creation failed: ${e.statusMessage || "Unknown error"}`,
  );
});
```

## See also

- webglcontextcreationerror
