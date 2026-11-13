---
title: "CSSKeyframesRule"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csskeyframesrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSKeyframesRule

The **`CSSKeyframesRule`** interface describes an object representing a complete set of keyframes for a CSS animation. It corresponds to the contents of a whole `@keyframes` at-rule.

## Instance properties

_Inherits properties from its ancestor `CSSRule`._

- `CSSKeyframesRule.name`
    Represents the name of the keyframes, used by the `animation-name` property.
- `CSSKeyframesRule.cssRules` (read-only)
    Returns a `CSSRuleList` of the keyframes in the list.
- `CSSKeyframesRule.length` (read-only)
    Returns the number of keyframes in the list.

## Instance methods

_Inherits methods from its ancestor `CSSRule`._

- `CSSKeyframesRule.appendRule()`
    Inserts a new keyframe rule into the current CSSKeyframesRule. The parameter is a string containing a keyframe in the same format as an entry of a `@keyframes` at-rule. If it contains more than one keyframe rule, a `DOMException` with a `SYNTAX_ERR` is thrown.
- `CSSKeyframesRule.deleteRule()`
    Deletes a keyframe rule from the current CSSKeyframesRule. The parameter is the index of the keyframe to be deleted, expressed as a string resolving as a number between `0%` and `100%`.
- `CSSKeyframesRule.findRule()`
    Returns a keyframe rule corresponding to the given key. The key is a string containing an index of the keyframe to be returned, resolving to a percentage between `0%` and `100%`. If no such keyframe exists, `findRule` returns `null`.

## Example

### Using CSSKeyframesRule

The CSS includes a keyframes at-rule. This will be the first `CSSRule` returned by `document.styleSheets[0].cssRules`.
`myRules[0]` returns a `CSSKeyframesRule` object.

```css
@keyframes slide-in {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(100%);
  }
}
```

```js
const myRules = document.styleSheets[0].cssRules;
const keyframes = myRules[0]; // a CSSKeyframesRule
```

### Accessing indexes

`CSSKeyframesRule` can be indexed like an array, and functions similar to its `cssRules` property.

```js
const keyframes = document.styleSheets[0].cssRules[0];

for (let i = 0; i < keyframes.length; i++) {
  console.log(keyframes[i].keyText);
}

// Output:
// 0%
// 100%
```

## See also

- `@keyframes`
- `CSSKeyFrameRule`
