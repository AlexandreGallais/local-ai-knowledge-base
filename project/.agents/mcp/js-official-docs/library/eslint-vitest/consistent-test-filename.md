---
title: "vitest/consistent-test-filename"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/consistent-test-filename.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/consistent-test-filename

📝 Require test file pattern.

⚠️ This rule _warns_ in the 🌐 `all` config.

## Rule Details

### Options

| Name             | Description                                              | Type   | Default                      |
| :--------------- | :------------------------------------------------------- | :----- | :--------------------------- |
| `allTestPattern` | Regex pattern used to identify all possible test files.  | String | `.*\.(test\|spec)\.[tj]sx?$` |
| `pattern`        | Regex pattern for files that should be treated as tests. | String | `.*\.test\.[tj]sx?$`         |

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "pattern": {
      "format": "regex",
      "default": ".*\\.test\\.[tj]sx?$"
    },
    "allTestPattern": {
      "format": "",
      "default": ".*\\.(test|spec)\\.[tj]sx?$"
    }
  }
}
```

##### `allTestPattern`

regex pattern for all tests files

Decides whether a file is a testing file.

##### `pattern`

required testing pattern

`pattern` doesn't have a default value, you must provide one.
