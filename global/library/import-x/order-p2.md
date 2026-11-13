---
title: "import-x/order (part 2 of 3)"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/order.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/order (part 2 of 3)

## Options

This rule supports the following options (none of which are required):

- `groups`
- `pathGroups`
- `pathGroupsExcludedImportTypes`
- `distinctGroup`
- `newlines-between`
- `alphabetize`
- `named`
- `warnOnUnassignedImports`
- `sortTypesGroup`
- `newlines-between-types`
- `consolidateIslands`

---

### `groups`

Valid values: `("builtin" | "external" | "internal" | "unknown" | "parent" | "sibling" | "index" | "object" | "type")[]` \
Default: `["builtin", "external", "parent", "sibling", "index"]`

Determines which imports are subject to ordering, and how to order
them. The predefined groups are: `"builtin"`, `"external"`, `"internal"`,
`"unknown"`, `"parent"`, `"sibling"`, `"index"`, `"object"`, and `"type"`.

The import order enforced by this rule is the same as the order of each group
in `groups`. Imports belonging to groups omitted from `groups` are lumped
together at the end.

#### Example

```jsonc
{
  "import-x/order": [
    "error",
    {
      "groups": [
        // Imports of builtins are first
        "builtin",
        // Then sibling and parent imports. They can be mingled together
        ["sibling", "parent"],
        // Then index file imports
        "index",
        // Then any arcane TypeScript imports
        "object",
        // Then the omitted imports: internal, external, type, unknown
      ],
    },
  ],
}
```

#### How Imports Are Grouped

An import (a `ImportDeclaration`, `TSImportEqualsDeclaration`, or `require()` `CallExpression`) is grouped by its type (`"require"` vs `"import"`), its specifier, and any corresponding identifiers.

```ts
import { identifier1, identifier2 } from 'specifier1'
import type { MyType } from 'specifier2'
const identifier3 = require('specifier3')
```

Roughly speaking, the grouping algorithm is as follows:

1. If the import has no corresponding identifiers (e.g. `import './my/thing.js'`), is otherwise "unassigned," or is an unsupported use of `require()`, and `warnOnUnassignedImports` is disabled, it will be ignored entirely since the order of these imports may be important for their side-effects
2. If the import is part of an arcane TypeScript declaration (e.g. `import log = console.log`), it will be considered **object**. However, note that external module references (e.g. `import x = require('z')`) are treated as normal `require()`s and import-exports (e.g. `export import w = y;`) are ignored entirely
3. If the import is type-only, `"type"` is in `groups`, and `sortTypesGroup` is disabled, it will be considered **type** (with additional implications if using `pathGroups` and `"type"` is in `pathGroupsExcludedImportTypes`)
4. If the import's specifier matches `import-x/internal-regex`, it will be considered **internal**
5. If the import's specifier is an absolute path, it will be considered **unknown**
6. If the import's specifier has the name of a Node.js core module (using is-core-module), it will be considered **builtin**
7. If the import's specifier matches `import-x/core-modules`, it will be considered **builtin**
8. If the import's specifier is a path relative to the parent directory of its containing file (e.g. starts with `../`), it will be considered **parent**
9. If the import's specifier is one of `['.', './', './index', './index.js']`, it will be considered **index**
10. If the import's specifier is a path relative to its containing file (e.g. starts with `./`), it will be considered **sibling**
11. If the import's specifier is a path pointing to a file outside the current package's root directory (determined using package-up), it will be considered **external**
12. If the import's specifier matches `import-x/external-module-folders` (defaults to matching anything pointing to files within the current package's `node_modules` directory), it will be considered **external**
13. If the import's specifier is a path pointing to a file within the current package's root directory (determined using package-up), it will be considered **internal**
14. If the import's specifier has a name that looks like a scoped package (e.g. `@scoped/package-name`), it will be considered **external**
15. If the import's specifier has a name that starts with a word character, it will be considered **external**
16. If this point is reached, the import will be ignored entirely

At the end of the process, if they co-exist in the same file, all top-level `require()` statements that haven't been ignored are shifted (with respect to their order) below any ES6 `import` or similar declarations. Finally, any type-only declarations are potentially reorganized according to `sortTypesGroup`.

### `pathGroups`

Valid values: `PathGroup[]` \
Default: `[]`

Sometimes the predefined groups are not fine-grained enough, especially when using import aliases.
`pathGroups` defines one or more `PathGroup`s relative to a predefined group.
Imports are associated with a `PathGroup` based on path matching against the import specifier (using minimatch).

> **Important:**
>
> Note that, by default, imports grouped as `"builtin"`, `"external"`, or `"object"` will not be considered for further `pathGroups` matching unless they are removed from `pathGroupsExcludedImportTypes`.

#### `PathGroup`

|     property     | required |          type          | description                                                                                                                     |
| :--------------: | :------: | :--------------------: | ------------------------------------------------------------------------------------------------------------------------------- |
|    `pattern`     |    ☑️    |        `string`        | Minimatch pattern for specifier matching                                                                                  |
| `patternOptions` |          |        `object`        | Minimatch options; default: `{nocomment: true}`                                                                           |
|     `group`      |    ☑️    | predefined group | One of the predefined groups to which matching imports will be positioned relatively                                      |
|    `position`    |          | `"after" \| "before"`  | Where, in relation to `group`, matching imports will be positioned; default: same position as `group` (neither before or after) |

#### Example

```jsonc
{
  "import-x/order": [
    "error",
    {
      "pathGroups": [
        {
          // Minimatch pattern used to match against specifiers
          "pattern": "~/**",
          // The predefined group this PathGroup is defined in relation to
          "group": "external",
          // How matching imports will be positioned relative to "group"
          "position": "after",
        },
      ],
    },
  ],
}
```

### `pathGroupsExcludedImportTypes`

Valid values: `("builtin" | "external" | "internal" | "unknown" | "parent" | "sibling" | "index" | "object" | "type")[]` \
Default: `["builtin", "external", "object"]`

By default, imports in certain groups are excluded from being matched against `pathGroups` to prevent overeager sorting.
Use `pathGroupsExcludedImportTypes` to modify which groups are excluded.

> **Tip:**
>
> If using imports with custom specifier aliases (e.g.
> you're using `eslint-import-resolver-alias`, `paths` in `tsconfig.json`, etc) that end up
> grouped as `"builtin"` or `"external"` imports,
> remove them from `pathGroupsExcludedImportTypes` to ensure they are ordered
> correctly.

#### Example

```jsonc
{
  "import-x/order": [
    "error",
    {
      "pathGroups": [
        {
          "pattern": "@app/**",
          "group": "external",
          "position": "after",
        },
      ],
      "pathGroupsExcludedImportTypes": ["builtin"],
    },
  ],
}
```

### `distinctGroup`

Valid values: `boolean` \
Default: `true`

> **Caution:**
>
> Currently, `distinctGroup` defaults to `true`. However, in a later update, the
> default will change to `false`.

This changes how `PathGroup.position` affects grouping, and is most useful when `newlines-between` is set to `always` and at least one `PathGroup` has a `position` property set.

When `newlines-between` is set to `always` and an import matching a specific `PathGroup.pattern` is encountered, that import is added to a sort of "sub-group" associated with that `PathGroup`. Thanks to `newlines-between`, imports in this "sub-group" will have a new line separating them from the rest of the imports in `PathGroup.group`.

This behavior can be undesirable when using `PathGroup.position` to order imports _within_ `PathGroup.group` instead of creating a distinct "sub-group". Set `distinctGroup` to `false` to disable the creation of these "sub-groups".

#### Example

```jsonc
{
  "import-x/order": [
    "error",
    {
      "distinctGroup": false,
      "newlines-between": "always",
      "pathGroups": [
        {
          "pattern": "@app/**",
          "group": "external",
          "position": "after",
        },
      ],
    },
  ],
}
```

### `newlines-between`

Valid values: `"ignore" | "always" | "always-and-inside-groups" | "never"` \
Default: `"ignore"`

Enforces or forbids new lines between import groups.

- If set to `ignore`, no errors related to new lines between import groups will be reported

- If set to `always`, at least one new line between each group will be enforced, and new lines inside a group will be forbidden

> **Tip:**
>
> To prevent multiple lines between imports, the `no-multiple-empty-lines` rule, or a tool like Prettier, can be used.

- If set to `always-and-inside-groups`, it will act like `always` except new lines are allowed inside import groups

- If set to `never`, no new lines are allowed in the entire import section

#### Example

With the default `groups` setting, the following will fail the rule check:

```ts
/* eslint import-x/order: ["error", {"newlines-between": "always"}] */
import fs from 'fs'
import path from 'path'
import sibling from './foo'
import index from './'
```

```ts
/* eslint import-x/order: ["error", {"newlines-between": "always-and-inside-groups"}] */
import fs from 'fs'

import path from 'path'
import sibling from './foo'
import index from './'
```

```ts
/* eslint import-x/order: ["error", {"newlines-between": "never"}] */
import fs from 'fs'
import path from 'path'

import sibling from './foo'

import index from './'
```

While this will pass:

```ts
/* eslint import-x/order: ["error", {"newlines-between": "always"}] */
import fs from 'fs'
import path from 'path'

import sibling from './foo'

import index from './'
```

```ts
/* eslint import-x/order: ["error", {"newlines-between": "always-and-inside-groups"}] */
import fs from 'fs'

import path from 'path'

import sibling from './foo'

import index from './'
```

```ts
/* eslint import-x/order: ["error", {"newlines-between": "never"}] */
import fs from 'fs'
import path from 'path'
import sibling from './foo'
import index from './'
```

### `alphabetize`

Valid values: `{ order?: "asc" | "desc" | "ignore", orderImportKind?: "asc" | "desc" | "ignore", caseInsensitive?: boolean }` \
Default: `{ order: "ignore", orderImportKind: "ignore", caseInsensitive: false }`

Determine the sort order of imports within each predefined group or `PathGroup` alphabetically based on specifier.

> **Note:**
>
> Imports will be alphabetized based on their _specifiers_, not by their
> identifiers. For example, `const a = require('z');` will come _after_ `const z = require('a');` when `alphabetize` is set to `{ order: "asc" }`.

Valid properties and their values include:

- **`order`**: use `"asc"` to sort in ascending order, `"desc"` to sort in descending order, or "ignore" to prevent sorting

- **`orderImportKind`**: use `"asc"` to sort various _import kinds_, e.g. type-only and typeof imports, in ascending order, `"desc"` to sort them in descending order, or "ignore" to prevent sorting

- **`caseInsensitive`**: use `true` to ignore case and `false` to consider case when sorting

#### Example

Given the following settings:

```jsonc
{
  "import-x/order": [
    "error",
    {
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true,
      },
    },
  ],
}
```

This will fail the rule check:

```ts
import React, { PureComponent } from 'react'
import aTypes from 'prop-types'
import { compose, apply } from 'xcompose'
import * as classnames from 'classnames'
import blist from 'BList'
```

While this will pass:

```ts
import blist from 'BList'
import * as classnames from 'classnames'
import aTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { compose, apply } from 'xcompose'
```

### `named`

Valid values: `boolean | { enabled: boolean, import?: boolean, export?: boolean, require?: boolean, cjsExports?: boolean, types?: "mixed" | "types-first" | "types-last" }` \
Default: `false`

Enforce ordering of names within imports and exports.

If set to `true` or `{ enabled: true }`, _all_ named imports must be ordered according to `alphabetize`.
If set to `false` or `{ enabled: false }`, named imports can occur in any order.

If set to `{ enabled: true, ... }`, and any of the properties `import`, `export`, `require`, or `cjsExports` are set to `false`, named ordering is disabled with respect to the following kind of expressions:

- `import`:

  ```ts
  import { Readline } from 'readline'
  ```

- `export`:

  ```ts
  export { Readline }
  // and
  export { Readline } from 'readline'
  ```

- `require`:

  ```ts
  const { Readline } = require('readline')
  ```

- `cjsExports`:

  ```ts
  module.exports.Readline = Readline
  // and
  module.exports = { Readline }
  ```

Further, the `named.types` option allows you to specify the order of import identifiers with inline type qualifiers (or "type-only" identifiers/names), e.g. `import { type TypeIdentifier1, normalIdentifier2 } from 'specifier';`.

`named.types` accepts the following values:

- `types-first`: forces type-only identifiers to occur first
- `types-last`: forces type-only identifiers to occur last
- `mixed`: sorts all identifiers in alphabetical order

#### Example

Given the following settings:

```jsonc
{
  "import-x/order": [
    "error",
    {
      "named": true,
      "alphabetize": {
        "order": "asc",
      },
    },
  ],
}
```

This will fail the rule check:

```ts
import { compose, apply } from 'xcompose'
```

While this will pass:

```ts
import { apply, compose } from 'xcompose'
```
