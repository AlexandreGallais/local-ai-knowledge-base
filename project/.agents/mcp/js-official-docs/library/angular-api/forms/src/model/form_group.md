# forms/src/model/form_group

## FormGroup

```ts
export class FormGroup< TControl extends {[K in keyof TControl]: AbstractControl<any>} = any, > extends AbstractControl< ɵTypedOrUntyped<TControl, ɵFormGroupValue<TControl>, any>, ɵTypedOrUntyped<TControl, ɵFormGroupRawValue<TControl>, any>, ɵTypedOrUntyped<TControl, ɵFormGroupArgumentValue<TControl>, any> >
```

Tracks the value and validity state of a group of `FormControl` instances.

A `FormGroup` aggregates the values of each child `FormControl` into one object,
with each control name as the key.  It calculates its status by reducing the status values
of its children. For example, if one of the controls in a group is invalid, the entire
group becomes invalid.

`FormGroup` is one of the four fundamental building blocks used to define forms in Angular,
along with `FormControl`, `FormArray`, and `FormRecord`.

When instantiating a `FormGroup`, pass in a collection of child controls as the first
argument. The key for each child registers the name for the control.

`FormGroup` is intended for use cases where the keys are known ahead of time.
If you need to dynamically add and remove controls, use {@link FormRecord} instead.

`FormGroup` accepts an optional type parameter `TControl`, which is an object type with inner
control types as values.

@usageNotes

### Create a form group with 2 controls

```ts
const form = new FormGroup({
  first: new FormControl('Nancy', Validators.minLength(2)),
  last: new FormControl('Drew'),
});

console.log(form.value);   // {first: 'Nancy', last; 'Drew'}
console.log(form.status);  // 'VALID'
```

### The type argument, and optional controls

`FormGroup` accepts one generic argument, which is an object containing its inner controls.
This type will usually be inferred automatically, but you can always specify it explicitly if you
wish.

If you have controls that are optional (i.e. they can be removed, you can use the `?` in the
type):

```ts
const form = new FormGroup<{
  first: FormControl<string|null>,
  middle?: FormControl<string|null>, // Middle name is optional.
  last: FormControl<string|null>,
}>({
  first: new FormControl('Nancy'),
  last: new FormControl('Drew'),
});
```

### Create a form group with a group-level validator

You include group-level validators as the second arg, or group-level async
validators as the third arg. These come in handy when you want to perform validation
that considers the value of more than one child control.

```ts
const form = new FormGroup({
  password: new FormControl('', Validators.minLength(2)),
  passwordConfirm: new FormControl('', Validators.minLength(2)),
}, passwordMatchValidator);


function passwordMatchValidator(g: FormGroup) {
   return g.get('password').value === g.get('passwordConfirm').value
      ? null : {'mismatch': true};
}
```

Like `FormControl` instances, you choose to pass in
validators and async validators as part of an options object.

```ts
const form = new FormGroup({
  password: new FormControl('')
  passwordConfirm: new FormControl('')
}, { validators: passwordMatchValidator, asyncValidators: otherValidator });
```

### Set the updateOn property for all controls in a form group

The options object is used to set a default value for each child
control's `updateOn` property. If you set `updateOn` to `'blur'` at the
group level, all child controls default to 'blur', unless the child
has explicitly specified a different `updateOn` value.

```ts
const c = new FormGroup({
  one: new FormControl()
}, { updateOn: 'blur' });
```

### Using a FormGroup with optional controls

It is possible to have optional controls in a FormGroup. An optional control can be removed later
using `removeControl`, and can be omitted when calling `reset`. Optional controls must be
declared optional in the group's type.

```ts
const c = new FormGroup<{one?: FormControl<string>}>({
  one: new FormControl('')
});
```

Notice that `c.value.one` has type `string|null|undefined`. This is because calling `c.reset({})`
without providing the optional key `one` will cause it to become `null`.

@see [Grouping form controls](guide/forms/reactive-forms#grouping-form-controls)
@see [FormGroup and FormRecord](guide/forms/typed-forms#formgroup-and-formrecord)

@publicApi

## FormGroup.constructor

```ts
constructor( controls: TControl, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null, )
```

Creates a new `FormGroup` instance.

@param controls A collection of child controls. The key for each child is the name
under which it is registered.

@param validatorOrOpts A synchronous validator function, or an array of
such functions, or an `AbstractControlOptions` object that contains validation functions
and a validation trigger.

@param asyncValidator A single async validator or array of async validator functions

## FormGroup.registerControl

```ts
registerControl<K extends string & keyof TControl>(name: K, control: TControl[K]): TControl[K]
```

Registers a control with the group's list of controls. In a strongly-typed group, the control
must be in the group's type (possibly as an optional key).

This method does not update the value or validity of the control.
Use {@link FormGroup#addControl addControl} instead.

@param name The control name to register in the collection
@param control Provides the control for the given name

## FormGroup.addControl

```ts
addControl( this: FormGroup<{[key: string]: AbstractControl<any>}>, name: string, control: AbstractControl, options?: {emitEvent?: boolean}, ): void
```

Add a control to this group. In a strongly-typed group, the control must be in the group's type
(possibly as an optional key).

If a control with a given name already exists, it would *not* be replaced with a new one.
If you want to replace an existing control, use the {@link FormGroup#setControl setControl}
method instead. This method also updates the value and validity of the control.

@param name The control name to add to the collection
@param control Provides the control for the given name
@param options Specifies whether this FormGroup instance should emit events after a new
    control is added.
* `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
`valueChanges` observables emit events with the latest status and value when the control is
added. When false, no events are emitted.

## FormGroup.removeControl

```ts
removeControl(name: string, options: {emitEvent?: boolean} = {}): void
```

Remove a control from this group. In a strongly-typed group, required controls cannot be
removed.

This method also updates the value and validity of the control.

@param name The control name to remove from the collection
@param options Specifies whether this FormGroup instance should emit events after a
    control is removed.
* `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
`valueChanges` observables emit events with the latest status and value when the control is
removed. When false, no events are emitted.

## FormGroup.setControl

```ts
setControl<K extends string & keyof TControl>( name: K, control: TControl[K], options?:
```

Replace an existing control. In a strongly-typed group, the control must be in the group's type
(possibly as an optional key).

If a control with a given name does not exist in this `FormGroup`, it will be added.

@param name The control name to replace in the collection
@param control Provides the control for the given name
@param options Specifies whether this FormGroup instance should emit events after an
    existing control is replaced.
* `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
`valueChanges` observables emit events with the latest status and value when the control is
replaced with a new one. When false, no events are emitted.

## FormGroup.contains

```ts
contains<K extends string>(controlName: K): boolean
```

Check whether there is an enabled control with the given name in the group.

Reports false for disabled controls. If you'd like to check for existence in the group
only, use {@link AbstractControl#get get} instead.

@param controlName The control name to check for existence in the collection

@returns false for disabled controls, true otherwise.

## FormGroup.setValue

```ts
override setValue( value: ɵFormGroupRawValue<TControl>, options:
```

Sets the value of the `FormGroup`. It accepts an object that matches
the structure of the group, with control names as keys.

@usageNotes
### Set the complete value for the form group

```ts
const form = new FormGroup({
  first: new FormControl(),
  last: new FormControl()
});

console.log(form.value);   // {first: null, last: null}

form.setValue({first: 'Nancy', last: 'Drew'});
console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
```

@throws When strict checks fail, such as setting the value of a control
that doesn't exist or if you exclude a value of a control that does exist.

@param value The new value for the control that matches the structure of the group.
@param options Configuration options that determine how the control propagates changes
and emits events after the value changes.
The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
updateValueAndValidity} method.

* `onlySelf`: When true, each change only affects this control, and not its parent. Default is
false.
* `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
`valueChanges`
observables emit events with the latest status and value when the control value is updated.
When false, no events are emitted.

## FormGroup.patchValue

```ts
override patchValue( value: ɵFormGroupValue<TControl>, options:
```

Patches the value of the `FormGroup`. It accepts an object with control
names as keys, and does its best to match the values to the correct controls
in the group.

It accepts both super-sets and sub-sets of the group without throwing an error.

@usageNotes
### Patch the value for a form group

```ts
const form = new FormGroup({
   first: new FormControl(),
   last: new FormControl()
});
console.log(form.value);   // {first: null, last: null}

form.patchValue({first: 'Nancy'});
console.log(form.value);   // {first: 'Nancy', last: null}
```

@param value The object that matches the structure of the group.
@param options Configuration options that determine how the control propagates changes and
emits events after the value is patched.
* `onlySelf`: When true, each change only affects this control and not its parent. Default is
true.
* `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
`valueChanges` observables emit events with the latest status and value when the control value
is updated. When false, no events are emitted. The configuration options are passed to
the {@link AbstractControl#updateValueAndValidity updateValueAndValidity} method.

## FormGroup.reset

```ts
override reset( value: ɵTypedOrUntyped<TControl, ɵFormGroupArgumentValue<TControl>, any> = {}, options: {onlySelf?: boolean
```

Resets the `FormGroup`, marks all descendants `pristine` and `untouched` and sets
the value of all descendants to their default values, or null if no defaults were provided.

You reset to a specific form state by passing in a map of states
that matches the structure of your form, with control names as keys. The state
is a standalone value or a form state object with both a value and a disabled
status.

@param value Resets the control with an initial value,
or an object that defines the initial value and disabled state.

@param options Configuration options that determine how the control propagates changes
and emits events when the group is reset.
* `onlySelf`: When true, each change only affects this control, and not its parent. Default is
false.
* `emitEvent`: When true or not supplied (the default), both the `statusChanges` and
`valueChanges`
observables emit events with the latest status and value when the control is reset.
When false, no events are emitted.
The configuration options are passed to the {@link AbstractControl#updateValueAndValidity
updateValueAndValidity} method.

@usageNotes

### Reset the form group values

```ts
const form = new FormGroup({
  first: new FormControl('first name'),
  last: new FormControl('last name')
});

console.log(form.value);  // {first: 'first name', last: 'last name'}

form.reset({ first: 'name', last: 'last name' });

console.log(form.value);  // {first: 'name', last: 'last name'}
```

### Reset the form group values and disabled status

```ts
const form = new FormGroup({
  first: new FormControl('first name'),
  last: new FormControl('last name')
});

form.reset({
  first: {value: 'name', disabled: true},
  last: 'last'
});

console.log(form.value);  // {last: 'last'}
console.log(form.get('first').status);  // 'DISABLED'
```

## FormGroup.getRawValue

```ts
override getRawValue(): ɵTypedOrUntyped<TControl, ɵFormGroupRawValue<TControl>, any>
```

The aggregate value of the `FormGroup`, including any disabled controls.

Retrieves all values regardless of disabled status.

## FormGroup.prototype

```ts
prototype: FormGroup<any>
```

The presence of an explicit `prototype` property provides backwards-compatibility for apps that
manually inspect the prototype chain.

## isFormGroup

```ts
export const isFormGroup = (control: unknown): control is FormGroup
```

@description
Asserts that the given control is an instance of `FormGroup`

@see [Utility functions for narrowing form control types](guide/forms/reactive-forms#utility-functions-for-narrowing-form-control-types)

@publicApi

## FormRecord

```ts
export class FormRecord<TControl extends AbstractControl = AbstractControl> extends FormGroup<
```

Tracks the value and validity state of a collection of `FormControl` instances, each of which has
the same value type.

`FormRecord` is very similar to {@link FormGroup}, except it can be used with a dynamic keys,
with controls added and removed as needed.

`FormRecord` accepts one generic argument, which describes the type of the controls it contains.

@usageNotes

```ts
let numbers = new FormRecord({bill: new FormControl('415-123-456')});
numbers.addControl('bob', new FormControl('415-234-567'));
numbers.removeControl('bill');
```

@see [FormGroup and FormRecord](guide/forms/typed-forms#formgroup-and-formrecord)

@publicApi

## FormRecord.registerControl

```ts
registerControl(name: string, control: TControl): TControl
```

Registers a control with the records's list of controls.

See `FormGroup#registerControl` for additional information.

## FormRecord.addControl

```ts
addControl(name: string, control: TControl, options?: {emitEvent?: boolean}): void
```

Add a control to this group.

See `FormGroup#addControl` for additional information.

## FormRecord.removeControl

```ts
removeControl(name: string, options?: {emitEvent?: boolean}): void
```

Remove a control from this group.

See `FormGroup#removeControl` for additional information.

## FormRecord.setControl

```ts
setControl(name: string, control: TControl, options?: {emitEvent?: boolean}): void
```

Replace an existing control.

See `FormGroup#setControl` for additional information.

## FormRecord.contains

```ts
contains(controlName: string): boolean
```

Check whether there is an enabled control with the given name in the group.

See `FormGroup#contains` for additional information.

## FormRecord.setValue

```ts
setValue( value: {[key: string]: ɵRawValue<TControl>}, options?:
```

Sets the value of the `FormRecord`. It accepts an object that matches
the structure of the group, with control names as keys.

See `FormGroup#setValue` for additional information.

## FormRecord.patchValue

```ts
patchValue( value: {[key: string]: ɵValue<TControl>}, options?:
```

Patches the value of the `FormRecord`. It accepts an object with control
names as keys, and does its best to match the values to the correct controls
in the group.

See `FormGroup#patchValue` for additional information.

## FormRecord.reset

```ts
reset( value?: {[key: string]: ɵValue<TControl> | FormControlState<ɵValue<TControl>>}, options?:
```

Resets the `FormRecord`, marks all descendants `pristine` and `untouched` and sets
the value of all descendants to null.

See `FormGroup#reset` for additional information.

## FormRecord.getRawValue

```ts
getRawValue(): {[key: string]: ɵRawValue<TControl>}
```

The aggregate value of the `FormRecord`, including any disabled controls.

See `FormGroup#getRawValue` for additional information.

## isFormRecord

```ts
export const isFormRecord = (control: unknown): control is FormRecord
```

@description
Asserts that the given control is an instance of `FormRecord`

@see [Utility functions for narrowing form control types](guide/forms/reactive-forms#utility-functions-for-narrowing-form-control-types)

@publicApi