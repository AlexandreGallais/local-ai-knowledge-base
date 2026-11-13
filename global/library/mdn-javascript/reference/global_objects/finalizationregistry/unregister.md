---
title: "FinalizationRegistry.prototype.unregister()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/finalizationregistry/unregister/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FinalizationRegistry.prototype.unregister()

The **`unregister()`** method of `FinalizationRegistry` instances unregisters a target value from this `FinalizationRegistry`.

## Syntax

```js
unregister(unregisterToken)
```

### Parameters

- `unregisterToken`
    The token used with the `register()` method when registering the target value. Multiple cells registered with the same `unregisterToken` will be unregistered together.

### Return value

A boolean value that is `true` if at least one cell was unregistered and `false` if no cell was unregistered.

### Exceptions

- `TypeError`
    Thrown if `unregisterToken` is not an object or a non-registered symbol.

## Description

When a target value has been reclaimed, it is no longer registered in the registry.
There is no need to call `unregister` in your cleanup callback. Only call
`unregister` if you haven't received a cleanup callback and no longer need
to receive one.

## Examples

### Using unregister

This example shows registering a target object using that same object as the unregister
token, then later unregistering it via `unregister`:

```js
class Thingy {
  static #cleanup = (label) => {
    //               ^^^^^−−−−− held value
    console.error(
      `The "release" method was never called for the object with the label "${label}"`,
    );
  };
  #registry = new FinalizationRegistry(Thingy.#cleanup);

  /**
   * Constructs a `Thingy` instance.
   * Be sure to call `release` when you're done with it.
   *
   * @param label A label for the `Thingy`.
   */
  constructor(label) {
    //                            vvvvv−−−−− held value
    this.#registry.register(this, label, this);
    //          target −−−−−^^^^         ^^^^−−−−− unregister token
  }

  /**
   * Releases resources held by this `Thingy` instance.
   */
  release() {
    this.#registry.unregister(this);
    //                        ^^^^−−−−− unregister token
  }
}
```

This example shows registering a target object using a different object as its
unregister token:

```js
class Thingy {
  static #cleanup = (file) => {
    //               ^^^^−−−−− held value
    console.error(
      `The "release" method was never called for the "Thingy" for the file "${file.name}"`,
    );
  };
  #registry = new FinalizationRegistry(Thingy.#cleanup);
  #file;

  /**
   * Constructs a `Thingy` instance for the given file.
   * Be sure to call `release` when you're done with it.
   *
   * @param filename The name of the file.
   */
  constructor(filename) {
    this.#file = File.open(filename);
    //                            vvvvv−−−−− held value
    this.#registry.register(this, label, this.#file);
    //          target −−−−−^^^^         ^^^^^^^^^^−−−−− unregister token
  }

  /**
   * Releases resources held by this `Thingy` instance.
   */
  release() {
    if (this.#file) {
      this.#registry.unregister(this.#file);
      //                        ^^^^^^^^^^−−−−− unregister token
      File.close(this.#file);
      this.#file = null;
    }
  }
}
```

## See also

- `FinalizationRegistry`
