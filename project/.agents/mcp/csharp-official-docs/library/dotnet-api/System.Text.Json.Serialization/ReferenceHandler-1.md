---
title: "ReferenceHandler<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/ReferenceHandler`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReferenceHandler<T> class

Namespace: `System.Text.Json.Serialization`

```csharp
public sealed class ReferenceHandler<T> : System.Text.Json.Serialization.ReferenceHandler where T : ReferenceResolver, new()
```

Defines how the `JsonSerializer` deals with references on serialization and deserialization.

Parameters:

- `T`: The type of the `ReferenceResolver` to create on each serialization or deserialization call.

To be added.

## ReferenceHandler<T>.ReferenceHandler() constructor

```csharp
public ReferenceHandler ();
```

Initializes a new instance of the `ReferenceHandler<T>` generic class that can create a `ReferenceResolver` instance of the specified type.

To be added.

## ReferenceHandler<T>.CreateResolver() method

```csharp
public override System.Text.Json.Serialization.ReferenceResolver CreateResolver ();
```

Creates a new `ReferenceResolver` of type `T` used for each serialization call.

Returns: The new resolver to use for serialization and deserialization.

To be added.
