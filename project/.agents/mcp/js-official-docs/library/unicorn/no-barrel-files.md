---
title: "no-barrel-files"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-barrel-files.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-barrel-files

📝 Disallow barrel files.

🚫 Disabled by default.

A barrel file only imports and re-exports bindings, including type-only bindings, from other modules. Barrel files make it less clear where a dependency comes from and can cause consumers to load more modules than they need.

This rule treats any file whose top-level body consists only of imports and re-exports as a barrel, including a file that re-exports from only one module. It is intentionally syntax-only: it does not resolve modules or try to distinguish package entry points from internal barrel files. Disable it in intentional entry points.

At least one binding must be re-exported; files containing only empty exports are ignored. The rule recognizes ECMAScript module syntax, including TypeScript's type-only extensions.

Side-effect-only imports, including `import 'foo'` and `import {} from 'foo'`, are not part of a barrel file, so a file that combines one with re-exports is ignored.

Fix violations by removing the barrel file and importing directly from its source modules, for example, replace `import {foo} from './index.js'` with `import {foo} from './foo.js'`. Disable this rule for intentional package entry points.

## Examples

Examples of **incorrect** code for this rule:

```js
export {foo} from './foo.js';
```

```js
import {foo} from './foo.js';
export {foo};
```

```js
export * from './foo.js';
export * from './bar.js';
```

Examples of **correct** code for this rule:

```js
export const foo = 1;
```

```js
import {foo} from './foo.js';
export const bar = foo;
```

```js
export {foo} from './foo.js';
export const bar = 1;
```
