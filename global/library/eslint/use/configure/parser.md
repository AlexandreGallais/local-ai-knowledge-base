---
title: "Configure a Parser"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/configure/parser.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Configure a Parser

**Tip:**
This page explains how to configure parsers using the flat config format.

You can use custom parsers to convert JavaScript code into an abstract syntax tree for ESLint to evaluate. You might want to add a custom parser if your code isn't compatible with ESLint's default parser, Espree.

## Configure a Custom Parser

In many cases, you can use the default parser that ESLint ships with for parsing your JavaScript code. You can optionally override the default parser by using the `parser` property. The `parser` property must be an object that conforms to the parser interface. For example, you can use the `@babel/eslint-parser` package to allow ESLint to parse experimental syntax:

```js
// eslint.config.js
import babelParser from "@babel/eslint-parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js", "**/*.mjs"],
		languageOptions: {
			parser: babelParser,
		},
	},
]);
```

This configuration ensures that the Babel parser, rather than the default Espree parser, is used to parse all files ending with `.js` and `.mjs`.

The following third-party parsers are known to be compatible with ESLint:

- Esprima
- @babel/eslint-parser - A wrapper around the Babel parser that makes it compatible with ESLint.
- @typescript-eslint/parser - A parser that converts TypeScript into an ESTree-compatible form so it can be used in ESLint.

**Warning:**
There are no guarantees that an external parser works correctly with ESLint. ESLint does not fix bugs related to incompatibilities that affect only third-party parsers.

## Configure Parser Options

Parsers may accept options to alter the way they behave. The `languageOptions.parserOptions` is used to pass <example-value> directly to parsers. These options are always parser-specific, so you'll need to check the documentation of the parser you're using for available options. Here's an example of setting parser options for the Babel ESLint parser:

```js
// eslint.config.js
import babelParser from "@babel/eslint-parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		languageOptions: {
			parser: babelParser,
			parserOptions: {
				requireConfigFile: false,
				babelOptions: {
					babelrc: false,
					configFile: false,
					presets: ["@babel/preset-env"],
				},
			},
		},
	},
]);
```

**Tip:**
In addition to the options specified in `languageOptions.parserOptions`, ESLint also passes `languageOptions.ecmaVersion` and `languageOptions.sourceType` to all parsers. ESLint uses `languageOptions.ecmaVersion` internally (for example, to add built-in globals), and passing these values allows parsers to understand the context in which ESLint is evaluating JavaScript code. If you need to pass a different `ecmaVersion` or `sourceType` specifically to the parser, you can set `languageOptions.parserOptions.ecmaVersion` or `languageOptions.parserOptions.sourceType`. These options will take precedence over the corresponding `languageOptions` for the parser.
