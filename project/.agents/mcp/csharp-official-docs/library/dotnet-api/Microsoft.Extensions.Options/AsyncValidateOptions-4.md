---
title: "AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/AsyncValidateOptions`4.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3> : Microsoft.Extensions.Options.IAsyncValidateOptions<TOptions>, Microsoft.Extensions.Options.IValidateOptions<TOptions> where TOptions : class
```

Implementation of `IAsyncValidateOptions<T>`.

Parameters:

- `TOptions`: The options type to validate.
- `TDep1`: First dependency type.
- `TDep2`: Second dependency type.
- `TDep3`: Third dependency type.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3>.AsyncValidateOptions(String, TDep1, TDep2, TDep3, Boolean>>, String) constructor

```csharp
public AsyncValidateOptions (string? name, TDep1 dependency1, TDep2 dependency2, TDep3 dependency3, Func<TOptions,TDep1,TDep2,TDep3,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> validation, string failureMessage);
```

Initializes a new instance of `AsyncValidateOptions<T1,T2,T3,T4>`.

Parameters:

- `name`: Options name.
- `dependency1`: The first dependency.
- `dependency2`: The second dependency.
- `dependency3`: The third dependency.
- `validation`: Asynchronous validation function.
- `failureMessage`: Validation failure message.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3>.Dependency1 property

```csharp
public TDep1 Dependency1 { get; }
```

Gets the first dependency.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3>.Dependency2 property

```csharp
public TDep2 Dependency2 { get; }
```

Gets the second dependency.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3>.Dependency3 property

```csharp
public TDep3 Dependency3 { get; }
```

Gets the third dependency.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3>.FailureMessage property

```csharp
public string FailureMessage { get; }
```

Gets the error to return when validation fails.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3>.Name property

```csharp
public string? Name { get; }
```

Gets the options name.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3>.Validation property

```csharp
public Func<TOptions,TDep1,TDep2,TDep3,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> Validation { get; }
```

Gets the asynchronous validation function.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3>.Validate(String, TOptions) method

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

## AsyncValidateOptions<TOptions,TDep1,TDep2,TDep3>.ValidateAsync(String, TOptions, CancellationToken) method

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
