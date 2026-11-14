---
title: "DocumentExtractionClientBuilderServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/DocumentExtractionClientBuilderServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DocumentExtractionClientBuilderServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class DocumentExtractionClientBuilderServiceCollectionExtensions
```

Provides dependency-injection registration methods for extraction clients.

To be added.

## DocumentExtractionClientBuilderServiceCollectionExtensions.AddDocumentExtractionClient(IServiceCollection, DocumentExtractionClient, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.DocumentExtraction.DocumentExtractionClientBuilder AddDocumentExtractionClient (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.DocumentExtraction.DocumentExtractionClient innerClient, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a document extraction client and returns its middleware builder.

Parameters:

- `services`: To be added.
- `innerClient`: To be added.
- `lifetime`: To be added.

Returns: The middleware builder.

The supplied inner client can only be registered as a singleton. The container owns the
composed pipeline and disposes the inner client when the container is disposed.
Use the factory overload to create independent clients for scoped or transient lifetimes.

## DocumentExtractionClientBuilderServiceCollectionExtensions.AddDocumentExtractionClient(IServiceCollection, DocumentExtractionClient>, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.DocumentExtraction.DocumentExtractionClientBuilder AddDocumentExtractionClient (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<IServiceProvider,Microsoft.Extensions.DocumentExtraction.DocumentExtractionClient> innerClientFactory, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a document extraction client factory and returns its middleware builder.

Parameters:

- `services`: To be added.
- `innerClientFactory`: To be added.
- `lifetime`: To be added.

Returns: The middleware builder.

To be added.

## DocumentExtractionClientBuilderServiceCollectionExtensions.AddKeyedDocumentExtractionClient(IServiceCollection, Object, DocumentExtractionClient>, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.DocumentExtraction.DocumentExtractionClientBuilder AddKeyedDocumentExtractionClient (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey, Func<IServiceProvider,Microsoft.Extensions.DocumentExtraction.DocumentExtractionClient> innerClientFactory, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime.Singleton);
```

Registers a keyed document extraction client factory and returns its middleware builder.

Parameters:

- `services`: To be added.
- `serviceKey`: To be added.
- `innerClientFactory`: To be added.
- `lifetime`: To be added.

Returns: The middleware builder.

To be added.
