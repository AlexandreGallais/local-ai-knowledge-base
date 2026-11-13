---
title: "require-super-ondestroy"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/require-super-ondestroy.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# require-super-ondestroy

Overriden ngOnDestroy method in component stores require a call to super.ngOnDestroy().

- **Type**: problem
- **Fixable**: No
- **Suggestion**: No
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

This rule enforces that any class which inherits the `ComponentStore` class and overrides the `ngOnDestroy` lifecycle hook must include a call to `super.ngOnDestroy()`. This ensures proper cleanup of resources managed by the `ComponentStore` class.

Example of **incorrect** code for this rule:

<ngrx-code-example>

```ts
@Injectable()
export class BooksStore
  extends ComponentStore<BooksState>
  implements OnDestroy
{
  // ... other BooksStore class members

  override ngOnDestroy(): void {
    this.cleanUp(); // custom cleanup logic
  }
}
```

</ngrx-code-example>

Example of **correct** code for this rule:

<ngrx-code-example>

```ts
@Injectable()
export class BooksStore
  extends ComponentStore<BooksState>
  implements OnDestroy
{
  // ... other BooksStore class members

  override ngOnDestroy(): void {
    this.cleanUp();
    super.ngOnDestroy();
  }
}
```

</ngrx-code-example>
