---
title: "HighlightRegistry: forEach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlightregistry/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HighlightRegistry: forEach() method

The **`forEach()`** method of the `HighlightRegistry` interface executes a provided function once for each `Highlight` object in the registry, in insertion order.

`HighlightRegistry` is a `Map`-like object, so this is similar to using `Map.forEach()`.

## Syntax

```js
forEach(callbackFn)
forEach(callbackFn, thisArg)
```

### Parameters

- `callback`
    Function to execute for each `Highlight` object, taking three arguments:
    - `highlight`
        The current highlight.
    - `name`
        The highlight name.
    - `registry`
        The registry object which `forEach()` was called upon.

- `thisArg`
    Value to use as `this` when executing `callbackFn`.

### Return value

None (`undefined`).

## Examples

The code snippet below shows how to create a new highlight with two ranges, and then log the ranges by using the `forEach()` method:

```js
function logAllHighlights(highlight, name) {
  console.log(`Highlight ${name} exists in the registry`, highlight);
}

const customHighlight1 = new Highlight();
const customHighlight2 = new Highlight();
const customHighlight3 = new Highlight();

CSS.highlights.set("custom-highlight-1", customHighlight1);
CSS.highlights.set("custom-highlight-2", customHighlight2);
CSS.highlights.set("custom-highlight-3", customHighlight3);

CSS.highlights.forEach(logAllHighlights);
```

## See also

- `The CSS Custom Highlight API`
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
