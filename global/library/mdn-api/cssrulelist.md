---
title: "CSSRuleList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssrulelist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSRuleList

A `CSSRuleList` represents an ordered collection of read-only `CSSRule` objects.

While the `CSSRuleList` object is read-only, and cannot be directly modified, it is considered a `live` object, as the content can change over time.

To edit the underlying rules returned by `CSSRule` objects, use `CSSStyleSheet.insertRule()` and `CSSStyleSheet.deleteRule()`, which are methods of `CSSStyleSheet`.

This interface was an attempt to create an unmodifiable list and only continues to be supported to not break code that's already using it. Modern APIs represent list structures using types based on JavaScript arrays, thus making many array methods available, and at the same time imposing additional semantics on their usage (such as making their items read-only).

These historical reasons do not mean that you as a developer should avoid `CSSRuleList`. You don't create `CSSRuleList` objects yourself, but you get them from APIs such as `CSSStyleSheet.cssRules` and `CSSKeyframesRule.cssRules`, and these APIs are not deprecated. However, be careful of the semantic differences from a real array.

## Instance properties

- `CSSRuleList.length` (read-only)
    Returns an integer representing the number of `CSSRule` objects in the collection.

## Instance methods

- `CSSRuleList.item()`
    Gets a single `CSSRule`.

## Examples

In the following example there is a stylesheet with three rules. Using `CSSStyleSheet.cssRules` returns a `CSSRuleList`, which is printed to the console.

The number of rules in the list is printed to the console using `CSSRuleList.length`. The first `CSSRule` can be returned by using `0` as the parameter for `CSSRuleList.item`, in the example this will return the rules set for the `body` selector.

### CSS

```css
body {
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  margin: 2em;
}

.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
}

.container > * {
  background-color: #3740ff;
  color: white;
}
```

### JavaScript

```js
let myRules = document.styleSheets[0].cssRules;
console.log(myRules);
console.log(myRules.length);
console.log(myRules[0]);
```

## See also

- `CSSRule`
