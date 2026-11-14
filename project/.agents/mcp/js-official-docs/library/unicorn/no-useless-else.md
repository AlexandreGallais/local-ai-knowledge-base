---
title: "no-useless-else"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-useless-else.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-useless-else

📝 Disallow `else` after a statement that exits.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

When an `if` branch always exits, its `else` branch is unnecessary. Moving the `else` body after the `if` makes the control flow flatter.

This rule reports branches that always exit with `return`, `throw`, `break`, `continue`, or terminal calls to the global `process.exit()` function. It uses code path analysis, so it also recognizes more complex control flow such as nested `if` statements where both branches exit, exhaustive `switch` statements, `try`/`catch`/`finally`, and infinite loops.

The autofix is conservative and skips cases where removing the `else` could affect scoped declarations, comments, or automatic semicolon insertion.

## Examples

```js
// ❌
if (foo) {
	return;
} else {
	bar();
}

// ✅
if (foo) {
	return;
}

bar();
```

```js
// ❌
if (foo) {
	throw new Error();
} else if (bar) {
	baz();
}

// ✅
if (foo) {
	throw new Error();
}

if (bar) {
	baz();
}
```

## Related rules

- ESLint `no-else-return` only checks `else` after `return`. This rule is a broader alternative that also checks `throw`, `break`, `continue`, and terminal calls to the global `process.exit()` function, and always reports `else if`.
- `unicorn/prefer-early-return` is complementary. It reports trailing conditional wrappers without `else`; this rule reports an existing `else` after an exiting branch.
