---
title: "import-x/no-named-as-default"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/no-named-as-default.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/no-named-as-default

⚠️ This rule _warns_ in the following configs: ☑️ `flat/recommended`, 🚸 `flat/warnings`, ☑️ `recommended`, 🚸 `warnings`.

Reports use of an exported name as the locally imported name of a default export.

Rationale: using an exported name as the name of the default export is likely...

- _misleading_: others familiar with `foo.js` probably expect the name to be `foo`
- _a mistake_: only needed to import `bar` and forgot the brackets (the case that is prompting this)

## Rule Details

Given:

```js
// foo.js
export default 'foo'
export const bar = 'baz'
```

...this would be valid:

```js
import foo from './foo.js'
```

...and this would be reported:

```js
// message: Using exported name 'bar' as identifier for default export.
import bar from './foo.js'
```

A type and a value can share a name in TypeScript, so a default that is only a value, imported under the name of an exported type, is valid. A default that also declares a type, like `export default class`, is still reported:

```ts
// foo.ts
export type Foo = string
export default 'foo'

// valid:
import Foo from './foo'

// message: Using exported name 'Foo' as identifier for default export.
import type Foo from './foo'
```

For post-ES2015 `export` extensions, this also prevents exporting the default from a referenced module as a name within that module, for the same reasons:

```js
// valid:
export foo from './foo.js'

// message: Using exported name 'bar' as identifier for default export.
export bar from './foo.js'
```

## Further Reading

- ECMAScript Proposal: [export ns from]
- ECMAScript Proposal: [export default from]
