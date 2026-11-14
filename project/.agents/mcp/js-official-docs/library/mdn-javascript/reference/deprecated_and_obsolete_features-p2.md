---
title: "Deprecated and obsolete features (part 2 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/deprecated_and_obsolete_features/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Deprecated and obsolete features (part 2 of 2)

## Obsolete features

These obsolete features have been entirely removed from JavaScript and can no longer be used as of the indicated version of JavaScript.

### RegExp

The following are now properties of `RegExp` instances, no longer of the `RegExp` constructor:

| Property                                                           | Description                                                                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `global`                              | Whether or not to test the regular expression against all possible matches in a string, or only against the first. |
| `ignoreCase`                      | Whether or not to ignore case while attempting a match in a string.                                                |
| `lastIndex`                        | The index at which to start the next match.                                                                        |
| `multiline` (also via `RegExp.$*`) | Whether or not to search in strings across multiple lines.                                                         |
| `source`                              | The text of the pattern.                                                                                           |

The `valueOf()` method is no longer specialized for `RegExp`. It uses `Object.prototype.valueOf()`, which returns itself.

### Function

- Functions' `arity` property is obsolete. Use `length` instead.

### Object

| Property                     | Description                                                                                                    | Alternative                                                                                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `__count__`                  | Returns the number of enumerable properties directly available on a user-defined object.                       | `Object.keys()`                                                                                                   |
| `__parent__`                 | Points to an object's context.                                                                                 | No direct replacement                                                                                                                                                                |
| `__iterator__`               | Used with legacy iterators.                                                  | `Symbol.iterator` and the new iteration protocols |
| `__noSuchMethod__`           | A method called when a non-existent property is called as a method.                                            | `Proxy`                                                                                                                                                                  |
| `Object.prototype.eval()`    | Evaluates a string of JavaScript code in the context of the specified object.                                  | No direct replacement                                                                                                                                                                |
| `Object.observe()`           | Asynchronously observing the changes to an object.                                                             | `Proxy`                                                                                                                                                                  |
| `Object.unobserve()`         | Remove observers.                                                                                              | `Proxy`                                                                                                                                                                  |
| `Object.getNotifier()`       | Create a notifier object that allows you to synthetically trigger a change observable with `Object.observe()`. | No direct replacement                                                                                                                                                                |
| `Object.prototype.watch()`   | Attach a handler callback to a property that gets called when the property is assigned.                        | `Proxy`                                                                                                                                                                  |
| `Object.prototype.unwatch()` | Remove watch handlers on a property.                                                                           | `Proxy`                                                                                                                                                                  |

### String

- Non-standard String generic methods like `String.slice(myStr, 0, 12)`, `String.replace(myStr, /\./g, "!")`, etc. were introduced in Firefox 1.5 (JavaScript 1.6), deprecated in Firefox 53, and removed in Firefox 68. You can use methods on `String.prototype` together with `Function.call` instead.
- `String.prototype.quote` was removed in Firefox 37.
- The non-standard `flags` parameter in `String.prototype.search`, `String.prototype.match`, and `String.prototype.replace` is obsolete.

### WeakMap

- `WeakMap.prototype.clear()` was added in Firefox 20 and removed in Firefox 46. It is not possible to traverse all keys in a `WeakMap`.

### Date

- `Date.prototype.toLocaleFormat()`, which used a format string in the same format expected by the `strftime()` function in C, is obsolete. Use `toLocaleString()` or `Intl.DateTimeFormat` instead.

### Array

- Non-standard Array generic methods like `Array.slice(myArr, 0, 12)`, `Array.forEach(myArr, myFn)`, etc. have been introduced in Firefox 1.5 (JavaScript 1.6), deprecated in Firefox 68, and removed in Firefox 71. You can use methods on `Array.prototype` together with `Function.call` instead.

| Property            | Description                                 | Alternative         |
| ------------------- | ------------------------------------------- | ------------------- |
| `Array.observe()`   | Asynchronously observing changes to Arrays. | `Proxy` |
| `Array.unobserve()` | Remove observers.                           | `Proxy` |

### Number

- `Number.toInteger()` is obsolete. Use `Math.floor`, `Math.round`, or other methods instead.

### Proxy

- `Proxy.create` and `Proxy.createFunction` are obsolete. Use the `Proxy()` constructor instead.
- The following traps are obsolete:
  - `hasOwn` (bug 980565, Firefox 33).
  - `getEnumerablePropertyKeys` (bug 783829, Firefox 37)
  - `getOwnPropertyNames` (bug 1007334, Firefox 33)
  - `keys` (bug 1007334, Firefox 33)

### ParallelArray

- `ParallelArray` is obsolete.

### Statements

- `for each...in` is obsolete. Use `for...of` instead.
- let blocks and let expressions are obsolete.
- Expression closures (`function () 1` as a shorthand of `function () { return 1; }`) are obsolete. Use regular `functions` or `arrow functions` instead.

### Acquiring source text

The `toSource()` methods of arrays, numbers, strings, etc. and the `uneval()` global function are obsolete. Use `toString()`, or write your own serialization method instead.

### Legacy generator and iterator

Legacy generator function statements and legacy generator function expressions are removed. The legacy generator function syntax reuses the `function` keyword, which automatically becomes a generator function when there are one or more `yield` expressions in the body — this is now a syntax error. Use `function*` statements and `function*` expressions instead.

Array comprehensions and generator comprehensions are removed.

```js
// Legacy array comprehensions
[for (x of iterable) x]
[for (x of iterable) if (condition) x]
[for (x of iterable) for (y of iterable) x + y]

// Legacy generator comprehensions
(for (x of iterable) x)
(for (x of iterable) if (condition) x)
(for (x of iterable) for (y of iterable) x + y)
```

Firefox, prior to version 26, implemented another iterator protocol that is similar to the standard Iterator protocol. An object is a legacy iterator when it implements a `next()` method, which produces a value on each call and throws a `StopIteration` object at the end of iteration. This legacy iterator protocol differs from the standard iterator protocol:

- The value was returned directly as the return value of calls to `next()`, instead of the `value` property of the `IteratorResult` object.
- Iteration termination was expressed by throwing a `StopIteration` object, instead of through the `done` property of the `IteratorResult` object.

This feature, along with the `StopIteration` global constructor, was removed in Firefox 58+. For future-facing usages, consider using `for...of` loops and the iterator protocol.

### Sharp variables

Sharp variables are obsolete. To create circular structures, use temporary variables instead.
