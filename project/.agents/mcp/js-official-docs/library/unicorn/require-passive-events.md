---
title: "require-passive-events"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/require-passive-events.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# require-passive-events

📝 Require passive event listeners for high-frequency events.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Require passive event listeners for high-frequency events.

Passive listeners let the browser handle scrolling without waiting to see whether the handler calls `preventDefault()`, improving responsiveness.

## Examples

```js
// ❌
window.addEventListener('wheel', () => {});

// ✅
window.addEventListener('wheel', () => {}, {passive: true});
```

```js
// ✅
window.addEventListener('wheel', event => {
	event.preventDefault();
});
```

```js
// ✅
window.addEventListener('click', () => {});
```

## Limitations

Only inline listener functions are checked. Named listeners, dynamic options, options with spreads, and opaque event parameter usage are ignored to avoid false positives.

Use `no-prevent-default-in-passive-listener` to detect callbacks that call `preventDefault()` despite explicitly being registered with `{passive: true}`.
