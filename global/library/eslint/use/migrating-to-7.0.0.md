---
title: "Migrating to v7.0.0"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/migrating-to-7.0.0.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

ESLint v7.0.0 is a major release of ESLint. We have made a few breaking changes in this release. This guide is intended to walk you through the breaking changes.

The lists below are ordered roughly by the number of users each change is expected to affect, where the first items are expected to affect the most users.

## Table of Content

### Breaking changes for users

- Node.js 8 is no longer supported
- Lint files matched by `overrides[].files` by default
- The base path of `overrides` and `ignorePatterns` is changed if the config file is given by the `--config`/`--ignore-path` options
- The place where ESLint loads plugins from is changed
- Runtime deprecation warnings for `~/.eslintrc.*` config files
- Default ignore patterns have changed
- Description in directive comments
- Node.js/CommonJS rules are deprecated
- Several rules have been updated to cover more cases
- `eslint:recommended` has been updated

### Breaking changes for plugin developers

- Node.js 8 is no longer supported
- Lint files matched by `overrides[].files` by default
- Plugin resolution has been updated
- Additional validation added to the `RuleTester` class

### Breaking changes for integration developers

- Node.js 8 is no longer supported
- Plugin resolution has been updated
- The `CLIEngine` class has been deprecated

---

##  Node.js 8 is no longer supported

Node.js 8 reached EOL in December 2019, and we are officially dropping support for it in this release. ESLint now supports the following versions of Node.js:

- Node.js 10 (`10.12.0` and above)
- Node.js 12 and above

**To address:** Make sure you upgrade to at least Node.js `10.12.0` when using ESLint v7.0.0. One important thing to double check is the Node.js version supported by your editor when using ESLint via editor integrations. If you are unable to upgrade, we recommend continuing to use ESLint 6 until you are able to upgrade Node.js.

**Related issue(s):** RFC44, #12700

##  Lint files matched by `overrides[].files` by default

Previously to v7.0.0, ESLint would only lint files with a `.js` extension by default if you give directories like `eslint src`.

ESLint v7.0.0 will now additionally lint files with other extensions (`.ts`, `.vue`, etc.) if the extension is explicitly matched by an `overrides[].files` entry. This will allow for users to lint files that don't end with `*.js` to be linted without having to use the `--ext` command line flag, as well as allow shared configuration authors to enable linting of these files without additional overhead for the end user. Please note that patterns that end with `*` are exempt from this behavior and will behave as they did previously. For example, if the following config file is present,

```yml
# .eslintrc.yml
extends: my-config-js
overrides:
    - files: "*.ts"
      extends: my-config-ts
```

then running `eslint src` would check both `*.js` and `*.ts` files in the `src` directory.

**To address:** Using the `--ext` CLI option will override this new behavior. Run ESLint with `--ext .js` if you are using `overrides` but only want to lint files that have a `.js` extension.

If you maintain plugins that check files with extensions other than `.js`, this feature will allow you to check these files by default by configuring an `overrides` setting in your `recommended` preset.

**Related issue(s):** RFC20, #12677

##  The base path of `overrides` and `ignorePatterns` has changed when using the `--config`/`--ignore-path` options

Up until now, ESLint has resolved the following paths relative to the directory path of the _entry_ configuration file:

- Configuration files (`.eslintrc.*`)
    - relative paths in the `overrides[].files` setting
    - relative paths in the `overrides[].excludedFiles` setting
    - paths which start with `/` in the `ignorePatterns` setting
- Ignore files (`.eslintignore`)
    - paths which start with `/`

Starting in ESLint v7.0.0, configuration files and ignore files passed to ESLint using the `--config path/to/a-config` and `--ignore-path path/to/a-ignore` CLI flags, respectively, will resolve from the current working directory rather than the file location. This allows for users to utilize shared plugins without having to install them directly in their project.

**To address:** Update the affected paths if you are using a configuration or ignore file via the `--config` or `--ignore-path` CLI options.

**Related issue(s):** RFC37, #12887

##  Plugin resolution has been updated

In previous versions, ESLint resolved all plugins from the current working directory by default.

Starting in ESLint v7.0.0, `plugins` are resolved relative to the directory path of the _entry_ configuration file.

This will not change anything in most cases. If a configuration file in a subdirectory has `plugins` defined, the plugins will be loaded from the subdirectory (or ancestor directories that include the current working directory if not found).

This means that if you are using a config file from a shared location via `--config` option, the plugins that the config file declare will be loaded from the shared config file location.

**To address:** Ensure that plugins are installed in a place that can be resolved relative to your configuration file or use `--resolve-plugins-relative-to .` to override this change.

**Related issue(s):** RFC47, #12922

##  Runtime deprecation warnings for `~/.eslintrc.*` config files

Personal config files have been deprecated since v6.7.0. ESLint v7.0.0 will start printing runtime deprecation warnings. It will print a warning for the following situations:

1. When a project does not have a configuration file present and ESLint loads configuration from `~/.eslintrc.*`.
1. When a project has a configuration file and ESLint ignored a `~/.eslintrc.*` configuration file. This occurs when the `$HOME` directory is an ancestor directory of the project and the project's configuration files doesn't contain `root:true`.

**To address:** Remove `~/.eslintrc.*` configuration files and add an `.eslintrc.*` configuration file to your project. Alternatively, use the `--config` option to use shared config files.

**Related issue(s):** RFC32, #12678

##  Default ignore patterns have changed

Up until now, ESLint has ignored the following files by default:

- Dotfiles (`.*`)
- `node_modules` in the current working directory (`/node_modules/*`)
- `bower_components` in the current working directory (`/bower_components/*`)

ESLint v7.0.0 ignores `node_modules/*` of subdirectories as well, but no longer ignores `bower_components/*` and `.eslintrc.js`. Therefore, the new default ignore patterns are:

- Dotfiles except `.eslintrc.*` (`.*` but not `.eslintrc.*`)
- `node_modules` (`/**/node_modules/*`)

**To address:** Modify your `.eslintignore` or the `ignorePatterns` property of your config file if you don't want to lint `bower_components/*` and `.eslintrc.js`.

**Related issue(s):** RFC51, #12888

##  Descriptions in directive comments

In older version of ESLint, there was no convenient way to indicate why a directive comment – such as `/*eslint-disable*/` – was necessary.

To allow for the colocation of comments that provide context with the directive, ESLint v7.0.0 adds the ability to append arbitrary text in directive comments by ignoring text following `--` surrounded by whitespace. For example:

```js
// eslint-disable-next-line a-rule, another-rule -- those are buggy!!
```

**To address:** If you have `--` surrounded by whitespace in directive comments, consider moving it into your configuration file.

**Related issue(s):** RFC33, #12699

##  Node.js/CommonJS rules have been deprecated

The ten Node.js/CommonJS rules in core have been deprecated and moved to the eslint-plugin-node plugin (for ESLint v8.0.0 and later, use the maintained eslint-plugin-n fork instead) .

**To address:** As per our deprecation policy, the deprecated rules will remain in core for the foreseeable future and are still available for use. However, we will no longer be updating or fixing any bugs in those rules. To use a supported version of the rules, we recommend using the corresponding rules in the plugin instead.

| Deprecated Rules                                        | Replacement                                                                                                                     |
| :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------ |
| callback-return             | node/callback-return             |
| global-require               | node/global-require               |
| handle-callback-err     | node/handle-callback-err     |
| no-mixed-requires         | node/no-mixed-requires         |
| no-new-require               | node/no-new-require               |
| no-path-concat               | node/no-path-concat               |
| no-process-env               | node/no-process-env               |
| no-process-exit             | node/no-process-exit             |
| no-restricted-modules | node/no-restricted-require |
| no-sync                             | node/no-sync                             |

**Related issue(s):** #12898

##  Several rules have been updated to cover more cases

Several rules have been enhanced and now report additional errors:

- accessor-pairs rule now recognizes class members by default.
- array-callback-return rule now recognizes `flatMap` method.
- computed-property-spacing rule now recognizes class members by default.
- func-names rule now recognizes function declarations in default exports.
- no-extra-parens rule now recognizes parentheses in assignment targets.
- no-dupe-class-members rule now recognizes computed keys for static class members.
- no-magic-numbers rule now recognizes bigint literals.
- radix rule now recognizes invalid numbers for the second parameter of `parseInt()`.
- use-isnan rule now recognizes class members by default.
- yoda rule now recognizes bigint literals.

**To address:** Fix errors or disable these rules.

**Related issue(s):** #12490, #12608, #12670, #12701, #12765, #12837, #12913, #12915, #12919

##  `eslint:recommended` has been updated

Three new rules have been enabled in the `eslint:recommended` preset.

- no-dupe-else-if
- no-import-assign
- no-setter-return

**To address:** Fix errors or disable these rules.

**Related issue(s):** #12920

##  Additional validation added to the `RuleTester` class

The `RuleTester` now validates the following:

- It fails test cases if the rule under test uses the non-standard `node.start` or `node.end` properties. Rules should use `node.range` instead.
- It fails test cases if the rule under test provides an autofix but a test case doesn't have an `output` property. Add an `output` property to test cases to test the rule's autofix functionality.
- It fails test cases if any unknown properties are found in the objects in the `errors` property.

**To address:** Modify your rule or test case if existing test cases fail.

**Related issue(s):** RFC25, #12096, #12955

##  The `CLIEngine` class has been deprecated

The `CLIEngine` class has been deprecated and replaced by the new `ESLint` class.

The `CLIEngine` class provides a synchronous API that is blocking the implementation of features such as parallel linting, supporting ES modules in shareable configs/parsers/plugins/formatters, and adding the ability to visually display the progress of linting runs. The new `ESLint` class provides an asynchronous API that ESLint core will now using going forward. `CLIEngine` will remain in core for the foreseeable future but may be removed in a future major version.

**To address:** Update your code to use the new `ESLint` class if you are currently using `CLIEngine`. The following table maps the existing `CLIEngine` methods to their `ESLint` counterparts:

| `CLIEngine`                                  | `ESLint`                           |
| :------------------------------------------- | :--------------------------------- |
| `executeOnFiles(patterns)`                   | `lintFiles(patterns)`              |
| `executeOnText(text, filePath, warnIgnored)` | `lintText(text, options)`          |
| `getFormatter(name)`                         | `loadFormatter(name)`              |
| `getConfigForFile(filePath)`                 | `calculateConfigForFile(filePath)` |
| `isPathIgnored(filePath)`                    | `isPathIgnored(filePath)`          |
| `static outputFixes(results)`                | `static outputFixes(results)`      |
| `static getErrorResults(results)`            | `static getErrorResults(results)`  |
| `static getFormatter(name)`                  | (removed ※1)                       |
| `addPlugin(pluginId, definition)`            | the `plugins` constructor option   |
| `getRules()`                                 | (not implemented yet)              |
| `resolveFileGlobPatterns()`                  | (removed ※2)                       |

- ※1 The `engine.getFormatter()` method currently returns the object of loaded packages as-is, which made it difficult to add new features to formatters for backward compatibility reasons. The new `eslint.loadFormatter()` method returns an adapter object that wraps the object of loaded packages, to ease the process of adding new features. Additionally, the adapter object has access to the `ESLint` instance to calculate default data (using loaded plugin rules to make `rulesMeta`, for example). As a result, the `ESLint` class only implements an instance version of the `loadFormatter()` method.
- ※2 Since ESLint 6, ESLint uses different logic from the `resolveFileGlobPatterns()` method to iterate files, making this method obsolete.

**Related issue(s):** RFC40, #12939
