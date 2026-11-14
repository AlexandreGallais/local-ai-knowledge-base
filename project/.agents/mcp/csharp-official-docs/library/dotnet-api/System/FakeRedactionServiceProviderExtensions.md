---
title: "FakeRedactionServiceProviderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/FakeRedactionServiceProviderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FakeRedactionServiceProviderExtensions class

Namespace: `System`

```csharp
public static class FakeRedactionServiceProviderExtensions
```

Extensions that allow registering a fake redactor in the application.

To be added.

## FakeRedactionServiceProviderExtensions.GetFakeRedactionCollector(IServiceProvider) method

```csharp
public static Microsoft.Extensions.Compliance.Testing.FakeRedactionCollector GetFakeRedactionCollector (this IServiceProvider serviceProvider);
```

Gets the fake redactor collector instance from the dependency injection container.

Parameters:

- `serviceProvider`: The container used to obtain the collector instance.

Returns: The obtained collector.

Exceptions:

- `InvalidOperationException`: The collector is not in the container.
- `ArgumentNullException`: `serviceProvider` is `null`.

`FakeRedactionCollector` should be registered and used only with fake redaction implementation.
