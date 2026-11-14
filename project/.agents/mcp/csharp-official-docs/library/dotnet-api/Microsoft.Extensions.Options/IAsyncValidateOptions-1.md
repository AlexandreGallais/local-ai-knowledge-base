---
title: "IAsyncValidateOptions<TOptions> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/IAsyncValidateOptions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IAsyncValidateOptions<TOptions> interface

Namespace: `Microsoft.Extensions.Options`

```csharp
public interface IAsyncValidateOptions<TOptions> : Microsoft.Extensions.Options.IValidateOptions<TOptions> where TOptions : class
```

Asynchronously validates options.

Parameters:

- `TOptions`: The options type to validate.

Implementations must be registered through `OptionsBuilder<T>.Validate<T>`
or as `IValidateOptions<T>`, not directly as `IAsyncValidateOptions<T>`.

## IAsyncValidateOptions<TOptions>.ValidateAsync(String, TOptions, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<Microsoft.Extensions.Options.ValidateOptionsResult> ValidateAsync (string? name, TOptions options, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously validates a specified named options instance (or all if `name` is `null`).

Parameters:

- `name`: The name of the options instance being validated.
- `options`: The options instance.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: The `ValidateOptionsResult` result.

This method must perform all applicable checks for this validator, including checks that can complete
synchronously. The built-in asynchronous options creation path invokes this method instead of
invoking `IValidateOptions<T>.Validate` on the same validator. Share common checks
through a helper when needed.
Synchronous options creation invokes the inherited `IValidateOptions<T>.Validate` method.
Implement that method with equivalent synchronous validation when possible. If a required rule applies but
cannot be evaluated synchronously, return a failed `ValidateOptionsResult` indicating that
synchronous validation is unsupported; do not return `ValidateOptionsResult.Success`.
