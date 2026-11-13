---
title: "CSSStyleSheet: removeRule() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylesheet/removerule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleSheet: removeRule() method

The obsolete `CSSStyleSheet` method
**`removeRule()`** removes a rule from the stylesheet
object. It is functionally identical to the standard, preferred method
`deleteRule()`.

> **Note:**
> This is a _legacy method_ which has been replaced by
> the standard method `deleteRule()`. You
> should use that instead.

## Syntax

```js
removeRule(index)
```

### Parameters

- `index`
    The index into the stylesheet's `CSSRuleList` indicating the rule to be
    removed.

### Return value

None (`undefined`).

## Examples

This example removes the first rule from the stylesheet `myStyles`.

```js
myStyles.removeRule(0);
```

You can rewrite this to use the standard `deleteRule()` method very easily:

```js
myStyles.deleteRule(0);
```

## See also

- CSS Object Model
- Using dynamic styling information
- `insertRule()`
