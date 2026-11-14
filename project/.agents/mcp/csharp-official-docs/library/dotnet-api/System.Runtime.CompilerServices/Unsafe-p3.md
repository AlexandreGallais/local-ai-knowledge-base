---
title: "Unsafe class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/Unsafe.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Unsafe class (part 3 of 4)

## Unsafe.IsAddressLessThanOrEqualTo<T>(T, T) method

```csharp
public static bool IsAddressLessThanOrEqualTo<T> (ref readonly T left, ref readonly T right) where T : allows ref struct;
```

Determines whether the memory address referenced by `left` is less than or equal to the memory address referenced by `right`.

Parameters:

- `T`: The elemental type of the managed pointer.
- `left`: The first managed pointer to compare.
- `right`: The second managed pointer to compare.

Returns: `true` if `left` is less than or equal to `right`; otherwise, `false`.

This check is conceptually similar to "(void*)(&left) <= (void*)(&right)".

## Unsafe.IsNullRef<T>(T) method

```csharp
public static bool IsNullRef<T> (ref readonly T source) where T : allows ref struct;
```

Determines if a given managed pointer to a value of type `T` is a null reference.

Parameters:

- `T`: The elemental type of the managed pointer.
- `source`: The managed pointer to check.

Returns: `true` if `source` is a null reference; otherwise, `false`.

This check is conceptually similar to
```csharp
(void*)(&source) == nullptr
```
.

## Unsafe.NullRef<T>() method

```csharp
public static ref T NullRef<T> () where T : allows ref struct;
```

Returns a null managed pointer to a value of type `T`.

Parameters:

- `T`: The elemental type of the managed pointer.

Returns: A null managed pointer to a value of type `T`.

The return value is conceptually similar to
```csharp
ref *((T*)null)
```
.

## Unsafe.Read<T>(Void*) method

```csharp
public static T Read<T> (void* source) where T : allows ref struct;
```

Reads a value of type `T` from the given location.

Parameters:

- `T`: The type of the value to read.
- `source`: An unmanaged pointer containing the address to read from.

Returns: A value of type `T` read from the given location.

#### Remarks

> **Caution:**
> The caller must ensure that there are `SizeOf<T>()` bytes of readable memory available starting at the location pointed to by `source`. Access violations may occur if this requirement is not met.

`source` is assumed to be a properly aligned pointer to a value of type `T`. For more information on alignment assumptions, see ECMA-335, Sec. I.12.6.2 ("Alignment").

## Unsafe.ReadUnaligned<T>(Byte) method

```csharp
public static T ReadUnaligned<T> (scoped ref readonly byte source) where T : allows ref struct;
```

Reads a value of type `T` from the given address without assuming architecture dependent alignment of the source address.

Parameters:

- `T`: The type of the value to read.
- `source`: A managed pointer containing the address to read from.

Returns: A value of type `T` read from the given address.

#### Remarks

> **Caution:**
> The caller must ensure that there are `SizeOf<T>()` bytes of readable memory available starting at the location pointed to by `source`. Access violations may occur if this requirement is not met.

## Unsafe.ReadUnaligned<T>(Void*) method

```csharp
public static T ReadUnaligned<T> (void* source) where T : allows ref struct;
```

Reads a value of type `T` from the given location without assuming architecture dependent alignment of the source address.

Parameters:

- `T`: The type of the value to read.
- `source`: An unmanaged pointer containing the address to read from.

Returns: A value of type `T` read from the given location.

#### Remarks

> **Caution:**
> The caller must ensure that there are `SizeOf<T>()` bytes of readable memory available starting at the location pointed to by `source`. Access violations may occur if this requirement is not met.

## Unsafe.SizeOf<T>() method

```csharp
public static int SizeOf<T> () where T : allows ref struct;
```

Returns the size of a value of the given type parameter.

Parameters:

- `T`: The type whose size is to be retrieved.

Returns: The size, in bytes, of a value of type `T`.

#### Remarks

This API corresponds to the `sizeof` opcode. If `T` is a reference type, the return value is the size of the reference itself (equal to `sizeof(void*)`). See ECMA-335, Sec. III.4.25  ("sizeof - load the size, in bytes, of a type") for more information.

> **Caution:**
> This API returns the size of the _managed_ view of the type. For the size of the _unmanaged_ view of the type, such as needed for interop purposes, use `Marshal.SizeOf`.

## Unsafe.SkipInit<T>(T) method

```csharp
public static void SkipInit<T> (out T value) where T : allows ref struct;
```

Bypasses definite assignment rules for a given reference.

Parameters:

- `T`: The type of the reference.
- `value`: The reference whose initialization should be skipped.

#### Remarks

This method is typically used to avoid double-initialization when initializing union-type structs. Consider the following example, which produces a C# compiler error.

```csharp
using System;
using System.Runtime.InteropServices;

public static MyUnionStruct MyMethod() {
    MyUnionStruct value;
    value.SomeIntField = 42;
    return value; // CS0165: Use of unassigned local variable 'value'
}

[StructLayout(LayoutKind.Explicit)]
public struct MyUnionStruct
{
    [FieldOffset(0)]
    public int SomeIntField;

    [FieldOffset(0)]
    public byte SomeByteField;
}
```

This error occurs because the compiler expects _all_ fields of the struct to be initialized before the struct is used or returned to the caller.

One way to avoid this compiler error is to ensure the entire struct is zero-initialized before individual fields are set, as shown in the following example.

```csharp
// This sample compiles successfully.
public static MyUnionStruct MyMethod() {
    MyUnionStruct value = default; // the struct is now guaranteed assigned
    value.SomeIntField = 42;
    return value;
}
```

If you want to avoid the initial zero-initialization, you can call the `SkipInit` method to suppress the compiler warning.

```csharp
using System.Runtime.CompilerServices;

// This sample also compiles successfully.
public static MyUnionStruct MyMethod() {
    MyUnionStruct value;
    Unsafe.SkipInit(out value); // compiler believes the struct has been guaranteed assigned
    value.SomeIntField = 42;
    return value;
}
```

> **Warning:**
> Take care to ensure that the struct has been initialized appropriately, otherwise the struct's fields could contain uninitialized data from the stack.

## Unsafe.Subtract<T>(Void*, Int32) method

```csharp
public static void* Subtract<T> (void* source, int elementOffset) where T : allows ref struct;
```

Subtracts an element offset from the given unmanaged pointer.

Parameters:

- `T`: The type whose size will be used as a scale factor for `elementOffset`.
- `source`: The unmanaged pointer to subtract the offset from.
- `elementOffset`: The offset to subtract.

Returns: A new unmanaged pointer that reflects the subtraction of the specified offset from the source pointer.

#### Remarks

The `elementOffset` parameter is the number of `T`-sized elements (not bytes) to remove from the `source` pointer. For example, given a source pointer _ptr_, the call `Unsafe.Subtract<int>(ptr, 20)` will return a new pointer whose address points 80 bytes (= 20 elements \* 4 bytes per element) before _ptr_.

If `elementOffset` is a calculated value rather than a hardcoded literal, callers should consider the possibility of integer overflow. For example, in the call `Unsafe.Subtract<int>(ptr, a * b)`, the caller must ensure the intermediate value `a * b` does not overflow the bounds of `Int32`.

## Unsafe.Subtract<T>(T, Int32) method

```csharp
public static ref T Subtract<T> (ref T source, int elementOffset) where T : allows ref struct;
```

Subtracts an offset from the given managed pointer.

Parameters:

- `T`: The elemental type of the managed pointer.
- `source`: The managed pointer to subtract the offset from.
- `elementOffset`: The offset to subtract.

Returns: A new managed pointer that reflects the subtraction of the specified offset from the source pointer.

#### Remarks

The `elementOffset` parameter is the number of `T`-sized elements (not bytes) to subtract from the `source` pointer. For example, given a source pointer _ptr_ of type `ref int`, the call `Unsafe.Subtract<int>(ref ptr, 20)` will return a new pointer whose address points 80 bytes (= 20 elements \* 4 bytes per element) before _ptr_.

If `elementOffset` is a calculated value rather than a hardcoded literal, callers should consider the possibility of integer overflow. For example, in the call `Unsafe.Subtract<int>(ref ptr, a * b)`, the caller must ensure the intermediate value `a * b` does not overflow the bounds of `Int32`.

## Unsafe.Subtract<T>(T, IntPtr) method

```csharp
public static ref T Subtract<T> (ref T source, IntPtr elementOffset) where T : allows ref struct;
```

Subtracts an element offset from the given managed pointer.

Parameters:

- `T`: The elemental type of the managed pointer.
- `source`: The managed pointer to subtract the offset from.
- `elementOffset`: The offset to subtract.

Returns: A new managed pointer that reflects the subtraction of the specified offset from the source pointer.

#### Remarks

The `elementOffset` parameter is the number of `T`-sized elements (not bytes) to subtract from the `source` pointer. For example, given a source pointer _ptr_ of type `ref int`, the call `Unsafe.Subtract<int>(ref ptr, (nint)20)` will return a new pointer whose address points 80 bytes (= 20 elements \* 4 bytes per element) before _ptr_.

If `elementOffset` is a calculated value rather than a hardcoded literal, callers should consider the possibility of integer overflow. For example, in the call `Unsafe.Subtract<int>(ref ptr, a * b)`, the caller must ensure the intermediate value `a * b` does not overflow the bounds of `IntPtr`.

## Unsafe.Subtract<T>(T, UIntPtr) method

```csharp
public static ref T Subtract<T> (ref T source, UIntPtr elementOffset) where T : allows ref struct;
```

Subtracts an element offset from the given managed pointer.

Parameters:

- `T`: The elemental type of the managed pointer.
- `source`: The managed pointer to subtract the offset from.
- `elementOffset`: The offset to subtract.

Returns: A new managed pointer that reflects the subtraction of the specified offset from the source pointer.

#### Remarks

The `elementOffset` parameter is the number of `T`-sized elements (not bytes) to subtract from the `source` pointer. For example, given a source pointer _ptr_ of type `ref int`, the call `Unsafe.Subtract<int>(ref ptr, (nuint)20)` will return a new pointer whose address points 80 bytes (= 20 elements \* 4 bytes per element) before _ptr_.

If `elementOffset` is a calculated value rather than a hardcoded literal, callers should consider the possibility of integer overflow. For example, in the call `Unsafe.Subtract<int>(ref ptr, a * b)`, the caller must ensure the intermediate value `a * b` does not overflow the bounds of `UIntPtr`.

## Unsafe.SubtractByteOffset<T>(T, IntPtr) method

```csharp
public static ref T SubtractByteOffset<T> (ref T source, IntPtr byteOffset) where T : allows ref struct;
```

Subtracts a byte offset from the given managed pointer.

Parameters:

- `T`: The elemental type of the managed pointer.
- `source`: The managed pointer to subtract the offset from.
- `byteOffset`: The offset to subtract.

Returns: A new managed pointer that reflects the subtraction of the specified byte offset from the source pointer.

#### Remarks

The `byteOffset` parameter is the number of bytes to remove from the `source` pointer. For example, given a source pointer _ptr_ of type `ref int`, the call `Unsafe.SubtractByteOffset<int>(ref ptr, 20)` will return a new pointer whose address points 20 bytes before _ptr_.

If `byteOffset` is a calculated value rather than a hardcoded literal, callers should consider the possibility of integer overflow. For example, in the call `Unsafe.SubtractByteOffset<int>(ref ptr, a * b)`, the caller must ensure the intermediate value `a * b` does not overflow the bounds of `IntPtr`.

## Unsafe.SubtractByteOffset<T>(T, UIntPtr) method

```csharp
public static ref T SubtractByteOffset<T> (ref T source, UIntPtr byteOffset) where T : allows ref struct;
```

Subtracts a byte offset from the given managed pointer.

Parameters:

- `T`: The elemental type of the managed pointer.
- `source`: The managed pointer to subtract the offset from.
- `byteOffset`: The offset to subtract.

Returns: A new managed pointer that reflects the subtraction of the specified byte offset from the source pointer.

#### Remarks

The `byteOffset` parameter is the number of bytes to subtract from the `source` pointer. For example, given a source pointer _ptr_ of type `ref int`, the call `Unsafe.SubtractByteOffset<int>(ref ptr, (nuint)20)` will return a new pointer whose address points 20 bytes before _ptr_.

If `byteOffset` is a calculated value rather than a hardcoded literal, callers should consider the possibility of integer overflow. For example, in the call `Unsafe.SubtractByteOffset<int>(ref ptr, a * b)`, the caller must ensure the intermediate value `a * b` does not overflow the bounds of `UIntPtr`.
