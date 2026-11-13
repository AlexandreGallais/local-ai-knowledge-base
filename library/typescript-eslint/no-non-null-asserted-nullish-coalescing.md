---
title: "no-non-null-asserted-nullish-coalescing"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-non-null-asserted-nullish-coalescing.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-non-null-asserted-nullish-coalescing

The `??` nullish coalescing runtime operator allows providing a default value when dealing with `null` or `undefined`.
Using a `!` non-null assertion type operator in the left operand of a nullish coalescing operator is redundant, and likely a sign of programmer error or confusion over the two operators.

## Examples

**❌ Incorrect**

```ts
foo! ?? bar;
foo.baz! ?? bar;
foo!.baz! ?? bar;
foo()! ?? bar;

let x!: string;
x! ?? '';

let x: string;
x = foo();
x! ?? '';
```

**✅ Correct**

```ts
foo ?? bar;
foo ?? bar!;
foo!.baz ?? bar;
foo!.baz ?? bar!;
foo() ?? bar;

// This is considered correct code because there's no way for the user to satisfy it.
let x: string;
x! ?? '';
```

## When Not To Use It

If your project's types don't yet fully describe whether certain values may be nullable, such as if you're transitioning to `strictNullChecks`, this rule might create many false reports.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

## Further Reading

- TypeScript 3.7 Release Notes
- Nullish Coalescing Proposal
