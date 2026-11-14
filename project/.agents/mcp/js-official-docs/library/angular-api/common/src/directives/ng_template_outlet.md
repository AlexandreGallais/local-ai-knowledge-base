# common/src/directives/ng_template_outlet

## NgTemplateOutlet

```ts
export class NgTemplateOutlet<C = unknown> implements OnChanges
```

@ngModule CommonModule

@description

Inserts an embedded view from a prepared `TemplateRef`.

You can attach a context object to the `EmbeddedViewRef` by setting `[ngTemplateOutletContext]`.
`[ngTemplateOutletContext]` should be an object, the object's keys will be available for binding
by the local template `let` declarations.

@usageNotes
```html
<ng-container *ngTemplateOutlet="templateRefExp; context: contextExp"></ng-container>
```

Using the key `$implicit` in the context object will set its value as default.

### Example

{@example common/ngTemplateOutlet/ts/module.ts region='NgTemplateOutlet'}

@publicApi

@see [Using NgTemplateOutlet](guide/templates/ng-template#using-ngtemplateoutlet)

## NgTemplateOutlet.ngTemplateOutletContext

```ts
public ngTemplateOutletContext: C | null | undefined = null
```

A context object to attach to the {@link EmbeddedViewRef}. This should be an
object, the object's keys will be available for binding by the local template `let`
declarations.
Using the key `$implicit` in the context object will set its value as default.

## NgTemplateOutlet.ngTemplateOutlet

```ts
public ngTemplateOutlet: TemplateRef<C> | null | undefined = null
```

A string defining the template reference and optionally the context object for the template.

## NgTemplateOutlet.ngTemplateOutletInjector

```ts
public ngTemplateOutletInjector: Injector | 'outlet' | null | undefined = null
```

Injector to be used within the embedded view. A value of "outlet" can be used to indicate
that the injector should be inherited from the template outlet's location in the instantiated DOM.