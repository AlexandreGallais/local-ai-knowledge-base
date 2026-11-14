---
title: "regexp/no-useless-non-capturing-group"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/no-useless-non-capturing-group.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/no-useless-non-capturing-group

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> disallow unnecessary non-capturing group

## :book: Rule Details

This rule reports unnecessary non-capturing groups. Unnecessary groups are just clutter that make regexes harder to read, so they should be removed.

<eslint-code-block fix>

```js
/* eslint regexp/no-useless-non-capturing-group: "error" */

/* ✓ GOOD */
var foo = /(?:abcd)?/.test(str)
var foo = /a(?:ab|cd)/.test(str)

/* ✗ BAD */
var foo = /(?:ab|cd)/.test(str)
var foo = /(?:abcd)/.test(str)
var foo = /(?:[a-d])/.test(str)
var foo = /(?:[a-d])|e/.test(str)
var foo = /(?:a|(?:b|c)|d)/.test(str)
var foo = /a(?:b)+/.test(str)
```

</eslint-code-block>

## :wrench: Options

```json5
{
  "regexp/no-useless-non-capturing-group": ["error", {
    "allowTop": "partial" // or "always" or "never"
  }]
}
```

- `"allowTop"`:
  Whether a top-level non-capturing group is allowed (e.g. `/(?:foo|bar)/`). Defaults to `"partial"`.

  Sometimes it's useful to wrap a whole pattern into a non-capturing group (e.g. when the pattern is used as a building block to construct more complex patterns). Use this option to allow top-level non-capturing groups.
  - `"partial"`:
    Allows top-level non-capturing groups of patterns used as strings via `.source`.

    <eslint-code-block fix>

    ```js
    /* eslint regexp/no-useless-non-capturing-group: ["error", { allowTop: "partial" }] */

    /* ✓ GOOD */
    var foo = /(?:ab|cd)/;
    var bar = /(?:ab|cd)/; // We still don't know how it will be used.

    /* ✗ BAD */
    /(?:ab|cd)/.test(str);

    /*-------*/
    var baz = new RexExp(foo.source + 'e');
    baz.test(str);
    ```

    </eslint-code-block>

  - `"always"`:
    Always allow top-level non-capturing groups.

    <eslint-code-block fix>

    ```js
    /* eslint regexp/no-useless-non-capturing-group: ["error", { allowTop: "always" }] */

    /* ✓ GOOD */
    var foo = /(?:abcd)/.test(str)
    var foo = /(?:ab|cd)/.test(str)
    var foo = /(?:abcd)/.test(str)
    var foo = /(?:[a-d])/.test(str)

    /* ✗ BAD */
    var foo = /(?:[a-d])|e/.test(str)
    var foo = /(?:a|(?:b|c)|d)/.test(str)
    ```

    </eslint-code-block>

  - `"never"`:
    Never allow top-level non-capturing groups.

    <eslint-code-block fix>

    ```js
    /* eslint regexp/no-useless-non-capturing-group: ["error", { allowTop: "never" }] */

    /* ✗ BAD */
    var foo = /(?:ab|cd)/;
    var bar = /(?:ab|cd)/;

    /(?:ab|cd)/.test(str);

    /*-------*/
    var baz = new RexExp(foo.source + 'e');
    baz.test(str);
    ```

    </eslint-code-block>

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.4.0

## :mag: Implementation

- Rule source
- Test source
