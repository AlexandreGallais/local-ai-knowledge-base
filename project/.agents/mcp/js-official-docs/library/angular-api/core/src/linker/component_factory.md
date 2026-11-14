# core/src/linker/component_factory

## ComponentRef

```ts
export abstract class ComponentRef<C>
```

Represents a component created by a `ComponentFactory`.
Provides access to the component instance and related objects,
and provides the means of destroying the instance.

@see [Programmatically rendering components](guide/components/programmatic-rendering)

@publicApi

## ComponentRef.setInput

```ts
abstract setInput(name: string, value: unknown): void
```

Updates a specified input name to a new value. Using this method will properly mark for check
component using the `OnPush` change detection strategy. It will also assure that the
`OnChanges` lifecycle hook runs when a dynamically created component is change-detected.

@param name The name of an input.
@param value The new value of an input.

## ComponentRef.location

```ts
abstract get location(): ElementRef
```

The host or anchor element for this component instance.

## ComponentRef.injector

```ts
abstract get injector(): Injector
```

The dependency injector for this component instance.

## ComponentRef.instance

```ts
abstract get instance(): C
```

This component instance.

## ComponentRef.hostView

```ts
abstract get hostView(): ViewRef
```

The host view defined by the template
for this component instance.

## ComponentRef.changeDetectorRef

```ts
abstract get changeDetectorRef(): ChangeDetectorRef
```

The change detector for this component instance.

## ComponentRef.componentType

```ts
abstract get componentType(): Type<any>
```

The type of this component (as created by a `ComponentFactory` class).

## ComponentRef.destroy

```ts
abstract destroy(): void
```

Destroys the component instance and all of the data structures associated with it.

## ComponentRef.onDestroy

```ts
abstract onDestroy(callback: Function): void
```

A lifecycle hook that provides additional developer-defined cleanup
functionality for the component.
@param callback A handler function that cleans up developer-defined data
associated with this component. Called when the `destroy()` method is invoked.