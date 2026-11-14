# platform-browser/src/dom/debug/by

## By

```ts
export class By
```

Predicates for use with {@link DebugElement}'s query functions.

@publicApi

## By.all

```ts
static all(): Predicate<DebugNode>
```

Match all nodes.

@usageNotes
### Example

{@example platform-browser/dom/debug/ts/by/by.ts region='by_all'}

## By.css

```ts
static css(selector: string): Predicate<DebugElement>
```

Match elements by the given CSS selector.

@usageNotes
### Example

{@example platform-browser/dom/debug/ts/by/by.ts region='by_css'}

## By.directive

```ts
static directive(type: Type<any>): Predicate<DebugNode>
```

Match nodes that have the given directive present.

@usageNotes
### Example

{@example platform-browser/dom/debug/ts/by/by.ts region='by_directive'}