---
title: "Configuration Migration Guide (part 3 of 3)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/configure/migration-guide.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Configuration Migration Guide (part 3 of 3)

### Ignore Files

With eslintrc, you can make ESLint ignore files by creating a separate `.eslintignore` file in the root of your project. The `.eslintignore` file uses the same glob pattern syntax as `.gitignore` files. Alternatively, you can use an `ignorePatterns` property in your eslintrc file.

To ignore files with flat config, you can use the `ignores` property in a config object with no other properties. The `ignores` property accepts an array of glob patterns. Flat config does not support loading ignore patterns from `.eslintignore` files, so you'll need to migrate those patterns directly into flat config.

For example, here's a `.eslintignore` example you can use with an eslintrc config:

```shell
# .eslintignore
temp.js
config/*
# ...other ignored files
```

Here are the same patterns represented as `ignorePatterns` in a `.eslintrc.js` file:

```javascript
// .eslintrc.js
module.exports = {
	// ...other config
	ignorePatterns: ["temp.js", "config/*"],
};
```

The equivalent ignore patterns in flat config look like this:

```javascript
import { defineConfig } from "eslint/config";

export default defineConfig([
	// ...other config
	{
		// Note: there should be no other properties in this object
		ignores: ["**/temp.js", "config/*"],
	},
]);
```

In `.eslintignore`, `temp.js` ignores all files named `temp.js`, whereas in flat config, you need to specify this as `**/temp.js`. The pattern `temp.js` in flat config only ignores a file named `temp.js` in the same directory as the configuration file.

**Important:**
In flat config, dotfiles (e.g. `.dotfile.js`) are no longer ignored by default. If you want to ignore dotfiles, add an ignore pattern of `"**/.*"`.

### Linter Options

Eslintrc files let you configure the linter itself with the `noInlineConfig` and `reportUnusedDisableDirectives` properties.

The flat config system introduces a new top-level property `linterOptions` that you can use to configure the linter. In the `linterOptions` object, you can include `noInlineConfig` and `reportUnusedDisableDirectives`.

For example, here's an eslintrc file with linter options enabled:

```javascript
// .eslintrc.js

module.exports = {
	// ...other config
	noInlineConfig: true,
	reportUnusedDisableDirectives: true,
};
```

Here's the same options in flat config:

```javascript
// eslint.config.js

import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		// ...other config
		linterOptions: {
			noInlineConfig: true,
			reportUnusedDisableDirectives: "warn",
		},
	},
]);
```

### CLI Flag Changes

The following CLI flags are no longer supported with the flat config file format:

- `--env`
- `--ignore-path`
- `--no-eslintrc`
- `--resolve-plugins-relative-to`
- `--rulesdir`

#### `--env`

The `--env` flag was used to enable environment-specific globals (for example, `browser`, or `node`). Flat config doesn't support this flag. Instead, define the relevant globals directly in your configuration. See Specify Globals for more details.

For example, if you previously used `--env browser,node`, you’ll need to update your config file like this:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
]);
```

#### `--ignore-path`

The `--ignore-path` flag was used to specify which file to use as your `.eslintignore`. Flat config doesn't load ignore patterns from `.eslintignore` files and does not support this flag. If you want to include patterns from a `.gitignore` file, use `includeIgnoreFile()` from `@eslint/compat`. See Include `.gitignore` Files for more details.

For example, if you previously used `--ignore-path .gitignore`:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import { includeIgnoreFile } from "@eslint/compat";
import { fileURLToPath } from "node:url";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
	includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
	// other configs
]);
```

_Update (2026-05-01): The `includeIgnoreFile()` from `@eslint/compat` has been deprecated in favor of `includeIgnoreFile()` from `@eslint/config-helpers` (reexported at `eslint/config`). The new API is more versatile and has an option to interpret ignore patterns relative to the ignore file._

#### `--no-eslintrc`

The `--no-eslintrc` flag has been replaced with `--no-config-lookup`.

#### `--resolve-plugins-relative-to`

The `--resolve-plugins-relative-to` flag was used to indicate which directory plugin references in your configuration file should be resolved relative to. This was necessary because shareable configs could only resolve plugins that were peer dependencies or dependencies of parent packages.

With flat config, shareable configs can specify their dependencies directly, so this flag is no longer needed.

#### `--rulesdir`

The `--rulesdir` flag was used to load additional rules from a specified directory. This is no longer supported when using flat config. You can instead create a plugin containing the local rules you have directly in your config, like this:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import myRule from "./rules/my-rule.js";

export default defineConfig([
	{
		// define the plugin
		plugins: {
			local: {
				rules: {
					"my-rule": myRule,
				},
			},
		},

		// configure the rule
		rules: {
			"local/my-rule": ["error"],
		},
	},
]);
```

### `package.json` Configuration No Longer Supported

With eslintrc, it was possible to use a `package.json` file to configure ESLint using the `eslintConfig` key.

With flat config, it's no longer possible to use a `package.json` file to configure ESLint. You'll need to move your configuration into a separate file.

### Additional Changes

The following changes have been made from the eslintrc to the flat config file format:

- The `root` option no longer exists. (Flat config files act as if `root: true` is set.)
- The `files` option cannot be a single string anymore, it must be an array.
- The `sourceType` option now supports the new value `"commonjs"` (`.eslintrc` supports it too, but it was never documented).

## TypeScript Types for Flat Config Files

You can see the TypeScript types for the flat config file format in the `lib/types` source folder on GitHub. The interface for the objects in the config’s array is called `Linter.Config`.

You can view the type definitions in `lib/types/index.d.ts`.

## Visual Studio Code Support

ESLint v9.x support was added in the `vscode-eslint` v3.0.10.

In versions of `vscode-eslint` prior to v3.0.10, the new configuration system is not enabled by default. To enable support for the new configuration files, edit your `.vscode/settings.json` file and add the following:

```json
{
	// required in vscode-eslint < v3.0.10 only
	"eslint.experimental.useFlatConfig": true
}
```

In a future version of the ESLint plugin, you will no longer need to enable this manually.

## Further Reading

- Overview of the flat config file format blog post
- API usage of new configuration system blog post
- Background to new configuration system blog post
