# forms/src/model/form_control

## FormControlState

```ts
export interface FormControlState<T>
```

FormControlState is a boxed form value. It is an object with a `value` key and a `disabled` key.

@publicApi

## FormControlOptions

```ts
export interface FormControlOptions extends AbstractControlOptions
```

Interface for options provided to a `FormControl`.

This interface extends all options from {@link AbstractControlOptions}, plus some options
unique to `FormControl`.

@publicApi

## FormControlOptions.nonNullable

```ts
nonNullable?: boolean
```

@description
Whether to use the initial value used to construct the `FormControl` as its default value
as well. If this option is false or not provided, the default value of a FormControl is `null`.
When a FormControl is reset without an explicit value, its value reverts to
its default value.

## FormControlOptions.initialValueIsDefault

```ts
initialValueIsDefault?: boolean
```

@deprecated Use `nonNullable` instead.

## FormControl

```ts
export interface FormControl<TValue = any> extends AbstractControl<TValue>
```

Tracks the value and validation status of an individual form control.

This is one of the four fundamental building blocks of Angular forms, along with
`FormGroup`, `FormArray` and `FormRecord`. It extends the `AbstractControl` class that
implements most of the base functionality for accessing the value, validation status,
user interactions and events.

`FormControl` takes a single generic argument, which describes the type of its value. This
argument always implicitly includes `null` because the control can be reset. To change this
behavior, set `nonNullable` or see the usage notes below.

See [usage examples below](#usage-notes).

@see {@link AbstractControl}
@see [Reactive Forms Guide](guide/forms/reactive-forms)
@see [Usage Notes](#usage-notes)

@publicApi

@overriddenImplementation ɵFormControlCtor

@usageNotes

### Initializing Form Controls

Instantiate a `FormControl`, with an initial value.

```ts
const control = new FormControl('some value');
console.log(control.value);     // 'some value'
```

The following example initializes the control with a form state object. The `value`
and `disabled` keys are required in this case.

```ts
const control = new FormControl({ value: 'n/a', disabled: true });
console.log(control.value);     // 'n/a'
console.log(control.status);    // 'DISABLED'
```

The following example initializes the control with a synchronous validator.

```ts
const control = new FormControl('', Validators.required);
console.log(control.value);      // ''
console.log(control.status);     // 'INVALID'
```

The following example initializes the control using an options object.

```ts
const control = new FormControl('', {
   validators: Validators.required,
   asyncValidators: myAsyncValidator
});
```

### The single type argument

`FormControl` accepts a generic argument, which describes the type of its value.
In most cases, this argument will be inferred.

If you are initializing the control to `null`, or you otherwise wish to provide a
wider type, you may specify the argument explicitly:

```ts
let fc = new FormControl<string|null>(null);
fc.setValue('foo');
```

You might notice that `null` is always added to the type of the control.
This is because the control will become `null` if you call `reset`. You can change
this behavior by setting `{nonNullable: true}`.

### Configure the control to update on a blur event

Set the `updateOn` option to `'blur'` to update on the blur `event`.

```ts
const control = new FormControl('', { updateOn: 'blur' });
```

### Configure the control to update on a submit event

Set the `updateOn` option to `'submit'` to update on a submit `event`.

```ts
const control = new FormControl('', { updateOn: 'submit' });
```

### Reset the control back to a specific value

You reset to a specific form state by passing through a standalone
value or a form state object that contains both a value and a disabled state
(these are the only two properties that cannot be calculated).

```ts
const control = new FormControl('Nancy');

console.log(control.value); // 'Nancy'

control.reset('Drew');

console.log(control.value); // 'Drew'
```

### Reset the control to its initial value

If you wish to always reset the control to its initial value (instead of null),
you can pass the `nonNullable` option:

```ts
const control = new FormControl('Nancy', {nonNullable: true});

console.log(control.value); // 'Nancy'

control.reset();

console.log(control.value); // 'Nancy'
```

### Reset the control back to an initial value and disabled

```ts
const control = new FormControl('Nancy');

console.log(control.value); // 'Nancy'
console.log(control.status); // 'VALID'

control.reset({ value: 'Drew', disabled: true });

console.log(control.value); // 'Drew'
console.log(control.status); // 'DISABLED'
```

@see [FormControl: Getting Started](guide/forms/typed-forms#formcontrol-getting-started)

## FormControl.defaultValue

```ts
defaultValue: TValue
```

The default value of this FormControl, used whenever the control is reset without an explicit
value. See {@link FormControlOptions#nonNullable} for more information on configuring
a default value.

## FormControl.setValue

```ts
setValue( value: TValue, options?:
```

Sets a new value for the form control.

@param value The new value for the control.
@param options Configuration options that determine how the control propagates changes
and emits events when the value changes.
The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
updateValueAndValidity} method.

* `onlySelf`: When true, each change only affects this control, and not its parent. Default is
false.
* `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
`valueChanges`
observables emit events with the latest status and value when the control value is updated.
When false, no events are emitted.
* `emitModelToViewChange`: When true or not supplied  (the default), each change triggers an
`onChange` event to
update the view.
* `emitViewToModelChange`: When true or not supplied (the default), each change triggers an
`ngModelChange`
event to update the model.

## FormControl.patchValue

```ts
patchValue( value: TValue, options?:
```

Patches the value of a control.

This function is functionally the same as {@link FormControl#setValue setValue} at this level.
It exists for symmetry with {@link FormGroup#patchValue patchValue} on `FormGroups` and
`FormArrays`, where it does behave differently.

@see {@link FormControl#setValue} for options

## FormControl.reset

```ts
reset( formState?: TValue | FormControlState<TValue>, options?:
```

Resets the form control, marking it `pristine` and `untouched`, and resetting
the value. The new value will be the provided value (if passed), `null`, or the initial value
if `nonNullable` was set in the constructor via {@link FormControlOptions}.

```ts
// By default, the control will reset to null.
const dog = new FormControl('spot');
dog.reset(); // dog.value is null

// If this flag is set, the control will instead reset to the initial value.
const cat = new FormControl('tabby', {nonNullable: true});
cat.reset(); // cat.value is "tabby"

// A value passed to reset always takes precedence.
const fish = new FormControl('finn', {nonNullable: true});
fish.reset('bubble'); // fish.value is "bubble"
```

@param formState Resets the control with an initial value,
or an object that defines the initial value and disabled state.

@param options Configuration options that determine how the control propagates changes
and emits events after the value changes.

* `onlySelf`: When true, each change only affects this control, and not its parent. Default is
false.
* `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
`valueChanges`
observables emit events with the latest status and value when the control is reset.
When false, no events are emitted.
* `overwriteDefaultValue`: When true, the value used to reset the control becomes the new default value of the control.

## FormControl.getRawValue

```ts
getRawValue(): TValue
```

For a simple FormControl, the raw value is equivalent to the value.

## FormControl.registerOnChange

```ts
registerOnChange(fn: Function): void
```

Register a listener for change events.

@param fn The method that is called when the value changes

## FormControl.registerOnDisabledChange

```ts
registerOnDisabledChange(fn: (isDisabled: boolean)
```

Register a listener for disabled events.

@param fn The method that is called when the disabled status changes.

## FormControl.new

```ts
new (): FormControl<any>
```

Construct a FormControl with no initial value or validators.

## FormControl.new

```ts
new <T = any>( value: FormControlState<T> | T, opts: FormControlOptions & {nonNullable: true}, ): FormControl<T>
```

Creates a new `FormControl` instance.

@param value Initializes the control with an initial value,
or an object that defines the initial value and disabled state.

@param opts A `FormControlOptions` object that contains validation functions and a
validation trigger. `nonNullable` have to be `true`

## FormControl.new

```ts
new <T = any>( value: FormControlState<T> | T, opts: FormControlOptions &
```

@deprecated Use `nonNullable` instead.

## FormControl.new

```ts
new <T = any>( value: FormControlState<T> | T, opts: FormControlOptions, asyncValidator: AsyncValidatorFn | AsyncValidatorFn[], ): FormControl<T | null>
```

@deprecated When passing an `options` argument, the `asyncValidator` argument has no effect.

## FormControl.new

```ts
new <T = any>( value: FormControlState<T> | T, validatorOrOpts?: ValidatorFn | ValidatorFn[] | FormControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null, ): FormControl<T | null>
```

Creates a new `FormControl` instance.

@param value Initializes the control with an initial value,
or an object that defines the initial value and disabled state.

@param validatorOrOpts A synchronous validator function, or an array of
such functions, or a `FormControlOptions` object that contains validation functions
and a validation trigger.

@param asyncValidator A single async validator or array of async validator functions

## FormControl.prototype

```ts
prototype: FormControl<any>
```

The presence of an explicit `prototype` property provides backwards-compatibility for apps that
manually inspect the prototype chain.

## FormControl.defaultValue

```ts
public defaultValue: TValue = null as unknown as TValue
```

@publicApi

## FormControl.prototype

```ts
prototype: FormControl<any>
```

The presence of an explicit `prototype` property provides backwards-compatibility for apps that
manually inspect the prototype chain.

## isFormControl

```ts
export const isFormControl = (control: unknown): control is FormControl
```

@description
Asserts that the given control is an instance of `FormControl`

@see [Utility functions for narrowing form control types](guide/forms/reactive-forms#utility-functions-for-narrowing-form-control-types)

@publicApi