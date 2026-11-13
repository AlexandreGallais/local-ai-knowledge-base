---
title: "sort-import-attributes"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-import-attributes.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-import-attributes

Enforce sorted import attributes.

This rule keeps attributes inside `import ... with { ... }` consistently ordered. It improves readability, makes diffs smaller, and keeps attribute groups tidy in larger files.

## Try it out

<CodeExample
  rule="sort-import-attributes"
  alphabetical={dedent`
    import data from 'lib' with {
      integrity: 'sha256-...',
      mode: 'no-cors',
      type: 'json',
    }
  `}
  lineLength={dedent`
    import data from 'lib' with {
      integrity: 'sha256-...',
      mode: 'no-cors',
      type: 'json',
    }
  `}
  initial={dedent`
    import data from 'lib' with {
      mode: 'no-cors',
      type: 'json',
      integrity: 'sha256-...',
    }
  `}
  client:load
  lang="tsx"
/>

## Options

This rule accepts an options object with the following properties:

### type

default: `'alphabetical'`

Specifies the sorting method.

- `'alphabetical'` — Sort attributes alphabetically using localeCompare.
- `'natural'` — Sort by natural order (e.g., `link2` < `link10`).
- `'line-length'` — Sort by attribute name length (shorter first by default).
- `'custom'` — Sort using a custom alphabet specified in `alphabet`.
- `'unsorted'` — Do not sort items. `grouping` and `newlines behavior` are still enforced.

### order

default: `'asc'`

Sort direction.

- `'asc'` — Ascending (A→Z, short→long).
- `'desc'` — Descending (Z→A, long→short).

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

Used only when `type` is `'custom'`. Defines the custom character order.

### ignoreCase

default: `true`

Whether to perform case-insensitive comparison for string-based sorts.

### specialCharacters

default: `'keep'`

How to handle special characters before comparison.

- `'keep'` — Keep as-is.
- `'trim'` — Trim leading special characters.
- `'remove'` — Remove all special characters.

### locales

default: `'en-US'`

Locales passed to `localeCompare` for alphabetical/natural sorts.

### partitionByComment

default: `false`

Use comments to split attributes into independent partitions that are sorted separately.

- `true` — Any non-ESLint comment creates a partition.
- `false` — Ignore comments for partitioning.
- `RegExpPattern = string | { pattern: string; flags?: string }` — Pattern for matching comments.
- `RegExpPattern[]` — List of patterns.
- `{ block: boolean | RegExpPattern | RegExpPattern[]; line: boolean | RegExpPattern | RegExpPattern[] }` — Separate settings for block/line comments.

### partitionByNewLine

default: `false`

When `true`, an empty line between attributes creates a partition. Each partition is sorted independently.

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

Specifies filters to match a particular options configuration for a given import.

The first matching options configuration will be used. If no configuration matches, the default options configuration will be used.

- `allNamesMatchPattern` — A regexp pattern that all import attributes must match.

Example configuration:
```ts
{
  'perfectionist/sort-import-attributes': [
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

- `matchesAstSelector` — An AST selector matching an `ImportDeclaration` node.
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
          fallbackSort?: { type: string; order?: 'asc' | 'desc' };
          newlinesInside?: number | 'ignore';
        }
    >
  ```

default: `[]`

Defines the order of attribute groups. Unknown attributes are placed after the last group.

You can mix predefined (none for this rule) and custom groups. Typical usage is with custom groups declared via `elementNamePattern`.

Example: put any attribute starting with `type` before others, and require a newline between groups.

```ts
{
  groups: ['type-attrs', 'unknown'],
  customGroups: [
    { groupName: 'type-attrs', elementNamePattern: '^type' },
  ],
  newlinesBetween: 1
}
```

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

Define custom attribute groups with optional per-group sort overrides.

```ts
type CustomGroup = {
  groupName: string
  // Match by attribute name
  elementNamePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]

  // Optional per-group overrides:
  type?: 'alphabetical' | 'natural' | 'line-length' | 'custom' | 'unsorted'
  order?: 'asc' | 'desc'
  fallbackSort?: { type: string; order?: 'asc' | 'desc' }
  newlinesInside?: number | 'ignore'
}[]
```

An attribute matches a custom group when its name satisfies `elementNamePattern`. The first matching definition wins.

## Usage

<CodeTabs
  code={[
    {
      source: dedent`
        // eslint.config.js
        import perfectionist from 'eslint-plugin-perfectionist'

        export default [
          {
            plugins: { perfectionist },
            rules: {
              'perfectionist/sort-import-attributes': [
                'error',
                {
                  type: 'alphabetical',
                  order: 'asc',
                  fallbackSort: { type: 'unsorted' },
                  ignoreCase: true,
                  specialCharacters: 'keep',
                  locales: 'en-US',
                  alphabet: '',
                  partitionByComment: false,
                  partitionByNewLine: false,
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
          plugins: ['perfectionist'],
          rules: {
            'perfectionist/sort-import-attributes': [
              'error',
              {
                type: 'alphabetical',
                order: 'asc',
                fallbackSort: { type: 'unsorted' },
                ignoreCase: true,
                specialCharacters: 'keep',
                locales: 'en-US',
                alphabet: '',
                partitionByComment: false,
                partitionByNewLine: false,
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

This rule was introduced in v5.0.0.

## Resources

- Rule source
- Test source
