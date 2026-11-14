---
title: "prefer-else-if"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-else-if.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-else-if

📝 Prefer `else if` over adjacent `if` statements with related conditions.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Prefer `else if` when adjacent `if` statements compare the same identifier or static member expression against mutually exclusive static values. This makes the control flow explicit and avoids evaluating later conditions after an earlier match.

This rule reports adjacent sibling `if` statements with strict equality checks. An existing `if`/`else if` chain counts as one side of the pair, as long as it has no trailing `else`, so partially fixed code is still reported. It also understands shorthand boolean tests like `if (foo)`, `if (!foo)`, and `if (Boolean(foo))` when the checked value is known to be boolean from syntax, TypeScript annotations, static values, or type information. It skips branches that exit, since `no-useless-else` intentionally prefers the flat form there.

This rule only autofixes normalized plain identifier discriminants when the previous branches and the later conditions have no side effects. Other reported cases may offer a suggestion, since adding `else` can change behavior if state changes between checks or a later condition has observable effects.

## Examples

```js
// ❌
if (foo === 1) {
	one();
}

if (foo === 2) {
	two();
}

// ✅
if (foo === 1) {
	one();
} else if (foo === 2) {
	two();
}
```

## Related rules

- `prefer-switch` handles existing `if`/`else if` chains with enough cases and can then prefer `switch`.
- `no-lonely-if` handles nested `else { if (...) }`, not adjacent sibling `if` statements.
- `no-useless-else` removes `else` after exiting branches; this rule skips those cases.
