---
title: "MathMLAnchorElement: relList property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlanchorelement/rellist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLAnchorElement: relList property

The **`relList`** read-only property of the `MathMLAnchorElement` interface returns a live `DOMTokenList` object containing the set of link types indicating the relationship between the resource represented by the link and the current document.

## Value

A live `DOMTokenList` object.

Although the `relList` property itself is read-only in the sense that you can't replace the `DOMTokenList` object, you can still assign to the `relList` property directly, which is equivalent to assigning to its `value` property. You can also modify the `DOMTokenList` object using the `add()`, `remove()`, `replace()`, and `toggle()` methods.

## Examples

### Basic usage

Given this MathML:

```html
<math>
  <a id="myAnchor" href="https://example.com" rel="help alternate">...</a>
</math>
```

you can use the `relList` property to access the individual `rel` values like this:

```js
const mathAnchor = document.getElementById("myAnchor");
mathAnchor.relList[0]; // "help"
mathAnchor.relList[1]; // "alternate"
```

You can also change the contained values using `DOMTokenList` features, like this:

```js
mathAnchor.relList.value = "author bookmark";
mathAnchor.relList.add("me");
```

Because the `DOMTokenList` is live, `mathAnchor.rel` will now return the value `author bookmark me`.

## See also

- The MathML `` element
- `MathMLAnchorElement.rel`
- `rel` HTML attribute
