---
name: lint-typescript
description: Write TypeScript and Angular code that passes the project lint, then run the lint and fix every error. Use when you write or change a .ts file or an Angular template.
license: MIT
metadata:
  variant: files
  version: "0.1.0"
---

# Lint TypeScript and Angular code

## Rules

- Write TypeScript. Never write plain JavaScript.
- Never use `any`. Use `unknown`, then check the value.
- Never write `!` after a value. Never use `as` to force a type. Check the value instead.
- Handle every promise: `await` it, return it, or mark it with `void`.
- Never add an `eslint-disable`, `@ts-ignore` or `@ts-expect-error` comment.
- Never change `eslint.config.mjs`, `eslint.strict-format.mjs`, `.prettierrc.json` or `tsconfig.json` to remove an error. Fix the code.
- Never search the web. Never open a URL.

## Steps

1. Find the kind of code in your task. Open only the matching documents of `docs/typescript-lint/`:
   - Any TypeScript code: `ts-types.md` and `ts-null-and-conditions.md`.
   - Code with `async`, `await` or a promise: `ts-async.md`.
   - A component, a directive or a service: `angular-components-v22.md`.
   - A template: `angular-templates-v22.md`.
   - Code with RxJS: `angular-rxjs.md`.
2. Produce the code. Follow the "Right" examples of the documents. Put class members in this order: fields, constructor, methods.

<!-- files:begin id=run -->

3. Run `npm run fix`. It formats the code and fixes every rule that the tool can fix. Do not read its output.
4. Run `npm run check`.
5. If it lists errors, fix them by hand. Each line gives the line number, the message and the rule name. Fix one file at a time, the first file first.
6. Repeat steps 3 to 5 until `npm run check` lists no error. Stop after 3 failed attempts on the same error. Show the error to the user.
7. Run `npm run build`. It checks the types and the templates. Fix every error, then run steps 3 and 4 again.

<!-- files:end -->

8. Give the list of the files you changed and the result of the last check.

## Example

Wrong:

```ts
export class ValveList {
  constructor(private api: ValveApi, private router: Router) {}

  open(valves: any[]) {
    const first = valves[0]!;
    this.router.navigate(['/valves', first.id]);
  }
}
```

Right:

```ts
export class ValveList {
  private readonly router = inject(Router);

  public async open(valves: readonly Valve[]): Promise<void> {
    const first = valves.at(0);

    if (first === undefined) {
      return;
    }

    await this.router.navigate(['/valves', first.id]);
  }
}
```

## Pitfalls

- An error names a rule that you do not know: search the rule name in `docs/typescript-lint/`.
- The same error comes back after `npm run fix`: the tool cannot fix it. Change the code by hand.
- `npm run check` stops with a configuration error: do not edit the configuration. Show the error to the user.
- An array item read by its index can be `undefined`. Check it before you use it.
- An `eslint-disable` comment has no effect in this project: the error stays.

## Final check

- Does `npm run check` list no error?
- Does the code have no `any`, no `!` after a value, and no `as` that forces a type?
- Did you leave every configuration file unchanged?
