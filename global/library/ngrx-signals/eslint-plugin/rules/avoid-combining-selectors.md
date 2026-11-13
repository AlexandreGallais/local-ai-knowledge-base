---
title: "avoid-combining-selectors"
tool: "ngrx-signals"
version: "22.0"
source: "https://github.com/ngrx/platform/blob/a4995391ef631f1bd60d539f436a1aa5c23c4fe5/projects/www/src/app/pages/guide/eslint-plugin/rules/avoid-combining-selectors.md"
commit: "a4995391ef631f1bd60d539f436a1aa5c23c4fe5"
license: "MIT"
---

# avoid-combining-selectors

Prefer combining selectors at the selector level.

- **Type**: suggestion
- **Fixable**: No
- **Suggestion**: No
- **Requires type checking**: No
- **Configurable**: No

## Rule Details

A selector is a pure function that is used to derive state.
Because a selector is a pure function (and a synchronous function), it's easier to test.

That's why it's recommended to build a view model by composing multiple selectors into one selector, instead of consuming multiple selector observable streams to create a view model in the component.

Examples of **incorrect** code for this rule:

### Enrich state with other state in component

<ngrx-code-example>

```ts
export class Component {
  vm$ = combineLatest(
    this.store.select(selectCustomers),
    this.store.select(selectOrders)
  ).pipe(
    map(([customers, orders]) => {
      return customers.map((c) => {
        return {
          customerId: c.id,
          name: c.name,
          orders: orders.filter((o) => o.customerId === c.id),
        };
      });
    })
  );
}
```

</ngrx-code-example>

### Filter state in component

```ts
export class Component {
  customer$ = this.store
    .select(selectCustomers)
    .pipe(withLatestFrom(this.store.select(selectActiveCustomerId)))
    .pipe(
      map(([customers, customerId]) => {
        return customers[customerId];
      })
    );
}
```

Examples of **correct** code for this rule:

### Enrich state with other state in selector

```ts
export selectCustomersAndOrders = createSelector(
  selectCustomers,
  selectOrders,
  (customers, orders) => {
    return {
      customerId: c.id,
      name: c.name,
      orders: orders.filter((o) => o.customerId === c.id),
    }
  }
)

export class Component {
  vm$ = this.store.select(selectCustomersAndOrders);
}
```

### Filter state in selector

<ngrx-code-example>

```ts
export selectActiveCustomer = createSelector(
  selectCustomers,
  selectActiveCustomerId,
  ([customers, customerId]) => {
    return customers[customerId];
  }
)

export class Component {
  customer$ = this.store.select(selectActiveCustomer);
}
```

</ngrx-code-example>

## Further reading

- Maximizing and Simplifying Component Views with NgRx Selectors - by Brandon Roberts
