---
title: "JsonUnmappedMemberHandling enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonUnmappedMemberHandling.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonUnmappedMemberHandling enum

Namespace: `System.Text.Json.Serialization`

```csharp
public enum JsonUnmappedMemberHandling
```

Determines how `JsonSerializer` handles JSON properties that cannot be mapped to a specific .NET member when deserializing object types.

To be added.

## JsonUnmappedMemberHandling.Disallow field

```csharp
Disallow
```

Throws an exception when an unmapped property is encountered.

## JsonUnmappedMemberHandling.Skip field

```csharp
Skip
```

Silently skips any unmapped properties. This is the default behavior.
