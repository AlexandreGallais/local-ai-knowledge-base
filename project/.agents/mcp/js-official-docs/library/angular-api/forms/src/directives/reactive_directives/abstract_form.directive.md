# forms/src/directives/reactive_directives/abstract_form.directive

## AbstractFormDirective

```ts
export abstract class AbstractFormDirective extends ControlContainer implements Form, OnChanges, OnDestroy
```

@description

Abstract class for top-level form directives (FormArrayDirective, FormGroupDirective) who bind an
existing `Form` to a DOM element.

@publicApi

## AbstractFormDirective.submitted

```ts
get submitted()
```

@description
Reports whether the form submission has been triggered.

## AbstractFormDirective.directives

```ts
directives: FormControlName[] = []
```

@description
Tracks the list of added `FormControlName` instances

## AbstractFormDirective.form

```ts
public abstract form: AbstractControl
```

@description
Tracks the form bound to this directive.

## AbstractFormDirective.ngSubmit

```ts
abstract ngSubmit: EventEmitter<any>
```

@description
Emits an event when the form submission has been triggered.

## AbstractFormDirective.formDirective

```ts
override get formDirective(): Form
```

@description
Returns this directive's instance.

## AbstractFormDirective.control

```ts
abstract override get control(): AbstractControl
```

@description
Returns the Form bound to this directive.

## AbstractFormDirective.path

```ts
override get path(): string[]
```

@description
Returns an array representing the path to this group. Because this directive
always lives at the top level of a form, it always an empty array.

## AbstractFormDirective.addControl

```ts
addControl(dir: FormControlName): FormControl
```

@description
Method that sets up the control directive in this group, re-calculates its value
and validity, and adds the instance to the internal list of directives.

@param dir The `FormControlName` directive instance.

## AbstractFormDirective.getControl

```ts
getControl(dir: FormControlName): FormControl
```

@description
Retrieves the `FormControl` instance from the provided `FormControlName` directive

@param dir The `FormControlName` directive instance.

## AbstractFormDirective.removeControl

```ts
removeControl(dir: FormControlName): void
```

@description
Removes the `FormControlName` instance from the internal list of directives

@param dir The `FormControlName` directive instance.

## AbstractFormDirective.addFormGroup

```ts
addFormGroup(dir: FormGroupName): void
```

Adds a new `FormGroupName` directive instance to the form.

@param dir The `FormGroupName` directive instance.

## AbstractFormDirective.removeFormGroup

```ts
removeFormGroup(dir: FormGroupName): void
```

Performs the necessary cleanup when a `FormGroupName` directive instance is removed from the
view.

@param dir The `FormGroupName` directive instance.

## AbstractFormDirective.getFormGroup

```ts
getFormGroup(dir: FormGroupName): FormGroup
```

@description
Retrieves the `FormGroup` for a provided `FormGroupName` directive instance

@param dir The `FormGroupName` directive instance.

## AbstractFormDirective.getFormArray

```ts
getFormArray(dir: FormArrayName): FormArray
```

@description
Retrieves the `FormArray` for a provided `FormArrayName` directive instance.

@param dir The `FormArrayName` directive instance.

## AbstractFormDirective.addFormArray

```ts
addFormArray(dir: FormArrayName): void
```

Performs the necessary setup when a `FormArrayName` directive instance is added to the view.

@param dir The `FormArrayName` directive instance.

## AbstractFormDirective.removeFormArray

```ts
removeFormArray(dir: FormArrayName): void
```

Performs the necessary cleanup when a `FormArrayName` directive instance is removed from the
view.

@param dir The `FormArrayName` directive instance.

## AbstractFormDirective.updateModel

```ts
updateModel(dir: FormControlName, value: any): void
```

Sets the new value for the provided `FormControlName` directive.

@param dir The `FormControlName` directive instance.
@param value The new value for the directive's control.

## AbstractFormDirective.onReset

```ts
onReset(): void
```

@description
Method called when the "reset" event is triggered on the form.

## AbstractFormDirective.resetForm

```ts
resetForm(value: any = undefined, options: {onlySelf?: boolean
```

@description
Resets the form to an initial value and resets its submitted status.

@param value The new value for the form.

## AbstractFormDirective.onSubmit

```ts
onSubmit($event: Event): boolean
```

@description
Method called with the "submit" event is triggered on the form.
Triggers the `ngSubmit` emitter to emit the "submit" event as its payload.

@param $event The "submit" event object