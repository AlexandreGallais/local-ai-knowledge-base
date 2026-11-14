---
title: "ServiceProviderOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ServiceProviderOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceProviderOptions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public class ServiceProviderOptions
```

Options for configuring various behaviors of the default `IServiceProvider` implementation.

To be added.

## ServiceProviderOptions.ServiceProviderOptions() constructor

```csharp
public ServiceProviderOptions ();
```

Initializes a new instance of the `ServiceProviderOptions` class.

To be added.

## ServiceProviderOptions.ValidateOnBuild property

```csharp
public bool ValidateOnBuild { get; set; }
```

Gets or sets a value that indicates whether validation is performed to ensure all services can be created when `ServiceCollectionContainerBuilderExtensions.BuildServiceProvider` is called.

Returns: `true` if validation is performed to ensure all services can be created during a `ServiceCollectionContainerBuilderExtensions.BuildServiceProvider` call; otherwise, `false`. The default is the value of `HostingEnvironmentExtensions.IsDevelopment`.

Open generics services aren't validated.

## ServiceProviderOptions.ValidateScopes property

```csharp
public bool ValidateScopes { get; set; }
```

Gets or sets a value that indicates whether validation is performed to ensure that scoped services are never resolved from the root provider.

Returns: `true` if validation is performed to ensure that scoped services aren't resolved from the root provider; otherwise, `false`. The default is the value of `HostingEnvironmentExtensions.IsDevelopment`.

To be added.
