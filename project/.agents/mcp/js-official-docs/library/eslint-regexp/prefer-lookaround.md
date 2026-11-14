---
title: "regexp/prefer-lookaround"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/prefer-lookaround.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/prefer-lookaround

🔧 This rule is automatically fixable by the `--fix` CLI option.

> prefer lookarounds over capturing group that do not replace

## :book: Rule Details

This rule reports string replacement using capturing groups that can be replaced with lookaround assertions.

<eslint-code-block fix>

```js
/* eslint regexp/prefer-lookaround: "error" */

/* ✓ GOOD */
var str = 'JavaScript'.replace(/Java(?=Script)/g, 'Type')

/* ✗ BAD */
var str = 'JavaScript'.replace(/Java(Script)/g, 'Type$1')
```

</eslint-code-block>

## :wrench: Options

```json
{
  "regexp/prefer-lookaround": ["error", {
      "lookbehind": true,
      "strictTypes": true
  }]
}
```

### `lookbehind`

This option controls whether this rule will suggest using lookbehinds. Default is `true`.

Safari is the last major browser that still does not support regex lookbehind assertions (as of December 2022). So if your code base targets Safari, you cannot use lookbehinds.

### `strictTypes`

If `true`, strictly check the type of object to determine if the regex instance was used in `replace()` and `replaceAll()`. Default is `true`.

This option is always on when using TypeScript.

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v1.2.0

## :mag: Implementation

- Rule source
- Test source
