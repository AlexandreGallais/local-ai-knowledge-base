---
title: "sort-object-types (part 1 of 3)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-object-types.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-object-types

Enforce sorted object types.

This rule standardizes the order of members within an object type in TypeScript. By ensuring that the members are sorted, it enhances readability without affecting the type system or code behavior.

This practice promotes a clear and consistent structure, making it easier for developers to understand and maintain object types.

<Important>
If you use the `adjacent-overload-signatures` rule from the `@typescript-eslint/eslint-plugin` plugin, it is highly recommended to disable it to avoid conflicts.
</Important>

## Try it out

<CodeExample
  rule="sort-object-types"
  alphabetical={dedent`
    type Department = {
      departmentName: string
      employees: number
      established: Date
      head: string
      location: string
    }

    type Company = {
      ceo: string
      departments: Department[]
      founded: Date
      headquarters: string
      industry: string
      name: string
    }
  `}
  lineLength={dedent`
    type Department = {
      departmentName: string
      employees: number
      established: Date
      location: string
      head: string
    }

    type Company = {
      departments: Department[]
      headquarters: string
      industry: string
      founded: Date
      name: string
      ceo: string
    }
  `}
  initial={dedent`
    type Department = {
      location: string
      departmentName: string
      employees: number
      head: string
      established: Date
    }

    type Company = {
      ceo: string
      departments: Department[]
      headquarters: string
      name: string
      industry: string
      founded: Date
    }
  `}
  client:load
  lang="tsx"
/>
