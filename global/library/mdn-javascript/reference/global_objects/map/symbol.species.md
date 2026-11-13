---
title: "Map[Symbol.species]"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/map/symbol.species/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Map[Symbol.species]

The **`Map[Symbol.species]`** static accessor property is an unused accessor property specifying how to copy `Map` objects.

## Syntax

```js
Map[Symbol.species]
```

### Return value

The value of the constructor (`this`) on which `get [Symbol.species]` was called. The return value is used to construct copied `Map` instances.

## Description

The `[Symbol.species]` accessor property returns the default constructor for `Map` objects. Subclass constructors may override it to change the constructor assignment.

> **Note:**
> This property is currently unused by all `Map` methods.

## Examples

### Species in ordinary objects

The `[Symbol.species]` property returns the default constructor function, which is the `Map` constructor for `Map`.

```js
Map[Symbol.species]; // function Map()
```

### Species in derived objects

In an instance of a custom `Map` subclass, such as `MyMap`, the `MyMap` species is the `MyMap` constructor. However, you might want to overwrite this, in order to return parent `Map` objects in your derived class methods:

```js
class MyMap extends Map {
  // Overwrite MyMap species to the parent Map constructor
  static get [Symbol.species]() {
    return Map;
  }
}
```

## See also

- `Map`
- `Symbol.species`
