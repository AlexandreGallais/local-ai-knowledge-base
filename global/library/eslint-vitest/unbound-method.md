---
title: "vitest/unbound-method"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/unbound-method.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/unbound-method

📝 Enforce unbound methods are called with their expected scope.

⚠️ This rule _warns_ in the 🌐 `all` config.

💭 This rule requires type information.

This rule extends the base `@typescript-eslint/unbound-method`
rule, meaning you must depend on `@typescript-eslint/eslint-plugin` for it to
work. It adds support for understanding when it's ok to pass an unbound method
to `expect` calls.

### How to use this rule

This rule is enabled in the `all` config.

```json5
{
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['test/**'],
      plugins: ['vitest'],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
        'vitest/unbound-method': 'error',
      },
    },
  ],
  rules: {
    '@typescript-eslint/unbound-method': 'error',
  },
}
```

### Options

Checkout @typescript-eslint/unbound-method options. including `ignoreStatic`
