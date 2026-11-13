---
title: "vitest/no-alias-methods"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-alias-methods.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-alias-methods

📝 Disallow alias methods.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

## Rule Details

This rule disallows alias methods and forces the use of the original method.

Examples of **incorrect** code for this rule:

```js
expect(a).toBeCalled()
```

```js
expect(a).toBeCalledTimes(1)
```

Examples of **correct** code for this rule:

```js
expect(a).toHaveBeenCalled()
```

```js
expect(a).toHaveBeenCalledTimes(1)
```

## When Not To Use It

If you don't care about alias methods, you can disable this rule.
