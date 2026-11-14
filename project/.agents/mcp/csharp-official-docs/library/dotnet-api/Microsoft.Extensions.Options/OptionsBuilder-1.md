---
title: "OptionsBuilder<TOptions> class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/OptionsBuilder`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OptionsBuilder<TOptions> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class OptionsBuilder<TOptions> where TOptions : class
```

Configures `TOptions` instances.

Parameters:

- `TOptions`: The type of options being requested.

To be added.

## OptionsBuilder<TOptions>.OptionsBuilder(IServiceCollection, String) constructor

```csharp
public OptionsBuilder (Microsoft.Extensions.DependencyInjection.IServiceCollection services, string? name);
```

Creates a new instance of the `OptionsBuilder<T>` class.

Parameters:

- `services`: The `IServiceCollection` for the options being configured.
- `name`: The default name of the `TOptions` instance; if `null`, `Options.DefaultName` is used.

To be added.

## OptionsBuilder<TOptions>.Name property

```csharp
public string Name { get; }
```

Gets the default name of the `TOptions` instance.

Returns: To be added.

To be added.

## OptionsBuilder<TOptions>.Services property

```csharp
public Microsoft.Extensions.DependencyInjection.IServiceCollection Services { get; }
```

Gets the `IServiceCollection` for the options being configured.

Returns: To be added.

To be added.

## OptionsBuilder<TOptions>.Configure(Action<TOptions>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Configure (Action<TOptions> configureOptions);
```

Registers an action used to configure a particular type of options.

Parameters:

- `configureOptions`: The action used to configure the options.

Returns: The current `OptionsBuilder<T>`.

These are run before all `OptionsBuilder<T>.PostConfigure`.

## OptionsBuilder<TOptions>.Configure<TDep>(Action<TOptions,TDep>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Configure<TDep> (Action<TOptions,TDep> configureOptions) where TDep : class;
```

Registers an action used to configure a particular type of options.

Parameters:

- `TDep`: A dependency used by the action.
- `configureOptions`: The action used to configure the options.

Returns: The current `OptionsBuilder<T>`.

These are run before all `OptionsBuilder<T>.PostConfigure`.

## OptionsBuilder<TOptions>.Configure<TDep1,TDep2>(Action<TOptions,TDep1,TDep2>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Configure<TDep1,TDep2> (Action<TOptions,TDep1,TDep2> configureOptions) where TDep1 : class where TDep2 : class;
```

Registers an action used to configure a particular type of options.

Parameters:

- `TDep1`: The first dependency used by the action.
- `TDep2`: The second dependency used by the action.
- `configureOptions`: The action used to configure the options.

Returns: The current `OptionsBuilder<T>`.

These are run before all `OptionsBuilder<T>.PostConfigure`.

## OptionsBuilder<TOptions>.Configure<TDep1,TDep2,TDep3>(Action<TOptions,TDep1,TDep2,TDep3>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Configure<TDep1,TDep2,TDep3> (Action<TOptions,TDep1,TDep2,TDep3> configureOptions) where TDep1 : class where TDep2 : class where TDep3 : class;
```

Registers an action used to configure a particular type of options.

Parameters:

- `TDep1`: The first dependency used by the action.
- `TDep2`: The second dependency used by the action.
- `TDep3`: The third dependency used by the action.
- `configureOptions`: The action used to configure the options.

Returns: The current `OptionsBuilder<T>`.

These are run before all `OptionsBuilder<T>.PostConfigure`.

## OptionsBuilder<TOptions>.Configure<TDep1,TDep2,TDep3,TDep4>(Action<TOptions,TDep1,TDep2,TDep3,TDep4>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Configure<TDep1,TDep2,TDep3,TDep4> (Action<TOptions,TDep1,TDep2,TDep3,TDep4> configureOptions) where TDep1 : class where TDep2 : class where TDep3 : class where TDep4 : class;
```

Registers an action used to configure a particular type of options.

Parameters:

- `TDep1`: The first dependency used by the action.
- `TDep2`: The second dependency used by the action.
- `TDep3`: The third dependency used by the action.
- `TDep4`: The fourth dependency used by the action.
- `configureOptions`: The action used to configure the options.

Returns: The current `OptionsBuilder<T>`.

These are run before all `OptionsBuilder<T>.PostConfigure`.

## OptionsBuilder<TOptions>.Configure<TDep1,TDep2,TDep3,TDep4,TDep5>(Action<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Configure<TDep1,TDep2,TDep3,TDep4,TDep5> (Action<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5> configureOptions) where TDep1 : class where TDep2 : class where TDep3 : class where TDep4 : class where TDep5 : class;
```

Registers an action used to configure a particular type of options.

Parameters:

- `TDep1`: The first dependency used by the action.
- `TDep2`: The second dependency used by the action.
- `TDep3`: The third dependency used by the action.
- `TDep4`: The fourth dependency used by the action.
- `TDep5`: The fifth dependency used by the action.
- `configureOptions`: The action used to configure the options.

Returns: The current `OptionsBuilder<T>`.

These are run before all `OptionsBuilder<T>.PostConfigure`.

## OptionsBuilder<TOptions>.PostConfigure(Action<TOptions>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> PostConfigure (Action<TOptions> configureOptions);
```

Registers an action used to configure a particular type of options.

Parameters:

- `configureOptions`: The action used to configure the options.

Returns: The current `OptionsBuilder<T>`.

These are run after all `OptionsBuilder<T>.Configure`.

## OptionsBuilder<TOptions>.PostConfigure<TDep>(Action<TOptions,TDep>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> PostConfigure<TDep> (Action<TOptions,TDep> configureOptions) where TDep : class;
```

Registers an action used to post configure a particular type of options.

Parameters:

- `TDep`: The dependency used by the action.
- `configureOptions`: The action used to configure the options.

Returns: The current `OptionsBuilder<T>`.

These are run after all `OptionsBuilder<T>.Configure`.

## OptionsBuilder<TOptions>.PostConfigure<TDep1,TDep2>(Action<TOptions,TDep1,TDep2>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> PostConfigure<TDep1,TDep2> (Action<TOptions,TDep1,TDep2> configureOptions) where TDep1 : class where TDep2 : class;
```

Registers an action used to post configure a particular type of options.

Parameters:

- `TDep1`: The first dependency used by the action.
- `TDep2`: The second dependency used by the action.
- `configureOptions`: The action used to configure the options.

Returns: The current `OptionsBuilder<T>`.

These are run after all `OptionsBuilder<T>.Configure`.

## OptionsBuilder<TOptions>.PostConfigure<TDep1,TDep2,TDep3>(Action<TOptions,TDep1,TDep2,TDep3>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> PostConfigure<TDep1,TDep2,TDep3> (Action<TOptions,TDep1,TDep2,TDep3> configureOptions) where TDep1 : class where TDep2 : class where TDep3 : class;
```

Registers an action used to post configure a particular type of options.

Parameters:

- `TDep1`: The first dependency used by the action.
- `TDep2`: The second dependency used by the action.
- `TDep3`: The third dependency used by the action.
- `configureOptions`: The action used to configure the options.

Returns: The current `OptionsBuilder<T>`.

These are run after all `OptionsBuilder<T>.Configure`.

## OptionsBuilder<TOptions>.PostConfigure<TDep1,TDep2,TDep3,TDep4>(Action<TOptions,TDep1,TDep2,TDep3,TDep4>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> PostConfigure<TDep1,TDep2,TDep3,TDep4> (Action<TOptions,TDep1,TDep2,TDep3,TDep4> configureOptions) where TDep1 : class where TDep2 : class where TDep3 : class where TDep4 : class;
```

Registers an action used to post configure a particular type of options.

Parameters:

- `TDep1`: The first dependency used by the action.
- `TDep2`: The second dependency used by the action.
- `TDep3`: The third dependency used by the action.
- `TDep4`: The fourth dependency used by the action.
- `configureOptions`: The action used to configure the options.

Returns: The current `OptionsBuilder<T>`.

These are run after all `OptionsBuilder<T>.Configure`.

## OptionsBuilder<TOptions>.PostConfigure<TDep1,TDep2,TDep3,TDep4,TDep5>(Action<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> PostConfigure<TDep1,TDep2,TDep3,TDep4,TDep5> (Action<TOptions,TDep1,TDep2,TDep3,TDep4,TDep5> configureOptions) where TDep1 : class where TDep2 : class where TDep3 : class where TDep4 : class where TDep5 : class;
```

Registers an action used to post configure a particular type of options.

Parameters:

- `TDep1`: The first dependency used by the action.
- `TDep2`: The second dependency used by the action.
- `TDep3`: The third dependency used by the action.
- `TDep4`: The fourth dependency used by the action.
- `TDep5`: The fifth dependency used by the action.
- `configureOptions`: The action used to configure the options.

Returns: The current `OptionsBuilder<T>`.

These are run after all `OptionsBuilder<T>.Configure`.

## OptionsBuilder<TOptions>.Validate(Boolean>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate (Func<TOptions,bool> validation);
```

Registers a validation action for an options type using a default failure message.

Parameters:

- `validation`: The validation function.

Returns: The current `OptionsBuilder<T>`.

To be added.

## OptionsBuilder<TOptions>.Validate(Boolean>>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate (Func<TOptions,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> validation);
```

Registers an asynchronous validation action for an options type using a default failure message.

Parameters:

- `validation`: The asynchronous validation function.

Returns: The current `OptionsBuilder<T>`.

The delegate is invoked by asynchronous options validation, including built-in startup validation enabled
by `OptionsBuilderExtensions.ValidateOnStart<T>`, which can
seed the initial built-in `IOptions<T>` and `IOptionsMonitor<T>` caches.
Synchronous options creation cannot invoke or await this delegate and reports that synchronous validation
is unsupported when the validator applies to the requested options name. The built-in
`IOptionsSnapshot<T>` implementation and options-monitor reloads remain synchronous and
do not invoke this delegate.

## OptionsBuilder<TOptions>.Validate(Boolean>, String) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate (Func<TOptions,bool> validation, string failureMessage);
```

Registers a validation action for an options type.

Parameters:

- `validation`: The validation function.
- `failureMessage`: The failure message to use when validation fails.

Returns: The current `OptionsBuilder<T>`.

To be added.

## OptionsBuilder<TOptions>.Validate(Boolean>>, String) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate (Func<TOptions,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> validation, string failureMessage);
```

Registers an asynchronous validation action for an options type.

Parameters:

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

## OptionsBuilder<TOptions>.Validate<TDep>(Boolean>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TDep> (Func<TOptions,TDep,bool> validation);
```

Registers a validation action for an options type using a default failure message.

Parameters:

- `TDep`: The dependency used by the validation function.
- `validation`: The validation function.

Returns: The current `OptionsBuilder<T>`.

To be added.

## OptionsBuilder<TOptions>.Validate<TDep>(Boolean>>) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TDep> (Func<TOptions,TDep,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> validation);
```

Registers an asynchronous validation action for an options type using a default failure message.

Parameters:

- `TDep`: The dependency used by the validation function.
- `validation`: The asynchronous validation function.

Returns: The current `OptionsBuilder<T>`.

The delegate is invoked by asynchronous options validation, including built-in startup validation enabled
by `OptionsBuilderExtensions.ValidateOnStart<T>`, which can
seed the initial built-in `IOptions<T>` and `IOptionsMonitor<T>` caches.
Synchronous options creation cannot invoke or await this delegate and reports that synchronous validation
is unsupported when the validator applies to the requested options name. The built-in
`IOptionsSnapshot<T>` implementation and options-monitor reloads remain synchronous and
do not invoke this delegate.

## OptionsBuilder<TOptions>.Validate<TDep>(Boolean>, String) method

```csharp
public virtual Microsoft.Extensions.Options.OptionsBuilder<TOptions> Validate<TDep> (Func<TOptions,TDep,bool> validation, string failureMessage);
```

Registers a validation action for an options type.

Parameters:

- `TDep`: The dependency used by the validation function.
- `validation`: The validation function.
- `failureMessage`: The failure message to use when validation fails.

Returns: The current `OptionsBuilder<T>`.

To be added.
