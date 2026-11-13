---
title: "consistent-type-definitions"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/consistent-type-definitions.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# consistent-type-definitions

TypeScript provides two common ways to define an object type: `interface` and `type`.

```ts
// type alias
type T1 = {
  a: string;
  b: number;
};

// interface keyword
interface T2 {
  a: string;
  b: number;
}
```

The two are generally very similar, and can often be used interchangeably.
Using the same type declaration style consistently helps with code readability.

## Options

- `'interface'` _(default)_: enforce using `interface`s for object type definitions.
- `'type'`: enforce using `type`s for object type definitions.

### `'interface'`

**❌ Incorrect**

```ts
type T = { x: number };
```

**✅ Correct**

```ts
type T = string;
type Foo = string | {};

interface T {
  x: number;
}
```

### `'type'`

**❌ Incorrect**

```ts
interface T {
  x: number;
}
```

**✅ Correct**

```ts
type T = { x: number };
```

## FAQs

### What are the differences between `interface` and `type`?

There are very few differences between interfaces and object types in TypeScript.
Other than type aliases being used to represent union types, it is rare that you will need to choose one over the other.

| Feature               | Interfaces | Object Types | Explanation                                                                                            |
| --------------------- | ---------- | ------------ | ------------------------------------------------------------------------------------------------------ |
| Object shapes         | ✅         | ✅           | Both can be used to represent general object shapes.                                                   |
| General performance   | ✅         | ✅           | Both are optimized for performance in TypeScript's type checker.                                       |
| Edge case performance | ✅         |              | Large, complex logical types can be optimized better with interfaces by TypeScript's type checker.     |
| Traditional semantics | ✅         |              | Interfaces are typically the default in much -though not all- of the TypeScript community.             |
| Non-object shapes     |            | ✅           | Object types may describe literals, primitives, unions, and intersections.                             |
| Logical types         |            | ✅           | Object types may include conditional and mapped types.                                                 |
| Merging               | Allowed    | Not allowed  | Interfaces of the same name are treated as one interface ("merged"); type aliases may not share names. |

We recommend choosing one definition style, using it when possible, and falling back to the other style when needed.
The benefits of remaining consistent within a codebase almost always outweigh the benefits of either definition style.

### When do the performance differences between `interface` and `type` matter?

Almost never.
Most TypeScript projects do not -and should not- utilize types that exercise the performance differences between the two kinds of definitions.

If you are having problems with type checking performance, see the TypeScript Wiki's Performance page.

### Why is the default `interface`?

Interfaces are the prevailing, most common style in TypeScript.
`interface` has traditionally been TypeScript's intended ("semantic") way to convey _"an object with these fields"_.

We generally recommend staying with the default, `'interface'`, to be stylistically consistent with the majority of TypeScript projects.
If you strongly prefer `'type'`, that's fine too.

## When Not To Use It

If you specifically want to manually choose whether to use an interface or type literal for stylistic reasons each time you define a type, you can avoid this rule.

However, keep in mind that inconsistent style can harm readability in a project.
We recommend picking a single option for this rule that works best for your project.

You might occasionally need to a different definition type in specific cases, such as if your project is a dependency or dependent of another project that relies on a specific type definition style.
Consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

## Further Reading

- TypeScript Handbook > Everyday Types > Differences Between Type Aliases and Interfaces
- StackOverflow: Interfaces vs Types in TypeScript
