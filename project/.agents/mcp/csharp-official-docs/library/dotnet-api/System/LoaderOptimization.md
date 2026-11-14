---
title: "LoaderOptimization enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/LoaderOptimization.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoaderOptimization enum

Namespace: `System`

```csharp
public enum LoaderOptimization
```

An enumeration used with the `LoaderOptimizationAttribute` class to specify loader optimizations for an executable.

To be added.

## LoaderOptimization.DisallowBindings field

```csharp
DisallowBindings
```

Ignored by the common language runtime.

## LoaderOptimization.DomainMask field

```csharp
DomainMask
```

Do not use. This mask selects the domain-related values, screening out the unused `LoaderOptimization.DisallowBindings` flag.

## LoaderOptimization.MultiDomain field

```csharp
MultiDomain
```

Indicates that the application will probably have many domains that use the same code, and the loader must share maximal internal resources across application domains.

## LoaderOptimization.MultiDomainHost field

```csharp
MultiDomainHost
```

Indicates that the application will probably host unique code in multiple domains, and the loader must share resources across application domains only for globally available (strong-named) assemblies that have been added to the global assembly cache.

## LoaderOptimization.NotSpecified field

```csharp
NotSpecified
```

Indicates that no optimizations for sharing internal resources are specified. If the default domain or hosting interface specified an optimization, then the loader uses that; otherwise, the loader uses `LoaderOptimization.SingleDomain`.

## LoaderOptimization.SingleDomain field

```csharp
SingleDomain
```

Indicates that the application will probably have a single domain, and loader must not share internal resources across application domains.
