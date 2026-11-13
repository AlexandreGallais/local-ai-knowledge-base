---
title: "no-misused-new"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-misused-new.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-misused-new

JavaScript classes may define a `constructor` method that runs when a class instance is newly created.
TypeScript allows interfaces that describe a static class object to define a `new()` method (though this is rarely used in real world code).
Developers new to JavaScript classes and/or TypeScript interfaces may sometimes confuse when to use `constructor` or `new`.

This rule reports when a class defines a method named `new` or an interface defines a method named `constructor`.

## Examples

**❌ Incorrect**

```ts
declare class C {
  new(): C;
}

interface I {
  new (): I;
  constructor(): void;
}
```

**✅ Correct**

```ts
declare class C {
  constructor();
}

interface I {
  new (): C;
}
```

## When Not To Use It

If you intentionally want a class with a `new` method, and you're confident nobody working in your code will mistake it with a constructor, you might not want this rule.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.
