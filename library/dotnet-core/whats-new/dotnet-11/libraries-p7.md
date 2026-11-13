---
title: "What's new in .NET libraries for .NET 11 (part 7 of 8)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-11/libraries.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET libraries for .NET 11 (part 7 of 8)

## Caching, configuration, and logging

- Configuration binding
- MemoryCache OpenTelemetry metrics
- Options builder validation improvements
- Asynchronous ChangeToken.OnChange
- Options-aware HybridCache factories
- Asynchronous validation with DataAnnotations
- Format DataAnnotations messages
- Activity tracing configuration
- Generic source-generated logging methods
- Improved reliability for configuration file change detection

### Configuration binding

`Microsoft.Extensions.Configuration` adds `Microsoft.Extensions.Configuration.ConfigurationIgnoreAttribute`, so models can opt individual properties out of binding declaratively without relying on `BindNonPublicProperties` toggles or custom converters:

```csharp
public sealed class AppOptions
{
    public string Endpoint { get; set; } = "";

    [ConfigurationIgnore]
    public string ComputedKey => Endpoint + ":default";
}
```

`ConfigurationBinder` now also binds an empty array to a constructor parameter instead of throwing.

`PhysicalFilesWatcher` no longer throws when its root directory doesn't yet exist, and `InMemoryDirectoryInfo` resolves `..` and other relative segments consistently with the physical provider.

### MemoryCache OpenTelemetry metrics

`Microsoft.Extensions.Caching.Memory.MemoryCache` now emits a built-in set of OpenTelemetry (OTel)-compatible metrics without an extra adapter package. To opt in, set `Microsoft.Extensions.Caching.Memory.MemoryCacheOptions.TrackStatistics` to `true`:

```csharp
var cache = new MemoryCache(new MemoryCacheOptions
{
    TrackStatistics = true
});
```

The new `Microsoft.Extensions.Caching.Memory.MemoryCache` meter publishes four observable instruments:

- `dotnet.cache.requests` (with a `dotnet.cache.request.result` tag that distinguishes `hit` from `miss`)
- `dotnet.cache.evictions`
- `dotnet.cache.entries`
- `dotnet.cache.estimated_size` (with unit `1`, because its values represent application-defined cache size units rather than bytes)

If you filter telemetry on the hit/miss tag, use `dotnet.cache.request.result`. Earlier builds named the tag `dotnet.cache.request.type`.

Pass an `System.Diagnostics.Metrics.IMeterFactory` to the new `Microsoft.Extensions.Caching.Memory.MemoryCache.#ctor(Microsoft.Extensions.Options.IOptions{Microsoft.Extensions.Caching.Memory.MemoryCacheOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Diagnostics.Metrics.IMeterFactory)` constructor overload for per-instance metrics. Without one, the instruments are aggregated process-wide on a shared meter.

### Options builder validation improvements

`Microsoft.Extensions.Options.OptionsBuilder`1` gains a new generic `Microsoft.Extensions.Options.OptionsBuilder`1.Validate*` overload that accepts a type parameter instead of a factory delegate. The type must implement `Microsoft.Extensions.Options.IValidateOptions`1` and be registered in the dependency-injection container. This aligns options validation with the standard DI pattern:

```csharp
services.AddSingleton<IValidateOptions<MyOptions>, MyOptionsValidator>();
services.AddOptions<MyOptions>()
    .Bind(configuration.GetSection("MyOptions"))
    .Validate<MyOptionsValidator>();
```

### Asynchronous ChangeToken.OnChange

`Microsoft.Extensions.Primitives.ChangeToken.OnChange*` now has `Func<Task>` overloads, so you can run asynchronous callbacks without using `async void`. Re-registration now happens after the returned task completes.

### Options-aware HybridCache factories

`Microsoft.Extensions.Caching.Hybrid.HybridCache.GetOrCreateAsync*` now has overloads that provide a mutable factory context. You can set entry-level options, such as expiration and local cache size, from the value-producing callback.

### Asynchronous validation with DataAnnotations

`System.ComponentModel.DataAnnotations` now supports asynchronous validation. A validation rule that needs to do I/O—a database lookup or a remote API call—can now run without blocking a thread. There are three new ways to express an async rule:

- Derive from `AsyncValidationAttribute` and override its `IsValidAsync` method.
- Implement `IAsyncValidatableObject` on the model.
- Call the new `Validator.ValidateObjectAsync`, `TryValidateObjectAsync`, `ValidatePropertyAsync`, and `ValidateValueAsync` methods.

```csharp
using System;
using System.ComponentModel.DataAnnotations;

public sealed class ValidVatNumberAttribute : AsyncValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext context) =>
        throw new InvalidOperationException("Validate this attribute with IsValidAsync.");

    protected override async Task<ValidationResult?> IsValidAsync(
        object? value, ValidationContext context, CancellationToken cancellationToken)
    {
        var registry = context.GetRequiredService<IVatRegistry>();
        return await registry.IsRegisteredAsync((string?)value, cancellationToken)
            ? ValidationResult.Success
            : new ValidationResult("That VAT number isn't registered with the tax authority.");
    }
}

public class Invoice
{
    [Required]
    [StringLength(14, MinimumLength = 8)]
    [RegularExpression(@"^[A-Z]{2}[A-Z0-9]+$")]
    [ValidVatNumber] // asynchronous
    public string VatNumber { get; set; } = "";
}

var context = new ValidationContext(model, serviceProvider, items: null);
await Validator.ValidateObjectAsync(model, context, validateAllProperties: true);
```

`Microsoft.Extensions.Options` gains matching support: options can be validated asynchronously, including at startup through the new `IAsyncStartupValidator`. This lets an app fail fast when an option that requires a network check is misconfigured. `IStartupValidator` is now obsolete; implement `IAsyncStartupValidator` instead.

Source-generated options validators provide a synchronous `IValidateOptions<TOptions>.Validate` implementation in addition to asynchronous validation, so existing synchronous validation call sites keep working alongside validators that need to await I/O:

```csharp
public sealed class BackendOptionsValidator : IAsyncValidateOptions<BackendOptions>
{
    public async Task<ValidateOptionsResult> ValidateAsync(
        string? name, BackendOptions options, CancellationToken cancellationToken = default) =>
        await IsReachableAsync(options.HostName, cancellationToken)
            ? ValidateOptionsResult.Success
            : ValidateOptionsResult.Fail($"'{options.HostName}' isn't reachable.");

    // Source-generated validators also implement this synchronous fallback.
    public ValidateOptionsResult Validate(string? name, BackendOptions options) =>
        ValidateOptionsResult.Fail("Backend validation must run asynchronously.");
}
```

### Format DataAnnotations messages

`ValidationAttribute.FormatMessage` lets a validation host supply a message template while the attribute fills in its own placeholders. This method supports localization without duplicating the formatting logic for built-in attributes such as `System.ComponentModel.DataAnnotations.RangeAttribute`:

```csharp
using System.ComponentModel.DataAnnotations;

var range = new RangeAttribute(1, 10);
string message = range.FormatMessage("{0} must be between {1} and {2}", "Value");
// Value must be between 1 and 10
```

### Activity tracing configuration

A new tracing configuration API in `Microsoft.Extensions.Diagnostics` lets you turn `Activity` tracing on and off with rules instead of wiring up `ActivityListener` instances manually. Call `AddTracing` and describe which activity sources, operations, and listeners to enable or disable. Rules can be driven from configuration, so tracing can be tuned without a redeploy.

```csharp
builder.Services.AddTracing(tracing =>
{
    tracing.EnableTracing(sourceName: "MyCompany.Orders");
    tracing.DisableTracing(sourceName: "MyCompany.Orders", operationName: "HealthCheck");
});
```

The same release adds `ActivitySourceFactory` and unseals `ActivitySource`, which together support factory-driven creation and refreshable listeners.

### Generic source-generated logging methods

The logging source generator now supports generic methods decorated with `Microsoft.Extensions.Logging.LoggerMessageAttribute`, primarily to avoid boxing. Generic type parameters can use standard constraints, such as `class`, `struct`, `unmanaged`, interfaces, base types, and `new()`. The `allows ref struct` anti-constraint isn't supported and produces SYSLIB1011.

```csharp
[LoggerMessage(0, LogLevel.Trace, "Received {Code} ({Length} bytes)")]
public static partial void PacketReceived<TCode>(ILogger logger, TCode code, int length)
    where TCode : struct, Enum;
```

### Improved reliability for configuration file change detection

The `Microsoft.Extensions.FileProviders.Physical.PhysicalFilesWatcher` type, which configuration providers use to detect configuration file changes, includes several reliability improvements.

It now handles relative paths, missing directories, and file systems that don't support file watching more reliably. It also avoids watching subdirectories when it doesn't need to.
