---
title: "KubernetesResourceQuotaServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/KubernetesResourceQuotaServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# KubernetesResourceQuotaServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class KubernetesResourceQuotaServiceCollectionExtensions
```

Lets you configure and register Kubernetes resource monitoring components.

To be added.

## KubernetesResourceQuotaServiceCollectionExtensions.AddKubernetesResourceMonitoring(IServiceCollection, String) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddKubernetesResourceMonitoring (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, string? environmentVariablePrefix = default);
```

Configures and adds an Kubernetes resource monitoring components to a service collection altogether with necessary basic <example-value> monitoring components.

Parameters:

- `services`: The dependency injection container to add the Kubernetes resource monitoring to.
- `environmentVariablePrefix`: Optional value of prefix used to read environment variables in the container.

Returns: The value of `services`.

If you have configured your Kubernetes container with Downward API to add environment variable `MYCLUSTER_LIMITS_CPU` with CPU limits,
then you should pass `MYCLUSTER_` to `environmentVariablePrefix` parameter. Environment variables will be read during DI Container resolution.

Important: Do not call `ResourceMonitoringServiceCollectionExtensions.AddResourceMonitoring`
if you are using this method, as it already includes all necessary resource monitoring components and registers a Kubernetes-specific
`ResourceQuotaProvider` implementation. Calling both methods may result in conflicting service registrations.
