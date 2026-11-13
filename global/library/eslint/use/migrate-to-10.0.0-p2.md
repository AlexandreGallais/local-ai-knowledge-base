---
title: "Migrate to v10.x (part 2 of 2)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/migrate-to-10.0.0.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Migrate to v10.x (part 2 of 2)

##  Removal of `type` property in errors of invalid `RuleTester` cases

In ESLint v10.0.0, the deprecated `type` property in errors of invalid test cases for rules has been removed. Using the `type` property in test cases now throws an error.

**Codemod:** Use the @eslint/v9-to-v10-ruletester codemod to automate this change.

**To address:** Remove the `type` property from error objects in invalid test cases manually.

**Related issue(s):** #19029

##  `Program` AST node range spans entire source text

ESLint v10.0.0 changes how the `Program` AST node’s range is calculated: it now spans the entire source text, including any leading and trailing comments and whitespace.

Previously, the `Program` node’s range excluded leading and trailing comments/whitespace, which could be unintuitive. For example:

```js
// Leading comment
const x = 1;
// Trailing comment
```

In ESLint v9 and earlier, `Program.range` covers only `const x = 1;` (excludes surrounding comments/whitespace).

Starting with ESLint v10.0.0, `Program.range` covers the entire source text, including the leading and trailing comments/whitespace.

**To address:**

- For rule and plugin authors: If your code depends on the previous `Program.range` behavior, or on `SourceCode` methods that assume it (such as `sourceCode.getCommentsBefore(programNode)` to retrieve all leading comments), update your logic. If your code reports on the `Program` node, update your logic to report on the first statement within the `Program` node, i.e. `node.body[0] ?? node`, to ensure the directive `/* eslint-disable your-rule */` can still work.
- For custom parsers: Set `Program.range` to cover the full source text (typically `[0, code.length]`).

**Related issue(s):** eslint/js#648

##  Fixer methods now require string `text` arguments

In ESLint v10.0.0, all rule fixer methods that accept a `text` argument now require that it be a string. Providing a non-string value will throw a `TypeError`.

Affected methods:

- `insertTextBefore(nodeOrToken, text)`
- `insertTextBeforeRange(range, text)`
- `insertTextAfter(nodeOrToken, text)`
- `insertTextAfterRange(range, text)`
- `replaceText(nodeOrToken, text)`
- `replaceTextRange(range, text)`

**To address:** Ensure the `text` value you pass to fixer methods is a string.

**Related issue(s):** #18807

##  New requirements for `ScopeManager` implementations

In ESLint v10.0.0, custom `ScopeManager` implementations must automatically resolve references to global variables declared in the code, including `var` and `function` declarations, and provide an instance method `addGlobals(names: string[])` that creates variables with the given names in the global scope and resolves references to them.

The default `ScopeManager` implementation `eslint-scope` has already been updated.

This change does not affect custom rules.

**To address:** If you maintain a custom parser that provides a custom `ScopeManager` implementation, update your custom `ScopeManager` implementation.

**Related issue(s):** eslint/js#665

##  Removal of deprecated `context` members

In ESLint v9.x, we deprecated the following methods and properties:

- `context.getCwd()`
- `context.getFilename()`
- `context.getPhysicalFilename()`
- `context.getSourceCode()`
- `context.parserOptions`
- `context.parserPath`

In ESLint v10.0.0, all of these members have been removed.

**Codemod:** Use the @eslint/v9-to-v10-custom-rules codemod to automate this change.

**To address:** In your custom rules, make the following changes:

| **Removed on `context`**        | **Replacement on `context`**                                         |
| ------------------------------- | -------------------------------------------------------------------- |
| `context.getCwd()`              | `context.cwd`                                                        |
| `context.getFilename()`         | `context.filename`                                                   |
| `context.getPhysicalFilename()` | `context.physicalFilename`                                           |
| `context.getSourceCode()`       | `context.sourceCode`                                                 |
| `context.parserOptions`         | `context.languageOptions` or `context.languageOptions.parserOptions` |
| `context.parserPath`            | No replacement.                                                      |

You can make changes for the removed `context` methods using the `eslint-transforms` utility. To use the utility, first install it and then run the `v9-rule-migration` transform, like this:

```shell
# install the utility
npm install eslint-transforms -g

# apply the transform to one file
eslint-transforms v9-rule-migration rule.js

# apply the transform to all files in a directory
eslint-transforms v9-rule-migration rules/
```

The removed `context` properties must be done manually as there may not be a direct one-to-one replacement.

**Related issue(s):** eslint/eslint#16999

##  Removal of deprecated `SourceCode` methods

The following deprecated `SourceCode` methods have been removed in ESLint v10.0.0:

- `getTokenOrCommentBefore()`
- `getTokenOrCommentAfter()`
- `isSpaceBetweenTokens()`
- `getJSDocComment()`

These methods have been deprecated for multiple major versions and were primarily used by deprecated formatting rules and internal ESLint utilities. Custom rules using these methods must be updated to use their modern replacements.

**Codemod:** Use the @eslint/v9-to-v10-custom-rules codemod to automate this change.

**To address:** In your custom rules, make the following changes:

| **Removed on `SourceCode`**                  | **Replacement**                                                |
| -------------------------------------------- | -------------------------------------------------------------- |
| `getTokenOrCommentBefore(nodeOrToken, skip)` | `getTokenBefore(nodeOrToken, { includeComments: true, skip })` |
| `getTokenOrCommentAfter(nodeOrToken, skip)`  | `getTokenAfter(nodeOrToken, { includeComments: true, skip })`  |
| `isSpaceBetweenTokens(first, second)`        | `isSpaceBetween(first, second)`                                |
| `getJSDocComment(node)`                      | No replacement                                                 |

Compatibility patches are available in the `@eslint/compat` package to help with the transition.

**Related issue(s):** #20113

##  Prohibiting `errors` or `output` of valid RuleTester test cases

In ESLint v10.0.0, the RuleTester has become more strict about test case structure. Valid test cases (those that should not produce any linting errors) are no longer allowed to have `errors` or `output` properties.

​What changed:​​

- Previously, valid test cases could include `errors` or `output` properties, which were ignored.
- Now, including these properties in valid test cases will cause the test to fail.

Example of invalid usage:​

```js
// This will now throw an error in ESLint v10.0.0
const validTestCases = [
	{
		code: "const foo = 'bar';",
		errors: 0, // ❌ Not allowed in valid test cases
		output: "const foo = 'bar';", // ❌ Not allowed in valid test cases
	},
];

ruleTester.run("rule-id", rule, { valid: validTestCases, invalid: [] });
```

**Codemod:** Use the @eslint/v9-to-v10-ruletester codemod to automate this change.

**To address:** Remove any `errors`/`output` properties from valid test cases manually.

**Related issue(s):** #18960

##  Removal of `nodeType` property in `LintMessage` objects

In ESLint v10.0.0, the deprecated `nodeType` property on `LintMessage` objects has been removed. This affects consumers of the Node.js API (for example, custom formatters and editor/tool integrations) that previously relied on `message.nodeType`.

**Codemod:** Use the @eslint/v9-to-v10-linter-api codemod to automate this change.

**To address:** Remove all usages of `message.nodeType` in your integrations and formatters manually.

**Related issue(s):** #19029
