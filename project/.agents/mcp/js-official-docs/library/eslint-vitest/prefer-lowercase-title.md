---
title: "vitest/prefer-lowercase-title"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-lowercase-title.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-lowercase-title

📝 Enforce lowercase titles.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

## Rule Details

Examples of **incorrect** code for this rule:

```js
test('It works', () => {
  // ...
})
```

Examples of **correct** code for this rule:

```js
test('it works', () => {
  // ...
})
```

### Options

| Name                          | Description                                                  | Type     | Default |
| :---------------------------- | :----------------------------------------------------------- | :------- | :------ |
| `allowedPrefixes`             | Title prefixes that are exempt from this rule.               | String[] | `[]`    |
| `ignore`                      | Functions whose titles should be ignored when checking case. | String[] | `[]`    |
| `ignoreTopLevelDescribe`      | Ignore the first top-level `describe` title.                 | Boolean  | `false` |
| `lowercaseFirstCharacterOnly` | Only require the first character to be lowercase.            | Boolean  | `true`  |

```json
{
  "type": "object",
  "properties": {
    "ignore": {
      "type": "array",
      "items": {
        "enum": ["describe", "test", "it"]
      },
      "additionalProperties": false
    },
    "allowedPrefixes": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "additionalItems": false
    },
    "ignoreTopLevelDescribe": {
      "type": "boolean",
      "default": false
    },
    "lowercaseFirstCharacterOnly": {
      "type": "boolean",
      "default": true
    }
  },
  "additionalProperties": false
}
```
