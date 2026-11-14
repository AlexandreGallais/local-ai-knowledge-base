# core/src/linker/view_container_ref

## ViewContainerRef

```ts
export abstract class ViewContainerRef
```

Represents a container where one or more views can be attached to a component.

Can contain *host views* (created by instantiating a
component with the `createComponent()` method), and *embedded views*
(created by instantiating a `TemplateRef` with the `createEmbeddedView()` method).

A view container instance can contain other view containers,
creating a view hierarchy.

@usageNotes

The example below demonstrates how the `createComponent` function can be used
to create an instance of a ComponentRef dynamically and attach it to an ApplicationRef,
so that it gets included into change detection cycles.

Note: the example uses standalone components, but the function can also be used for
non-standalone components (declared in an NgModule) as well.

```angular-ts
@Component({
  selector: 'dynamic',
  template: `<span>This is a content of a dynamic component.</span>`,
})
class DynamicComponent {
  vcr = inject(ViewContainerRef);
}

@Component({
  selector: 'app',
  template: `<main>Hi! This is the main content.</main>`,
})
class AppComponent {
  vcr = inject(ViewContainerRef);

  ngAfterViewInit() {
    const compRef = this.vcr.createComponent(DynamicComponent);
    compRef.changeDetectorRef.detectChanges();
  }
}
```

@see {@link ComponentRef}
@see {@link EmbeddedViewRef}
@see [Using ViewContainerRef](guide/components/programmatic-rendering#using-viewcontainerref)

@publicApi

## ViewContainerRef.element

```ts
abstract get element(): ElementRef
```

Anchor element that specifies the location of this container in the containing view.
Each view container can have only one anchor element, and each anchor element
can have only a single view container.

Root elements of views attached to this container become siblings of the anchor element in
the rendered view.

Access the `ViewContainerRef` of an element by placing a `Directive` injected
with `ViewContainerRef` on the element, or use a `ViewChild` query.

<!-- TODO: rename to anchorElement -->

## ViewContainerRef.injector

```ts
abstract get injector(): Injector
```

The dependency injector for this view container.

## ViewContainerRef.parentInjector

```ts
abstract get parentInjector(): Injector
```

@deprecated No replacement

## ViewContainerRef.clear

```ts
abstract clear(): void
```

Destroys all views in this container.

## ViewContainerRef.get

```ts
abstract get(index: number): ViewRef | null
```

Retrieves a view from this container.
@param index The 0-based index of the view to retrieve.
@returns The `ViewRef` instance, or null if the index is out of range.

## ViewContainerRef.length

```ts
abstract get length(): number
```

Reports how many views are currently attached to this container.
@returns The number of views.

## ViewContainerRef.createEmbeddedView

```ts
abstract createEmbeddedView<C>( templateRef: TemplateRef<C>, context?: C, options?:
```

Instantiates an embedded view and inserts it
into this container.
@param templateRef The HTML template that defines the view.
@param context The data-binding context of the embedded view, as declared
in the `<ng-template>` usage.
@param options Extra configuration for the created view. Includes:
 * index: The 0-based index at which to insert the new view into this container.
          If not specified, appends the new view as the last entry.
 * injector: Injector to be used within the embedded view.
 * onError: A callback that will be invoked when an error occurs during the view's change detection or lifecycle hooks.
            Note that this will not catch errors thrown during the view's creation.

@returns The `ViewRef` instance for the newly created view.

## ViewContainerRef.createEmbeddedView

```ts
abstract createEmbeddedView<C>( templateRef: TemplateRef<C>, context?: C, index?: number, ): EmbeddedViewRef<C>
```

Instantiates an embedded view and inserts it
into this container.
@param templateRef The HTML template that defines the view.
@param context The data-binding context of the embedded view, as declared
in the `<ng-template>` usage.
@param index The 0-based index at which to insert the new view into this container.
If not specified, appends the new view as the last entry.

@returns The `ViewRef` instance for the newly created view.

## ViewContainerRef.createComponent

```ts
abstract createComponent<C>( componentType: Type<C>, options?:
```

Instantiates a component and inserts its host view into this view container.

@param componentType Component Type to use.
@param options An object that contains extra parameters:
 * index: the index at which to insert the new component's host view into this container.
          If not specified, appends the new view as the last entry.
 * injector: the injector to use as the parent for the new component.
 * ngModuleRef: an NgModuleRef of the component's NgModule, you should almost always provide
                this to ensure that all expected providers are available for the component
                instantiation.
 * environmentInjector: an EnvironmentInjector which will provide the component's environment.
                you should almost always provide this to ensure that all expected providers
                are available for the component instantiation. This option is intended to
                replace the `ngModuleRef` parameter.
 * projectableNodes: list of DOM nodes that should be projected through
                     [`<ng-content>`](api/core/ng-content) of the new component instance.
 * directives: Directives that should be applied to the component.
 * bindings: Bindings that should be applied to the component.
 * onError: A callback that will be invoked when an error occurs during the component's change detection or lifecycle hooks.
            Note that this will not catch errors thrown during the component's construction.

@returns The new `ComponentRef` which contains the component instance and the host view.

## ViewContainerRef.insert

```ts
abstract insert(viewRef: ViewRef, index?: number): ViewRef
```

Inserts a view into this container.
@param viewRef The view to insert.
@param index The 0-based index at which to insert the view.
If not specified, appends the new view as the last entry.
@returns The inserted `ViewRef` instance.

## ViewContainerRef.move

```ts
abstract move(viewRef: ViewRef, currentIndex: number): ViewRef
```

Moves a view to a new location in this container.
@param viewRef The view to move.
@param currentIndex The 0-based index of the new location.
@returns The moved `ViewRef` instance.

## ViewContainerRef.indexOf

```ts
abstract indexOf(viewRef: ViewRef): number
```

Returns the index of a view within the current container.
@param viewRef The view to query.
@returns The 0-based index of the view's position in this container,
or `-1` if this container doesn't contain the view.

## ViewContainerRef.remove

```ts
abstract remove(index?: number): void
```

Destroys a view attached to this container
@param index The 0-based index of the view to destroy.
If not specified, the last view in the container is removed.

## ViewContainerRef.detach

```ts
abstract detach(index?: number): ViewRef | null
```

Detaches a view from this container without destroying it.
Use along with `insert()` to move a view within the current container.
@param index The 0-based index of the view to detach.
If not specified, the last view in the container is detached.