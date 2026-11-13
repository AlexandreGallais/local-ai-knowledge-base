---
title: "import-x/no-named-default"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/no-named-default.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/no-named-default

Reports use of a default export as a locally named import.

Rationale: the syntax exists to import default exports expressively, let's use it.

Note that type imports, as used by [Flow], are always ignored.

## Rule Details

Given:

```js
// foo.js
export default 'foo'
export const bar = 'baz'
```

...these would be valid:

```js
import foo from './foo.js'
import foo, { bar } from './foo.js'
```

...and these would be reported:

```js
// message: Using exported name 'bar' as identifier for default export.
import { default as foo } from './foo.js'
import { default as foo, bar } from './foo.js'
```
