---
title: "OptionsBuilder<TOptions> class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/OptionsBuilder`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OptionsBuilder<TOptions> class (part 2 of 3)

## OptionsBuilder<TOptions>.Validate<TDep>(Boolean>>, String) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TDep> (Func<TOptions,TDep,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> validation, string failureMessage);
```

Registers an asynchronous validation action for an options type.

Parameters:

- `TDep`: The dependency used by the validation function.
- `validation`: The asynchronous validation function.
- `failureMessage`: The failure message to use when validation fails.

Returns: The current `OptionsBuilder<T>`.

The delegate is invoked by asynchronous options validation, including built-in startup validation enabled
by `OptionsBuilderExtensions.ValidateOnStart<T>`, which can
seed the initial built-in `IOptions<T>` and `IOptionsMonitor<T>` caches.
Synchronous options creation cannot invoke or await this delegate and reports that synchronous validation
is unsupported when the validator applies to the requested options name. The built-in
`IOptionsSnapshot<T>` implementation and options-monitor reloads remain synchronous and
do not invoke this delegate.

## OptionsBuilder<TOptions>.Validate<TValidateOptions>() method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TValidateOptions> () where TValidateOptions : class, Microsoft.Extensions.Options.IValidateOptions<TOptions>;
```

Registers an `IValidateOptions<T>` or
`IAsyncValidateOptions<T>` implementation for an options type.

Parameters:

- `TValidateOptions`: The validation type.

Returns: The current `OptionsBuilder<T>`.

Validation is scoped to the options name associated with this builder.
Dependencies required by `TValidateOptions`
are resolved from the service provider.
This method is the preferred way to register a validator type because it preserves the builder's options
name for startup validation. A validator registered directly as `IValidateOptions<T>`
is conservatively treated as applying to every options name.
When the validator implements `IAsyncValidateOptions<T>`, the built-in asynchronous
options creation path invokes `IAsyncValidateOptions<T>.ValidateAsync` instead of
invoking both validation methods. Synchronous options creation continues to invoke
`IValidateOptions<T>.Validate`.

## OptionsBuilder<TOptions>.Validate<TDep1,TDep2>(Boolean>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TDep1,TDep2> (Func<TOptions,TDep1,TDep2,bool> validation);
```

Registers a validation action for an options type using a default failure message.

Parameters:

- `TDep1`: The first dependency used by the validation function.
- `TDep2`: The second dependency used by the validation function.
- `validation`: The validation function.

Returns: The current `OptionsBuilder<T>`.

To be added.

## OptionsBuilder<TOptions>.Validate<TDep1,TDep2>(Boolean>>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TDep1,TDep2> (Func<TOptions,TDep1,TDep2,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> validation);
```

Registers an asynchronous validation action for an options type using a default failure message.

Parameters:

- `TDep1`: The first dependency used by the validation function.
- `TDep2`: The second dependency used by the validation function.
- `validation`: The asynchronous validation function.

Returns: The current `OptionsBuilder<T>`.

The delegate is invoked by asynchronous options validation, including built-in startup validation enabled
by `OptionsBuilderExtensions.ValidateOnStart<T>`, which can
seed the initial built-in `IOptions<T>` and `IOptionsMonitor<T>` caches.
Synchronous options creation cannot invoke or await this delegate and reports that synchronous validation
is unsupported when the validator applies to the requested options name. The built-in
`IOptionsSnapshot<T>` implementation and options-monitor reloads remain synchronous and
do not invoke this delegate.

## OptionsBuilder<TOptions>.Validate<TDep1,TDep2>(Boolean>, String) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TDep1,TDep2> (Func<TOptions,TDep1,TDep2,bool> validation, string failureMessage);
```

Registers a validation action for an options type.

Parameters:

- `TDep1`: The first dependency used by the validation function.
- `TDep2`: The second dependency used by the validation function.
- `validation`: The validation function.
- `failureMessage`: The failure message to use when validation fails.

Returns: The current `OptionsBuilder<T>`.

To be added.

## OptionsBuilder<TOptions>.Validate<TDep1,TDep2>(Boolean>>, String) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TDep1,TDep2> (Func<TOptions,TDep1,TDep2,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> validation, string failureMessage);
```

Registers an asynchronous validation action for an options type.

Parameters:

- `TDep1`: The first dependency used by the validation function.
- `TDep2`: The second dependency used by the validation function.
- `validation`: The asynchronous validation function.
- `failureMessage`: The failure message to use when validation fails.

Returns: The current `OptionsBuilder<T>`.

The delegate is invoked by asynchronous options validation, including built-in startup validation enabled
by `OptionsBuilderExtensions.ValidateOnStart<T>`, which can
seed the initial built-in `IOptions<T>` and `IOptionsMonitor<T>` caches.
Synchronous options creation cannot invoke or await this delegate and reports that synchronous validation
is unsupported when the validator applies to the requested options name. The built-in
`IOptionsSnapshot<T>` implementation and options-monitor reloads remain synchronous and
do not invoke this delegate.

## OptionsBuilder<TOptions>.Validate<TDep1,TDep2,TDep3>(Boolean>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TDep1,TDep2,TDep3> (Func<TOptions,TDep1,TDep2,TDep3,bool> validation);
```

Registers a validation action for an options type using a default failure message.

Parameters:

- `TDep1`: The first dependency used by the validation function.
- `TDep2`: The second dependency used by the validation function.
- `TDep3`: The third dependency used by the validation function.
- `validation`: The validation function.

Returns: The current `OptionsBuilder<T>`.

To be added.

## OptionsBuilder<TOptions>.Validate<TDep1,TDep2,TDep3>(Boolean>>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TDep1,TDep2,TDep3> (Func<TOptions,TDep1,TDep2,TDep3,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> validation);
```

Registers an asynchronous validation action for an options type using a default failure message.

Parameters:

- `TDep1`: The first dependency used by the validation function.
- `TDep2`: The second dependency used by the validation function.
- `TDep3`: The third dependency used by the validation function.
- `validation`: The asynchronous validation function.

Returns: The current `OptionsBuilder<T>`.

The delegate is invoked by asynchronous options validation, including built-in startup validation enabled
by `OptionsBuilderExtensions.ValidateOnStart<T>`, which can
seed the initial built-in `IOptions<T>` and `IOptionsMonitor<T>` caches.
Synchronous options creation cannot invoke or await this delegate and reports that synchronous validation
is unsupported when the validator applies to the requested options name. The built-in
`IOptionsSnapshot<T>` implementation and options-monitor reloads remain synchronous and
do not invoke this delegate.

## OptionsBuilder<TOptions>.Validate<TDep1,TDep2,TDep3>(Boolean>, String) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TDep1,TDep2,TDep3> (Func<TOptions,TDep1,TDep2,TDep3,bool> validation, string failureMessage);
```

Registers a validation action for an options type.

Parameters:

- `TDep1`: The first dependency used by the validation function.
- `TDep2`: The second dependency used by the validation function.
- `TDep3`: The third dependency used by the validation function.
- `validation`: The validation function.
- `failureMessage`: The failure message to use when validation fails.

Returns: The current `OptionsBuilder<T>`.

To be added.

## OptionsBuilder<TOptions>.Validate<TDep1,TDep2,TDep3>(Boolean>>, String) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TDep1,TDep2,TDep3> (Func<TOptions,TDep1,TDep2,TDep3,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> validation, string failureMessage);
```

Registers an asynchronous validation action for an options type.

Parameters:

- `TDep1`: The first dependency used by the validation function.
- `TDep2`: The second dependency used by the validation function.
- `TDep3`: The third dependency used by the validation function.
- `validation`: The asynchronous validation function.
- `failureMessage`: The failure message to use when validation fails.

Returns: The current `OptionsBuilder<T>`.

The delegate is invoked by asynchronous options validation, including built-in startup validation enabled
by `OptionsBuilderExtensions.ValidateOnStart<T>`, which can
seed the initial built-in `IOptions<T>` and `IOptionsMonitor<T>` caches.
Synchronous options creation cannot invoke or await this delegate and reports that synchronous validation
is unsupported when the validator applies to the requested options name. The built-in
`IOptionsSnapshot<T>` implementation and options-monitor reloads remain synchronous and
do not invoke this delegate.

## OptionsBuilder<TOptions>.Validate<TDep1,TDep2,TDep3,TDep4>(Boolean>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TDep1,TDep2,TDep3,TDep4> (Func<TOptions,TDep1,TDep2,TDep3,TDep4,bool> validation);
```

Registers a validation action for an options type using a default failure message.

Parameters:

- `TDep1`: The first dependency used by the validation function.
- `TDep2`: The second dependency used by the validation function.
- `TDep3`: The third dependency used by the validation function.
- `TDep4`: The fourth dependency used by the validation function.
- `validation`: The validation function.

Returns: The current `OptionsBuilder<T>`.

To be added.

## OptionsBuilder<TOptions>.Validate<TDep1,TDep2,TDep3,TDep4>(Boolean>>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TDep1,TDep2,TDep3,TDep4> (Func<TOptions,TDep1,TDep2,TDep3,TDep4,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> validation);
```

Registers an asynchronous validation action for an options type using a default failure message.

Parameters:

- `TDep1`: The first dependency used by the validation function.
- `TDep2`: The second dependency used by the validation function.
- `TDep3`: The third dependency used by the validation function.
- `TDep4`: The fourth dependency used by the validation function.
- `validation`: The asynchronous validation function.

Returns: The current `OptionsBuilder<T>`.

The delegate is invoked by asynchronous options validation, including built-in startup validation enabled
by `OptionsBuilderExtensions.ValidateOnStart<T>`, which can
seed the initial built-in `IOptions<T>` and `IOptionsMonitor<T>` caches.
Synchronous options creation cannot invoke or await this delegate and reports that synchronous validation
is unsupported when the validator applies to the requested options name. The built-in
`IOptionsSnapshot<T>` implementation and options-monitor reloads remain synchronous and
do not invoke this delegate.

## OptionsBuilder<TOptions>.Validate<TDep1,TDep2,TDep3,TDep4>(Boolean>, String) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TDep1,TDep2,TDep3,TDep4> (Func<TOptions,TDep1,TDep2,TDep3,TDep4,bool> validation, string failureMessage);
```

Registers a validation action for an options type.

Parameters:

- `TDep1`: The first dependency used by the validation function.
- `TDep2`: The second dependency used by the validation function.
- `TDep3`: The third dependency used by the validation function.
- `TDep4`: The fourth dependency used by the validation function.
- `validation`: The validation function.
- `failureMessage`: The failure message to use when validation fails.

Returns: The current `OptionsBuilder<T>`.

To be added.

## OptionsBuilder<TOptions>.Validate<TDep1,TDep2,TDep3,TDep4>(Boolean>>, String) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TDep1,TDep2,TDep3,TDep4> (Func<TOptions,TDep1,TDep2,TDep3,TDep4,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> validation, string failureMessage);
```

Registers an asynchronous validation action for an options type.

Parameters:

- `TDep1`: The first dependency used by the validation function.
- `TDep2`: The second dependency used by the validation function.
- `TDep3`: The third dependency used by the validation function.
- `TDep4`: The fourth dependency used by the validation function.
- `validation`: The asynchronous validation function.
- `failureMessage`: The failure message to use when validation fails.

Returns: The current `OptionsBuilder<T>`.

The delegate is invoked by asynchronous options validation, including built-in startup validation enabled
by `OptionsBuilderExtensions.ValidateOnStart<T>`, which can
seed the initial built-in `IOptions<T>` and `IOptionsMonitor<T>` caches.
Synchronous options creation cannot invoke or await this delegate and reports that synchronous validation
is unsupported when the validator applies to the requested options name. The built-in
`IOptionsSnapshot<T>` implementation and options-monitor reloads remain synchronous and
do not invoke this delegate.

## OptionsBuilder<TOptions>.Validate<TDep1,TDep2,TDep3,TDep4,TDep5>(Boolean>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TDep1,TDep2,TDep3,TDep4,TDep5> (Func<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5,bool> validation);
```

Registers a validation action for an options type using a default failure message.

Parameters:

- `TDep1`: The first dependency used by the validation function.
- `TDep2`: The second dependency used by the validation function.
- `TDep3`: The third dependency used by the validation function.
- `TDep4`: The fourth dependency used by the validation function.
- `TDep5`: The fifth dependency used by the validation function.
- `validation`: The validation function.

Returns: The current `OptionsBuilder<T>`.

To be added.
