---
title: "ImportContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/ImportContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImportContext class

Namespace: `System.Xml.Serialization`

```csharp
public class ImportContext
```

Describes the context in which a set of schema is bound to .NET code entities.

To be added.

## ImportContext.ImportContext(CodeIdentifiers, Boolean) constructor

```csharp
public ImportContext (System.Xml.Serialization.CodeIdentifiers? identifiers, bool shareTypes);
```

Initializes a new instance of the `ImportContext` class for the given code identifiers, with the given type-sharing option.

Parameters:

- `identifiers`: The code entities to which the context applies.
- `shareTypes`: A `Boolean` value that determines whether custom types are shared among schema.

To be added.

## ImportContext.ShareTypes property

```csharp
public bool ShareTypes { get; }
```

Gets a value that determines whether custom types are shared.

Returns: `true`, if custom types are shared among schema; otherwise, `false`.

To be added.

## ImportContext.TypeIdentifiers property

```csharp
public System.Xml.Serialization.CodeIdentifiers TypeIdentifiers { get; }
```

Gets a set of code entities to which the context applies.

Returns: A `CodeIdentifiers` that specifies the code entities to which the context applies.

To be added.

## ImportContext.Warnings property

```csharp
public System.Collections.Specialized.StringCollection Warnings { get; }
```

Gets a collection of warnings that are generated when importing the code entity descriptions.

Returns: A `StringCollection` that contains warnings that were generated when importing the code entity descriptions.

To be added.
