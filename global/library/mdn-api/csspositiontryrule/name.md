---
title: "CSSPositionTryRule: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csspositiontryrule/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPositionTryRule: name property

The **`name`** read-only property of the `CSSPositionTryRule` interface represents the name of the position try fallback option specified by the `@position-try` at-rule's `dashed-ident`.

## Value

A string.

## Examples

The CSS includes a `@position-try` at-rule with a name of `--custom-bottom` and three descriptors.

```css
@position-try --custom-bottom {
  top: anchor(bottom);
  min-width: 100px;
  margin-top: 10px;
}
```

```js
const myRules = document.styleSheets[0].cssRules;
const tryOption = myRules[0]; // a CSSPositionTryRule
console.log(tryOption.name); // "--custom-bottom"
```

## See also

- `CSSPositionTryDescriptors`
- `@position-try`
- `position-try-fallbacks`
- CSS anchor positioning module
- Using CSS anchor positioning
- Handling overflow: try options and conditional hiding
