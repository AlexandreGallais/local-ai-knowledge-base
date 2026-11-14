---
title: "CSSStyleSheet: replace() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylesheet/replace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleSheet: replace() method

The **`replace()`** method of the `CSSStyleSheet` interface asynchronously replaces the content of the stylesheet with the content passed into it. The method returns a promise that resolves with the `CSSStyleSheet` object.

The `replace()` and `CSSStyleSheet.replaceSync()` methods can only be used on a stylesheet created with the `CSSStyleSheet()` constructor.

## Syntax

```js
replace(text)
```

### Parameters

- `text`
    A string containing the style rules to replace the content of the stylesheet. If the string does not contain a parsable list of rules, then the value will be set to an empty string.

    > **Note:**
    > If any of the rules passed in `text` are an external stylesheet imported with the `@import` rule, those rules will be removed, and a warning printed to the console.

### Return value

A `Promise` that resolves with the `CSSStyleSheet`.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if one of these two conditions is met:
    - The stylesheet was not created using the `CSSStyleSheet()` constructor.
    - The stylesheet is flagged as unmodifiable.

## Examples

In the following example a new stylesheet is created and two CSS rules are added using `replace()`. The first rule is then printed to the console, which will return: `body { font-size: 1.4em; }`

```js
const stylesheet = new CSSStyleSheet();

stylesheet
  .replace("body { font-size: 1.4em; } p { color: red; }")
  .then(() => {
    console.log(stylesheet.cssRules[0].cssText);
  })
  .catch((err) => {
    console.error("Failed to replace styles:", err);
  });
```

## See also

- Constructable Stylesheets (web.dev)
- Using the Shadow DOM
