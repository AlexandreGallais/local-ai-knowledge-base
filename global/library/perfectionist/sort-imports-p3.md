---
title: "sort-imports (part 3 of 3)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-imports.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-imports (part 3 of 3)

### customGroups

<Important title="Migrating from the old API">
Support for the object-based `customGroups` option is deprecated.

Here is how to migrate from the old to the current API:

Old API:
```ts
{
  value: {
    "keyForValue1": "value1",
    "keyForValue2": "value2"
  },
  type: {
    "keyForType1": "value1",
    "keyForType2": "value2"
  }
}
```

Current API:
```ts
[
  {
    "selector": "type",
    "groupName": "keyForType1",
    "elementNamePattern": "value1"
  },
  {
    "selector": "type",
    "groupName": "keyForType2",
    "elementNamePattern": "value2"
  },
  {
    "groupName": "keyForValue1",
    "elementNamePattern": "value1"
  },
  {
    "groupName": "keyForValue2",
    "elementNamePattern": "value2"
  }
]
```
</Important>

  type: `Array<CustomGroupDefinition | CustomGroupAnyOfDefinition>`

default: `[]`

You can define your own groups and use regex for matching very specific imports.

A custom group definition may follow one of the two following interfaces:

```ts
interface CustomGroupDefinition {
  groupName: string
  type?: 'alphabetical' | 'natural' | 'line-length' | 'unsorted'
  order?: 'asc' | 'desc'
  fallbackSort?: { type: string; order?: 'asc' | 'desc' }
  newlinesInside?: number | 'ignore'
  selector?: string
  modifiers?: string[]
  elementNamePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
}
```

An import will match a `CustomGroupDefinition` group if it matches all the filters of the custom group's definition.

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
      modifiers?: string[]
      elementNamePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
  }>
}
```

An import will match a `CustomGroupAnyOfDefinition` group if it matches all the filters of at least one of the `anyOf` items.

#### Attributes

- `groupName` — The group's name, which needs to be put in the `groups` option.
- `selector` — Filter on the `selector` of the element.
- `modifiers` — Filter on the `modifiers` of the element. (All the modifiers of the element must be present in that list)
- `elementNamePattern` — If entered, will check that the name of the element matches the pattern entered.
- `type` — Overrides the `type` option for that custom group.
- `order` — Overrides the `order` option for that custom group.
- `fallbackSort` — Overrides the `fallbackSort` option for that custom group.
- `newlinesInside` — Overrides the `newlinesInside` option for that custom group.

#### Match importance

The `customGroups` list is ordered:
The first custom group definition that matches an element will be used.

Custom groups have a higher priority than any predefined group. If you want a predefined group to take precedence over a custom group,
you must write a custom group definition that does the same as what the predefined group does (using `selector` and `modifiers` filters), and put it first in the list.

#### Example

```ts
 {
   groups: [
+    'react',                           // [!code ++]
     'type-import',
     ['value-builtin', 'value-external'],
+    'lodash',                          // [!code ++]
     'type-internal',
     'value-internal',
     ['type-parent', 'type-sibling', 'type-index'],
     ['value-parent', 'value-sibling', 'value-index'],
     'ts-equals-import',
     'unknown',
   ],
+  customGroups: [                      // [!code ++]
+    {                                // [!code ++]
+      groupName: 'react',             // [!code ++]
+      elementNamePattern: ['^react$', '^react-.+'], // [!code ++]
+    },                                 // [!code ++]
+    {                                 // [!code ++]
+      groupName: 'lodash',           // [!code ++]
+      elementNamePattern: 'lodash', // [!code ++]
+    }                               // [!code ++]
+  ],                                   // [!code ++]
 }
```

### environment

default: `'node'`

Specifies which environment's built-in modules should be recognized. If you are using Bun, change the value to `'bun'`.

### [DEPRECATED] useExperimentalDependencyDetection

default: `true`

Specifies whether to use a new experimental dependency detection logic, with reduced false positives.

- `true` — Use the new experimental dependency detection logic.
- `false` — Use the legacy dependency detection logic.

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
              'perfectionist/sort-imports': [
                'error',
                {
                  type: 'alphabetical',
                  order: 'asc',
                  fallbackSort: { type: 'unsorted' },
                  ignoreCase: true,
                  specialCharacters: 'keep',
                  sortBy: 'path',
                  internalPattern: ['^~/.+', '^@/.+', '^#.+'],
                  partitionByComment: false,
                  partitionByNewLine: false,
                  newlinesBetween: 1,
                  newlinesInside: 0,
                  maxLineLength: undefined,
                  tsconfig: { rootDir: '' },
                  groups: [
                    'type-import',
                    ['value-builtin', 'value-external'],
                    'type-internal',
                    'value-internal',
                    ['type-parent', 'type-sibling', 'type-index'],
                    ['value-parent', 'value-sibling', 'value-index'],
                    'ts-equals-import',
                    'unknown',
                  ],
                  customGroups: [],
                  environment: 'node',
                  useExperimentalDependencyDetection: true,
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
            'perfectionist/sort-imports': [
              'error',
              {
                type: 'alphabetical',
                order: 'asc',
                fallbackSort: { type: 'unsorted' },
                ignoreCase: true,
                specialCharacters: 'keep',
                sortBy: 'path',
                internalPattern: ['^~/.+', '^@/.+', '^#.+'],
                partitionByComment: false,
                partitionByNewLine: false,
                newlinesBetween: 1,
                newlinesInside: 0,
                maxLineLength: undefined,
                tsconfig: { rootDir: '' },
                groups: [
                  'type-import',
                  ['value-builtin', 'value-external'],
                  'type-internal',
                  'value-internal',
                  ['type-parent', 'type-sibling', 'type-index'],
                  ['value-parent', 'value-sibling', 'value-index'],
                  'ts-equals-import',
                  'unknown',
                ],
                customGroups: [],
                environment: 'node',
                useExperimentalDependencyDetection: true,
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

This rule was introduced in v0.9.0.

## Resources

- Rule source
- Test source
