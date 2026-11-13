---
title: "CSSStyleSheet: replaceSync() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssstylesheet/replacesync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSStyleSheet: replaceSync() method

The **`replaceSync()`** method of the `CSSStyleSheet` interface synchronously replaces the content of the stylesheet with the content passed into it.

The `replaceSync()` and `CSSStyleSheet.replace()` methods can only be used on a stylesheet created with the `CSSStyleSheet()` constructor.

## Syntax

```js
replaceSync(text)
```

### Parameters

- `text`
    A string containing the style rules to replace the content of the stylesheet. If the string does not contain a parsable list of rules, then the value will be set to an empty string.

    > **Note:**
    > If any of the rules passed in `text` are an external stylesheet imported with the `@import` rule, those rules will be removed, and a warning printed to the console.

### Return value

None (`undefined`).

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if the stylesheet was not created using the `CSSStyleSheet()` constructor or if the stylesheet is flagged as unmodifiable.

## Examples

In the following example a new stylesheet is created and two CSS rules are added using `replaceSync`.

```js
const stylesheet = new CSSStyleSheet();

stylesheet.replaceSync("body { font-size: 1.4em; } p { color: red; }");
```

## See also

- Constructable Stylesheets (web.dev)
- Using the Shadow DOM
