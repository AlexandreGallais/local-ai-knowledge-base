---
title: "OptionsBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/OptionsBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OptionsBuilderExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class OptionsBuilderExtensions
```

Extension methods for adding configuration-related options services to the DI container via `OptionsBuilder<T>`.

To be added.

## OptionsBuilderExtensions.ValidateOnStart<TOptions>(OptionsBuilder<TOptions>) method

```csharp
public static Microsoft.Extensions.Options.OptionsBuilder<TOptions> ValidateOnStart<TOptions> (this Microsoft.Extensions.Options.OptionsBuilder<TOptions> optionsBuilder) where TOptions : class;
```

Enforces options validation check on start rather than at run time.

Parameters:

- `TOptions`: The type of options.
- `optionsBuilder`: The `OptionsBuilder<T>` to configure options instance.

Returns: The `OptionsBuilder<T>` so that additional calls can be chained.

With the built-in `IOptionsFactory<T>`, asynchronous validation runs during startup and
seeds the built-in `IOptions<T>` and `IOptionsMonitor<T>` instances
when their caches do not already contain a value. Options requiring asynchronous validation cannot be
accessed synchronously before startup completes. A value successfully created synchronously before or
during startup remains the cache winner, and a faulted monitor cache entry causes startup validation to
fail rather than being replaced.

A derived or replacement `IOptionsFactory<T>` uses synchronous startup validation and
does not invoke `IAsyncValidateOptions<T>.ValidateAsync`. Default-name asynchronous
validation requires the built-in `IOptions<T>` implementation; startup throws
`InvalidOperationException` when a custom implementation is registered. The built-in
`IOptionsSnapshot<T>` validates synchronously in per-scope caches that startup validation
does not populate. The built-in options monitor also reloads synchronously and does not invoke asynchronous
validation. The built-in asynchronous validators therefore cause reload to fail and prevent change
listeners from being notified; no asynchronous last-known-good guarantee is provided.

Publication uses `IOptionsMonitorCache<T>.GetOrAdd` so an existing monitor value is not
replaced. For compatibility, this method exposes the built-in startup validator through
`IStartupValidator` and `IAsyncStartupValidator` as the same singleton. A custom
validator registered only as `IStartupValidator` takes precedence and suppresses all
asynchronous startup validators. New custom startup validators should register only
`IAsyncStartupValidator`.
