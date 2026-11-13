---
title: "vitest/no-large-snapshots"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-large-snapshots.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-large-snapshots

📝 Disallow large snapshots.

⚠️ This rule _warns_ in the 🌐 `all` config.

## Rule Details

This rule aims to prevent large snapshots.

### Options

| Name               | Description                                                                                                                                                          | Type   |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----- |
| `allowedSnapshots` | A map of snapshot absolute file paths to arrays of snapshot names that are allowed to exceed the size limit. Snapshot names can be specified as regular expressions. | Object |
| `inlineMaxSize`    | Maximum number of lines allowed in inline snapshots.                                                                                                                 | Number |
| `maxSize`          | Maximum number of lines allowed in external snapshots.                                                                                                               | Number |

This rule accepts an object with the following properties:

- `maxSize` (default: `50`): The maximum size of a snapshot.
- `inlineMaxSize` (default: `0`): The maximum size of a snapshot when it is inline.
- `allowedSnapshots` (default: `{}`): The list of allowed snapshots.

### For example:

```json
{
  "vitest/no-large-snapshots": [
    "error",
    {
      "maxSize": 50,
      "inlineMaxSize": 0,
      "allowedSnapshots": {}
    }
  ]
}
```

Examples of **incorrect** code for this rule with the above configuration:

```js
test('large snapshot', () => {
  expect('a'.repeat(100)).toMatchSnapshot()
})
```

Examples of **correct** code for this rule with the above configuration:

```js
test('large snapshot', () => {
  expect('a'.repeat(50)).toMatchSnapshot()
})
```

## When Not To Use It

If you don't want to limit the size of your snapshots, you can disable this rule.
