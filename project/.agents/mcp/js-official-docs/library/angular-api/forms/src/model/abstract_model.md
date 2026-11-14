# forms/src/model/abstract_model

## FormControlStatus

```ts
export type FormControlStatus = 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED'
```

A form can have several different statuses. Each
possible status is returned as a string literal.

* **VALID**: Reports that a control is valid, meaning that no errors exist in the input
value.
* **INVALID**: Reports that a control is invalid, meaning that an error exists in the input
value.
* **PENDING**: Reports that a control is pending, meaning that async validation is
occurring and errors are not yet available for the input value.
* **DISABLED**: Reports that a control is
disabled, meaning that the control is exempt from ancestor calculations of validity or value.

@publicApi

## ControlEvent

```ts
export abstract class ControlEvent<T = any>
```

Base class for every event sent by `AbstractControl.events()`

@publicApi

## ControlEvent.source

```ts
public abstract readonly source: AbstractControl<unknown>
```

Form control from which this event is originated.

Note: the type of the control can't be infered from T as the event can be emitted by any of child controls

## ValueChangeEvent

```ts
export class ValueChangeEvent<T> extends ControlEvent<T>
```

Event fired when the value of a control changes.

@see {@link AbstractControl.events}

@publicApi

## PristineChangeEvent

```ts
export class PristineChangeEvent extends ControlEvent
```

Event fired when the control's pristine state changes (pristine <=> dirty).

@see {@link AbstractControl.events}

@publicApi

## TouchedChangeEvent

```ts
export class TouchedChangeEvent extends ControlEvent
```

Event fired when the control's touched status changes (touched <=> untouched).

@see {@link AbstractControl.events}

@publicApi

## StatusChangeEvent

```ts
export class StatusChangeEvent extends ControlEvent
```

Event fired when the control's status changes.

@see {@link AbstractControl.events}

@publicApi

## FormSubmittedEvent

```ts
export class FormSubmittedEvent extends ControlEvent
```

Event fired when a form is submitted

@see {@link AbstractControl.events}

@publicApi

## FormResetEvent

```ts
export class FormResetEvent extends ControlEvent
```

Event fired when a form is reset.

@see {@link AbstractControl.events}

@publicApi

## AbstractControlOptions

```ts
export interface AbstractControlOptions
```

Interface for options provided to an `AbstractControl`.

@publicApi

## AbstractControlOptions.validators

```ts
validators?: ValidatorFn | ValidatorFn[] | null
```

@description
The list of validators applied to a control.

## AbstractControlOptions.asyncValidators

```ts
asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null
```

@description
The list of async validators applied to control.

## AbstractControlOptions.updateOn

```ts
updateOn?: 'change' | 'blur' | 'submit'
```

@description
The event name for control to update upon.

## AbstractControl

```ts
export abstract class AbstractControl< TValue = any, TRawValue extends TValue = TValue, TValueWithOptionalControlStates = any, >
```

This is the base class for `FormControl`, `FormGroup`, and `FormArray`.

It provides some of the shared behavior that all controls and groups of controls have, like
running validators, calculating status, and resetting state. It also defines the properties
that are shared between all sub-classes, like `value`, `valid`, and `dirty`. It shouldn't be
instantiated directly.

The first type parameter TValue represents the value type of the control (`control.value`).
The optional type parameter TRawValue  represents the raw value type (`control.getRawValue()`).

@see [Forms Guide](guide/forms)
@see [Reactive Forms Guide](guide/forms/reactive-forms)
@see [Dynamic Forms Guide](guide/forms/dynamic-forms)

@publicApi

## AbstractControl.value

```ts
public readonly value!: TValue
```

The current value of the control.

* For a `FormControl`, the current value.
* For an enabled `FormGroup`, the values of enabled controls as an object
with a key-value pair for each member of the group.
* For a disabled `FormGroup`, the values of all controls as an object
with a key-value pair for each member of the group.
* For an enabled `FormArray`, the values of enabled controls as an array.
* For a disabled `FormArray`, the values of all controls as an array.

## AbstractControl.constructor

```ts
constructor( validators: ValidatorFn | ValidatorFn[] | null, asyncValidators: AsyncValidatorFn | AsyncValidatorFn[] | null, )
```

Initialize the AbstractControl instance.

@param validators The function or array of functions that is used to determine the validity of
    this control synchronously.
@param asyncValidators The function or array of functions that is used to determine validity of
    this control asynchronously.

## AbstractControl.validator

```ts
get validator(): ValidatorFn | null
```

Returns the function that is used to determine the validity of this control synchronously.
If multiple validators have been added, this will be a single composed function.
See `Validators.compose()` for additional information.

## AbstractControl.asyncValidator

```ts
get asyncValidator(): AsyncValidatorFn | null
```

Returns the function that is used to determine the validity of this control asynchronously.
If multiple validators have been added, this will be a single composed function.
See `Validators.compose()` for additional information.

## AbstractControl.parent

```ts
get parent(): FormGroup | FormArray | null
```

The parent control.

## AbstractControl.status

```ts
get status(): FormControlStatus
```

The validation status of the control.

@see {@link FormControlStatus}

These status values are mutually exclusive, so a control cannot be
both valid AND invalid or invalid AND disabled.

## AbstractControl.valid

```ts
get valid(): boolean
```

A control is `valid` when its `status` is `VALID`.

@see {@link AbstractControl.status}

@returns True if the control has passed all of its validation tests,
false otherwise.

## AbstractControl.invalid

```ts
get invalid(): boolean
```

A control is `invalid` when its `status` is `INVALID`.

@see {@link AbstractControl.status}

@returns True if this control has failed one or more of its validation checks,
false otherwise.

## AbstractControl.pending

```ts
get pending(): boolean
```

A control is `pending` when its `status` is `PENDING`.

@see {@link AbstractControl.status}

@returns True if this control is in the process of conducting a validation check,
false otherwise.

## AbstractControl.disabled

```ts
get disabled(): boolean
```

A control is `disabled` when its `status` is `DISABLED`.

Disabled controls are exempt from validation checks and
are not included in the aggregate value of their ancestor
controls.

@see {@link AbstractControl.status}

@returns True if the control is disabled, false otherwise.

## AbstractControl.enabled

```ts
get enabled(): boolean
```

A control is `enabled` as long as its `status` is not `DISABLED`.

@returns True if the control has any status other than 'DISABLED',
false if the status is 'DISABLED'.

@see {@link AbstractControl.status}

## AbstractControl.errors

```ts
public readonly errors!: ValidationErrors | null
```

An object containing any errors generated by failing validation,
or null if there are no errors.

## AbstractControl.pristine

```ts
get pristine(): boolean
```

A control is `pristine` if the user has not yet changed
the value in the UI.

@returns True if the user has not yet changed the value in the UI; compare `dirty`.
Programmatic changes to a control's value do not mark it dirty.

## AbstractControl.dirty

```ts
get dirty(): boolean
```

A control is `dirty` if the user has changed the value
in the UI.

@returns True if the user has changed the value of this control in the UI; compare `pristine`.
Programmatic changes to a control's value do not mark it dirty.

## AbstractControl.touched

```ts
get touched(): boolean
```

True if the control is marked as `touched`.

A control is marked `touched` once the user has triggered
a `blur` event on it.

## AbstractControl.untouched

```ts
get untouched(): boolean
```

True if the control has not been marked as touched

A control is `untouched` if the user has not yet triggered
a `blur` event on it.

## AbstractControl.events

```ts
public readonly events = this._events.asObservable()
```

A multicasting observable that emits an event every time the state of the control changes.
It emits for value, status, pristine or touched changes.

**Note**: On value change, the emit happens right after a value of this control is updated. The
value of a parent control (for example if this FormControl is a part of a FormGroup) is updated
later, so accessing a value of a parent control (using the `value` property) from the callback
of this event might result in getting a value that has not been updated yet. Subscribe to the
`events` of the parent control instead.
For other event types, the events are emitted after the parent control has been updated.

@see [Unified control state change events](guide/forms/reactive-forms#unified-control-state-change-events)

## AbstractControl.valueChanges

```ts
public readonly valueChanges!: Observable<TValue>
```

A multicasting observable that emits an event every time the value of the control changes, in
the UI or programmatically. It also emits an event each time you call enable() or disable()
without passing along {emitEvent: false} as a function argument.

**Note**: the emit happens right after a value of this control is updated. The value of a
parent control (for example if this FormControl is a part of a FormGroup) is updated later, so
accessing a value of a parent control (using the `value` property) from the callback of this
event might result in getting a value that has not been updated yet. Subscribe to the
`valueChanges` event of the parent control instead.

## AbstractControl.statusChanges

```ts
public readonly statusChanges!: Observable<FormControlStatus>
```

A multicasting observable that emits an event every time the validation `status` of the control
recalculates.

@see {@link FormControlStatus}
@see {@link AbstractControl.status}

## AbstractControl.updateOn

```ts
get updateOn(): FormHooks
```

Reports the update strategy of the `AbstractControl` (meaning
the event on which the control updates itself).
Possible values: `'change'` | `'blur'` | `'submit'`
Default value: `'change'`

## AbstractControl.setValidators

```ts
setValidators(validators: ValidatorFn | ValidatorFn[] | null): void
```

Sets the synchronous validators that are active on this control.  Calling
this overwrites any existing synchronous validators.

When you add or remove a validator at run time, you must call
`updateValueAndValidity()` for the new validation to take effect.

If you want to add a new validator without affecting existing ones, consider
using `addValidators()` method instead.

## AbstractControl.setAsyncValidators

```ts
setAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[] | null): void
```

Sets the asynchronous validators that are active on this control. Calling this
overwrites any existing asynchronous validators.

When you add or remove a validator at run time, you must call
`updateValueAndValidity()` for the new validation to take effect.

If you want to add a new validator without affecting existing ones, consider
using `addAsyncValidators()` method instead.

## AbstractControl.addValidators

```ts
addValidators(validators: ValidatorFn | ValidatorFn[]): void
```

Add a synchronous validator or validators to this control, without affecting other validators.

When you add or remove a validator at run time, you must call
`updateValueAndValidity()` for the new validation to take effect.

Adding a validator that already exists will have no effect. If duplicate validator functions
are present in the `validators` array, only the first instance would be added to a form
control.

@param validators The new validator function or functions to add to this control.

## AbstractControl.addAsyncValidators

```ts
addAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[]): void
```

Add an asynchronous validator or validators to this control, without affecting other
validators.

When you add or remove a validator at run time, you must call
`updateValueAndValidity()` for the new validation to take effect.

Adding a validator that already exists will have no effect.

@param validators The new asynchronous validator function or functions to add to this control.

## AbstractControl.removeValidators

```ts
removeValidators(validators: ValidatorFn | ValidatorFn[]): void
```

Remove a synchronous validator from this control, without affecting other validators.
Validators are compared by function reference; you must pass a reference to the exact same
validator function as the one that was originally set. If a provided validator is not found,
it is ignored.

@usageNotes

```ts
// Reference to the RequiredValidator
const ctrl = new FormControl<string | null>('', Validators.required);
ctrl.removeValidators(Validators.required);

// Reference to anonymous function inside MinValidator
const minValidator = Validators.min(3);
const ctrl = new FormControl<string | null>('', minValidator);
expect(ctrl.hasValidator(minValidator)).toEqual(true)
expect(ctrl.hasValidator(Validators.min(3))).toEqual(false)

ctrl.removeValidators(minValidator);
```

When you add or remove a validator at run time, you must call
`updateValueAndValidity()` for the new validation to take effect.

@param validators The validator or validators to remove.

## AbstractControl.removeAsyncValidators

```ts
removeAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[]): void
```

Remove an asynchronous validator from this control, without affecting other validators.
Validators are compared by function reference; you must pass a reference to the exact same
validator function as the one that was originally set. If a provided validator is not found, it
is ignored.

When you add or remove a validator at run time, you must call
`updateValueAndValidity()` for the new validation to take effect.

@param validators The asynchronous validator or validators to remove.

## AbstractControl.hasValidator

```ts
hasValidator(validator: ValidatorFn): boolean
```

Check whether a synchronous validator function is present on this control. The provided
validator must be a reference to the exact same function that was provided.

@usageNotes

```ts
// Reference to the RequiredValidator
const ctrl = new FormControl<number | null>(0, Validators.required);
expect(ctrl.hasValidator(Validators.required)).toEqual(true)

// Reference to anonymous function inside MinValidator
const minValidator = Validators.min(3);
const ctrl = new FormControl<number | null>(0, minValidator);
expect(ctrl.hasValidator(minValidator)).toEqual(true)
expect(ctrl.hasValidator(Validators.min(3))).toEqual(false)
```

@param validator The validator to check for presence. Compared by function reference.
@returns Whether the provided validator was found on this control.

## AbstractControl.hasAsyncValidator

```ts
hasAsyncValidator(validator: AsyncValidatorFn): boolean
```

Check whether an asynchronous validator function is present on this control. The provided
validator must be a reference to the exact same function that was provided.

@param validator The asynchronous validator to check for presence. Compared by function
    reference.
@returns Whether the provided asynchronous validator was found on this control.

## AbstractControl.clearValidators

```ts
clearValidators(): void
```

Empties out the synchronous validator list.

When you add or remove a validator at run time, you must call
`updateValueAndValidity()` for the new validation to take effect.

## AbstractControl.clearAsyncValidators

```ts
clearAsyncValidators(): void
```

Empties out the async validator list.

When you add or remove a validator at run time, you must call
`updateValueAndValidity()` for the new validation to take effect.

## AbstractControl.markAsTouched

```ts
markAsTouched(opts?: {onlySelf?: boolean
```

Marks the control as `touched`. A control is touched by focus and
blur events that do not change the value.

@see {@link markAsUntouched()}
@see {@link markAsDirty()}
@see {@link markAsPristine()}

@param opts Configuration options that determine how the control propagates changes
and emits events after marking is applied.
* `onlySelf`: When true, mark only this control. When false or not supplied,
marks all direct ancestors. Default is false.
* `emitEvent`: When true or not supplied (the default), the `events`
observable emits a `TouchedChangeEvent` with the `touched` property being `true`.
When false, no events are emitted.

@see [Managing form control state](guide/forms/reactive-forms#managing-form-control-state)

## AbstractControl.markAllAsDirty

```ts
markAllAsDirty(opts: {emitEvent?: boolean} = {}): void
```

Marks the control and all its descendant controls as `dirty`.
@see {@link markAsDirty()}

@param opts Configuration options that determine how the control propagates changes
and emits events after marking is applied.
* `emitEvent`: When true or not supplied (the default), the `events`
observable emits a `PristineChangeEvent` with the `pristine` property being `false`.
When false, no events are emitted.

@see [Managing form control state](guide/forms/reactive-forms#managing-form-control-state)

## AbstractControl.markAllAsTouched

```ts
markAllAsTouched(opts: {emitEvent?: boolean} = {}): void
```

Marks the control and all its descendant controls as `touched`.
@see {@link markAsTouched()}

@param opts Configuration options that determine how the control propagates changes
and emits events after marking is applied.
* `emitEvent`: When true or not supplied (the default), the `events`
observable emits a `TouchedChangeEvent` with the `touched` property being `true`.
When false, no events are emitted.

@see [Managing form control state](guide/forms/reactive-forms#managing-form-control-state)

## AbstractControl.markAsUntouched

```ts
markAsUntouched(opts?: {onlySelf?: boolean
```

Marks the control as `untouched`.

If the control has any children, also marks all children as `untouched`
and recalculates the `touched` status of all parent controls.

@see {@link markAsTouched()}
@see {@link markAsDirty()}
@see {@link markAsPristine()}

@param opts Configuration options that determine how the control propagates changes
and emits events after the marking is applied.
* `onlySelf`: When true, mark only this control. When false or not supplied,
marks all direct ancestors. Default is false.
* `emitEvent`: When true or not supplied (the default), the `events`
observable emits a `TouchedChangeEvent` with the `touched` property being `false`.
When false, no events are emitted.

@see [Managing form control state](guide/forms/reactive-forms#managing-form-control-state)

## AbstractControl.markAsDirty

```ts
markAsDirty(opts?: {onlySelf?: boolean
```

Marks the control as `dirty`. A control becomes dirty when
the control's value is changed through the UI; compare `markAsTouched`.

@see {@link markAsTouched()}
@see {@link markAsUntouched()}
@see {@link markAsPristine()}

@param opts Configuration options that determine how the control propagates changes
and emits events after marking is applied.
* `onlySelf`: When true, mark only this control. When false or not supplied,
marks all direct ancestors. Default is false.
* `emitEvent`: When true or not supplied (the default), the `events`
observable emits a `PristineChangeEvent` with the `pristine` property being `false`.
When false, no events are emitted.

@see [Managing form control state](guide/forms/reactive-forms#managing-form-control-state)

## AbstractControl.markAsPristine

```ts
markAsPristine(opts?: {onlySelf?: boolean
```

Marks the control as `pristine`.

If the control has any children, marks all children as `pristine`,
and recalculates the `pristine` status of all parent
controls.

@see {@link markAsTouched()}
@see {@link markAsUntouched()}
@see {@link markAsDirty()}

@param opts Configuration options that determine how the control emits events after
marking is applied.
* `onlySelf`: When true, mark only this control. When false or not supplied,
marks all direct ancestors. Default is false.
* `emitEvent`: When true or not supplied (the default), the `events`
observable emits a `PristineChangeEvent` with the `pristine` property being `true`.
When false, no events are emitted.

@see [Managing form control state](guide/forms/reactive-forms#managing-form-control-state)

## AbstractControl.markAsPending

```ts
markAsPending(opts?: {onlySelf?: boolean
```

Marks the control as `pending`.

A control is pending while the control performs async validation.

@see {@link AbstractControl.status}

@param opts Configuration options that determine how the control propagates changes and
emits events after marking is applied.
* `onlySelf`: When true, mark only this control. When false or not supplied,
marks all direct ancestors. Default is false.
* `emitEvent`: When true or not supplied (the default), the `statusChanges`
observable emits an event with the latest status the control is marked pending
and the `events` observable emits a `StatusChangeEvent` with the `status` property being
`PENDING` When false, no events are emitted.

## AbstractControl.disable

```ts
disable(opts?: {onlySelf?: boolean
```

Disables the control. This means the control is exempt from validation checks and
excluded from the aggregate value of any parent. Its status is `DISABLED`.

If the control has children, all children are also disabled.

@see {@link AbstractControl.status}

@param opts Configuration options that determine how the control propagates
changes and emits events after the control is disabled.
* `onlySelf`: When true, mark only this control. When false or not supplied,
marks all direct ancestors. Default is false.
* `emitEvent`: When true or not supplied (the default), the `statusChanges`,
`valueChanges` and `events`
observables emit events with the latest status and value when the control is disabled.
When false, no events are emitted.

## AbstractControl.enable

```ts
enable(opts: {onlySelf?: boolean
```

Enables the control. This means the control is included in validation checks and
the aggregate value of its parent. Its status recalculates based on its value and
its validators.

By default, if the control has children, all children are enabled.

@see {@link AbstractControl.status}

@param opts Configure options that control how the control propagates changes and
emits events when marked as untouched
* `onlySelf`: When true, mark only this control. When false or not supplied,
marks all direct ancestors. Default is false.
* `emitEvent`: When true or not supplied (the default), the `statusChanges`,
`valueChanges` and `events`
observables emit events with the latest status and value when the control is enabled.
When false, no events are emitted.

## AbstractControl.setParent

```ts
setParent(parent: FormGroup | FormArray | null): void
```

Sets the parent of the control

@param parent The new parent.

## AbstractControl.setValue

```ts
abstract setValue(value: TRawValue, options?: Object): void
```

Sets the value of the control. Abstract method (implemented in sub-classes).

## AbstractControl.patchValue

```ts
abstract patchValue(value: TValue, options?: Object): void
```

Patches the value of the control. Abstract method (implemented in sub-classes).

## AbstractControl.reset

```ts
abstract reset(value?: TValueWithOptionalControlStates, options?: Object): void
```

Resets the control. Abstract method (implemented in sub-classes).

## AbstractControl.getRawValue

```ts
getRawValue(): any
```

The raw value of this control. For most control implementations, the raw value will include
disabled children.

## AbstractControl.updateValueAndValidity

```ts
updateValueAndValidity(opts?: {onlySelf?: boolean
```

Recalculates the value and validation status of the control.

By default, it also updates the value and validity of its ancestors.

@param opts Configuration options determine how the control propagates changes and emits events
after updates and validity checks are applied.
* `onlySelf`: When true, only update this control. When false or not supplied,
update all direct ancestors. Default is false.
* `emitEvent`: When true or not supplied (the default), the `statusChanges`,
`valueChanges` and `events`
observables emit events with the latest status and value when the control is updated.
When false, no events are emitted.

@see [Understanding propagation control](guide/forms/reactive-forms#understanding-event-emission)

## AbstractControl.setErrors

```ts
setErrors(errors: ValidationErrors | null, opts?: {emitEvent?: boolean}): void
```

Sets errors on a form control when running validations manually, rather than automatically.

Calling `setErrors` also updates the validity of the parent control.

Note: Manually set errors are always overwritten by the results of the next validation run.

@param opts Configuration options that determine how the control propagates
changes and emits events after the control errors are set.
* `emitEvent`: When true or not supplied (the default), the `statusChanges`
observable emits an event after the errors are set.

@usageNotes

### Manually set the errors for a control

```ts
const login = new FormControl('someLogin');
login.setErrors({
  notUnique: true
});

expect(login.valid).toEqual(false);
expect(login.errors).toEqual({ notUnique: true });

login.setValue('someOtherLogin');

expect(login.valid).toEqual(true);
```

## AbstractControl.get

```ts
get<P extends string | readonly (string | number)[]>( path: P, ): AbstractControl<ɵGetProperty<TRawValue, P>> | null
```

Retrieves a child control given the control's name or path.

This signature for get supports strings and `const` arrays (`.get(['foo', 'bar'] as const)`).

## AbstractControl.get

```ts
get<P extends string | Array<string | number>>( path: P, ): AbstractControl<ɵGetProperty<TRawValue, P>> | null
```

Retrieves a child control given the control's name or path.

This signature for `get` supports non-const (mutable) arrays. Inferred type
information will not be as robust, so prefer to pass a `readonly` array if possible.

## AbstractControl.get

```ts
get<P extends string | (string | number)[]>( path: P, ): AbstractControl<ɵGetProperty<TRawValue, P>> | null
```

Retrieves a child control given the control's name or path.

@param path A dot-delimited string or array of string/number values that define the path to the
control. If a string is provided, passing it as a string literal will result in improved type
information. Likewise, if an array is provided, passing it `as const` will cause improved type
information to be available.

@usageNotes
### Retrieve a nested control

For example, to get a `name` control nested within a `person` sub-group:

* `this.form.get('person.name');`

-OR-

* `this.form.get(['person', 'name'] as const);` // `as const` gives improved typings

### Retrieve a control in a FormArray

When accessing an element inside a FormArray, you can use an element index.
For example, to get a `price` control from the first element in an `items` array you can use:

* `this.form.get('items.0.price');`

-OR-

* `this.form.get(['items', 0, 'price']);`

## AbstractControl.getError

```ts
getError(errorCode: string, path?: Array<string | number> | string): any
```

@description
Reports error data for the control with the given path.

@param errorCode The code of the error to check
@param path A list of control names that designates how to move from the current control
to the control that should be queried for errors.

@usageNotes
For example, for the following `FormGroup`:

```ts
form = new FormGroup({
  address: new FormGroup({ street: new FormControl() })
});
```

The path to the 'street' control from the root form would be 'address' -> 'street'.

It can be provided to this method in one of two formats:

1. An array of string control names, e.g. `['address', 'street']`
1. A period-delimited list of control names in one string, e.g. `'address.street'`

@returns error data for that particular error. If the control or error is not present,
null is returned.

## AbstractControl.hasError

```ts
hasError(errorCode: string, path?: Array<string | number> | string): boolean
```

@description
Reports whether the control with the given path has the error specified.

@param errorCode The code of the error to check
@param path A list of control names that designates how to move from the current control
to the control that should be queried for errors.

@usageNotes
For example, for the following `FormGroup`:

```ts
form = new FormGroup({
  address: new FormGroup({ street: new FormControl() })
});
```

The path to the 'street' control from the root form would be 'address' -> 'street'.

It can be provided to this method in one of two formats:

1. An array of string control names, e.g. `['address', 'street']`
1. A period-delimited list of control names in one string, e.g. `'address.street'`

If no path is given, this method checks for the error on the current control.

@returns whether the given error is present in the control at the given path.

If the control is not present, false is returned.

## AbstractControl.root

```ts
get root(): AbstractControl
```

Retrieves the top-level ancestor of this control.