---
title: "DataAnnotationValidateOptions<TOptions> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/DataAnnotationValidateOptions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataAnnotationValidateOptions<TOptions> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class DataAnnotationValidateOptions<TOptions> : Microsoft.Extensions.Options.IValidateOptions<TOptions> where TOptions : class
```

Implementation of `IValidateOptions<T>` that uses DataAnnotation's `Validator` for validation.

Parameters:

- `TOptions`: The instance being validated.

To be added.

## DataAnnotationValidateOptions<TOptions>.DataAnnotationValidateOptions(String) constructor

```csharp
public DataAnnotationValidateOptions (string? name);
```

Initializes a new instance of `DataAnnotationValidateOptions<T>` .

Parameters:

- `name`: The name of the option.

To be added.

## DataAnnotationValidateOptions<TOptions>.Name property

```csharp
public string? Name { get; }
```

Gets the options name.

Returns: To be added.

To be added.

## DataAnnotationValidateOptions<TOptions>.Validate(String, TOptions) method

```csharp
public Microsoft.Extensions.Options.ValidateOptionsResult Validate (string? name, TOptions options);
```

Validates a specific named options instance (or all when `name` is null).

Parameters:

- `name`: The name of the options instance being validated.
- `options`: The options instance.

Returns: The `ValidateOptionsResult` result.

To be added.

## DataAnnotationValidateOptions<TOptions>.ValidateAsync(String, TOptions, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<Microsoft.Extensions.Options.ValidateOptionsResult> ValidateAsync (string? name, TOptions options, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously validates a specific named options instance (or all when `name` is null).

Parameters:

- `name`: The name of the options instance being validated.
- `options`: The options instance.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: The `ValidateOptionsResult` result.

The built-in asynchronous options path invokes this method instead of
`DataAnnotationValidateOptions<T>.Validate`. This method performs complete DataAnnotations validation,
including synchronous and asynchronous attributes, and recursively validates members marked with
`ValidateObjectMembersAttribute` or `ValidateEnumeratedItemsAttribute`.
The `cancellationToken` is propagated from
`Host.StartAsync(CancellationToken)`. By default, no startup timeout
is applied. Configure `HostOptions.StartupTimeout` or pass
a `CancellationToken` with a timeout to `Host.StartAsync`
to bound I/O-bound async validators:

```csharp

            builder.Services.Configure<HostOptions>(opts =>
                opts.StartupTimeout = TimeSpan.FromSeconds(30));
            
```

Cancellation is cooperative. Validation cleanup awaits started work, so a validator that ignores the token
can delay completion. A timeout-linked token <example-value> cancellation; it does not enforce a hard completion
deadline.
