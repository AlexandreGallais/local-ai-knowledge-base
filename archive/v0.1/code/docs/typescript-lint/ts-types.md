---
id: typescript-lint-ts-types
title: TypeScript types without any
topic: typescript-lint
summary: Rules for any, unknown, type assertions, non-null assertions and thrown values, with examples. typescript-eslint 8.
tool: typescript-eslint
version: "8.72"
checked: 2026-11-13
sources: [S1, S2, S3, S4]
license: MIT, examples written for this base
variant: files
---

# TypeScript types without any

Contents: 1. unknown, never any · 2. Check the shape · 3. Never write ! · 4. Throw an Error · Pitfalls · Sources

## 1. Use unknown, never any (typescript-eslint no-explicit-any)

Never write `any`. Write `unknown`, then check the value before you use it. [S1]

Why: `any` turns the type checks off, so every later error goes unseen.

Wrong:

```ts
export function readLevel(sample: any): number {
  return sample.level;
}
```

Right:

```ts
export function readLevel(sample: unknown): number {
  if (typeof sample === 'object' && sample !== null && 'level' in sample) {
    return Number(sample.level);
  }

  return 0;
}
```

## 2. Check the shape, never force a type (typescript-eslint no-unsafe-type-assertion)

Never write `as <Type>` to give a value a narrower type. Check its shape with a type guard. [S2]

Why: `as` tells the compiler to trust you. A wrong shape then breaks at run time, far away.

Wrong:

```ts
export function toValves(body: unknown): Valve[] {
  return body as Valve[];
}
```

Right:

```ts
export function toValves(body: unknown): Valve[] {
  if (!Array.isArray(body) || !body.every(isValve)) {
    throw new Error('The valve list has a wrong shape.');
  }

  return body;
}
```

## 3. Check for undefined, never write ! (typescript-eslint no-non-null-assertion)

Never write `!` after a value. Use `?.` and `??`, or test for `undefined`. [S3]

Why: `!` hides a value that can be missing. The code then fails on the first missing value.

Wrong:

```ts
export function firstOpenLabel(valves: readonly Valve[]): string {
  return valves.find((valve) => valve.state === 'open')!.label;
}
```

Right:

```ts
export function firstOpenLabel(valves: readonly Valve[]): string {
  return valves.find((valve) => valve.state === 'open')?.label ?? 'none';
}
```

## 4. Throw an Error object (typescript-eslint only-throw-error)

Throw only `Error` objects: `throw new Error('message')`. [S4]

Why: a thrown string has no stack trace, and `catch` code expects an `Error`.

Wrong:

```ts
export function requireOpen(valve: Valve): void {
  if (valve.state !== 'open') {
    throw 'The valve is closed.';
  }
}
```

Right:

```ts
export function requireOpen(valve: Valve): void {
  if (valve.state !== 'open') {
    throw new Error('The valve is closed.');
  }
}
```

## 5. Pitfalls (typescript-eslint unsafe rules)

- `Unsafe member access .x on an any value` or `Unsafe return of a value of type any`: an `any` came in earlier. Find where it came from and type it as `unknown` there.
- A value in `catch (error)` has the type `unknown`. Check it with `error instanceof Error` before you read `error.message`.
- `JSON.parse` and an HTTP body give an untyped value: read them as `unknown`, then check them.

## Sources

- [S1] typescript-eslint, "no-explicit-any", version 8, <https://typescript-eslint.io/rules/no-explicit-any>, read 2026-11-13, MIT, summarized.
- [S2] typescript-eslint, "no-unsafe-type-assertion", version 8, <https://typescript-eslint.io/rules/no-unsafe-type-assertion>, read 2026-11-13, MIT, summarized.
- [S3] typescript-eslint, "no-non-null-assertion", version 8, <https://typescript-eslint.io/rules/no-non-null-assertion>, read 2026-11-13, MIT, summarized.
- [S4] typescript-eslint, "only-throw-error", version 8, <https://typescript-eslint.io/rules/only-throw-error>, read 2026-11-13, MIT, summarized.
