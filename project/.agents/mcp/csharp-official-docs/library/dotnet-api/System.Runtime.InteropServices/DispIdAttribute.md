---
title: "DispIdAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/DispIdAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DispIdAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class DispIdAttribute : Attribute
```

Specifies the COM dispatch identifier (DISPID) of a method, field, or property.

#### Remarks
You can apply this attribute to methods, fields, or properties.

This attribute contains the DISPID for the method, field, or property it describes. Unique DISPIDs are typically assigned by the common language runtime, but you can use this attribute to assign a specific DISPID to a method. When importing a type library, this attribute is applied to all methods with assigned DISPIDs. This ensures that any managed implementation of the same method retains the same DISPID if exposed to COM.

#### Examples
The following example demonstrates how explicit DISPIDs can be assigned to members of a class.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/DispIdAttribute/Overview/source.cs._

## DispIdAttribute.DispIdAttribute(Int32) constructor

```csharp
public DispIdAttribute (int dispId);
```

Initializes a new instance of the `DispIdAttribute` class with the specified DISPID.

Parameters:

- `dispId`: The DISPID for the member.

To be added.

## DispIdAttribute.Value property

```csharp
public int Value { get; }
```

Gets the DISPID for the member.

Returns: The DISPID for the member.

To be added.
