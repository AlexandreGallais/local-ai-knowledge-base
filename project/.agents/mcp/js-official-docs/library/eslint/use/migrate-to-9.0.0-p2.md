---
title: "Migrate to v9.x (part 2 of 3)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/migrate-to-9.0.0.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Migrate to v9.x (part 2 of 3)

##  New checks in `no-implicit-coercion` by default

In ESLint v9.0.0, the `no-implicit-coercion` rule additionally reports the following cases by default:

```js
-(-foo);
foo - 0;
```

**To address:** If you want to retain the previous behavior of this rule, set `"allow": ["-", "- -"]`.

```json
{
	"rules": {
		"no-implicit-coercion": [2, { "allow": ["-", "- -"] }]
	}
}
```

**Related issue(s):** #17832

##  Case-sensitive flags in `no-invalid-regexp`

In ESLint v9.0.0, the option `allowConstructorFlags` is now case-sensitive.

**Codemod:** The @eslint/v8-to-v9-config codemod expands `allowConstructorFlags` with opposite-case variants to preserve ESLint v8 behavior under v9's case-sensitive matching.

**To address:** Update your configuration manually if needed.

**Related issue(s):** #16574

##  `varsIgnorePattern` option of `no-unused-vars` no longer applies to catch arguments

In previous versions of ESLint, the `varsIgnorePattern` option of `no-unused-vars` incorrectly ignored errors specified in a `catch` clause. In ESLint v9.0.0, `varsIgnorePattern` no longer applies to errors in `catch` clauses. For example:

```js
/*eslint no-unused-vars: ["error", { "caughtErrors": "all", "varsIgnorePattern": "^err" }]*/

try {
	//...
} catch (err) {
	// 'err' will be reported.
	console.error("errors");
}
```

**Codemod:** The @eslint/v8-to-v9-config codemod copies `varsIgnorePattern` to `caughtErrorsIgnorePattern` when the rule is explicitly configured, catch errors are checked (`caughtErrors` is not `"none"`), and no separate `caughtErrorsIgnorePattern` is set. This preserves v8 behavior where `varsIgnorePattern` incorrectly applied to catch bindings. It does not apply when the rule comes only from a preset, when `caughtErrors` is `"none"`, or for `@typescript-eslint/no-unused-vars`.

**To address:** If you want to specify ignore patterns for `catch` clause variable names, use the `caughtErrorsIgnorePattern` option in addition to `varsIgnorePattern`.

**Related issue(s):** #17540

##  `no-restricted-imports` now accepts multiple config entries with the same `name`

In previous versions of ESLint, if multiple entries in the `paths` array of your configuration for the `no-restricted-imports` rule had the same `name` property, only the last one would apply, while the previous ones would be ignored.

As of ESLint v9.0.0, all entries apply, allowing for specifying different messages for different imported names. For example, you can now configure the rule like this:

```js
{
    rules: {
        "no-restricted-imports": ["error", {
            paths: [
                {
                    name: "react-native",
                    importNames: ["Text"],
                    message: "import 'Text' from 'ui/_components' instead"
                },
                {
                    name: "react-native",
                    importNames: ["View"],
                    message: "import 'View' from 'ui/_components' instead"
                }
            ]
        }]
    }
}
```

and both `import { Text } from "react-native"` and `import { View } from "react-native"` will be reported, with different messages.

In previous versions of ESLint, with this configuration only `import { View } from "react-native"` would be reported.

**Codemod:** The @eslint/v8-to-v9-config codemod updates `no-restricted-imports` configurations during migration. When the rule uses a `paths` array, it restructures the options for flat config and deduplicates entries that share the same `name`, keeping the last entry so lint behavior matches ESLint v8 (where only the last matching entry applied).

**To address:** If your configuration for this rule has multiple entries with the same `name`, you may need to remove unintentional ones.

**Related issue(s):** #15261

##  `"eslint:recommended"` and `"eslint:all"` no longer accepted in flat config

In ESLint v8.x, `eslint.config.js` could refer to `"eslint:recommended"` and `"eslint:all"` configurations by inserting a string into the config array, as in this example:

```js
// eslint.config.js
export default ["eslint:recommended", "eslint:all"];
```

In ESLint v9.0.0, this format is no longer supported and will result in an error.

**Codemod:** Use the @eslint/v8-to-v9-config codemod. It converts legacy string presets in existing `eslint.config.*` files and migrates eslintrc configs via `FlatCompat` + `@eslint/js`.

**To address:** Install and use `@eslint/js` manually:

```js
// eslint.config.js
import js from "@eslint/js";

export default [js.configs.recommended, js.configs.all];
```

**Related issue(s):** #17488

##  `no-inner-declarations` has a new default behavior with a new option

ESLint v9.0.0 introduces a new option in `no-inner-declarations` rule called `blockScopeFunctions` which by default allows block-level `function`s in strict mode when `languageOptions.ecmaVersion` is set to `2015` or above.

```js
/*eslint no-inner-declarations: "error"*/
"use strict";

if (test) {
	function foo() {} // no error
}
```

**Codemod:** The @eslint/v8-to-v9-config codemod adds `blockScopedFunctions: "disallow"` when `no-inner-declarations` is explicitly configured, preserving v8 reporting behavior. It does not apply when the rule comes only from a preset.

**To address:** If you want to report the block-level `function`s in every condition regardless of strict or non-strict mode, set the `blockScopeFunctions` option to `"disallow"`.

**Related issue(s):** #15576

##  `no-unused-vars` now defaults `caughtErrors` to `"all"`

ESLint v9.0.0 changes the default value for the `no-unused-vars` rule's `caughtErrors` option.
Previously it defaulted to `"none"` to never check whether caught errors were used.
It now defaults to `"all"` to check caught errors for being used.

```js
/*eslint no-unused-vars: "error"*/
try {
} catch (error) {
	// 'error' is defined but never used
}
```

**Codemod:** The @eslint/v8-to-v9-config codemod updates `no-unused-vars` when the rule is explicitly configured. It adds `caughtErrors: "none"` if that option is omitted, preserving ESLint v8 behavior. Existing `caughtErrors` values are kept unchanged. If catch errors are checked and `varsIgnorePattern` is set, it also copies that pattern to `caughtErrorsIgnorePattern`. It does not add the rule when it is enabled only through `eslint:recommended`, and it does not migrate `@typescript-eslint/no-unused-vars`.

**To address:** If you want to allow unused caught errors, such as when writing code that will be directly run in an environment that does not support ES2019 optional catch bindings, set the `caughtErrors` option to `"none"`.
Otherwise, delete the unused caught errors.

```js
/*eslint no-unused-vars: "error"*/
try {
} catch {
	// no error
}
```

**Related issue(s):** #17974

##  `no-useless-computed-key` flags unnecessary computed member names in classes by default

In ESLint v9.0.0, the default value of the `enforceForClassMembers` option of the `no-useless-computed-key` rule was changed from `false` to `true`.
The effect of this change is that unnecessary computed member names in classes will be flagged by default.

```js
/*eslint no-useless-computed-key: "error"*/

class SomeClass {
	["someMethod"]() {} // ok in ESLint v8, error in ESLint v9.
}
```

**Codemod:** The @eslint/v8-to-v9-config codemod sets `enforceForClassMembers` to `false` when the `no-useless-computed-key` rule is configured with an empty options object, preserving ESLint v8 behavior.

**To address:** Fix the problems reported by the rule or revert to the previous behavior by setting the `enforceForClassMembers` option to `false`.

**Related issue(s):** #18042

##  `camelcase` allow option only accepts an array of strings

Previously the camelcase rule didn't enforce the `allow` option to be an array of strings. In ESLint v9.0.0, the `allow` option now only accepts an array of strings.

**Codemod:** The @eslint/v8-to-v9-config codemod may update your configuration for this.

**To address:** If ESLint still reports invalid configuration for this rule, update your configuration manually.

**Related issue(s):** #18232

##  Removed multiple `context` methods

ESLint v9.0.0 removes multiple deprecated methods from the `context` object and moves them onto the `SourceCode` object:

| **Removed on `context`**         | **Replacement(s) on `SourceCode`**                                                                  |
| -------------------------------- | --------------------------------------------------------------------------------------------------- |
| `context.getSource()`            | `sourceCode.getText()`                                                                              |
| `context.getSourceLines()`       | `sourceCode.getLines()`                                                                             |
| `context.getAllComments()`       | `sourceCode.getAllComments()`                                                                       |
| `context.getNodeByRangeIndex()`  | `sourceCode.getNodeByRangeIndex()`                                                                  |
| `context.getComments()`          | `sourceCode.getCommentsBefore()`, `sourceCode.getCommentsAfter()`, `sourceCode.getCommentsInside()` |
| `context.getCommentsBefore()`    | `sourceCode.getCommentsBefore()`                                                                    |
| `context.getCommentsAfter()`     | `sourceCode.getCommentsAfter()`                                                                     |
| `context.getCommentsInside()`    | `sourceCode.getCommentsInside()`                                                                    |
| `context.getJSDocComment()`      | `sourceCode.getJSDocComment()`                                                                      |
| `context.getFirstToken()`        | `sourceCode.getFirstToken()`                                                                        |
| `context.getFirstTokens()`       | `sourceCode.getFirstTokens()`                                                                       |
| `context.getLastToken()`         | `sourceCode.getLastToken()`                                                                         |
| `context.getLastTokens()`        | `sourceCode.getLastTokens()`                                                                        |
| `context.getTokenAfter()`        | `sourceCode.getTokenAfter()`                                                                        |
| `context.getTokenBefore()`       | `sourceCode.getTokenBefore()`                                                                       |
| `context.getTokenByRangeStart()` | `sourceCode.getTokenByRangeStart()`                                                                 |
| `context.getTokens()`            | `sourceCode.getTokens()`                                                                            |
| `context.getTokensAfter()`       | `sourceCode.getTokensAfter()`                                                                       |
| `context.getTokensBefore()`      | `sourceCode.getTokensBefore()`                                                                      |
| `context.getTokensBetween()`     | `sourceCode.getTokensBetween()`                                                                     |
| `context.parserServices`         | `sourceCode.parserServices`                                                                         |
| `context.getDeclaredVariables()` | `sourceCode.getDeclaredVariables()`                                                                 |

In addition to the methods in the above table, there are several other methods that are also moved but required different method signatures:

| **Removed on `context`**           | **Replacement(s) on `SourceCode`**          |
| ---------------------------------- | ------------------------------------------- |
| `context.getAncestors()`           | `sourceCode.getAncestors(node)`             |
| `context.getScope()`               | `sourceCode.getScope(node)`                 |
| `context.markVariableAsUsed(name)` | `sourceCode.markVariableAsUsed(name, node)` |

**Codemod:** Use the @eslint/v8-to-v9-custom-rules codemod to automate much of this migration.

**To address:** For more information, see the blog post.

**Related Issues(s):** #16999, #13481

##  Removed `sourceCode.getComments()`

ESLint v9.0.0 removes the deprecated `sourceCode.getComments()` method.

**Codemod:** Use the @eslint/v8-to-v9-custom-rules codemod. It converts both `context.getComments()` and `sourceCode.getComments()` to combinations of `getCommentsBefore()`, `getCommentsInside()`, and `getCommentsAfter()`.

**To address:** Replace with `sourceCode.getCommentsBefore()`, `sourceCode.getCommentsAfter()`, or `sourceCode.getCommentsInside()`.

**Related Issues(s):** #14744

##  Removed `CodePath#currentSegments`

ESLint v9.0.0 removes the deprecated `CodePath#currentSegments` property.

**Codemod:** The @eslint/v8-to-v9-custom-rules codemod may automate part of this migration.

**To address:** Update your code following the recommendations in the blog post.

**Related Issues(s):** #17457

##  Code paths are now precalculated

Prior to ESLint v9.0.0, code paths were calculated during the same AST traversal used by rules, meaning that the information passed to methods like `onCodePathStart` and `onCodePathSegmentStart` was incomplete. Specifically, array properties like `CodePath#childCodePaths` and `CodePathSegment#nextSegments` began empty and then were filled with the appropriate information as the traversal completed, meaning that those arrays could have different elements depending on when you checked their values.

ESLint v9.0.0 now precalculates code path information before the traversal used by rules. As a result, the code path information is now complete regardless of where it is accessed inside of a rule.

**Codemod:** The migration codemods do not cover code path precalculation. Rules that rely on when `CodePath` or `CodePathSegment` array properties are populated must be reviewed manually. The @eslint/v8-to-v9-custom-rules codemod only migrates removed `CodePath#currentSegments` usage.

**To address:** If you are accessing any array properties on `CodePath` or `CodePathSegment`, you'll need to update your code. Specifically:

- If you are checking the `length` of any array properties, ensure you are using relative comparison operators like `<`, `>`, `<=`, and `>=` instead of equals.
- If you are accessing the `nextSegments`, `prevSegments`, `allNextSegments`, or `allPrevSegments` properties on a `CodePathSegment`, or `CodePath#childCodePaths`, verify that your code will still work as expected. To be backwards compatible, consider moving the logic that checks these properties into `onCodePathEnd`.

**Related Issues(s):** #16999
