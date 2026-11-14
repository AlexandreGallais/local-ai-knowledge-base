---
title: "Migrating to v5.0.0 (part 2 of 2)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/migrating-to-5.0.0.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Migrating to v5.0.0 (part 2 of 2)

##  The `_linter` property on rule context objects has been removed

Previously, rule context objects had an undocumented `_linter` property, which was used internally within ESLint to process reports from rules. Some rules used this property to achieve functionality that was not intended to be possible for rules. For example, several plugins used the `_linter` property in a rule to monitor reports from other rules, for the purpose of checking for unused `/* eslint-disable */` directive comments. Although this functionality was useful for users, it could also cause stability problems for projects using ESLint. For example, an upgrade to a rule in one plugin could unexpectedly cause a rule in another plugin to start reporting errors.

The `_linter` property has been removed in ESLint v5.0, so it is no longer possible to implement rules with this functionality. However, the `--report-unused-disable-directives` CLI flag can be used to flag unused directive comments.

##  `RuleTester` now uses strict equality checks in its assertions

Previously, `RuleTester` used loose equality when making some of its assertions. For example, if a rule produced the string `"7"` as a result of autofixing, `RuleTester` would allow the number `7` in an `output` assertion, rather than the string `"7"`. In ESLint v5, comparisons from `RuleTester` use strict equality, so an assertion like this will no longer pass.

**To address:** If you use `RuleTester` to write tests for your custom rules, make sure the expected values in your assertions are strictly equal to the actual values.

##  Rules are now required to provide messages along with reports

Previously, it was possible for rules to report AST nodes without providing a report message. This was not intended behavior, and as a result the default formatter would crash if a rule omitted a message. However, it was possible to avoid a crash when using a non-default formatter, such as `json`.

In ESLint v5, reporting a problem without providing a message always results in an error.

**To address:** If you have written a custom rule that reports a problem without providing a message, update it to provide a message along with the report.

---

##  The `source` property is no longer available on individual linting messages

As announced in October 2016, the `source` property has been removed from individual lint message objects.

**To address:** If you have a formatter or integration which relies on using the `source` property on individual linting messages, you should update it to use the `source` property on file results objects instead.

##  Fatal errors now result in an exit code of 2

When using ESLint v4, both of the following scenarios resulted in an exit code of 1 when running ESLint on the command line:

- Linting completed successfully, but there are some linting errors
- Linting was unsuccessful due to a fatal error (e.g. an invalid config file)

As a result, it was difficult for an integration to distinguish between the two cases to determine whether it should try to extract linting results from the output.

In ESLint v5, an unsuccessful linting run due to a fatal error will result in an exit code of 2, rather than 1.

**To address:** If you have an integration that detects all problems with linting runs by checking whether the exit code is equal to 1, update it to check whether the exit code is nonzero instead.

##  The `eslint.linter` property is now non-enumerable

When using ESLint's Node.js API, the `linter` property is now non-enumerable. Note that the `linter` property was deprecated in ESLint v4 in favor of the `Linter` property.

**To address:** If you rely on enumerating all the properties of the `eslint` object, use something like `Object.getOwnPropertyNames` to ensure that non-enumerable keys are captured.
