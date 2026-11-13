---
title: "no-late-event-control"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-late-event-control.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-late-event-control

📝 Disallow event-control method calls after the synchronous event dispatch has finished.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

`event.preventDefault()`, `event.stopPropagation()`, and `event.stopImmediatePropagation()` only affect the event while it is being dispatched synchronously. After an `await`, deferred callback, or generator-handler call, event dispatch has already continued or finished, so these calls are too late to cancel the default action or stop propagation.

Call event-control methods before the handler suspends. Do not use generator functions as event handlers when event control is needed, because their body does not run during dispatch.

## Examples

```js
// ❌
element.addEventListener('click', async event => {
	await save();
	event.preventDefault();
});

// ✅
element.addEventListener('click', async event => {
	event.preventDefault();
	await save();
});
```

```js
// ❌
element.addEventListener('click', event => {
	setTimeout(() => {
		event.stopPropagation();
	});
});

// ✅
element.addEventListener('click', event => {
	event.stopPropagation();
	setTimeout(() => {
		update();
	});
});
```

## Limitations

- Any event-control call inside a nested function is flagged, even when the function runs synchronously (for example, `array.map(() => event.preventDefault())`). Call it in the outer handler to make the synchronous timing explicit.
- Any event-control call inside a generator handler is flagged, because calling the generator creates an iterator instead of running the handler body during event dispatch.
- The check is not flow-sensitive. An event-control call is flagged whenever an `await` or `yield` appears earlier in source, even when they are in mutually exclusive branches that can never both run.
- Passing the whole `event` object to another function cannot be detected, so a late event-control call in that function is not reported:

```js
function prevent(event) {
	event.preventDefault();
}

element.addEventListener('click', event => {
	setTimeout(prevent, 1, event);
});
```
