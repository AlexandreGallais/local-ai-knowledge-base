# forms/src/directives/form_interface

## Form

```ts
export interface Form
```

@description
An interface implemented by `FormGroupDirective` and `NgForm` directives.

Only used by the `ReactiveFormsModule` and `FormsModule`.

@publicApi

## Form.addControl

```ts
addControl(dir: NgControl): void
```

@description
Add a control to this form.

@param dir The control directive to add to the form.

## Form.removeControl

```ts
removeControl(dir: NgControl): void
```

@description
Remove a control from this form.

@param dir: The control directive to remove from the form.

## Form.getControl

```ts
getControl(dir: NgControl): FormControl
```

@description
The control directive from which to get the `FormControl`.

@param dir: The control directive.

## Form.addFormGroup

```ts
addFormGroup(dir: AbstractFormGroupDirective): void
```

@description
Add a group of controls to this form.

@param dir: The control group directive to add.

## Form.removeFormGroup

```ts
removeFormGroup(dir: AbstractFormGroupDirective): void
```

@description
Remove a group of controls to this form.

@param dir: The control group directive to remove.

## Form.getFormGroup

```ts
getFormGroup(dir: AbstractFormGroupDirective): FormGroup
```

@description
The `FormGroup` associated with a particular `AbstractFormGroupDirective`.

@param dir: The form group directive from which to get the `FormGroup`.

## Form.updateModel

```ts
updateModel(dir: NgControl, value: any): void
```

@description
Update the model for a particular control with a new value.

@param dir: The control directive to update.
@param value: The new value for the control.