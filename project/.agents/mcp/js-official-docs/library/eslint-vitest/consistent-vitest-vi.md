---
title: "vitest/consistent-vitest-vi"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/consistent-vitest-vi.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/consistent-vitest-vi

📝 Enforce using vitest or vi but not both.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

## Rule Details

Examples of **incorrect** code for this rule:

```js
vitest.mock('./src/calculator.ts', { spy: true })

vi.stubEnv('NODE_ENV', 'production')
```

Examples of **correct** code for this rule:

```js
vi.mock('./src/calculator.ts', { spy: true })

vi.stubEnv('NODE_ENV', 'production')
```

```js
vitest.mock('./src/calculator.ts', { spy: true })

vitest.stubEnv('NODE_ENV', 'production')
```

## Options

| Name | Description                           | Type   | Choices        | Default |
| :--- | :------------------------------------ | :----- | :------------- | :------ |
| `fn` | Preferred utility keyword to enforce. | String | `vi`, `vitest` | `vi`    |

```json
{
  "type": "object",
  "properties": {
    "fn": {
      "enum": ["vi", "vitest"]
    }
  },
  "additionalProperties": false
}
```

### `fn`

Decides whether to prefer `vitest` or `vi`.

The default configuration is top level `vi`.
