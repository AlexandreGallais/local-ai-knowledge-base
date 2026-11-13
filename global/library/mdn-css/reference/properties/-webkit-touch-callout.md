---
title: "`-webkit-touch-callout` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/-webkit-touch-callout/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `-webkit-touch-callout` CSS property

The `-webkit-touch-callout` CSS property controls the display of the default callout shown when you touch and hold a touch target.

When a target is touched and held on iOS, Safari displays a callout information about the link. This property allows disabling that behavior.

## Syntax

```css
/* Keyword values */
-webkit-touch-callout: default;
-webkit-touch-callout: none;

/* Global values */
-webkit-touch-callout: initial;
-webkit-touch-callout: inherit;
-webkit-touch-callout: revert;
-webkit-touch-callout: revert-layer;
-webkit-touch-callout: unset;
```

### Values

This property is specified as one of the following keyword values:

- `default`
    The default callout is displayed.
- `none`
    The callout is disabled.

## Examples

### Turn off touch callout

```css
.example {
  -webkit-touch-callout: none;
}
```

## Specifications

Not part of any standard. Apple has a description in the Safari CSS Reference.

## See also

- WebKit CSS extensions
- -webkit-touch-callout in the Apple developer documentation
