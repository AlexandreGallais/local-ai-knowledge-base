---
title: "UnmanagedMemoryAccessor class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/UnmanagedMemoryAccessor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnmanagedMemoryAccessor class (part 2 of 2)

## UnmanagedMemoryAccessor.ReadUInt32(Int64) method

```csharp
public uint ReadUInt32 (long position);
```

Reads an unsigned 32-bit integer from the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin reading.

Returns: The value that was read.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to read a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support reading.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.ReadUInt64(Int64) method

```csharp
public ulong ReadUInt64 (long position);
```

Reads an unsigned 64-bit integer from the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin reading.

Returns: The value that was read.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to read a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support reading.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.Write(Int64, Boolean) method

```csharp
public void Write (long position, bool value);
```

Writes a Boolean value into the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin writing.
- `value`: The value to write.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to write a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support writing.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.Write(Int64, Byte) method

```csharp
public void Write (long position, byte value);
```

Writes a byte value into the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin writing.
- `value`: The value to write.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to write a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support writing.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.Write(Int64, Char) method

```csharp
public void Write (long position, char value);
```

Writes a character into the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin writing.
- `value`: The value to write.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to write a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support writing.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.Write(Int64, Decimal) method

```csharp
public void Write (long position, decimal value);
```

Writes a decimal value into the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin writing.
- `value`: The value to write.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to write a value.

-or-

The decimal is invalid.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support writing.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.Write(Int64, Double) method

```csharp
public void Write (long position, double value);
```

Writes a `Double` value into the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin writing.
- `value`: The value to write.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to write a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support writing.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.Write(Int64, Int16) method

```csharp
public void Write (long position, short value);
```

Writes a 16-bit integer into the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin writing.
- `value`: The value to write.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to write a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support writing.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.Write(Int64, Int32) method

```csharp
public void Write (long position, int value);
```

Writes a 32-bit integer into the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin writing.
- `value`: The value to write.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to write a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support writing.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.Write(Int64, Int64) method

```csharp
public void Write (long position, long value);
```

Writes a 64-bit integer into the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin writing.
- `value`: The value to write.

Exceptions:

- `ArgumentException`: There are not enough bytes after position to write a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support writing.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.Write(Int64, SByte) method

```csharp
public void Write (long position, sbyte value);
```

Writes an 8-bit integer into the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin writing.
- `value`: The value to write.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to write a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support writing.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.Write(Int64, Single) method

```csharp
public void Write (long position, float value);
```

Writes a `Single` into the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin writing.
- `value`: The value to write.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to write a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support writing.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.Write(Int64, UInt16) method

```csharp
public void Write (long position, ushort value);
```

Writes an unsigned 16-bit integer into the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin writing.
- `value`: The value to write.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to write a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support writing.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.Write(Int64, UInt32) method

```csharp
public void Write (long position, uint value);
```

Writes an unsigned 32-bit integer into the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin writing.
- `value`: The value to write.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to write a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support writing.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.Write(Int64, UInt64) method

```csharp
public void Write (long position, ulong value);
```

Writes an unsigned 64-bit integer into the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin writing.
- `value`: The value to write.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to write a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support writing.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.Write<T>(Int64, T) method

```csharp
public void Write<T> (long position, ref T structure) where T : struct;
```

Writes a structure into the accessor.

Parameters:

- `T`: The type of structure.
- `position`: The number of bytes into the accessor at which to begin writing.
- `structure`: The structure to write.

Exceptions:

- `ArgumentException`: There are not enough bytes in the accessor after `position` to write a structure of type `T`.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support writing.
- `ObjectDisposedException`: The accessor has been disposed.

#### Remarks
Use this method to write medium to large structures that are not easily accommodated by the other `UnmanagedMemoryAccessor.Write` methods in this class.

## UnmanagedMemoryAccessor.WriteArray<T>(Int64, T[], Int32, Int32) method

```csharp
public void WriteArray<T> (long position, T[] array, int offset, int count) where T : struct;
```

Writes structures from an array of type `T` into the accessor.

Parameters:

- `T`: The type of structure.
- `position`: The number of bytes into the accessor at which to begin writing.
- `array`: The array to write into the accessor.
- `offset`: The index in `array` to start writing from.
- `count`: The number of structures in `array` to write.

Exceptions:

- `ArgumentException`: There are not enough bytes in the accessor after `position` to write the number of structures specified by `count`.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.

-or-

`offset` or `count` is less than zero.
- `ArgumentNullException`: `array` is `null`.
- `NotSupportedException`: The accessor does not support writing.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.
