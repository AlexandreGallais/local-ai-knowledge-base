---
title: "Keyboard: lock() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboard/lock/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Keyboard: lock() method

The **`lock()`** method of the
`Keyboard` interface returns a `Promise` that resolves after enabling the
capture of key <example-value> for any or all of the keys on the physical keyboard. This method
can only capture keys that are granted access by the underlying operating
system.

If `lock()` is called multiple times then only the key codes specified in the most recent call will be locked.
Any keys locked by a previous call to `lock()` are unlocked.

## Syntax

```js
lock()
lock(keyCodes)
```

### Parameters

- `keyCodes` (optional)
    An `Array` of one or more key codes to lock. If no keycodes are provided
    all keys will be locked. A list of valid code values is found in the UI Events KeyboardEvent code Values spec.

### Return value

A `Promise` that resolves with `undefined` when the lock was successful.

### Exceptions

- `AbortError` `DOMException`
    Thrown if a new call to `lock()` is made before the current one has finished.
- `InvalidAccessError` `DOMException`
    Thrown if any key in `keyCodes` is not a valid key code attribute value.
- `InvalidStateError` `DOMException`
    Thrown if `lock()` is not called in an active top-level browsing context.

## Security

Transient user activation is required. The user has to interact with the page or a UI element in order for this feature to work.

## Examples

### Capturing all keys

The following example captures all key presses.

```js
navigator.keyboard.lock();
```

### Capturing specific keys

The following example captures the `W`, `A`, `S`, and `D` keys. It captures these keys
regardless of which modifiers are used with the key press. Assuming a standard US QWERTY
layout, registering `"KeyW"` ensures that `W`, `Shift`+`W`, `Control`+`W`,
`Control`+`Shift`+`W`, and all other key <example-value> combinations with `W` are sent to the app.
The same applies to `"KeyA"`, `"KeyS"` and
`"KeyD"`.

```js
navigator.keyboard.lock(["KeyW", "KeyA", "KeyS", "KeyD"]);
```
