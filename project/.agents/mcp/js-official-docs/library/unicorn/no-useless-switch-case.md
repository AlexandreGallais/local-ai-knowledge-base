---
title: "no-useless-switch-case"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-useless-switch-case.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-useless-switch-case

📝 Disallow useless case in switch statements.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

An empty case before the last default case is useless.

Removing it avoids suggesting that the case has distinct behavior when execution would immediately enter the default case.

In TypeScript files, empty `case null:`, `case undefined:`, and `case void 0:` before `default:` are allowed so type-aware exhaustiveness checks can require explicit nullish union members while `default:` still handles unexpected values.

## Examples

```js
// ❌
switch (foo) {
	case 1:
	default:
		handleDefaultCase();
		break;
}

// ✅
switch (foo) {
	default:
		handleDefaultCase();
		break;
}
```

```js
// ✅
switch (foo) {
	case 1:
	case 2:
		handleCase1And2();
		break;
}
```

```js
// ✅
switch (foo) {
	case 1:
		handleCase1();
		break;
	default:
		handleDefaultCase();
		break;
}
```

```js
// ✅
switch (foo) {
	case 1:
		handleCase1();
		// Fallthrough
	default:
		handleDefaultCase();
		break;
}
```

```js
// ✅
switch (foo) {
	// This is actually useless, but we only check cases where the last case is the `default` case
	case 1:
	default:
		handleDefaultCase();
		break;
	case 2:
		handleCase2();
		break;
}
```
