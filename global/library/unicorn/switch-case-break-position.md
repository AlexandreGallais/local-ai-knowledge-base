---
title: "switch-case-break-position"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/switch-case-break-position.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# switch-case-break-position

📝 Enforce consistent `break`/`return`/`continue`/`throw` position in `case` clauses.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Enforce that terminating statements (`break`, `return`, `continue`, `throw`) appear inside the block statement of a `case` clause, not after it.

This can happen when refactoring — for example, removing an `if` wrapper but leaving the `break` outside the braces.

`break` and `continue` are auto-fixed. `return` and `throw` are still reported, but are left for manual fixes because moving them into the block can change lexical binding resolution.

## Examples

```js
// ❌
switch(foo) {
	case 1: {
		doStuff();
	}
	break;
}

// ✅
switch(foo) {
	case 1: {
		doStuff();
		break;
	}
}
```
