---
title: "KubernetesProbesExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/KubernetesProbesExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# KubernetesProbesExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class KubernetesProbesExtensions
```

Extensions for setting up probes for Kubernetes.

To be added.

## KubernetesProbesExtensions.AddKubernetesProbes(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddKubernetesProbes (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Registers liveness, startup and readiness probes using the default options.

Parameters:

- `services`: The dependency injection container to add the probe to.

Returns: The value of `services`.

To be added.

## KubernetesProbesExtensions.AddKubernetesProbes(IServiceCollection, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddKubernetesProbes (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Registers liveness, startup and readiness probes using the configured options.

Parameters:

- `services`: The dependency injection container to add the probe to.
- `section`: Configuration for `KubernetesProbesOptions`.

Returns: The value of `services`.

To be added.

## KubernetesProbesExtensions.AddKubernetesProbes(IServiceCollection, KubernetesProbesOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddKubernetesProbes (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Diagnostics.Probes.KubernetesProbesOptions> configure);
```

Registers liveness, startup and readiness probes using the configured options.

Parameters:

- `services`: The dependency injection container to add the probe to.
- `configure`: Configure action for `KubernetesProbesOptions`.

Returns: The value of `services`.

To be added.
