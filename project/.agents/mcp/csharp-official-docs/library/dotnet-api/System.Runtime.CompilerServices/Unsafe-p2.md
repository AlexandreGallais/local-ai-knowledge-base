---
title: "Unsafe class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/Unsafe.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Unsafe class (part 2 of 4)

## Unsafe.AsRef<T>(T) method

```csharp
public static ref T AsRef<T> (scoped ref readonly T source) where T : allows ref struct;
```

Reinterprets the given read-only reference as a mutable reference.

Parameters:

- `T`: The underlying type of the reference.
- `source`: The read-only reference to reinterpret.

Returns: A mutable reference to a value of type `T`.

#### Remarks

This API is conceptually similar to C++'s `const_cast<>`. It is the caller's responsibility to ensure that no data is written to the referenced location. The runtime contains internal logic predicated on the assumption that readonly references truly are immutable, and callers who violate this invariant may trigger undefined behavior within the runtime.

`AsRef` is typically used for passing a readonly reference into methods like `Unsafe.Add`, which accept mutable managed pointers as arguments. Consider the following example.

```csharp
int ComputeSumOfElements(ref int refToFirstElement, nint numElements)
{
  int sum = 0;
  for (nint i = 0; i < numElements; i++)
  {
    sum += Unsafe.Add(ref refToFirstElement, i);
  }
}
```

If the input parameter is `ref readonly int refToFirstElement` instead of `ref int refToFirstElement`, the previous example will not compile, since readonly references cannot be used as arguments to `Add`. Instead, `AsRef` can be used to remove the immutability constraint and allow compilation to succeed, as shown in the following example.

```csharp
int ComputeSumOfElements(ref readonly int refToFirstElement, nint numElements)
{
  int sum = 0;
  for (nint i = 0; i < numElements; i++)
  {
    sum += Unsafe.Add(ref Unsafe.AsRef(ref refToFirstElement), i);
  }
}
```

## Unsafe.BitCast<TFrom,TTo>(TFrom) method

```csharp
public static TTo BitCast<TFrom,TTo> (TFrom source) where TFrom : allows ref struct where TTo : allows ref struct;
```

Reinterprets the given value of type `TFrom` as a value of type `TTo`.

Parameters:

- `TFrom`: The type of the value to reinterpret.
- `TTo`: The type to reinterpret the value as.
- `source`: The value to reinterpret.

Returns: A value of type `TTo`.

Exceptions:

- `NotSupportedException`: The size of `TFrom` and `TTo` are not the same.

To be added.

## Unsafe.ByteOffset<T>(T, T) method

```csharp
public static IntPtr ByteOffset<T> (ref readonly T origin, ref readonly T target) where T : allows ref struct;
```

Determines the byte offset from origin to target from the given managed pointers.

Parameters:

- `T`: The elemental type of the managed pointers.
- `origin`: The managed pointer to the origin.
- `target`: The managed pointer to the target.

Returns: The byte offset from origin to target, that is, `target` - `origin`.

#### Remarks

The return value of this method is a moment-in-time result. If `origin` and `target` each reference different objects in GC-managed address space, the GC could relocate items between calls, causing the result of this method to change.

The return value is guaranteed stable if `origin` and `target` point to the same managed object.

## Unsafe.Copy<T>(Void*, T) method

```csharp
public static void Copy<T> (void* destination, ref readonly T source) where T : allows ref struct;
```

Copies a value of type `T` to the given location.

Parameters:

- `T`: The type of value to copy.
- `destination`: The location to copy to.
- `source`: A reference to the value to copy.

#### Remarks

Both `destination` and `source` are assumed to be properly aligned for pointers to data of type `T`. For more information on alignment assumptions, see ECMA-335, Sec. I.12.6.2 ("Alignment").

This method is roughly equivalent to the following code.

```csharp
static void Copy<T>(void* destination, ref T source)
{
  T data = source; // dereference source
  *(T*)destination = data;
}
```

## Unsafe.Copy<T>(T, Void*) method

```csharp
public static void Copy<T> (ref T destination, void* source) where T : allows ref struct;
```

Copies a value of type `T` to the given location.

Parameters:

- `T`: The type of value to copy.
- `destination`: The location to copy to.
- `source`: A pointer to the value to copy.

#### Remarks

Both `destination` and `source` are assumed to be properly aligned for pointers to data of type `T`. For more information on alignment assumptions, see ECMA-335, Sec. I.12.6.2 ("Alignment").

This method is roughly equivalent to the following code.

```csharp
static void Copy<T>(ref T destination, void* source)
{
  T data = *(T*)source; // reinterpret cast source as T* and dereference
  destination = data;
}
```

## Unsafe.CopyBlock(Byte, Byte, UInt32) method

```csharp
public static void CopyBlock (ref byte destination, ref readonly byte source, uint byteCount);
```

Copies bytes from the source address to the destination address.

Parameters:

- `destination`: The managed pointer corresponding to the destination address to copy to.
- `source`: The managed pointer corresponding to the source address to copy from.
- `byteCount`: The number of bytes to copy.

#### Remarks

This API corresponds to the `cpblk` opcode. Both the `destination` and `source` pointers are assumed to be pointer-aligned. See ECMA-335, Sec. III.3.30 ("cpblk - copy data from memory to memory") for more information.

> **Caution:**
> This API is not intended for copying arbitrary-length runs of memory. Consider instead using `Buffer.MemoryCopy` or `Span<T>.CopyTo` for this scenario.

## Unsafe.CopyBlock(Void*, Void*, UInt32) method

```csharp
public static void CopyBlock (void* destination, void* source, uint byteCount);
```

Copies bytes from the source address to the destination address.

Parameters:

- `destination`: The unmanaged pointer corresponding to the destination address to copy to.
- `source`: The unmanaged pointer corresponding to the source address to copy from.
- `byteCount`: The number of bytes to copy.

#### Remarks

This API corresponds to the `cpblk` opcode. Both the `destination` and `source` pointers are assumed to be pointer-aligned. See ECMA-335, Sec. III.3.30 ("cpblk - copy data from memory to memory") for more information.

> **Caution:**
> This API is not intended for copying arbitrary-length runs of memory. Consider instead using `Buffer.MemoryCopy` or `Span<T>.CopyTo` for this scenario.

## Unsafe.CopyBlockUnaligned(Byte, Byte, UInt32) method

```csharp
public static void CopyBlockUnaligned (ref byte destination, ref readonly byte source, uint byteCount);
```

Copies bytes from the source address to the destination address without assuming architecture dependent alignment of the addresses.

Parameters:

- `destination`: The managed pointer corresponding to the destination address to copy to.
- `source`: The managed pointer corresponding to the source address to copy from.
- `byteCount`: The number of bytes to copy.

#### Remarks

This API corresponds to the `unaligned.1 cpblk` opcode sequence. No alignment assumptions are made about the `destination` or `source` pointers. See ECMA-335, Sec. III.3.30 ("cpblk - copy data from memory to memory") and Sec. III.2.5 ("unaligned. (prefix) - pointer instruction might be unaligned") for more information.

> **Caution:**
> This API is not intended for copying arbitrary-length runs of memory. Consider instead using `Buffer.MemoryCopy` or `Span<T>.CopyTo` for this scenario.

## Unsafe.CopyBlockUnaligned(Void*, Void*, UInt32) method

```csharp
public static void CopyBlockUnaligned (void* destination, void* source, uint byteCount);
```

Copies bytes from the source address to the destination address without assuming architecture dependent alignment of the addresses.

Parameters:

- `destination`: The unmanaged pointer corresponding to the destination address to copy to.
- `source`: The unmanaged pointer corresponding to the source address to copy from.
- `byteCount`: The number of bytes to copy.

#### Remarks

This API corresponds to the `unaligned.1 cpblk` opcode sequence. No alignment assumptions are made about the `destination` or `source` pointers. See ECMA-335, Sec. III.3.30 ("cpblk - copy data from memory to memory") and Sec. III.2.5 ("unaligned. (prefix) - pointer instruction might be unaligned") for more information.

> **Caution:**
> This API is not intended for copying arbitrary-length runs of memory. Consider instead using `Buffer.MemoryCopy` or `Span<T>.CopyTo` for this scenario.

## Unsafe.InitBlock(Byte, Byte, UInt32) method

```csharp
public static void InitBlock (ref byte startAddress, byte value, uint byteCount);
```

Initializes a block of memory at the given location with a given initial value.

Parameters:

- `startAddress`: The managed pointer referencing the start of the memory block to initialize.
- `value`: The value to initialize all bytes of the memory block to.
- `byteCount`: The number of bytes to initialize.

#### Remarks

This API corresponds to the `initblk` opcode. The `startAddress` pointer is assumed to be pointer-aligned. See ECMA-335, Sec. III.3.36 ("initblk - initialize a block of memory to a value") for more information.

> **Caution:**
> This API is not intended for initializing arbitrary-length runs of memory. Consider instead using `Span<T>.Fill` for this scenario.

## Unsafe.InitBlock(Void*, Byte, UInt32) method

```csharp
public static void InitBlock (void* startAddress, byte value, uint byteCount);
```

Initializes a block of memory at the given location with a given initial value.

Parameters:

- `startAddress`: The unmanaged pointer referencing the start of the memory block to initialize.
- `value`: The value to initialize all bytes of the memory block to.
- `byteCount`: The number of bytes to initialize.

#### Remarks

This API corresponds to the `initblk` opcode. The `startAddress` pointer is assumed to be pointer-aligned. See ECMA-335, Sec. III.3.36 ("initblk - initialize a block of memory to a value") for more information.

> **Caution:**
> This API is not intended for initializing arbitrary-length runs of memory. Consider instead using `Span<T>.Fill` for this scenario.

## Unsafe.InitBlockUnaligned(Byte, Byte, UInt32) method

```csharp
public static void InitBlockUnaligned (ref byte startAddress, byte value, uint byteCount);
```

Initializes a block of memory at the given location with a given initial value without assuming architecture dependent alignment of the address.

Parameters:

- `startAddress`: The managed pointer referencing the start of the memory block to initialize.
- `value`: The value to initialize all bytes of the memory block to.
- `byteCount`: The number of bytes to initialize.

#### Remarks

This API corresponds to the `unaligned.1 initblk` opcode sequence. No alignment assumption is made about the `startAddress` pointer. See ECMA-335, Sec. III.3.36 ("initblk - initialize a block of memory to a value") and Sec. III.2.5 ("unaligned. (prefix) - pointer instruction might be unaligned") for more information.

> **Caution:**
> This API is not intended for initializing arbitrary-length runs of memory. Consider instead using `Span<T>.Fill` for this scenario.

## Unsafe.InitBlockUnaligned(Void*, Byte, UInt32) method

```csharp
public static void InitBlockUnaligned (void* startAddress, byte value, uint byteCount);
```

Initializes a block of memory at the given location with a given initial value without assuming architecture dependent alignment of the address.

Parameters:

- `startAddress`: The unmanaged pointer referencing the start of the memory block to initialize.
- `value`: The value to initialize all bytes of the memory block to.
- `byteCount`: The number of bytes to initialize.

#### Remarks

This API corresponds to the `unaligned.1 initblk` opcode sequence. No alignment assumption is made about the `startAddress` pointer. See ECMA-335, Sec. III.3.36 ("initblk - initialize a block of memory to a value") and Sec. III.2.5 ("unaligned. (prefix) - pointer instruction might be unaligned") for more information.

> **Caution:**
> This API is not intended for initializing arbitrary-length runs of memory. Consider instead using `Span<T>.Fill` for this scenario.

## Unsafe.IsAddressGreaterThan<T>(T, T) method

```csharp
public static bool IsAddressGreaterThan<T> (ref readonly T left, ref readonly T right) where T : allows ref struct;
```

Returns a value that indicates whether a specified managed pointer is greater than another specified managed pointer.

Parameters:

- `T`: The elemental type of the managed pointer.
- `left`: The first managed pointer to compare.
- `right`: The second managed pointer to compare.

Returns: `true` if `left` is greater than `right`; otherwise, `false`.

#### Remarks

This check is conceptually similar to `(void*)(&left) > (void*)(&right)`.

The return value of this method is a moment-in-time result. If `left` and `right` each reference different objects in GC-managed address space, the GC could relocate items between calls, causing the result of this method to change.

The return value is guaranteed stable if `left` and `right` point to the same managed object.

## Unsafe.IsAddressGreaterThanOrEqualTo<T>(T, T) method

```csharp
public static bool IsAddressGreaterThanOrEqualTo<T> (ref readonly T left, ref readonly T right) where T : allows ref struct;
```

Determines whether the memory address referenced by `left` is greater than or equal to the memory address referenced by `right`.

Parameters:

- `T`: The elemental type of the managed pointer.
- `left`: The first managed pointer to compare.
- `right`: The second managed pointer to compare.

Returns: `true` if `left` is greater than or equal to `right`; otherwise, `false`.

This check is conceptually similar to "(void*)(&left) >= (void*)(&right)".

## Unsafe.IsAddressLessThan<T>(T, T) method

```csharp
public static bool IsAddressLessThan<T> (ref readonly T left, ref readonly T right) where T : allows ref struct;
```

Returns a value that indicates whether a specified managed pointer is less than another specified managed pointer.

Parameters:

- `T`: The elemental type of the managed pointer.
- `left`: The first managed pointer to compare.
- `right`: The second managed pointer to compare.

Returns: `true` if `left` is less than `right`; otherwise, `false`.

#### Remarks

This check is conceptually similar to `(void*)(&left) < (void*)(&right)`.

The return value of this method is a moment-in-time result. If `left` and `right` each reference different objects in GC-managed address space, the GC could relocate items between calls, causing the result of this method to change.

The return value is guaranteed stable if `left` and `right` point to the same managed object.
