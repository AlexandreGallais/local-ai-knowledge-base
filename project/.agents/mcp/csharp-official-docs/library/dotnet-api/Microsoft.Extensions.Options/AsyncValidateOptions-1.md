---
title: "AsyncValidateOptions<TOptions> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/AsyncValidateOptions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncValidateOptions<TOptions> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class AsyncValidateOptions<TOptions> : Microsoft.Extensions.Options.IAsyncValidateOptions<TOptions>, Microsoft.Extensions.Options.IValidateOptions<TOptions> where TOptions : class
```

Implementation of `IAsyncValidateOptions<T>`.

Parameters:

- `TOptions`: The options type to validate.

To be added.

## AsyncValidateOptions<TOptions>.AsyncValidateOptions(String, Boolean>>, String) constructor

```csharp
public AsyncValidateOptions (string? name, Func<TOptions,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> validation, string failureMessage);
```

Initializes a new instance of `AsyncValidateOptions<T>`.

Parameters:

- `name`: Options name.
- `validation`: Asynchronous validation function.
- `failureMessage`: Validation failure message.

To be added.

## AsyncValidateOptions<TOptions>.FailureMessage property

```csharp
public string FailureMessage { get; }
```

Gets the error to return when validation fails.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions>.Name property

```csharp
public string? Name { get; }
```

Gets the options name.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions>.Validation property

```csharp
public Func<TOptions,System.Threading.CancellationToken,System.Threading.Tasks.Task<bool>> Validation { get; }
```

Gets the asynchronous validation function.

Returns: To be added.

To be added.

## AsyncValidateOptions<TOptions>.Validate(String, TOptions) method

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

## AsyncValidateOptions<TOptions>.ValidateAsync(String, TOptions, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<Microsoft.Extensions.Options.ValidateOptionsResult> ValidateAsync (string? name, TOptions options, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously validates a specific named options instance (or all when `name` is null).

Parameters:

- `name`: The name of the options instance being validated.
- `options`: The options instance.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: The `ValidateOptionsResult` result.

To be added.
