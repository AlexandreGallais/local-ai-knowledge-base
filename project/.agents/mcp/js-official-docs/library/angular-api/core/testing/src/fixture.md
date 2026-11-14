# core/testing/src/fixture

## ComponentFixture

```ts
export class ComponentFixture<T> extends AbstractFixture<any>
```

Fixture for debugging and testing a component.

@publicApi

## ComponentFixture.componentInstance

```ts
componentInstance: T
```

The instance of the root component class.

## ComponentFixture.getDeferBlocks

```ts
getDeferBlocks(): Promise<DeferBlockFixture[]>
```

Retrieves all defer block fixtures in the component fixture.

## DirectiveFixture

```ts
export class DirectiveFixture<T> extends AbstractFixture<Element>
```

Fixture for debugging and testing a directive.

@publicApi

## DirectiveFixture.directiveInstance

```ts
readonly directiveInstance: T
```

The instance of the directive class.

## DirectiveFixture.onDestroy

```ts
onDestroy(callback: ()
```

Registers a callback that will be invoked when the fixture is destroyed.