---
title: "IAsyncStartupValidator interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/IAsyncStartupValidator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IAsyncStartupValidator interface

Namespace: `Microsoft.Extensions.Options`

```csharp
public interface IAsyncStartupValidator
```

Provides asynchronous options validation during host startup.

New implementations should be registered only as `IAsyncStartupValidator`. Do not additionally
register a custom implementation as `IStartupValidator`; that interface is retained for
compatibility with existing synchronous startup validators.

## IAsyncStartupValidator.ValidateAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task ValidateAsync (System.Threading.CancellationToken <example-value> = default);
```

Validates options asynchronously during host startup.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous validation operation.

Exceptions:

- `OptionsValidationException`: A single validator returns a failed `ValidateOptionsResult` when validating.
- `AggregateException`: Multiple failures occur during startup validation.
- `InvalidOperationException`: The registered options services do not support asynchronous startup validation.
- `OperationCanceledException`: The operation was canceled through `cancellationToken`.

To be added.
