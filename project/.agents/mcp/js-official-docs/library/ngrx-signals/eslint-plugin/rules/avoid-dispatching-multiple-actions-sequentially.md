---
title: "avoid-dispatching-multiple-actions-sequentially"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/avoid-dispatching-multiple-actions-sequentially.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# avoid-dispatching-multiple-actions-sequentially

It is recommended to only dispatch one `Action` at a time.

- **Type**: suggestion
- **Fixable**: No
- **Suggestion**: No
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

An action should be an event that abstracts away the details of store internals.
An action can be a composition of several events, in which case the developer might be tempted to dispatch several actions in sequence. But a better approach is to dispatch one "combining" action, which exactly describes what that event entails.

Examples of **incorrect** code for this rule:

<ngrx-code-example>

```ts
export class Component implement OnInit {
  constructor(
    private readonly store: Store,
  ) {}

  ngOnInit() {
    // ⚠ multiple actions dispatched
    this.store.dispatch(loadEmployeeList());
    this.store.dispatch(loadCompanyList());
    this.store.dispatch(cleanData());
  }
}
```

</ngrx-code-example>

Examples of **correct** code for this rule:

<ngrx-code-example>

```ts
// in component code:
export class Component implement OnInit {
  constructor(
    private readonly store: Store,
  ) {}

  ngOnInit() {
    this.store.dispatch(componentLoaded());
  }
}

// in effect:
export class Effects {

  loadEmployeeList$ = createEffect(() => this.actions.pipe(
    ofType(componentLoaded),
    exhaustMap(() => this.dataService.loadEmployeeList().pipe(
      map(response => loadEmployeeListSuccess(response)),
      catchError(error => loadEmployeeListError(error)),
    )),
  ));

  loadCompanyList$ = createEffect(() => this.actions.pipe(
    ofType(componentLoaded),
    // handle loadCompanyList
  ));

  cleanData$ = createEffect(() => this.actions.pipe(
    ofType(componentLoaded),
    // handle cleanData
  ));

  constructor(
    private readonly actions$: Actions,
  ) {}
}
```

</ngrx-code-example>
