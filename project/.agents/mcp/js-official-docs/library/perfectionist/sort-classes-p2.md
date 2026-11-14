---
title: "sort-classes (part 2 of 4)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-classes.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-classes (part 2 of 4)

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

Example: enforce subgroup ordering for getters and setters.
```ts
{
  groups: [['get-method', 'set-method']],
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

Enables the use of comments to separate the class members into logical groups. This can help in organizing and maintaining large classes by creating partitions within the class based on comments.

- `true` — All comments will be treated as delimiters, creating partitions.
- `false` — Comments will not be used as delimiters.
- `RegExpPattern = string | { pattern: string; flags: string}` — A regexp pattern to specify which comments should act as delimiters.
- `RegExpPattern[]` — A list of regexp patterns to specify which comments should act as delimiters.
- `{ block: boolean | RegExpPattern | RegExpPattern[]; line: boolean | RegExpPattern | RegExpPattern[] }` — Specify which block and line comments should act as delimiters.

### partitionByNewLine

default: `false`

When `true`, the rule will not sort the members of a class if there is an empty line between them. This helps maintain the defined order of logically separated groups of members.

```ts
class User {
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

  // Group 4
  updateAddress(address: string) {}
  updatePhone(phone?: string) {}

  // Group 5
  editFirstName(firstName: string) {}
  editLastName(lastName: string) {}
};
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

Specifies how to handle newlines between overload signatures and the implementation of the same method.

- `'ignore'` — Do not report errors related to newlines.
- `0` — No newlines are allowed.
- Any other number — Enforce this number of newlines between each overload signature.

### ignoreCallbackDependenciesPatterns

  type: `string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]`

default: `[]`

Specifies regexp patterns of function names that should ignore dependency sorting in their callback functions.

Example with `ignoreCallbackDependenciesPatterns: ['^computed$']`:

```ts
class User {
  fullName = computed(() => this.role + ' - ' + this.username);
  role = signal('admin');
  username = signal('John');
};
```

Without `ignoreCallbackDependenciesPatterns: ['^computed$']`, `role` and `username` would be sorted before `fullName` as it depends on them.

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

Specifies filters to match a particular options configuration for a given class.

The first matching options configuration will be used. If no configuration matches, the default options configuration will be used.

- `allNamesMatchPattern` — A regexp pattern that all class keys must match (index signatures and static blocks are ignored).

Example configuration:
```ts
{
  'perfectionist/sort-classes': [
    'error',
    {
      groups: ['r', 'g', 'b'], // Sort colors by RGB
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

- `matchesAstSelector` — An AST selector matching a `ClassBody` node.
To avoid unexpected behavior, do not use `:exit` or `:enter` pseudo-selectors.

Example configuration: don't sort classes that are exported.
```ts
{
  'perfectionist/sort-classes': [
    'error',
    {
      useConfigurationIf: {
        matchesAstSelector: 'ExportNamedDeclaration ClassBody',
      },
      type: 'unsorted'
    },
    {
      type: 'alphabetical' // Fallback configuration
    }
  ],
}
```
