---
title: "TaskController: TaskController() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/taskcontroller/taskcontroller/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TaskController: TaskController() constructor

The **`TaskController()`** constructor creates a new `TaskController` object, optionally setting the initial priority of its associated `signal`.

If no priority is set, the signal priority defaults to `user-visible`

## Syntax

```js
new TaskController()
new TaskController(options)
```

### Parameters

- `options` (optional)
    An object with the following properties:
    - `priority` (optional)
        The priority of the signal associated with this `TaskController`.
        One of: `"user-blocking"`, `"user-visible"` (default), `"background"`.

## Examples

This code shows how to construct a task controller that has a signal with default priority (`user-visible`).

```js
const controller = new TaskController();
```

To construct a task controller that has a specific signal priority, pass the `priority` as a property of the optional argument.

```js
controller2 = new TaskController({ priority: "user-blocking" });
```
