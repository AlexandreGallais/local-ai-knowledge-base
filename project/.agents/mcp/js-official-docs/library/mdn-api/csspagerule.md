---
title: "CSSPageRule"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csspagerule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPageRule

**`CSSPageRule`** represents a single CSS `@page` rule.

## Instance properties

_Inherits properties from its ancestors `CSSGroupingRule` and `CSSRule`._

- `CSSPageRule.selectorText`
    Represents the text of the page selector associated with the at-rule.
- `CSSPageRule.style` (read-only)
    Returns the declaration block associated with the at-rule.

## Instance methods

_Inherits methods from its ancestors `CSSGroupingRule` and `CSSRule`._

## Examples

### Filtering for page rules

This example shows how you can find `CSSPageRule` objects for `@page` rules loaded by the document.

```html
<pre id="log"></pre>
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

```css
#log {
  height: 220px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

#### CSS

Below we define styles for the page using a `@page` rule.

```css
@page {
  margin: 1cm;
}
```

#### JavaScript

The code iterates through all the sheets in the document, and through all the `cssRules` in each sheet, logging the sheet index, the number of rules, and the type of each rule object.
We then detect `CSSPageRule` objects using their type (doing nothing with the information).

```js
for (
  let sheetCount = 0;
  sheetCount < document.styleSheets.length;
  sheetCount++
) {
  const sheet = document.styleSheets[sheetCount].cssRules;
  log(`styleSheet: ${sheetCount}`);

  const myRules = document.styleSheets[sheetCount].cssRules;
  log(`rules: ${myRules.length}`);
  for (const rule of myRules) {
    log(`rule: ${rule}`);
    if (rule instanceof CSSPageRule) {
      // Do something with CSSPageRule
    }
  }
}
```

#### Results

The results are shown below.
As you can see there are two sheets, corresponding to this main document and the example code frame, and each has a number of rules, only one of which is our `CSSPageRule`.
