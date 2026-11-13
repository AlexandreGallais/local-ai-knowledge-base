---
id: typescript-lint-ts-async
title: TypeScript promises
topic: typescript-lint
summary: Rules to handle every promise, await before a test, and use async only with await. typescript-eslint 8.
tool: typescript-eslint
version: "8.72"
checked: 2026-11-13
sources: [S1, S2, S3]
license: MIT, examples written for this base
variant: files
---

# TypeScript promises

Contents: 1. Handle every promise · 2. Await before you test · 3. async only with await · 4. Pitfalls · Sources

## 1. Handle every promise (typescript-eslint no-floating-promises)

Handle each promise: `await` it, `return` it, or mark it with `void` when its result does not matter. [S1]

Why: a promise that nobody handles hides its error.

Wrong:

```ts
export class ValveSaver {
  private readonly router = inject(Router);

  public save(): void {
    this.router.navigate(['/valves']);
  }
}
```

Right:

```ts
export class ValveSaver {
  private readonly router = inject(Router);

  public async save(): Promise<void> {
    await this.router.navigate(['/valves']);
  }
}
```

For several promises, join them with `Promise.all()`, then handle the result. [S1]

## 2. Await a promise before you test it (typescript-eslint no-misused-promises)

Never put a promise in a condition. Await it first. [S2]

Why: a promise is always truthy, so the test is always true.

Wrong:

```ts
export class ValveCloser {
  private readonly api = inject(ValveApi);

  public async closeIfOpen(id: string): Promise<void> {
    if (this.api.isOpen(id)) {
      await this.api.close(id);
    }
  }
}
```

Right:

```ts
export class ValveCloser {
  private readonly api = inject(ValveApi);

  public async closeIfOpen(id: string): Promise<void> {
    if (await this.api.isOpen(id)) {
      await this.api.close(id);
    }
  }
}
```

## 3. Use async only with await (typescript-eslint require-await)

Mark a function `async` only when it contains `await`. [S3]

Why: an `async` function without `await` wraps a plain value in a promise for nothing.

Wrong:

```ts
export async function valveLabel(valve: Valve): Promise<string> {
  return valve.label;
}
```

Right:

```ts
export function valveLabel(valve: Valve): string {
  return valve.label;
}
```

## 4. Pitfalls (typescript-eslint promise rules)

- `void` does not handle the error of the promise. Use `void` only when the error does not matter. Else use `await` inside `try`. [S1]
- An event handler of a template that calls an `async` method: write `void this.save()` in a method that returns `void`.
- Never add a comment to switch a promise rule off: such comments have no effect in this project.

## Sources

- [S1] typescript-eslint, "no-floating-promises", version 8, <https://typescript-eslint.io/rules/no-floating-promises>, read 2026-11-13, MIT, summarized.
- [S2] typescript-eslint, "no-misused-promises", version 8, <https://typescript-eslint.io/rules/no-misused-promises>, read 2026-11-13, MIT, summarized.
- [S3] typescript-eslint, "require-await", version 8, <https://typescript-eslint.io/rules/require-await>, read 2026-11-13, MIT, summarized.
