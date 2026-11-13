---
title: "no-exports-in-scripts"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-exports-in-scripts.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-exports-in-scripts

📝 Disallow exports in scripts.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

Scripts are meant to be executed directly, not imported as modules.

Exports in a script mix module and script boundaries and can mislead readers about how the file is intended to run.

## Examples

This script fails:

```js
#!/usr/bin/env node
export const foo = 1;
```

This script passes:

```js
#!/usr/bin/env node
const foo = 1;
console.log(foo);
```

Modules pass:

```js
export const foo = 1;
```
