---
title: "Migrate to v10.x (part 1 of 2)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/migrate-to-10.0.0.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

ESLint v10.0.0 is a major release of ESLint, and as such, has several breaking changes that you need to be aware of. This guide is intended to walk you through the breaking changes.

To help with this migration, ESLint provides migration codemods to automate many of the changes described in this guide. All official ESLint codemods are available in the eslint/codemods repository and through the Codemod Registry.

## Use migration codemods

The `@eslint/v9-to-v10` codemod upgrades ESLint projects from v9 to v10. It includes four individual codemods that can also be run independently:

- `@eslint/v9-to-v10-config`: Remove legacy env vars and CLI flags
- `@eslint/v9-to-v10-custom-rules`: Replace removed `context` and `SourceCode` methods
- `@eslint/v9-to-v10-ruletester`: Clean up `RuleTester` test cases
- `@eslint/v9-to-v10-linter-api`: Fix `Linter`/`ESLint` API usage

```shell
npx codemod @eslint/v9-to-v10
```

Learn more in the Codemod Registry.

Codemods are a starting point. Review the changes and consult the breaking changes below for anything the codemods do not cover.

The lists below are ordered roughly by the number of users each change is expected to affect, where the first items are expected to affect the most users.

## Table of Contents

### Breaking changes for users

- Node.js < v20.19, v21, v23 are no longer supported
- `eslint:recommended` has been updated
- New configuration file lookup algorithm
- Old config format no longer supported
- JSX references are now tracked
- `eslint-env` comments are reported as errors
- Jiti < v2.2.0 are no longer supported
- POSIX character classes in glob patterns
- `stylish` formatter now uses native `styleText` instead of `chalk`
- Deprecated options of the `radix` rule
- `no-shadow-restricted-names` now reports `globalThis` by default
- `func-names` schema is stricter
- `allowConstructorFlags` option of `no-invalid-regexp` now accepts only unique items
- `name` property added to ESLint core configs

### Breaking changes for plugin developers

- Node.js < v20.19, v21, v23 are no longer supported
- Old config format no longer supported
- JSX references are now tracked
- Removal of `type` property in errors of invalid `RuleTester` cases
- `Program` AST node range spans entire source text
- Fixer methods now require string `text` arguments
- New requirements for `ScopeManager` implementations
- Removal of deprecated `context` members
- Removal of deprecated `SourceCode` methods
- Prohibiting `errors` or `output` of valid RuleTester test cases
- POSIX character classes in glob patterns

### Breaking changes for integration developers

- Node.js < v20.19, v21, v23 are no longer supported
- New configuration file lookup algorithm
- Old config format no longer supported
- Removal of `nodeType` property in `LintMessage` objects
- POSIX character classes in glob patterns

---

##  Node.js < v20.19, v21, v23 are no longer supported

ESLint is officially dropping support for these versions of Node.js starting with ESLint v10.0.0. ESLint now supports the following versions of Node.js:

- Node.js v20.19.0 and above
- Node.js v22.13.0 and above
- Node.js v24 and above

**To address:** Make sure you upgrade to at least Node.js v20.19.0 when using ESLint v10.0.0. One important thing to double check is the Node.js version supported by your editor when using ESLint via editor integrations. If you are unable to upgrade, we recommend continuing to use ESLint v9 until you are able to upgrade Node.js.

**Related issue(s):** #19969

##  `eslint:recommended` has been updated

Three new rules have been enabled in `eslint:recommended`:

- `no-unassigned-vars`
- `no-useless-assignment`
- `preserve-caught-error`

**To address:** Fix errors or disable these rules.

**Related issue(s):** #19966

##  New configuration file lookup algorithm

In ESLint v9, the alternate config lookup behavior could be enabled with the `v10_config_lookup_from_file` feature flag. This behavior made ESLint locate `eslint.config.*` by starting from the directory of each linted file and searching up towards the filesystem root. In ESLint v10.0.0, this behavior is now the default and the `v10_config_lookup_from_file` flag has been removed. Attempting to use this flag will now result in an error.

**Codemod:** Use the @eslint/v9-to-v10-config codemod to remove legacy flags from your setup.

**To address:**

- Remove legacy flags manually:
    - CLI: remove `--flag v10_config_lookup_from_file`.
    - Environment: remove `v10_config_lookup_from_file` from `ESLINT_FLAGS`.
    - API: remove `"v10_config_lookup_from_file"` from the `flags` array passed to `new ESLint()` or `new Linter()`.
- If you relied on the previous (cwd-based) lookup behavior, provide an explicit config path with `--config path/to/eslint.config.js`.

**Related issue(s):** RFC120, #19967

##  Old config format no longer supported

ESLint v9 introduced a new default configuration format based on the `eslint.config.js` file. The old format, which used `.eslintrc` or `.eslintrc.json`, could still be enabled in v9 by setting the `ESLINT_USE_FLAT_CONFIG` environment variable to `false`.

Starting with ESLint v10.0.0, the old configuration format is no longer supported.

**Codemod:** Use the @eslint/v9-to-v10 codemod to automate much of this migration. Use the @eslint/v9-to-v10-linter-api codemod to update deprecated `FlatESLint` and `LegacyESLint` usage.

**To address:**

- Or follow the instructions in the configuration migration guide.
- Be aware that the deprecated APIs `FlatESLint` and `LegacyESLint` have been removed. Always use `ESLint` instead.
- The `configType` option of the `Linter` class can no longer be set to `"eslintrc"`. Remove the option to use the new configuration format.

**Related issue(s):** #13481

##  JSX references are now tracked

ESLint v10.0.0 now tracks JSX references, enabling correct scope analysis of JSX elements.

Previously, ESLint did not track references created by JSX identifiers, which could lead to incorrect results from rules that rely on scope information. For example:

```jsx
import { Card } from "./card.jsx";

export function createCard(name) {
	return <Card name={name} />;
}
```

Prior to v10.0.0, ESLint did not recognize that `<Card>` is a reference to the imported `Card`, which could result in false positives such as reporting `Card` as "defined but never used" (`no-unused-vars`) or false negatives such as failing to report `Card` as undefined (`no-undef`) if the import is removed. Starting with v10.0.0, `<Card>` is treated as a normal reference to the variable in scope. This brings JSX handling in line with developer expectations and improves the linting experience for modern JavaScript applications using JSX.

**To address:**

- For users:
    - New linting reports may appear in files with JSX. Update your code accordingly or adjust rule configurations if needed.
    - Rules previously used to work around ESLint’s lack of JSX reference tracking (for example, `@eslint-react/jsx-uses-vars`) are no longer needed. Remove or disable them in your configuration.
- For plugin developers: Custom rules relying on scope analysis may now encounter `JSXIdentifier` references. Update rules to handle these correctly.

**Related issue(s):** #19495

##  `eslint-env` comments are reported as errors

In the now obsolete ESLint v8 configuration system, `/* eslint-env */` comments could be used to define globals for a file. The current configuration system does not support such comments, and starting with ESLint v10.0.0, they are reported as errors during linting.

```text
error: /* eslint-env */ comments are no longer supported at file.js:1:1:
> 1 | /* eslint-env node -- Used in Node.js */
    | ^
```

**To address:** Remove any `eslint-env` comments from your code. If you are still using the old configuration system and need help migrating, check the migration guide.

**Related issue(s):** #13481

##  Jiti < v2.2.0 are no longer supported

ESLint is officially dropping support for versions of `jiti` that are less than v2.2.0.

**To address:** If you've authored your config file in `TypeScript` and have `jiti` v2.1.2 or earlier installed, be sure to update it to at least `2.2.0` when using ESLint v10.0.0.

**Related issue(s):** #19765

##  POSIX character classes in glob patterns

ESLint v10.0.0 uses the latest version of minimatch, which supports POSIX character classes in bracket expressions. ESLint relies on minimatch to match file names against glob patterns, such as those defined in `files`, `ignores`, and `globalIgnores()` within a config, or passed via the CLI.

For example, to lint all `.js` files whose names begin with an uppercase letter, you can now run:

```shell
npx eslint "**/[[:upper:]]*.js"
```

Here, `[[:upper:]]` is a POSIX character class that matches uppercase letters in different alphabets.

**To address:** If any of the glob patterns in your configuration, CLI arguments, or Node.js API calls look like containing a POSIX character class, verify that they match files as intended.

**Related issue(s):** eslint/rewrite#66

##  `stylish` formatter now uses native `styleText` instead of `chalk`

Starting in ESLint v10.0.0, the built-in `stylish` formatter no longer depends on the third-party `chalk` library for colorized output. Instead, it now uses Node.js's native `styleText` API, which introduces two breaking changes regarding how colorized output is determined:

1. First, `styleText` checks more environment variables when determining whether to disable colorized output and follows Node.js's own rules for when to enable or disable colors. This means it respects a wider set of environment variables and terminal capabilities than ESLint's previous `chalk`-based logic. For example:
    - `NO_COLOR` now disables colors consistently across tools that honor this convention.
    - `NODE_DISABLE_COLORS` is also respected, aligning ESLint's behavior with Node.js itself.

    Please note that the `FORCE_COLOR` environment variable is still supported to force-enable colors.

2. Second, `--color` and `--no-color` CLI flags now have higher precedence than environment variables when determining whether to use colorized output. This change ensures that explicit user preferences via CLI flags are prioritized. However, if neither flag is provided, environment variables will be considered as before.

**To address:**

- Review any environment configuration related to terminal colors (for example, CI defaults or shell profiles). If ESLint's output appears uncolored after upgrading to v10.0.0, check whether `NO_COLOR` or `NODE_DISABLE_COLORS` (or similar settings) are being set in your environment.
- If you rely on mixed approaches (for example, using `--color` flag but also setting `NO_COLOR` environment variable), be aware that the CLI flags now take precedence and adjust your setup accordingly.

**Related issue(s):** #20012

##  Deprecated options of the `radix` rule

As of ESLint v10.0.0, string options `"always"` and `"as-needed"` of the `radix` rule are deprecated. Setting either of these options doesn't change the behavior of this rule, which now always enforces providing a radix, as it was the case when the `"always"` option (default) was specified. Since the default radix depends on the first argument of `parseInt()`, this rule assumes that the second argument (the radix) is always needed.

The default behavior of this rule has not been changed.

**To address:**

- If you are using this rule without any options specified, there is no action required.
- If you are using this rule with the `"always"` option explicitly specified, remove the option. The behavior of this rule will remain the same.
- If you are using this rule with the `"as-needed"` option, remove the option and update your code to always provide the second argument to the `parseInt()` function. Alternatively, you can disable this rule.

**Related issue(s):** #19916

##  `no-shadow-restricted-names` now reports `globalThis` by default

In ESLint v10.0.0, the `no-shadow-restricted-names` rule now treats `globalThis` as a restricted name by default. Consequently, the `reportGlobalThis` option now defaults to `true` (previously `false`). As a result, declarations such as `const globalThis = "foo";` or `function globalThis() {}` will now be reported by default.

**To address:**

- Rename local identifiers named `globalThis` to avoid shadowing the global.
- Or restore the previous behavior by configuring the rule explicitly:

```json
{
	"rules": {
		"no-shadow-restricted-names": ["error", { "reportGlobalThis": false }]
	}
}
```

**Related issue(s):** #19673

##  `func-names` schema is stricter

In ESLint v10.0.0, the `func-names` rule schema now disallows extra items in the options array. Previously, configurations that included additional array elements beyond the allowed options were accepted but ignored. Such configurations are now considered invalid.

For example, this configuration is now invalid due to the extra element `"foo"`:

```js
/*eslint func-names: ["error", "always", { "generators": "never" }, "foo"]*/
```

**To address:**

- Remove any extra array elements from your `func-names` configuration so that it contains only:
    - a base string option: `"always" | "as-needed" | "never"`, and
    - optionally, an object option: `{ "generators": "always" | "as-needed" | "never" }`.

**Related issue(s):** #20134

##  `allowConstructorFlags` option of `no-invalid-regexp` now accepts only unique items

In ESLint v10.0.0, the `allowConstructorFlags` option of `no-invalid-regexp` no longer accepts duplicate flags as input. Previously, configurations with duplicate flags in the array were accepted but treated the same as having unique flags. Such configurations are now considered invalid and will result in a configuration error.

For example, this configuration is now invalid due to the duplicate `"u"` flag:

```js
/*eslint no-invalid-regexp: ["error", { "allowConstructorFlags": ["u", "y", "u"] }]*/
```

**To address:** Remove any duplicate flags from your `allowConstructorFlags` array configuration of `no-invalid-regexp` rule. Each flag should appear only once in the array.

**Related issue(s):** #18755

##  `name` property added to ESLint core configs

In ESLint v10.0.0, the `name` property has been restored to the ESLint core configs exported from `@eslint/js`. This property was previously removed due to incompatibility with the legacy eslintrc configuration system. Now that eslintrc is no longer supported, the `name` property has been added back.

This change should not require any action for most users. However, if you are using `@eslint/js` v10.x with the `FlatCompat` utility from `@eslint/eslintrc`, you should upgrade `@eslint/eslintrc` to the latest version to ensure compatibility.

**To address:** Upgrade `@eslint/eslintrc` to the latest version if you are using `FlatCompat`.

**Related issue(s):** #19864
