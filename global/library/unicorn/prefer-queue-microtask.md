---
title: "prefer-queue-microtask"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-queue-microtask.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-queue-microtask

📝 Prefer `queueMicrotask()` over `process.nextTick()`, `setImmediate()`, and `setTimeout(…, 0)`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

`queueMicrotask()` is a portable way to queue a microtask in browsers and Node.js.

Prefer it over `process.nextTick()` for most userland code. The rule can also check `setImmediate()` and `setTimeout(…, 0)` when enabled.

## Examples

```js
// ❌
process.nextTick(callback);

// ✅
queueMicrotask(callback);
```

```js
// ❌
process.nextTick(callback, value);

// ✅
queueMicrotask(() => callback(value));
```

Only direct calls with one callback are autofixed. Calls with forwarded arguments are reported without a fix.

## Options

Type: `object`

### checkSetImmediate

Type: `boolean`\
Default: `false`

Check `setImmediate(callback)`.

Only calls whose timer handle is unused and whose callback is not obviously non-callable are checked. Used timer handles are ignored because `queueMicrotask()` cannot preserve them. Calls with extra arguments, or with a `function` callback that uses `this`, are reported without a fix. The timer calls the callback with the timer as `this`, but `queueMicrotask()` calls it with `this` as `undefined`.

```js
/* eslint unicorn/prefer-queue-microtask: ["error", {"checkSetImmediate": true}] */

// ❌
setImmediate(callback);

// ✅
queueMicrotask(callback);
```

### checkSetTimeout

Type: `boolean`\
Default: `false`

Check `setTimeout(callback, 0)`.

Only calls whose timer handle is unused and whose callback is not obviously non-callable are checked. Used timer handles are ignored because `queueMicrotask()` cannot preserve them. Calls with extra arguments or with a `function` callback that uses `this` are reported without a fix.

```js
/* eslint unicorn/prefer-queue-microtask: ["error", {"checkSetTimeout": true}] */

// ❌
setTimeout(callback, 0);

// ✅
queueMicrotask(callback);
```
