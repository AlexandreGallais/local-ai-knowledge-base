---
title: "FinalizationRegistry.prototype.register()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/finalizationregistry/register/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FinalizationRegistry.prototype.register()

The **`register()`** method of `FinalizationRegistry` instances registers a value with this `FinalizationRegistry` so that if the value is garbage-collected, the registry's callback may get called.

## Syntax

```js
register(target, heldValue)
register(target, heldValue, unregisterToken)
```

### Parameters

- `target`
    The target value to register.
- `heldValue`
    The value to pass to the finalizer for this `target`. This cannot be the `target` itself but can be anything else, including functions and primitives.
- `unregisterToken` (optional)
    A token that may be used with the `unregister` method later to unregister the target value. If provided (and not `undefined`), this must be an object or a non-registered symbol. If not provided, the target cannot be unregistered.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown in one of the following cases:
    - `target` is not an object or a non-registered symbol (object as opposed to primitives; functions are objects as well)
    - `target` is the same as `heldValue` (`target === heldValue`)
    - `unregisterToken` is not an object or a non-registered symbol

## Description

See the Avoid where possible
and Notes on cleanup callbacks
sections of the `FinalizationRegistry` page for important caveats.

## Examples

### Using register

The following registers the value referenced by `target`,
passing in the held value `"some value"` and passing the target itself
as the unregistration token:

```js
registry.register(target, "some value", target);
```

The following registers the value referenced by `target`,
passing in another object as the held value, and not passing in any unregistration token
(which means `target` can't be unregistered):

```js
registry.register(target, { useful: "info about target" });
```

## See also

- `FinalizationRegistry`
