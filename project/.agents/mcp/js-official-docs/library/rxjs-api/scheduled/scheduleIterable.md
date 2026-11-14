# src/internal/scheduled/scheduleIterable

## scheduleIterable

```ts
export function scheduleIterable<T>(input: Iterable<T>, scheduler: SchedulerLike)
```

Used in {@link scheduled} to create an observable from an Iterable.
@param input The iterable to create an observable from
@param scheduler The scheduler to use