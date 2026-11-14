# forms/src/form_providers

## FormsModule

```ts
export class FormsModule
```

Exports the required providers and directives for template-driven forms,
making them available for import by NgModules that import this module.

@see [Forms Overview](guide/forms)
@see [Template-driven Forms Guide](guide/forms)

@publicApi

## FormsModule.withConfig

```ts
static withConfig(opts:
```

@description
Provides options for configuring the forms module.

@param opts An object of configuration options
* `callSetDisabledState` Configures whether to `always` call `setDisabledState`, which is more
correct, or to only call it `whenDisabled`, which is the legacy behavior.

## ReactiveFormsModule

```ts
export class ReactiveFormsModule
```

Exports the required infrastructure and directives for reactive forms,
making them available for import by NgModules that import this module.

@see [Forms Overview](guide/forms)
@see [Reactive Forms Guide](guide/forms/reactive-forms)

@publicApi

## ReactiveFormsModule.withConfig

```ts
static withConfig(opts:
```

@description
Provides options for configuring the reactive forms module.

@param opts An object of configuration options
* `warnOnNgModelWithFormControl` Configures when to emit a warning when an `ngModel`
binding is used with reactive form directives.
* `callSetDisabledState` Configures whether to `always` call `setDisabledState`, which is more
correct, or to only call it `whenDisabled`, which is the legacy behavior.

## ReactiveFormsModule.warnOnNgModelWithFormControl

```ts
warnOnNgModelWithFormControl?: 'never' | 'once' | 'always'
```

@deprecated as of v6