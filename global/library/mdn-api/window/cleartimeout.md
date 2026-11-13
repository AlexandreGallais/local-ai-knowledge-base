---
title: "Window: clearTimeout() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/cleartimeout/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: clearTimeout() method

The **`clearTimeout()`** method of the `Window` interface cancels a timeout previously established by calling `Window.setTimeout()`.

If the parameter provided does not identify a previously established action,
this method does nothing.

## Syntax

```js
clearTimeout(timeoutID)
```

### Parameters

- `timeoutID`
    The identifier of the timeout you want to cancel. This ID was returned by the
    corresponding call to `setTimeout()`.

It's worth noting that the pool of IDs used by `setTimeout()` and `setInterval()` are shared, which means you can technically use `clearTimeout()` and `clearInterval()` interchangeably. However, for clarity, you should avoid doing so.

### Return value

None (`undefined`).

## Examples

Run the script below in the context of a web page and click on the page once. You'll
see a message popping up in a second. If you click the page multiple times in
one second, the alert only appears once.

```js
const alarm = {
  remind(message) {
    alert(message);
    this.timeoutID = undefined;
  },

  setup() {
    if (typeof this.timeoutID === "number") {
      this.cancel();
    }

    this.timeoutID = setTimeout(
      (msg) => {
        this.remind(msg);
      },
      1000,
      "Wake up!",
    );
  },

  cancel() {
    clearTimeout(this.timeoutID);
  },
};
window.addEventListener("click", () => alarm.setup());
```

## Notes

Passing an invalid ID to `clearTimeout()` silently does nothing; no
exception is thrown.

## See also

- `Window.setTimeout()`
- `WorkerGlobalScope.clearTimeout()`
- `Window.clearInterval()`
- `Window.cancelAnimationFrame()`
