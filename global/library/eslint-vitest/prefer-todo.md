---
title: "vitest/prefer-todo"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-todo.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-todo

📝 Enforce using `test.todo`.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

When tests are empty it's better to mark them as `test.todo` as it will be highlighted in tests summary output.

### Rule details

The following pattern is considered a warning:

```js
test('foo')
test('foo', () => {})
test.skip('foo', () => {})
```

The following pattern is not considered a warning:

```js
test.todo('foo')
```
