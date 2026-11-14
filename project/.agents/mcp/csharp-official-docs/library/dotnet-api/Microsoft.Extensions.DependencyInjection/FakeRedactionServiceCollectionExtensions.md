---
title: "FakeRedactionServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/FakeRedactionServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FakeRedactionServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class FakeRedactionServiceCollectionExtensions
```

Extensions that allow registering a fake redactor in the application.

To be added.

## FakeRedactionServiceCollectionExtensions.AddFakeRedaction(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddFakeRedaction (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Registers the fake redactor provider that always returns fake redactor instances.

Parameters:

- `services`: The container used to register fake redaction classes.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` is `null`.

To be added.

## FakeRedactionServiceCollectionExtensions.AddFakeRedaction(IServiceCollection, FakeRedactorOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddFakeRedaction (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Compliance.Testing.FakeRedactorOptions> configure);
```

Registers the fake redactor provider that always returns fake redactor instances.

Parameters:

- `services`: The container used to register fake redaction classes.
- `configure`: Configures fake redactor.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` or `configure` is `null`.

To be added.
