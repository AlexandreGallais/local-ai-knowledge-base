---
title: "sort-intersection-types (part 1 of 3)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-intersection-types.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-intersection-types

Enforce sorted intersection types in TypeScript.

Adhering to the `sort-intersection-types` rule enables developers to ensure that intersection types are consistently sorted, resulting in cleaner and more maintainable code.

This rule promotes a standardized ordering of intersection types, making it easier for developers to navigate and understand the structure of type intersections within the codebase.

<Important>
If you use the `sort-type-constituents` rule from the `@typescript-eslint/eslint-plugin` plugin, it is highly recommended to disable it to avoid conflicts.
</Important>

<Important title="Function intersections are order-sensitive">
Intersections of function types act as overloads, which TypeScript resolves left to right. Reordering them can silently change type inference.

By default, the `ignoreCallableTypes` option leaves intersections containing inline callable types unsorted.
However, named function types (e.g. `MyFunction`) cannot be detected as callable and will still be sorted.
Use an ESLint disable comment to exclude those intersections from sorting.
</Important>

## Try it out

<CodeExample
  rule="sort-intersection-types"
  alphabetical={dedent`
    type Employee = {
      employeeId: string
      isActive: boolean
    } & Address & ContactInfo & PersonalInfo

    type TeamMember = {
      teamId: string
      name: string
    } & Employee
  `}
  lineLength={dedent`
    type Employee = {
      employeeId: string
      isActive: boolean
    } & PersonalInfo & ContactInfo & Address

    type TeamMember = {
      teamId: string
      name: string
    } & Employee
  `}
  initial={dedent`
    type Employee = Address & {
      employeeId: string
      isActive: boolean
    } & PersonalInfo & ContactInfo

    type TeamMember = Employee & {
      teamId: string
      name: string
    }
  `}
  client:load
  lang="tsx"
/>
