---
title: "vitest/expect-expect"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/expect-expect.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/expect-expect

📝 Enforce having expectation in test body.

💼⚠️ This rule is enabled in the ✅ `recommended` config. This rule _warns_ in the 🌐 `all` config.

## Rule Details

This rule aims to enforce having at least one expectation in test body to ensure that the test is actually testing something.

Examples of **incorrect** code for this rule:

```js
test('myLogic', () => {
  console.log('myLogic')
})

test('myLogic', () => {})
```

Examples of **correct** code for this rule:

```js
test('myLogic', () => {
  const actual = myLogic()
  expect(actual).toBe(true)
})
```

## Type-testing

If you're using Vitest's type-testing feature and have tests that only contain `expectTypeOf`, you will need to enable `typecheck` in this plugin's settings: Enabling type-testing.

## Options

| Name                           | Description                                                 | Type     | Default              |
| :----------------------------- | :---------------------------------------------------------- | :------- | :------------------- |
| `additionalTestBlockFunctions` | Additional functions that should be treated as test blocks. | String[] | `[]`                 |
| `assertFunctionNames`          | List of function names treated as assertions.               | String[] | [`expect`, `assert`] |

### `assertFunctionNames`

```json
{
  "vitest/expect-expect": [
    "error",
    {
      "assertFunctionNames": ["expect"],
      "additionalTestBlockFunctions": []
    }
  ]
}
```

An array of strings that are the names of the functions that are used for assertions. Function names can also be wildcard patterns like `expect*`,`function.**.expect` or `expect.anything`.

The following is an example of correct code for this rule with the option `assertFunctionNames`:

```js
import CheckForMe from 'check-for-me'
test('myLogic', () => {
  expect('myLogic').toBe('myOutput')
})
```

### `additionalTestBlockFunctions`

```json
{
  "rules": {
    "vitest/expect-expect": [
      "error",
      { "additionalTestBlockFunctions": ["checkForMe"] }
    ]
  }
}
```

An array of strings that are the names of the functions that are used for test blocks. Function names can also be wildcard patterns like `describe*`,`function.**.describe` or `describe.anything`.

The following is an example of correct code for this rule with the option `additionalTestBlockFunctions`:

```js
import CheckForMe from 'check-for-me'
checkForMe('myLogic', () => {
  checkForMe('myLogic', () => {
    const actual = myLogic()
    expect(actual).toBe(true)
  })
})
```
