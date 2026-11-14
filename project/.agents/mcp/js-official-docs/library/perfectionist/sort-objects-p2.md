---
title: "sort-objects (part 2 of 3)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-objects.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-objects (part 2 of 3)

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

Specifies whether to sort using object keys or values.

- `name` — Use object keys.
- `value` — Use object values.
  - Functions and arrow functions are treated as empty strings.
  - In destructured objects, only assigned values are considered. Other values are treated as empty strings.

### partitionByComment

default: `false`

Enables the use of comments to separate the keys of objects into logical groups. This can help in organizing and maintaining large objects by creating partitions based on comments.

- `true` — All comments will be treated as delimiters, creating partitions.
- `false` — Comments will not be used as delimiters.
- `RegExpPattern = string | { pattern: string; flags: string}` — A regexp pattern to specify which comments should act as delimiters.
- `RegExpPattern[]` — A list of regexp patterns to specify which comments should act as delimiters.
- `{ block: boolean | RegExpPattern | RegExpPattern[]; line: boolean | RegExpPattern | RegExpPattern[] }` — Specify which block and line comments should act as delimiters.

### partitionByNewLine

default: `false`

When `true`, the rule will not sort the object's keys if there is an empty line between them. This helps maintain the defined order of logically separated groups of keys.

```ts
const user = {
  // Group 1
  firstName: 'John',
  lastName: 'Doe',

  // Group 2
  age: 30,
  birthDate: '1990-01-01',

  // Group 3
  email: 'user@example.com',
  phone: '555-555-5555'
};
```

### partitionByComputedKey

default: `false`

Enables the use of computed keys to separate the keys of objects into logical groups.

```ts
const someObject = {
  c: 1,
  d: 2,
  [computedProperty]: 3,
  a: 4
}
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

### styledComponents

default: `true`

Specifies whether this rule should be applied to styled-components like libraries or `style` JSX attribute.

- `true` — Apply the rule to styled-components.
- `false` — Disable the rule for styled-components.

### ignoreCallbackDependenciesPatterns

  type: `string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]`

default: `[]`

Specifies regexp patterns of function names that should ignore dependency sorting in their callback functions.

Example with `ignoreCallbackDependenciesPatterns: ['^computed$']`:

```ts
let {
  fullName = computed(() => role + ' - ' + username),
  role = signal('admin'),
  username = signal('John'),
} = props;
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
    callingFunctionNamePattern?:
      | string
      | string[]
      | { pattern: string; flags?: string; scope?: 'shallow' | 'deep' }
      | { pattern: string; flags?: string; scope?: 'shallow' | 'deep' }[]
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
    objectType?: 'destructured' | 'non-destructured'
    hasNumericKeysOnly?: boolean
    matchesAstSelector?: string
  }
  ```

default: `{}`

Specifies filters to match a particular options configuration for a given object.

The first matching options configuration will be used. If no configuration matches, the default options configuration will be used.

- `allNamesMatchPattern` — A regexp pattern that all object keys must match.

Example configuration:
```ts
{
  'perfectionist/sort-objects': [
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

- `callingFunctionNamePattern` — A regexp pattern for matching objects that are passed as arguments to a function with a specific name.
With `scope: 'deep'`, this setting will also match any object found at any depth within the arguments of the function call.

Example configuration:
```ts
{
  'perfectionist/sort-objects': [
    'error',
    {
      type: 'unsorted', // Don't sort objects passed to createSlice
      useConfigurationIf: {
        callingFunctionNamePattern: '^createSlice$',
      },
    },
    {
      type: 'alphabetical' // Fallback configuration
    }
  ],
}
```

- `declarationMatchesPattern` — A regexp pattern that the object's declaration name must match.
With `scope: 'deep'`, this setting will also match to any object found at any depth within the declaration.

Example configuration:
```ts
{
  'perfectionist/sort-objects': [
    'error',
    {
      type: 'unsorted', // Do not sort metadata objects
      useConfigurationIf: {
        declarationMatchesPattern: 'metadata$',
      },
    },
    {
      type: 'alphabetical' // Fallback configuration
    }
  ],
}
```

- `declarationCommentMatchesPattern` — A regexp pattern to specify which comments above the object declaration should match.
With `scope: 'deep'`, this setting will also match any object found at any depth within the arguments of the function call.

Example configuration:
```ts
{
  'perfectionist/sort-objects': [
    'error',
    {
      type: 'unsorted', // Don't sort objects with a "do not sort" comment
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

- `objectType` — Specifies what type of object to match.

Example configuration:
```ts
{
  'perfectionist/sort-objects': [
    'error',
    {
      type: 'unsorted', // Don't sort destructured objects
      useConfigurationIf: {
        objectType: 'destructured',
      },
    },
    {
      type: 'alphabetical' // Fallback configuration
    }
  ],
}
```

- `hasNumericKeysOnly` — If `true`, matches only objects that have exclusively numeric keys.

This option only detects unquoted numeric literal keys (e.g., `1`, `42`).
Quoted strings like `"1"`, array-wrapped keys like `[1]`, or computed expressions are not detected as numeric keys.

Example configuration:
```ts
{
  'perfectionist/sort-objects': [
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

- `matchesAstSelector` — An AST selector matching an `ObjectExpression` or `ObjectPattern` node.
To avoid unexpected behavior, do not use `:exit` or `:enter` pseudo-selectors.

Example configuration: don't sort objects that are declared as `const` variables.
```ts
{
  'perfectionist/sort-objects': [
    'error',
    {
      useConfigurationIf: {
        matchesAstSelector: 'VariableDeclaration[kind="const"] ObjectExpression',
      },
      type: 'unsorted'
    },
    {
      type: 'alphabetical' // Fallback configuration
    }
  ],
}
```
