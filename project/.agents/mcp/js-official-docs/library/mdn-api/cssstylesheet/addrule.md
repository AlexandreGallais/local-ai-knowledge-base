---
title: "CSSStyleSheet: addRule() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylesheet/addrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleSheet: addRule() method

The obsolete `CSSStyleSheet` interface's
**`addRule()`** _legacy method_ adds a new rule to the
stylesheet. You should avoid using this method, and should instead use the more standard
`insertRule()` method.

## Syntax

```js
addRule(selector, styleBlock, index)
```

### Parameters

- `selector`
    A string specifying the selector portion of the CSS rule. The
    default is the string `undefined`.
- `styleBlock`
    A string indicating the style block to apply to elements matching
    the `selector`. The default is the string `undefined`.
- `index` (optional)
    An optional index into the stylesheet's `CSSRuleList` at which to
    insert the new rule. If `index` is not specified, the next index after the
    last item currently in the list is used (that is, the value of
    `cssStyleSheet.cssRules.length`).

### Return value

Always returns -1.

Note that due to somewhat esoteric rules about where you can legally insert rules,
it's possible that an exception may be thrown. See `insertRule()` for more information.

## Usage notes

This method is implemented by browsers by constructing a string using the template
literal `` `${selector}{${styleBlock}}` ``, then passing it into the standard
`insertRule()` method.

Therefore, given existing code such as the following:

```js
cssStyleSheet.addRule(selector, styles, 0);
```

You can rewrite this to use the more standard `insertRule()` like this:

```js
cssStyleSheet.insertRule(`${selector} {${styles}}`, 0);
```

## See also

- CSS Object Model
- Using dynamic styling information
