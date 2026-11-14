# forms/src/directives/abstract_control_directive

## AbstractControlDirective

```ts
export abstract class AbstractControlDirective
```

@description
Base class for control directives.

This class is only used internally in the `ReactiveFormsModule` and the `FormsModule`.

@publicApi

## AbstractControlDirective.control

```ts
abstract get control(): AbstractControl | null
```

@description
A reference to the underlying control.

@returns the control that backs this directive. Most properties fall through to that instance.

## AbstractControlDirective.value

```ts
get value(): any
```

@description
Reports the value of the control if it is present, otherwise null.

## AbstractControlDirective.valid

```ts
get valid(): boolean | null
```

@description
Reports whether the control is valid. A control is considered valid if no
validation errors exist with the current value.
If the control is not present, null is returned.

## AbstractControlDirective.invalid

```ts
get invalid(): boolean | null
```

@description
Reports whether the control is invalid, meaning that an error exists in the input value.
If the control is not present, null is returned.

## AbstractControlDirective.pending

```ts
get pending(): boolean | null
```

@description
Reports whether a control is pending, meaning that async validation is occurring and
errors are not yet available for the input value. If the control is not present, null is
returned.

## AbstractControlDirective.disabled

```ts
get disabled(): boolean | null
```

@description
Reports whether the control is disabled, meaning that the control is disabled
in the UI and is exempt from validation checks and excluded from aggregate
values of ancestor controls. If the control is not present, null is returned.

## AbstractControlDirective.enabled

```ts
get enabled(): boolean | null
```

@description
Reports whether the control is enabled, meaning that the control is included in ancestor
calculations of validity or value. If the control is not present, null is returned.

## AbstractControlDirective.errors

```ts
get errors(): ValidationErrors | null
```

@description
Reports the control's validation errors. If the control is not present, null is returned.

## AbstractControlDirective.pristine

```ts
get pristine(): boolean | null
```

@description
Reports whether the control is pristine, meaning that the user has not yet changed
the value in the UI. If the control is not present, null is returned.

## AbstractControlDirective.dirty

```ts
get dirty(): boolean | null
```

@description
Reports whether the control is dirty, meaning that the user has changed
the value in the UI. If the control is not present, null is returned.

## AbstractControlDirective.touched

```ts
get touched(): boolean | null
```

@description
Reports whether the control is touched, meaning that the user has triggered
a `blur` event on it. If the control is not present, null is returned.

## AbstractControlDirective.status

```ts
get status(): string | null
```

@description
Reports the validation status of the control. Possible values include:
'VALID', 'INVALID', 'DISABLED', and 'PENDING'.
If the control is not present, null is returned.

## AbstractControlDirective.untouched

```ts
get untouched(): boolean | null
```

@description
Reports whether the control is untouched, meaning that the user has not yet triggered
a `blur` event on it. If the control is not present, null is returned.

## AbstractControlDirective.statusChanges

```ts
get statusChanges(): Observable<any> | null
```

@description
Returns a multicasting observable that emits a validation status whenever it is
calculated for the control. If the control is not present, null is returned.

## AbstractControlDirective.valueChanges

```ts
get valueChanges(): Observable<any> | null
```

@description
Returns a multicasting observable of value changes for the control that emits every time the
value of the control changes in the UI or programmatically.
If the control is not present, null is returned.

## AbstractControlDirective.path

```ts
get path(): string[] | null
```

@description
Returns an array that represents the path from the top-level form to this control.
Each index is the string name of the control on that level.

## AbstractControlDirective.validator

```ts
get validator(): ValidatorFn | null
```

@description
Synchronous validator function composed of all the synchronous validators registered with this
directive.

## AbstractControlDirective.asyncValidator

```ts
get asyncValidator(): AsyncValidatorFn | null
```

@description
Asynchronous validator function composed of all the asynchronous validators registered with
this directive.

## AbstractControlDirective.reset

```ts
reset(value: any = undefined): void
```

@description
Resets the control with the provided value if the control is present.

## AbstractControlDirective.hasError

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

## AbstractControlDirective.getError

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