# elements/src/element-strategy

## NgElementStrategyEvent

```ts
export interface NgElementStrategyEvent
```

Interface for the events emitted through the NgElementStrategy.

@publicApi

## NgElementStrategy

```ts
export interface NgElementStrategy
```

Underlying strategy used by the NgElement to create/destroy the component and react to input
changes.

@publicApi

## NgElementStrategyFactory

```ts
export interface NgElementStrategyFactory
```

Factory used to create new strategies for each NgElement instance.

@publicApi

## NgElementStrategyFactory.create

```ts
create(injector: Injector): NgElementStrategy
```

Creates a new instance to be used for an NgElement.