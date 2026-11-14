---
title: "SafeBuffer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/SafeBuffer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SafeBuffer class

Namespace: `System.Runtime.InteropServices`

```csharp
public abstract class SafeBuffer : Microsoft.Win32.SafeHandles.SafeHandleZeroOrMinusOneIsInvalid
```

Provides a controlled memory buffer that can be used for reading and writing. Attempts to access memory outside the controlled buffer (underruns and overruns) raise exceptions.

#### Remarks
You must call the `SafeBuffer.Initialize` method before you use any instance of `SafeBuffer`. To avoid races when you store an instance of a `SafeBuffer` object in a static variable, you should use one of the following approaches:

- Create a lock when publishing the `SafeBuffer`.

- Create a local variable, initialize the `SafeBuffer`, and then assign the `SafeBuffer` to the static variable, for example, by using the `Interlocked.CompareExchange` method.

> **Note:**
>  Assignments in a static class constructor are implicitly locked.

## SafeBuffer.SafeBuffer(Boolean) constructor

```csharp
protected SafeBuffer (bool ownsHandle);
```

Creates a new instance of the `SafeBuffer` class, and specifies whether the buffer handle is to be reliably released.

Parameters:

- `ownsHandle`: `true` to reliably release the handle during the finalization phase; `false` to prevent reliable release (not recommended).

To be added.

## SafeBuffer.ByteLength property

```csharp
public ulong ByteLength { get; }
```

Gets the size of the buffer, in bytes.

Returns: The number of bytes in the memory buffer.

Exceptions:

- `InvalidOperationException`: The `Initialize` method has not been called.

To be added.

## SafeBuffer.AcquirePointer(Byte*) method

```csharp
public void AcquirePointer (ref byte* pointer);
```

Obtains a pointer from a `SafeBuffer` object for a block of memory.

Parameters:

- `pointer`: A byte pointer, passed by reference, to receive the pointer from within the `SafeBuffer` object. You must set this pointer to `null` before you call this method.

Exceptions:

- `InvalidOperationException`: The `Initialize` method has not been called.

#### Remarks
When `SafeBuffer.AcquirePointer` returns, you should perform bounds checking by verifying that the `pointer` parameter is `null`. If it is not `null`, you must call the `SafeBuffer.ReleasePointer` method.

`SafeBuffer.AcquirePointer` calls the `SafeHandle.DangerousAddRef` method and exposes the pointer.

The following example demonstrates how to use the `SafeBuffer.AcquirePointer` method:

```csharp
byte* pointer = null;
try {
    MySafeBuffer.AcquirePointer(ref pointer);
    // Use pointer here, with your own bounds checking.
    }
finally {
    if (pointer != null)
        MySafeBuffer.ReleasePointer();
    }
```

If you cast `pointer` (which is a pointer to a byte) as a pointer to a different type (T*), you may have pointer alignment issues.

You must take responsibility for all bounds checking with this pointer.

## SafeBuffer.Initialize(UInt64) method

```csharp
public void Initialize (ulong numBytes);
```

Defines the allocation size of the memory region in bytes. You must call this method before you use the `SafeBuffer` instance.

Parameters:

- `numBytes`: The number of bytes in the buffer.

Exceptions:

- `ArgumentOutOfRangeException`: `numBytes` is less than zero.

-or-

`numBytes` is greater than the available address space.

To be added.

## SafeBuffer.Initialize(UInt32, UInt32) method

```csharp
public void Initialize (uint numElements, uint sizeOfEachElement);
```

Specifies the allocation size of the memory buffer by using the specified number of elements and element size. You must call this method before you use the `SafeBuffer` instance.

Parameters:

- `numElements`: The number of elements in the buffer.
- `sizeOfEachElement`: The size of each element in the buffer.

Exceptions:

- `ArgumentOutOfRangeException`: `numElements` is less than zero.

-or-

`sizeOfEachElement` is less than zero.

-or-

`numElements` multiplied by `sizeOfEachElement` is greater than the available address space.

#### Remarks
This method defines the required size of the memory region as the number of elements in an array multiplied by the size of each element.

## SafeBuffer.Initialize<T>(UInt32) method

```csharp
public void Initialize<T> (uint numElements) where T : struct;
```

Defines the allocation size of the memory region by specifying the number of value types. You must call this method before you use the `SafeBuffer` instance.

Parameters:

- `T`: The value type to allocate memory for.
- `numElements`: The number of elements of the value type to allocate memory for.

Exceptions:

- `ArgumentOutOfRangeException`: `numElements` is less than zero.

-or-

`numElements` multiplied by the size of each element is greater than the available address space.

To be added.

## SafeBuffer.Read<T>(UInt64) method

```csharp
public T Read<T> (ulong byteOffset) where T : struct;
```

Reads a value type from memory at the specified offset.

Parameters:

- `T`: The value type to read.
- `byteOffset`: The location from which to read the value type. You may have to consider alignment issues.

Returns: The value type that was read from memory.

Exceptions:

- `InvalidOperationException`: The `Initialize` method has not been called.

To be added.

## SafeBuffer.ReadArray<T>(UInt64, T[], Int32, Int32) method

```csharp
public void ReadArray<T> (ulong byteOffset, T[] array, int index, int count) where T : struct;
```

Reads the specified number of value types from memory starting at the offset, and writes them into an array starting at the index.

Parameters:

- `T`: The value type to read.
- `byteOffset`: The location from which to start reading.
- `array`: The output array to write to.
- `index`: The location in the output array to begin writing to.
- `count`: The number of value types to read from the input array and to write to the output array.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`count` is less than zero.
- `ArgumentNullException`: `array` is `null`.
- `ArgumentException`: The length of the array minus the index is less than `count`.
- `InvalidOperationException`: The `Initialize` method has not been called.

To be added.

## SafeBuffer.ReadSpan<T>(UInt64, Span<T>) method

```csharp
public void ReadSpan<T> (ulong byteOffset, Span<T> buffer) where T : struct;
```

Reads value types from memory starting at the offset, and writes them into a span. The number of value types that will be read is determined by the length of the span.

Parameters:

- `T`: The value type to read.
- `byteOffset`: The location from which to start reading.
- `buffer`: The output span to write to.

To be added.

## SafeBuffer.ReleasePointer() method

```csharp
public void ReleasePointer ();
```

Releases a pointer that was obtained by the `SafeBuffer.AcquirePointer` method.

Exceptions:

- `InvalidOperationException`: The `Initialize` method has not been called.

#### Remarks
After this method returns, the pointer cannot be used.

## SafeBuffer.Write<T>(UInt64, T) method

```csharp
public void Write<T> (ulong byteOffset, T value) where T : struct;
```

Writes a value type to memory at the given location.

Parameters:

- `T`: The value type to write.
- `byteOffset`: The location at which to start writing. You may have to consider alignment issues.
- `value`: The value to write.

Exceptions:

- `InvalidOperationException`: The `Initialize` method has not been called.

#### Remarks
This method is equivalent to the following code:

```
*(T*)(bytePtr + byteOffset) = value;
```

## SafeBuffer.WriteArray<T>(UInt64, T[], Int32, Int32) method

```csharp
public void WriteArray<T> (ulong byteOffset, T[] array, int index, int count) where T : struct;
```

Writes the specified number of value types to a memory location by reading bytes starting from the specified location in the input array.

Parameters:

- `T`: The value type to write.
- `byteOffset`: The location in memory to write to.
- `array`: The input array.
- `index`: The offset in the array to start reading from.
- `count`: The number of value types to write.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is less than zero.
- `ArgumentException`: The length of the input array minus `index` is less than `count`.
- `InvalidOperationException`: The `Initialize` method has not been called.

#### Remarks
Each element in the input array consists of the generic value type of the class.

## SafeBuffer.WriteSpan<T>(UInt64, ReadOnlySpan<T>) method

```csharp
public void WriteSpan<T> (ulong byteOffset, ReadOnlySpan<T> data) where T : struct;
```

Writes the value types from a read-only span to a memory location.

Parameters:

- `T`: The value type to write.
- `byteOffset`: The location in memory to write to.
- `data`: The input span.

To be added.
