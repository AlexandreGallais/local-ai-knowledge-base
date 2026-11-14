---
title: "EncoderServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/EncoderServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EncoderServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class EncoderServiceCollectionExtensions
```

Extension methods for setting up web encoding services in an `IServiceCollection`.

To be added.

## EncoderServiceCollectionExtensions.AddWebEncoders(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddWebEncoders (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds `HtmlEncoder`, `JavaScriptEncoder` and `UrlEncoder`
to the specified `services`.

Parameters:

- `services`: The `IServiceCollection`.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## EncoderServiceCollectionExtensions.AddWebEncoders(IServiceCollection, WebEncoderOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddWebEncoders (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.WebEncoders.WebEncoderOptions> setupAction);
```

Adds `HtmlEncoder`, `JavaScriptEncoder` and `UrlEncoder`
to the specified `services`.

Parameters:

- `services`: The `IServiceCollection`.
- `setupAction`: An `Action<T>` to configure the provided `WebEncoderOptions`.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.
