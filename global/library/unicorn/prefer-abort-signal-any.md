---
title: "prefer-abort-signal-any"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-abort-signal-any.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-abort-signal-any

📝 Prefer `AbortSignal.any()` over manually forwarding abort events between signals.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

💡 This rule is manually fixable by editor suggestions.

`AbortSignal.any()` creates an `AbortSignal` that aborts when any of the input signals abort. It avoids creating an extra `AbortController` and manually forwarding `abort` events from each input signal.

This rule only reports simple patterns where the controller is otherwise only used through `.signal`. Cases that inspect the composed signal's abort reason or alias the signal are ignored, as `AbortSignal.any()` preserves the reason from the first input signal to abort while manual bridging often does not.

## Examples

```js
// ❌
const abortController = new AbortController();

for (const signal of signals) {
	signal.addEventListener('abort', () => abortController.abort());
}

await fetch(url, {signal: abortController.signal});
```

```js
// ✅
const abortSignal = AbortSignal.any(signals);

await fetch(url, {signal: abortSignal});
```

```js
// ❌
const abortController = new AbortController();

firstSignal.addEventListener('abort', () => abortController.abort());
secondSignal.addEventListener('abort', () => abortController.abort());

await fetch(url, {signal: abortController.signal});
```

```js
// ✅
const abortSignal = AbortSignal.any([firstSignal, secondSignal]);

await fetch(url, {signal: abortSignal});
```

Controllers with other behavior are intentionally ignored.

```js
// ✅
const abortController = new AbortController();

signal.addEventListener('abort', () => abortController.abort());
button.addEventListener('click', () => abortController.abort());

await fetch(url, {signal: abortController.signal});
```
