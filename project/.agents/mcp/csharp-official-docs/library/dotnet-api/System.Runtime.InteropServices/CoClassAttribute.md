---
title: "CoClassAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/CoClassAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CoClassAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class CoClassAttribute : Attribute
```

Specifies the class identifier of a coclass imported from a type library.

#### Remarks
You can apply this attribute to coclass interfaces, although the Tlbimp.exe (Type Library Importer) typically applies it for you when it imports a type library.

When Tlbimp.exe imports a coclass, it produces a managed class and an interface to represent the coclass. The coclass interface has the same interface identifier (IID) as the default interface of the original coclass. The imported coclass interface also retains the name of the coclass. Tlbimp.exe appends the original coclass name with "class" to identify the imported class.

You rarely apply this attribute. However, if you plan to write source code that produces metadata that closely simulates metadata produced by Tlbimp.exe, you should create a coclass interface for each coclass. Use the name of the original coclass to name the coclass interface and derive it from the default interface. In addition to the `CoClassAttribute`, you must also apply the `ComImportAttribute` and `GuidAttribute` attributes to the coclass interface.

## CoClassAttribute.CoClassAttribute(Type) constructor

```csharp
public CoClassAttribute (Type coClass);
```

Initializes new instance of the `CoClassAttribute` with the class identifier of the original coclass.

Parameters:

- `coClass`: A `Type` that contains the class identifier of the original coclass.

To be added.

## CoClassAttribute.CoClass property

```csharp
public Type CoClass { get; }
```

Gets the class identifier of the original coclass.

Returns: A `Type` containing the class identifier of the original coclass.

To be added.
