---
title: "Migrate to v9.x (part 1 of 3)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/migrate-to-9.0.0.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Migrate to v9.x

ESLint v9.0.0 is a major release of ESLint, and as such, has several breaking changes that you need to be aware of. This guide is intended to walk you through the breaking changes.

To help with this migration, ESLint provides codemods to automate many of the changes described in this guide. All official ESLint codemods are available in the eslint/codemods repository and through the Codemod Registry.

## Use migration codemods

### Migrate ESLint configuration

The `@eslint/v8-to-v9-config` codemod migrates ESLint v8 configuration files to the ESLint v9 flat config format. It updates config structure, rule schemas, plugins, ignores, and deprecated JSDoc rules while preserving existing behavior as much as possible. It also modifies `package.json` entries containing `eslintConfig`, `.eslintignore`/`.gitignore` files, `/* exported */` comments, and certain `/* eslint */` comments.

```shell
npx codemod @eslint/v8-to-v9-config
```

Learn more in the Codemod Registry.

### Migrate custom rules

If you maintain custom ESLint rules, the `@eslint/v8-to-v9-custom-rules` codemod converts function-style rules to the object format and updates deprecated rule APIs to their ESLint v9-compatible equivalents.

**Warning:**
The workflow runs on `**/*.js`, `**/*.mjs`, `**/*.cjs`, `**/*.jsx`, `**/*.ts`, `**/*.mts`, `**/*.cts`, and `**/*.tsx`. Run it only against rule files or directories, since it may incorrectly transform non-rule JavaScript files.

```shell
npx codemod @eslint/v8-to-v9-custom-rules
```

Learn more in the Codemod Registry.

Codemods are a starting point. Review the changes and consult the breaking changes below for anything the codemods do not cover.

The lists below are ordered roughly by the number of users each change is expected to affect, where the first items are expected to affect the most users.

## Table of Contents

### Breaking changes for users

- Node.js < v18.18, v19 are no longer supported
- New default config format (`eslint.config.js`)
- Removed multiple formatters
- Removed `require-jsdoc` and `valid-jsdoc` rules
- `eslint:recommended` has been updated
- `--quiet` no longer runs rules set to `"warn"`
- `--output-file` now writes a file to disk even with an empty output
- Change in behavior when no patterns are passed to CLI
- `/* eslint */` comments with only severity now retain options from the config file
- Multiple `/* eslint */` comments for the same rule are now disallowed
- Stricter `/* exported */` parsing
- `no-constructor-return` and `no-sequences` rule schemas are stricter
- New checks in `no-implicit-coercion` by default
- Case-sensitive flags in `no-invalid-regexp`
- `varsIgnorePattern` option of `no-unused-vars` no longer applies to catch arguments
- `no-restricted-imports` now accepts multiple config entries with the same `name`
- `"eslint:recommended"` and `"eslint:all"` strings no longer accepted in flat config
- `no-inner-declarations` has a new default behavior with a new option
- `no-unused-vars` now defaults `caughtErrors` to `"all"`
- `no-useless-computed-key` flags unnecessary computed member names in classes by default
- `camelcase` allow option only accepts an array of strings

### Breaking changes for plugin developers

- Node.js < v18.18, v19 are no longer supported
- Removed multiple `context` methods
- Removed `sourceCode.getComments()`
- Removed `CodePath#currentSegments`
- Code paths are now precalculated
- Function-style rules are no longer supported
- `meta.schema` is required for rules with options
- `FlatRuleTester` is now `RuleTester`
- Stricter `RuleTester` checks

### Breaking changes for integration developers

- Node.js < v18.18, v19 are no longer supported
- `FlatESLint` is now `ESLint`
- `Linter` now expects flat config format

---

##  Node.js < v18.18, v19 are no longer supported

ESLint is officially dropping support for these versions of Node.js starting with ESLint v9.0.0. ESLint now supports the following versions of Node.js:

- Node.js v18.18.0 and above
- Node.js v20.9.0 and above
- Node.js v21 and above

**To address:** Make sure you upgrade to at least Node.js v18.18.0 when using ESLint v9.0.0. One important thing to double check is the Node.js version supported by your editor when using ESLint via editor integrations. If you are unable to upgrade, we recommend continuing to use ESLint v8.56.0 until you are able to upgrade Node.js.

**Related issue(s):** #17595

##  New default config format (`eslint.config.js`)

As announced in our blog post, in ESLint v9.0.0, `eslint.config.js` is the new default configuration format. The previous format, eslintrc, is now deprecated and will not automatically be searched for.

**Codemod:** Use the @eslint/v8-to-v9-config codemod to automate much of this migration.

**To address:** Update your configuration manually to the new format following the Configuration Migration Guide. In case you still need to use the deprecated eslintrc config format, set environment variable `ESLINT_USE_FLAT_CONFIG` to `false`.

**Related Issues(s):** #13481

##  Removed multiple formatters

ESLint v9.0.0 has removed the following formatters from the core:

| **Removed Formatter** | **Replacement npm Package**     |
| --------------------- | ------------------------------- |
| `checkstyle`          | `eslint-formatter-checkstyle`   |
| `compact`             | `eslint-formatter-compact`      |
| `jslint-xml`          | `eslint-formatter-jslint-xml`   |
| `junit`               | `eslint-formatter-junit`        |
| `tap`                 | `eslint-formatter-tap`          |
| `unix`                | `eslint-formatter-unix`         |
| `visualstudio`        | `eslint-formatter-visualstudio` |

**Codemod:** The @eslint/v8-to-v9-config codemod fully supports this change.

**To address:** If you are using any of these formatters via the `-f` command line flag, you'll need to install the respective package for the formatter.

**Related issue(s):** #17524

##  Removed `require-jsdoc` and `valid-jsdoc` rules

The `require-jsdoc` and `valid-jsdoc` rules have been removed in ESLint v9.0.0. These rules were initially deprecated in 2018.

**Codemod:** The @eslint/v8-to-v9-config codemod migrates deprecated JSDoc rules. When those rules are active in the configuration, it removes `require-jsdoc`/`valid-jsdoc`, adds `eslint-plugin-jsdoc` and `jsdoc({ config: 'flat/recommended' })`, and also removes file-level JSDoc ESLint comments.

**To address:** Use the replacement rules in `eslint-plugin-jsdoc` for equivalent linting.

**Related issue(s):** #15820

##  `eslint:recommended` has been updated

Four new rules have been enabled in `eslint:recommended`:

- `no-constant-binary-expression`
- `no-empty-static-block`
- `no-new-native-nonconstructor`
- `no-unused-private-class-members`

Additionally, the following rules have been removed from `eslint:recommended`:

- `no-extra-semi`
- `no-inner-declarations`
- `no-mixed-spaces-and-tabs`
- `no-new-symbol`

**Codemod:** The @eslint/v8-to-v9-config codemod partially covers this change. When your configuration extends `eslint:recommended`, it disables the four newly enabled recommended rules listed above (unless you already configure them explicitly) to preserve ESLint v8 lint behavior. It does not re-enable rules removed from the preset, fix new violations in source files, or change configs that use `@eslint/js` presets without a legacy `eslint:recommended` extend entry.

**To address:** Fix errors or disable these rules.

**Related issue(s):** #15576, #17446, #17596

##  `--quiet` no longer runs rules set to `"warn"`

Prior to ESLint v9.0.0, the `--quiet` CLI flag would run all rules set to either `"error"` or `"warn"` and then hide the results from rules set to `"warn"`. In ESLint v9.0.0, `--quiet` will prevent rules from being executed when set to `"warn"`. This can result in a performance improvement for configurations containing many rules set to `"warn"`.

If `--max-warnings` is used then `--quiet` will not suppress the execution of rules set to `"warn"` but the output of those rules will be suppressed.

**To address:** In most cases, this change is transparent. If, however, you are running a rule set to `"warn"` that makes changes to the data available to other rules (for example, if the rule uses `sourceCode.markVariableAsUsed()`), then this can result in a behavior change. In such a case, you'll need to either set the rule to `"error"` or stop using `--quiet`.

**Related issue(s):** #16450

##  `--output-file` now writes a file to disk even with an empty output

Prior to ESLint v9.0.0, the `--output-file` flag would skip writing a file to disk if the output was empty. However, in ESLint v9.0.0, `--output-file` now consistently writes a file to disk, even when the output is empty. This update ensures a more consistent and reliable behavior for `--output-file`.

**To address:** Review your usage of the `--output-file` flag, especially if your processes depend on the file's presence or absence based on output content. If necessary, update your scripts or configurations to accommodate this change.

**Related Issues(s):** #17660

##  Change in behavior when no patterns are passed to CLI

Prior to ESLint v9.0.0, running the ESLint CLI without any file or directory patterns would result in no files being linted and would exit with code 0. This was confusing because it wasn't clear that nothing had actually happened. In ESLint v9.0.0, this behavior has been updated:

- **Flat config.** If you are using flat config, you can run `npx eslint` or `eslint` (if globally installed) and ESLint will assume you want to lint the current directory. Effectively, passing no patterns is equivalent to passing `.`.
- **eslintrc.** If you are using the deprecated eslintrc config, you'll now receive an error when running the CLI without any patterns.

**To address:** In most cases, no change is necessary, and you may find some locations where you thought ESLint was running but it wasn't. If you'd like to keep the v8.x behavior, where passing no patterns results in ESLint exiting with code 0, add the `--pass-on-no-patterns` flag to the CLI call.

**Related issue(s):** #14308

##  `/* eslint */` comments with only severity now retain options from the config file

Prior to ESLint v9.0.0, configuration comments such as `/* eslint curly: "warn" */` or `/* eslint curly: ["warn"] */` would completely override any configuration specified for the rule in the config file, and thus enforce the default options of the rule.

In ESLint v9.0.0, the behavior of configuration comments is aligned with how rule configurations in config files are merged, meaning that a configuration comment with only severity now retains options specified in the config file and just overrides the severity.

For example, if you have the following config file:

```js
// eslint.config.js

export default [
	{
		rules: {
			curly: ["error", "multi"],
		},
	},
];
```

and the following configuration comment:

```js
// my-file.js

/* eslint curly: "warn" */
```

the resulting configuration for the `curly` rule when linting `my-file.js` will be `curly: ["warn", "multi"]`.

Note that this change only affects cases where the same rule is configured in the config file with options and using a configuration comment without options. In all other cases (e.g. the rule is only configured using a configuration comment), the behavior remains the same as prior to ESLint v9.0.0.

**To address:** We expect that in most cases no change is necessary, as rules configured using configuration comments are typically not already configured in the config file. However, if you need a configuration comment to completely override configuration from the config file and enforce the default options, you'll need to specify at least one option:

```js
// my-file.js

/* eslint curly: ["warn", "all"] */
```

**Related issue(s):** #17381

##  Multiple `/* eslint */` comments for the same rule are now disallowed

Prior to ESLint v9.0.0, if the file being linted contained multiple `/* eslint */` configuration comments for the same rule, the last one would be applied, while the others would be silently ignored. For example:

```js
/* eslint semi: ["error", "always"] */
/* eslint semi: ["error", "never"] */

foo(); // valid, because the configuration is "never"
```

In ESLint v9.0.0, the first one is applied, while the others are reported as lint errors:

```js
/* eslint semi: ["error", "always"] */
/* eslint semi: ["error", "never"] */ // error: Rule "semi" is already configured by another configuration comment in the preceding code. This configuration is ignored.

foo(); // error: Missing semicolon
```

**Codemod:** The @eslint/v8-to-v9-config codemod includes a `remove-unnecessary-eslint-comments` step that modifies these comments. It removes all ESLint config comments matching its regex except the first one, not just duplicates of the same rule.

**To address:** Remove duplicate `/* eslint */` comments.

**Related issue(s):** #18132

##  Stricter `/* exported */` parsing

Prior to ESLint v9.0.0, the `/* exported */` directive incorrectly allowed the following syntax:

```js
/* exported foo: true, bar: false */

// and

/* exported foo bar */
```

The `true` and `false` in this example had no effect on ESLint's behavior, and in fact, was a parsing bug.

In ESLint v9.0.0, any `/* exported */` variables followed by a colon and value will be ignored as invalid.

**Codemod:** The @eslint/v8-to-v9-config codemod rewrites both `/* exported foo: true, bar: false */` and the whitespace-separated form into a comma-separated format.

**To address:** Update any `/* exported */` directives to eliminate the colons and subsequent values, and ensure there are commas between variable names such as:

```js
/* exported foo, bar */
```

**Related issue(s):** #17622

##  `no-constructor-return` and `no-sequences` rule schemas are stricter

In previous versions of ESLint, `no-constructor-return` and `no-sequences` rules were mistakenly accepting invalid options.

This has been fixed in ESLint v9.0.0:

- The `no-constructor-return` rule does not accept any options.
- The `no-sequences` rule can take one option, an object with a property `"allowInParentheses"` (boolean).

```json
{
	"rules": {
		"no-constructor-return": ["error"],
		"no-sequences": ["error", { "allowInParentheses": false }]
	}
}
```

**Codemod:** The @eslint/v8-to-v9-config codemod may update your configuration for this.

**To address:** If ESLint still reports invalid configuration for any of these rules, update your configuration manually.

**Related issue(s):** #16879
