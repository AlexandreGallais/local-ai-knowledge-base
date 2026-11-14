---
title: "regexp/no-super-linear-backtracking"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-super-linear-backtracking.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-super-linear-backtracking

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> disallow exponential and polynomial backtracking

## :book: Rule Details

This rule reports cases of exponential and polynomial backtracking.

These types of backtracking almost always cause an exponential or polynomial worst-case runtime. This super-linear worst-case runtime can be exploited by attackers in what is called Regular expression Denial of Service - ReDoS.

<eslint-code-block fix>

```js
/* eslint regexp/no-super-linear-backtracking: "error" */

/* ✓ GOOD */
var foo = /a*b+a*$/;
var foo = /(?:a+)?/;

/* ✗ BAD */
var foo = /(?:a+)+$/;
var foo = /a*b?a*$/;
var foo = /(?:a|b|c+)*$/;
// not all cases can automatically be fixed
var foo = /\s*(.*?)(?=:)/;
var foo = /.+?(?=\s*=)/;
```

</eslint-code-block>

### Limitations

The rule only implements a very simplistic detection method and can only detect very simple cases of super-linear backtracking right now.

While the detection will improve in the future, this rule will never be able to perfectly detect all cases super-linear backtracking.

## :wrench: Options

```json
{
  "regexp/no-super-linear-backtracking": ["error", {
    "report": "certain"
  }]
}
```

### `report`

Every input string that exploits super-linear worst-case runtime can be separated into 3 parts:

1. A prefix to leads to exploitable part of the regex.
2. A non-empty string that will be repeated to exploit the ambiguity.
3. A rejecting suffix that forces the regex engine to backtrack.

For some regexes it is not possible to find a rejecting suffix even though the regex contains exploitable ambiguity (e.g. `/(?:a+)+/`). These regexes are safe as long as they are used as is. However, regexes can also be used as building blocks to create more complex regexes. In this case, the ambiguity might cause super-linear backtracking in the composite regex.

These options control whether ambiguity that might cause super-linear backtracking will be reported.

- `report: "certain"`  (_default_)

  Only certain cases of super-linear backtracking will be reported.

  This means that ambiguity will only be reported if this rule can prove that there exists a rejecting suffix.

- `report: "potential"`

  All certain and potential cases of super-linear backtracking will be reported.

  Potential cases are ones where a rejecting might be possible. Whether the reported potential cases are false positives or not has to be decided by the developer.

## :books: Further reading

- Regular expression Denial of Service - ReDoS
- [scslre]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.13.0

## :mag: Implementation

- Rule source
- Test source
