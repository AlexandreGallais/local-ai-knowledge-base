---
title: "outputFile | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/outputfile.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# outputFile <CRoot /> {#outputfile}

- **Type:** `string | Record<string, string>`
- **CLI:** `--outputFile=`, `--outputFile.json=./path`

Write test results to a file when the `--reporter=json` or `--reporter=junit` option is also specified.
By providing an object instead of a string you can define individual outputs when using multiple reporters.
