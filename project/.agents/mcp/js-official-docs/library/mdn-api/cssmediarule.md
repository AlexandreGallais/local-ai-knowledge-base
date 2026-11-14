---
title: "CSSMediaRule"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssmediarule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSMediaRule

The **`CSSMediaRule`** interface represents a single CSS `@media` rule.

## Instance properties

_Inherits properties from its ancestors `CSSConditionRule`, `CSSGroupingRule`, and `CSSRule`._

- `CSSMediaRule.media` (read-only)
    Returns a `MediaList` representing the intended destination medium for style information.

## Instance methods

_No specific methods; inherits methods from its ancestors `CSSConditionRule`, `CSSGroupingRule`, and `CSSRule`._

## Examples

The CSS below includes a media query with one style rule.
The MDN live sample infrastructure combines all the CSS blocks in the example into a single inline style with the id `css-output`, so we first use `document.getElementById()` to find that sheet.
`myRules[0]` returns a `CSSMediaRule` object, from which we can get the `mediaText`.

```html
<p id="log"></p>
```

```css
@media (width >= 500px) {
  body {
    color: blue;
  }
}
```

```js
const log = document.getElementById("log");
const myRules = document.getElementById("css-output").sheet.cssRules;
const mediaList = myRules[0]; // a CSSMediaRule representing the media query.
log.textContent += ` ${mediaList.media.mediaText}`;
```
