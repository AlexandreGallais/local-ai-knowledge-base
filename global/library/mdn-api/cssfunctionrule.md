---
title: "CSSFunctionRule"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfunctionrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFunctionRule

The **`CSSFunctionRule`** interface of the CSS Object Model represents CSS `@function` (custom function) at-rules.

## Instance properties

_This interface also inherits properties from `CSSGroupingRule`._

- `CSSFunctionRule.name` (read-only) (experimental)
    Returns a string representing the custom function's name.
- `CSSFunctionRule.returnType` (read-only) (experimental)
    Returns a string representing the custom function's return type.

## Instance methods

_This interface also inherits methods from `CSSGroupingRule`._

- `CSSFunctionRule.getParameters()` (experimental)
    Returns an array of objects representing the custom function's parameters.

## Examples

### Basic `CSSFunctionRule` usage

In this example, we define a CSS custom function and then access it using the CSSOM.

#### CSS

Our CSS defines a custom function using the `@function` at-rule. The function is called `--lighter()`, and outputs a lightened version of an input color. `--lighter()` accepts two parameters, a `<color>` and a `<number>`. It returns an `oklch()` color created using relative color syntax; the input color is transformed into an `oklch()` color and its lightness channel is increased by the input number.

```css
@function --lighter(--color <color>, --lightness-adjust <number>: 0.2) returns
  <color> {
  result: oklch(from var(--color) calc(l + var(--lightness-adjust)) c h);
}
```

#### JavaScript

Our script starts by getting a reference to the stylesheet attached to our document using `HTMLStyleElement.sheet`, then getting a reference to the only rule in the stylesheet, the `CSSFunctionRule` — via `CSSStylesheet.cssRules`. We then log each of the `CSSFunctionRule` members to the console.

```js
// Get a CSSFunctionRule
const cssFunc = document.getElementById("css-output").sheet.cssRules[0];

// Accessing CSSFunctionRule members
console.log(cssFunc.name);
console.log(cssFunc.returnType);
console.log(cssFunc.getParameters());
```

- The `name` property is equal to `--lighter`.
- The `returnType` property is equal to `<color>`.
- The `getParameters()` method returns an array that looks like so:
  ```js
  [
    { name: "--color", type: "<color>" },
    { defaultValue: "0.2", name: "--lightness-adjust", type: "<number>" },
  ];
  ```

## See also

- `@function`
- `CSSFunctionDescriptors`
- `CSSFunctionDeclarations`
