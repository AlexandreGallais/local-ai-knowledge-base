---
title: "CSSLayerStatementRule: nameList property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csslayerstatementrule/namelist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSLayerStatementRule: nameList property

The read-only **`nameList`** property of the `CSSLayerStatementRule` interface returns the list of associated cascade layer names. The names can't be modified.

## Value

An `Array` of strings, each representing a cascade layer represented by the `@layer` statement rule.

## Examples

### HTML

```html
<div></div>
```

### CSS

```css
@layer layerName, layerName2;

@layer layerName3 {
  div {
    font-family: serif;
  }
}
```

### JavaScript

```js
const item = document.getElementsByTagName("div")[0];
const rules = document.getElementById("css-output").sheet.cssRules;

const layerStatementRule = rules[0]; // A CSSLayerStatementRule
const layerBlockRule = rules[1]; // A CSSLayerBlockRule; no nameList property.

item.textContent = `@layer declares the following layers: ${layerStatementRule.nameList.join(
  ", ",
)}.`;
```

## See also

- `CSSLayerBlockRule.name`
- `@layer`
- The `@layer` statement at-rule for named layers
