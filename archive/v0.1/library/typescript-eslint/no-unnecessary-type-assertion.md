---
title: "no-unnecessary-type-assertion"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-unnecessary-type-assertion.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-unnecessary-type-assertion

TypeScript can be told an expression is a different type than expected using `as` type assertions.
Leaving `as` assertions in the codebase increases visual clutter and harms code readability, so it's generally best practice to remove them if they don't change the type of an expression.
This rule reports when a type assertion does not change the type of an expression.

## Examples

**❌ Incorrect**

```ts
const foo = 3;
const bar = foo!;
```

```ts
const foo = <number>(3 + 5);
```

```ts
type Foo = number;
const foo = <Foo>(3 + 5);
```

```ts
type Foo = number;
const foo = (3 + 5) as Foo;
```

```ts
function foo(x: number): number {
  return x!; // unnecessary non-null
}
```

**✅ Correct**

```ts
const foo = <number>3;
```

```ts
const foo = 3 as number;
```

```ts
let foo = 'foo' as const;
```

```ts
function foo(x: number | undefined): number {
  return x!;
}
```

## Options

### `checkLiteralConstAssertions`

With `@typescript-eslint/no-unnecessary-type-assertion: ["error", { checkLiteralConstAssertions: true }]`, the following is **incorrect** code:

```ts
const foo = 'foo' as const;
```

See #8721 False positives for "as const" assertions (issue comment) for more information on this option.

### `typesToIgnore`

With `@typescript-eslint/no-unnecessary-type-assertion: ["error", { typesToIgnore: ['Foo'] }]`, the following is **correct** code:

```ts
type Foo = 3;
const foo: Foo = 3;
```

## When Not To Use It

If you don't care about having no-op type assertions in your code, then you can turn off this rule.
