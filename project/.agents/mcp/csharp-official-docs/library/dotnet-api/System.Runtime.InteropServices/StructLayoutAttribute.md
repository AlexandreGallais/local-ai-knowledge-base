---
title: "StructLayoutAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/StructLayoutAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StructLayoutAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class StructLayoutAttribute : Attribute
```

Lets you control the physical layout of the data fields of a class or structure in memory.

#### Remarks
You can apply this attribute to classes or structures.

The common language runtime controls the physical layout of the data fields of a class or structure in managed memory. However, if you want to pass the type to unmanaged code, you can use the `StructLayoutAttribute` attribute to control the unmanaged layout of the type. Use the attribute with `Sequential` to force the members to be laid out sequentially in the order they appear. For blittable types, `Sequential` controls both the layout in managed memory and the layout in unmanaged memory. For non-blittable types, it controls the layout when the class or structure is marshaled to unmanaged code, but does not control the layout in managed memory. Use the attribute with `Explicit` to control the precise position of each data member. This affects both managed and unmanaged layout, for both blittable and non-blittable types. Using `Explicit` requires that you use the `FieldOffsetAttribute` attribute to indicate the position of each field within the type.

C#, Visual Basic, and C++ compilers apply the `Sequential` layout value to structures by default. For classes, you must apply the `Sequential` value explicitly. Tlbimp.exe (Type Library Importer) also applies the `StructLayoutAttribute` attribute; it always applies the `Sequential` value when it imports a type library.

#### Examples
The following example demonstrates a managed declaration of the `GetSystemTime` function and defines `MySystemTime` class with `Explicit` layout. `GetSystemTime` gets the system time and prints to the console.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/StructLayoutAttribute/Overview/structlayoutattribute.cs._

## StructLayoutAttribute.StructLayoutAttribute(Int16) constructor

```csharp
public StructLayoutAttribute (short layoutKind);
```

Initializes a new instance of the `StructLayoutAttribute` class with the specified `LayoutKind` enumeration member.

Parameters:

- `layoutKind`: A 16-bit integer that represents one of the `LayoutKind` values that specifies how the class or structure should be arranged.

#### Remarks
This constructor takes an underlying 16-bit integer that represents each `LayoutKind` enumeration member. Tlbimp.exe (Type Library Importer) uses this constructor.

## StructLayoutAttribute.StructLayoutAttribute(LayoutKind) constructor

```csharp
public StructLayoutAttribute (System.Runtime.InteropServices.LayoutKind layoutKind);
```

Initializes a new instance of the `StructLayoutAttribute` class with the specified `LayoutKind` enumeration member.

Parameters:

- `layoutKind`: One of the enumeration values that specifies how the class or structure should be arranged.

For readable code that's less prone to error, always use this constructor.

## StructLayoutAttribute.Value property

```csharp
public System.Runtime.InteropServices.LayoutKind Value { get; }
```

Gets the `LayoutKind` value that specifies how the class or structure is arranged.

Returns: One of the enumeration values that specifies how the class or structure is arranged.

To be added.

## StructLayoutAttribute.CharSet field

```csharp
public System.Runtime.InteropServices.CharSet CharSet;
```

Indicates whether string data fields within the class should be marshaled as `LPWSTR` or `LPSTR` by default.

#### Remarks

If the `CharSet` field is set to `Unicode` or `Auto`, all string arguments are converted to Unicode characters (`LPWSTR`) before they're passed to the unmanaged implementation. If the field is set to `Ansi`, the strings are converted to ANSI strings (`LPSTR`).

## StructLayoutAttribute.Pack field

```csharp
public int Pack;
```

Controls the alignment of data fields of a class or structure in memory.

#### Remarks

The `Pack` field controls the alignment of a type's fields in memory. It affects the `Sequential` property. The value indicates the default packing size for the current platform. The value of `Pack` must be 0, 1, 2, 4, 8, 16, 32, 64, or 128. The default value is 0.

The fields of a type instance are aligned by using the following rules:

- The alignment of a type is the size of its largest element (for example, 1, 2, 4, or 8 bytes) or the specified packing size, whichever is smaller.
- Each field must align with fields of its own size or the alignment of the type, whichever is smaller. Because the default alignment of the type is the size of its largest element, which is greater than or equal to all other field lengths, this usually means that fields are aligned by their size. For example, even if the largest field in a type is a 64-bit (8-byte) integer or the Pack field is set to 8, `Byte` fields align on 1-byte boundaries, `Int16` fields align on 2-byte boundaries, and `Int32` fields align on 4-byte boundaries.
- Padding is added between fields to satisfy the alignment requirements.

For example, consider the following structure, which consists of two `Byte` fields and one `Int32` field, when it's used with various values for the `Pack` field.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/StructLayoutAttribute/Pack/packex0.cs._
> **Important:**
> To successfully compile the C# examples, you must specify the `/unsafe` compiler switch.

If you specify the default packing size, the size of the structure is 8 bytes. The two bytes occupy the first two bytes of memory, because bytes must align on one-byte boundaries. Because the default alignment of the type is 4 bytes, which is the size of its largest fields, `i3`, there are two bytes of padding followed by the integer field.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/StructLayoutAttribute/Pack/packex1.cs._
If `Pack` is set to 2, the size of the structure is 6 bytes. As before, the two bytes occupy the first two bytes of memory. Because fields now align on 2-byte boundaries, there's no padding between the second byte and the integer.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/StructLayoutAttribute/Pack/packex2.cs._
If `Pack` is set to 4, the size of the structure is the same as in the default case, where the type's alignment was defined by the size of its largest field, `i3`, which is 4.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/StructLayoutAttribute/Pack/packex3.cs._
If `Pack` is set to 8, the size of the structure is the still same as in the default case, because the `i3` field aligns on a 4-byte boundary, which is smaller than the 8-byte boundary specified by the Pack field.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/StructLayoutAttribute/Pack/packex4.cs._
To take another example, consider the following structure, which consists of two byte fields, one 32-bit signed integer field, one single-element byte array, and a decimal value. With the default packing size, the size of the structure is 32 bytes. The two bytes occupy the first two bytes of memory, followed by two bytes of padding, followed by the integer. Next is the one-byte array, followed by three bytes of padding. Because a decimal value consists of several fields, the alignment is based on the largest of its fields rather than the size of the `Decimal` structure as a whole. The `Decimal` structure consists of two `Int32` fields and one 8-byte field, so the `Decimal` field, d5, aligns on an 8-byte boundary.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/StructLayoutAttribute/Pack/packex5.cs._
If `Pack` is set to 2, the size of the structure is 24 bytes. In comparison with the default alignment, the two bytes of padding between the two bytes and the integer have been removed because the type's alignment is now 4 rather than 2. And the three bytes of padding after `a4` have been replaced by one byte of padding, since `d5` now aligns on a 2-byte boundary rather than a 4-byte boundary.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/StructLayoutAttribute/Pack/packex6.cs._
If `Pack` is set to 16, the size of the structure is the same as in the default case, because all the alignment requirements in this structure are less than 16.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/StructLayoutAttribute/Pack/packex7.cs._
The `Pack` field is frequently used when structures are exported during disk and network write operations. The field is also frequently used during platform invoke and interop operations.

Occasionally, the field is used to reduce memory requirements by producing a tighter packing size. However, this usage requires careful consideration of actual hardware constraints, and may actually degrade performance.

## StructLayoutAttribute.Size field

```csharp
public int Size;
```

Indicates the absolute size of the class or structure.

#### Remarks
This field must be equal or greater than the total size, in bytes, of the members of the class or structure. This field is primarily for compiler writers who want to extend the memory occupied by a structure for direct, unmanaged access. For example, you can use this field when working with unions that aren't represented directly in metadata.
