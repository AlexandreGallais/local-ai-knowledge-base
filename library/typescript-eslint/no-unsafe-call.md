---
title: "no-unsafe-call"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-unsafe-call.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-unsafe-call

The `any` type in TypeScript is a dangerous "escape hatch" from the type system.
Using `any` disables many type checking rules and is generally best used only as a last resort or when prototyping code.

Despite your best intentions, the `any` type can sometimes leak into your codebase.
Calling an `any`-typed value as a function creates a potential type safety hole and source of bugs in your codebase.

This rule disallows calling any value that is typed as `any`.

## Examples

**❌ Incorrect**

```ts
declare const anyVar: any;
declare const nestedAny: { prop: any };

anyVar();
anyVar.a.b();

nestedAny.prop();
nestedAny.prop['a']();

new anyVar();
new nestedAny.prop();

anyVar`foo`;
nestedAny.prop`foo`;
```

**✅ Correct**

```ts
declare const typedVar: () => void;
declare const typedNested: { prop: { a: () => void } };

typedVar();
typedNested.prop.a();

(() => {})();

new Map();

String.raw`foo`;
```

## The Unsafe `Function` Type

The `Function` type is behaves almost identically to `any` when called, so this rule also disallows calling values of type `Function`.

**❌ Incorrect**

```ts
const f: Function = () => {};
f();
```

Note that whereas no-unsafe-function-type helps prevent the _creation_ of `Function` types, this rule helps prevent the unsafe _use_ of `Function` types, which may creep into your codebase without explicitly referencing the `Function` type at all.
See, for example, the following code:

```ts
function callUnsafe(maybeFunction: unknown): string {
  if (typeof maybeFunction === 'function') {
    // TypeScript allows this, but it's completely unsound.
    return maybeFunction('call', 'with', 'any', 'args');
  }
  // etc
}
```

In this sort of situation, beware that there is no way to guarantee with runtime checks that a value is safe to call.
If you _really_ want to call a value whose type you don't know, your best bet is to use a `try`/`catch` and suppress any TypeScript or linter errors that get in your way.

```ts
function callSafe(maybeFunction: unknown): void {
  try {
    // intentionally unsound type assertion
    (maybeFunction as () => unknown)();
  } catch (e) {
    console.error(
      'Function either could not be called or threw an error when called: ',
      e,
    );
  }
}
```

## When Not To Use It

If your codebase has many existing `any`s or areas of unsafe code, it may be difficult to enable this rule.
It may be easier to skip the `no-unsafe-*` rules pending increasing type safety in unsafe areas of your project.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

## Related To

- Avoiding `any`s with Linting and TypeScript
- `no-explicit-any`
- `no-unsafe-argument`
- `no-unsafe-assignment`
- `no-unsafe-member-access`
- `no-unsafe-return`
