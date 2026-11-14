---
title: "consistent-assert"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/consistent-assert.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# consistent-assert

📝 Enforce consistent assertion style with `node:assert`.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Prefer `assert.ok()` over `assert()` for its explicit intent and better readability. It aligns with other assert methods, ensuring consistency and making code easier to maintain and understand.

## Examples

```js
import assert from 'node:assert/strict';

assert.strictEqual(actual, expected);
assert.deepStrictEqual(actual, expected);

// ❌
assert(divide(10, 2) === 5);

// ✅
assert.ok(divide(10, 2) === 5);
```

```js
import assert from 'node:assert';

assert.strictEqual(actual, expected);
assert.deepStrictEqual(actual, expected);

// ❌
assert(divide(10, 2) === 5);

// ✅
assert.ok(divide(10, 2) === 5);
```

```js
import {strict as assert} from 'node:assert';

assert.strictEqual(actual, expected);
assert.deepStrictEqual(actual, expected);

// ❌
assert(divide(10, 2) === 5);

// ✅
assert.ok(divide(10, 2) === 5);
```
