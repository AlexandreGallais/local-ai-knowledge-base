# forms/src/form_builder

## ControlConfig

```ts
export type ControlConfig<T> = [ T | FormControlState<T>, (ValidatorFn | ValidatorFn[])?, (AsyncValidatorFn | AsyncValidatorFn[])?, ]
```

ControlConfig<T> is a tuple containing a value of type T, plus optional validators and async
validators.

@publicApi

## FormBuilder

```ts
export class FormBuilder
```

@description
Creates an `AbstractControl` from a user-specified configuration.

The `FormBuilder` provides syntactic sugar that shortens creating instances of a
`FormControl`, `FormGroup`, or `FormArray`. It reduces the amount of boilerplate needed to
build complex forms.

@see [Reactive Forms Guide](guide/forms/reactive-forms)

@publicApi

## FormBuilder.nonNullable

```ts
get nonNullable(): NonNullableFormBuilder
```

@description
Returns a FormBuilder in which automatically constructed `FormControl` elements
have `{nonNullable: true}` and are non-nullable.

**Constructing non-nullable controls**

When constructing a control, it will be non-nullable, and will reset to its initial value.

```ts
let nnfb = new FormBuilder().nonNullable;
let name = nnfb.control('Alex'); // FormControl<string>
name.reset();
console.log(name); // 'Alex'
```

**Constructing non-nullable groups or arrays**

When constructing a group or array, all automatically created inner controls will be
non-nullable, and will reset to their initial values.

```ts
let nnfb = new FormBuilder().nonNullable;
let name = nnfb.group({who: 'Alex'}); // FormGroup<{who: FormControl<string>}>
name.reset();
console.log(name); // {who: 'Alex'}
```
**Constructing *nullable* fields on groups or arrays**

It is still possible to have a nullable field. In particular, any `FormControl` which is
*already* constructed will not be altered. For example:

```ts
let nnfb = new FormBuilder().nonNullable;
// FormGroup<{who: FormControl<string|null>}>
let name = nnfb.group({who: new FormControl('Alex')});
name.reset(); console.log(name); // {who: null}
```

Because the inner control is constructed explicitly by the caller, the builder has
no control over how it is created, and cannot exclude the `null`.

## FormBuilder.group

```ts
group<T extends {}>( controls: T, options?: AbstractControlOptions | null, ): FormGroup<ɵNullableFormControls<T>>
```

@description
Constructs a new `FormGroup` instance. Accepts a single generic argument, which is an object
containing all the keys and corresponding inner control types.

@param controls A collection of child controls. The key for each child is the name
under which it is registered. Each value can be one of:
* An `AbstractControl` instance — passed through as-is.
* A raw value — shorthand for `fb.control(value)`.
* A `FormControlState` object (`{value, disabled}`) — initializes the control with a value
  and disabled status.
* A `ControlConfig` tuple — `[value | FormControlState, validatorOrOpts?, asyncValidator?]`.
  The second element accepts a `ValidatorFn`, an array of `ValidatorFn`, or an
  `AbstractControlOptions` object (use this to set `updateOn`). The optional third element
  accepts an `AsyncValidatorFn` or an array of `AsyncValidatorFn`.

@param options Configuration options object for the `FormGroup`. The object should have the
`AbstractControlOptions` type and might contain the following fields:
* `validators`: A synchronous validator function, or an array of validator functions.
* `asyncValidators`: A single async validator or array of async validator functions.
* `updateOn`: The event upon which the control should be updated (options: 'change' | 'blur'
| submit').

@usageNotes

### Different ways to specify a control value

```ts
const fb = new FormBuilder();

fb.group({
  // Raw value — equivalent to fb.control('Ada')
  name: 'Ada',

  // FormControlState — sets initial value and disabled status
  city: {value: 'London', disabled: true},

  // ControlConfig tuple — value with a sync validator
  email: ['ada@example.com', Validators.email],

  // ControlConfig tuple — value, sync validator, and async validator
  username: ['ada', Validators.required, checkUsernameAvailable],

  // ControlConfig tuple — disabled value with updateOn option
  role: [{value: 'admin', disabled: true}, {updateOn: 'blur'}],

  // Pre-built control — passed through unchanged
  address: new FormControl('', Validators.required),
});
```

## FormBuilder.group

```ts
group(controls: {[key: string]: any}, options: {[key: string]: any}): FormGroup
```

@description
Constructs a new `FormGroup` instance.

@deprecated This API is not typesafe and can result in issues with Closure Compiler renaming.
Use the `FormBuilder#group` overload with `AbstractControlOptions` instead.
Note that `AbstractControlOptions` expects `validators` and `asyncValidators` to be valid
validators. If you have custom validators, make sure their validation function parameter is
`AbstractControl` and not a sub-class, such as `FormGroup`. These functions will be called
with an object of type `AbstractControl` and that cannot be automatically downcast to a
subclass, so TypeScript sees this as an error. For example, change the `(group: FormGroup) =>
ValidationErrors|null` signature to be `(group: AbstractControl) => ValidationErrors|null`.

@param controls A record of child controls. The key for each child is the name
under which the control is registered.

@param options Configuration options object for the `FormGroup`. The legacy configuration
object consists of:
* `validator`: A synchronous validator function, or an array of validator functions.
* `asyncValidator`: A single async validator or array of async validator functions
Note: the legacy format is deprecated and might be removed in one of the next major versions
of Angular.

## FormBuilder.record

```ts
record<T>( controls: {[key: string]: T}, options: AbstractControlOptions | null = null, ): FormRecord<ɵElement<T, null>>
```

@description
Constructs a new `FormRecord` instance. Accepts a single generic argument, which is an object
containing all the keys and corresponding inner control types.

@param controls A collection of child controls. The key for each child is the name
under which it is registered.

@param options Configuration options object for the `FormRecord`. The object should have the
`AbstractControlOptions` type and might contain the following fields:
* `validators`: A synchronous validator function, or an array of validator functions.
* `asyncValidators`: A single async validator or array of async validator functions.
* `updateOn`: The event upon which the control should be updated (options: 'change' | 'blur'
| submit').

## FormBuilder.control

```ts
control<T>( formState: T | FormControlState<T>, opts: FormControlOptions &
```

@deprecated Use `nonNullable` instead.

## FormBuilder.control

```ts
control<T>( formState: T | FormControlState<T>, opts: FormControlOptions, asyncValidator: AsyncValidatorFn | AsyncValidatorFn[], ): FormControl<T | null>
```

@deprecated When passing an `options` argument, the `asyncValidator` argument has no effect.

## FormBuilder.control

```ts
control<T>( formState: T | FormControlState<T>, validatorOrOpts?: ValidatorFn | ValidatorFn[] | FormControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null, ): FormControl
```

@description
Constructs a new `FormControl` with the given state, validators and options. Sets
`{nonNullable: true}` in the options to get a non-nullable control. Otherwise, the
control will be nullable. Accepts a single generic argument, which is the type  of the
control's value.

@param formState Initializes the control with an initial state value, or
with an object that contains both a value and a disabled status.

@param validatorOrOpts A synchronous validator function, or an array of
such functions, or a `FormControlOptions` object that contains
validation functions and a validation trigger.

@param asyncValidator A single async validator or array of async validator
functions.

@usageNotes

### Initialize a control as disabled

The following example returns a control with an initial value in a disabled state.

{@example forms/ts/formBuilder/form_builder_example.ts region='disabled-control'}

## FormBuilder.array

```ts
array<T>( controls: Array<T>, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null, ): FormArray<ɵElement<T, null>>
```

Constructs a new `FormArray` from the given array of configurations,
validators and options. Accepts a single generic argument, which is the type of each control
inside the array.

@param controls An array of child controls or control configs. Each child control is given an
    index when it is registered.

@param validatorOrOpts A synchronous validator function, or an array of such functions, or an
    `AbstractControlOptions` object that contains
validation functions and a validation trigger.

@param asyncValidator A single async validator or array of async validator functions.

## FormBuilder.group

```ts
abstract group<T extends {}>( controls: T, options?: AbstractControlOptions | null, ): FormGroup<ɵNonNullableFormControls<T>>
```

Similar to `FormBuilder#group`, except any implicitly constructed `FormControl`
will be non-nullable (i.e. it will have `nonNullable` set to true). Note
that already-constructed controls will not be altered.

## FormBuilder.record

```ts
abstract record<T>( controls: {[key: string]: T}, options?: AbstractControlOptions | null, ): FormRecord<ɵElement<T, never>>
```

Similar to `FormBuilder#record`, except any implicitly constructed `FormControl`
will be non-nullable (i.e. it will have `nonNullable` set to true). Note
that already-constructed controls will not be altered.

## FormBuilder.array

```ts
abstract array<T>( controls: Array<T>, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null, ): FormArray<ɵElement<T, never>>
```

Similar to `FormBuilder#array`, except any implicitly constructed `FormControl`
will be non-nullable (i.e. it will have `nonNullable` set to true). Note
that already-constructed controls will not be altered.

## FormBuilder.control

```ts
abstract control<T>( formState: T | FormControlState<T>, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null, ): FormControl<T>
```

Similar to `FormBuilder#control`, except this overridden version of `control` forces
`nonNullable` to be `true`, resulting in the control always being non-nullable.