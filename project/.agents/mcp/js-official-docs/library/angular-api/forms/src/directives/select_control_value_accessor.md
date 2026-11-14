# forms/src/directives/select_control_value_accessor

## NgSelectOption

```ts
export class NgSelectOption implements OnDestroy
```

@description
Marks `<option>` as dynamic, so Angular can be notified when options change.

@see {@link SelectControlValueAccessor}

@ngModule ReactiveFormsModule
@ngModule FormsModule
@publicApi

## NgSelectOption.id

```ts
id!: string
```

@description
ID of the option element

## NgSelectOption.ngValue

```ts
set ngValue(value: any)
```

@description
Tracks the value bound to the option element. Unlike the value binding,
ngValue supports binding to objects.

## NgSelectOption.value

```ts
set value(value: any)
```

@description
Tracks simple string values bound to the option element.
For objects, use the `ngValue` input binding.