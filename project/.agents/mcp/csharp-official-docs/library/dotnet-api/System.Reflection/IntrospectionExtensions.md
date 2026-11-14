---
title: "IntrospectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/IntrospectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IntrospectionExtensions class

Namespace: `System.Reflection`

```csharp
public static class IntrospectionExtensions
```

Contains methods for converting `Type` objects.

To be added.

## IntrospectionExtensions.GetTypeInfo(Type) method

```csharp
public static System.Reflection.TypeInfo GetTypeInfo (this Type type);
```

Returns the `TypeInfo` representation of the specified type.

Parameters:

- `type`: The type to convert.

Returns: The converted object.

#### Remarks
Getting a `TypeInfo` object will always load the type.
