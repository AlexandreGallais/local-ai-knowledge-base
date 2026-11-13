---
title: "regexp/prefer-result-array-groups"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/prefer-result-array-groups.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/prefer-result-array-groups

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce using result array `groups`

## :book: Rule Details

This rule reports and fixes regexp result arrays where named capturing groups are accessed by index instead of using `groups`.

<eslint-code-block fix>

```js
/* eslint regexp/prefer-result-array-groups: "error" */

const regex = /(?<foo>a)(b)c/g
let match
while (match = regex.exec(str)) {
    /* ✓ GOOD */
    var p1 = match.groups.foo
    var p2 = match[2]

    /* ✗ BAD */
    var p1 = match[1]
}
```

</eslint-code-block>

## :wrench: Options

```json
{
  "regexp/prefer-result-array-groups": ["error", {
    "strictTypes": true
  }]
}
```

- `strictTypes` ... If `true`, strictly check the type of object to determine if the string instance was used in `match()` and `matchAll()`. Default is `true`.\
  This option is always on when using TypeScript.

## :couple: Related rules

- [regexp/prefer-named-backreference]
- [regexp/prefer-named-capture-group]
- [regexp/prefer-named-replacement]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v1.4.0

## :mag: Implementation

- Rule source
- Test source
