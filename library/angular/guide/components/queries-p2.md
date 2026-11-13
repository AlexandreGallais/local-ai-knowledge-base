---
title: "Referencing component children with queries (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/components/queries.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Referencing component children with queries (part 2 of 2)

## Common query pitfalls

When using queries, common pitfalls can make your code harder to understand and maintain.

Always maintain a single source of truth for state shared between multiple components. This avoids scenarios where repeated state in different components becomes out of sync.

Avoid directly writing state to child components. This pattern can lead to brittle code that is hard to understand and is prone to ExpressionChangedAfterItHasBeenChecked errors.

Never directly write state to parent or ancestor components. This pattern can lead to brittle code that is hard to understand and is prone to ExpressionChangedAfterItHasBeenChecked errors.
