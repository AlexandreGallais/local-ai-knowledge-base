---
title: "TypeLibImportClassAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/TypeLibImportClassAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeLibImportClassAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class TypeLibImportClassAttribute : Attribute
```

Specifies which `Type` exclusively uses an interface. This class cannot be inherited.

#### Remarks
Apply the `TypeLibImportClassAttribute` attribute to a managed interface to specify which `Type` object exclusively uses the interface.  This attribute allows COM interoperation to map the interface back to the original type when converting the interface from metadata to a type library and back again.

## TypeLibImportClassAttribute.TypeLibImportClassAttribute(Type) constructor

```csharp
public TypeLibImportClassAttribute (Type importClass);
```

Initializes a new instance of the `TypeLibImportClassAttribute` class specifying the `Type` that exclusively uses an interface.

Parameters:

- `importClass`: The `Type` object that exclusively uses an interface.

#### Remarks
Apply the `TypeLibImportClassAttribute` attribute to a managed interface to specify the `Type` object that exclusively uses the interface.

## TypeLibImportClassAttribute.Value property

```csharp
public string Value { get; }
```

Gets the name of a `Type` object that exclusively uses an interface.

Returns: The name of a `Type` object that exclusively uses an interface.

#### Remarks
Apply the `TypeLibImportClassAttribute` attribute to a managed interface to specify the type that exclusively uses an interface.
