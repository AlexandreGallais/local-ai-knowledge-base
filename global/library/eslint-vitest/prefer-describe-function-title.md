---
title: "vitest/prefer-describe-function-title"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-describe-function-title.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-describe-function-title

📝 Enforce using a function as a describe title over an equivalent string.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

## Rule Details

This rule aims to enforce passing a named function to `describe()` instead of an equivalent hardcoded string.

Passing named functions means the correct title will be used even if the function is renamed.
This rule will report if a string is passed to a `describe()` block if:

- The string matches a function imported into the file
- That function's name also matches the test file's name

Examples of **incorrect** code for this rule:

```ts
// myFunction.test.js
import { myFunction } from './myFunction'

describe('myFunction', () => {
  // ...
})
```

Examples of **correct** code for this rule:

```ts
// myFunction.test.js
import { myFunction } from './myFunction'

describe(myFunction, () => {
  // ...
})
```
