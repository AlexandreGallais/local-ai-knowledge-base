---
title: "CSSPositionTryRule"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csspositiontryrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPositionTryRule

The **`CSSPositionTryRule`** interface describes an object representing a `@position-try` at-rule.

## Instance properties

_Inherits properties from its ancestor `CSSRule`._

- `CSSPositionTryRule.name` (read-only)
    Represents the name of the position try option specified by the `@position-try` at-rule's `dashed-ident`.
- `CSSPositionTryRule.style` (read-only)
    A `CSSPositionTryDescriptors` object that represents the declarations set in the body of the `@position-try` at-rule.

## Instance methods

_No specific methods; inherits methods from its ancestor `CSSRule`._

## Examples

The CSS includes a `@position-try` at-rule with a name of `--custom-left` and three descriptors.

```css
@position-try --custom-left {
  position-area: left;
  width: 20%;
  max-width: 200px;
  margin-right: 10px;
}
```

```js
const myRules = document.styleSheets[0].cssRules;
const tryOption = myRules[0]; // a CSSPositionTryRule
console.log(tryOption); // "[object CSSPositionTryRule]"
console.log(tryOption.name); // "--custom-left"
console.log(tryOption.style); // "[object CSSPositionTryDescriptors]"
console.log(tryOption.style.maxWidth); // "200px"
```

## See also

- `CSSPositionTryDescriptors`
- `@position-try`
- `position-try-fallbacks`
- CSS anchor positioning module
- Using CSS anchor positioning
- Handling overflow: try options and conditional hiding
