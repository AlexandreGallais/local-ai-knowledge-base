---
title: "prefer-event-target"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-event-target.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-event-target

📝 Prefer `EventTarget` over `EventEmitter`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

While `EventEmitter` is only available in Node.js, `EventTarget` is also available in _Deno_ and browsers.

This rule reduces the bundle size and makes your code more cross-platform friendly.

See the differences between `EventEmitter` and `EventTarget`.

## Examples

```js
// ❌
import {EventEmitter} from 'node:events';

class Foo extends EventEmitter {}

// ✅
class Foo extends EventTarget {}
```

```js
// ❌
import {EventEmitter} from 'node:events';

const emitter = new EventEmitter();

// ✅
const target = new EventTarget();
```
