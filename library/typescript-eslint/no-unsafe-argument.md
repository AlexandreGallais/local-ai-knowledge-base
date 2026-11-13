---
title: "no-unsafe-argument"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-unsafe-argument.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-unsafe-argument

The `any` type in TypeScript is a dangerous "escape hatch" from the type system.
Using `any` disables many type checking rules and is generally best used only as a last resort or when prototyping code.

Despite your best intentions, the `any` type can sometimes leak into your codebase.
Calling a function with an `any` typed argument creates a potential safety hole and source of bugs.

This rule disallows calling a function with `any` in its arguments.
That includes spreading arrays or tuples with `any` typed elements as function arguments.

This rule also compares generic type argument types to ensure you don't pass an unsafe `any` in a generic position to a receiver that's expecting a specific type.
For example, it will error if you pass `Set<any>` as an argument to a parameter declared as `Set<string>`.

## Examples

**❌ Incorrect**

```ts
declare function foo(arg1: string, arg2: number, arg3: string): void;

const anyTyped = 1 as any;

foo(...anyTyped);
foo(anyTyped, 1, 'a');

const anyArray: any[] = [];
foo(...anyArray);

const tuple1 = ['a', anyTyped, 'b'] as const;
foo(...tuple1);

const tuple2 = [1] as const;
foo('a', ...tuple2, anyTyped);

declare function bar(arg1: string, arg2: number, ...rest: string[]): void;
const x = [1, 2] as [number, ...number[]];
bar('a', ...x, anyTyped);

declare function baz(arg1: Set<string>, arg2: Map<string, string>): void;
baz(new Set<any>(), new Map<any, string>());
```

**✅ Correct**

```ts
declare function foo(arg1: string, arg2: number, arg3: string): void;

foo('a', 1, 'b');

const tuple1 = ['a', 1, 'b'] as const;
foo(...tuple1);

declare function bar(arg1: string, arg2: number, ...rest: string[]): void;
const array: string[] = ['a'];
bar('a', 1, ...array);

declare function baz(arg1: Set<string>, arg2: Map<string, string>): void;
baz(new Set<string>(), new Map<string, string>());
```

There are cases where the rule allows passing an argument of `any` to `unknown`.

Example of `any` to `unknown` assignment that are allowed:

```ts
declare function foo(arg1: unknown, arg2: Set<unknown>, arg3: unknown[]): void;
foo(1 as any, new Set<any>(), [] as any[]);
```

## When Not To Use It

If your codebase has many existing `any`s or areas of unsafe code, it may be difficult to enable this rule.
It may be easier to skip the `no-unsafe-*` rules pending increasing type safety in unsafe areas of your project.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

## Related To

- Avoiding `any`s with Linting and TypeScript
- `no-explicit-any`
- `no-unsafe-assignment`
- `no-unsafe-call`
- `no-unsafe-member-access`
- `no-unsafe-return`
