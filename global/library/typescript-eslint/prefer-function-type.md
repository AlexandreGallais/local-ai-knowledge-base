---
title: "prefer-function-type"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/prefer-function-type.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# prefer-function-type

TypeScript allows for two common ways to declare a type for a function:

- Function type: `() => string`
- Object type with a signature: `{ (): string }`

The function type form is generally preferred when possible for being more succinct.

This rule suggests using a function type instead of an interface or object type literal with a single call signature.

## Examples

**❌ Incorrect**

```ts
interface Example {
  (): string;
}
```

```ts
function foo(example: { (): number }): number {
  return example();
}
```

```ts
interface ReturnsSelf {
  // returns the function itself, not the `this` argument.
  (arg: string): this;
}
```

**✅ Correct**

```ts
type Example = () => string;
```

```ts
function foo(example: () => number): number {
  return example();
}
```

```ts
// returns the function itself, not the `this` argument.
type ReturnsSelf = (arg: string) => ReturnsSelf;
```

```ts
function foo(bar: { (): string; baz: number }): string {
  return bar();
}
```

```ts
interface Foo {
  bar: string;
}
interface Bar extends Foo {
  (): void;
}
```

```ts
// multiple call signatures (overloads) is allowed:
interface Overloaded {
  (data: string): number;
  (id: number): string;
}
// this is equivalent to Overloaded interface.
type Intersection = ((data: string) => number) & ((id: number) => string);
```

## When Not To Use It

If you specifically want to use an interface or type literal with a single call signature for stylistic reasons, you can avoid this rule.

This rule has a known edge case of sometimes triggering on global augmentations such as `interface Function`.
These edge cases are rare and often symptomatic of odd code.
We recommend you use an inline ESLint disable comment.
See #454 for details.
