---
title: "CSSStyleSheet: deleteRule() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylesheet/deleterule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleSheet: deleteRule() method

The `CSSStyleSheet` method
**`deleteRule()`** removes a rule from the stylesheet
object.

## Syntax

```js
deleteRule(index)
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
myStyles.deleteRule(0);
```

## See also

- CSS Object Model
- Constructable Stylesheets (web.dev)
- Using dynamic styling information
- `insertRule()`
