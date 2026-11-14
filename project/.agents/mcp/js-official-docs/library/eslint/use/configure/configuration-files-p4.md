---
title: "Configuration Files (part 4 of 4)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/configure/configuration-files.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Configuration Files (part 4 of 4)

### Configure Linter Options

Options specific to the linting process can be configured using the `linterOptions` object. These effect how linting proceeds and does not affect how the source code of the file is interpreted.

#### Disable Inline Configuration

Inline configuration is implemented using an `/*eslint*/` comment, such as `/*eslint semi: error*/`. You can disallow inline configuration by setting `noInlineConfig` to `true`. When enabled, all inline configuration is ignored. Here's an example:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		linterOptions: {
			noInlineConfig: true,
		},
	},
]);
```

#### Report Unused Disable Directives

Disable and enable directives such as `/*eslint-disable*/`, `/*eslint-enable*/` and `/*eslint-disable-next-line*/` are used to disable ESLint rules around certain portions of code. As code changes, it's possible for these directives to no longer be needed because the code has changed in such a way that the rule is no longer triggered. You can enable reporting of these unused disable directives by setting the `reportUnusedDisableDirectives` option to a severity string, as in this example:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		linterOptions: {
			reportUnusedDisableDirectives: "error",
		},
	},
]);
```

This setting defaults to `"warn"`.

You can override this setting using the `--report-unused-disable-directives` or the `--report-unused-disable-directives-severity` command line options.

For legacy compatibility, `true` is equivalent to `"warn"` and `false` is equivalent to `"off"`.

#### Report Unused Inline Configs

Inline config comments such as `/* eslint rule-name: "error" */` are used to change ESLint rule severity and/or options around certain portions of code.
As a project's ESLint configuration file changes, it's possible for these directives to no longer be different from what was already set.
You can enable reporting of these unused inline config comments by setting the `reportUnusedInlineConfigs` option to a severity string, as in this example:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		linterOptions: {
			reportUnusedInlineConfigs: "error",
		},
	},
]);
```

You can override this setting using the `--report-unused-inline-configs` command line option.

### Configure Rules

You can configure any number of rules in a configuration object by adding a `rules` property containing an object with your rule configurations. The names in this object are the names of the rules and the values are the configurations for each of those rules. Here's an example:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		rules: {
			semi: "error",
		},
	},
]);
```

This configuration object specifies that the `semi` rule should be enabled with a severity of `"error"`. You can also provide options to a rule by specifying an array where the first item is the severity and each item after that is an option for the rule. For example, you can switch the `semi` rule to disallow semicolons by passing `"never"` as an option:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		rules: {
			semi: ["error", "never"],
		},
	},
]);
```

Each rule specifies its own options and can be any valid JSON data type. Please check the documentation for the rule you want to configure for more information about its available options.

For more information on configuring rules, see Configure Rules.

### Configure Shared Settings

ESLint supports adding shared settings into configuration files. When you add a `settings` object to a configuration object, it is supplied to every rule. By convention, plugins namespace the settings they are interested in to avoid collisions with others. Plugins can use `settings` to specify the information that should be shared across all of their rules. This may be useful if you are adding custom rules and want them to have access to the same information. Here's an example:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		settings: {
			sharedData: "Hello",
		},
		plugins: {
			customPlugin: {
				rules: {
					"my-rule": {
						meta: {
							// custom rule's meta information
						},
						create(context) {
							const sharedData = context.settings.sharedData;
							return {
								// code
							};
						},
					},
				},
			},
		},
		rules: {
			"customPlugin/my-rule": "error",
		},
	},
]);
```

### Extending Configurations

A configuration object uses `extends` to inherit all the traits of another configuration object or array (including rules, plugins, and language options) and can then modify all the options. The `extends` key is an array of values indicating which configurations to extend from. The elements of the `extends` array can be one of three values:

- a string that specifies the name of a configuration in a plugin
- a configuration object
- a configuration array

#### Use Configurations from Plugins

ESLint plugins can export predefined configurations. These configurations are referenced using a string and follow the pattern `pluginName/configName`. The plugin must be specified in the `plugins` key first. Here's an example:

```js
// eslint.config.js
import examplePlugin from "eslint-plugin-example";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: {
			example: examplePlugin,
		},
		extends: ["example/recommended"],
	},
]);
```

In this example, the configuration named `recommended` from `eslint-plugin-example` is loaded. The plugin configurations can also be referenced by name inside of the configuration array.

You can also insert plugin configurations directly into the `extends` array. For example:

```js
// eslint.config.js
import pluginExample from "eslint-plugin-example";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: {
			example: pluginExample,
		},
		extends: [pluginExample.configs.recommended],
	},
]);
```

In this case, the configuration named `recommended` from `eslint-plugin-example` is accessed directly through the plugin object's `configs` property.

**Important:**
It's recommended to always use a `files` key when you use the `extends` key to ensure that your configuration applies to the correct files. By omitting the `files` key, the extended configuration may end up applied to all files.

#### Use Predefined Configurations

ESLint has two predefined configurations for JavaScript:

- `js/recommended` - enables the rules that ESLint recommends everyone use to avoid potential errors.
- `js/all` - enables all of the rules shipped with ESLint. This configuration is **not recommended** for production use because it changes with every minor and major version of ESLint. Use at your own risk.

To include these predefined configurations, install the `@eslint/js` package and then make any modifications to other properties in subsequent configuration objects:

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

Here, the `js/recommended` predefined configuration is applied first and then another configuration object adds the desired configuration for `no-unused-vars`.

For more information on how to combine predefined configs with your preferences, please see Combine Configs.

#### Use a Shareable Configuration Package

A sharable configuration is an npm package that exports a configuration object or array. This package should be installed as a dependency in your project and then referenced from inside of your `eslint.config.js` file. For example, to use a shareable configuration named `eslint-config-example`, your configuration file would look like this:

```js
// eslint.config.js
import exampleConfig from "eslint-config-example";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		extends: [exampleConfig],
		rules: {
			"no-unused-vars": "warn",
		},
	},
]);
```

In this example, `exampleConfig` can be either an object or an array, and either way it can be inserted directly into the `extends` array.

For more information on how to combine shareable configs with your preferences, please see Combine Configs.

### When to Use Extends vs Cascading

When to use `Extends`:

- **For reusing configurations** - When you want to inherit and build upon existing configurations from plugins, shareable packages, or predefined configs.
- **For plugin configuration** - When applying recommended or specific configurations from ESLint plugins (e.g., `example/recommended`).
- **For shareable configurations** - When using npm packages that export configuration objects (e.g., `eslint-config-example`).
- **For predefined configurations** - When using ESLint's built-in configurations like `js/recommended` or `js/all`.
- **For modular configuration** - When you want to compose multiple configuration sources into a single configuration object.
- **For maintaining consistency** - When you want to ensure consistent base rules across multiple configuration objects.
- **For plugin integration** - When you need to apply configurations that come bundled with plugins.

When to use `Cascading`:

- **For file-specific rule** - When you need different rules for different file patterns or directories.
- **For progressive configuration** - When you want to apply base rules to all files and then add/override rules for specific subsets.
- **For environment-specific settings** - When test files, source files, and config files need different rule sets.
- **For directory-based configuration** - When different project directories require different linting approaches.
- **For rule severity adjustment** - When you want to change rule severity (`error`/`warn`/`off`) for specific file patterns.
- **For language option variations** - When different files need different ECMAScript versions or parser options.

### Configuration Naming Conventions

The `name` property is optional, but it is recommended to provide a name for each configuration object, especially when you are creating shared configurations. The name is used in error messages and the config inspector to help identify which configuration object is being used.

The name should be descriptive of the configuration object's purpose and scoped with the configuration name or plugin name using `/` as a separator. ESLint does not enforce the names to be unique at runtime, but it is recommended that unique names be set to avoid confusion.

For example, if you are creating a configuration object for a plugin named `eslint-plugin-example`, you might add `name` to the configuration objects with the `example/` prefix:

```js
export default {
	configs: {
		recommended: {
			name: "example/recommended",
			rules: {
				"no-unused-vars": "warn",
			},
		},
		strict: {
			name: "example/strict",
			rules: {
				"no-unused-vars": "error",
			},
		},
	},
};
```

When exposing arrays of configuration objects, the `name` may have extra scoping levels to help identify the configuration object. For example:

```js
export default {
	configs: {
		strict: [
			{
				name: "example/strict/language-setup",
				languageOptions: {
					ecmaVersion: 2024,
				},
			},
			{
				name: "example/strict/sub-config",
				files: ["src/**/*.js"],
				rules: {
					"no-unused-vars": "error",
				},
			},
		],
	},
};
```

## Configuration File Resolution

When ESLint is run on the command line, it determines configuration for each target file by first looking in the directory that contains the file and then searching up ancestor directories until it finds an `eslint.config.*` file. This behavior improves support for monorepos, where subdirectories can have their own configuration files.

You can prevent this search by using the `-c` or `--config` option on the command line to specify an alternate configuration file, such as:

{{ npx_tabs({
    package: "eslint",
    args: ["--config", "some-other-file.js", "**/*.js"]
}) }}

In this case, ESLint does not search for configuration files and instead uses `some-other-file.js`.

## TypeScript Configuration Files

For Deno and Bun, TypeScript configuration files are natively supported; for Node.js, you must install the optional dev dependency `jiti` in version 2.2.0 or later in your project (this dependency is not automatically installed by ESLint):

{{ npm_tabs({
    command: "install",
    packages: ["jiti"],
    args: ["--save-dev"]
}) }}

You can then create a configuration file with a `.ts`, `.mts`, or `.cts` extension, and export an array of configuration objects.

**Important:**
ESLint does not perform type checking on your configuration file and does not apply any settings from `tsconfig.json`.

### Native TypeScript Support

If you're using **Node.js >= 22.13.0**, you can load TypeScript configuration files natively without requiring `jiti`. This is possible thanks to the **`--experimental-strip-types`** flag.

Since this feature is still experimental, you must also enable the `unstable_native_nodejs_ts_config` flag.

```bash
npx --node-options='--experimental-strip-types' eslint --flag unstable_native_nodejs_ts_config
```

### Configuration File Precedence

If you have multiple ESLint configuration files, ESLint prioritizes JavaScript files over TypeScript files. The order of precedence is as follows:

1. `eslint.config.js`
2. `eslint.config.mjs`
3. `eslint.config.cjs`
4. `eslint.config.ts`
5. `eslint.config.mts`
6. `eslint.config.cts`

To override this behavior, use the `--config` or `-c` command line option to specify a different configuration file:

{{ npx_tabs({
    package: "eslint",
    args: ["--config", "eslint.config.ts"]
}) }}
