---
title: "prefer-top-level-await"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-top-level-await.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-top-level-await

📝 Prefer top-level await over top-level promises and async function calls.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Top-level await is more readable and can prevent unhandled rejections.

Calls explicitly discarded with the `void` operator are ignored as intentional fire-and-forget work.

When full TypeScript type information is available, calls on known non-promise receivers are ignored.

## Examples

```js
// ❌
(async () => {
	try {
		await run();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
})();

// ❌
async function main() {
	try {
		await run();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

main();

// ✅
try {
	await run();
} catch (error) {
	console.error(error);
	process.exit(1);
}
```

```js
// ❌
run().catch(error => {
	console.error(error);
	process.exit(1);
});

// ✅
await run();
```

Initializing a variable directly with a top-level promise for later awaiting is allowed:

```js
// ✅
const preparationDone = prepareSomething();

export async function doSomething() {
	await preparationDone;
}
```

Assigning a top-level promise directly to a variable or property with `=`, `??=`, `||=`, or `&&=` for later awaiting is also allowed:

```js
// ✅
cache.promise ??= (async () => {
	return await prepareSomething();
})();

export async function doSomething() {
	await cache.promise;
}
```

`.cjs` and `.svelte` files are ignored.
