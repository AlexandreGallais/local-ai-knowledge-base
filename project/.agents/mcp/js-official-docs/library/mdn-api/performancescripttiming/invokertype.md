---
title: "PerformanceScriptTiming: invokerType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancescripttiming/invokertype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceScriptTiming: invokerType property

The **`invokerType`** read-only property of the `PerformanceScriptTiming` interface returns a string value indicating the type of feature that, when invoked, ran the script.

## Value

A string indicating the invoker type of the script entry point. Possible values are:

- `"user-callback"`
    A known callback invoked from within a web platform API, such as `setTimeout()` or `Window.requestAnimationFrame()`.
- `"event-listener"`
    An event listener for a web platform event, such as `click`, `load`, or `keyup`.
- `"resolve-promise"`
    A handler function for the resolved state of a web platform promise, such as `fetch()`. Note that in the case of promises, all the handlers of the same promise are grouped together as a single `"script"` entry type.
- `"reject-promise"`
    A handler function for the rejected state of a web platform promise.
- `"classic-script"`
    The evaluation of a standard script (for example, via a `<script>` element or an `import()` statement).
- `"module-script"`
    The evaluation of a module script.

The structure of the `PerformanceScriptTiming.invoker` value depends on the script's `invokerType` value. Check out the `invoker` page for more details.

## Examples

See Long animation frame timing for examples related to the Long Animation Frames API.

## See also

- Long animation frame timing
- `PerformanceLongAnimationFrameTiming`
