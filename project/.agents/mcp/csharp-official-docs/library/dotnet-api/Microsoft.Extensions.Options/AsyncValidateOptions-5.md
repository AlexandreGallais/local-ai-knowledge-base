---
title: "AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/AsyncValidateOptions`5.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4> : Microsoft.Extensions.Options.IAsyncValidateOptions<TOptions>, Microsoft.Extensions.Options.IValidateOptions<TOptions> where TOptions : class
```

Implementation of `IAsyncValidateOptions<T>`.

Parameters:

- `TOptions`: The options type to validate.
- `TDep1`: First dependency type.
- `TDep2`: Second dependency type.
- `TDep3`: Third dependency type.
- `TDep4`: Fourth dependency type.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.AsyncValidateOptions(String, TDep1, TDep2, TDep3, TDep4, Boolean>>, String) constructor

```csharp
public AsyncValidateOptions (string? name, TDep1 dependency1, TDep2 dependency2, TDep3 dependency3, TDep4 dependency4, Func<TOptions,TDep1,TDep2,TDep3,TDep4,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> validation, string failureMessage);
```

Initializes a new instance of `AsyncValidateOptions<T1,T2,T3,T4,T5>`.

Parameters:

- `name`: Options name.
- `dependency1`: The first dependency.
- `dependency2`: The second dependency.
- `dependency3`: The third dependency.
- `dependency4`: The fourth dependency.
- `validation`: Asynchronous validation function.
- `failureMessage`: Validation failure message.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.Dependency1 property

```csharp
public TDep1 Dependency1 { get; }
```

Gets the first dependency.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.Dependency2 property

```csharp
public TDep2 Dependency2 { get; }
```

Gets the second dependency.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.Dependency3 property

```csharp
public TDep3 Dependency3 { get; }
```

Gets the third dependency.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.Dependency4 property

```csharp
public TDep4 Dependency4 { get; }
```

Gets the fourth dependency.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.FailureMessage property

```csharp
public string FailureMessage { get; }
```

Gets the error to return when validation fails.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.Name property

```csharp
public string? Name { get; }
```

Gets the options name.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.Validation property

```csharp
public Func<TOptions,TDep1,TDep2,TDep3,TDep4,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> Validation { get; }
```

Gets the asynchronous validation function.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.Validate(String, TOptions) method

```csharp
public Microsoft.Extensions.Options.ValidateOptionsResult Validate (string? name, TOptions options);
```

Attempts to validate a specific named options instance synchronously.

Parameters:

- `name`: The name of the options instance being validated.
- `options`: The options instance.

Returns: `ValidateOptionsResult.Skip` when the configured name does not match; otherwise, a failed
result indicating that synchronous validation is unsupported.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.ValidateAsync(String, TOptions, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<Microsoft.Extensions.Options.ValidateOptionsResult> ValidateAsync (string? name, TOptions options, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `name`: To be added.
- `options`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.
