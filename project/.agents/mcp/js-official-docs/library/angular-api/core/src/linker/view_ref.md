# core/src/linker/view_ref

## ViewRef

```ts
export abstract class ViewRef extends ChangeDetectorRef
```

Represents an Angular view.

@see {@link /api/core/ChangeDetectorRef#usage-notes Change detection usage}

@publicApi

## ViewRef.destroy

```ts
abstract destroy(): void
```

Destroys this view and all of the data structures associated with it.

## ViewRef.destroyed

```ts
abstract get destroyed(): boolean
```

Reports whether this view has been destroyed.
@returns True after the `destroy()` method has been called, false otherwise.

## ViewRef.onDestroy

```ts
abstract onDestroy(callback: Function): void
```

A lifecycle hook that provides additional developer-defined cleanup
functionality for views.
@param callback A handler function that cleans up developer-defined data
associated with a view. Called when the `destroy()` method is invoked.

## EmbeddedViewRef

```ts
export abstract class EmbeddedViewRef<C> extends ViewRef
```

Represents an Angular view in a view container.
An embedded view can be referenced from a component
other than the hosting component whose template defines it, or it can be defined
independently by a `TemplateRef`.

Properties of elements in a view can change, but the structure (number and order) of elements in
a view cannot. Change the structure of elements by inserting, moving, or
removing nested views in a view container.

@see {@link ViewContainerRef}

@usageNotes

The following template breaks down into two separate `TemplateRef` instances,
an outer one and an inner one.

```html
Count: {{items.length}}
<ul>
  <li *ngFor="let  item of items">{{item}}</li>
</ul>
```

This is the outer `TemplateRef`:

```html
Count: {{items.length}}
<ul>
  <ng-template ngFor let-item [ngForOf]="items"></ng-template>
</ul>
```

This is the inner `TemplateRef`:

```html
  <li>{{item}}</li>
```

The outer and inner `TemplateRef` instances are assembled into views as follows:

```html
<!-- ViewRef: outer-0 -->
Count: 2
<ul>
  <ng-template view-container-ref></ng-template>
  <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
  <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
</ul>
<!-- /ViewRef: outer-0 -->
```
@publicApi

## EmbeddedViewRef.context

```ts
abstract context: C
```

The context for this view, inherited from the anchor element.

## EmbeddedViewRef.rootNodes

```ts
abstract get rootNodes(): any[]
```

The root nodes for this embedded view.