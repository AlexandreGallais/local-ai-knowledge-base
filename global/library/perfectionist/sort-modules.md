---
title: "sort-modules (part 1 of 3)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-modules.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-modules

Enforce sorted module members.

Organizing module members in a consistent order improves both readability and maintainability.

This rule helps developers quickly locate module members and understand the overall structure of your file.

By sorting module members systematically, confusion is minimized, and the code becomes more intuitive to navigate. This practice not only aids in individual productivity but also enhances team collaboration by establishing clear and predictable coding standards.

## Try it out

<CodeExample
  rule="sort-modules"
  alphabetical={dedent`
    enum CacheType {
      ALWAYS = 'ALWAYS',
      NEVER = 'NEVER',
    }

    export type FindAllUsersInput = {
      ids: string[]
      cache: CacheType
    }

    export type FindAllUsersOutput = FindUserOutput[]

    export interface FindUserInput {
      id: string
      cache: CacheType
    }

    export type FindUserOutput = {
      id: string
      name: string
      age: number
    }

    class Cache {
      // Some logic
    }

    export function findAllUsers(input: FindAllUsersInput): FindAllUsersOutput {
      assertInputIsCorrect(input)
      return _findUserByIds(input.ids)
    }

    export function findUser(input: FindUserInput): FindUserOutput {
      assertInputIsCorrect(input)
      return _findUserByIds([input.id])[0]
    }

    function assertInputIsCorrect(input: FindUserInput | FindAllUsersInput): void {
      // Some logic
    }
  `}
  lineLength={dedent`
    enum CacheType {
      ALWAYS = 'ALWAYS',
      NEVER = 'NEVER',
    }

    export type FindUserOutput = {
      id: string
      name: string
      age: number
    }

    export type FindAllUsersInput = {
      ids: string[]
      cache: CacheType
    }

    export interface FindUserInput {
      id: string
      cache: CacheType
    }

    export type FindAllUsersOutput = FindUserOutput[]

    class Cache {
      // Some logic
    }

    export function findAllUsers(input: FindAllUsersInput): FindAllUsersOutput {
      assertInputIsCorrect(input)
      return _findUserByIds(input.ids)
    }

    export function findUser(input: FindUserInput): FindUserOutput {
      assertInputIsCorrect(input)
      return _findUserByIds([input.id])[0]
    }

    function assertInputIsCorrect(input: FindUserInput | FindAllUsersInput): void {
      // Some logic
    }
  `}
  initial={dedent`
    export interface FindUserInput {
      id: string
      cache: CacheType
    }

    enum CacheType {
      ALWAYS = 'ALWAYS',
      NEVER = 'NEVER',
    }

    export type FindUserOutput = {
      id: string
      name: string
      age: number
    }

    function assertInputIsCorrect(input: FindUserInput | FindAllUsersInput): void {
      // Some logic
    }

    export function findUser(input: FindUserInput): FindUserOutput {
      assertInputIsCorrect(input)
      return _findUserByIds([input.id])[0]
    }

    export type FindAllUsersInput = {
      ids: string[]
      cache: CacheType
    }

    export type FindAllUsersOutput = FindUserOutput[]

    export function findAllUsers(input: FindAllUsersInput): FindAllUsersOutput {
      assertInputIsCorrect(input)
      return _findUserByIds(input.ids)
    }

    class Cache {
      // Some logic
    }
  `}
  client:load
  lang="tsx"
/>

## What this rule sorts

This rule sorts the following module members:
- `enum`
- `interface`
- `type`
- `class`
- `function`

The following elements are not sorted by this rule:
- `imports` (see the `sort-imports` rule).
- `'from' exports` (see the `sort-exports` rule).
- Any other `expression`, in order to ensure compilation and runtime behavior.
