---
title: "ServiceKeyLookupMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ServiceKeyLookupMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceKeyLookupMode enum

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public enum ServiceKeyLookupMode
```

Specifies how to look up the service key for a parameter.

To be added.

## ServiceKeyLookupMode.ExplicitKey field

```csharp
ExplicitKey
```

The key is explicitly specified.

## ServiceKeyLookupMode.InheritKey field

```csharp
InheritKey
```

The key is inherited from the parent service.

## ServiceKeyLookupMode.NullKey field

```csharp
NullKey
```

A `null` key <example-value> that the parameter should be resolved from unkeyed services.
This is useful for DI implementations that require an explicit way to declare that the parameter should be resolved from unkeyed services.
