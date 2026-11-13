---
title: "@angular-eslint/template/prefer-contextual-for-variables (part 1 of 4)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/prefer-contextual-for-variables.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/prefer-contextual-for-variables`

Ensures that contextual variables are used in @for blocks where possible instead of aliasing them.

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

## Rationale

Angular's @for loop provides built-in contextual variables ($index, $count, $first, $last, $even, $odd) that are more efficient and clearer than manual calculations. Using these variables eliminates redundant logic like @for (item of items; let i = $index) { @if (i === 0) } when $first would suffice. The built-in variables are optimized by Angular and make template intent explicit. For example, $first immediately communicates "first item in the loop" whereas i === 0 requires mental translation. Similarly, using $even/$odd is clearer than i % 2 === 0 for alternating row styling. The rule can be configured to allow specific custom alias names if your team has established naming conventions, but by default encourages using Angular's standard contextual variables for consistency across the ecosystem.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `{"$count":[],"$index":[],"$first":[],"$last":[],"$even":[],"$odd":[]}`
   */
  allowedAliases?: {
    /**
     * Aliases for $count that are allowed to be used.
     */
    $count?: string[];
    /**
     * Aliases for $index that are allowed to be used.
     */
    $index?: string[];
    /**
     * Aliases for $first that are allowed to be used.
     */
    $first?: string[];
    /**
     * Aliases for $last that are allowed to be used.
     */
    $last?: string[];
    /**
     * Aliases for $even that are allowed to be used.
     */
    $even?: string[];
    /**
     * Aliases for $odd that are allowed to be used.
     */
    $odd?: string[];
  };
}

```
