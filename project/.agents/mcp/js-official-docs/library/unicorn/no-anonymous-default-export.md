---
title: "no-anonymous-default-export"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-anonymous-default-export.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-anonymous-default-export

📝 Disallow anonymous functions and classes as the default export.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Naming default exports improves codebase searchability by ensuring consistent identifier use for a module's default export, both where it's declared and where it's imported.

## Examples

```js
// ❌
export default class {}

// ✅
export default class Foo {}
```

```js
// ❌
export default function () {}

// ✅
export default function foo() {}
```

```js
// ❌
export default () => {};

// ✅
const foo = () => {};
export default foo;
```

```js
// ❌
module.exports = class {};

// ✅
module.exports = class Foo {};
```

```js
// ❌
module.exports = function () {};

// ✅
module.exports = function foo() {};
```

```js
// ❌
module.exports = () => {};

// ✅
const foo = () => {};
module.exports = foo;
```
