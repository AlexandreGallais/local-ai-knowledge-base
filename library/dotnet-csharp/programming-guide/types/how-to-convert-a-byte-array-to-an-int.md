---
title: "How to convert a byte array to an int (part 1 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/types/how-to-convert-a-byte-array-to-an-int.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
