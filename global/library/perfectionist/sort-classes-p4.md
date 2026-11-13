---
title: "sort-classes (part 4 of 4)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-classes.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-classes (part 4 of 4)

### customGroups

<Important title="Migrating from the old API">
Support for the object-based `customGroups` option has been removed.

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

You can define your own groups and use regex for matching very specific class members.

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
  elementValuePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
  decoratorNamePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
}
```

A class member will match a `CustomGroupDefinition` group if it matches all the filters of the custom group's definition.

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
      elementValuePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
      decoratorNamePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
  }>
}
```

A class member will match a `CustomGroupAnyOfDefinition` group if it matches all the filters of at least one of the `anyOf` items.

#### Attributes

- `groupName` — The group's name, which needs to be put in the `groups` option.
- `selector` — Filter on the `selector` of the element.
- `modifiers` — Filter on the `modifiers` of the element. (All the modifiers of the element must be present in that list)
- `elementNamePattern` — If entered, will check that the name of the element matches the pattern entered.
- `elementValuePattern` — Only for non-function properties. If entered, will check that the value of the property matches the pattern entered.
- `decoratorNamePattern` — If entered, will check that at least one `decorator` matches the pattern entered.
- `type` — Overrides the `type` option for that custom group.
- `order` — Overrides the `order` option for that custom group.
- `fallbackSort` — Overrides the `fallbackSort` option for that custom group.
- `newlinesInside` — Overrides the `newlinesInside` option for that custom group.

#### Match importance

The `customGroups` list is ordered:
The first custom group definition that matches an element will be used.

Custom groups have a higher priority than any predefined group. If you want a predefined group to take precedence over a custom group,
you must write a custom group definition that does the same as what the predefined group does (using `selector` and `modifiers` filters), and put it first in the list.

Example:

```ts
 {
   groups: [
    'static-block',
    'index-signature',
+   'input-properties',                                     // [!code ++]
+   'output-properties',                                    // [!code ++]
    'constructor',
+   'unsorted-methods-and-other-properties',                // [!code ++]
    ['get-method', 'set-method'],
    'unknown',
   ],
+  customGroups: [                                          // [!code ++]
+    {                                                      // [!code ++]
+      // `constructor()` members must not match            // [!code ++]
+      // `unsorted-methods-and-other-properties`           // [!code ++]
+      // so make them match this first                     // [!code ++]
+       groupName: 'constructor',                           // [!code ++]
+       selector: 'constructor',                            // [!code ++]
+    },                                                     // [!code ++]
+    {                                                      // [!code ++]
+       groupName: 'input-properties',                      // [!code ++]
+       selector: 'property',                               // [!code ++]
+       modifiers: ['decorated'],                           // [!code ++]
+       decoratorNamePattern: 'Input',                      // [!code ++]
+    },                                                     // [!code ++]
+    {                                                      // [!code ++]
+       groupName: 'output-properties',                     // [!code ++]
+       selector: 'property',                               // [!code ++]
+       modifiers: ['decorated'],                           // [!code ++]
+       decoratorNamePattern: 'Output',                     // [!code ++]
+    },                                                     // [!code ++]
+    {                                                      // [!code ++]
+       groupName: 'unsorted-methods-and-other-properties', // [!code ++]
+       type: 'unsorted',                                   // [!code ++]
+       anyOf: [                                            // [!code ++]
+         {                                                 // [!code ++]
+            selector: 'method',                            // [!code ++]
+         },                                                // [!code ++]
+         {                                                 // [!code ++]
+            selector: 'property',                          // [!code ++]
+         },                                                // [!code ++]
+       ]                                                   // [!code ++]
+    },                                                     // [!code ++]
+  ]                                                        // [!code ++]
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
              'perfectionist/sort-classes': [
                'error',
                {
                  type: 'alphabetical',
                  order: 'asc',
                  fallbackSort: { type: 'unsorted' },
                  ignoreCase: true,
                  specialCharacters: 'keep',
                  partitionByComment: false,
                  partitionByNewLine: false,
                  newlinesBetween: 'ignore',
                  newlinesInside: 'ignore',
                  ignoreCallbackDependenciesPatterns: [],
                  groups: [
                    'index-signature',
                    ['static-property', 'static-accessor-property'],
                    ['static-get-method', 'static-set-method'],
                    ['protected-static-property', 'protected-static-accessor-property'],
                    ['protected-static-get-method', 'protected-static-set-method'],
                    ['private-static-property', 'private-static-accessor-property'],
                    ['private-static-get-method', 'private-static-set-method'],
                    'static-block',
                    ['property', 'accessor-property'],
                    ['get-method', 'set-method'],
                    ['protected-property', 'protected-accessor-property'],
                    ['protected-get-method', 'protected-set-method'],
                    ['private-property', 'private-accessor-property'],
                    ['private-get-method', 'private-set-method'],
                    'constructor',
                    ['static-method', 'static-function-property'],
                    ['protected-static-method', 'protected-static-function-property'],
                    ['private-static-method', 'private-static-function-property'],
                    ['method', 'function-property'],
                    ['protected-method', 'protected-function-property'],
                    ['private-method', 'private-function-property'],
                    'unknown',
                  ],
                  customGroups: [],
                  useConfigurationIf: {},
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
            'perfectionist/sort-classes': [
              'error',
              {
                type: 'alphabetical',
                order: 'asc',
                fallbackSort: { type: 'unsorted' },
                ignoreCase: true,
                specialCharacters: 'keep',
                partitionByComment: false,
                partitionByNewLine: false,
                newlinesBetween: 'ignore',
                newlinesInside: 'ignore',
                ignoreCallbackDependenciesPatterns: [],
                groups: [
                  'index-signature',
                  ['static-property', 'static-accessor-property'],
                  ['static-get-method', 'static-set-method'],
                  ['protected-static-property', 'protected-static-accessor-property'],
                  ['protected-static-get-method', 'protected-static-set-method'],
                  ['private-static-property', 'private-static-accessor-property'],
                  ['private-static-get-method', 'private-static-set-method'],
                  'static-block',
                  ['property', 'accessor-property'],
                  ['get-method', 'set-method'],
                  ['protected-property', 'protected-accessor-property'],
                  ['protected-get-method', 'protected-set-method'],
                  ['private-property', 'private-accessor-property'],
                  ['private-get-method', 'private-set-method'],
                  'constructor',
                  ['static-method', 'static-function-property'],
                  ['protected-static-method', 'protected-static-function-property'],
                  ['private-static-method', 'private-static-function-property'],
                  ['method', 'function-property'],
                  ['protected-method', 'protected-function-property'],
                  ['private-method', 'private-function-property'],
                  'unknown',
                ],
                customGroups: [],
                useConfigurationIf: {},
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

This rule was introduced in v0.11.0.

## Resources

- Rule source
- Test source
