---
title: "LCIDConversionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/LCIDConversionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LCIDConversionAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class LCIDConversionAttribute : Attribute
```

Indicates that a method's unmanaged signature expects a locale identifier (LCID) parameter.

#### Remarks
You can apply this attribute to methods.

This attribute indicates that the marshaler should expect an LCID to be passed after the designated method argument. When calls are made from managed to unmanaged code, the marshaler supplies the LCID argument automatically.

#### Examples
The following example demonstrates different signature translations based on different values supplied to `LCIDConversionAttribute`.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/LCIDConversionAttribute/Overview/lcidattrsample.cs._

## LCIDConversionAttribute.LCIDConversionAttribute(Int32) constructor

```csharp
public LCIDConversionAttribute (int lcid);
```

Initializes a new instance of the `LCIDConversionAttribute` class with the position of the LCID in the unmanaged signature.

Parameters:

- `lcid`: Indicates the position of the LCID argument in the unmanaged signature, where 0 is the first argument.

To be added.

## LCIDConversionAttribute.Value property

```csharp
public int Value { get; }
```

Gets the position of the LCID argument in the unmanaged signature.

Returns: The position of the LCID argument in the unmanaged signature, where 0 is the first argument.

To be added.
