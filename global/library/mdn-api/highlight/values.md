---
title: "Highlight: values() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlight/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Highlight: values() method

The **`values()`** method of the `Highlight` interface returns a new Iterator object that contains the values for each `AbstractRange` object in the `Highlight` object in insertion order.

> **Note:**
> The **`keys()`** method is an alias for this method. It behaves exactly the same and returns **values** of `Highlight` elements.

`Highlight` is a `Set`-like object, so this is similar to using `Set.values()`.

## Syntax

```js
values()
```

### Parameters

None.

### Return value

A new iterator object containing each `AbstractRange` object in the given `Highlight`, in insertion order.

## Examples

The following code snippet shows how to create a new `Highlight` object with three `AbstractRange` objects, and use the iterator returned by the `values()` method to log the three ranges:

```js
const myHighlight = new Highlight();
myHighlight.add(new Range());
myHighlight.add(new Range());
myHighlight.add(new Range());

const iter = myHighlight.values();

for (value of iter) {
  console.log(value); // Range
}
```

## See also

- `The CSS Custom Highlight API`
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
