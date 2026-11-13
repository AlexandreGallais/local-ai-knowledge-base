---
title: "Highlight: forEach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlight/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Highlight: forEach() method

The **`forEach()`** method of the `Highlight` interface executes a provided function once for each `AbstractRange` object in the `Highlight` object, in insertion order.

`Highlight` is a `Set`-like object, so this is similar to using `Set.forEach()`.

## Syntax

```js
forEach(callbackFn)
forEach(callbackFn, thisArg)
```

### Parameters

- `callback`
    Function to execute for each `AbstractRange` object, taking three arguments:
    - `range`, `key`
        The current `AbstractRange` object being processed in the `Highlight`. As there are no
        keys in `Highlight`, the `range` is passed for both arguments.
    - `highlight`
        The `Highlight` object which `forEach()` was called upon.

- `thisArg`
    Value to use as `this` when executing `callbackFn`.

### Return value

None (`undefined`).

## Examples

The code snippet below shows how to create a new highlight with two ranges, and then log the ranges by using the `forEach()` method:

```js
function logRanges(range, key, highlight) {
  console.log(`Highlight object ${highlight} contains range ${range}`);
}

const text = new Text("Time is an illusion. Lunchtime doubly so.");

const range1 = document.createRange();
range1.setStart(text, 0);
range1.setEnd(text, 4);

const range2 = document.createRange();
range2.setStart(text, 21);
range2.setEnd(text, 30);

const myHighlight = new Highlight();
myHighlight.add(range1);
myHighlight.add(range2);

myHighlight.forEach(logRanges);
```

## See also

- `The CSS Custom Highlight API`
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
