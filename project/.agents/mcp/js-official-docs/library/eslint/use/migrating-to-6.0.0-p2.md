---
title: "Migrating to v6.0.0 (part 2 of 2)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/migrating-to-6.0.0.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Migrating to v6.0.0 (part 2 of 2)

##  Plugin authors may need to update installation instructions

If you maintain a plugin and provide installation instructions, you should ensure that the installation instructions are up to date with the user-facing changes to how plugins are loaded. In particular, if your plugin was generated with the `generator-eslint` package, it likely contains outdated instructions for how to use the plugin with global ESLint installations.

**Related issue(s):** eslint/rfcs#7

##  `RuleTester` now validates against invalid `default` keywords in rule schemas

In some cases, rule schemas can use the `default` keyword to automatically specify default values for rule options. However, the `default` keyword is only effective in certain schema locations, and is ignored elsewhere, which creates a risk of bugs if a rule incorrectly expects a default value to be provided as a rule option. In ESLint v6.0.0, `RuleTester` will raise an error if a rule has an invalid `default` keyword in its schema.

**To address:** If `RuleTester` starts reporting an error about an invalid default, you can remove the `default` property at the indicated location in your rule schema, and the rule will behave the same way. (If this happens, you might also want to verify that the rule behaves correctly when no option value is provided in that location.)

**Related issue(s):** eslint/eslint#11473

##  `RuleTester` now requires an absolute path on `parser` option

To use custom parsers in tests, we could use `parser` property with a package name or file path. However, if a package name was given, it's unclear where the tester should load the parser package from because the tester doesn't know which files are running the tester. In ESLint v6.0.0, `RuleTester` disallows `parser` property with a package name.

**To address:** If you use `parser` property with package names in test cases, update it with `require.resolve()` function to resolve the package name to the absolute path to the package.

**Related issue(s):** eslint/eslint#11728, eslint/eslint#10125, eslint/rfcs#7

##  The `eslintExplicitGlobalComment` scope analysis property has been removed

Previously, ESLint would add an `eslintExplicitGlobalComment` property to `Variable` objects in scope analysis to indicate that a variable was introduced as a result of a `/* global */` comment. This property was undocumented, and the ESLint team was unable to find any usage of the property outside of ESLint core. The property has been removed in ESLint v6, and replaced with the `eslintExplicitGlobalComments` property, which can contain a list of all `/* global */` comments if a variable was declared with more than one of them.

**To address:** If you maintain a rule that uses the `eslintExplicitGlobalComment` property, update it to use the `eslintExplicitGlobalComments` property as a list instead.

**Related issue(s):** eslint/rfcs#17

---

##  `Linter` no longer tries to load missing parsers from the filesystem

Previously, when linting code with a parser that had not been previously defined, the `Linter` API would attempt to load the parser from the filesystem. However, this behavior was confusing because `Linter` never access the filesystem in any other cases, and it was difficult to ensure that the correct parser would be found when loading the parser from the filesystem.

In ESLint v6, `Linter` will no longer perform any filesystem operations, including loading parsers.

**To address:** If you're using `Linter` with a custom parser, use `Linter#defineParser` to explicitly define the parser before linting any code.

**Related issue(s):** eslint/rfcs#7
