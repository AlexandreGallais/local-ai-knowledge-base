---
title: "@angular-eslint/sort-keys-in-type-decorator (part 1 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/sort-keys-in-type-decorator.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/sort-keys-in-type-decorator`

Ensures that keys in type decorators (Component, Directive, Injectable, NgModule, Pipe) are sorted in a consistent order

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

## Rationale

Maintaining a consistent order for properties in Angular decorators (@Component, @Directive, @Injectable, @NgModule, @Pipe) makes code more predictable and easier to scan. When all components in a codebase follow the same property order, developers can quickly locate specific metadata without searching. For example, if selector always comes first and providers always comes before changeDetection, you develop muscle memory for where to look. This is especially helpful in large components with many properties. The recommended default order groups related properties logically: identification (selector, name) first, then dependencies (imports, providers), then templates/styles, then configuration options. Consistent ordering also makes code reviews easier, reduces merge conflicts when multiple developers edit decorators, and creates a professional, well-organized codebase. When `allowUnconfiguredProperties` is `false`, decorators omitted from the user configuration are still checked against their built-in default key order.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `["selector","imports","standalone","templateUrl","template","styleUrl","styleUrls","styles","providers","changeDetection","encapsulation","viewProviders","host","hostDirectives","inputs","outputs","animations","schemas","exportAs","queries","preserveWhitespaces","jit","moduleId","interpolation"]`
   */
  Component?: string[];
  /**
   * Default: `["selector","standalone","providers","host","hostDirectives","inputs","outputs","exportAs","queries","jit"]`
   */
  Directive?: string[];
  /**
   * Default: `["providedIn","useClass","useExisting","useFactory","useValue","deps"]`
   */
  Injectable?: string[];
  /**
   * Default: `["id","imports","declarations","providers","exports","bootstrap","schemas","jit"]`
   */
  NgModule?: string[];
  /**
   * Default: `["name","standalone","pure"]`
   */
  Pipe?: string[];
  /**
   * Default: `true`
   */
  allowUnconfiguredProperties?: boolean;
}

```
