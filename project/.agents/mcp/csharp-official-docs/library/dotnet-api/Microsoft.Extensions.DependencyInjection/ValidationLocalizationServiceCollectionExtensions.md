---
title: "ValidationLocalizationServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ValidationLocalizationServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValidationLocalizationServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ValidationLocalizationServiceCollectionExtensions
```

Extension methods for registering the default `IStringLocalizer`-based validation
localizer.

To be added.

## ValidationLocalizationServiceCollectionExtensions.AddValidationLocalization(IServiceCollection, ValidationLocalizationOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddValidationLocalization (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Validation.Localization.ValidationLocalizationOptions>? configureOptions = default);
```

Adds the default `IStringLocalizer`-based validation localizer to the
service collection and wires it up by setting `ValidationOptions.Localizer`.

Parameters:

- `services`: The `IServiceCollection` to add services to.
- `configureOptions`: An optional callback to configure
`ValidationLocalizationOptions`.

Returns: The `IServiceCollection` for chaining.

Internally calls `LocalizationServiceCollectionExtensions.AddLocalization`
to ensure an `IStringLocalizerFactory` is registered, and registers an
`IConfigureOptions<T>` bridge that sets
`ValidationOptions.Localizer` to a default
instance (only when `ValidationOptions.Localizer` has not already been set).

Call `AddValidation()` separately to register the validation pipeline itself.
Call order does not matter.

Minimal API parameter validation: top-level Minimal API parameters do not have
a declaring type.
For applications that validate Minimal API parameters, prefer the
`ValidationLocalizationServiceCollectionExtensions.AddValidationLocalization<T>` overload (shared-resource pattern),
or set `ValidationLocalizationOptions.LocalizerProvider` explicitly to a
delegate that does not depend on the declaring type (which is passed as
`null` in the parameter case).

The default `IStringLocalizerFactory` registered by
`AddLocalization()` reads strings from .resx resource files. To localize against
other sources (databases, JSON files, in-memory dictionaries, third-party translation
services), register your own `IStringLocalizerFactory` implementation
either before or after `ValidationLocalizationServiceCollectionExtensions.AddValidationLocalization`.
The validation localizer resolves the factory at validation time, so registration order
does not matter:

<example>

```csharp

            builder.Services.AddValidation();
            builder.Services.AddValidationLocalization();
            builder.Services.AddSingleton<IStringLocalizerFactory, MyDatabaseLocalizerFactory>();
            
```

</example>

```csharp

            builder.Services.AddValidation();
            builder.Services.AddValidationLocalization();
            builder.Services.AddSingleton<IStringLocalizerFactory, MyDatabaseLocalizerFactory>();
            
```

## ValidationLocalizationServiceCollectionExtensions.AddValidationLocalization<TResource>(IServiceCollection, ValidationLocalizationOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddValidationLocalization<TResource> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Validation.Localization.ValidationLocalizationOptions>? configureOptions = default);
```

Adds the default `IStringLocalizer`-based validation localizer configured to
resolve localized strings against the resource type `TResource`
for all types being validated.

Parameters:

- `TResource`: The type that identifies the shared resource source.
- `services`: The `IServiceCollection` to add services to.
- `configureOptions`: An optional callback to further configure
`ValidationLocalizationOptions`.

Returns: The `IServiceCollection` for chaining.

Use this when validation messages live in a single shared resource file rather than
per-type resource files.

Equivalent to setting `ValidationLocalizationOptions.LocalizerProvider` to
`(_, factory) => factory.Create(typeof(TResource))`, but the configured provider
resolves the `IStringLocalizer` once and reuses the same instance for every
declaring type, avoiding repeated factory lookups.
