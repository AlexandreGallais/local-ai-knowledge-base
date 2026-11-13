---
title: "sort-interfaces (part 1 of 3)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-interfaces.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-interfaces

Enforce sorted TypeScript interface properties.

Sorting interface properties in TypeScript provides a clear and predictable structure to the codebase. This rule helps developers locate various properties defined within an interface more easily, promoting consistency and enabling efficient maintenance and collaboration.

Additionally, it ensures that property comments are sorted along with the properties themselves, preserving documentation clarity.

<Important>
  If you use the
  `adjacent-overload-signatures`
  rule from the
  `@typescript-eslint/eslint-plugin` plugin, it
  is highly recommended to disable
  it
  to avoid conflicts.
</Important>

It's **safe**. If you document interface properties line by line, property comments will also be sorted.

## Try it out

<CodeExample
  rule="sort-interfaces"
  alphabetical={dedent`
    interface Address {
      apartmentNumber?: string
      city: string
      country: string
      postalCode: string
      street: string
    }

    interface User {
      address: Address
      email: string
      firstName: string
      id: string
      login: string
      phoneNumber?: string
      roles: string[]
    }

    interface Project {
      budget: number
      description: string
      id: string
      name: string
      projectTeamMembers: User[]
      startDate: Date
      status: string
    }
  `}
  lineLength={dedent`
    interface Address {
      apartmentNumber?: string
      postalCode: string
      country: string
      street: string
      city: string
    }

    interface User {
      phoneNumber?: string
      firstName: string
      address: Address
      roles: string[]
      email: string
      login: string
      id: string
    }

    interface Project {
      projectTeamMembers: User[]
      description: string
      startDate: Date
      budget: number
      status: string
      name: string
      id: string
    }
  `}
  initial={dedent`
    interface Address {
      street: string
      city: string
      country: string
      postalCode: string
      apartmentNumber?: string
    }

    interface User {
      firstName: string
      email: string
      roles: string[]
      login: string
      phoneNumber?: string
      address: Address
      id: string
    }

    interface Project {
      startDate: Date
      budget: number
      description: string
      id: string
      projectTeamMembers: User[]
      name: string
      status: string
    }
  `}
  client:load
  lang="tsx"
/>
