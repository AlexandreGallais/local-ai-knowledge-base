---
id: ts-null-and-conditions
title: TypeScript null checks and conditions
topic: typescript-lint
summary: Rules for index access, needless conditions, complete switch statements, template strings and nullish values. TypeScript 6.0.
tool: typescript-eslint, TypeScript
version: "8.72, 6.0"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5]
license: MIT, examples written for this base
---

# TypeScript null checks and conditions

Contents: 1. Index access · 2. Needless conditions · 3. Complete switch · 4. Template strings · 5. Nullish values · Sources

## 1. A value read by its index can be undefined (TypeScript noUncheckedIndexedAccess)

With `noUncheckedIndexedAccess`, `list[0]` has the type `Item | undefined`. Check it before you use it. [S1]

Why: an empty array or a missing key gives `undefined`, not an item.

Wrong:

```ts
export function firstId(valves: readonly Valve[]): string {
  return valves[0].id;
}
```

Right:

```ts
export function firstId(valves: readonly Valve[]): string | undefined {
  return valves[0]?.id;
}
```

## 2. Test only what can change (typescript-eslint no-unnecessary-condition)

Never test a value that the types say is always set, or always true. Fix the type instead. [S2]

Why: a needless test hides a wrong type, and the other branch is dead code.

Wrong:

```ts
export function describeValve(valve: Valve): string {
  if (valve !== undefined) {
    return valve.label;
  }

  return 'unknown';
}
```

Right:

```ts
export function describeValve(valve: Valve | undefined): string {
  return valve?.label ?? 'unknown';
}
```

## 3. Handle every case of a union in a switch (typescript-eslint switch-exhaustiveness-check)

A `switch` on a union type has one `case` per member. Add no `default` that hides a new member. [S3]

Why: when a new state is added, the compiler then shows every switch to update.

Wrong:

```ts
export function stateText(state: ValveState): string {
  switch (state) {
    case 'open':
      return 'Open';
    case 'closed':
      return 'Closed';
    default:
      return '';
  }
}
```

Right:

```ts
export function stateText(state: ValveState): string {
  switch (state) {
    case 'open':
      return 'Open';
    case 'closed':
      return 'Closed';
    case 'fault':
      return 'Fault';
  }
}
```

## 4. Put only strings and numbers in a template string (typescript-eslint restrict-template-expressions)

In `${…}`, put a string or a number. Give a fallback for a value that can be `undefined`. [S4]

Why: `${undefined}` prints the word "undefined" on the screen.

Wrong:

```ts
export function tankLine(tank: string | undefined, percent: number): string {
  return `${tank} ${percent} %`;
}
```

Right:

```ts
export function tankLine(tank: string | undefined, percent: number): string {
  return `${tank ?? 'unknown tank'} ${percent} %`;
}
```

## 5. Use ?? for a missing value (typescript-eslint prefer-nullish-coalescing)

Use `??` to replace `undefined` or `null`. Use `||` only to replace every false value on purpose. [S5]

Why: `||` also replaces `0` and the empty string, which are real values.

Wrong:

```ts
export function labelOf(label: string | undefined): string {
  return label || 'none';
}
```

Right:

```ts
export function labelOf(label: string | undefined): string {
  return label ?? 'none';
}
```

## Sources

- [S1] Microsoft, "TSConfig Reference: noUncheckedIndexedAccess", TypeScript 6.0, <https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess>, read 2026-11-13, CC BY 4.0, summarized.
- [S2] typescript-eslint, "no-unnecessary-condition", version 8, <https://typescript-eslint.io/rules/no-unnecessary-condition>, read 2026-11-13, MIT, summarized.
- [S3] typescript-eslint, "switch-exhaustiveness-check", version 8, <https://typescript-eslint.io/rules/switch-exhaustiveness-check>, read 2026-11-13, MIT, summarized.
- [S4] typescript-eslint, "restrict-template-expressions", version 8, <https://typescript-eslint.io/rules/restrict-template-expressions>, read 2026-11-13, MIT, summarized.
- [S5] typescript-eslint, "prefer-nullish-coalescing", version 8, <https://typescript-eslint.io/rules/prefer-nullish-coalescing>, read 2026-11-13, MIT, summarized.
