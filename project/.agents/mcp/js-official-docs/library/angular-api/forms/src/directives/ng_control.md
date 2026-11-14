# forms/src/directives/ng_control

## NgControl

```ts
export abstract class NgControl extends AbstractControlDirective
```

@description
A base class that all `FormControl`-based directives extend. It binds a `FormControl`
object to a DOM element.

@publicApi

## NgControl.name

```ts
name: string | number | null = null
```

@description
The name for the control

## NgControl.valueAccessor

```ts
valueAccessor: ControlValueAccessor | null = null
```

@description
The value accessor for the control

## NgControl.viewToModelUpdate

```ts
abstract viewToModelUpdate(newValue: any): void
```

@description
The callback method to update the model from the view when requested

@param newValue The new value for the view

## NgControl.parseErrorsValidator

```ts
protected parseErrorsValidator: ValidatorFn | null = null
```

Validator function that returns current parse errors.

## NgControl.customControlBindings

```ts
protected customControlBindings:
```

Tracks last bound values to avoid unnecessary FVC updates.

## NgControl.shouldBindRequired

```ts
protected get shouldBindRequired(): boolean
```

Whether the control should bind the `required` property (in custom control mode).

Can be overridden by subclasses that handle `required` in a different way.