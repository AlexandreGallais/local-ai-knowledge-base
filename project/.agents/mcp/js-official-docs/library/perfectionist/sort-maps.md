---
title: "sort-maps"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-maps.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-maps

Enforce sorted elements within JavaScript Map object.

Sorting elements within JavaScript Map objects provides a clear and predictable structure to the codebase. This rule detects instances where Map elements are not sorted and raises linting errors, encouraging developers to arrange elements in the desired order.

By maintaining a consistent structure across Map objects, this rule improves readability and makes it easier to locate and understand key-value pairs.

## Try it out

<CodeExample
  rule="sort-maps"
  alphabetical={dedent`
    const products = new Map([
      ['keyboard', { name: 'Keyboard', price: 50 }],
      ['laptop', { name: 'Laptop', price: 1000 }],
      ['monitor', { name: 'Monitor', price: 200 }],
      ['mouse', { name: 'Mouse', price: 25 }],
    ])

    const categories = new Map([
      ['accessories', { name: 'Accessories' }],
      ['clothing', { name: 'Clothing' }],
      ['electronics', { name: 'Electronics' }],
      ['furniture', { name: 'Furniture' }],
    ])
  `}
  lineLength={dedent`
    const products = new Map([
      ['keyboard', { name: 'Keyboard', price: 50 }],
      ['monitor', { name: 'Monitor', price: 200 }],
      ['laptop', { name: 'Laptop', price: 1000 }],
      ['mouse', { name: 'Mouse', price: 25 }],
    ])

    const categories = new Map([
      ['electronics', { name: 'Electronics' }],
      ['accessories', { name: 'Accessories' }],
      ['furniture', { name: 'Furniture' }],
      ['clothing', { name: 'Clothing' }],
    ])
  `}
  initial={dedent`
    const products = new Map([
      ['monitor', { name: 'Monitor', price: 200 }],
      ['laptop', { name: 'Laptop', price: 1000 }],
      ['mouse', { name: 'Mouse', price: 25 }],
      ['keyboard', { name: 'Keyboard', price: 50 }],
    ])

    const categories = new Map([
      ['electronics', { name: 'Electronics' }],
      ['furniture', { name: 'Furniture' }],
      ['clothing', { name: 'Clothing' }],
      ['accessories', { name: 'Accessories' }],
    ])
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

Enables the use of comments to separate the members of maps into logical groups. This can help in organizing and maintaining large maps by creating partitions based on comments.

- `true` — All comments will be treated as delimiters, creating partitions.
- `false` — Comments will not be used as delimiters.
- `RegExpPattern = string | { pattern: string; flags: string}` — A regexp pattern to specify which comments should act as delimiters.
- `RegExpPattern[]` — A list of regexp patterns to specify which comments should act as delimiters.
- `{ block: boolean | RegExpPattern | RegExpPattern[]; line: boolean | RegExpPattern | RegExpPattern[] }` — Specify which block and line comments should act as delimiters.

### partitionByNewLine

default: `false`

When `true`, the rule will not sort the members of a map if there is an empty line between them. This helps maintain the defined order of logically separated groups of members.

```ts
new Map([
     // Group 1
    ['Drone', 0],
    ['Keyboard', 1],
    ['Mouse', 3],
    ['Smartphone', 4],

    // Group 2
    ['Laptop', 5],
    ['Monitor', 6],
    ['Smartwatch', 7],
    ['Tablet', 8],

    // Group 3
    ['Headphones', 9],
    ['Router', 10],
  ])
```

Each group of map members (separated by empty lines) is treated independently, and the order within each group is preserved.

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
    matchesAstSelector?: string
  }
  ```

default: `{}`

Specifies filters to match a particular options configuration for a given map.

The first matching options configuration will be used. If no configuration matches, the default options configuration will be used.

- `allNamesMatchPattern` — A regexp pattern that all map keys must match.

Example configuration:
```ts
{
  'perfectionist/sort-maps': [
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
    {
      type: 'alphabetical' // Fallback configuration
    }
  ],
}
```

- `matchesAstSelector` — An AST selector matching a `NewExpression` node.
To avoid unexpected behavior, do not use `:exit` or `:enter` pseudo-selectors.

Example configuration: don't sort maps that are declared as `const` variables.
```ts
{
  'perfectionist/sort-maps': [
    'error',
    {
      useConfigurationIf: {
        matchesAstSelector: 'VariableDeclaration[kind="const"] NewExpression',
      },
      type: 'unsorted'
    },
    {
      type: 'alphabetical' // Fallback configuration
    }
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

default: `[]`

Specifies a list of groups for sorting. Groups help organize elements into categories.

Each element will be assigned a single group specified in the `groups` option (or the `unknown` group if no match is found).
The order of items in the `groups` option determines how groups are ordered.

Within a given group, members will be sorted according to the `type`, `order`, `ignoreCase`, etc. options.

Individual groups can be combined together by placing them in an array. The order of groups in that array does not matter.
All members of the groups in the array will be sorted together as if they were part of a single group.

#### Group with overridden settings

You may directly override options for a specific group by using an object with the `group` property and other option overrides.

- `type` — Overrides the `type` option for that group.
- `order` — Overrides the `order` option for that group.
- `fallbackSort` — Overrides the `fallbackSort` option for that group.
- `newlinesInside` — Overrides the `newlinesInside` option for that group.

```ts
{
  groups: [
    'myCustomGroup1',
    { group: 'myCustomGroup2', type: 'unsorted' }, // Elements from this group will not be sorted
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

Defines custom groups to match specific elements.

A custom group definition may follow one of the two following interfaces:

```ts
interface CustomGroupDefinition {
  groupName: string
  type?: 'alphabetical' | 'natural' | 'line-length' | 'unsorted'
  order?: 'asc' | 'desc'
  fallbackSort?: { type: string; order?: 'asc' | 'desc' }
  newlinesInside?: number | 'ignore'
  elementNamePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
}
```

A map element will match a `CustomGroupDefinition` group if it matches all the filters of the custom group's definition.

or:

```ts
interface CustomGroupAnyOfDefinition {
  groupName: string
  type?: 'alphabetical' | 'natural' | 'line-length' | 'unsorted'
  order?: 'asc' | 'desc'
  fallbackSort?: { type: string; order?: 'asc' | 'desc' }
  newlinesInside?: number | 'ignore'
  anyOf: Array<{
      elementNamePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
  }>
}
```

A map element will match a `CustomGroupAnyOfDefinition` group if it matches all the filters of at least one of the `anyOf` items.

#### Attributes

- `groupName` — The group's name, which needs to be put in the `groups` option.
- `elementNamePattern` — If entered, will check that the name of the element matches the pattern entered.
- `type` — Overrides the `type` option for that custom group.
- `order` — Overrides the `order` option for that custom group.
- `fallbackSort` — Overrides the `fallbackSort` option for that custom group.
- `newlinesInside` — Overrides the `newlinesInside` option for that custom group.

#### Match importance

The `customGroups` list is ordered:
The first custom group definition that matches an element will be used.

Custom groups have a higher priority than any predefined group.

## Usage

<CodeTabs
  code={[
    {
      source: dedent`
        // eslint.config.js
        import perfectionist from 'eslint-plugin-perfectionist'

        export default [
          {
            plugins: {
              perfectionist,
            },
            rules: {
              'perfectionist/sort-maps': [
                'error',
                {
                  type: 'alphabetical',
                  order: 'asc',
                  fallbackSort: { type: 'unsorted' },
                  ignoreCase: true,
                  specialCharacters: 'keep',
                  partitionByNewLine: false,
                  partitionByComment: false,
                  newlinesBetween: 'ignore',
                  newlinesInside: 'ignore',
                  useConfigurationIf: {},
                  groups: [],
                  customGroups: [],
                },
              ],
            },
          },
        ]
      `,
      name: 'Flat Config',
      value: 'flat',
    },
    {
      source: dedent`
        // .eslintrc.js
        module.exports = {
          plugins: [
            'perfectionist',
          ],
          rules: {
            'perfectionist/sort-maps': [
              'error',
              {
                type: 'alphabetical',
                order: 'asc',
                fallbackSort: { type: 'unsorted' },
                ignoreCase: true,
                specialCharacters: 'keep',
                partitionByNewLine: false,
                partitionByComment: false,
                newlinesBetween: 'ignore',
                newlinesInside: 'ignore',
                useConfigurationIf: {},
                groups: [],
                customGroups: [],
              },
            ],
          },
        }
      `,
      name: 'Legacy Config',
      value: 'legacy',
    },
  ]}
  type="config-type"
  client:load
  lang="tsx"
/>

## Version

This rule was introduced in v0.5.0.

## Resources

- Rule source
- Test source
