---
title: "prefer-while-loop-condition"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-while-loop-condition.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-while-loop-condition

📝 Prefer putting the condition in the while statement.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

When a constant infinite loop immediately checks a condition and breaks, the loop condition is split across two places. Put the condition in the `while` statement so the loop's continuation condition is visible where readers expect it.

The rule only reports simple top-of-loop guards in `while (true)`, `for (;;)`, `for (; true;)`, and `do ... while (true)` loops. Loops with labels or additional `break` statements targeting the same loop are ignored. Comments around the guard or loop syntax prevent fixes.

## Examples

```js
// ❌
while (true) {
	if (!hasMore()) {
		break;
	}

	processNext();
}
```

```js
// ✅
while (hasMore()) {
	processNext();
}
```

```js
// ❌
do {
	if (!hasMore()) {
		break;
	}

	processNext();
} while (true);
```

```js
// ✅
while (hasMore()) {
	processNext();
}
```

```js
// ❌
while (true) {
	if (done) {
		break;
	}

	processNext();
}
```

```js
// ✅
while (!done) {
	processNext();
}
```

```js
// ❌
for (;;) {
	if (!hasMore()) {
		break;
	}

	processNext();
}
```

```js
// ✅
while (hasMore()) {
	processNext();
}
```
