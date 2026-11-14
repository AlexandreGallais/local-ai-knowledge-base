---
title: "JsonObjectCreationHandling enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonObjectCreationHandling.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonObjectCreationHandling enum

Namespace: `System.Text.Json.Serialization`

```csharp
public enum JsonObjectCreationHandling
```

Determines how deserialization will handle object creation for fields or properties.

To be added.

## JsonObjectCreationHandling.Populate field

```csharp
Populate
```

Attempt to populate any instances already found on a deserialized field or property.

## JsonObjectCreationHandling.Replace field

```csharp
Replace
```

A new instance will always be created when deserializing a field or property.
