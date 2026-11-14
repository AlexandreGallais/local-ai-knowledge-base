---
title: "no-unsafe-member-access"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-unsafe-member-access.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-unsafe-member-access

The `any` type in TypeScript is a dangerous "escape hatch" from the type system.
Using `any` disables many type checking rules and is generally best used only as a last resort or when prototyping code.

Despite your best intentions, the `any` type can sometimes leak into your codebase.
Accessing a member of an `any`-typed value creates a potential type safety hole and source of bugs in your codebase.

This rule disallows member access on any variable that is typed as `any`.

## Examples

**❌ Incorrect**

```ts
declare const anyVar: any;
declare const nestedAny: { prop: any };

anyVar.a;
anyVar.a.b;
anyVar['a'];
anyVar['a']['b'];

nestedAny.prop.a;
nestedAny.prop['a'];

const key = 'a';
nestedAny.prop[key];

// Using an any to access a member is unsafe
const arr = [1, 2, 3];
arr[anyVar];
nestedAny[anyVar];
```

**✅ Correct**

```ts
declare const properlyTyped: { prop: { a: string } };

properlyTyped.prop.a;
properlyTyped.prop['a'];

const key = 'a';
properlyTyped.prop[key];

const arr = [1, 2, 3];
arr[1];
let idx = 1;
arr[idx];
arr[idx++];
```

## Options

### `allowOptionalChaining`

Examples of code for this rule with `{ allowOptionalChaining: true }`:

**❌ Incorrect**

```ts
declare const outer: any;

outer.inner;
outer.middle.inner;
```

**✅ Correct**

```ts
declare const outer: any;

outer?.inner;
outer?.middle?.inner;
```

**Caution:**
We only recommend using `allowOptionalChaining` to help transition an existing project towards fully enabling `no-unsafe-member-access`.
Optional chaining makes it safer than normal property accesses in that you won't get a runtime error if the parent value is `null` or `undefined`.
However, it still results in an `any`-typed value, which is unsafe.

## When Not To Use It

If your codebase has many existing `any`s or areas of unsafe code, it may be difficult to enable this rule.
It may be easier to skip the `no-unsafe-*` rules pending increasing type safety in unsafe areas of your project.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

## Related To

- Avoiding `any`s with Linting and TypeScript
- `no-explicit-any`
- `no-unsafe-argument`
- `no-unsafe-assignment`
- `no-unsafe-call`
- `no-unsafe-return`
