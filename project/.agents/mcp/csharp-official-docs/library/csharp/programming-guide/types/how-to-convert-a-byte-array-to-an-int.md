---
title: "How to convert a byte array to an int"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/types/how-to-convert-a-byte-array-to-an-int.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to convert a byte array to an int (C# Programming Guide)

This example shows you how to use the `System.BitConverter` class to convert an array of bytes to an int and back to an array of bytes. You may have to convert from bytes to a built-in data type after you read bytes off the network, for example. In addition to the ToInt32(Byte\[\], Int32)) method in the example, the following table lists methods in the `System.BitConverter` class that convert bytes (from an array of bytes) to other built-in types.

|Type returned|Method|
|-------------------|------------|
|`bool`|ToBoolean(Byte\[\], Int32))|
|`char`|ToChar(Byte\[\], Int32))|
|`double`|ToDouble(Byte\[\], Int32))|
|`short`|ToInt16(Byte\[\], Int32))|
|`int`|ToInt32(Byte\[\], Int32))|
|`long`|ToInt64(Byte\[\], Int32))|
|`float`|ToSingle(Byte\[\], Int32))|
|`ushort`|ToUInt16(Byte\[\], Int32))|
|`uint`|ToUInt32(Byte\[\], Int32))|
|`ulong`|ToUInt64(Byte\[\], Int32))|

## Examples

This example initializes an array of bytes, reverses the array if the computer architecture is little-endian (that is, the least significant byte is stored first), and then calls the ToInt32(Byte\[\], Int32)) method to convert four bytes in the array to an `int`. The second argument to ToInt32(Byte\[\], Int32)) specifies the start index of the array of bytes.

> **Note:**
> The output may differ depending on the endianness of your computer's architecture.

_Code sample not included: ~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs._

In this example, the `System.BitConverter.GetBytes(System.Int32)` method of the `System.BitConverter` class is called to convert an `int` to an array of bytes.

> **Note:**
> The output may differ depending on the endianness of your computer's architecture.

_Code sample not included: ~/samples/snippets/csharp/VS_Snippets_VBCSharp/CsProgGuideTypes/CS/Class1.cs._

## See also

- `System.BitConverter`
- `System.BitConverter.IsLittleEndian`
- Types
