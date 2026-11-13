---
title: "no-prevent-default-in-passive-listener"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-prevent-default-in-passive-listener.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-prevent-default-in-passive-listener

📝 Disallow ineffective `preventDefault()` calls in passive event listeners.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Calling `preventDefault()` on the event received by a passive listener has no effect, even when the event is cancelable. This applies to every event type, including custom events.

If cancellation is intended, use `{passive: false}`. Otherwise, remove the `preventDefault()` call. This rule offers an editor suggestion to change `passive` to `false`, but does not automatically fix the code because enabling cancellation changes runtime behavior.

TypeScript wrappers on `passive` values are supported, including `true as const`. Suggestions preserve these wrappers and surrounding comments.

## Examples

```js
// ❌
element.addEventListener('wheel', event => {
	event.preventDefault();
}, {passive: true});

// ✅
element.addEventListener('wheel', event => {
	event.preventDefault();
}, {passive: false});
```

```js
// ✅
element.addEventListener('wheel', event => {
	console.log(event.deltaY);
}, {passive: true});
```

Async callbacks are checked before they suspend:

```js
// ❌
element.addEventListener('click', async event => {
	event.preventDefault();
	await save();
}, {passive: true});
```

## Limitations

- Only calls on an unreassigned first parameter, declared as an identifier, in a directly supplied arrow or function expression are checked. Calls inside nested functions and generator callbacks are ignored.
- Options must be an inline object without spreads or computed keys. The last `passive` property must be a data property with literal value `true`.
- Async calls after an earlier suspension or in repeating loop parts containing suspension are ignored. Tracking follows source order, even across mutually exclusive branches.
- Event targets are matched by method name without type analysis. Browser-default passivity and `event.returnValue` are ignored.

## Related rules

- `require-passive-events` requires passive registration for high-frequency listeners that do not need cancellation.
- `no-late-event-control` checks event-control calls after suspension or inside nested functions and generator callbacks.
