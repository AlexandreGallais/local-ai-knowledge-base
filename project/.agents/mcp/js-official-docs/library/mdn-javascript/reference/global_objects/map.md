---
title: "Map (part 1 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/map/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Map

The **`Map`** object holds key-value pairs and remembers the original insertion order of the keys.
Any value (both objects and primitive values) may be used as either a key or a value.

```js
const map = new Map();

map.set("a", 1);
map.set("b", 2);
map.set("c", 3);

console.log(map.get("a"));
// Expected output: 1

map.set("a", 97);

console.log(map.get("a"));
// Expected output: 97

console.log(map.size);
// Expected output: 3

map.delete("b");

console.log(map.size);
// Expected output: 2
```

## Description

`Map` objects are collections of key-value pairs. A key in the `Map` **may only occur once**; it is unique in the `Map`'s collection. A `Map` object is iterated by key-value pairs — a `for...of` loop returns a 2-member array of `[key, value]` for each iteration. Iteration happens in _insertion order_, which corresponds to the order in which each key-value pair was first inserted into the map by the `set()` method (that is, there wasn't a key with the same value already in the map when `set()` was called).

The specification requires maps to be implemented "that, on average, provide access times that are sublinear on the number of elements in the collection". Therefore, it could be represented internally as a hash table (with O(1) lookup), a search tree (with O(log(N)) lookup), or any other data structure, as long as the complexity is better than O(N).

### Key <example-value>

Value equality is based on the SameValueZero algorithm. (It used to use SameValue, which treated `0` and `-0` as different. Check browser compatibility.) This means `NaN` is considered the same as `NaN` (even though `NaN !== NaN`) and all other values are considered equal according to the semantics of the `===` operator. Also, for object keys, equality is based on object identity. They are compared by reference, not by value. See Using the Map object for examples.

### Objects vs. Maps

`Object` is similar to `Map`—both let you set keys to
values, retrieve those values, delete keys, and detect whether something is
stored at a key. For this reason (and because there were no built-in
alternatives), `Object` has been used as `Map` historically.

However, there are important differences that make `Map` preferable in some
cases:

       |
       | Map
       | Object

       | Accidental Keys
       |
        A `Map` does not contain any keys by default. It only
        contains what is explicitly put into it.

       |

          An `Object` has a prototype, so it contains default keys
          that could collide with your own keys if you're not careful.

            Note: This can be bypassed by using
            `Object.create(null)`,
            but this is seldom done.

       | Security
       |
        A `Map` is safe to use with user-provided keys and values.

       |

          Setting user-provided key-value pairs on an `Object` may allow
          an attacker to override the object's prototype, which can lead to

            object injection attacks
           or prototype pollution attacks. Like the accidental keys issue, this can also be mitigated by using
          a `null`-prototype object.

       | Key Types
       |
        A `Map`'s keys can be any value (including functions,
        objects, or any primitive).

       |
        The keys of an `Object` must be either a
        `String` or a `Symbol`.

       | Key Order
       |

          The keys in `Map` are ordered in a straightforward
          way: A `Map` object iterates entries, keys, and values in
          the order of entry insertion.

       |

          Although the keys of an ordinary `Object` are ordered now,
          this was not always the case, and the order is complex. As a result,
          it's best not to rely on property order.

          The order was first defined for own properties only in ECMAScript
          2015; ECMAScript 2020 defines order for inherited properties as well.
          But note that no single mechanism
          iterates
          all of an object's properties; the various mechanisms
          each include different subsets of properties.
          (`for-in`
          includes only enumerable string-keyed properties;
          `Object.keys` includes only own, enumerable,
          string-keyed properties;
          `Object.getOwnPropertyNames` includes own,
          string-keyed properties even if non-enumerable;
          `Object.getOwnPropertySymbols` does the same
          for just `Symbol`-keyed properties, etc.)

       | Size
       |
        The number of items in a `Map` is easily retrieved from its
        `size` property.

       |
        Determining the number of items in an `Object` is more roundabout and less efficient. A common way to do it is through the `length` of the array returned from `Object.keys()`.

       | Iteration
       |
        A `Map` is an
        iterable, so it can be directly iterated.

       |

          `Object` does not implement an iteration protocol, and so objects are not directly iterable using the JavaScript
          for...of
          statement (by default).

          Note:

              An object can implement the iteration protocol, or you can get an
              iterable for an object using `Object.keys` or `Object.entries`.

              The
              for...in
              statement allows you to iterate over the
              enumerable properties of an object.

       | Performance
       |

          Performs better in scenarios involving frequent additions and removals
          of key-value pairs.

       |

          Not optimized for frequent additions and removals of key-value pairs.

       | Serialization and parsing
       |
        No native support for serialization or parsing.

          (But you can build your own serialization and parsing support for
          `Map` by using `JSON.stringify()`
          with its replacer argument, and by using
          `JSON.parse()` with its
          reviver argument. See the Stack Overflow question
          How do you JSON.stringify an ES6 Map?).

       |

          Native support for serialization from `Object` to
          JSON, using `JSON.stringify()`.

          Native support for parsing from JSON to `Object`,
          using `JSON.parse()`.

### Setting object properties

Setting Object properties works for Map objects as well, and can cause
considerable confusion.

Therefore, this appears to work in a way:

```js
const wrongMap = new Map();
wrongMap["bla"] = "blaa";
wrongMap["bla2"] = "blaaa2";

console.log(wrongMap); // Map { bla: 'blaa', bla2: 'blaaa2' }
```

But that way of setting a property does not interact with the Map data
structure. It uses the feature of the generic object. The value of 'bla' is not
stored in the Map for queries. Other operations on the data fail:

```js
wrongMap.has("bla"); // false
wrongMap.delete("bla"); // false
console.log(wrongMap); // Map { bla: 'blaa', bla2: 'blaaa2' }
```

The correct usage for storing data in the Map is through the `set(key, value)`
method.

```js
const contacts = new Map();
contacts.set("Jessie", { phone: "213-555-1234", address: "123 N 1st Ave" });
contacts.has("Jessie"); // true
contacts.get("Hilary"); // undefined
contacts.set("Hilary", { phone: "617-555-4321", address: "321 S 2nd St" });
contacts.get("Jessie"); // {phone: "213-555-1234", address: "123 N 1st Ave"}
contacts.delete("Raymond"); // false
contacts.delete("Jessie"); // true
console.log(contacts.size); // 1
```

### Map-like browser APIs

**Browser `Map`-like objects** (or "maplike objects") are Web API interfaces that behave in many ways like a `Map`.

Just like `Map`, entries can be iterated in the same order that they were added to the object.
`Map`-like objects and `Map` also have properties and methods that share the same name and behavior.
However unlike `Map` they only allow specific predefined types for the keys and values of each entry.

The allowed types are set in the specification IDL definition.
For example, `RTCStatsReport` is a `Map`-like object that must use strings for keys and objects for values.
This is defined in the specification IDL below:

```webidl
interface RTCStatsReport {
  readonly maplike<DOMString, object>;
};
```

`Map`-like objects are either read-only or read-writable (see the `readonly` keyword in the IDL above).

- Read-only `Map`-like objects have the property `size`, and the methods: `entries()`, `forEach()`, `get()`, `has()`, `keys()`, `values()`, and `[Symbol.iterator]()`.
- Writeable `Map`-like objects additionally have the methods: `clear()`, `delete()`, and `set()`.

The methods and properties have the same behavior as the equivalent entities in `Map`, except for the restriction on the types of the keys and values.

The following are examples of read-only `Map`-like browser objects:

- `AudioParamMap`
- `CSSFontFeatureValuesMap`
- `EventCounts`
- `KeyboardLayoutMap`
- `MIDIInputMap`
- `MIDIOutputMap`
- `RTCStatsReport`

## Constructor

- `Map()`
    Creates a new `Map` object.

## Static properties

- `Map[Symbol.species]`
    The constructor function that is used to create derived objects.

## Static methods

- `Map.groupBy()`
    Groups the elements of a given iterable using the values returned by a provided callback function. The final returned `Map` uses the unique values from the test function as keys, which can be used to get the array of elements in each group.

## Instance properties

These properties are defined on `Map.prototype` and shared by all `Map` instances.

- `Map.prototype.constructor`
    The constructor function that created the instance object. For `Map` instances, the initial value is the `Map` constructor.
- `Map.prototype.size`
    Returns the number of key/value pairs in the `Map` object.
- `Map.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"Map"`. This property is used in `Object.prototype.toString()`.

## Instance methods

- `Map.prototype.clear()`
    Removes all key-value pairs from the `Map` object.
- `Map.prototype.delete()`
    Removes the entry specified by the key from this `Map`.
- `Map.prototype.entries()`
    Returns a new Iterator object that contains a two-member array of `[key, value]` for each element in the `Map` object in insertion order.
- `Map.prototype.forEach()`
    Calls `callbackFn` once for each key-value pair present in the `Map` object, in insertion order. If a `thisArg` parameter is provided to `forEach`, it will be used as the `this` value for each callback.
- `Map.prototype.get()`
    Returns the value corresponding to the key in this `Map`, or `undefined` if there is none.
- `Map.prototype.getOrInsert()`
    Returns the value corresponding to the specified key in this `Map`. If the key is not present, it inserts a new entry with the key and a given default value, and returns the inserted value.
- `Map.prototype.getOrInsertComputed()`
    Returns the value corresponding to the specified key in this `Map`. If the key is not present, it inserts a new entry with the key and a default value computed from a given callback, and returns the inserted value.
- `Map.prototype.has()`
    Returns a boolean indicating whether an entry with the specified key <example-value> in this `Map` or not.
- `Map.prototype.keys()`
    Returns a new Iterator object that contains the keys for each element in the `Map` object in insertion order.
- `Map.prototype.set()`
    Adds a new entry with a specified key and value to this `Map`, or updates an existing entry if the key <example-value> exists.
- `Map.prototype.values()`
    Returns a new Iterator object that contains the values for each element in the `Map` object in insertion order.
- `Map.prototype[Symbol.iterator]()`
    Returns a new Iterator object that contains a two-member array of `[key, value]` for each element in the `Map` object in insertion order.
