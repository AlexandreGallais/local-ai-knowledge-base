---
title: "sort-jsx-props (part 1 of 2)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-jsx-props.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-jsx-props

Enforce sorted JSX props within JSX elements.

Ensure sorted JSX props within your elements to maintain order and readability. Navigating through numerous props can become challenging, especially as components grow in complexity. This rule enforces consistent sorting, making your code cleaner and easier to manage.

This practice enhances the readability and maintainability of the code by providing a predictable organization of properties.
It also sometimes reduces possible errors caused by misplaced or unordered props.

<Important>
  If you use the
  `jsx-sort-props`
  rule from the
  `eslint-plugin-react`
  plugin, it is highly recommended to disable
  it
  to avoid conflicts.
</Important>

It's **safe**. The rule considers spread elements in a props list and does not break component functionality.

## Try it out

<CodeExample
  rule="sort-jsx-props"
  alphabetical={dedent`
    const AuthForm = ({ handleSubmit, setUsername, t }) => (
      <form
        action="/auth-user"
        method="post"
        onSubmit={handleSubmit}
      >
        }
          full
          label={t.username}
          name="user"
          onChange={event => setUsername(event.target.value)}
          placeholder={t['enter-username']}
          size="l"
        />

          Submit

      </form>
    )
  `}
  lineLength={dedent`
    const AuthForm = ({ handleSubmit, setUsername, t }) => (
      <form
        onSubmit={handleSubmit}
        action="/auth-user"
        method="post"
      >
         setUsername(event.target.value)}
          placeholder={t['enter-username']}
          end={<UserProfileIcon />}
          label={t.username}
          color="secondary"
          name="user"
          size="l"
          full
        />

          Submit

      </form>
    )
  `}
  initial={dedent`
    const AuthForm = ({ handleSubmit, setUsername, t }) => (
      <form
        method="post"
        onSubmit={handleSubmit}
        action="/auth-user"
      >
        }
          full
          onChange={event => setUsername(event.target.value)}
          label={t.username}
          name="user"
          color="secondary"
        />

          Submit

      </form>
    )
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

### partitionByNewLine

default: `false`

When `true`, the rule will not sort members if there is an empty line between them. This helps maintain the defined order of logically separated groups of members.

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
    tagMatchesPattern?:
      | string
      | string[]
      | { pattern: string; flags: string }
      | { pattern: string; flags: string }[]
    matchesAstSelector?: string
  }
  ```

default: `{}`

Specifies filters to match a particular options configuration for a given JSX element.

The first matching options configuration will be used. If no configuration matches, the default options configuration will be used.

- `allNamesMatchPattern` — A regexp pattern that all keys must match.

Example configuration:
```ts
{
  'perfectionist/sort-jsx-props': [
    'error',
    {
      groups: ['r', 'g', 'b'], // Sort tag with colors keys by RGB
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

- `tagMatchesPattern` — A regexp pattern that the JSX tag must match.

Example configuration:
```ts
{
  'perfectionist/sort-jsx-props': [
    'error',
    {
      type: 'unsorted', // Do not sort Component elements
      useConfigurationIf: {
        tagMatchesPattern: 'Component$',
      },
    },
    {
      type: 'alphabetical' // Fallback configuration
    }
  ],
}
```

- `matchesAstSelector` — An AST selector matching a `JSXElement` node.
To avoid unexpected behavior, do not use `:exit` or `:enter` pseudo-selectors.

Example configuration: don't sort JSX objects that are declared as `const` variables.
```ts
{
  'perfectionist/sort-jsx-props': [
    'error',
    {
      useConfigurationIf: {
        matchesAstSelector: 'VariableDeclaration[kind="const"] JSXElement',
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

Specifies a list of JSX props groups for sorting. Groups help organize props into categories, making your components more readable and maintainable.

Each element will be assigned a single group specified in the `groups` option (or the `unknown` group if no match is found).
The order of items in the `groups` option determines how groups are ordered.

Within a given group, members will be sorted according to the `type`, `order`, `ignoreCase`, etc. options.

Individual groups can be combined together by placing them in an array. The order of groups in that array does not matter.
All members of the groups in the array will be sorted together as if they were part of a single group.

Predefined groups are characterized by a single selector and potentially multiple modifiers. You may enter modifiers in any order, but the selector must always come at the end.

#### Selectors

The only selector possible for this rule is `'prop'`.

#### Modifiers

- `'multiline'` — Matches multiline props.
- `'shorthand'` — Matches shorthand props, which are used without a value, typically for boolean props.

Example: `shorthand-prop`.

#### Group with overridden settings

You may directly override options for a specific group by using an object with the `group` property and other option overrides.

- `type` — Overrides the `type` option for that group.
- `order` — Overrides the `order` option for that group.
- `fallbackSort` — Overrides the `fallbackSort` option for that group.
- `newlinesInside` — Overrides the `newlinesInside` option for that group.

```ts
{
  groups: [
    'multiline-prop',
    { group: 'shorthand-prop', type: 'unsorted' }, // Elements from this group will not be sorted
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

<Important title="Migrating from the old API">
Support for the object-based `customGroups` option is deprecated.

Migrating from the old to the current API is easy:

Old API:
```ts
{
  "key1": "value1",
  "key2": "value2"
}
```

Current API:
```ts
[
  {
    "groupName": "key1",
    "elementNamePattern": "value1"
  },
  {
    "groupName": "key2",
    "elementNamePattern": "value2"
  }
]
```
</Important>

  type: `Array<CustomGroupDefinition | CustomGroupAnyOfDefinition>`

default: `[]`

Defines custom groups to match specific JSX props.

A custom group definition may follow one of the two following interfaces:

```ts
interface CustomGroupDefinition {
  groupName: string
  type?: 'alphabetical' | 'natural' | 'line-length' | 'unsorted'
  order?: 'asc' | 'desc'
  fallbackSort?: { type: string; order?: 'asc' | 'desc'; sortBy?: 'name' | 'value' }
  newlinesInside?: number | 'ignore'
  selector?: string
  modifiers?: string[]
  elementNamePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
  elementValuePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
}
```

A JSX prop will match a `CustomGroupDefinition` group if it matches all the filters of the custom group's definition.

or:

```ts
interface CustomGroupAnyOfDefinition {
  groupName: string
  type?: 'alphabetical' | 'natural' | 'line-length' | 'unsorted'
  order?: 'asc' | 'desc'
  fallbackSort?: { type: string; order?: 'asc' | 'desc'; sortBy?: 'name' | 'value' }
  newlinesInside?: number | 'ignore'
  anyOf: Array<{
      selector?: string
      modifiers?: string[]
      elementNamePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
      elementValuePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
  }>
}
```

A JSX prop will match a `CustomGroupAnyOfDefinition` group if it matches all the filters of at least one of the `anyOf` items.

#### Attributes

- `groupName` — The group's name, which needs to be put in the `groups` option.
- `selector` — Filter on the `selector` of the element.
- `modifiers` — Filter on the `modifiers` of the element. (All the modifiers of the element must be present in that list)
- `elementNamePattern` — If entered, will check that the name of the element matches the pattern entered.
- `elementValuePattern` — If entered, will check that the value of the element matches the pattern entered.
- `type` — Overrides the `type` option for that custom group.
- `order` — Overrides the `order` option for that custom group.
- `fallbackSort` — Overrides the `fallbackSort` option for that custom group.
- `newlinesInside` — Overrides the `newlinesInside` option for that custom group.

#### Match importance

The `customGroups` list is ordered:
The first custom group definition that matches an element will be used.

Custom groups have a higher priority than any predefined group.

#### Example

```ts
 {
   groups: [
     'multiline-prop',
     'unknown',
     'shorthand-prop',
+    'callback',       // [!code ++]
   ],
+  customGroups: [     // [!code ++]
+    {                 // [!code ++]
+      groupName: 'callback',      // [!code ++]
+      elementNamePattern: '^on.+' // [!code ++]
+    }                 // [!code ++]
+  ]                   // [!code ++]
 }
```
