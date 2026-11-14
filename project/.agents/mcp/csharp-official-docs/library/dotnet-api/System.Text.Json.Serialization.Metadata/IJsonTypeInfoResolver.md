---
title: "IJsonTypeInfoResolver interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization.Metadata/IJsonTypeInfoResolver.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IJsonTypeInfoResolver interface

Namespace: `System.Text.Json.Serialization.Metadata`

```csharp
public interface IJsonTypeInfoResolver
```

Used to resolve the JSON serialization contract for requested types.

To be added.

## IJsonTypeInfoResolver.GetTypeInfo(Type, JsonSerializerOptions) method

```csharp
public System.Text.Json.Serialization.Metadata.JsonTypeInfo? GetTypeInfo (Type type, System.Text.Json.JsonSerializerOptions options);
```

Resolves a `JsonTypeInfo` contract for the requested type and options.

Parameters:

- `type`: Type to be resolved.
- `options`: Configuration used when resolving the metadata.

Returns: A `JsonTypeInfo` instance matching the requested type, or `null` if no contract could be resolved.

To be added.
