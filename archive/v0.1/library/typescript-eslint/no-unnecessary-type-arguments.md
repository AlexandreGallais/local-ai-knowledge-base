---
title: "no-unnecessary-type-arguments"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-unnecessary-type-arguments.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-unnecessary-type-arguments

Type parameters in TypeScript may specify a default value.
For example:

```ts
function f<T = number>(/* ... */) {
  // ...
}
```

It is redundant to provide an explicit type parameter equal to that default: e.g. calling `f<number>(...)`.
This rule reports when an explicitly specified type argument is the default for that type parameter.

## Examples

**❌ Incorrect**

```ts
function f<T = number>() {}
f<number>();
```

```ts
function g<T = number, U = string>() {}
g<string, string>();
```

```ts
class C<T = number> {}
new C<number>();

class D extends C<number> {}
```

```ts
interface I<T = number> {}
class Impl implements I<number> {}
```

**✅ Correct**

```ts
function f<T = number>() {}
f();
f<string>();
```

```ts
function g<T = number, U = string>() {}
g<string>();
g<number, number>();
```

```ts
class C<T = number> {}
new C();
new C<string>();

class D extends C {}
class D extends C<string> {}
```

```ts
interface I<T = number> {}
class Impl implements I<string> {}
```

## When Not To Use It

If you prefer explicitly specifying type parameters even when they are equal to the default, you can skip this rule.
