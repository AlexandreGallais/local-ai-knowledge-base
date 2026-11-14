# forms/src/directives/validators

## ValidationErrors

```ts
export type ValidationErrors
```

@description
Defines the map of errors returned from failed validation checks.

@see [Defining custom validators](guide/forms/form-validation#defining-custom-validators)

@publicApi

## Validator

```ts
export interface Validator
```

@description
An interface implemented by classes that perform synchronous validation.

@usageNotes

### Provide a custom validator

The following example implements the `Validator` interface to create a
validator directive with a custom error key.

```ts
@Directive({
  selector: '[customValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => CustomValidatorDirective), multi: true}]
})
class CustomValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors|null {
    return {'custom': true};
  }
}
```

@publicApi

## Validator.validate

```ts
validate(control: AbstractControl): ValidationErrors | null
```

@description
Method that performs synchronous validation against the provided control.

@param control The control to validate against.

@returns A map of validation errors if validation fails,
otherwise null.

## Validator.registerOnValidatorChange

```ts
registerOnValidatorChange?(fn: ()
```

@description
Registers a callback function to call when the validator inputs change.

@param fn The callback function

## Validator.enabled

```ts
enabled(input: unknown): boolean
```

@description
Determines whether this validator should be active or not based on an input.
Base class implementation checks whether an input is defined (if the value is different from
`null` and `undefined`). Validator classes that extend this base class can override this
function with the logic specific to a particular validator directive.

## MaxValidator

```ts
export class MaxValidator extends AbstractValidatorDirective
```

A directive which installs the {@link MaxValidator} for any `formControlName`,
`formControl`, or control with `ngModel` that also has a `max` attribute.

@see [Form Validation](guide/forms/form-validation)

@usageNotes

### Adding a max validator

The following example shows how to add a max validator to an input attached to an
ngModel binding.

```html
<input type="number" ngModel max="4">
```

@ngModule ReactiveFormsModule
@ngModule FormsModule
@publicApi

## MaxValidator.max

```ts
max!: string | number | null
```

@description
Tracks changes to the max bound to this directive.

## MinValidator

```ts
export class MinValidator extends AbstractValidatorDirective
```

A directive which installs the {@link MinValidator} for any `formControlName`,
`formControl`, or control with `ngModel` that also has a `min` attribute.

@see [Form Validation](guide/forms/form-validation)

@usageNotes

### Adding a min validator

The following example shows how to add a min validator to an input attached to an
ngModel binding.

```html
<input type="number" ngModel min="4">
```

@ngModule ReactiveFormsModule
@ngModule FormsModule
@publicApi

## MinValidator.min

```ts
min!: string | number | null
```

@description
Tracks changes to the min bound to this directive.

## AsyncValidator

```ts
export interface AsyncValidator extends Validator
```

@description
An interface implemented by classes that perform asynchronous validation.

@usageNotes

### Provide a custom async validator directive

The following example implements the `AsyncValidator` interface to create an
async validator directive with a custom error key.

```ts
import { of } from 'rxjs';

@Directive({
  selector: '[customAsyncValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: CustomAsyncValidatorDirective, multi:
true}]
})
class CustomAsyncValidatorDirective implements AsyncValidator {
  validate(control: AbstractControl): Observable<ValidationErrors|null> {
    return of({'custom': true});
  }
}
```

@see [Creating asynchronous validators](guide/forms/form-validation#creating-asynchronous-validators)

@publicApi

## AsyncValidator.validate

```ts
validate( control: AbstractControl, ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>
```

@description
Method that performs async validation against the provided control.

@param control The control to validate against.

@returns A promise or observable that resolves a map of validation errors
if validation fails, otherwise null.

## CheckboxRequiredValidator

```ts
export class CheckboxRequiredValidator extends RequiredValidator
```

A Directive that adds the `required` validator to checkbox controls marked with the
`required` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.

@see [Form Validation](guide/forms/form-validation)

@usageNotes

### Adding a required checkbox validator using template-driven forms

The following example shows how to add a checkbox required validator to an input attached to an
ngModel binding.

```html
<input type="checkbox" name="active" ngModel required>
```

@publicApi
@ngModule FormsModule
@ngModule ReactiveFormsModule

## EmailValidator

```ts
export class EmailValidator extends AbstractValidatorDirective
```

A directive that adds the `email` validator to controls marked with the
`email` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.

The email validation is based on the WHATWG HTML specification with some enhancements to
incorporate more RFC rules. More information can be found on the [Validators.email
page](api/forms/Validators#email).

@see [Form Validation](guide/forms/form-validation)

@usageNotes

### Adding an email validator

The following example shows how to add an email validator to an input attached to an ngModel
binding.

```html
<input type="email" name="email" ngModel email>
<input type="email" name="email" ngModel email="true">
<input type="email" name="email" ngModel [email]="true">
```

@publicApi
@ngModule FormsModule
@ngModule ReactiveFormsModule

## EmailValidator.email

```ts
email!: boolean | string
```

@description
Tracks changes to the email attribute bound to this directive.

## ValidatorFn

```ts
export interface ValidatorFn
```

@description
A function that receives a control and synchronously returns a map of
validation errors if present, otherwise null.

@see [Defining custom validators](guide/forms/form-validation#defining-custom-validators)

@publicApi

## AsyncValidatorFn

```ts
export interface AsyncValidatorFn
```

@description
A function that receives a control and returns a Promise or observable
that emits validation errors if present, otherwise null.

@see [Creating asynchronous validators](guide/forms/form-validation#creating-asynchronous-validators)

@publicApi

## MinLengthValidator

```ts
export class MinLengthValidator extends AbstractValidatorDirective
```

A directive that adds minimum length validation to controls marked with the
`minlength` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.

@see [Form Validation](guide/forms/form-validation)

@usageNotes

### Adding a minimum length validator

The following example shows how to add a minimum length validator to an input attached to an
ngModel binding.

```html
<input name="firstName" ngModel minlength="4">
```

@ngModule ReactiveFormsModule
@ngModule FormsModule
@publicApi

## MinLengthValidator.minlength

```ts
minlength!: string | number | null
```

@description
Tracks changes to the minimum length bound to this directive.

## MaxLengthValidator

```ts
export class MaxLengthValidator extends AbstractValidatorDirective
```

A directive that adds maximum length validation to controls marked with the
`maxlength` attribute. The directive is provided with the `NG_VALIDATORS` multi-provider list.

@see [Form Validation](guide/forms/form-validation)

@usageNotes

### Adding a maximum length validator

The following example shows how to add a maximum length validator to an input attached to an
ngModel binding.

```html
<input name="firstName" ngModel maxlength="25">
```

@ngModule ReactiveFormsModule
@ngModule FormsModule
@publicApi

## MaxLengthValidator.maxlength

```ts
maxlength!: string | number | null
```

@description
Tracks changes to the maximum length bound to this directive.

## PatternValidator

```ts
export class PatternValidator extends AbstractValidatorDirective
```

@description
A directive that adds regex pattern validation to controls marked with the
`pattern` attribute. The regex must match the entire control value.
The directive is provided with the `NG_VALIDATORS` multi-provider list.

@see [Form Validation](guide/forms/form-validation)

@usageNotes

### Adding a pattern validator

The following example shows how to add a pattern validator to an input attached to an
ngModel binding.

```html
<input name="firstName" ngModel pattern="[a-zA-Z ]*">
```

@ngModule ReactiveFormsModule
@ngModule FormsModule
@publicApi

## PatternValidator.pattern

```ts
pattern!: string | RegExp
```

@description
Tracks changes to the pattern bound to this directive.