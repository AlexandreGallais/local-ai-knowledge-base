---
id: typescript-lint-ts-angular-strict-format
title: Strict formatting
topic: typescript-lint
summary: Member order to write by hand, and what the fix command orders for you. ESLint 10, STRICT_FORMAT.
tool: eslint
version: "10.14"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, examples written for this base
variant: files
---

# Strict formatting

Contents: 1. Member order · 2. What the fix command does · 3. The switch · Sources

## 1. Write fields, then the constructor, then methods (typescript-eslint member-ordering)

In a class, write all fields first, then the constructor, then the methods. The fix command cannot move them for you. [S1]

Wrong:

```ts
export class TankGauge {
  public percent(level: number): number {
    return (level / this.capacity) * 100;
  }

  private readonly capacity = 40;
}
```

Right:

```ts
export class TankGauge {
  private readonly capacity = 40;

  public percent(level: number): number {
    return (level / this.capacity) * 100;
  }
}
```

## 2. What the fix command orders for you (ESLint strict formatting)

`npm run fix` sorts imports and exports, adds braces to every `if`, adds a blank line before each `return` and between class members, and sorts the keys of Angular decorators. Prettier then sets spaces and line breaks. Never do these by hand: run the command. [S2]

## 3. The switch (STRICT_FORMAT)

The strict rules are on by default. `STRICT_FORMAT=0 npm run check` runs the check without them. Never turn them off to hide an error.

## Sources

- [S1] typescript-eslint, "member-ordering", version 8, <https://typescript-eslint.io/rules/member-ordering>, read 2026-11-13, MIT, summarized.
- [S2] Rules of `eslint.strict-format.mjs` in `templates/typescript-angular/` of this base: ESLint core, `@stylistic/eslint-plugin` 5.10, `eslint-plugin-simple-import-sort` 14, angular-eslint 22.6, all MIT.
