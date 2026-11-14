# core/src/linker/template_ref

## TemplateRef

```ts
export class TemplateRef<C>
```

Represents an embedded template that can be used to instantiate embedded views.
To instantiate embedded views based on a template, use the `ViewContainerRef`
method `createEmbeddedView()`.

Access a `TemplateRef` instance by placing a directive on an `<ng-template>`
element (or directive prefixed with `*`). The `TemplateRef` for the embedded view
is injected into the constructor of the directive,
using the `TemplateRef` token.

You can also use a `Query` to find a `TemplateRef` associated with
a component or a directive.

@see {@link ViewContainerRef}

@see [Getting a reference to a template fragment](guide/templates/ng-template#getting-a-reference-to-a-template-fragment)

@publicApi

## TemplateRef.elementRef

```ts
readonly elementRef: ElementRef
```

The anchor element in the parent view for this embedded view.

The data-binding and [injection contexts](guide/di/dependency-injection-context) of embedded
views created from this `TemplateRef` inherit from the contexts of this location.

Typically new embedded views are attached to the view container of this location, but in
advanced use-cases, the view can be attached to a different container while keeping the
data-binding and injection context from the original location.

## TemplateRef.createEmbeddedView

```ts
createEmbeddedView(context: C, injector?: Injector): EmbeddedViewRef<C>
```

Instantiates an unattached embedded view based on this template.
@param context The data-binding context of the embedded view, as declared
in the `<ng-template>` usage.
@param injector Injector to be used within the embedded view.
@returns The new embedded view object.