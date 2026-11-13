---
title: "Combine Configs"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/configure/combine-configs.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Combine Configs

In many cases, you won't write an ESLint config file from scratch, but rather, you'll use a combination of predefined and shareable configs along with your own overrides to create the config for your project. This page explains some of the patterns you can use to combine configs in your configuration file.

## Apply a Config Object

If you are importing a config object from another module, you can apply it to just a subset of files by creating a new object with a `files` key and using the `extends` key to merge in the rest of the properties from the imported object. For example:

```js
// eslint.config.js
import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: {
			js,
		},
		extends: ["js/recommended"],
		rules: {
			"no-unused-vars": "warn",
		},
	},
]);
```

Here, the `"js/recommended"` predefined configuration is applied to files that match the pattern `"**/*.js"` first and then adds the desired configuration for `no-unused-vars`.

## Apply a Config Array

If you are importing a config array from another module, you can apply a config array (an array of configuration objects) to just a subset of files by using the `extends` key. For example:

```js
// eslint.config.js
import exampleConfigs from "eslint-config-example";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		extends: [exampleConfigs],
		rules: {
			"no-unused-vars": "warn",
		},
	},
]);
```

Here, the `exampleConfigs` shareable configuration is applied to files that match the pattern "`**/*.js"` first and then another configuration object adds the desired configuration for `no-unused-vars`.
