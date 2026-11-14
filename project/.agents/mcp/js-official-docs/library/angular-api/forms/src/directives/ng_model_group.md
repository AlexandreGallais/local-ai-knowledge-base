# forms/src/directives/ng_model_group

## NgModelGroup

```ts
export class NgModelGroup extends AbstractFormGroupDirective implements OnInit, OnDestroy
```

@description
Creates and binds a `FormGroup` instance to a DOM element.

This directive can only be used as a child of `NgForm` (within `<form>` tags).

Use this directive to validate a sub-group of your form separately from the
rest of your form, or if some values in your domain model make more sense
to consume together in a nested object.

Provide a name for the sub-group and it will become the key
for the sub-group in the form's full value. If you need direct access, export the directive into
a local template variable using `ngModelGroup` (ex: `#myGroup="ngModelGroup"`).

@usageNotes

### Consuming controls in a grouping

The following example shows you how to combine controls together in a sub-group
of the form.

{@example forms/ts/ngModelGroup/ng_model_group_example.ts region='Component'}

@ngModule FormsModule
@publicApi

## NgModelGroup.name

```ts
override name: string = ''
```

@description
Tracks the name of the `NgModelGroup` bound to the directive. The name corresponds
to a key in the parent `NgForm`.