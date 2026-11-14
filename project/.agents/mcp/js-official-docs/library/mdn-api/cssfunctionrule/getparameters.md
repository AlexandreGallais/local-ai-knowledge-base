---
title: "CSSFunctionRule: getParameters() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssfunctionrule/getparameters/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSFunctionRule: getParameters() method

The **`getParameters()`** method of the `CSSFunctionRule` interface returns an array of objects representing the custom function's parameters.

## Syntax

```js
getParameters()
```

### Parameters

None.

### Return value

An array of objects containing the following properties:

- `name`
    A string representing the name of the function parameter.
- `type`
    A string representing the data type of the parameter, or `*` if no data type was specified.
- `defaultValue`
    A string representing the default value of the parameter, or `null` if no default value was specified.

If no parameters were specified in the associated `@function` at-rule, an empty array is returned.

## Examples

See the main `CSSFunctionRule` reference page for an example.

## See also

- `@function`
