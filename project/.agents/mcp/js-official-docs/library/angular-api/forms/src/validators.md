# forms/src/validators

## NG_VALIDATORS

```ts
export const NG_VALIDATORS = new InjectionToken<ReadonlyArray<Validator | Function>>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'NgValidators' : '', )
```

@description
An `InjectionToken` for registering additional synchronous validators used with
`AbstractControl`s.

@see {@link NG_ASYNC_VALIDATORS}

@usageNotes

### Providing a custom validator

The following example registers a custom validator directive. Adding the validator to the
existing collection of validators requires the `multi: true` option.

```ts
@Directive({
  selector: '[customValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: forwardRef(() => CustomValidatorDirective), multi: true}]
})
class CustomValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return { 'custom': true };
  }
}
```

@see [Defining custom validators](guide/forms/form-validation#defining-custom-validators)

@publicApi

## NG_ASYNC_VALIDATORS

```ts
export const NG_ASYNC_VALIDATORS = new InjectionToken<ReadonlyArray<Validator | Function>>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'NgAsyncValidators' : '', )
```

@description
An `InjectionToken` for registering additional asynchronous validators used with
`AbstractControl`s.

@see {@link NG_VALIDATORS}

@usageNotes

### Provide a custom async validator directive

The following example implements the `AsyncValidator` interface to create an
async validator directive with a custom error key.

```ts
@Directive({
  selector: '[customAsyncValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: CustomAsyncValidatorDirective, multi:
true}]
})
class CustomAsyncValidatorDirective implements AsyncValidator {
  validate(control: AbstractControl): Promise<ValidationErrors|null> {
    return Promise.resolve({'custom': true});
  }
}
```

@see [Implementing a custom async validator](guide/forms/form-validation#implementing-a-custom-async-validator)

@publicApi

## Validators

```ts
export class Validators
```

@description
Provides a set of built-in validators that can be used by form controls.

A validator is a function that processes a `FormControl` or collection of
controls and returns an error map or null. A null map means that validation has passed.

@see [Form Validation](guide/forms/form-validation)

@publicApi

## Validators.min

```ts
static min(min: number): ValidatorFn
```

@description
Validator that requires the control's value to be greater than or equal to the provided number.

@usageNotes

### Validate against a minimum of 3

```ts
const control = new FormControl(2, Validators.min(3));

console.log(control.errors); // {min: {min: 3, actual: 2}}
```

@returns A validator function that returns an error map with the
`min` property if the validation check fails, otherwise `null`.

@see {@link /api/forms/AbstractControl#updateValueAndValidity updateValueAndValidity}

## Validators.max

```ts
static max(max: number): ValidatorFn
```

@description
Validator that requires the control's value to be less than or equal to the provided number.

@usageNotes

### Validate against a maximum of 15

```ts
const control = new FormControl(16, Validators.max(15));

console.log(control.errors); // {max: {max: 15, actual: 16}}
```

@returns A validator function that returns an error map with the
`max` property if the validation check fails, otherwise `null`.

@see {@link /api/forms/AbstractControl#updateValueAndValidity updateValueAndValidity}

## Validators.required

```ts
static required(control: AbstractControl): ValidationErrors | null
```

@description
Validator that requires the control have a non-empty value.

@usageNotes

### Validate that the field is non-empty

```ts
const control = new FormControl('', Validators.required);

console.log(control.errors); // {required: true}
```

@returns An error map with the `required` property
if the validation check fails, otherwise `null`.

@see {@link /api/forms/AbstractControl#updateValueAndValidity updateValueAndValidity}

## Validators.requiredTrue

```ts
static requiredTrue(control: AbstractControl): ValidationErrors | null
```

@description
Validator that requires the control's value be true. This validator is commonly
used for required checkboxes.

@usageNotes

### Validate that the field value is true

```ts
const control = new FormControl('some value', Validators.requiredTrue);

console.log(control.errors); // {required: true}
```

@returns An error map that contains the `required` property
set to `true` if the validation check fails, otherwise `null`.

@see {@link /api/forms/AbstractControl#updateValueAndValidity updateValueAndValidity}

## Validators.email

```ts
static email(control: AbstractControl): ValidationErrors | null
```

@description
Validator that requires the control's value pass an email validation test.

Tests the value using a [regular
expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
pattern suitable for common use cases. The pattern is based on the definition of a valid email
address in the [WHATWG HTML
specification](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) with
some enhancements to incorporate more RFC rules (such as rules related to domain names and the
lengths of different parts of the address).

The differences from the WHATWG version include:
- Disallow `local-part` (the part before the `@` symbol) to begin or end with a period (`.`).
- Disallow `local-part` to be longer than 64 characters.
- Disallow the whole address to be longer than 254 characters.

If this pattern does not satisfy your business needs, you can use `Validators.pattern()` to
validate the value against a different pattern.

@usageNotes

### Validate that the field matches a valid email pattern

```ts
const control = new FormControl('bad@', Validators.email);

console.log(control.errors); // {email: true}
```

@returns An error map with the `email` property
if the validation check fails, otherwise `null`.

@see {@link /api/forms/AbstractControl#updateValueAndValidity updateValueAndValidity}

## Validators.minLength

```ts
static minLength(minLength: number): ValidatorFn
```

@description
Validator that requires the number of items in the control's value to be greater than or equal
to the provided minimum length. This validator is also provided by default if you use
the HTML5 `minlength` attribute. Note that the `minLength` validator is intended to be used
only for types that have a numeric `length` or `size` property, such as strings, arrays or
sets. The `minLength` validator logic is also not invoked for values when their `length` or
`size` property is 0 (for example in case of an empty string or an empty array), to support
optional controls. You can use the standard `required` validator if empty values should not be
considered valid.

@usageNotes

### Validate that the field has a minimum of 3 characters

```ts
const control = new FormControl('ng', Validators.minLength(3));

console.log(control.errors); // {minlength: {requiredLength: 3, actualLength: 2}}
```

```html
<input minlength="5">
```

@returns A validator function that returns an error map with the
`minlength` property if the validation check fails, otherwise `null`.

@see {@link /api/forms/AbstractControl#updateValueAndValidity updateValueAndValidity}

## Validators.maxLength

```ts
static maxLength(maxLength: number): ValidatorFn
```

@description
Validator that requires the number of items in the control's value to be less than or equal
to the provided maximum length. This validator is also provided by default if you use
the HTML5 `maxlength` attribute. Note that the `maxLength` validator is intended to be used
only for types that have a numeric `length` or `size` property, such as strings, arrays or
sets.

@usageNotes

### Validate that the field has maximum of 5 characters

```ts
const control = new FormControl('Angular', Validators.maxLength(5));

console.log(control.errors); // {maxlength: {requiredLength: 5, actualLength: 7}}
```

```html
<input maxlength="5">
```

@returns A validator function that returns an error map with the
`maxlength` property if the validation check fails, otherwise `null`.

@see {@link /api/forms/AbstractControl#updateValueAndValidity updateValueAndValidity}

## Validators.pattern

```ts
static pattern(pattern: string | RegExp): ValidatorFn
```

@description
Validator that requires the control's value to match a regex pattern. This validator is also
provided by default if you use the HTML5 `pattern` attribute.

@usageNotes

### Validate that the field only contains letters or spaces

```ts
const control = new FormControl('1', Validators.pattern('[a-zA-Z ]*'));

console.log(control.errors); // {pattern: {requiredPattern: '^[a-zA-Z ]*$', actualValue: '1'}}
```

```html
<input pattern="[a-zA-Z ]*">
```

### Pattern matching with the global or sticky flag

`RegExp` objects created with the `g` or `y` flags that are passed into `Validators.pattern`
can produce different results on the same input when validations are run consecutively. This is
due to how the behavior of `RegExp.prototype.test` is
specified in [ECMA-262](https://tc39.es/ecma262/#sec-regexpbuiltinexec)
(`RegExp` preserves the index of the last match when the global or sticky flag is used).
Due to this behavior, it is recommended that when using
`Validators.pattern` you **do not** pass in a `RegExp` object with either the global or sticky
flag enabled.

```ts
// Not recommended (since the `g` flag is used)
const controlOne = new FormControl('1', Validators.pattern(/foo/g));

// Good
const controlTwo = new FormControl('1', Validators.pattern(/foo/));
```

@param pattern A regular expression to be used as is to test the values, or a string.
If a string is passed, the `^` character is prepended and the `$` character is
appended to the provided string (if not already present), and the resulting regular
expression is used to test the values.

@returns A validator function that returns an error map with the
`pattern` property if the validation check fails, otherwise `null`.

@see {@link /api/forms/AbstractControl#updateValueAndValidity updateValueAndValidity}

## Validators.nullValidator

```ts
static nullValidator(control: AbstractControl): ValidationErrors | null
```

@description
Validator that performs no operation.

@see {@link /api/forms/AbstractControl#updateValueAndValidity updateValueAndValidity}

## Validators.compose

```ts
static compose(validators: null): null
```

@description
Compose multiple validators into a single function that returns the union
of the individual error maps for the provided control.

@returns A validator function that returns an error map with the
merged error maps of the validators if the validation check fails, otherwise `null`.

@see {@link /api/forms/AbstractControl#updateValueAndValidity updateValueAndValidity}

## Validators.composeAsync

```ts
static composeAsync(validators: (AsyncValidatorFn | null)[]): AsyncValidatorFn | null
```

@description
Compose multiple async validators into a single function that returns the union
of the individual error objects for the provided control.

@returns A validator function that returns an error map with the
merged error objects of the async validators if the validation check fails, otherwise `null`.

@see {@link /api/forms/AbstractControl#updateValueAndValidity updateValueAndValidity}