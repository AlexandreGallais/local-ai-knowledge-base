---
title: "Migrating to v6.0.0 (part 1 of 2)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/migrating-to-6.0.0.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Migrating to v6.0.0

ESLint v6.0.0 is a major release of ESLint. We have made a few breaking changes in this release. This guide is intended to walk you through the breaking changes.

The lists below are ordered roughly by the number of users each change is expected to affect, where the first items are expected to affect the most users.

## Breaking changes for users

1. Node.js 6 is no longer supported
1. `eslint:recommended` has been updated
1. Plugins and shareable configs are no longer affected by ESLint's location
1. The default parser now validates options more strictly
1. Rule configuration are validated more strictly
1. The `no-redeclare` rule is now more strict by default
1. The `comma-dangle` rule is now more strict by default
1. The `no-confusing-arrow` rule is now more lenient by default
1. Overrides in a config file can now match dotfiles
1. Overrides in an extended config file can now be overridden by a parent config file
1. Configuration values for globals are now validated
1. The deprecated `experimentalObjectRestSpread` option has been removed
1. User-provided regular expressions in rule options are parsed with the unicode flag

## Breaking changes for plugin/custom rule developers

1. Plugin authors may need to update installation instructions
1. `RuleTester` now validates against invalid `default` keywords in rule schemas
1. `RuleTester` now requires an absolute path on `parser` option
1. The `eslintExplicitGlobalComment` scope analysis property has been removed

## Breaking changes for integration developers

1. Plugins and shareable configs are no longer affected by ESLint's location
1. `Linter` no longer tries to load missing parsers from the filesystem

---

##  Node.js 6 is no longer supported

As of April 2019, Node.js 6 will be at EOL and will no longer be receiving security updates. As a result, we have decided to drop support for it in ESLint v6. We now support the following versions of Node.js:

- Node.js 8 (8.10.0 and above)
- Node.js 10 (10.13.0 and above)
- Anything above Node.js 11.10.1

**To address:** Make sure you upgrade to at least Node.js 8 when using ESLint v6. If you are unable to upgrade, we recommend continuing to use ESLint v5.x until you are able to upgrade Node.js.

**Related issue(s):** eslint/eslint#11546

##  `eslint:recommended` has been updated

The following rules have been added to the `eslint:recommended` config:

- `no-async-promise-executor` disallows using an `async` function as the argument to the `Promise` constructor, which is usually a bug.
- `no-misleading-character-class` reports character classes in regular expressions that might not behave as expected.
- `no-prototype-builtins` reports method calls like `foo.hasOwnProperty("bar")` (which are a frequent source of bugs), and suggests that they be replaced with `Object.prototype.hasOwnProperty.call(foo, "bar")` instead.
- `no-shadow-restricted-names` disallows shadowing variables like `undefined` (e.g. with code like `let undefined = 5;`), since is likely to confuse readers.
- `no-useless-catch` reports `catch` clauses that are redundant and can be removed from the code without changing its behavior.
- `no-with` disallows use of the `with` statement, which can make code difficult to understand and cause compatibility problems.
- `require-atomic-updates` reports race condition bugs that can occur when reassigning variables in async functions.

Additionally, the following rule has been _removed_ from `eslint:recommended`:

- `no-console` disallows calling functions like `console.log`. While this rule is useful in many cases (e.g. to avoid inadvertently leaving debugging statements in production code), it is not as broadly applicable as the other rules in `eslint:recommended`, and it was a source of false positives in cases where `console.log` is acceptable (e.g. in CLI applications).

Finally, in ESLint v5 `eslint:recommended` would explicitly disable all core rules that were not considered "recommended". This could cause confusing behavior if `eslint:recommended` was loaded after another config, since `eslint:recommended` would have the effect of turning off some rules. In ESLint v6, `eslint:recommended` has no effect on non-recommended rules.

**To address:** To mimic the `eslint:recommended` behavior from 5.x, you can explicitly disable/enable rules in a config file as follows:

```json
{
	"extends": "eslint:recommended",

	"rules": {
		"no-async-promise-executor": "off",
		"no-misleading-character-class": "off",
		"no-prototype-builtins": "off",
		"no-shadow-restricted-names": "off",
		"no-useless-catch": "off",
		"no-with": "off",
		"require-atomic-updates": "off",

		"no-console": "error"
	}
}
```

In rare cases (if you were relying on the previous behavior where `eslint:recommended` disables core rules), you might need to disable additional rules to restore the previous behavior.

**Related issue(s):** eslint/eslint#10768, eslint/eslint#10873

##  Plugins and shareable configs are no longer affected by ESLint's location

Previously, ESLint loaded plugins relative to the location of the ESLint package itself. As a result, we suggested that users with global ESLint installations should also install plugins globally, and users with local ESLint installations should install plugins locally. However, due to a design bug, this strategy caused ESLint to randomly fail to load plugins and shareable configs under certain circumstances, particularly when using package management tools like `lerna` and Yarn Plug n' Play.

As a rule of thumb: With ESLint v6, plugins should always be installed locally, even if ESLint was installed globally. More precisely, ESLint v6 resolves plugins relative to the end user's project by default, and always resolves shareable configs and parsers relative to the location of the config file that imports them.

**To address:** If you use a global installation of ESLint (e.g. installed with `npm install eslint --global`) along with plugins, you should install those plugins locally in the projects where you run ESLint. If your config file extends shareable configs and/or parsers, you should ensure that those packages are installed as dependencies of the project containing the config file.

If you use a config file located outside of a local project (with the `--config` flag), consider installing the plugins as dependencies of that config file, and setting the `--resolve-plugins-relative-to` flag to the location of the config file.

**Related issue(s):** eslint/eslint#10125, eslint/rfcs#7

##  The default parser now validates options more strictly

`espree`, the default parser used by ESLint, will now raise an error in the following cases:

- The `ecmaVersion` parser option is set to something other than a number, such as the string `"2015"`. (Previously, a non-number option would simply be ignored.)
- The `sourceType: "module"` parser option is set while `ecmaVersion` is set to `5` or left unspecified. (Previously, setting `sourceType: "module"` would implicitly cause `ecmaVersion` to be set to a minimum of 2015, which could be surprising.)
- The `sourceType` is set to anything other than `"script"` or `"module"`.

**To address:** If your config sets `ecmaVersion` to something other than a number, you can restore the previous behavior by removing `ecmaVersion`. (However, you may want to double-check that your config is actually working as expected.) If your config sets `parserOptions: { sourceType: "module" }` without also setting `parserOptions.ecmaVersion`, you should add `parserOptions: { ecmaVersion: 2015 }` to restore the previous behavior.

**Related issue(s):** eslint/eslint#9687, eslint/espree#384

##  Rule configuration are validated more strictly

To catch config errors earlier, ESLint v6 will report a linting error if you are trying to configure a non-existent rule.

| config                          | ESLint v5       | ESLint v6     |
| ------------------------------- | --------------- | ------------- |
| `/*eslint-enable foo*/`         | no error        | linting error |
| `/*eslint-disable(-line) foo*/` | no error        | linting error |
| `/*eslint foo: 0*/`             | no error        | linting error |
| `{rules: {foo: 0}}`             | no error        | no error      |
| `{rules: {foo: 1}`              | linting warning | linting error |

**To address:** You can remove the non-existent rule in your (inline) config.

**Related issue(s):** eslint/eslint#9505

##  The `no-redeclare` rule is now more strict by default

The default options for the `no-redeclare` rule have changed from `{ builtinGlobals: false }` to `{ builtinGlobals: true }`. Additionally, the `no-redeclare` rule will now report an error for globals enabled by comments like `/* global foo */` if those globals were already enabled through configuration anyway.

**To address:**

To restore the previous options for the rule, you can configure it as follows:

```json
{
	"rules": {
		"no-redeclare": ["error", { "builtinGlobals": false }]
	}
}
```

Additionally, if you see new errors for `global` comments in your code, you should remove those comments.

**Related issue(s):** eslint/eslint#11370, eslint/eslint#11405

##  The `comma-dangle` rule is now more strict by default

Previously, the `comma-dangle` rule would ignore trailing function arguments and parameters, unless explicitly configured to check for function commas. In ESLint v6, function commas are treated the same way as other types of trailing commas.

**To address:** You can restore the previous default behavior of the rule with:

```json
{
	"rules": {
		"comma-dangle": [
			"error",
			{
				"arrays": "never",
				"objects": "never",
				"imports": "never",
				"exports": "never",
				"functions": "ignore"
			}
		]
	}
}
```

To restore the previous behavior of a string option like `"always-multiline"`, replace `"never"` with `"always-multiline"` in the example above.

**Related issue(s):** eslint/eslint#11502

##  The `no-confusing-arrow` rule is now more lenient by default

The default options for the `no-confusing-arrow` rule have changed from `{ allowParens: false }` to `{ allowParens: true }`.

**To address:** You can restore the previous default behavior of the rule with:

```json
{
	"rules": {
		"no-confusing-arrow": ["error", { "allowParens": false }]
	}
}
```

**Related issue(s):** eslint/eslint#11503

##  Overrides in a config file can now match dotfiles

Due to a bug, the glob patterns in a `files` list in an `overrides` section of a config file would never match dotfiles, making it impossible to have overrides apply to files starting with a dot. This bug has been fixed in ESLint v6.

**To address:** If you don't want dotfiles to be matched by an override, consider adding something like `excludedFiles: [".*"]` to that `overrides` section. See the documentation for more details.

**Related issue(s):** eslint/eslint#11201

##  Overrides in an extended config file can now be overridden by a parent config file

Due to a bug, it was previously the case that an `overrides` block in a shareable config had precedence over the top level of a parent config. For example, with the following config setup, the `semi` rule would end up enabled even though it was explicitly disabled in the end user's config:

```js
// .eslintrc.js
module.exports = {
	extends: ["foo"],
	rules: {
		semi: "off",
	},
};
```

```js
// eslint-config-foo/index.js
module.exports = {
	overrides: {
		files: ["*.js"],
		rules: {
			semi: "error",
		},
	},
};
```

In ESLint v6.0.0, a parent config always has precedence over extended configs, even with `overrides` blocks.

**To address:** We expect the impact of this issue to be very low because most shareable configs don't use `overrides` blocks. However, if you use a shareable config with `overrides` blocks, you might encounter a change in behavior due to something that is explicitly specified in your config but was inactive until now. If you would rather inherit the behavior from the shareable config, simply remove the corresponding entry from your own config. (In the example above, the previous behavior could be restored by removing `semi: "off"` from `.eslintrc.js`.)

**Related issue(s):** eslint/eslint#11510

##  Configuration values for globals are now validated

Previously, when configuring a set of global variables with an object, it was possible to use anything as the values of the object. An unknown value would be treated the same as `"writable"`.

```js
// .eslintrc.js
module.exports = {
	globals: {
		foo: "readonly",
		bar: "writable",
		baz: "hello!", // ???
	},
};
```

With this change, any unknown values in a `globals` object result in a config validation error.

**To address:** If you see config validation errors related to globals after updating, ensure that all values configured for globals are either `readonly`, `writable`, or `off`. (ESLint also accepts some alternate spellings and variants for compatibility.)

##  The deprecated `experimentalObjectRestSpread` option has been removed

Previously, when using the default parser, a config could use the `experimentalObjectRestSpread` option to enable parsing support for object rest/spread properties:

```json
{
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true
		}
	}
}
```

Since ESLint v5, `ecmaFeatures: { experimentalObjectRestSpread: true }` has been equivalent to `ecmaVersion: 2018`, and has also emitted a deprecation warning. In ESLint v6, the `experimentalObjectRestSpread` feature has been removed entirely and has no effect. If your config was relying on `experimentalObjectRestSpread` to enable ES2018 parsing, you might start seeing parsing errors for recent syntax.

**To address:** If you use the `experimentalObjectRestSpread` option, you should change your config to contain this instead:

```json
{
	"parserOptions": {
		"ecmaVersion": 2018
	}
}
```

If you're not sure which config file needs to be updated, it may be useful to run ESLint v5 and look at what config file is mentioned in the deprecation warning.

**Related issue(s):** eslint/eslint#9990

##  User-provided regular expressions in rule options are parsed with the unicode flag

Rules like `max-len` accept a string option which is interpreted as a regular expression. In ESLint v6.0.0, these regular expressions are interpreted with the unicode flag, which should exhibit more reasonable behavior when matching characters like astral symbols. Unicode regexes also validate escape sequences more strictly than non-unicode regexes.

**To address:** If you get rule option validation errors after upgrading, ensure that any regular expressions in your rule options have no invalid escape sequences.

**Related issue(s):** eslint/eslint#11423

---
