---
title: "OptionsBuilderDataAnnotationsExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/OptionsBuilderDataAnnotationsExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OptionsBuilderDataAnnotationsExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class OptionsBuilderDataAnnotationsExtensions
```

Extension methods for adding configuration related options services to the DI container via `OptionsBuilder<T>`.

To be added.

## OptionsBuilderDataAnnotationsExtensions.ValidateDataAnnotations<TOptions>(OptionsBuilder<TOptions>) method

```csharp
public static Microsoft.Extensions.Options.OptionsBuilder<TOptions> ValidateDataAnnotations<TOptions> (this Microsoft.Extensions.Options.OptionsBuilder<TOptions> optionsBuilder) where TOptions : class;
```

Registers this options instance for validation of its DataAnnotations.

Parameters:

- `TOptions`: The options type to be configured.
- `optionsBuilder`: The options builder to add the services to.

Returns: The `OptionsBuilder<T>` so that additional calls can be chained.

Synchronous validation runs when an options instance is created. When targeting .NET 11 or later,
asynchronous validation (including `AsyncValidationAttribute`-derived attributes)
runs during startup when `ValidateOnStart()` is also called.
If `ValidateOnStart()` is not called, attributes deriving from
`AsyncValidationAttribute` are never evaluated asynchronously: runtime options access triggers only
synchronous validation, which invokes the attribute's synchronous fallback instead.
The built-in `IOptionsSnapshot<T>` implementation always uses synchronous attribute
validation and never calls the asynchronous `IsValidAsync` method. Options created before startup
validation or recreated by the built-in `IOptionsMonitor<T>` implementation after a
change also use synchronous validation. If a required rule applies but cannot be evaluated synchronously,
the attribute's synchronous `IsValid` implementation should throw
`InvalidOperationException` to report that the invocation is unsupported instead of
returning success.
