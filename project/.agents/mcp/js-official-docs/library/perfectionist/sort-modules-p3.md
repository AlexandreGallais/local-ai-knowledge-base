---
title: "sort-modules (part 3 of 3)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-modules.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-modules (part 3 of 3)

### customGroups

  type: `Array<CustomGroupDefinition | CustomGroupAnyOfDefinition>`

default: `[]`

You can define your own groups and use regex for matching very specific module members.

A custom group definition may follow one of the two following interfaces:

```ts
interface CustomGroupDefinition {
  groupName: string
  type?: 'alphabetical' | 'natural' | 'line-length' | 'usage' | 'unsorted'
  order?: 'asc' | 'desc'
  fallbackSort?: { type: string; order?: 'asc' | 'desc' }
  newlinesInside?: number | 'ignore'
  selector?: string
  modifiers?: string[]
  elementNamePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
  decoratorNamePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
}
```

A module member will match a `CustomGroupDefinition` group if it matches all the filters of the custom group's definition.

or:

```ts
interface CustomGroupAnyOfDefinition {
  groupName: string
  type?: 'alphabetical' | 'natural' | 'line-length' | 'usage' | 'unsorted'
  order?: 'asc' | 'desc'
  fallbackSort?: { type: string; order?: 'asc' | 'desc' }
  newlinesInside?: number | 'ignore'
  anyOf: Array<{
      selector?: string
      modifiers?: string[]
      elementNamePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
      decoratorNamePattern?: string | string[] | { pattern: string; flags?: string } | { pattern: string; flags?: string }[]
  }>
}
```

A module member will match a `CustomGroupAnyOfDefinition` group if it matches all the filters of at least one of the `anyOf` items.

#### Attributes

- `groupName` — The group's name, which needs to be put in the `groups` option.
- `selector` — Filter on the `selector` of the element.
- `modifiers` — Filter on the `modifiers` of the element. (All the modifiers of the element must be present in that list)
- `elementNamePattern` — If entered, will check that the name of the element matches the pattern entered.
- `decoratorNamePattern` — If entered, will check that at least one `decorator` matches the pattern entered.
- `type` — Overrides the `type` option for that custom group.
- `order` — Overrides the `order` option for that custom group.
- `fallbackSort` — Overrides the `fallbackSort` option for that custom group.
- `newlinesInside` — Overrides the `newlinesInside` option for that custom group.

#### Match importance

The `customGroups` list is ordered:
The first custom group definition that matches an element will be used.

Custom groups have a higher priority than any predefined group.

Example:

```ts
 {
   groups: [
    ['export-interface', 'export-type'],
    'enum',
    'class',
+   'input-types-and-interfaces',                 // [!code ++]
+   'output-types-and-interfaces',                // [!code ++]
+   'unsorted-functions',                        // [!code ++]
    'unknown',
   ],
+  customGroups: [                                // [!code ++]
+    {                                            // [!code ++]
+       groupName: 'input-types-and-interfaces',  // [!code ++]
+       anyOf: [                                  // [!code ++]
+         {                                       // [!code ++]
+            selector: 'type',                    // [!code ++]
+            elementNamePattern: 'Input',         // [!code ++]
+         },                                      // [!code ++]
+         {                                       // [!code ++]
+            selector: 'interface',               // [!code ++]
+            elementNamePattern: 'Input',         // [!code ++]
+         },                                      // [!code ++]
+       ]                                         // [!code ++]
+    },                                           // [!code ++]
+    {                                            // [!code ++]
+       groupName: 'output-types-and-interfaces', // [!code ++]
+       anyOf: [                                  // [!code ++]
+         {                                       // [!code ++]
+            selector: 'type',                    // [!code ++]
+            elementNamePattern: 'Output',        // [!code ++]
+         },                                      // [!code ++]
+         {                                       // [!code ++]
+            selector: 'interface',               // [!code ++]
+            elementNamePattern: 'Output',        // [!code ++]
+         },                                      // [!code ++]
+       ]                                         // [!code ++]
+    },                                           // [!code ++]
+    {                                            // [!code ++]
+       groupName: 'unsorted-functions',          // [!code ++]
+       type: 'unsorted',                         // [!code ++]
+       selector: 'function',                     // [!code ++]
+    },                                           // [!code ++]
+  ]                                              // [!code ++]
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
    'class',
    { group: 'enum', type: 'unsorted' }, // Elements from this group will not be sorted
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
              'perfectionist/sort-modules': [
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
                  tsconfig: { rootDir: '' },
                  additionalModuleBlockTypes: [],
                  groups: [
                    'declare-enum',
                    'export-enum',
                    'enum',
                    ['declare-interface', 'declare-type'],
                    ['export-interface', 'export-type'],
                    ['interface', 'type'],
                    'declare-class',
                    'class',
                    'export-class',
                    'declare-function',
                    'export-function',
                    'function'
                  ],
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
            'perfectionist/sort-modules': [
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
                tsconfig: { rootDir: '' },
                additionalModuleBlockTypes: [],
                groups: [
                  'declare-enum',
                  'export-enum',
                  'enum',
                  ['declare-interface', 'declare-type'],
                  ['export-interface', 'export-type'],
                  ['interface', 'type'],
                  'declare-class',
                  'class',
                  'export-class',
                  'declare-function',
                  'export-function',
                  'function'
                ],
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

This rule was introduced in v4.0.0.

## Resources

- Rule source
- Test source
