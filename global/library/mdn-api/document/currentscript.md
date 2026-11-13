---
title: "Document: currentScript property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/currentscript/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: currentScript property

The **`currentScript`** read-only property of the `Document` interface returns the `<script>` element whose script is currently being processed and isn't a JavaScript module. (For modules use `import.meta` instead.)

It's important to note that this will not reference the `<script>`
element if the code in the script is being called as a callback or event handler; it
will only reference the element while it's initially being processed.

## Value

A `HTMLScriptElement` or null.

## Examples

This example checks to see if the script is being executed asynchronously:

```js
if (document.currentScript.async) {
  console.log("Executing asynchronously");
} else {
  console.log("Executing synchronously");
}
```

View Live Examples

## See also

- `import.meta`
- `<script>`
- `afterscriptexecute` event of `Document`
- `beforescriptexecute` event of `Document`
