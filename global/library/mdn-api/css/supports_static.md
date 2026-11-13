---
title: "CSS: supports() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/css/supports_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS: supports() static method

The **`CSS.supports()`** static method returns a boolean value
indicating if the browser supports a given CSS feature, or not.

## Syntax

```js
CSS.supports(propertyName, value)
CSS.supports(supportCondition)
```

### Parameters

There are two distinct sets of parameters. The first one allows you to test the support of
a pair _property-value_:

- `propertyName`
    A string containing the name of the CSS property to check.
- `value`
    A string containing the value of the CSS property to check.

The second syntax takes one parameter matching the condition of
`@supports`:

- `supportCondition`
    A string containing the condition to check.

### Return value

`true` if the browser supports the rule, otherwise `false`.

## Examples

In the following examples, `result` is a boolean value indicating if the browser supports the given CSS feature.

```js
result = CSS.supports("text-decoration-style", "blink");
result = CSS.supports("display: flex");
result = CSS.supports("(--foo: red)");
result = CSS.supports("selector(:has(a))");
result = CSS.supports(
  "(transform-style: preserve) or (-moz-transform-style: preserve) or (-webkit-transform-style: preserve)",
);
```

For more examples and syntax features, see the `@supports` at-rule.

## See also

- The `@supports` at-rule that allows for the same functionality but in a
  declarative way.
- The `CSSSupportsRule` CSSOM class allowing you to manipulate
  `@supports` at-rules.
