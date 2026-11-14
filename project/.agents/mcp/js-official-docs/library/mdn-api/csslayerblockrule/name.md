---
title: "CSSLayerBlockRule: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csslayerblockrule/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSLayerBlockRule: name property

The read-only **`name`** property of the `CSSLayerBlockRule` interface represents the name of the associated cascade layer.

## Value

A string containing the name of the layer, or `""` if the layer is anonymous.

## Examples

### HTML

```html
<output></output> <output></output>
```

### CSS

```css
output {
  display: block;
}

@layer special {
  div {
    color: rebeccapurple;
  }
}

@layer {
  div {
    color: black;
  }
}
```

### JavaScript

```js
const item1 = document.getElementsByTagName("output")[0];
const item2 = document.getElementsByTagName("output")[1];
const rules = document.getElementById("css-output").sheet.cssRules;

const layer = rules[1]; // A CSSLayerBlockRule
const anonymous = rules[2]; // An anonymous CSSLayerBlockRule

item1.textContent = `The first CSSLayerBlockRule defines the "${layer.name}" layer.`;
item2.textContent = `A second CSSLayerBlockRule defines a layer with the following name: "${anonymous.name}".`;
```

## See also

- The statement declaration of an `@layer` is represented by a `CSSLayerStatementRule`.
- How to create named cascade layers in CSS.
