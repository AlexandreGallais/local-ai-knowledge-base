---
title: "vitest/padding-around-describe-blocks"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/padding-around-describe-blocks.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/padding-around-describe-blocks

📝 Enforce padding around `describe` blocks.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

## Rule Details

This rule enforces a line of padding before _and_ after 1 or more `describe`
statements.

Note that it doesn't add/enforce a padding line if it's the last statement in
its scope.

Examples of **incorrect** code for this rule:

```js
const someText = 'hoge'
describe('hoge', () => {})
describe('foo', () => {})
```

Examples of **correct** code for this rule:

```js
const someText = 'hoge'

describe('hoge', () => {})

describe('foo', () => {})
```
