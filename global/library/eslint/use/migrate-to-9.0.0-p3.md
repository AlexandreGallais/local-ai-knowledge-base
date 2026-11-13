---
title: "Migrate to v9.x (part 3 of 3)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/migrate-to-9.0.0.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Migrate to v9.x (part 3 of 3)

##  Function-style rules are no longer supported

ESLint v9.0.0 drops support for function-style rules. Function-style rules are rules created by exporting a function rather than an object with a `create()` method. This rule format was deprecated in 2016.

**Codemod:** Use the @eslint/v8-to-v9-custom-rules codemod to convert function-style rules to the object format.

**To address:** Update your rules to the most recent rule format. For rules written in CommonJS, you can also use `eslint-transforms`.

The eslint-plugin/prefer-object-rule rule can help enforce the usage of object-style rules and autofix any remaining function-style rules.

**Related Issues(s):** #14709

##  `meta.schema` is required for rules with options

As of ESLint v9.0.0, an error will be thrown if any options are passed to a rule that doesn't specify `meta.schema` property.

**Codemod:** The @eslint/v8-to-v9-custom-rules codemod generates `meta.schema` for function-style and object-style rules, migrates legacy `module.exports.schema`, and inserts a TODO when it detects `context.options` without a schema. The limitation is that it does not fully infer the actual schema.

**To address:**

- If your rule expects options, set `meta.schema` property to a JSON Schema format description of the rule’s options. This schema will be used by ESLint to validate configured options and prevent invalid or unexpected inputs to your rule.
- If your rule doesn't expect any options, there is no action required. This change ensures that end users will not mistakenly configure options for rules that don't expect options.
- **(not recommended)** you can also set `meta.schema` to `false` to disable this validation, but it is highly recommended to provide a schema if the rule expects options and omit the schema (or set `[]`) if the rule doesn't expect options so that ESLint can ensure that your users' configurations are valid.

The eslint-plugin/require-meta-schema rule can help enforce that rules have schemas when required.

**Related Issues(s):** #14709

##  `FlatRuleTester` is now `RuleTester`

As announced in our blog post, the temporary `FlatRuleTester` class has been renamed to `RuleTester`, while the `RuleTester` class from v8.x has been removed. Additionally, the `FlatRuleTester` export from `eslint/use-at-your-own-risk` has been removed.

**Codemod:** The @eslint/v8-to-v9-custom-rules codemod renames `FlatRuleTester` to `RuleTester` and moves `parserOptions` to `languageOptions` in test cases. Updating imports from `eslint/use-at-your-own-risk` to `eslint`, adjusting for new `RuleTester` defaults, and translating other eslintrc-style test config must be done manually.

**To address:** Update your rule tests to use the new `RuleTester`. To do so, here are some of the common changes you'll need to make:

- **Be aware of new defaults for `ecmaVersion` and `sourceType`.** By default, `RuleTester` uses the flat config default of `ecmaVersion: "latest"` and `sourceType: "module"`. This may cause some tests to break if they were expecting the old default of `ecmaVersion: 5` and `sourceType: "script"`. If you'd like to use the old default, you'll need to manually specify that in your `RuleTester` like this:

    ```js
    // use eslintrc defaults
    const ruleTester = new RuleTester({
    	languageOptions: {
    		ecmaVersion: 5,
    		sourceType: "script",
    	},
    });
    ```

- **Change `parserOptions` to `languageOptions`.** If you're setting `ecmaVersion` or `sourceType` on your tests, move those from `parserOptions` to `languageOptions`, like this:

    ```js
    ruleTester.run("my-rule", myRule, {
    	valid: [
    		{
    			code: "foo",
    			parserOptions: {
    				ecmaVersion: 6,
    			},
    		},
    	],
    });

    // becomes

    ruleTester.run("my-rule", myRule, {
    	valid: [
    		{
    			code: "foo",
    			languageOptions: {
    				ecmaVersion: 6,
    			},
    		},
    	],
    });
    ```

- **Translate other config keys.** Keys such as `env` and `parser` that used to run on the eslintrc config system must be translated into the flat config system. Please refer to the Configuration Migration Guide for details on translating other keys you may be using.

**Related Issues(s):** #13481

##  Stricter `RuleTester` checks

In order to aid in the development of high-quality custom rules that are free from common bugs, ESLint v9.0.0 implements several changes to `RuleTester`:

1. **Test case `output` must be different from `code`.** In ESLint v8.x, if `output` is the same as `code`, it asserts that there was no autofix. When looking at a test case, it's not always immediately clear whether `output` differs from `code`, especially if the strings are longer or multiline, making it difficult for developers to determine whether or not the test case expects an autofix. In ESLint v9.0.0, to avoid this ambiguity, `RuleTester` now throws an error if the test `output` has the same value as the test `code`. Therefore, specifying `output` now necessarily means that the test case expects an autofix and asserts its result. If the test case doesn't expect an autofix, omit the `output` property or set it to `null`. This asserts that there was no autofix.
1. **Test error objects must specify `message` or `messageId`.** To improve the quality of test coverage, `RuleTester` now throws an error if neither `message` nor `messageId` is specified on test error objects.
1. **Test error object must specify `suggestions` if the actual error provides suggestions.** In ESLint v8.x, if the `suggestions` property was omitted from test error objects, `RuleTester` wasn't performing any checks related to suggestions, so it was easy to forget to assert if a test case produces suggestions. In ESLint v9.0.0, omitting the `suggestions` property asserts that the actual error does not provide suggestions, while you need to specify the `suggestions` property if the actual error does provide suggestions. We highly recommend that you test suggestions in detail by specifying an array of test suggestion objects, but you can also specify `suggestions: <number>` to assert just the number of suggestions.
1. **Test suggestion objects must specify `output`.** To improve the quality of test coverage, `RuleTester` now throws an error if `output` property is not specified on test suggestion objects.
1. **Test suggestion objects must specify `desc` or `messageId`.** To improve the quality of test coverage, `RuleTester` now throws an error if neither `desc` nor `messageId` property is specified on test suggestion objects. It's also not allowed to specify both. If you want to assert the suggestion description text in addition to the `messageId`, then also add the `data` property.
1. **Suggestion messages must be unique.** Because suggestions are typically displayed in an editor as a dropdown list, it's important that no two suggestions for the same lint problem have the same message. Otherwise, it's impossible to know what any given suggestion will do. This additional check runs automatically.
1. **Suggestions must change the code.** Suggestions are expected to fix the reported problem by changing the code. `RuleTester` now throws an error if the suggestion test `output` is the same as the test `code`.
1. **Suggestions must generate valid syntax.** In order for rule suggestions to be helpful, they need to be valid syntax. `RuleTester` now parses the output of suggestions using the same language options as the `code` value and throws an error if parsing fails.
1. **Test cases must be unique.** Identical test cases can cause confusion and be hard to detect manually in a long test file. Duplicates are now automatically detected and can be safely removed.
1. **`filename` and `only` must be of the expected type.** `RuleTester` now checks the type of `filename` and `only` properties of test objects. If specified, `filename` must be a string value. If specified, `only` must be a boolean value.
1. **Messages cannot have unsubstituted placeholders.** The `RuleTester` now also checks if there are {% raw %}`{{ placeholder }}` {% endraw %} still in the message as their values were not passed via `data` in the respective `context.report()` call.

**Codemod:** The @eslint/v8-to-v9-custom-rules codemod renames `FlatRuleTester` to `RuleTester`, moves `parserOptions` to `languageOptions` in test cases, and removes `output` when it equals `code`. All other stricter `RuleTester` checks must be fixed manually by running your rule tests and updating failing cases.

**To address:** Run your rule tests using `RuleTester` and fix any errors that occur. The changes you'll need to make to satisfy `RuleTester` are compatible with ESLint v8.x.

**Related Issues(s):** #15104, #15735, #16908, #18016

##  `FlatESLint` is now `ESLint`

As announced in our blog post, the temporary `FlatESLint` class has been renamed to `ESLint`, while the `ESLint` class from v8.x has been renamed to `LegacyESLint`.

**Codemod:** The @eslint/v8-to-v9-custom-rules codemod renames `FlatESLint` to `ESLint`.

**To address:** If you are currently using the `ESLint` class, verify that your tests pass using the new `ESLint` class. Not all of the old options are supported, so you may need to update the arguments passed to the constructor. See the Node.js API Reference for details.

If you still need the v8.x `ESLint` functionality, use the `LegacyESLint` class like this:

```js
const { LegacyESLint } = require("eslint/use-at-your-own-risk");
```

**Related Issues(s):** #13481

##  `Linter` now expects flat config format

In ESLint v9.0.0, the `config` argument passed to `Linter#verify()` and `Linter#verifyAndFix()` methods should be in the flat config format.

Additionally, methods `Linter#defineRule()`, `Linter#defineRules()`, `Linter#defineParser()`, and `Linter#getRules()` are no longer available.

**Codemod:** The @eslint/v8-to-v9-custom-rules codemod renames `FlatESLint` to `ESLint` and moves `parserOptions` to `languageOptions` in `Linter#verify()` and `Linter#verifyAndFix()` calls. Calls to removed methods (`defineRule`, `defineRules`, `defineParser`, `getRules`) are marked with TODO comments; migrating rules and parsers into flat plugins / `languageOptions` config must be done manually.

**To address:** If you are using the `Linter` class, verify that your tests pass.

If you're passing configuration objects that are incompatible with the flat config format, you'll need to update the code.

```js
// eslintrc config format
linter.verify(code, {
	parserOptions: {
		ecmaVersion: 6,
	},
});

// flat config format
linter.verify(code, {
	languageOptions: {
		ecmaVersion: 6,
	},
});
```

Please refer to the Configuration Migration Guide for details on translating other keys you may be using.

Rules and parsers can be defined directly in the configuration.

```js
// eslintrc mode
linter.defineRule("my-rule1", myRule1);
linter.defineRules({
	"my-rule2": myRule2,
	"my-rule3": myRule3,
});
linter.defineParser("my-parser", myParser);
linter.verify(code, {
	rules: {
		"my-rule1": "error",
		"my-rule2": "error",
		"my-rule3": "error",
	},
	parser: "my-parser",
});

// flat config mode
linter.verify(code, {
	plugins: {
		"my-plugin-foo": {
			rules: {
				"my-rule1": myRule1,
			},
		},
		"my-plugin-bar": {
			rules: {
				"my-rule2": myRule2,
				"my-rule3": myRule3,
			},
		},
	},
	rules: {
		"my-plugin-foo/my-rule1": "error",
		"my-plugin-bar/my-rule2": "error",
		"my-plugin-bar/my-rule3": "error",
	},
	languageOptions: {
		parser: myParser,
	},
});
```

If you still need the v8.x `Linter` functionality, pass `configType: "eslintrc"` to the constructor like this:

```js
const linter = new Linter({ configType: "eslintrc" });

linter.verify(code, {
	parserOptions: {
		ecmaVersion: 6,
	},
});

linter.getRules();
```

**Related Issues(s):** #13481
