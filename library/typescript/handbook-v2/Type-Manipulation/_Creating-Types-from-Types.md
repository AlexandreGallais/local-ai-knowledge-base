---
title: "Creating Types from Types"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/handbook-v2/Type Manipulation/_Creating Types from Types.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# Creating Types from Types

TypeScript's type system is very powerful because it allows expressing types _in terms of other types_.

The simplest form of this idea is generics. Additionally, we have a wide variety of _type operators_ available to use.
It's also possible to express types in terms of _values_ that we already have.

By combining various type operators, we can express complex operations and values in a succinct, maintainable way.
In this section we'll cover ways to express a new type in terms of an existing type or value.

- Generics - Types which take parameters
- Keyof Type Operator - Using the `keyof` operator to create new types
- Typeof Type Operator - Using the `typeof` operator to create new types
- Indexed Access Types - Using `Type['a']` syntax to access a subset of a type
- Conditional Types - Types which act like if statements in the type system
- Mapped Types - Creating types by mapping each property in an existing type
- Template Literal Types - Mapped types which change properties via template literal strings
