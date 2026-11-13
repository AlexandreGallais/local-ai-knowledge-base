---
title: "vitest/no-focused-tests"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-focused-tests.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-focused-tests

📝 Disallow focused tests.

💼⚠️ This rule is enabled in the ✅ `recommended` config. This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

## Rule Details

Examples of **incorrect** code for this rule:

```js
it.only('test', () => {
  // ...
})

test.only('it', () => {
  // ...
})
```

Examples of **correct** code for this rule:

```js
it('test', () => {
  // ...
})

test('it', () => {
  /* ... */
})
```

### Options

| Name      | Description                                 | Type    | Default |
| :-------- | :------------------------------------------ | :------ | :------ |
| `fixable` | Whether the rule should provide an autofix. | Boolean | `true`  |

This rule has a `fixable` option that tells the plugin to automatically fix the tests for you. The option is enabled by default. You can disable it in your `eslint.config.js` file using the following configuration.

```ts
import vitest from 'eslint-plugin-vitest'

export default [
  {
    files: ['**/*.ts', '**/*.js'], // or any other pattern
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.all,
      'vitest/no-focused-tests': ['error', { fixable: false }],
    },
  },
]
```
