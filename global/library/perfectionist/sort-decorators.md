---
title: "sort-decorators"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-decorators.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-decorators

Enforce sorted decorators.

Sorting decorators provides a clear and predictable structure to the codebase. This rule detects instances where decorators are not sorted and raises linting errors, encouraging developers to arrange elements in the desired order.

Consistently sorted decorators enhance the overall clarity and organization of your code.

## Try it out

<CodeExample
  rule="sort-decorators"
  alphabetical={dedent`
    @ApiDescription('Create a new user')
    @Authenticated()
    @Controller()
    @Post('/users')
    class CreateUserController {

      @AutoInjected()
      @NotNull()
      userService: UserService;

      @IsBoolean()
      @NotNull()
      accessor disableController: boolean;

      @ApiError({ status: 400, description: 'Bad request' })
      @ApiResponse({ status: 200, description: 'User created successfully' })
      createUser(
        @Body()
        @IsNotEmpty()
        @ValidateNested()
        createUserDto: CreateUserDto
      ): UserDto {
        // ...
      }

    }
  `}
  lineLength={dedent`
    @ApiDescription('Create a new user')
    @Authenticated()
    @Post('/users')
    @Controller()
    class CreateUserController {

      @AutoInjected()
      @NotNull()
      userService: UserService;

      @IsBoolean()
      @NotNull()
      accessor disableController: boolean;

      @ApiResponse({ status: 200, description: 'User created successfully' })
      @ApiError({ status: 400, description: 'Bad request' })
      createUser(
        @ValidateNested()
        @IsNotEmpty()
        @Body()
        createUserDto: CreateUserDto
      ): UserDto {
        // ...
      }

    }
  `}
  initial={dedent`
    @Post('/users')
    @ApiDescription('Create a new user')
    @Authenticated()
    @Controller()
    class CreateUserController {

      @NotNull()
      @AutoInjected()
      userService: UserService;

      @NotNull()
      @IsBoolean()
      accessor disableController: boolean;

      @ApiError({ status: 400, description: 'Bad request' })
      @ApiResponse({ status: 200, description: 'User created successfully' })
      createUser(
        @IsNotEmpty()
        @ValidateNested()
        @Body()
        createUserDto: CreateUserDto
      ): UserDto {
        // ...
      }

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

### sortOnClasses

default: `true`

Controls whether sorting should be enabled for class decorators.

### sortOnMethods

default: `true`

Controls whether sorting should be enabled for class method decorators.

### sortOnProperties

default: `true`

Controls whether sorting should be enabled for class property decorators.

### sortOnAccessors

default: `true`

Controls whether sorting should be enabled for class auto-accessor decorators.

### sortOnParameters

default: `true`

Controls whether sorting should be enabled for method parameter decorators.

### partitionByComment

default: `false`

Enables the use of comments to separate class decorators into logical groups.

- `true` — All comments will be treated as delimiters, creating partitions.
- `false` — Comments will not be used as delimiters.
- `RegExpPattern = string | { pattern: string; flags: string}` — A regexp pattern to specify which comments should act as delimiters.
- `RegExpPattern[]` — A list of regexp patterns to specify which comments should act as delimiters.
- `{ block: boolean | RegExpPattern | RegExpPattern[]; line: boolean | RegExpPattern | RegExpPattern[] }` — Specify which block and line comments should act as delimiters.

### partitionByNewLine

default: `false`

When `true`, the rule will not sort the decorators if there is an empty line between them.

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

Specifies a list of decorator groups for sorting.

Predefined groups:

- `'unknown'` — Decorators that don't fit into any group specified in the `groups` option.

If the `unknown` group is not specified in the `groups` option, it will automatically be added to the end of the list.

Each decorator will be assigned a single group specified in the `groups` option (or the `unknown` group if no match is found).
The order of items in the `groups` option determines how groups are ordered.

Within a given group, members will be sorted according to the `type`, `order`, `ignoreCase`, etc. options.

Individual groups can be combined together by placing them in an array. The order of groups in that array does not matter.
All members of the groups in the array will be sorted together as if they were part of a single group.

##### Group with overridden settings

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

Defines custom groups to match specific decorators.

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

A declaration will match a `CustomGroupDefinition` group if it matches all the filters of the custom group's definition.

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

A declaration will match a `CustomGroupAnyOfDefinition` group if it matches all the filters of at least one of the `anyOf` items.

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

#### Example for class decorators

Put all error-related decorators at the bottom:

```ts
@Component()
@Validated()
@AtLeastOneAttributeError()
@NoPublicAttributeError()
class MyClass {
}
```

`groups` and `customGroups` configuration:

```ts
 {
   groups: [
     'unknown',
     'error'          // [!code ++]
   ],
+  customGroups: [    // [!code ++]
+    {                // [!code ++]
+      groupName: 'error', // [!code ++]
+      elementNamePattern: 'Error', // [!code ++]
+    }                // [!code ++]
+  ]                  // [!code ++]
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
              'perfectionist/sort-decorators': [
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
                  groups: [],
                  customGroups: [],
                  sortOnClasses: true,
                  sortOnMethods: true,
                  sortOnAccessors: true,
                  sortOnProperties: true,
                  sortOnParameters: true,
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
            'perfectionist/sort-decorators': [
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
                groups: [],
                customGroups: [],
                sortOnClasses: true,
                sortOnMethods: true,
                sortOnAccessors: true,
                sortOnProperties: true,
                sortOnParameters: true,
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
