---
title: "sort-arrays (part 1 of 2)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-arrays.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-arrays

Enforce sorted array values on arrays matching configured conditions.

This rule does not sort arrays by default. It must be configured with `useConfigurationIf` to
target only the arrays where element order does not matter (e.g., `as const` arrays used as enumerations).

By keeping those arrays sorted, developers can quickly scan and verify the values, making the code more predictable
and reducing the likelihood of errors.

## Try it out

<CodeExample
  rule="sort-arrays"
  alphabetical={dedent`
    const ELECTRONICS = [
      'Drone',
      'Headphones',
      'Keyboard',
      'Laptop',
      'Monitor',
      'Mouse',
      'Router',
      'Smartphone',
      'Smartwatch',
      'Tablet',
    ] as const

    const ACCESSORIES = [
      'Adapter',
      'Battery',
      'Cable',
      'Case',
      'Charger',
      'Memory Card',
      'Screen Protector',
    ] as const
`}
  lineLength={dedent`
    const ELECTRONICS = [
      'Smartphone',
      'Smartwatch',
      'Headphones',
      'Keyboard',
      'Monitor',
      'Tablet',
      'Laptop',
      'Router',
      'Mouse',
      'Drone',
    ] as const

    const ACCESSORIES = [
      'Screen Protector',
      'Memory Card',
      'Charger',
      'Battery',
      'Adapter',
      'Cable',
      'Case',
    ] as const
`}
  initial={dedent`
    const ELECTRONICS = [
      'Mouse',
      'Drone',
      'Smartphone',
      'Keyboard',
      'Tablet',
      'Monitor',
      'Laptop',
      'Smartwatch',
      'Router',
      'Headphones',
    ] as const

    const ACCESSORIES = [
      'Memory Card',
      'Charger',
      'Cable',
      'Battery',
      'Screen Protector',
      'Case',
      'Adapter',
    ] as const
`}
  client:load
  lang="tsx"
/>

## Options

This rule accepts an options object with the following properties:

### type

default: `'alphabetical'`

Specifies the sorting method.

- `'alphabetical'` — Sort items alphabetically (e.g., "a" < "b" < "c") using localeCompare.
- `'natural'` — Sort items in a natural order (e.g., "item2" < "item10").
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

- `true` — Ignore case when sorting alphabetically or naturally (e.g., "A" and "a" are the same).
- `false` — Consider case when sorting (e.g., "a" comes before "A").

### specialCharacters

default: `'keep'`

Specifies whether to trim, remove, or keep special characters before sorting.

- `'keep'` — Keep special characters when sorting (e.g., "_a" comes before "a").
- `'trim'` — Trim special characters when sorting alphabetically or naturally (e.g., "_a" and "a" are the same).
- `'remove'` — Remove special characters when sorting (e.g., "/a/b" and "ab" are the same).

### locales

default: `'en-US'`

Specifies the sorting locales. Refer To String.prototype.localeCompare() - locales.

- `string` — A BCP 47 language tag (e.g. `'en'`, `'en-US'`, `'zh-CN'`).
- `string[]` — An array of BCP 47 language tags.

### partitionByComment

default: `false`

Enables the use of comments to separate the members of arrays into logical groups. This can help in organizing and maintaining large arrays by creating partitions based on comments.

- `true` — All comments will be treated as delimiters, creating partitions.
- `false` — Comments will not be used as delimiters.
- `RegExpPattern = string | { pattern: string; flags: string}` — A regexp pattern to specify which comments should act as delimiters.
- `RegExpPattern[]` — A list of regexp patterns to specify which comments should act as delimiters.
- `{ block: boolean | RegExpPattern | RegExpPattern[]; line: boolean | RegExpPattern | RegExpPattern[] }` — Specify which block and line comments should act as delimiters.

### partitionByNewLine

default: `false`

When `true`, the rule will not sort the members of an array if there is an empty line between them. This helps maintain the defined order of logically separated groups of members.

```ts
const ELECTRONICS = [
     // Group 1
    'Drone',
    'Keyboard',
    'Mouse',
    'Smartphone',

    // Group 2
    'Laptop',
    'Monitor',
    'Smartwatch',
    'Tablet',

    // Group 3
    'Headphones',
    'Router',
  ] as const
```

Each group of elements (separated by empty lines) is treated independently, and the order within each group is preserved.

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

<Important>
This option must be explicitly set in each configuration object.
</Important>

  type:
  ```ts
  {
    allNamesMatchPattern?:
      | string
      | string[]
      | { pattern: string; flags: string }
      | { pattern: string; flags: string }[]
    matchesAstSelector?: string
  }
  ```

Specifies filters to match a particular options configuration for a given array.

The first matching options configuration will be used. If no configuration matches, the array is left unsorted. No fallback configuration is applied.

- `allNamesMatchPattern` — A regexp pattern that all array elements must match.

Example configuration:
```ts
{
  'perfectionist/sort-arrays': [
    'error',
    {
      groups: ['r', 'g', 'b'], // Sort colors by RGB
      customGroups: [
        {
          elementNamePattern: '^r$',
          groupName: 'r',
        },
        {
          elementNamePattern: '^g$',
          groupName: 'g',
        },
        {
          elementNamePattern: '^b$',
          groupName: 'b',
        },
      ],
      useConfigurationIf: {
        allNamesMatchPattern: '^[rgb]$',
      },
    },
  ],
}
```

- `matchesAstSelector` — An AST selector matching an `ArrayExpression`
 (`[a, b]`) or `NewExpression` (`new Array(a, b)`) node.
To avoid unexpected behavior, do not use `:exit` or `:enter` pseudo-selectors.

Example configuration 1: only sort arrays followed by `as const`.
```ts
{
  'perfectionist/sort-arrays': [
    'error',
    {
      useConfigurationIf: {
        matchesAstSelector: 'TSAsExpression[typeAnnotation.typeName.name=const] > ArrayExpression',
      },
      type: 'alphabetical',
    },
  ],
}
```

Example configuration 2: only sort `ReadonlySet` elements.
```ts
{
  'perfectionist/sort-arrays': [
    'error',
    {
      useConfigurationIf: {
        matchesAstSelector: 'NewExpression[callee.name="ReadonlySet"] > ArrayExpression'
      },
      type: 'alphabetical',
    },
  ],
}
```

Example configuration 3: only sort the `imports` field of `@Component` decorators in Angular.
```ts
{
  'perfectionist/sort-arrays': [
    'error',
    {
      useConfigurationIf: {
        matchesAstSelector: 'Decorator[expression.callee.name="Component"] > CallExpression > ObjectExpression > Property[key.name="imports"] > ArrayExpression'
      },
      type: 'alphabetical',
    },
  ],
}
```

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
        }
    >
  ```

default: `['literal']`

Specifies a list of groups for sorting. Groups help organize elements into categories.

Each element will be assigned a single group specified in the `groups` option (or the `unknown` group if no match is found).
The order of items in the `groups` option determines how groups are ordered.

Within a given group, members will be sorted according to the `type`, `order`, `ignoreCase`, etc. options.

Individual groups can be combined together by placing them in an array. The order of groups in that array does not matter.
All members of the groups in the array will be sorted together as if they were part of a single group.

Predefined groups are characterized by a selector.

##### Selectors

- `'literal'` — Array elements that are not spread values.

**Note:** Spread elements (`...array`) are not sorted and act as partition boundaries. This ensures the original order of spread elements is preserved, which is important because reordering spread elements can change the resulting array values.

#### Group with overridden settings

You may directly override options for a specific group by using an object with the `group` property and other option overrides.

- `type` — Overrides the `type` option for that group.
- `order` — Overrides the `order` option for that group.
- `fallbackSort` — Overrides the `fallbackSort` option for that group.
- `newlinesInside` — Overrides the `newlinesInside` option for that group.

```ts
{
  groups: [
    { group: 'literal', order: 'desc' },
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

### customGroups

  type: `Array<CustomGroupDefinition | CustomGroupAnyOfDefinition>`

default: `[]`

Defines custom groups to match specific array members.

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

An array element will match a `CustomGroupDefinition` group if it matches all the filters of the custom group's definition.

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

An array element will match a `CustomGroupAnyOfDefinition` group if it matches at least one of the `anyOf` items.

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
