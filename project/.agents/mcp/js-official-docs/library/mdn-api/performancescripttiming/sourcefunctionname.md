---
title: "PerformanceScriptTiming: sourceFunctionName property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancescripttiming/sourcefunctionname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceScriptTiming: sourceFunctionName property

The **`sourceFunctionName`** read-only property of the `PerformanceScriptTiming` interface returns a string representing the name of the function that contributed to the long animation frame (LoAF).

It is important to note that the reported function name will be the "entry point" of the script, that is, the top level of the stack, not any specific slow sub-function.

For example, if an event handler calls a top-level function, which then calls a slow sub-function, the `source*` fields will report the name and location of the top-level function, not the slow sub-function — the function that was passed to the platform API is always the one reported. This is because of performance reasons; a full stack trace is costly.

In the following snippet:

```js
setTimeout(function libFunc() {
  slowFunction();
});
```

`sourceFunctionName` would report `libFunc`, not `slowFunction`.

## Value

A string. Returns an empty string if the function name was not found.

## Examples

See Long animation frame timing for examples related to the Long Animation Frames API.

## See also

- Long animation frame timing
- `PerformanceLongAnimationFrameTiming`
