---
title: "no-process-exit"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-process-exit.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-process-exit

📝 Disallow `process.exit()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

This rule is an extension to ESLint's `no-process-exit` rule. Calling `process.exit()` abruptly terminates the process and can bypass <example-value> error propagation and cleanup, so this rule restricts it to files with a hashbang, process event handlers, and files that statically load `worker_threads`.

## Replacement for ESLint `no-process-exit`

This rule replaces ESLint's built-in `no-process-exit` rule, which Unicorn presets disable when this rule is enabled.

## Examples

```js
// ❌
process.exit(0);

// ✅
#!/usr/bin/env node
process.exit(0);
```

```js
// ✅
process.on('SIGINT', () => {
	console.log('Got SIGINT');
	process.exit(1);
});
```

```js
// ✅
import workerThreads from 'node:worker_threads';

try {
	// Do something…
	process.exit(0);
} catch (_) {
	process.exit(1);
}
```
