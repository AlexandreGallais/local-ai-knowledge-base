# forms/src/directives/reactive_directives/form_control_directive

## FormControlDirective

```ts
export class FormControlDirective extends NgControl implements OnChanges, OnDestroy
```

@description
Synchronizes a standalone `FormControl` instance to a form control element.

Note that support for using the `ngModel` input property and `ngModelChange` event with reactive
form directives was deprecated in Angular v6 and is scheduled for removal in
a future version of Angular.

@see [Reactive Forms Guide](guide/forms/reactive-forms)
@see {@link FormControl}
@see {@link AbstractControl}

@usageNotes

The following example shows how to register a standalone control and set its value.

{@example forms/ts/simpleFormControl/simple_form_control_example.ts region='Component'}

@ngModule ReactiveFormsModule
@publicApi

## FormControlDirective.form

```ts
form!: FormControl
```

@description
Tracks the `FormControl` instance bound to the directive.

## FormControlDirective.isDisabled

```ts
set isDisabled(isDisabled: boolean)
```

@description
Triggers a warning in dev mode that this input should not be used with reactive forms.

## FormControlDirective.model

```ts
model: any
```

@deprecated as of v6

## FormControlDirective.update

```ts
update = new EventEmitter()
```

@deprecated as of v6

## FormControlDirective.path

```ts
override get path(): string[]
```

@description
Returns an array that represents the path from the top-level form to this control.
Each index is the string name of the control on that level.

## FormControlDirective.control

```ts
override get control(): FormControl
```

@description
The `FormControl` bound to this directive.

## FormControlDirective.viewToModelUpdate

```ts
override viewToModelUpdate(newValue: any): void
```

@description
Sets the new value for the view model and emits an `ngModelChange` event.

@param newValue The new value for the view model.