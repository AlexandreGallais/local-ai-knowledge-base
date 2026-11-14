# forms/src/directives/control_container

## ControlContainer

```ts
export abstract class ControlContainer extends AbstractControlDirective
```

@description
A base class for directives that contain multiple registered instances of `NgControl`.
Only used by the forms module.

@publicApi

## ControlContainer.name

```ts
name!: string | number | null
```

@description
The name for the control

## ControlContainer.formDirective

```ts
get formDirective(): Form | null
```

@description
The top-level form directive for the control.

## ControlContainer.path

```ts
override get path(): string[] | null
```

@description
The path to this group.