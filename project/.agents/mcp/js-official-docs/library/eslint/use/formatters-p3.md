---
title: "Formatters Reference (part 3 of 7)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/formatters/index.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Formatters Reference (part 3 of 7)

### json-with-metadata

Outputs JSON-serialized results. The `json-with-metadata` provides the same linting results as the `json` formatter with additional metadata about the rules applied. The linting results are included in the `results` property and the rules metadata is included in the `metadata` property.

Alternatively, you can use the ESLint Node.js API to programmatically use ESLint.

Example output (formatted for easier reading):
