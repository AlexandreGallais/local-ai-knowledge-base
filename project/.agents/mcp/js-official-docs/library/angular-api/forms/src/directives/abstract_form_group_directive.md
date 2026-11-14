# forms/src/directives/abstract_form_group_directive

## AbstractFormGroupDirective

```ts
export class AbstractFormGroupDirective extends ControlContainer implements OnInit, OnDestroy
```

@description
A base class for code shared between the `NgModelGroup` and `FormGroupName` directives.

@publicApi

## AbstractFormGroupDirective.control

```ts
override get control(): FormGroup
```

@description
The `FormGroup` bound to this directive.

## AbstractFormGroupDirective.path

```ts
override get path(): string[]
```

@description
The path to this group from the top-level directive.

## AbstractFormGroupDirective.formDirective

```ts
override get formDirective(): Form | null
```

@description
The top-level directive for this group if present, otherwise null.