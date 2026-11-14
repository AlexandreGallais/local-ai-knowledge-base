---
title: "prefer-abort-signal-timeout"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-abort-signal-timeout.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-abort-signal-timeout

📝 Prefer `AbortSignal.timeout()` over manually aborting an `AbortController` with `setTimeout()`.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

💡 This rule is manually fixable by editor suggestions.

`AbortSignal.timeout()` creates an `AbortSignal` that automatically aborts after a delay. It avoids the extra `AbortController` and manual timer setup.

This rule only reports the simple adjacent-statement pattern where the controller is otherwise only used through `.signal`. Cases that inspect the abort reason or alias the signal are ignored, as `AbortSignal.timeout()` uses a timeout-specific reason. Dynamic delay expressions are assumed to already be valid `AbortSignal.timeout()` delays within the unclamped `setTimeout()` range.

## Examples

```js
// ❌
const abortController = new AbortController();
setTimeout(() => abortController.abort(), 1000);

await fetch(url, {signal: abortController.signal});
```

```js
// ✅
const abortSignal = AbortSignal.timeout(1000);

await fetch(url, {signal: abortSignal});
```

Controllers with other behavior are intentionally ignored.

```js
// ✅
const abortController = new AbortController();
setTimeout(() => abortController.abort(), 1000);
button.addEventListener('click', () => abortController.abort());

await fetch(url, {signal: abortController.signal});
```
