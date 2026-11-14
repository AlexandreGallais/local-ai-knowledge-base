# core/src/render3/util/change_detection_utils

## applyChanges

```ts
export function applyChanges(component: {}): void
```

Marks a component for check (in case of OnPush components) and synchronously
performs change detection on the application this component belongs to.

@param component Component to {@link /api/core/ChangeDetectorRef#markForCheck mark for check}

@publicApi