---
title: "sort-interfaces (part 3 of 3)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-interfaces.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-interfaces (part 3 of 3)

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

Defines custom groups to match specific interface members.

A custom group definition may follow one of the two following interfaces:

```ts
interface CustomGroupDefinition {
  groupName: string
  type?: 'alphabetical' | 'natural' | 'line-length' | 'unsorted'
  order?: 'asc' | 'desc'
  fallbackSort?: { type: string; order?: 'asc' | 'desc'; sortBy?: 'name' | 'value' }
  sortBy?: 'name' | 'value'
  newlinesInside?: number | 'ignore'
  selector?: string
  modifiers?: string[]
  elementNamePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
  elementValuePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
}
```

An interface member will match a `CustomGroupDefinition` group if it matches all the filters of the custom group's definition.

or:

```ts
interface CustomGroupAnyOfDefinition {
  groupName: string
  type?: 'alphabetical' | 'natural' | 'line-length' | 'unsorted'
  order?: 'asc' | 'desc'
  fallbackSort?: { type: string; order?: 'asc' | 'desc'; sortBy?: 'name' | 'value' }
  sortBy?: 'name' | 'value'
  newlinesInside?: number | 'ignore'
  anyOf: Array<{
      selector?: string
      modifiers?: string[]
      elementNamePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
      elementValuePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
  }>
}
```

An interface member will match a `CustomGroupAnyOfDefinition` group if it matches all the filters of at least one of the `anyOf` items.

#### Attributes

- `groupName` — The group's name, which needs to be put in the `groups` option.
- `selector` — Filter on the `selector` of the element.
- `modifiers` — Filter on the `modifiers` of the element. (All the modifiers of the element must be present in that list)
- `elementNamePattern` — If entered, will check that the name of the element matches the pattern entered.
- `elementValuePattern` — Only for properties. If entered, will check that the value of the property matches the pattern entered.
- `type` — Overrides the `type` option for that custom group.
- `order` — Overrides the `order` option for that custom group.
- `fallbackSort` — Overrides the `fallbackSort` option for that custom group.
- `sortBy` — Overrides the `sortBy` option for that custom group.
- `newlinesInside` — Overrides the `newlinesInside` option for that group.

#### Match importance

The `customGroups` list is ordered:
The first custom group definition that matches an element will be used.

Custom groups have a higher priority than any predefined group.

#### Example

Put all properties starting with `id` and `name` at the top, combine and sort metadata and optional multiline properties at the bottom.
Anything else is put in the middle.

```ts
interface User {
  id: string                 // top
  name: string               // top
  age: number                // unknown
  isAdmin: boolean           // unknown
  lastUpdated_metadata: Date // bottom
  localization?: {            // optional-multiline-member
    // Stuff about localization
  }
  version_metadata: string   // bottom
}
```

`groups` and `customGroups` configuration:

```ts
 {
   groups: [
+    'top',                                  // [!code ++]
     'unknown',
+    ['optional-multiline-member', 'bottom'] // [!code ++]
   ],
+  customGroups: [                           // [!code ++]
+    {                                       // [!code ++]
+       groupName: 'top',                    // [!code ++]
+       selector: 'property',                // [!code ++]
+       elementNamePattern: '^(?:id|name)$', // [!code ++]
+    },                                      // [!code ++]
+    {                                       // [!code ++]
+       groupName: 'bottom',                 // [!code ++]
+       selector: 'property',                // [!code ++]
+       elementNamePattern: '.+_metadata$',  // [!code ++]
+    }                                       // [!code ++]
+  ]                                         // [!code ++]
 }
```

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
              'perfectionist/sort-interfaces': [
                'error',
                {
                  type: 'alphabetical',
                  order: 'asc',
                  fallbackSort: { type: 'unsorted' },
                  ignoreCase: true,
                  specialCharacters: 'keep',
                  sortBy: 'name',
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
          plugins: [
            'perfectionist',
          ],
          rules: {
            'perfectionist/sort-interfaces': [
              'error',
              {
                type: 'alphabetical',
                order: 'asc',
                fallbackSort: { type: 'unsorted' },
                ignoreCase: true,
                specialCharacters: 'keep',
                sortBy: 'name',
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

This rule was introduced in v0.1.0.

## Resources

- Rule source
- Test source
