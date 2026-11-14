---
title: "UnmanagedMemoryAccessor class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/UnmanagedMemoryAccessor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnmanagedMemoryAccessor class

Namespace: `System.IO`

```csharp
public class UnmanagedMemoryAccessor : IDisposable
```

Provides random access to unmanaged blocks of memory from managed code.

#### Remarks
The `MemoryMappedFile.CreateViewAccessor` method of a `MemoryMappedFile` object returns the unmanaged blocks of memory for working with views of memory-mapped files.

## UnmanagedMemoryAccessor.UnmanagedMemoryAccessor() constructor

```csharp
protected UnmanagedMemoryAccessor ();
```

Initializes a new instance of the `UnmanagedMemoryAccessor` class.

To be added.

## UnmanagedMemoryAccessor.UnmanagedMemoryAccessor(SafeBuffer, Int64, Int64) constructor

```csharp
public UnmanagedMemoryAccessor (System.Runtime.InteropServices.SafeBuffer buffer, long offset, long capacity);
```

Initializes a new instance of the `UnmanagedMemoryAccessor` class with a specified buffer, offset, and capacity.

Parameters:

- `buffer`: The buffer to contain the accessor.
- `offset`: The byte at which to start the accessor.
- `capacity`: The size, in bytes, of memory to allocate.

Exceptions:

- `ArgumentException`: `offset` plus `capacity` is greater than `buffer`.
- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `capacity` is less than zero.
- `InvalidOperationException`: `offset` plus `capacity` would wrap around the high end of the address space.

To be added.

## UnmanagedMemoryAccessor.UnmanagedMemoryAccessor(SafeBuffer, Int64, Int64, FileAccess) constructor

```csharp
public UnmanagedMemoryAccessor (System.Runtime.InteropServices.SafeBuffer buffer, long offset, long capacity, System.IO.FileAccess access);
```

Initializes a new instance of the `UnmanagedMemoryAccessor` class with a specified buffer, offset, capacity, and access right.

Parameters:

- `buffer`: The buffer to contain the accessor.
- `offset`: The byte at which to start the accessor.
- `capacity`: The size, in bytes, of memory to allocate.
- `access`: The type of access allowed to the memory. The default is `MemoryMappedFileAccess.ReadWrite`.

Exceptions:

- `ArgumentException`: `offset` plus `capacity` is greater than `buffer`.
- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `capacity` is less than zero.

-or-

`access` is not a valid `MemoryMappedFileAccess` enumeration value.
- `InvalidOperationException`: `offset` plus `capacity` would wrap around the high end of the address space.

To be added.

## UnmanagedMemoryAccessor.CanRead property

```csharp
public bool CanRead { get; }
```

Determines whether the accessor is readable.

Returns: `true` if the accessor is readable; otherwise, `false`.

To be added.

## UnmanagedMemoryAccessor.CanWrite property

```csharp
public bool CanWrite { get; }
```

Determines whether the accessory is writable.

Returns: `true` if the accessor is writable; otherwise, `false`.

To be added.

## UnmanagedMemoryAccessor.Capacity property

```csharp
public long Capacity { get; }
```

Gets the capacity of the accessor.

Returns: The capacity of the accessor.

To be added.

## UnmanagedMemoryAccessor.IsOpen property

```csharp
protected bool IsOpen { get; }
```

Determines whether the accessor is currently open by a process.

Returns: `true` if the accessor is open; otherwise, `false`.

To be added.

## UnmanagedMemoryAccessor.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `UnmanagedMemoryAccessor`.

To be added.

## UnmanagedMemoryAccessor.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `UnmanagedMemoryAccessor` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is true, this method releases all resources held by any managed objects that this `UnmanagedMemoryAccessor` references. This method invokes the `Dispose()` method of each referenced object.

## UnmanagedMemoryAccessor.Initialize(SafeBuffer, Int64, Int64, FileAccess) method

```csharp
protected void Initialize (System.Runtime.InteropServices.SafeBuffer buffer, long offset, long capacity, System.IO.FileAccess access);
```

Sets the initial values for the accessor.

Parameters:

- `buffer`: The buffer to contain the accessor.
- `offset`: The byte at which to start the accessor.
- `capacity`: The size, in bytes, of memory to allocate.
- `access`: The type of access allowed to the memory. The default is `MemoryMappedFileAccess.ReadWrite`.

Exceptions:

- `ArgumentException`: `offset` plus `capacity` is greater than `buffer`.
- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `capacity` is less than zero.

-or-

`access` is not a valid `MemoryMappedFileAccess` enumeration value.
- `InvalidOperationException`: `offset` plus `capacity` would wrap around the high end of the address space.

#### Remarks
This method is called by the constructors for this class.

## UnmanagedMemoryAccessor.Read<T>(Int64, T) method

```csharp
public void Read<T> (long position, out T structure) where T : struct;
```

Reads a structure of type `T` from the accessor into a provided reference.

Parameters:

- `T`: The type of structure.
- `position`: The position in the accessor at which to begin reading.
- `structure`: The structure to contain the read data.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to read in a structure of type `T`.

-or-

`T` is a value type that contains one or more reference types.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support reading.
- `ObjectDisposedException`: The accessor has been disposed.

#### Remarks
Use this method to read medium to large structures that are not easily accommodated by the other read methods in this class.

## UnmanagedMemoryAccessor.ReadArray<T>(Int64, T[], Int32, Int32) method

```csharp
public int ReadArray<T> (long position, T[] array, int offset, int count) where T : struct;
```

Reads structures of type `T` from the accessor into an array of type `T`.

Parameters:

- `T`: The type of structure.
- `position`: The number of bytes in the accessor at which to begin reading.
- `array`: The array to contain the structures read from the accessor.
- `offset`: The index in `array` in which to place the first copied structure.
- `count`: The number of structures of type `T` to read from the accessor.

Returns: The number of structures read into `array`. This value can be less than `count` if there are fewer structures available, or zero if the end of the accessor is reached.

Exceptions:

- `ArgumentException`: `array` is not large enough to contain `count` of structures (starting from `position`).
- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support reading.
- `ObjectDisposedException`: The accessor has been disposed.

#### Remarks
This method is not safe.

## UnmanagedMemoryAccessor.ReadBoolean(Int64) method

```csharp
public bool ReadBoolean (long position);
```

Reads a Boolean value from the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin reading.

Returns: `true` or `false`.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to read a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support reading.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.ReadByte(Int64) method

```csharp
public byte ReadByte (long position);
```

Reads a byte value from the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin reading.

Returns: The value that was read.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to read a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support reading.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.ReadChar(Int64) method

```csharp
public char ReadChar (long position);
```

Reads a character from the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin reading.

Returns: The value that was read.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to read a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support reading.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.ReadDecimal(Int64) method

```csharp
public decimal ReadDecimal (long position);
```

Reads a decimal value from the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin reading.

Returns: The value that was read.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to read a value.

-or-

The decimal to read is invalid.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support reading.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.ReadDouble(Int64) method

```csharp
public double ReadDouble (long position);
```

Reads a double-precision floating-point value from the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin reading.

Returns: The value that was read.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to read a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support reading.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.ReadInt16(Int64) method

```csharp
public short ReadInt16 (long position);
```

Reads a 16-bit integer from the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin reading.

Returns: The value that was read.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to read a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support reading.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.ReadInt32(Int64) method

```csharp
public int ReadInt32 (long position);
```

Reads a 32-bit integer from the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin reading.

Returns: The value that was read.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to read a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support reading.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.ReadInt64(Int64) method

```csharp
public long ReadInt64 (long position);
```

Reads a 64-bit integer from the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin reading.

Returns: The value that was read.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to read a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support reading.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.ReadSByte(Int64) method

```csharp
public sbyte ReadSByte (long position);
```

Reads an 8-bit signed integer from the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin reading.

Returns: The value that was read.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to read a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support reading.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.ReadSingle(Int64) method

```csharp
public float ReadSingle (long position);
```

Reads a single-precision floating-point value from the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin reading.

Returns: The value that was read.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to read a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support reading.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.

## UnmanagedMemoryAccessor.ReadUInt16(Int64) method

```csharp
public ushort ReadUInt16 (long position);
```

Reads an unsigned 16-bit integer from the accessor.

Parameters:

- `position`: The number of bytes into the accessor at which to begin reading.

Returns: The value that was read.

Exceptions:

- `ArgumentException`: There are not enough bytes after `position` to read a value.
- `ArgumentOutOfRangeException`: `position` is less than zero or greater than the capacity of the accessor.
- `NotSupportedException`: The accessor does not support reading.
- `ObjectDisposedException`: The accessor has been disposed.

To be added.
