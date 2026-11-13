---
title: "no-unused-expressions"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-unused-expressions.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-unused-expressions

It supports TypeScript-specific expressions:

- Marks directives in modules declarations (`"use strict"`, etc.) as not unused
- Marks the following expressions as unused if their wrapped value expressions are unused:
  - Assertion expressions: `x as number;`, `x!;`, `<number>x;`
  - Instantiation expressions: `Set<number>;`

Although the type expressions never have runtime side effects (that is, `x!;` is the same as `x;`), they can be used to assert types for testing purposes.

## Examples

**❌ Incorrect**

```ts
Set<number>;
1 as number;
window!;
```

**✅ Correct**

```ts
function getSet() {
  return Set;
}

// Function calls are allowed, so type expressions that wrap function calls are allowed
getSet()<number>;
getSet() as Set<unknown>;
getSet()!;

// Namespaces can have directives
namespace A {
  'use strict';
}
```
