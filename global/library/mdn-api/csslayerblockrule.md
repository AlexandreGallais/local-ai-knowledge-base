---
title: "CSSLayerBlockRule"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csslayerblockrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSLayerBlockRule

The **`CSSLayerBlockRule`** represents a `@layer` block rule.

## Instance properties

_Inherits properties from its ancestors `CSSGroupingRule` and `CSSRule`._

- `CSSLayerBlockRule.name` (read-only)
    A string containing the name of the associated cascade layer.

## Instance methods

_Inherits methods from its ancestors `CSSGroupingRule` and `CSSRule`._

## Examples

### HTML

```html
<p>I am displayed in <code>color: rebeccapurple</code>.</p>
```

### CSS

```css
@layer special {
  p {
    color: rebeccapurple;
  }
}
```

### JavaScript

```js
const item = document.getElementsByTagName("p")[0];
const rules = document.getElementById("css-output").sheet.cssRules;

const layer = rules[0]; // A CSSLayerBlockRule

item.textContent = `The CSSLayerBlockRule is for the "${layer.name}" layer`;
```

## See also

- `@layer`
- `CSSLayerStatementRule`
- Learn CSS cascade layers
