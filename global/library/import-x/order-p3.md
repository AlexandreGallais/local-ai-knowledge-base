---
title: "import-x/order (part 3 of 3)"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/order.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/order (part 3 of 3)

### `warnOnUnassignedImports`

Valid values: `boolean | "top"` \
Default: `false`

When set to `true`, warn when "unassigned" imports are out of order.
Unassigned imports are imports with no corresponding identifiers (e.g. `import './my/thing.js'` or `require('./side-effects.js')`).

When set to `"top"`, no-specifier ESM imports (e.g. `import './my/thing.js'`) must come before every assigned import.
Their relative order is preserved, they are not alphabetized, and bare `require()` calls are unaffected.

> **Note:**
>
> These warnings are not fixable with `--fix` since unassigned imports might be used for their side-effects,
> and changing the order of such imports cannot be done safely.

#### Example

Given the following settings:

```jsonc
{
  "import-x/order": [
    "error",
    {
      "warnOnUnassignedImports": true,
    },
  ],
}
```

This will fail the rule check:

```ts
import fs from 'fs'
import './styles.css'
import path from 'path'
```

While this will pass:

```ts
import fs from 'fs'
import path from 'path'
import './styles.css'
```

#### `"top"` mode

Given the following settings:

```jsonc
{
  "import-x/order": [
    "error",
    {
      "warnOnUnassignedImports": "top",
    },
  ],
}
```

This will fail the rule check:

```ts
import fs from 'fs'
import './styles.css'
```

While this will pass:

```ts
import './styles.css'
import fs from 'fs'
```

### `sortTypesGroup`

Valid values: `boolean` \
Default: `false`

> **Note:**
>
> This setting is only meaningful when `"type"` is included in `groups`.

Sort type-only imports separately from normal non-type imports.

When enabled, the intragroup sort order of type-only imports will mirror the intergroup ordering of normal imports as defined by `groups`, `pathGroups`, etc.

#### Example

Given the following settings:

```jsonc
{
  "import-x/order": [
    "error",
    {
      "groups": ["type", "builtin", "parent", "sibling", "index"],
      "alphabetize": { "order": "asc" },
    },
  ],
}
```

This will fail the rule check even though it's logically ordered as we expect (builtins come before parents, parents come before siblings, siblings come before indices), the only difference is we separated type-only imports from normal imports:

```ts
import type A from 'fs'
import type B from 'path'
import type C from '../foo.js'
import type D from './bar.js'
import type E from './'

import a from 'fs'
import b from 'path'
import c from '../foo.js'
import d from './bar.js'
import e from './'
```

This happens because type-only imports are considered part of one global
`"type"` group by default. However, if we set
`sortTypesGroup` to `true`:

```jsonc
{
  "import-x/order": [
    "error",
    {
      "groups": ["type", "builtin", "parent", "sibling", "index"],
      "alphabetize": { "order": "asc" },
      "sortTypesGroup": true,
    },
  ],
}
```

The same example will pass.

### `newlines-between-types`

Valid values: `"ignore" | "always" | "always-and-inside-groups" | "never"` \
Default: the value of `newlines-between`

> **Note:**
>
> This setting is only meaningful when `sortTypesGroup` is enabled.

`newlines-between-types` is functionally identical to `newlines-between` except it only enforces or forbids new lines between _type-only import groups_, which exist only when `sortTypesGroup` is enabled.

The boundary between the type-only imports and the normal imports is governed by both settings, except that `newlines-between-types: "ignore"` disables newline enforcement at that boundary.

#### Example

Given the following settings:

```jsonc
{
  "import-x/order": [
    "error",
    {
      "groups": ["type", "builtin", "parent", "sibling", "index"],
      "sortTypesGroup": true,
      "newlines-between": "always",
    },
  ],
}
```

This will fail the rule check:

```ts
import type A from 'fs'
import type B from 'path'
import type C from '../foo.js'
import type D from './bar.js'
import type E from './'

import a from 'fs'
import b from 'path'

import c from '../foo.js'

import d from './bar.js'

import e from './'
```

However, if we set `newlines-between-types` to `"ignore"`:

```jsonc
{
  "import-x/order": [
    "error",
    {
      "groups": ["type", "builtin", "parent", "sibling", "index"],
      "sortTypesGroup": true,
      "newlines-between": "always",
      "newlines-between-types": "ignore",
    },
  ],
}
```

The same example will pass.

Note the new line after `import type E from './';` but before `import a from "fs";`. This new line separates the type-only imports from the normal imports. Because `newlines-between-types` is `"ignore"`, the boundary is not enforced or forbidden by either setting, so the new line is optional.

> **Important:**
>
> In certain situations, `consolidateIslands: true` will take precedence over `newlines-between-types: "never"`, if used, when it comes to the new line separating type-only imports from normal imports.

The next example will pass even though there's a new line preceding the normal import and `newlines-between` is set to `"never"`:

```jsonc
{
  "import-x/order": [
    "error",
    {
      "groups": ["type", "builtin", "parent", "sibling", "index"],
      "sortTypesGroup": true,
      "newlines-between": "never",
      "newlines-between-types": "always",
    },
  ],
}
```

```ts
import type A from 'fs'

import type B from 'path'

import type C from '../foo.js'

import type D from './bar.js'

import type E from './'

import a from 'fs'
import b from 'path'
import c from '../foo.js'
import d from './bar.js'
import e from './'
```

The following passes because `newlines-between: "always"` requires the new line between the last type import and the first normal import, even when `newlines-between-types` is `"never"`:

```jsonc
{
  "import-x/order": [
    "error",
    {
      "groups": ["type", "builtin", "parent", "sibling", "index"],
      "sortTypesGroup": true,
      "newlines-between": "always",
      "newlines-between-types": "never",
    },
  ],
}
```

```ts
import type A from 'fs'
import type B from 'path'
import type C from '../foo.js'
import type D from './bar.js'
import type E from './'

import a from 'fs'

import b from 'path'

import c from '../foo.js'

import d from './bar.js'

import e from './'
```

### `consolidateIslands`

Valid values: `"inside-groups" | "never"` \
Default: `"never"`

> **Note:**
>
> This setting is only meaningful when `newlines-between` and/or `newlines-between-types` is set to `"always-and-inside-groups"`.

When set to `"inside-groups"`, this ensures imports spanning multiple lines are separated from other imports with a new line while single-line imports are grouped together (and the space between them consolidated) if they belong to the same group or `pathGroups`.

> **Important:**
>
> When all of the following are true:
>
> - `sortTypesGroup` is set to `true`
> - `consolidateIslands` is set to `"inside-groups"`
> - `newlines-between` is set to `"always-and-inside-groups"` when `newlines-between-types` is set to `"never"` (or vice-versa)
>
> Then `newlines-between`/`newlines-between-types` will yield to
> `consolidateIslands` and allow new lines to separate multi-line imports
> regardless of the `"never"` setting.
>
> This configuration is useful, for instance, to keep single-line type-only
> imports stacked tightly together at the bottom of your import block to
> preserve space while still logically organizing normal imports for quick and
> pleasant reference.

#### Example

Given the following settings:

```jsonc
{
  "import-x/order": [
    "error",
    {
      "newlines-between": "always-and-inside-groups",
      "consolidateIslands": "inside-groups",
    },
  ],
}
```

This will fail the rule check:

```ts
var fs = require('fs')
var path = require('path')
var { util1, util2, util3 } = require('util')
var async = require('async')
var relParent1 = require('../foo')
var { relParent21, relParent22, relParent23, relParent24 } = require('../')
var relParent3 = require('../bar')
var { sibling1, sibling2, sibling3 } = require('./foo')
var sibling2 = require('./bar')
var sibling3 = require('./foobar')
```

While this will succeed (and is what `--fix` would yield):

```ts
var fs = require('fs')
var path = require('path')
var { util1, util2, util3 } = require('util')

var async = require('async')

var relParent1 = require('../foo')

var { relParent21, relParent22, relParent23, relParent24 } = require('../')

var relParent3 = require('../bar')

var { sibling1, sibling2, sibling3 } = require('./foo')

var sibling2 = require('./bar')
var sibling3 = require('./foobar')
```

Note the intragroup "islands" of grouped single-line imports, as well as multi-line imports, are surrounded by new lines. At the same time, note the typical new lines separating different groups are still maintained thanks to `newlines-between`.

The same holds true for the next example; when given the following settings:

```jsonc
{
  "import-x/order": [
    "error",
    {
      "alphabetize": { "order": "asc" },
      "groups": ["external", "internal", "index", "type"],
      "pathGroups": [
        {
          "pattern": "dirA/**",
          "group": "internal",
          "position": "after",
        },
        {
          "pattern": "dirB/**",
          "group": "internal",
          "position": "before",
        },
        {
          "pattern": "dirC/**",
          "group": "internal",
        },
      ],
      "newlines-between": "always-and-inside-groups",
      "newlines-between-types": "never",
      "pathGroupsExcludedImportTypes": [],
      "sortTypesGroup": true,
      "consolidateIslands": "inside-groups",
    },
  ],
}
```

> **Important:**
>
> **Pay special attention to the value of `pathGroupsExcludedImportTypes`** in this example's settings.
> Without it, the successful example below would fail.
> This is because the imports with specifiers starting with "dirA/", "dirB/", and "dirC/" are all considered part of the `"external"` group, and imports in that group are excluded from `pathGroups` matching by default.
>
> The fix is to remove `"external"` (and, in this example, the others) from `pathGroupsExcludedImportTypes`.

This will fail the rule check:

```ts
import c from 'Bar'
import d from 'bar'
import { aa, bb, cc, dd, ee, ff, gg } from 'baz'
import { hh, ii, jj, kk, ll, mm, nn } from 'fizz'
import a from 'foo'
import b from 'dirA/bar'
import index from './'
import type { AA, BB, CC } from 'abc'
import type { Z } from 'fizz'
import type { A, B } from 'foo'
import type { C2 } from 'dirB/Bar'
import type { D2, X2, Y2 } from 'dirB/bar'
import type { E2 } from 'dirB/baz'
import type { C3 } from 'dirC/Bar'
import type { D3, X3, Y3 } from 'dirC/bar'
import type { E3 } from 'dirC/baz'
import type { F3 } from 'dirC/caz'
import type { C1 } from 'dirA/Bar'
import type { D1, X1, Y1 } from 'dirA/bar'
import type { E1 } from 'dirA/baz'
import type { F } from './index.js'
import type { G } from './aaa.js'
import type { H } from './bbb'
```

While this will succeed (and is what `--fix` would yield):

```ts
import c from 'Bar'
import d from 'bar'

import { aa, bb, cc, dd, ee, ff, gg } from 'baz'

import { hh, ii, jj, kk, ll, mm, nn } from 'fizz'

import a from 'foo'

import b from 'dirA/bar'

import index from './'

import type { AA, BB, CC } from 'abc'

import type { Z } from 'fizz'

import type { A, B } from 'foo'

import type { C2 } from 'dirB/Bar'

import type { D2, X2, Y2 } from 'dirB/bar'

import type { E2 } from 'dirB/baz'
import type { C3 } from 'dirC/Bar'

import type { D3, X3, Y3 } from 'dirC/bar'

import type { E3 } from 'dirC/baz'
import type { F3 } from 'dirC/caz'
import type { C1 } from 'dirA/Bar'

import type { D1, X1, Y1 } from 'dirA/bar'

import type { E1 } from 'dirA/baz'
import type { F } from './index.js'
import type { G } from './aaa.js'
import type { H } from './bbb'
```

## Related

- `import-x/external-module-folders`
- `import-x/internal-regex`
- `import-x/core-modules`
