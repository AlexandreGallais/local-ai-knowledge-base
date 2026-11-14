---
title: "sort-objects (part 3 of 3)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-objects.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-objects (part 3 of 3)

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

Specifies a list of object keys groups for sorting. Groups help organize object keys into categories, making your objects more readable and maintainable.

Each property will be assigned a single group specified in the `groups` option (or the `unknown` group if no match is found).
The order of items in the `groups` option determines how groups are ordered.

Within a given group, members will be sorted according to the `type`, `order`, `ignoreCase`, etc. options.

Individual groups can be combined together by placing them in an array. The order of groups in that array does not matter.
All members of the groups in the array will be sorted together as if they were part of a single group.

Predefined groups are characterized by a single selector and potentially multiple modifiers. You may enter modifiers in any order, but the selector must always come at the end.

#### Example

```ts
let user = {
  firstName: "John", // unknown
  lastName: "Doe",  // unknown
  username: "john_doe",  // unknown
  job: {            // multiline-member
    // Stuff about job
  },
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

#### Methods

- Selectors: `'method'`, `'member'`.
- Modifiers: `'multiline'`.
- Example: `'multiline-method'`, `'method'`, `'member'`.

#### Properties

- Selectors: `'property'`, `'member'`.
- Modifiers: `'multiline'`.
- Example: `'multiline-property'`, `'property'`, `'member'`.

##### The `unknown` group

Members that don't fit into any group specified in the `groups` option will be placed in the `unknown` group. If the `unknown` group is not specified in the `groups` option,
it will automatically be added to the end of the list.

#### Important notes

##### Behavior when multiple groups match an element

The lists of modifiers above are sorted by importance, from most to least important.
In case of multiple groups matching an element, the following rules will be applied:

1. The group with the most modifiers matching will be selected.
2. If modifiers quantity is the same, order will be chosen based on modifier importance as listed above.

Example :

```ts
interface Test {
  multilineMethod: () => {
      property: string;
    }
}
```

`'multilineMethod'` can be matched by the following groups, from most to least important:
- `'multiline-method'`.
- `'method'`.
- `'multiline-member'`.
- `'member'`.
- `'unknown'`.

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

Defines custom groups to match specific object keys.

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

An object will match a `CustomGroupDefinition` group if it matches all the filters of the custom group's definition.

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

An object will match a `CustomGroupAnyOfDefinition` group if it matches all the filters of at least one of the `anyOf` items.

#### Attributes

- `groupName` — The group's name, which needs to be put in the `groups` option.
- `selector` — Filter on the `selector` of the element.
- `modifiers` — Filter on the `modifiers` of the element. (All the modifiers of the element must be present in that list)
- `elementNamePattern` — If entered, will check that the name of the element matches the pattern entered.
- `elementValuePattern` — Only for non-function properties. If entered, will check that the value of the property matches the pattern entered.
- `type` — Overrides the `type` option for that custom group.
- `order` — Overrides the `order` option for that custom group.
- `sortBy` — Overrides the `sortBy` option for that custom group.
- `fallbackSort` — Overrides the `fallbackSort` option for that custom group.
- `newlinesInside` — Overrides the `newlinesInside` option for that custom group.

#### Match importance

The `customGroups` list is ordered:
The first custom group definition that matches an element will be used.

Custom groups have a higher priority than any predefined group.

#### Example

Put all properties starting with `id` and `name` at the top, combine and sort metadata and multiline properties at the bottom.
Anything else is put in the middle.

```ts
let user = {
  id: "id",                 // top
  name: "John",               // top
  age: 42,                // unknown
  isAdmin: true,           // unknown
  lastUpdated_metadata: null, // bottom
  localization: {            // multiline-member
    // Stuff about localization
  },
  version_metadata: "1"   // bottom
}
```

`groups` and `customGroups` configuration:

```ts
 {
   groups: [
+    'top',                                  // [!code ++]
     'unknown',
+    ['multiline-member', 'bottom'] // [!code ++]
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
              'perfectionist/sort-objects': [
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
                  partitionByComputedKey: false,
                  newlinesBetween: 'ignore',
                  newlinesInside: 'ignore',
                  styledComponents: true,
                  useConfigurationIf: {},
                  ignoreCallbackDependenciesPatterns: [],
                  groups: [],
                  customGroups: [],
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
            'perfectionist/sort-objects': [
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
                partitionByComputedKey: false,
                newlinesBetween: 'ignore',
                newlinesInside: 'ignore',
                styledComponents: true,
                useConfigurationIf: {},
                ignoreCallbackDependenciesPatterns: [],
                groups: [],
                customGroups: [],
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

This rule was introduced in v0.6.0.

## Resources

- Rule source
- Test source
