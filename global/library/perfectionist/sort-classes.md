---
title: "sort-classes (part 1 of 4)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-classes.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-classes

Enforce sorted class members.

Organizing class members in a consistent order improves both readability and maintainability.

This rule helps developers quickly locate class members and understand the overall structure of the class.

By sorting class members systematically, confusion is minimized, and the code becomes more intuitive to navigate. This practice not only aids in individual productivity but also enhances team collaboration by establishing clear and predictable coding standards.

## Try it out

<CodeExample
  rule="sort-classes"
  alphabetical={dedent`
    class User {
      constructor(username: string, email: string, isActive: boolean) {
        this.username = username
        this.email = email
        this.isActive = isActive
        this.roles = []
      }

      activate() {
        this.isActive = true
      }

      addRole(role: string) {
        this.roles.push(role)
      }

      deactivate() {
        this.isActive = false
      }

      getProfile() {
        return {
          username: this.username,
          email: this.email,
          isActive: this.isActive,
          roles: this.roles,
        }
      }

      removeRole(role: string) {
        this.roles = this.roles.filter(r => r !== role)
      }

      setEmail(newEmail: string) {
        this.email = newEmail
      }
    }
  `}
  lineLength={dedent`
    class User {
      constructor(username: string, email: string, isActive: boolean) {
        this.username = username
        this.email = email
        this.isActive = isActive
        this.roles = []
      }

      getProfile() {
        return {
          username: this.username,
          email: this.email,
          isActive: this.isActive,
          roles: this.roles,
        }
      }

      removeRole(role: string) {
        this.roles = this.roles.filter(r => r !== role)
      }

      setEmail(newEmail: string) {
        this.email = newEmail
      }

      addRole(role: string) {
        this.roles.push(role)
      }

      deactivate() {
        this.isActive = false
      }

      activate() {
        this.isActive = true
      }
    }
  `}
  initial={dedent`
    class User {
      constructor(username: string, email: string, isActive: boolean) {
        this.username = username
        this.email = email
        this.isActive = isActive
        this.roles = []
      }

      addRole(role: string) {
        this.roles.push(role)
      }

      deactivate() {
        this.isActive = false
      }

      setEmail(newEmail: string) {
        this.email = newEmail
      }

      activate() {
        this.isActive = true
      }

      removeRole(role: string) {
        this.roles = this.roles.filter(r => r !== role)
      }

      getProfile() {
        return {
          username: this.username,
          email: this.email,
          isActive: this.isActive,
          roles: this.roles,
        }
      }
    }
  `}
  client:load
  lang="tsx"
/>
