---
title: "CSSContainerRule: conditions property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csscontainerrule/conditions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSContainerRule: conditions property

The read-only **`conditions`** property of the `CSSContainerRule` interface represents an associated CSS `@container` at-rule as an array of objects, where each object represents a single container condition.

## Value

An array of objects where each object has the form:

```js
({ name: "<container-name>", query: "<container-query>" });
```

Either the `name` or `query` may be the empty string, but not both.

## Description

The **`conditions`** property represents an associated CSS `@container` at-rule as an array of objects.

Each object represents a container condition as a `name` string property and a `query` string property, either of which may be the empty string if not defined.
The `name` represents the name of a container, and the `query` string represents the set of feature tests that must be true for the particular container condition to match.

For example, given the following `@container`:

```css
@container sidebar (width >= 700px), (height >= 400px) {
  /* Styles */
}
```

The `conditions` would be an array like this:

```js
[
  { name: "sidebar", query: "(width >= 700px)" },
  { name: "", query: "(height >= 400px)" },
];
```

## Examples

See also Examples in `CSSContainerRule`.

### Basic usage

The example shows how multiple container conditions are represented in the `conditions` property.

Note that we've hidden the logging code, as it is not relevant.

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
  height: 100px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

#### HTML

First, we define the HTML for a `card` contained within a `post`.
These are represented by two nested `` elements.

```html
<div class="post">
  <div class="card">
    <h2>Card title</h2>
    <p>Card content</p>
  </div>
</div>
```

#### CSS

The CSS for the container element specifies the type of the container, and may also specify a name.
The card has a default font size, which is overridden when it is contained inside a `sidebar` `@container` when its width is greater than or equal to `700px`, or when it is inside a container named `other-name`.
Note that this condition is contrived to demonstrate how multiple conditions are represented (`other-name` doesn't actually do anything).

```html
<style id="example-styles">
  .post {
    container-type: inline-size;
    container-name: sidebar;
  }

  /* Default heading styles for the card title */
  .card h2 {
    font-size: 1em;
  }

  @container sidebar (width >= 700px), other-name {
    .card {
      font-size: 2em;
    }
  }
</style>
```

#### JavaScript

The code below gets the `HTMLStyleElement` associated with the example using its `id`, and then uses its `sheet` property to get the `CSSStyleSheet`.
From the `CSSStyleSheet` we get the set of `cssRules` added to the sheet.
Since we added the `@container` as the third rule above, we can access the associated `CSSContainerRule` using the third entry (index "2") in the `cssRules`.

```js
const exampleStylesheet = document.getElementById("example-styles").sheet;
const exampleRules = exampleStylesheet.cssRules;
const containerRule = exampleRules[2]; // a CSSContainerRule representing the container rule.
```

We then use the `containerRule` to log the value of the `conditions` property.

```js
if ("conditions" in CSSContainerRule.prototype) {
  log("CSSContainerRule.conditions:");
  containerRule.conditions.forEach((item) => {
    const jsonString = JSON.stringify(item);
    log(`  ${jsonString}`);
  });
} else {
  log("CSSContainerRule.conditions is not supported.");
}
```

> **Note:**
> On browsers that don't support `conditions`, you may be able to use `CSSContainerRule.containerName` and `CSSContainerRule.containerQuery`, provided that the `@container` only specifies one container condition.
> For more information, see the Feature testing example in `CSSContainerRule`.

#### Results

The example output is shown below.

## See also

- CSS `container` shorthand property
- CSS containment module
- Container queries
- Using container size and style queries
