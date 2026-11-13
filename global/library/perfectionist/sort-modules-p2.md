---
title: "sort-modules (part 2 of 3)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-modules.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-modules (part 2 of 3)

## Options

This rule accepts an options object with the following properties:

### type

default: `'alphabetical'`

Specifies the sorting method.

- `'alphabetical'` — Sort items alphabetically (e.g., “a” < “b” < “c”) using localeCompare.
- `'natural'` — Sort items in a natural order (e.g., “item2” < “item10”).
- `'line-length'` — Sort items by code line length (shorter lines first).
- `'custom'` — Sort items using the alphabet specified in the `alphabet` option.
- `'usage'` — Enforces items referenced by other items within the same `group` to appear before the items that reference them.
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
      | 'usage'
      | 'subgroup-order'
      | 'unsorted'
    order?: 'asc' | 'desc'
  }
  ```

default: `{ type: 'unsorted' }`

Specifies fallback sort options for elements that are equal according to the primary sort `type`.

You can also sort by subgroup order (nested groups in the `groups` option) using `subgroup-order`.

Example: enforce alphabetical sort between two elements with the same length.
```ts
{
  type: 'line-length',
  order: 'desc',
  fallbackSort: { type: 'alphabetical', order: 'asc' }
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

Enables the use of comments to separate the module members into logical groups. This can help in organizing and maintaining large modules by creating partitions based on comments.

- `true` — All comments will be treated as delimiters, creating partitions.
- `false` — Comments will not be used as delimiters.
- `RegExpPattern = string | { pattern: string; flags: string}` — A regexp pattern to specify which comments should act as delimiters.
- `RegExpPattern[]` — A list of regexp patterns to specify which comments should act as delimiters.
- `{ block: boolean | RegExpPattern | RegExpPattern[]; line: boolean | RegExpPattern | RegExpPattern[] }` — Specify which block and line comments should act as delimiters.

### partitionByNewLine

default: `false`

When `true`, the rule will not sort the members of a module if there is an empty line between them. This helps maintain the defined order of logically separated groups of members.

```ts
// Group 1
interface BasicInformation {
  firstName: string;
  lastName: string;
 }

// Group 2
interface AgeInformation {
  age: number;
  birthDate: Date;
}

// Group 3
interface LocationInformation {
  street: string;
  city: string;
}

// Group 4
function updateAddress(address: string) {}
function updatePhone(phone?: string) {}

// Group 5
function editFirstName(firstName: string) {}
function editLastName(lastName: string) {}
```

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

### newlinesBetweenOverloadSignatures

  type: `number | 'ignore'`

default: `0`

Specifies how to handle newlines between overload signatures and the implementation of the same function.

- `'ignore'` — Do not report errors related to newlines.
- `0` — No newlines are allowed.
- Any other number — Enforce this number of newlines between each overload signature.

### tsconfig

<Important>
  This option only has an impact with `useExperimentalDependencyDetection: true` (the default).
</Important>

  type: `{ rootDir: string; filename?: string }`

default: `{ rootDir: '' }`

Specifies the TypeScript configuration used to read compiler options.

- `rootDir` — Specifies the directory of the root `tsconfig.json` file (ex: `.`).
- `filename` — Specifies the `tsconfig` filename to search for (by default: `tsconfig.json`).

The rule treats decorator-metadata type references as dependencies only when
`emitDecoratorMetadata` is enabled, since those are the only type references
that survive compilation. When this option is set, the value is read from your
tsconfig; otherwise it is assumed to be `true`.

### additionalModuleBlockTypes

  type: `string[]`

default: `[]`

Specifies additional node types to analyze as module blocks, in addition to the built-in ones (`SvelteScriptElement`).

Each node type should have a `body` property containing an array of statements.

### groups

  type:
  ```ts
    Array<
      | string
      | string[]
      | { newlinesBetween: number | 'ignore' }
      | {
          group: string | string[];
          type?: 'alphabetical' | 'natural' | 'line-length' | 'custom' | 'usage' | 'unsorted';
          order?: 'asc' | 'desc';
          fallbackSort?: { type: string; order?: 'asc' | 'desc' };
          newlinesInside?: number | 'ignore';
        }
    >
  ```

  default:
  ```ts
  [
    'declare-enum',
    'export-enum',
    'enum',
    ['declare-interface', 'declare-type'],
    ['export-interface', 'export-type'],
    ['interface', 'type'],
    'declare-class',
    'class',
    'export-class',
    'declare-function',
    'export-function',
    'function',
  ]
  ```

Specifies a list of module member groups for sorting. Groups help organize module members into categories, prioritizing them during sorting.

Each module member will be assigned a single group specified in the `groups` option (or the `unknown` group if no match is found).
The order of items in the `groups` option determines how groups are ordered.

Within a given group, members will be sorted according to the `type`, `order`, `ignoreCase`, etc. options.

Individual groups can be combined together by placing them in an array. The order of groups in that array does not matter.
All members of the groups in the array will be sorted together as if they were part of a single group.

Predefined groups are characterized by a single selector and potentially multiple modifiers. You may enter modifiers in any order, but the selector must always come at the end.

#### Interfaces

- Selector: `interface`.
- Modifiers: `declare`, `default`, `export`.
- Example: `declare-interface`, `export-default-interface` or `interface`.

#### Types

- Selector: `type`.
- Modifiers: `declare`, `export`.
- Example: `declare-type`, `declare-export-type` or `interface`.

#### Classes

- Selector: `class`.
- Modifiers: `declare`, `default`, `decorated`, `export`.
- Example: `declare-class`, `export-default-decorated-class` or `class`.

#### Functions

- Selector: `function`.
- Modifiers: `declare`, `default`, `async`, `export`.
- Example: `async-function`, `export-default-function` or `function`.

#### Enums

- Selectors: `enum`.
- Modifiers: `declare`, `export`.
- Example: `export-declare-enum` or `enum`.

#### Important notes

##### The `unknown` group

Members that don't fit into any group specified in the `groups` option will be placed in the `unknown` group. If the `unknown` group is not specified in the `groups` option,
the members will remain in their original order.

##### Behavior when multiple groups match an element

The lists of modifiers above are sorted by importance, from most to least important.
In case of multiple groups matching an element, the following rules will be applied:

1. The group with the most modifiers matching will be selected.
2. If modifiers quantity is the same, order will be chosen based on modifier importance as listed above.

Example :

```ts
export default class {}
```

`class` can be matched by the following groups, from most to least important:
- `default-export-class` or `export-default-class`.
- `default-class`.
- `export-class`.
- `class`.
- `unknown`.
