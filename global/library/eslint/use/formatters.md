---
title: "Formatters Reference (part 1 of 7)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/formatters/index.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Formatters Reference

ESLint comes with several built-in formatters to control the appearance of the linting results, and supports third-party formatters as well.

You can specify a formatter using the `--format` or `-f` flag in the CLI. For example, `--format json` uses the `json` formatter.

The built-in formatter options are:

* html
* json-with-metadata
* json
* stylish

## Example Source

Examples of each formatter were created from linting `fullOfProblems.js` using the `eslint.config.js` configuration shown below.

`fullOfProblems.js`:

```js
function addOne(i) {
    if (i != NaN) {
        return i ++
    } else {
      return
    }
};
```

`eslint.config.js`:

```js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: {
			js,
		},
		extends: ["js/recommended"],
		rules: {
			"consistent-return": 2,
			"indent"           : [1, 4],
			"no-else-return"   : 1,
			"semi"             : [1, "always"],
			"space-unary-ops"  : 2
		}
	}
]);
```

Tests the formatters with the CLI:

```shell
npx eslint --format <Add formatter here> fullOfProblems.js
```
