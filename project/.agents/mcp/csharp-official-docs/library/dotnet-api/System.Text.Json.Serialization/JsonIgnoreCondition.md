---
title: "JsonIgnoreCondition enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonIgnoreCondition.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonIgnoreCondition enum

Namespace: `System.Text.Json.Serialization`

```csharp
public enum JsonIgnoreCondition
```

Controls how the `JsonIgnoreAttribute` ignores properties on serialization and deserialization.

To be added.

## JsonIgnoreCondition.Always field

```csharp
Always
```

Property is always ignored.

To be added.

## JsonIgnoreCondition.Never field

```csharp
Never
```

Property is always serialized and deserialized, regardless of `JsonSerializerOptions.IgnoreNullValues` configuration.

To be added.

## JsonIgnoreCondition.WhenReading field

```csharp
WhenReading
```

Property is ignored during deserialization

## JsonIgnoreCondition.WhenWriting field

```csharp
WhenWriting
```

Property is ignored during serialization

## JsonIgnoreCondition.WhenWritingDefault field

```csharp
WhenWritingDefault
```

Property is ignored only if it equals the default value for its type.

To be added.

## JsonIgnoreCondition.WhenWritingNull field

```csharp
WhenWritingNull
```

Property is ignored if its value is `null`. This is applied only to nullable type properties and fields.

To be added.
