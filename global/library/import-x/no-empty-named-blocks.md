---
title: "import-x/no-empty-named-blocks"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/no-empty-named-blocks.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/no-empty-named-blocks

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Reports the use of empty named import blocks.

## Rule Details

### Valid

```js
import { mod } from 'mod'
import Default, { mod } from 'mod'
```

When using typescript

```js
import type { mod } from 'mod'
```

When using flow

```js
import typeof { mod } from 'mod'
```

### Invalid

```js
import {} from 'mod'
import Default from 'mod'
```

When using typescript

```js
import type Default, {} from 'mod'
import type {} from 'mod'
```

When using flow

```js
import typeof {} from 'mod'
import typeof Default, {} from 'mod'
```
