---
title: "Buffer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Buffer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Buffer class

Namespace: `System`

```csharp
public static class Buffer
```

Manipulates arrays of primitive types.

#### Remarks
`Buffer` only affects arrays of primitive types; this class does not apply to objects. Each primitive type is treated as a series of bytes without regard to any behavior or limitation associated with the primitive type.

`Buffer` provides methods to copy bytes from one array of primitive types to another array of primitive types, get a byte from an array, set a byte in an array, and obtain the length of an array. This class provides better performance for manipulating primitive types than similar methods in the `Array` class.

`Buffer` is applicable to the following primitive types: `Boolean`, `Char`, `SByte`, `Byte`, `Int16`, `UInt16`, `Int32`, `UInt32`, `Int64`, `UInt64`, `IntPtr`, `UIntPtr`, `Single`, and `Double`.

#### Examples
The following code example illustrates the use of several `Buffer` class methods.

_Code sample not included: ~/snippets/csharp/System/Buffer/Overview/buffer.cs._

## Buffer.BlockCopy(Array, Int32, Array, Int32, Int32) method

```csharp
public static void BlockCopy (Array src, int srcOffset, Array dst, int dstOffset, int count);
```

Copies a specified number of bytes from a source array starting at a particular offset to a destination array starting at a particular offset.

Parameters:

- `src`: The source buffer.
- `srcOffset`: The zero-based byte offset into `src`.
- `dst`: The destination buffer.
- `dstOffset`: The zero-based byte offset into `dst`.
- `count`: The number of bytes to copy.

Exceptions:

- `ArgumentNullException`: `src` or `dst` is `null`.
- `ArgumentException`: `src` or `dst` is not an array of primitives.

-or-

The number of bytes in `src` is less than `srcOffset` plus `count`.

-or-

The number of bytes in `dst` is less than `dstOffset` plus `count`.
- `ArgumentOutOfRangeException`: `srcOffset`, `dstOffset`, or `count` is less than 0.

#### Remarks
This method copies `count` bytes from `src`, beginning at `srcOffset`, to `dst`, beginning at `dstOffset`. Both `srcOffset` and `dstOffset` are zero-based; that is, the first byte in each buffer is at position 0, not position 1.

The `Buffer.BlockCopy` method accesses the bytes in the `src` parameter array using offsets into memory, not programming constructs such as indexes or upper and lower array bounds. For example, if in the programming language of your application you declare an `Int32` array with a zero-based lower bound of -50, and then pass the array and an offset of 5 to the `Buffer.BlockCopy` method, the first array element the method will access is the second element of the array, which is at index -49. Furthermore, which byte of array element -49 is accessed first depends on the endianness of the computer that is executing your application.

As its name suggests, the `Buffer.BlockCopy` method copies a block of bytes as a whole, rather than copying one byte at a time. Therefore, if `src` and `dst` reference the same array, and the range from `srcOffset` + `count` -1 overlaps the range from `dstOffset` + `count` - 1, the values of the overlapping bytes are not overwritten before they are copied to the destination. In the following example, the values of bytes 0-16 in an array named `arr` are copied to bytes 12-28. Despite the overlapping range, the values of the source bytes are successfully copied.

_Code sample not included: ~/snippets/csharp/System/Buffer/Overview/overlap1.cs._

In the following example, the values of bytes 12-28 in an array named `arr` are copied to bytes 0-16. Again, despite the overlapping range, the values of the source bytes are successfully copied.

_Code sample not included: ~/snippets/csharp/System/Buffer/Overview/overlap1.cs._

#### Examples
The following example copies regions of arrays by using the `Buffer.BlockCopy` method. For each `Buffer.BlockCopy` operation, it lists the source and destination arrays as both an array of values and as a sequence of bytes. The example illustrates the importance of considering a system's endianness when working with the `Buffer.BlockCopy` method: Because Windows systems are little-endian, the lower-order bytes of a primitive data type's value precede the higher-order bytes.

_Code sample not included: ~/snippets/csharp/System/Buffer/Overview/bcopy.cs._

## Buffer.ByteLength(Array) method

```csharp
public static int ByteLength (Array array);
```

Returns the number of bytes in the specified array.

Parameters:

- `array`: An array.

Returns: The number of bytes in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentException`: `array` is not a primitive.
- `OverflowException`: `array` is larger than 2 gigabytes (GB).

#### Examples
The following code example illustrates the use of the `ByteLength` method to return the number of bytes in an array.

_Code sample not included: ~/snippets/csharp/System/Buffer/ByteLength/bytelength.cs._

## Buffer.GetByte(Array, Int32) method

```csharp
public static byte GetByte (Array array, int index);
```

Retrieves the byte at the specified location in the specified array.

Parameters:

- `array`: An array.
- `index`: A location in the array.

Returns: The byte at the specified location in the array.

Exceptions:

- `ArgumentException`: `array` is not a primitive.
- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is negative or greater than the length of `array`.
- `OverflowException`: `array` is larger than 2 gigabytes (GB).

#### Remarks
The `GetByte` method gets a particular byte out of the array. The array must be an array of primitives.

#### Examples
The following code example displays the byte values at specified locations within arrays using the `GetByte` method.

_Code sample not included: ~/snippets/csharp/System/Buffer/ByteLength/getbyte.cs._

## Buffer.MemoryCopy(Void*, Void*, Int64, Int64) method

```csharp
public static void MemoryCopy (void* source, void* destination, long destinationSizeInBytes, long sourceBytesToCopy);
```

Copies a number of bytes specified as a long integer value from one address in memory to another.

This API is not CLS-compliant.

Parameters:

- `source`: The address of the bytes to copy.
- `destination`: The target address.
- `destinationSizeInBytes`: The number of bytes available in the destination memory block.
- `sourceBytesToCopy`: The number of bytes to copy.

Exceptions:

- `ArgumentOutOfRangeException`: `sourceBytesToCopy` is greater than `destinationSizeInBytes`.

#### Remarks
This method copies `sourceBytesToCopy` bytes from the address specified by `source` to the address specified by `destination`. If some regions of the source area and the destination overlap, the function ensures that the original source bytes in the overlapping region are copied before being overwritten.

## Buffer.MemoryCopy(Void*, Void*, UInt64, UInt64) method

```csharp
public static void MemoryCopy (void* source, void* destination, ulong destinationSizeInBytes, ulong sourceBytesToCopy);
```

Copies a number of bytes specified as an unsigned long integer value from one address in memory to another.

This API is not CLS-compliant.

Parameters:

- `source`: The address of the bytes to copy.
- `destination`: The target address.
- `destinationSizeInBytes`: The number of bytes available in the destination memory block.
- `sourceBytesToCopy`: The number of bytes to copy.

Exceptions:

- `ArgumentOutOfRangeException`: `sourceBytesToCopy` is greater than `destinationSizeInBytes`.

#### Remarks
This method copies `sourceBytesToCopy` bytes from the address specified by `source` to the address specified by `destination`. If some regions of the source area and the destination overlap, the function ensures that the original source bytes in the overlapping region are copied before being overwritten.

## Buffer.SetByte(Array, Int32, Byte) method

```csharp
public static void SetByte (Array array, int index, byte value);
```

Assigns a specified value to a byte at a particular location in a specified array.

Parameters:

- `array`: An array.
- `index`: A location in the array.
- `value`: A value to assign.

Exceptions:

- `ArgumentException`: `array` is not a primitive.
- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is negative or greater than the length of `array`.
- `OverflowException`: `array` is larger than 2 gigabytes (GB).

#### Remarks
`array` must be an array of primitives.

#### Examples
The following code example assigns values to bytes at particular locations within arrays using the `SetByte` method.

_Code sample not included: ~/snippets/csharp/System/Buffer/ByteLength/setbyte.cs._
