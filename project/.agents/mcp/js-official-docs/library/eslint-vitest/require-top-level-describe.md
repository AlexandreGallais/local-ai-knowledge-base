---
title: "vitest/require-top-level-describe"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/require-top-level-describe.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/require-top-level-describe

📝 Enforce that all tests are in a top-level describe.

⚠️ This rule _warns_ in the 🌐 `all` config.

This rule triggers warning if a test case (`test` and `it`) or a hook (`beforeAll`, `beforeEach`, `afterEach`, `afterAll`) is not located in a top-level `describe` block.

## Options

| Name                           | Description                                                   | Type   | Default    |
| :----------------------------- | :------------------------------------------------------------ | :----- | :--------- |
| `maxNumberOfTopLevelDescribes` | Maximum number of `describe` blocks allowed at the top level. | Number | `Infinity` |

This rule accepts an object with the following properties:

- `maxNumberOfTopLevelDescribes`: The maximum number of top-level tests allowed in a file. Defaults to `Infinity`. Allowing any number of top-level describe blocks.

```json
{
  "vitest/require-top-level-describe": [
    "error",
    {
      "maxNumberOfTopLevelDescribes": 2
    }
  ]
}
```

The following patterns are considered warnings:

```js
test('foo', () => {})

beforeEach(() => {
  describe('bar', () => {
    test('baz', () => {})
  })
})
```

The following patterns are not considered warnings:

```js
describe('foo', () => {
  test('bar', () => {})
})

describe('foo', () => {
  beforeEach(() => {
    describe('bar', () => {
      test('baz', () => {})
    })
  })
})
```
