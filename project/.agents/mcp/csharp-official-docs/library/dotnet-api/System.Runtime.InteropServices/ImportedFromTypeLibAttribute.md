---
title: "ImportedFromTypeLibAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ImportedFromTypeLibAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImportedFromTypeLibAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class ImportedFromTypeLibAttribute : Attribute
```

Indicates that the types defined within an assembly were originally defined in a type library.

#### Remarks
You can apply this attribute to assemblies, although the Tlbimp.exe (Type Library Importer) typically applies it for you when it imports a type library.

The primary use of the attribute is to capture the original source of the type information. For example, you can import A.tlb as an interop assembly called A.dll and have assembly B.dll reference A.dll. When you export B.dll to B.tlb, this attribute causes the references in B.tlb that point to A.dll to point instead to A.tlb. This should not be confused with the `ComImportAttribute`, which specifies that an individual type is implemented in COM.

#### Examples

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/ComImportAttribute/Overview/codefile3.cs._

## ImportedFromTypeLibAttribute.ImportedFromTypeLibAttribute(String) constructor

```csharp
public ImportedFromTypeLibAttribute (string tlbFile);
```

Initializes a new instance of the `ImportedFromTypeLibAttribute` class with the name of the original type library file.

Parameters:

- `tlbFile`: The location of the original type library file.

To be added.

## ImportedFromTypeLibAttribute.Value property

```csharp
public string Value { get; }
```

Gets the name of the original type library file.

Returns: The name of the original type library file.

To be added.
