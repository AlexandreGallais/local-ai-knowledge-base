---
title: "CSSContainerRule (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csscontainerrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSContainerRule (part 2 of 2)

## Examples

### Feature testing

Feature testing can be complicated because you may need to handle cases where `CSSContainerRule` or `CSSContainerRule.conditions` are not supported, and also the particular case where `conditions` is not supported but multiple container conditions have been specified in the CSS.

This code shows how you can do it, assuming that you have already obtained `containerRule`, a `CSSContainerRule` instance that corresponds to an `@container` rule defined in the page CSS (the next example shows how you might get `containerRule`).

```js
if (typeof CSSContainerRule === "undefined") {
  // Browser doesn't support CSSContainerRule (at all)
  log("CSSContainerRule is not supported in this browser.");
} else if (!containerRule) {
  // Browser doesn't support multiple container conditions
  log(
    "No CSSContainerRule was created — @container with multiple conditions may not be parsed.",
  );
} else if ("conditions" in CSSContainerRule.prototype) {
  log("CSSContainerRule.conditions is supported.");
  log("CSSContainerRule.conditions:");
  containerRule.conditions.forEach((item) => {
    const jsonString = JSON.stringify(item);
    log(`  ${jsonString}`);
  });
  log(`CSSContainerRule.conditionText: "${containerRule.conditionText}"`);
} else {
  // @container exists but predates the multi-condition specification
  log("CSSContainerRule.conditions not supported");
  log(`CSSContainerRule.containerName: "${containerRule.containerName}"`);
  log(`CSSContainerRule.containerQuery: "${containerRule.containerQuery}"`);
  log(`CSSContainerRule.conditionText: "${containerRule.conditionText}"`);
}
```

Note that if it is defined, we prefer to use the information in `CSSContainerRule.conditions` rather than `containerName` and `containerQuery`.

### Unnamed container condition

The example below defines a `@container` rule that has a single container condition with no name, and displays the properties of the associated `CSSContainerRule`.
The CSS is the same as in the `@container` example Setting styles based on a container's size.

Note that our code to log the results is not particularly relevant, so it has been hidden.

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

The CSS for the example is shown below.
The CSS first specifies the `container-type` for the container element (`post`).
The `@container` rule then applies a new `width`, `background-color`, and `font-size` to the card if the width is less than `650px`.

```html
<style id="example-styles">
  /* A container context based on inline size */
  .post {
    container-type: inline-size;
  }

  /* Apply styles if the container is narrower than 650px */
  @container (width < 650px) {
    .card {
      width: 50%;
      background-color: gray;
      font-size: 1em;
    }
  }
</style>
```

> **Note:**
> The styles in these examples are defined in an inline HTML `<style>` element with an `id`, to make it easy for the code to find the correct style sheet.
> You might also locate the correct style sheet for each example by indexing against the number of style sheets contained in the document, that is, the `length` of the `styleSheets` property (for example, `document.styleSheets[document.styleSheets.length-1]`), but that makes working out the correct sheet for each example more complicated.

#### JavaScript

The code below gets the `HTMLStyleElement` associated with the example using its `id`, and then uses its `sheet` property to get the `CSSStyleSheet`.
From the `CSSStyleSheet` we get the set of `cssRules` added to the sheet.
Since we added the `@container` as the second rule above, we can access the associated `CSSContainerRule` using the second entry, with index "1" in the `cssRules`.

```js
const exampleStylesheet = document.getElementById("example-styles").sheet;
const exampleRules = exampleStylesheet.cssRules;
const containerRule = exampleRules[1]; // a CSSContainerRule representing the container rule.
```

Next, we use our feature testing code from the previous example to find and log the information we want to display.

```js
if (typeof CSSContainerRule === "undefined") {
  // Browser doesn't support CSSContainerRule (at all)
  log("CSSContainerRule is not supported in this browser.");
} else if (!containerRule) {
  // Browser doesn't support multiple container conditions
  log(
    "No CSSContainerRule was created. This browser doesn't support @container with multiple conditions.",
  );
} else if ("conditions" in CSSContainerRule.prototype) {
  log("CSSContainerRule.conditions is supported.");
  log("CSSContainerRule.conditions:");
  containerRule.conditions.forEach((item) => {
    const jsonString = JSON.stringify(item);
    log(`  ${jsonString}`);
  });
  log(`CSSContainerRule.conditionText: "${containerRule.conditionText}"`);
} else {
  // @container exists but predates the multi-condition specification
  log("CSSContainerRule.conditions not supported");
  log(`CSSContainerRule.containerName: "${containerRule.containerName}"`);
  log(`CSSContainerRule.containerQuery: "${containerRule.containerQuery}"`);
  log(`CSSContainerRule.conditionText: "${containerRule.conditionText}"`);
}
```

#### Results

The example output is shown below.
This lists the condition using either the `conditions` property if it is supported or `containerName`/`containerQuery` if it is not.

Note that the card's `background-color` should change when the container width becomes smaller or larger than `650px`.

### Named container condition

The example below defines a `@container` rule that includes a name and a query, and displays the properties of the associated `CSSContainerRule`.

The CSS is very similar to that in the `@container` example Creating named container contexts.
Note that we've hidden the HTML, logging code, and feature checking code, as they are the same as in the previous example.

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

```html
<div class="post">
  <div class="card">
    <h2>Card title</h2>
    <p>Card content</p>
  </div>
</div>
```

#### CSS

In this example, the `@container` specifies a container name, `sidebar`, as well as the container type.
The card has a default font size, which is overridden when it is contained inside a `sidebar` `@container` when its width is greater than or equal to `700px`.

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

  @container sidebar (width >= 700px) {
    .card {
      font-size: 2em;
    }
  }
</style>
```

```js
const exampleStylesheet = document.getElementById("example-styles").sheet;
const exampleRules = exampleStylesheet.cssRules;
const containerRule = exampleRules[2]; // a CSSContainerRule representing the container rule.

if (typeof CSSContainerRule === "undefined") {
  // Browser doesn't support CSSContainerRule (at all)
  log("CSSContainerRule is not supported in this browser.");
} else if (!containerRule) {
  // Browser doesn't support multiple container conditions
  log(
    "No CSSContainerRule was created. This browser doesn't support @container with multiple conditions.",
  );
} else if ("conditions" in CSSContainerRule.prototype) {
  log("CSSContainerRule.conditions is supported.");
  log("CSSContainerRule.conditions:");
  containerRule.conditions.forEach((item) => {
    const jsonString = JSON.stringify(item);
    log(`  ${jsonString}`);
  });
  log(`CSSContainerRule.conditionText: "${containerRule.conditionText}"`);
} else {
  // @container exists but predates the multi-condition specification
  log("CSSContainerRule.conditions not supported");
  log(`CSSContainerRule.containerName: "${containerRule.containerName}"`);
  log(`CSSContainerRule.containerQuery: "${containerRule.containerQuery}"`);
  log(`CSSContainerRule.conditionText: "${containerRule.conditionText}"`);
}
```

#### Results

The example output is shown below.
This lists the condition using either the `conditions` property if it is supported or `containerName`/`containerQuery` if it is not.
The `conditionText` is also logged, and shows the combination of these two strings.

The text in the card `` should double in size as the page width reaches `700px`, and halve as it goes below `700px` again.

### Multiple container conditions

The example below defines a `@container` rule that includes multiple container conditions, and displays the properties of the associated `CSSContainerRule`.

Note that we've hidden the HTML, logging code, and feature checking code, as they are the same as in the previous example.

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

```html
<div class="post">
  <div class="card">
    <h2>Card title</h2>
    <p>Card content</p>
  </div>
</div>
```

#### CSS

The `@container` declaration here defines two container conditions; it will match a container if either condition is true.

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

  @container sidebar (width <= 600px), (aspect-ratio > 1/1) {
    .card {
      font-size: 2em;
      background-color: lightblue;
    }
  }
</style>
```

```js
const exampleStylesheet = document.getElementById("example-styles").sheet;
const exampleRules = exampleStylesheet.cssRules;
const containerRule = exampleRules[2]; // a CSSContainerRule representing the container rule.

if (typeof CSSContainerRule === "undefined") {
  // Browser doesn't support CSSContainerRule (at all)
  log("CSSContainerRule is not supported in this browser.");
} else if (!containerRule) {
  // Browser doesn't support multiple container conditions
  log(
    "No CSSContainerRule was created — @container with multiple conditions may not be parsed.",
  );
} else if ("conditions" in CSSContainerRule.prototype) {
  log("CSSContainerRule.conditions is supported.");
  log("CSSContainerRule.conditions:");
  containerRule.conditions.forEach((item) => {
    const jsonString = JSON.stringify(item);
    log(`  ${jsonString}`);
  });
  log(`CSSContainerRule.conditionText: "${containerRule.conditionText}"`);
} else {
  // @container exists but predates the multi-condition specification
  log("CSSContainerRule.conditions not supported");
  log(`CSSContainerRule.containerName: "${containerRule.containerName}"`);
  log(`CSSContainerRule.containerQuery: "${containerRule.containerQuery}"`);
  log(`CSSContainerRule.conditionText: "${containerRule.conditionText}"`);
}
```

#### Results

The example output is shown below.
Browsers that support the `conditions` property will show both conditions.
Those that do not will log a note indicating that multiple conditions cannot be parsed.

## See also

- CSS `container-name`, `container-type`, and `container` shorthand properties
- CSS containment module
- Container queries
- Using container size and style queries
