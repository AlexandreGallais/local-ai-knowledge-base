---
title: "Options pattern in ASP.NET Core (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/configuration/options.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Options pattern in ASP.NET Core (part 3 of 3)

## Class-level validation with `IValidatableObject`

Options validation supports `System.ComponentModel.DataAnnotations.IValidatableObject` to perform class-level validation of a class within a class:

* Implement the `System.ComponentModel.DataAnnotations.IValidatableObject` interface and its `System.ComponentModel.DataAnnotations.IValidatableObject.Validate*` method within the class.
* Call `Microsoft.Extensions.DependencyInjection.OptionsBuilderDataAnnotationsExtensions.ValidateDataAnnotations*` in the `Program` file.

### Run options validation when the app starts with `ValidateOnStart`

Options validation runs the first time a `TOption` instance is created, which is when the first
access to `IOptionsSnapshot<TOptions>.Value` occurs in a request pipeline or when
`IOptionsMonitor<TOptions>.Get(string)` is called. Each time options are reloaded, validation runs again.

To run options validation when the app starts, call `Microsoft.Extensions.DependencyInjection.OptionsBuilderExtensions.ValidateOnStart*` in the `Program` file where services are registered for dependency injection:

```csharp
builder.Services.AddOptions<KeyOptions>()
    .Bind(builder.Configuration.GetSection(KeyOptions.Key))
    .ValidateDataAnnotations()
    .ValidateOnStart();
```

### Asynchronous options validation

In ASP.NET Core 11 or later, options validation supports asynchronous validation during app startup. Use asynchronous validation for rules that require I/O, such as checking whether a configured endpoint or resource is available. Call `Microsoft.Extensions.DependencyInjection.OptionsBuilderExtensions.ValidateOnStart*` so asynchronous validators run during `Microsoft.Extensions.Hosting.IHost.StartAsync*` before the app starts.

Register an asynchronous validation delegate with an overload of `Microsoft.Extensions.Options.OptionsBuilder`1.Validate*` that accepts a `System.Threading.CancellationToken` and returns `Task<bool>`:

```csharp
builder.Services.AddOptions<RemoteServiceOptions>()
    .Bind(builder.Configuration.GetSection(RemoteServiceOptions.SectionName))
    .Validate<IEndpointHealthCheck>(
        async (options, healthCheck, cancellationToken) =>
            await healthCheck.IsAvailableAsync(options.Endpoint, cancellationToken),
        "The configured endpoint isn't available.")
    .ValidateOnStart();
```

The asynchronous `Validate` overloads support up to five service dependencies from dependency injection, the same as the synchronous overloads.

To move asynchronous validation logic into a dedicated class, implement `Microsoft.Extensions.Options.IAsyncValidateOptions`1`. `IAsyncValidateOptions<TOptions>` inherits from `Microsoft.Extensions.Options.IValidateOptions`1`, so the class must implement both the synchronous `Validate` method and the asynchronous `ValidateAsync` method. Because the validation rule requires asynchronous I/O, the synchronous `Validate` method can't perform the check without blocking on the async call (sync-over-async). The following validator handles only the default-named options instance, returns `ValidateOptionsResult.Skip` for other names, and fails explicitly for matching options when synchronous validation is requested:

```csharp
public sealed class RemoteServiceOptionsValidator(
    IEndpointHealthCheck healthCheck) : IAsyncValidateOptions<RemoteServiceOptions>
{
    public ValidateOptionsResult Validate(string? name, RemoteServiceOptions options) =>
        name is not null && name != Options.DefaultName
            ? ValidateOptionsResult.Skip
            : ValidateOptionsResult.Fail(
                $"Asynchronous validation is required for {nameof(RemoteServiceOptions)}.");

    public async Task<ValidateOptionsResult> ValidateAsync(
        string? name, RemoteServiceOptions options, CancellationToken <example-value> = default)
    {
        if (name is not null && name != Options.DefaultName)
        {
            return ValidateOptionsResult.Skip;
        }
        return await healthCheck.IsAvailableAsync(options.Endpoint, cancellationToken)
            ? ValidateOptionsResult.Success
            : ValidateOptionsResult.Fail("The configured endpoint isn't available.");
    }
}
```

Register the validator as an `IValidateOptions<TOptions>` service, and call `ValidateOnStart` for the options:

```csharp
builder.Services.AddOptions<RemoteServiceOptions>()
    .Bind(builder.Configuration.GetSection(RemoteServiceOptions.SectionName))
    .ValidateOnStart();

builder.Services.AddSingleton<IValidateOptions<RemoteServiceOptions>,
    RemoteServiceOptionsValidator>();
```

#### Asynchronous validation with data annotations

In ASP.NET Core 11 or later, `Microsoft.Extensions.DependencyInjection.OptionsBuilderDataAnnotationsExtensions.ValidateDataAnnotations*` registers `Microsoft.Extensions.Options.DataAnnotationValidateOptions`1`, which implements `Microsoft.Extensions.Options.IAsyncValidateOptions`1` and `Microsoft.Extensions.Options.IValidateOptions`1`. When `ValidateDataAnnotations` is combined with `ValidateOnStart`, data annotations validation participates in startup validation.

The asynchronous path uses `System.ComponentModel.DataAnnotations.Validator.TryValidateObjectAsync*`, which evaluates synchronous validation attributes before `System.ComponentModel.DataAnnotations.AsyncValidationAttribute` derived attributes. It calls `System.ComponentModel.DataAnnotations.IAsyncValidatableObject.ValidateAsync*` when an options type implements `System.ComponentModel.DataAnnotations.IAsyncValidatableObject`. Otherwise, it falls back to the synchronous class-level validation with `IValidatableObject`.

`TryValidateObjectAsync` validates one object and doesn't recursively validate its property values. The startup cancellation token is passed through to the asynchronous validation rules.

#### Source-generated asynchronous validation

The `Microsoft.Extensions.Options.OptionsValidatorAttribute` source generator emits an asynchronous `ValidateAsync` method, in addition to the synchronous `Validate` method, when the partial validator type implements `IAsyncValidateOptions<TOptions>`:

```csharp
[OptionsValidator]
public partial class GeneratedRemoteServiceOptionsValidator :
    IAsyncValidateOptions<RemoteServiceOptions>
{
}
```

The generated `ValidateAsync` method evaluates asynchronous data annotations validation rules, including `System.ComponentModel.DataAnnotations.AsyncValidationAttribute` derived attributes and `System.ComponentModel.DataAnnotations.IAsyncValidatableObject.ValidateAsync*` for validated types that implement `System.ComponentModel.DataAnnotations.IAsyncValidatableObject`. A matching hand-written `Validate` or `ValidateAsync` method produces diagnostic `SYSLIB1205` or `SYSLIB1219`, respectively.

Register the generated validator as an `IValidateOptions<TOptions>` service:

```csharp
builder.Services.AddSingleton<IValidateOptions<RemoteServiceOptions>,
    GeneratedRemoteServiceOptionsValidator>();
```

#### Custom asynchronous startup validators

To run custom asynchronous startup validation that isn't tied to a specific options type, implement `Microsoft.Extensions.Options.IAsyncStartupValidator`:

```csharp
public sealed class CustomStartupValidator : IAsyncStartupValidator
{
    public async Task ValidateAsync(CancellationToken <example-value> = default)
    {
        if (!await IsStartupDependencyAvailableAsync(cancellationToken))
        {
            throw new InvalidOperationException(
                "The startup dependency isn't available.");
        }
    }
    private static Task<bool> IsStartupDependencyAvailableAsync(
        CancellationToken <example-value>)
    {
        cancellationToken.ThrowIfCancellationRequested();
        return Task.FromResult(true);
    }
}
```

Register the validator in dependency injection:

```csharp
builder.Services.AddSingleton<IAsyncStartupValidator, CustomStartupValidator>();
```

The host runs every registered `IAsyncStartupValidator` during `Microsoft.Extensions.Hosting.IHost.StartAsync*`, alongside the built-in validator that `ValidateOnStart` registers for options validation.

> **Note:**
> Asynchronous validation runs during host startup through `Microsoft.Extensions.Hosting.IHost.StartAsync*`. `OptionsFactory.Create()`, `IOptions<TOptions>.Value`, `IOptionsSnapshot<TOptions>`, and configuration reloads observed through `IOptionsMonitor<TOptions>` remain synchronous and don't invoke asynchronous validators. Options that require asynchronous validation can't be validated outside of the `ValidateOnStart` startup path.

## Options post-configuration

Where services are registered for dependency injection, `Microsoft.Extensions.Options.IPostConfigureOptions`1.PostConfigure*` is available to initialize a particular named option. In the following example, only `TopItem:Month:Name` is post-configured:

```csharp
builder.Services.Configure<TopItemSettings>(TopItemSettings.Month,
    builder.Configuration.GetSection("TopItem:Month"));
builder.Services.Configure<TopItemSettings>(TopItemSettings.Year,
    builder.Configuration.GetSection("TopItem:Year"));

builder.Services.PostConfigure<TopItemSettings>(TopItemSettings.Month, options =>
{
    options.Name = "Blue Gizmo";
});
```

Rendered output from the named options example, where only the `TopItem:Month:Name` is post-configured:

> :::no-loc text="Month: Name: Blue Gizmo Model: GW46":::
> :::no-loc text="Year: Name: Orange Gadget Model: OG35":::

Where services are registered for dependency injection, use `Microsoft.Extensions.DependencyInjection.OptionsServiceCollectionExtensions.PostConfigureAll*` to initialize all named instances of the specified options type. In the following example, all instances of `TopItem.Name` are set to `Blue Gizmo`:

```csharp
builder.Services.Configure<TopItemSettings>(TopItemSettings.Month,
    builder.Configuration.GetSection("TopItem:Month"));
builder.Services.Configure<TopItemSettings>(TopItemSettings.Year,
    builder.Configuration.GetSection("TopItem:Year"));

builder.Services.PostConfigureAll<TopItemSettings>(options =>
{
    options.Name = "Blue Gizmo";
});
```

Rendered output from the named options example, where all `TopItem:Name` options are post-configured:

> :::no-loc text="Month: Name: Blue Gizmo Model: GW46":::
> :::no-loc text="Year: Name: Blue Gizmo Model: OG35":::

## Access options in the request processing pipeline

To access `Microsoft.Extensions.Options.IOptions`1` or `Microsoft.Extensions.Options.IOptionsMonitor`1` in the request processing pipeline, call `Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService*` on `Microsoft.AspNetCore.Builder.WebApplication.Services`:

```csharp
var name = app.Services.GetRequiredService<IOptionsMonitor<PositionOptions>>()
    .CurrentValue.Name;
```

## Related content

* ASP.NET Core Blazor configuration: Options configuration
* View or download sample code (Razor Pages) (how to download)
