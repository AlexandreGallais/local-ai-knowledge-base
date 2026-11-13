---
title: "AbstractModuleSource"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/abstractmodulesource/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AbstractModuleSource

An **_AbstractModuleSource_** object represents the compiled source of a module obtained with `import source` or `import.source()`. There is no directly visible `AbstractModuleSource` constructor.

## Description

The `AbstractModuleSource` constructor (often referred to as `%AbstractModuleSource%` to indicate its "intrinsicness", since it does not correspond to any global exposed to a JavaScript program) serves as the superclass of all module source subclasses, providing a common interface of utility methods. This constructor is not directly exposed: there is no global `AbstractModuleSource` property. It is only accessible through `Object.getPrototypeOf(moduleSourceObject.constructor)` and similar.

### AbstractModuleSource objects

- `WebAssembly.Module`

JavaScript module source objects will be added by the ECMAScript Module Phase Imports proposal.

## Constructor

This object cannot be instantiated directly — attempting to construct it with `new` throws a `TypeError`.

```js
import source modSource from "./module.wasm";

new (Object.getPrototypeOf(modSource.constructor))();
// TypeError: Abstract class AbstractModuleSource not directly constructable
```

Instead, obtain a module source object using `import source`, `import.source()`, or a concrete module type's API, such as `WebAssembly.Module()`. These mechanisms do not call the abstract constructor.

## Instance properties

These properties are defined on `AbstractModuleSource.prototype` and shared by all `AbstractModuleSource` subclass instances.

- `AbstractModuleSource.prototype.constructor`
    The constructor function that created the instance object. `AbstractModuleSource.prototype.constructor` is the hidden `AbstractModuleSource` constructor function, but each module source subclass also defines its own `constructor` property.
- `AbstractModuleSource.prototype[Symbol.toStringTag]`
    The initial value of the `AbstractModuleSource.prototype[Symbol.toStringTag]` property is a getter that returns a string based on the constructor's identity, such as `"WebAssembly.Module"` or `"ModuleSource"`. It returns `undefined` if the `this` value is not an instance of one of the module source subclasses. This property is used in `Object.prototype.toString()`.

## See also

- `WebAssembly.Module`
- `import.source()`
- `import source`
