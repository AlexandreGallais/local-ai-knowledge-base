---
title: "Configuration Files (part 3 of 4)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/configure/configuration-files.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Configuration Files (part 3 of 4)

### Specify `files` and `ignores`

**Tip:**
Patterns specified in `files` and `ignores` use `minimatch` syntax and are evaluated relative to the location of the `eslint.config.js` file. If using an alternate config file via the `--config` command line option, then all patterns are evaluated relative to the current working directory. In case the configuration object has the `basePath` property with a relative path, the subdirectory it specifies is evaluated relative to the location of the `eslint.config.js` file (or relative to the current working directory if using an alternate config file via the `--config` command line option). In configuration objects with the `basePath` property, patterns specified in `files` and `ignores` are evaluated relative to the subdirectory represented by the `basePath`.

You can use a combination of `files` and `ignores` to determine which files the configuration object should apply to and which not. Here's an example:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	// matches all files ending with .js
	{
		files: ["**/*.js"],
		rules: {
			semi: "error",
		},
	},

	// matches all files ending with .js except those in __tests
	{
		files: ["**/*.js"],
		ignores: ["__tests/**"],
		rules: {
			"no-console": "error",
		},
	},
]);
```

Configuration objects without `files` or `ignores` are automatically applied to any file that is matched by any other configuration object. For example:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	// matches all files because it doesn't specify the `files` or `ignores` key
	{
		rules: {
			semi: "error",
		},
	},
]);
```

With this configuration, the `semi` rule is enabled for all files that match the default files in ESLint. So if you pass `example.js` to ESLint, the `semi` rule is applied. If you pass a non-JavaScript file, like `example.txt`, the `semi` rule is not applied because there are no other configuration objects that match that filename. (ESLint outputs an error message letting you know that the file was ignored due to missing configuration.)

**Important:**
By default, ESLint lints files that match the patterns `**/*.js`, `**/*.cjs`, and `**/*.mjs`. Those files are always matched unless you explicitly exclude them using global ignores.
If your configuration object includes other patterns, the rules in configuration objects without a `files` key will also apply to these patterns.

Therefore, when using ESLint for non-JS files as well, it is more appropriate to create a configuration object that includes `files: ["**/*.js", "**/*.cjs", "**/*.mjs"]` and place the relevant rules there.

#### Specify files with arbitrary extensions

To lint files with extensions other than the default `.js`, `.cjs` and `.mjs`, include them in `files` with a pattern in the format of `"**/*.extension"`. Any pattern will work except if it is `*` or if it ends with `/*` or `/**`.
For example, to lint TypeScript files with `.ts`, `.cts` and `.mts` extensions, you would specify a configuration object like this:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.ts", "**/*.cts", "**/*.mts"],
	},
	// ...other config
]);
```

#### Specify files without extension

Files without an extension can be matched with the pattern `!(*.*)`. For example:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/!(*.*)"],
	},
	// ...other config
]);
```

The above config lints files without extension besides the default `.js`, `.cjs` and `.mjs` extensions in all directories.
**Tip:**
Filenames starting with a dot, such as `.gitignore`, are considered to have only an extension without a base name. In the case of `.gitignore`, the extension is `gitignore`, so the file matches the pattern `"**/.gitignore"` but not `"**/*.gitignore"`.

#### Specify files with an AND operation

Multiple patterns can be matched against the same file by using an array of strings inside of the `files` array. For example:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: [["src/*", "**/*.js"]],
	},
	// ...other config
]);
```

The pattern `["src/*", "**/*.js"]` matches when a file is both inside of the `src` directory and also ends with `.js`. This approach can be helpful when you're dynamically calculating the value of the `files` array and want to avoid potential errors by trying to combine multiple glob patterns into a single string.

#### Exclude files with `ignores`

You can limit which files a configuration object applies to by specifying a combination of `files` and `ignores` patterns. For example, you may want certain rules to apply only to files in your `src` directory:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["src/**/*.js"],
		rules: {
			semi: "error",
		},
	},
]);
```

Here, only the JavaScript files in the `src` directory have the `semi` rule applied. If you run ESLint on files in another directory, this configuration object is skipped. By adding `ignores`, you can also remove some of the files in `src` from this configuration object:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["src/**/*.js"],
		ignores: ["**/*.config.js"],
		rules: {
			semi: "error",
		},
	},
]);
```

This configuration object matches all JavaScript files in the `src` directory except those that end with `.config.js`. You can also use negation patterns in `ignores` to exclude files from the ignore patterns, such as:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["src/**/*.js"],
		ignores: ["**/*.config.js", "!**/eslint.config.js"],
		rules: {
			semi: "error",
		},
	},
]);
```

Here, the configuration object excludes files ending with `.config.js` except for `eslint.config.js`. That file still has `semi` applied.

Non-global `ignores` patterns can only match file names. A pattern like `"dir-to-exclude/"` will not ignore anything. To ignore everything in a particular directory, a pattern like `"dir-to-exclude/**"` should be used instead.

If `ignores` is used without `files` and there are other keys (such as `rules`), then the configuration object applies to all linted files except the ones excluded by `ignores`, for example:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		ignores: ["**/*.config.js"],
		rules: {
			semi: "error",
		},
	},
]);
```

This configuration object applies to all JavaScript files except those ending with `.config.js`. Effectively, this is like having `files` set to `**/*`. In general, it's a good idea to always include `files` if you are specifying `ignores`.

Note that when `files` is not specified, negated `ignores` patterns do not cause any matching files to be linted automatically.
ESLint only lints files that are matched either by default or by a `files` pattern that is not `*` and does not end with `/*` or `/**`.

**Tip:**
Use the config inspector (`--inspect-config` in the CLI) to test which config objects apply to a specific file.

#### Globally ignore files with `ignores`

Depending on how the `ignores` property is used, it can behave as non-global `ignores` or as global `ignores`.

- When `ignores` is used without any other keys (besides `name`) in the configuration object, then the patterns act as global ignores. This means they apply to every configuration object (not only to the configuration object in which it is defined). Global `ignores` allows you not to have to copy and keep the `ignores` property synchronized in more than one configuration object.
- If `ignores` is used with other properties in the same configuration object, then the patterns act as non-global ignores. This way `ignores` applies only to the configuration object in which it is defined.

Global and non-global `ignores` have some usage differences:

- patterns in non-global `ignores` only match the files (`dir/filename.js`) or files within directories (`dir/**`)
- patterns in global `ignores` can match directories (`dir/`) in addition to the patterns that non-global ignores supports.

For all uses of `ignores`:

- The patterns you define are added after the default ESLint patterns, which are `["**/node_modules/", ".git/"]`.
- The patterns always match files and directories that begin with a dot, such as `.foo.js` or `.fixtures`, unless those files are explicitly ignored. The only dot directory ignored by default is `.git`.

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

// Example of global ignores
export default defineConfig([
    {
      ignores: [".config/", "dist/", "tsconfig.json"] // acts as global ignores, due to the absence of other properties
    },
    { ... }, // ... other configuration object, inherit global ignores
    { ... }, // ... other configuration object, inherit global ignores
]);

// Example of non-global ignores
export default defineConfig([
    {
      ignores: [".config/**", "dir1/script1.js"],
      rules: { ... } // the presence of this property dictates non-global ignores
    },
    {
      ignores: ["other-dir/**", "dist/script2.js"],
      rules: { ... } // the presence of this property dictates non-global ignores
    },
]);
```

To avoid confusion, use the `globalIgnores()` helper function to clearly indicate which ignores are meant to be global. Here's the previous example rewritten to use `globalIgnores()`:

```js
// eslint.config.js
import { defineConfig, globalIgnores } from "eslint/config";

// Example of global ignores
export default defineConfig([
    globalIgnores([".config/", "dist/", "tsconfig.json"]),
    { ... }, // ... other configuration object, inherit global ignores
    { ... }, // ... other configuration object, inherit global ignores
]);

// Example of non-global ignores
export default defineConfig([
    {
      ignores: [".config/**", "dir1/script1.js"],
      rules: { ... } // the presence of this property dictates non-global ignores
    },
    {
      ignores: ["other-dir/**", "dist/script2.js"],
      rules: { ... } // the presence of this property dictates non-global ignores
    },
]);
```

For more information and examples on configuring rules regarding `ignores`, see Ignore Files.

#### Specify base path

You can optionally specify `basePath` to apply the configuration object to a specific subdirectory (including its subdirectories).

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	// matches all files in tests and its subdirectories
	{
		basePath: "tests",
		rules: {
			"no-undef": "error",
		},
	},

	// matches all files ending with spec.js in tests and its subdirectories
	{
		basePath: "tests",
		files: ["**/*.spec.js"],
		languageOptions: {
			globals: {
				it: "readonly",
				describe: "readonly",
			},
		},
	},

	// globally ignores tests/fixtures directory
	{
		basePath: "tests",
		ignores: ["fixtures/"],
	},
]);
```

In combination with `extends`, multiple configuration objects can be applied to the same subdirectory by specifying `basePath` only once, like this:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		basePath: "tests",
		extends: [
			// matches all files in tests and its subdirectories
			{
				rules: {
					"no-undef": "error",
				},
			},

			// matches all files ending with spec.js in tests and its subdirectories
			{
				files: ["**/*.spec.js"],
				languageOptions: {
					globals: {
						it: "readonly",
						describe: "readonly",
					},
				},
			},

			// globally ignores tests/fixtures directory
			{
				ignores: ["fixtures/"],
			},
		],
	},
]);
```

#### Cascading Configuration Objects

When more than one configuration object matches a given filename, the configuration objects are merged with later objects overriding previous objects when there is a conflict. For example:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.js"],
		languageOptions: {
			globals: {
				MY_CUSTOM_GLOBAL: "readonly",
			},
		},
	},
	{
		files: ["tests/**/*.js"],
		languageOptions: {
			globals: {
				it: "readonly",
				describe: "readonly",
			},
		},
	},
]);
```

Using this configuration, all JavaScript files define a custom global object defined called `MY_CUSTOM_GLOBAL` while those JavaScript files in the `tests` directory have `it` and `describe` defined as global objects in addition to `MY_CUSTOM_GLOBAL`. For any JavaScript file in the `tests` directory, both configuration objects are applied, so `languageOptions.globals` are merged to create a final result.
