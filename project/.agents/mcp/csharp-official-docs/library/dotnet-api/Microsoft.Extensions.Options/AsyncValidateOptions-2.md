---
title: "AsyncValidateOptions<TOptions,TDep> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/AsyncValidateOptions`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncValidateOptions<TOptions,TDep> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class AsyncValidateOptions<TOptions,TDep> : Microsoft.Extensions.Options.IAsyncValidateOptions<TOptions>, Microsoft.Extensions.Options.IValidateOptions<TOptions> where TOptions : class
```

Implementation of `IAsyncValidateOptions<T>`.

Parameters:

- `TOptions`: The options type to validate.
- `TDep`: Dependency type.

To be added.

## AsyncValidateOptions<TOptions,TDep>.AsyncValidateOptions(String, TDep, Boolean>>, String) constructor

```csharp
public AsyncValidateOptions (string? name, TDep dependency, Func<TOptions,TDep,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> validation, string failureMessage);
```

Initializes a new instance of `AsyncValidateOptions<T1,T2>`.

Parameters:

- `name`: Options name.
- `dependency`: The dependency.
- `validation`: Asynchronous validation function.
- `failureMessage`: Validation failure message.

To be added.

## AsyncValidateOptions<TOptions,TDep>.Dependency property

```csharp
public TDep Dependency { get; }
```

Gets the dependency.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions,TDep>.FailureMessage property

```csharp
public string FailureMessage { get; }
```

Gets the error to return when validation fails.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions,TDep>.Name property

```csharp
public string? Name { get; }
```

Gets the options name.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions,TDep>.Validation property

```csharp
public Func<TOptions,TDep,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> Validation { get; }
```

Gets the asynchronous validation function.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions,TDep>.Validate(String, TOptions) method

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

## AsyncValidateOptions<TOptions,TDep>.ValidateAsync(String, TOptions, CancellationToken) method

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
