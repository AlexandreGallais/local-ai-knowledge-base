---
title: "method-signature-style"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/method-signature-style.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# method-signature-style

TypeScript provides two ways to define an object/interface function property:

```ts
interface Example {
  // method shorthand syntax
  func(arg: string): number;

  // regular property with function type
  func: (arg: string) => number;
}
```

The two are very similar; most of the time it doesn't matter which one you use.
However, when TypeScript's `strictFunctionTypes` option is enabled, there is an important difference: methods are always bivariant in their arguments, while function properties are contravariant.
This means that switching from method syntax to property syntax (or vice versa) can cause TypeScript to report new type errors or stop reporting existing ones.

A good practice is to use the TypeScript's `strict` option (which implies `strictFunctionTypes`) which enables correct typechecking for function properties only (method signatures get old behavior).

TypeScript FAQ:

> A method and a function property of the same type behave differently.
> Methods are always bivariant in their argument, while function properties are contravariant in their argument under `strictFunctionTypes`.

See the reasoning behind that in the TypeScript PR for the compiler option.

## Options

This rule accepts one string option:

- `"property"`: Enforce using property signature for functions. Use this to enforce maximum correctness together with TypeScript's strict mode.
- `"method"`: Enforce using method signature for functions. Use this if you aren't using TypeScript's strict mode and prefer this style.

### `property`

Examples of code with `property` option.

**❌ Incorrect**

```ts
interface T1 {
  func(arg: string): number;
}
type T2 = {
  func(arg: boolean): void;
};
interface T3 {
  func(arg: number): void;
  func(arg: string): void;
  func(arg: boolean): void;
}
```

**✅ Correct**

```ts
interface T1 {
  func: (arg: string) => number;
}
type T2 = {
  func: (arg: boolean) => void;
};
// this is equivalent to the overload
interface T3 {
  func: ((arg: number) => void) &
    ((arg: string) => void) &
    ((arg: boolean) => void);
}
```

### `method`

Examples of code with `method` option.

**❌ Incorrect**

```ts
interface T1 {
  func: (arg: string) => number;
}
type T2 = {
  func: (arg: boolean) => void;
};
```

**✅ Correct**

```ts
interface T1 {
  func(arg: string): number;
}
type T2 = {
  func(arg: boolean): void;
};
```

## When Not To Use It

If you don't want to enforce a particular style for object/interface function types, and/or if you don't use `strictFunctionTypes`, then you don't need this rule.

You may also want to avoid this rule if you're introducing it to a large existing codebase with `strictFunctionTypes` enabled.
Running the autofix across many files at once could introduce multiple TypeScript errors, making it difficult to identify which specific change caused each error.
In such cases, consider adopting the rule incrementally or reviewing changes file-by-file.

However, keep in mind that inconsistent style can harm readability in a project.
We recommend picking a single option for this rule that works best for your project.
