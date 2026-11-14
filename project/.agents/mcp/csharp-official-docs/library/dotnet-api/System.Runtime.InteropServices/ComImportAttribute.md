---
title: "ComImportAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ComImportAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComImportAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class ComImportAttribute : Attribute
```

Indicates that the attributed type was previously defined in COM.

#### Remarks
You can apply this attribute to classes or interfaces, although the Tlbimp.exe (Type Library Importer) typically applies it for you when it imports a type library.

`ComImportAttribute` is a pseudo-custom attribute that indicates that a type has been defined in a previously published type library. The common language runtime treats these types differently when activating, exporting, coercing, and so on.

> **Note:**
>  All base COM types that are inherited by a managed object must aggregate the Free Threaded Marshaler (FTM).  COM types that do not aggregate the FTM can't be inherited by managed objects.

#### Examples
The following example demonstrates how to apply the `ComImportAttribute` to a managed interface declaration. You apply this attribute only when generating an interop assembly manually in source code, and want to simulate the metadata produced by Tlbimp.exe.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/ComImportAttribute/Overview/codefile2.cs._

## ComImportAttribute.ComImportAttribute() constructor

```csharp
public ComImportAttribute ();
```

Initializes a new instance of the `ComImportAttribute`.

To be added.
