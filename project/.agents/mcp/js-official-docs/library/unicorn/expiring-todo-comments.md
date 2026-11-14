---
title: "expiring-todo-comments (part 1 of 2)"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/expiring-todo-comments.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# expiring-todo-comments

📝 Add expiration conditions to TODO comments.

💼 This rule is enabled in the following configs: ✅ `recommended`, 🎨 `recommended-css`, 🌐 `recommended-html`, 🧩 `recommended-json`, 📚 `recommended-markdown`, 💎 `recommended-soml`, 🛠️ `recommended-toml`, 📋 `recommended-yaml`, ☑️ `unopinionated`.

This rule makes it possible to pass <example-value> to TODO, FIXME and XXX comments to trigger ESLint to report.

From ESLint's documentation:

> Developers often add comments to code which is not complete or needs review.

TODO comments are useful when a piece of code needs some work. Unfortunately these can be easily forgotten as it's common to forget to track them, leaving dangling tasks to be found at later random moments, or never at all.

With this rule, a TODO can have a condition right from the beginning to define its lifespan. When the condition is met, ESLint will take care of reporting that there's work to be done.

This rule will ignore all TODOs without conditions. For more information, read the below `eslint/no-warning-comments` section.

This rule also supports CSS comments when linting with `@eslint/css`, HTML comments when linting with `@html-eslint/eslint-plugin`, JSONC/JSON5 comments when linting with `@eslint/json`, HTML comments in Markdown when linting with `@eslint/markdown`, SOML `#` and block comments when linting with `eslint-soml`, TOML `#` comments when linting with `eslint-plugin-toml`, and YAML `#` comments when linting with `eslint-plugin-yml`.

Quick overview of conditions:

- Expire after a **specific date**.
- Expire when **your package** (package.json) reaches a specific **version**.
- Expire when a package.json **`engines`** property reaches a specific **version**.
- Expire when you **install/uninstall** a specific **package**.
- Expire when a **package** reaches a specific **version**.
- Expire when a **peer dependency**'s minimum supported **version** reaches a specific **version**.

## Conditions

### Expiry Date

Using a date as condition, a TODO will only work as long as this date is not met. This is especially useful when you either know when the action should take place or simply want to set boundaries for yourself.

Date expiry checks are disabled by default. Set `checkDates` to `true` to enable them.

```js
// TODO [2019-11-15]: Refactor this code before the sprint ends.
// TODO (@lubien) [2019-07-18]: When John delivers his code. I can reuse it.
// TODO [2019-08-10]: I must refactor this for sure before I deliver.
```

Dates are in ISO 8601 format and use UTC as timezone.

Multiple dates on the same TODO are not valid and will be reported. There's no point in having two dates as the closest one will always be the one that is reported.

### Package Version

If you're working on an npm package, you should have a root level package.json with a `version` field as specified by npm. This condition takes place under this value.

By assigning a condition to compare a package.json `version`, the TODO will report as soon as the condition is met. It's really useful when the work is related to the version of the package itself such as deprecated APIs.

```js
// TODO [>=1.0.0]: I should work around this when we reach v1.
// TODO (@lubien) [>0]: For now this is fine but for a stable version we must refactor.
// FIXME [>10]: This feature is deprecated and should be removed from the next major version.
```

Multiple package versions on the same TODO are not valid and will be reported. Just like dates, multiple versions will make no sense as the closest one will be the one to trigger the report.

### Engine Version

In package.json, you can specify an `"engines"` field with the Node.js (`node`) versions that your package supports.

With that in mind, this condition is triggered as soon as package.json's `node` engine reaches the target version. This is particularly useful for maintainers that strive for compatibility but have plans for the future when some feature will be widely available and when support for older versions could be dropped.

Imagine you want to use `async`/`await` but for now you support Node.js versions that don't have it. Maybe you're eager to use `import` and `export` but for now you have to support CommonJS?

```js
// TODO [engine:node@>=8]: We can use async/await now.
// FIXME [engine:node@>=20.0.0]: Hey, node can use import/export now, we should refactor.
```

Argument versions should be semver compatible such as: `1.2.45`, `5.3`, `1`.

Only the `node` engine is supported by this condition.

Supported comparisons are `>` and `>=`. Comparison must have a `@` before such as `@>` and `@>=`.

### Dependency Presence

As a Node.js developer, you probably already know about package.json dependencies and devDependencies. This condition works based on the presence or absence of dependencies in both fields.

You may use `+` to trigger when a dependency is added and `-` when a dependency is removed.

```js
// TODO [-vue-function-api]: When we remove `vue-function-api` we should refactor this.
// FIXME [+read-pkg]: If we use this package we don't need to use this function below.
// XXX @lubien [+react, -jquery]: We can use React for this widget instead of jQuery.
```

Such conditions are really useful when the code depends upon changes in dependencies that are known to be happening such as `vue-function-api` that will eventually be part of `vue` itself.

### Dependency Version

Another way to make conditions based on dependencies is to look at versions. This is useful when developers know that changes in future versions of dependencies will impact their code.

```js
// TODO [vue@>=3]: Refactor to function API when it's stable.
// FIXME [cerebro@>0.10.0]: This is a quickfix until cerebro fixes this.
// XXX [popura@>=2.0.0]: This API is deprecated so we should not use it by then.
```

Argument versions should be semver compatible such as: `1.2.45`, `5.3`, `1`.

Supported comparisons are `>` and `>=`. Comparison must have a `@` before such as `@>` and `@>=`.

Package manager catalogs (`catalog:` version references in `package.json`) are not resolved; dependency and peer dependency version checks that use them are reported as unsupported.

### Peer Dependency Version

If your package declares `peerDependencies`, you can make conditions based on the **minimum supported version** of a peer dependency. This is useful when you want a TODO to trigger once you bump the lowest version you support, for example to drop a fallback for a deprecated API.

```js
// TODO [peer:eslint@>=9]: Drop the `CLIEngine` fallback once we require ESLint 9.
```

The peer dependency value is a version range (such as `>=8`, `^8 || ^9`), so the comparison is made against the **floor** of that range. For example, with `"eslint": "^8 || ^9"` the minimum supported version is `8`, so `[peer:eslint@>=9]` will **not** trigger; it triggers only once the floor reaches `9`.

This condition is separate from the Dependency Version condition, which only checks `dependencies` and `devDependencies`. Use `peer:` when the same package can appear in both with independent versions.

Argument versions should be semver compatible such as: `1.2.45`, `5.3`, `1`.

Supported comparisons are `>` and `>=`. Comparison must have a `@` before such as `@>` and `@>=`.

### Pre-releases

TODO comments with rules for package.json and dependency versions support the semver pre-release format, such as `1.0.0-my.pre.release.1.2.3`. This means that if your TODO asks for version `>=1.0.0` and you're in `1.0.0-beta`, your TODO will **not** trigger as a pre-release comes first. When the version is at least `1.0.0`, it will properly trigger.

Keep in mind that pre-releases compare by number and alphabetical order. Example: `1.0.0-alpha` < `1.0.0-alpha.1` < `1.0.0-alpha.beta` < `1.0.0-beta` < `1.0.0-beta.2` < `1.0.0-beta.11` < `1.0.0-rc.1` < `1.0.0`.

You can read more about the semver pre-release format here and semver precedence rules here.

### Combinations

Any combination of rules is possible as long as you separate them by commas. Each condition **triggers an individual report.**

```js
// TODO [+react, -jquery]: We can use React for this widget instead of jQuery.
// TODO [2019-07-15, +react]: Refactor this if we install React or if we reach that date.
// TODO [-vue-function-api, vue@>=3]: Now we should use Vue native function API.
```

### Block Comments

You can also use block comments to specify TODOs with conditions. Each line can have its own set of conditions. This is especially useful when you aim for more details.

```js
/*
 * We should really make this code better.
 * When we support Node.js 12 we can refactor imports.
 * And we also can do [x], [y], [z].
 * TODO [engine:node@>=12]: Use import/export.
 */

/*
 * This code would be so easy if we used `popura` package helpers.
 * When you can, install `popura`, use it and remove dead code.
 * TODO [+popura]: Refactor to use `popura`.
 *
 * You can also use `popura-cli` since we want help on [feature].
 * TODO [+popura-cli]: Document how to use `popura-cli`.
 */
```

### CSS

When used with `@eslint/css`, this rule can check CSS block comments too.

```css
/* TODO [2019-11-15]: Remove this fallback. */
.outdated {
	color: hotpink;
}
```

### HTML

When used with `@html-eslint/eslint-plugin`, this rule can check HTML comments too.

```html
<!-- TODO [2019-11-15]: Remove this fallback. -->
<div class="outdated"></div>
```

### JSONC / JSON5

When used with `@eslint/json`, this rule can check line comments in `.jsonc` and `.json5` files too.

```jsonc
// TODO [2019-11-15]: Update this configuration.
{
	"key": "value"
}
```

### Markdown

When used with `@eslint/markdown`, this rule can check HTML comments in Markdown files too.

```md
<!-- TODO [2019-11-15]: Update this section. -->

# Heading
```

### YAML

When used with `eslint-plugin-yml`, this rule can check comments in YAML files too.

```yaml
# TODO [2019-11-15]: Update this configuration.
key: value
```

## Disallow Warning Comments (no-warning-comments)

This rule implements `eslint/no-warning-comments`.

The sole difference is that first we check for **valid conditions** to apply this rule. If no valid conditions are met, we fall back to `eslint/no-warning-comments` if `allowWarningComments` is set to `false` (default `true`) and you'll see something like `Unexpected 'todo': 'TODO: …'.`

The reason behind this is that now that you have a powerful rule to make sure there are no stray TODOs on your code, you should strive for best practices. Don't just add TODO comments and leave them forever. Define conditions to justify the presence of warning comments.

With that in mind, you **could** disable that ESLint rule in favor of this one as you will get its same behavior and more.

Since by default the option `allowWarningComments` is `true`, both rules can coexist even with different reporting levels. For example, one might want to error when conditions are met, but just warn on TODOs without conditions (See `allowWarningComments` below).

## Legacy Branches

Although this rule works just fine when you maintain a `main` branch, it gets trickier when you have legacy branches that happen to have unclosed TODOs.

Imagine you maintain a `main` branch at a version such as 10 and always keep working on it and also keep fixing your TODOs. But your package happens to **publish and support** legacy branches such as 8 and 9 for long term support with code such as security patches, meaning you might have stray TODOs that won't get fixed and will cause your build to break unless you either fix or drop the TODO.

## Conditions Overview

- `[YYYY-MM-DD]` to define a UTC due date in the ISO 8601 format.
- `[>1]` or `[>=2]` to expire at some version (from package.json). No whitespace.
- `[+package]` or `[-package]` to expire when you add/remove a package.
- `[package@>1]` or `[package@>=2]` to expire when a package hits some version. No whitespace.
- `[peer:eslint@>9]` or `[peer:eslint@>=9]` to expire when a peer dependency's minimum supported version reaches some version. No whitespace.
- `[engine:node@>8]` or `[engine:node@>=8]` to expire when the package bumps to the supported engines. No whitespace.

## Overall Information

- Multiple conditions can be separated by comma:
  `[YYYY-MM-DD, +foo-package, engine:node@>=8, bar-package@>=2]`.
- You cannot stack multiple dates or multiple versions of
  your package on the same TODO.
- You can use either `TODO`, `FIXME`, or `XXX`. You can change
  these using options. (See options.terms).
- TODOs may have any string before arguments. Really useful
  when you want to highlight more information such as author name
  like `TODO (lubien) [2019-05-30]` or `TODO @lubien [2019-05-30]`.
- TODOs may or may not have a colon before the message such as
  `TODO [...]: message` or `TODO [...] message`.
- If no proper argument is found, you'll be notified that the TODO is useless (See `eslint/no-warning-comments`).
- CSS, HTML, JSONC, JSON5, Markdown, SOML, TOML, and YAML comments are supported with their respective ESLint plugins.

## Examples

```js
// ❌
// With `checkDates: true`
// TODO [2000-01-01]: I'll fix this next week.
// TODO [2000-01-01, 2001-01-01]: Multiple dates won't work.

// TODO [>1]: If your package.json version is > 1.
// TODO [>=1]: If your package.json version is >= 1.
// TODO [>1, >2]: Multiple package versions won't work.

// TODO [+already-have-pkg]: Since we already have it, this reports.
// TODO [-we-dont-have-this-package]: Since we don't have, trigger a report.

// TODO [read-pkg@>1]: When `read-pkg` version is > 1 don't forget to do this.
// TODO [read-pkg@>=5.1.1]: When `read-pkg` version is >= 5.1.1 don't forget to do that.

// TODO [peer:eslint@>=8]: Whoops, our minimum supported `eslint` is already >= 8.

// TODO [engine:node@>=8]: Whoops, we are already supporting it!

// TODO: Add unicorns.
```

```js
// ✅
// TODO [2200-12-25]: Too long... Can you feel it?
// FIXME [2200-12-25]: Too long... Can you feel it?

// TODO (lubien) [2200-12-12]: You can add something before the arguments.
// TODO @lubien [2200-12-12]: You can add something before the arguments.
// FIXME [2200-12-25] (lubien): You can add something after the arguments, before the colon.
// TODO [2200-12-12] No colon after argument.

// TODO [+react]: Refactor this when we use React.
// TODO [-lodash]: If we remove lodash we need to change this.

// TODO [lodash@>10]: Lodash has a new way to do this; when we bump to its version let's use it.
// TODO [lodash@>=10]: Lodash has a new way to do this; when we bump to its version let's use it.

// TODO [2200-12-25, +popura, lodash@>10]: Combo.

// TODO [peer:eslint@>=99]: When our minimum supported `eslint` reaches v99.

// TODO [engine:node@>12]: When we bump to this Node version we can use import/export.

/*
 * TODO [2200-12-25]: Yet
 * TODO [2200-12-25]: Another
 * TODO [2200-12-25]: Way
 */
```
