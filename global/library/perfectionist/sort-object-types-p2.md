---
title: "sort-object-types (part 2 of 3)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-object-types.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-object-types (part 2 of 3)

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
    sortBy?: 'name' | 'value'
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

### sortBy

default: `'name'`

Specifies whether to sort using object type keys or values.

- `name` — Use object types keys.
- `value` — Use the values of properties. Non-properties will not have an enforced sort order.

Example

```ts
type User = {
  createdAt: Date
  lastLoginAt: Date
  _id: ObjectId
  groupId: ObjectId
  city: string
}
```

`sortBy` option configuration:

```ts
{
  sortBy: 'value',
}
```

### partitionByComment

default: `false`

Enables the use of comments to separate the members of types into logical groups. This can help in organizing and maintaining large object types by creating partitions based on comments.

- `true` — All comments will be treated as delimiters, creating partitions.
- `false` — Comments will not be used as delimiters.
- `RegExpPattern = string | { pattern: string; flags: string}` — A regexp pattern to specify which comments should act as delimiters.
- `RegExpPattern[]` — A list of regexp patterns to specify which comments should act as delimiters.
- `{ block: boolean | RegExpPattern | RegExpPattern[]; line: boolean | RegExpPattern | RegExpPattern[] }` — Specify which block and line comments should act as delimiters.

### partitionByNewLine

default: `false`

When `true`, the rule will not sort the members of an object if there is an empty line between them. This helps maintain the defined order of logically separated groups of members.

```ts
type User = {
  // Group 1
  firstName: string;
  lastName: string;

  // Group 2
  age: number;
  birthDate: Date;

  // Group 3
  address: {
    street: string;
    city: string;
  };
  phone?: string;
};
```

Each group of members (separated by empty lines) is treated independently, and the order within each group is preserved.

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

### useConfigurationIf

  type:
  ```ts
{
    allNamesMatchPattern?:
      | string
      | string[]
      | { pattern: string; flags: string }
      | { pattern: string; flags: string }[]
    declarationMatchesPattern?:
      | string
      | string[]
      | { pattern: string; flags?: string; scope?: 'shallow' | 'deep' }
      | { pattern: string; flags?: string; scope?: 'shallow' | 'deep' }[]
    declarationCommentMatchesPattern?:
      | string
      | string[]
      | { pattern: string; flags?: string; scope?: 'shallow' | 'deep' }
      | { pattern: string; flags?: string; scope?: 'shallow' | 'deep' }[]
    hasNumericKeysOnly?: boolean
    matchesAstSelector?: string
  }
  ```

default: `{}`

Specifies filters to match a particular options configuration for a given object type.

The first matching options configuration will be used. If no configuration matches, the default options configuration will be used.

- `allNamesMatchPattern` — A regexp pattern that all keys must match.

Example configuration:
```ts
{
  'perfectionist/sort-object-types': [
    'error',
    {
      groups: ['r', 'g', 'b'], // Sort colors types by RGB
      customGroups: [
        {
          groupName: 'r',
          elementNamePattern: '^r$',
        },
        {
          groupName: 'g',
          elementNamePattern: '^g$',
        },
        {
          groupName: 'b',
          elementNamePattern: '^b$',
        },
      ],
      useConfigurationIf: {
        allNamesMatchPattern: '^[rgb]$',
      },
    },
    {
      type: 'alphabetical' // Fallback configuration
    }
  ],
}
```

- `declarationMatchesPattern` — A regexp pattern that the object type declaration must match.
With `scope: 'deep'`, this setting will also match to any object type found at any depth within the declaration.

Example configuration:
```ts
{
  'perfectionist/sort-object-types': [
    'error',
    {
      type: 'unsorted', // Do not sort Metadata types
      useConfigurationIf: {
        declarationMatchesPattern: 'Metadata$',
      },
    },
    {
      type: 'alphabetical' // Fallback configuration
    }
  ],
}
```

- `declarationCommentMatchesPattern` — A regexp pattern to specify which comments above the type declaration should match.
With `scope: 'deep'`, this setting will also match to any object type found at any depth within the declaration.

Example configuration:
```ts
{
  'perfectionist/sort-object-types': [
    'error',
    {
      type: 'unsorted', // Don't sort object types with a "do not sort" comment
      useConfigurationIf: {
        declarationCommentMatchesPattern: '^do not sort$',
      },
    },
    {
      type: 'alphabetical' // Fallback configuration
    }
  ],
}
```

- `hasNumericKeysOnly` — If `true`, matches only types that have exclusively numeric keys.

This option only detects unquoted numeric literal keys (e.g., `1`, `42`).
Quoted strings like `"1"`, array-wrapped keys like `[1]`, or computed expressions are not detected as numeric keys.

Example configuration:
```ts
{
  'perfectionist/sort-object-types': [
    'error',
    {
      type: 'natural', // Sort numeric keys naturally (by numeric value)
      useConfigurationIf: {
        hasNumericKeysOnly: true,
      },
    },
    {
      type: 'alphabetical' // Fallback configuration
    }
  ],
}
```

- `matchesAstSelector` — An AST selector matching a `TSTypeLiteral` node.
To avoid unexpected behavior, do not use `:exit` or `:enter` pseudo-selectors.

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
          fallbackSort?: { type: string; order?: 'asc' | 'desc'; sortBy?: 'name' | 'value' };
          sortBy?: 'name' | 'value'
          newlinesInside?: number | 'ignore';
        }
    >
  ```

default: `[]`

Specifies a list of type properties groups for sorting. Groups help organize properties into categories, making your type definitions more readable and maintainable.

Each property will be assigned a single group specified in the `groups` option (or the `unknown` group if no match is found).
The order of items in the `groups` option determines how groups are ordered.

Within a given group, members will be sorted according to the `type`, `order`, `ignoreCase`, etc. options.

Individual groups can be combined together by placing them in an array. The order of groups in that array does not matter.
All members of the groups in the array will be sorted together as if they were part of a single group.

Predefined groups are characterized by a single selector and potentially multiple modifiers. You may enter modifiers in any order, but the selector must always come at the end.

#### Example

```ts
type User = {
  firstName: string // unknown
  lastName: string  // unknown
  username: string  // unknown
  job: {            // multiline-member
    // Stuff about job
  }
  localization: {   // multiline-member
    // Stuff about localization
  }
}
```

`groups` option configuration:

```ts
{
  groups: [
    'unknown',
    'method',
    'multiline-member',
  ]
}
```

#### Index-signatures

- Selectors: `'index-signature'`, `'member'`.
- Modifiers: `'required'`, `'optional'`, `'multiline'`.
- Example: `'optional-index-signature'`, `'index-signature'`, `'member'`.

#### Methods

- Selectors: `'method'`, `'member'`.
- Modifiers: `'required'`, `'optional'`, `'multiline'`.
- Example: `'optional-multiline-method'`, `'method'`, `'member'`.

#### Properties

- Selectors: `'property'`, `'member'`.
- Modifiers: `'required'`, `'optional'`, `'multiline'`.
- Example: `'optional-property'`, `'property'`, `'member'`.

##### Scope of the `required` modifier

Elements that are not `optional` will be matched with the `required` modifier, even if the keyword is not present.

#### Important notes

##### The `unknown` group

Members that don't fit into any group specified in the `groups` option will be placed in the `unknown` group. If the `unknown` group is not specified in the `groups` option,
it will automatically be added to the end of the list.

##### Behavior when multiple groups match an element

The lists of modifiers above are sorted by importance, from most to least important.
In case of multiple groups matching an element, the following rules will be applied:

1. The group with the most modifiers matching will be selected.
2. If modifiers quantity is the same, order will be chosen based on modifier importance as listed above.

Example :

```ts
interface Test {
  optionalMethod?: () => {
      property: string;
    }
}
```

`optionalMethod` can be matched by the following groups, from most to least important:
- `'multiline-optional-method'` or `'optional-multiline-method'`.
- `'multiline-method'`.
- `'optional-method'`.
- `'method'`.
- `'multiline-optional-member'` or `'optional-multiline-member'`.
- `'multiline-member'`.
- `'optional-member'`.
- `'member'`.
- `'unknown'`.

Example 2 (The most important group is written in the comments):

```ts
interface Interface {
  // 'index-signature'
  [key: <example-value>]: any;
  // 'optional-property'
  description?: string;
  // 'required-method'
  method(): string
```

#### Group with overridden settings

You may directly override options for a specific group by using an object with the `group` property and other option overrides.

- `type` — Overrides the `type` option for that group.
- `order` — Overrides the `order` option for that group.
- `fallbackSort` — Overrides the `fallbackSort` option for that group.
- `sortBy` — Overrides the `sortBy` option for that group.
- `newlinesInside` — Overrides the `newlinesInside` option for that group.

```ts
{
  groups: [
    'method',
    { group: 'multiline-member', type: 'unsorted' }, // Elements from this group will not be sorted
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
