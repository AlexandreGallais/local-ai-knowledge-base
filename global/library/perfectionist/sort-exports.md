---
title: "sort-exports (part 1 of 2)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-exports.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-exports

Enforce sorted re-exports.

This rule sorts re-export statements (`export { ... } from '...'` and `export * from '...'`), not declaration exports like `export const foo = 1` or `export function bar() {}`.

Sorting exports in a consistent manner can greatly enhance the readability and maintainability of your codebase. By alphabetically ordering exports, developers can quickly identify and correct any missing or incorrect exports.

This rule promotes a structured approach to exporting modules, which simplifies code management and improves the overall quality of the project.

## Try it out

<CodeExample
  rule="sort-exports"
  alphabetical={dedent`
    export { createUser } from './actions/createUser'
    export { deleteUser } from './actions/deleteUser'
    export { fetchUser } from './actions/fetchUser'
    export { updateUser } from './actions/updateUser'
    export { Footer } from './components/Footer'
    export { Header } from './components/Header'
    export { MainContent } from './components/MainContent'
    export { Sidebar } from './components/Sidebar'
    export { calculateAge } from './utils/calculateAge'
    export { debounce } from './utils/debounce'
    export { formatDate } from './utils/formatDate'
    export { generateUUID } from './utils/generateUUID'
    export { parseQueryString } from './utils/parseQueryString'
  `}
  lineLength={dedent`
    export { parseQueryString } from './utils/parseQueryString'
    export { MainContent } from './components/MainContent'
    export { calculateAge } from './utils/calculateAge'
    export { generateUUID } from './utils/generateUUID'
    export { deleteUser } from './actions/deleteUser'
    export { updateUser } from './actions/updateUser'
    export { createUser } from './actions/createUser'
    export { formatDate } from './utils/formatDate'
    export { fetchUser } from './actions/fetchUser'
    export { Sidebar } from './components/Sidebar'
    export { Footer } from './components/Footer'
    export { Header } from './components/Header'
    export { debounce } from './utils/debounce'
  `}
  initial={dedent`
    export { MainContent } from './components/MainContent'
    export { calculateAge } from './utils/calculateAge'
    export { Sidebar } from './components/Sidebar'
    export { deleteUser } from './actions/deleteUser'
    export { Footer } from './components/Footer'
    export { debounce } from './utils/debounce'
    export { generateUUID } from './utils/generateUUID'
    export { formatDate } from './utils/formatDate'
    export { updateUser } from './actions/updateUser'
    export { fetchUser } from './actions/fetchUser'
    export { Header } from './components/Header'
    export { createUser } from './actions/createUser'
    export { parseQueryString } from './utils/parseQueryString'
  `}
  client:load
  lang="tsx"
/>

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

You can also sort by subgroup order (nested groups in the `groups` option) using `subgroup-order`.

Example: when two exports tie on the primary sort key, sort type exports before value exports inside a subgroup.
```ts
{
  groups: [['type-export', 'value-export']],
  type: 'alphabetical',
  order: 'desc',
  fallbackSort: { type: 'subgroup-order', order: 'asc' }
}
```

### alphabet

default: `''`

Used only when the `type` option is set to `'custom'`. Specifies the custom alphabet for sorting.

Use the `Alphabet` utility class from `eslint-plugin-perfectionist/alphabet` to quickly generate a custom alphabet.

Example: `0123456789abcdef...`

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

### partitionByComment

default: `false`

Enables the use of comments to separate the exports into logical groups. This can help in organizing and maintaining large export blocks by creating partitions based on comments.

- `true` — All comments will be treated as delimiters, creating partitions.
- `false` — Comments will not be used as delimiters.
- `RegExpPattern = string | { pattern: string; flags: string}` — A regexp pattern to specify which comments should act as delimiters.
- `RegExpPattern[]` — A list of regexp patterns to specify which comments should act as delimiters.
- `{ block: boolean | RegExpPattern | RegExpPattern[]; line: boolean | RegExpPattern | RegExpPattern[] }` — Specify which block and line comments should act as delimiters.

### partitionByNewLine

default: `false`

When `true`, the rule will not sort the exports if there is an empty line between them. This helps maintain the defined order of logically separated groups of exports.

```ts
// Group 1
export * from "./atoms";
export * from "./organisms";
export * from "./shared";

// Group 2
export { Named } from './folder';
export { AnotherNamed } from './second-folder';
```

Each group of exports (separated by empty lines) is treated independently, and the order within each group is preserved.

### newlinesBetween

  type: `number | 'ignore'`

default: `'ignore'`

Specifies how to handle newlines between groups.

- `'ignore'` — Do not report errors related to newlines.
- `0` — No newlines are allowed.
- Any other number — Enforce this number of newlines between each group.

You can also enforce the newline behavior between two specific groups through the `groups`
option.

This option is only applicable when `partitionByNewLine` is `false`.

### newlinesInside

  type: `number | 'ignore' | 'newlinesBetween'`

default: `'newlinesBetween'`

Specifies how to handle newlines inside groups.

- `'ignore'` — Do not report errors related to newlines.
- `'newlinesBetween'` — [DEPRECATED] If `newlinesBetween` is `'ignore'`, then `'ignore'`, otherwise `0`.
- `0` — No newlines are allowed.
- Any other number — Enforce this number of newlines between each element of the same group.

You can also enforce the newline behavior inside a given group through the `groups`
or `customGroups` options.

This option is only applicable when `partitionByNewLine` is `false`.

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

default: `[]`

Specifies a list of export groups for sorting. Groups help organize exports into categories, making them more readable and maintainable.

Each export will be assigned a single group specified in the `groups` option (or the `unknown` group if no match is found).
The order of items in the `groups` option determines how groups are ordered.

Within a given group, members will be sorted according to the `type`, `order`, `ignoreCase`, etc. options.

Individual groups can be combined together by placing them in an array. The order of groups in that array does not matter.
All members of the groups in the array will be sorted together as if they were part of a single group.

Predefined groups are characterized by a single selector and potentially multiple modifiers. You may enter modifiers in any order, but the selector must always come at the end.

#### Selectors

The only selector possible for this rule is `'export'`.

#### Modifiers

The list of modifiers is sorted from most to least important:

- `'value'` — Matches exports without the `type` keyword. E.g., `export { foo } from './bar'` or `export * from './bar'`.
- `'type'` — Matches exports with the `type` keyword. E.g., `export type { Foo } from './bar'`.
- `'wildcard'` — Matches `export *` and `export * as` re-exports. E.g., `export * from './bar'` or `export * as utils from './bar'`.
- `'named'` — Matches `export { ... }` re-exports with explicit names. E.g., `export { foo, bar } from './bar'`.
- `'multiline'` — Matches exports spanning multiple lines.
- `'singleline'` — Matches exports on a single line.

Examples: `type-named-export`, `value-wildcard-export`.

#### Important notes

##### The `unknown` group

Members that don't fit into any group specified in the `groups` option will be placed in the `unknown` group. If the `unknown` group is not specified in the `groups` option,
it will automatically be added to the end of the list.

##### Group with overridden settings

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
    { group: 'type-export', commentAbove: 'Type exports' },
    'myCustomGroup1',
    { group: 'myCustomGroup2', type: 'unsorted' }, // Elements from this group will not be sorted
  ]
}
```

##### Newlines between groups

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

### customGroups

  type: `Array<CustomGroupDefinition | CustomGroupAnyOfDefinition>`

default: `[]`

Defines custom groups to match specific exports.

A custom group definition may follow one of the two following interfaces:

```ts
interface CustomGroupDefinition {
  groupName: string
  type?: 'alphabetical' | 'natural' | 'line-length' | 'unsorted'
  order?: 'asc' | 'desc'
  fallbackSort?: { type: string; order?: 'asc' | 'desc' }
  newlinesInside?: number | 'ignore'
  selector?: string
  elementNamePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
}
```

An export will match a `CustomGroupDefinition` group if it matches all the filters of the custom group's definition.

or:

```ts
interface CustomGroupAnyOfDefinition {
  groupName: string
  type?: 'alphabetical' | 'natural' | 'line-length' | 'unsorted'
  order?: 'asc' | 'desc'
  fallbackSort?: { type: string; order?: 'asc' | 'desc' }
  newlinesInside?: number | 'ignore'
  anyOf: Array<{
      selector?: string
      elementNamePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
  }>
}
```

An export will match a `CustomGroupAnyOfDefinition` group if it matches all the filters of at least one of the `anyOf` items.

#### Attributes

- `groupName` — The group's name, which needs to be put in the `groups` option.
- `selector` — Filter on the `selector` of the element.
- `elementNamePattern` — If entered, will check that the name of the element matches the pattern entered.
- `type` — Overrides the `type` option for that custom group.
- `order` — Overrides the `order` option for that custom group.
- `fallbackSort` — Overrides the `fallbackSort` option for that custom group.
- `newlinesInside` — Overrides the `newlinesInside` option for that custom group.

#### Match importance

The `customGroups` list is ordered:
The first custom group definition that matches an element will be used.

Custom groups have a higher priority than any predefined group.
