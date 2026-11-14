---
title: "unified-signatures"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/unified-signatures.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# unified-signatures

Function overload signatures are a TypeScript way to define a function that can be called in multiple very different ways.
Overload signatures add syntax and theoretical bloat, so it's generally best to avoid using them when possible.
Switching to union types and/or optional or rest parameters can often avoid the need for overload signatures.

This rule reports when function overload signatures can be replaced by a single function signature.

## Examples

**❌ Incorrect**

```ts
function x(y: number): void;
function x(y: string): void;
```

```ts
function y(): void;
function y(...x: number[]): void;
```

**✅ Correct**

```ts
function x(y: number | string): void;
```

```ts
function y(...x: number[]): void;
```

```ts
// This rule won't check overload signatures with different rest parameter types.
// See https://github.com/microsoft/TypeScript/issues/5077
function f(...a: number[]): void;
function f(...a: string[]): void;
```

## Options

### `ignoreDifferentlyNamedParameters`

Examples of code for this rule with `ignoreDifferentlyNamedParameters`:

**❌ Incorrect**

```ts
function f(a: number): void;
function f(a: string): void;
```

**✅ Correct**

```ts
function f(a: number): void;
function f(b: string): void;
```

### `ignoreOverloadsWithDifferentJSDoc`

Examples of code for this rule with `ignoreOverloadsWithDifferentJSDoc`:

**❌ Incorrect**

```ts
declare function f(x: string): void;
declare function f(x: boolean): void;
/**
 * @deprecate
 */
declare function f(x: number): void;
/**
 * @deprecate
 */
declare function f(x: null): void;
```

**✅ Correct**

```ts
declare function f(x: string): void;
/**
 * This signature does something else.
 */
declare function f(x: boolean): void;
/**
 * @async
 */
declare function f(x: number): void;
/**
 * @deprecate
 */
declare function f(x: null): void;
```

## Caveats

This rule reports overloads that have the same _shape_, so they _could_ be written as a single signature.
It does not check whether the merged signature would accept exactly the same calls as the separate overloads.
There is intentionally no autofixer: it's up to you to decide whether merging is appropriate.

Merging is most often not equivalent when the differing parameters are object types, because of
excess property checking.
An object literal passed to separate overloads must match one of them exactly, whereas a union parameter permits
properties from any of its members - including a literal that mixes properties from several:

```ts
interface A {
  a: string;
}

interface B {
  b: string;
}

declare function separate(x: A): void;
declare function separate(x: B): void;
//                        ~~~~ These overloads can be combined into one signature taking `A | B`.

declare function merged(x: A | B): void;

separate({ a: '', b: '' }); // Error: No overload matches this call.
merged({ a: '', b: '' }); // No error
```

If merging would change the types your function accepts, add an ESLint disable comment explaining why the overloads must stay separate.

## When Not To Use It

This is purely a stylistic rule to help with readability of function signature overloads.
You can turn it off if you don't want to consistently keep them next to each other and unified.

## Related To

- `adjacent-overload-signatures`
