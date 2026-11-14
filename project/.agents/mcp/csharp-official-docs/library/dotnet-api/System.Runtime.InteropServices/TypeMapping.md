---
title: "TypeMapping class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/TypeMapping.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeMapping class

Namespace: `System.Runtime.InteropServices`

```csharp
public static class TypeMapping
```

Represents an entry type for interop type-mapping logic.

To be added.

## TypeMapping.GetOrCreateExternalTypeMapping<TTypeMapGroup>() method

```csharp
public static System.Collections.Generic.IReadOnlyDictionary<string,Type> GetOrCreateExternalTypeMapping<TTypeMapGroup> ();
```

Returns the external type map generated for the current application.

Parameters:

- `TTypeMapGroup`: The type of the type map group.

Returns: The requested type map.

Call sites are treated as an intrinsic by the trimmer and are implemented inline.

## TypeMapping.GetOrCreateProxyTypeMapping<TTypeMapGroup>() method

```csharp
public static System.Collections.Generic.IReadOnlyDictionary<Type,Type> GetOrCreateProxyTypeMapping<TTypeMapGroup> ();
```

Returns the associated type map generated for the current application.

Parameters:

- `TTypeMapGroup`: The type of the type map group.

Returns: The requested type map.

Call sites are treated as an intrinsic by the trimmer and are implemented inline.
