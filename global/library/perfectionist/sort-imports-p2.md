---
title: "sort-imports (part 2 of 3)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-imports.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-imports (part 2 of 3)

## Options

This rule accepts an options object with the following properties:

### type

default: `'alphabetical'`

Specifies the sorting method.

- `'alphabetical'` — Sort items alphabetically (e.g., “a” < “b” < “c”) using localeCompare.
- `'natural'` — Sort items in a natural order (e.g., “item2” < “item10”).
- `'line-length'` — Sort items by code line length (shorter lines first).
- `'custom'` — Sort items using the alphabet specified in the `alphabet` option.
- `'unsorted'` — Do not sort items. `grouping` and `newlines behavior` are still enforced.

### order

default: `'asc'`

Specifies whether to sort items in ascending or descending order.

- `'asc'` — Sort items in ascending order (A to Z, 1 to 9).
- `'desc'` — Sort items in descending order (Z to A, 9 to 1).

### fallbackSort

  type:
  ```ts
  {
    type:
      | 'alphabetical'
      | 'natural'
      | 'line-length'
      | 'custom'
      | 'type-import-first'
      | 'subgroup-order'
      | 'unsorted'
    order?: 'asc' | 'desc'
  }
  ```

default: `{ type: 'unsorted' }`

Specifies fallback sort options for elements that are equal according to the primary sort `type`.

Example: enforce alphabetical sort between two elements with the same length.
```ts
{
  type: 'line-length',
  order: 'desc',
  fallbackSort: { type: 'alphabetical', order: 'asc' }
}
```

When importing a type and value import from the same module, you can enforce the order between them using the
`type-import-first` option.

Example:
```ts
{
  type: 'alphabetical',
  order: 'desc',
  fallbackSort: { type: 'type-import-first', order: 'asc' } // The type import will come before its value import
}
```

You can also sort by subgroup order (nested groups in the `groups` option) using `subgroup-order`.

Example: When two imports tie on the primary sort key, sort type imports before value imports inside a subgroup.
```ts
{
  groups: [['type-import', 'value-import']],
  type: 'alphabetical',
  order: 'desc',
  fallbackSort: { type: 'subgroup-order', order: 'asc' }
}
```

### alphabet

default: `''`

Used only when the `type` option is set to `'custom'`. Specifies the custom alphabet for sorting.

Use the `Alphabet` utility class from `eslint-plugin-perfectionist/alphabet` to quickly generate a custom alphabet.

#### Example: Sort subpaths before hyphenated packages

Use the following alphabet to sort subpaths before hyphenated packages.

```ts
const alphabet = Alphabet.generateRecommendedAlphabet()
  .sortByNaturalSort()
  .placeCharacterBefore({ characterBefore: "/", characterAfter: "-" })
  .placeCharacterBefore({ characterBefore: ".", characterAfter: "/" })
  .getCharacters();
```

Result:

```ts
import { Linter } from "eslint";
import { globalIgnores } from "eslint/config";
import { FlatConfigComposer } from "eslint-flat-config-utils";
```

### ignoreCase

default: `true`

Specifies whether sorting should be case-sensitive.

- `true` — Ignore case when sorting alphabetically or naturally (e.g., “A” and “a” are the same).
- `false` — Consider case when sorting (e.g., “a” comes before “A”).

### specialCharacters

default: `'keep'`

Specifies whether to trim, remove, or keep special characters before sorting.

- `'keep'` — Keep special characters when sorting (e.g., “_a” comes before “a”).
- `'trim'` — Trim special characters when sorting alphabetically or naturally (e.g., “_a” and “a” are the same).
- `'remove'` — Remove special characters when sorting (e.g., “/a/b” and “ab” are the same).

### locales

default: `'en-US'`

Specifies the sorting locales. Refer To String.prototype.localeCompare() - locales.

- `string` — A BCP 47 language tag (e.g. `'en'`, `'en-US'`, `'zh-CN'`).
- `string[]` — An array of BCP 47 language tags.

### sortBy

default: `'path'`

Controls whether sorting should be done using the path of the import or its first specifier.

- `'path'` — Use the path of the import.
- `'specifier'` — Use the first specifier of the import if it exists.

### internalPattern

default: `['^~/.+', '^@/.+', '^#.+']`

Specifies a pattern for identifying internal imports. This is useful for distinguishing your own modules from external dependencies.

You can use regexp patterns to define these internal imports.

### sortSideEffects

default: `false`

Specifies whether side effect imports should be sorted. By default, sorting side-effect imports is disabled for security reasons.

- `true` — Sort side effect imports.
- `false` — Do not sort side effect imports.

### partitionByComment

default: `false`

Enables the use of comments to separate imports into logical groups.

- `true` — All comments will be treated as delimiters, creating partitions.
- `false` — Comments will not be used as delimiters.
- `RegExpPattern = string | { pattern: string; flags: string}` — A regexp pattern to specify which comments should act as delimiters.
- `RegExpPattern[]` — A list of regexp patterns to specify which comments should act as delimiters.
- `{ block: boolean | RegExpPattern | RegExpPattern[]; line: boolean | RegExpPattern | RegExpPattern[] }` — Specify which block and line comments should act as delimiters.

### partitionByNewLine

default: `false`

When `true`, the rule will not sort imports if there is an empty line between them. This helps maintain the defined order of logically separated groups of members.

```ts
import { b1, b2 } from 'b'

import { a } from 'a'
import { c } from 'c'
```

### newlinesBetween

  type: `number | 'ignore'`

default: `1`

Specifies how to handle newlines between groups.

- `'ignore'` — Do not report errors related to newlines.
- `0` — No newlines are allowed.
- Any other number — Enforce this number of newlines between each group.

You can also enforce the newline behavior between two specific groups through the `groups`
option.

This option is only applicable when `partitionByNewLine` is `false`. When `partitionByNewLine` is `true`, it defaults to `'ignore'`.

### newlinesInside

  type: `number | 'ignore'`

default: `0`

Specifies how to handle newlines inside groups.

- `'ignore'` — Do not report errors related to newlines.
- `0` — No newlines are allowed.
- Any other number — Enforce this number of newlines between each element of the same group.

You can also enforce the newline behavior inside a given group through the `groups`
or `customGroups` options.

This option is only applicable when `partitionByNewLine` is `false`. When `partitionByNewLine` is `true`, it defaults to `'ignore'`.

### maxLineLength

default: `Infinity`

Specifies a maximum line length for sorting imports. When the line length exceeds this number, sorting will be based only on the import name, excluding the elements.

This option is only available when the type is set to `'line-length'`.

### tsconfig

  type: `{ rootDir: string; filename?: string }`

default: `{ rootDir: '' }`

- `rootDir` — Specifies the directory of the root `tsconfig.json` file (ex: `.`). This is used in `groups` for:
  - Marking aliased imports as `internal`.
  - Marking imports matching tsconfig paths as `tsconfig-path`.
- `filename` — Specifies the `tsconfig` filename to search for (by default: `tsconfig.json`).

If `rootDir` is empty, the rule will not search for a `tsconfig.json` file.

### groups

  type:
  ```ts
    Array<
      | string
      | string[]
      | { newlinesBetween: number | 'ignore' }
      | {
          group: string | string[];
          type?: 'alphabetical' | 'natural' | 'line-length' | 'custom' | 'unsorted';
          order?: 'asc' | 'desc';
          fallbackSort?: { type: string; order?: 'asc' | 'desc' };
          newlinesInside?: number | 'ignore';
          commentAbove?: string;
        }
    >
  ```

  default:
  ```ts
  [
    'type-import',
    ['value-builtin', 'value-external'],
    'type-internal',
    'value-internal',
    ['type-parent', 'type-sibling', 'type-index'],
    ['value-parent', 'value-sibling', 'value-index'],
    'ts-equals-import',
    'unknown',
  ]
  ```

Specifies a list of import groups for sorting. Groups help organize imports into meaningful categories, making your code more readable and maintainable.

Each import will be assigned a single group specified in the `groups` option (or the `unknown` group if no match is found).
The order of items in the `groups` option determines how groups are ordered.

Within a given group, members will be sorted according to the `type`, `order`, `ignoreCase`, etc. options.

Individual groups can be combined together by placing them in an array. The order of groups in that array does not matter.
All members of the groups in the array will be sorted together as if they were part of a single group.

Predefined groups are characterized by a single selector and potentially multiple modifiers. You may enter modifiers in any order, but the selector must always come at the end.

#### Selectors

The list of selectors is sorted from most to least important:

- `'type'` — TypeScript type imports.
- `'side-effect-style'` — Side effect style imports.
- `'side-effect'` — Side effect imports.
- `'style'` — Styles.
- `'tsconfig-path'` — `tsconfig` paths alias imports. Requires `tsconfig.rootDir` to be set.
- `'index'` — Main file from the current directory.
- `'sibling'` — Modules from the same directory.
- `'parent'` — Modules from the parent directory.
- `'subpath'` — Node.js subpath imports.
- `'internal'` — Your internal modules.
- `'builtin'` — Node.js Built-in Modules.
- `'external'` — External modules installed in the project.
- `'import'` — Any import.

#### Modifiers

The list of modifiers is sorted from most to least important:

- `'side-effect'` — Side effect imports.
- `'type'` — Typescript type imports.
- `'value'` — Value imports.
- `'ts-equals'` — TypeScript import-equals imports.
- `'require'` — `require` imports.
- `'default'` — Imports containing the `default` specifier.
- `'wildcard'` — Imports containing the wildcard (`* as`) specifier.
- `'named'` — Imports containing at least one named specifier.
- `'multiline'` — Imports on multiple lines.
- `'singleline'` — Imports on a single line.

#### Important notes

##### The `unknown` group

Members that don't fit into any group specified in the `groups` option will be placed in the `unknown` group. If the `unknown` group is not specified in the `groups` option,
the members will remain in their original order.

##### Behavior when multiple groups match an element

The lists of selectors and modifiers above are both sorted by importance, from most to least important.
In case of multiple groups matching an element, the following rules will be applied:

1. Selector priority: `type`, `index`, ... will take precedence over `external` groups for example.
2. If the selector is the same, the group with the most modifiers matching will be selected.
3. If modifiers quantity is the same, order will be chosen based on modifier importance as listed above.

Example 1:

```ts
import type { FC } from 'react'
```

`react` can be matched by the following groups, from most to least important:
- `named-type` (`type` selector).
- `type`.
- `named-type-external` or `type-named-external` (`type` modifier).
- `type-external`.
- `named-external`.
- `external`.
- `named-type-import` or `type-named-import`.
- `type-import`.
- `named-import`.
- `import`.

Example 2:

```ts
import 'style.scss'
```

`style.scss` can be matched by the following relevant groups, from most to least important:

- `side-effect-style` (`side-effect-style` selector).
- `side-effect`.
- `value-style`.
- `style`.
- `side-effect-import`.  (`side-effect` modifier)
- `value-import`.
- `import`.

Example 3 (The most important group is written in the comments):

```ts
// 'value-builtin' - Node.js Built-in Modules
import path from 'path'
// 'value-external' - External modules installed in the project
import axios from 'axios'
// 'value-internal' - Your internal modules
import Button from '~/components/Button'
// 'value-parent' - Modules from parent directory
import formatNumber from '../utils/format-number'
// 'value-subpath' - Node.js subpath imports
import subpathContent from '#subpathModule'
// 'value-sibling' - Modules from the same directory
import config from './config'
// 'value-side-effect' - Side effect imports
import './set-production-env.js'
// value-side-effect-style - Side effect style imports
import './styles.scss'
// 'value-index' - Main file from the current directory
import main from '.'
// 'value-style' - Styles
import styles from './index.module.css'
// 'type-external' - TypeScript type imports
import type { FC } from 'react'
// 'named-type-builtin' - TypeScript type imports from Built-in Modules
import type { Server } from 'http'
// 'named-type-internal' - TypeScript type imports from your internal modules
import type { User } from '~/users'
// 'named-type-parent' - TypeScript type imports from parent directory
import type { InputProps } from '../Input'
// 'named-type-sibling' - TypeScript type imports from the same directory
import type { Details } from './data'
// 'named-type-index' - TypeScript type imports from main directory file
import type { BaseOptions } from './index.d.ts'
// 'value-ts-equals-import' - TypeScript import-equals imports
import NotFoundError = ErrorsNamespace.NotFoundError
```

#### Group with overridden settings

You may directly override options for a specific group by using an object with the `group` property and other option overrides.

- `type` — Overrides the `type` option for that group.
- `order` — Overrides the `order` option for that group.
- `fallbackSort` — Overrides the `fallbackSort` option for that group.
- `newlinesInside` — Overrides the `newlinesInside` option for that group.
- `commentAbove` — Enforces the presence of a comment containing the content of `commentAbove` above the top element of the group.
  - An error will be raised if no comment containing the content of `commentAbove` is found above the top element of the
  group.
  - Auto-fixing will add a comment containing the content of `commentAbove` above the top element of the group.
  - Auto-fixing will also remove invalid auto-added comments (only comments existing in `commentAbove` objects are
  considered as auto-removable).

```ts
{
  groups: [
    'internal',
    { group: 'external', commentAbove: 'External imports' },
    { group: 'sibling', type: 'unsorted' }, // Elements from this group will not be sorted
  ]
}
```

#### Newlines between groups

You may place `newlinesBetween` objects between your groups to enforce the newline behavior between two specific groups.

See the `newlinesBetween` option.

This feature is only applicable when `partitionByNewLine` is `false`.

```ts
{
  newlinesBetween: 1,
  groups: [
    'a',
    { newlinesBetween: 0 }, // Overrides the global newlinesBetween option
    'b',
  ]
}
```
