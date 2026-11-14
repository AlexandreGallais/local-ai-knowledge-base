---
title: "JsonKnownReferenceHandler enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonKnownReferenceHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonKnownReferenceHandler enum

Namespace: `System.Text.Json.Serialization`

```csharp
public enum JsonKnownReferenceHandler
```

The `ReferenceHandler` to be used at run time.

To be added.

## JsonKnownReferenceHandler.IgnoreCycles field

```csharp
IgnoreCycles
```

Specifies that the built-in `ReferenceHandler.IgnoreCycles` be used to ignore cyclic references.

## JsonKnownReferenceHandler.Preserve field

```csharp
Preserve
```

Specifies that the built-in `ReferenceHandler.Preserve` be used to handle references.

## JsonKnownReferenceHandler.Unspecified field

```csharp
Unspecified
```

Specifies that circular references should throw exceptions.
