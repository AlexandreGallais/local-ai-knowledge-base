---
title: "Error.stackTraceLimit"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/error/stacktracelimit/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Error.stackTraceLimit

> **Note:**
> This feature is part of the currently non-standard V8 stack trace API. However, for compatibility reasons, it is also implemented by JavaScriptCore.

The **`Error.stackTraceLimit`** static data property indicates the maximum number of stack frames captured by the stack trace of an error. It can be set by user code to change the engine's behavior.

Generally, _reading_ this property is not very useful, but you can _set_ it to a new value. Setting it to a larger value can be useful for debugging, as it allows you to see more of the call stack. Setting it to a smaller value can improve performance as it reduces the amount of stack captured.

## Value

An integer representing the maximum number of stack frames captured by the stack trace of an error.

## Description

Because `stackTraceLimit` is a static property of `Error`, you always use it as `Error.stackTraceLimit`, rather than as a property of an `Error` object you created. If you want to customize the stack trace for a single error only, you may need to set the property, create the error, and then reset the property to its original value.

## Examples

### Setting Error.stackTraceLimit

This code is safe to run even in environments that don't support `Error.stackTraceLimit`, because it doesn't read the property, only sets it, and engines that don't support it will ignore the setting.

```js
Error.stackTraceLimit = 2;
const a = () => b();
const b = () => c();
const c = () => d();
const d = () => e();
const e = () => {
  throw new Error("My error");
};
try {
  a();
} catch (e) {
  console.log(e.stack);
}
// Only two frames in supporting engines; all frames in others
```

## See also

- `Error.prototype.stack`
- `Error.captureStackTrace()`
- Stack trace API in the V8 docs
