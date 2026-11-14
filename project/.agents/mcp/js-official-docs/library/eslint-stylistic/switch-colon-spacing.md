---
title: "switch-colon-spacing"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/switch-colon-spacing/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

---
---

# switch-colon-spacing

Spacing around colons improves readability of `case`/`default` clauses.

## Rule Details

This rule controls spacing around colons of `case` and `default` clauses in `switch` statements.
This rule does the check only if the consecutive tokens exist on the same line.

## Options

This rule has 2 options that are boolean value.

```json
{
    "switch-colon-spacing": ["error", {"after": true, "before": false}]
}
```

- `"after": true` (Default) requires one or more spaces after colons.
- `"after": false` disallows spaces after colons.
- `"before": true` requires one or more spaces before colons.
- `"before": false` (Default) disallows before colons.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/* eslint @stylistic/switch-colon-spacing: "error" */

switch (a) {
    case 0 :break;
    default :foo();
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/* eslint @stylistic/switch-colon-spacing: "error" */

switch (a) {
    case 0: foo(); break;
    case 1:
        bar();
        break;
    default:
        baz();
        break;
}
```

Examples of **incorrect** code for this rule with `{"after": false, "before": true}` option:

**Incorrect:**

```js
/* eslint @stylistic/switch-colon-spacing: ["error", {"after": false, "before": true}] */

switch (a) {
    case 0: break;
    default: foo();
}
```

Examples of **correct** code for this rule with `{"after": false, "before": true}` option:

**Correct:**

```js
/* eslint @stylistic/switch-colon-spacing: ["error", {"after": false, "before": true}] */

switch (a) {
    case 0 :foo(); break;
    case 1 :
        bar();
        break;
    default :
        baz();
        break;
}
```

## When Not To Use It

If you don't want to notify spacing around colons of switch statements, then it's safe to disable this rule.
