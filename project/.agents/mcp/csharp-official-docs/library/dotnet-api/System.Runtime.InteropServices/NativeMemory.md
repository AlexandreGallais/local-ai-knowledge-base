---
title: "NativeMemory class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/NativeMemory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NativeMemory class

Namespace: `System.Runtime.InteropServices`

```csharp
public static class NativeMemory
```

This class contains methods that are mainly used to manage native memory.

To be added.

## NativeMemory.AlignedAlloc(UIntPtr, UIntPtr) method

```csharp
public static void* AlignedAlloc (UIntPtr byteCount, UIntPtr alignment);
```

Allocates an aligned block of memory of the specified size and alignment, in bytes.

Parameters:

- `byteCount`: The size, in bytes, of the block to allocate.
- `alignment`: The alignment, in bytes, of the block to allocate. This must be a power of `2`.

Returns: A pointer to the allocated aligned block of memory.

Exceptions:

- `ArgumentException`: `alignment` is not a power of two.
- `OutOfMemoryException`: Allocating `byteCount` of memory with `alignment` failed.

#### Remarks

This method allows `byteCount` to be `0` and will return a valid pointer that should not be dereferenced and that should be passed to free to avoid memory leaks.

This method is a thin wrapper over the C `aligned_alloc` API or a platform dependent aligned allocation API such as `_aligned_malloc` on Win32.

This method is not compatible with `Free` or `Realloc`. Instead, call  `AlignedFree` or `AlignedRealloc`.

## NativeMemory.AlignedFree(Void*) method

```csharp
public static void AlignedFree (void* ptr);
```

Frees an aligned block of memory.

Parameters:

- `ptr`: A pointer to the aligned block of memory that should be freed.

#### Remarks

This method does nothing if `ptr` is `null`.

This method is a thin wrapper over the C `free` API or a platform dependent aligned free API such as `_aligned_free` on Win32.

## NativeMemory.AlignedRealloc(Void*, UIntPtr, UIntPtr) method

```csharp
public static void* AlignedRealloc (void* ptr, UIntPtr byteCount, UIntPtr alignment);
```

Reallocates an aligned block of memory of the specified size and alignment, in bytes.

Parameters:

- `ptr`: The previously allocated block of memory.
- `byteCount`: The size, in bytes, of the block to allocate.
- `alignment`: The alignment, in bytes, of the block to allocate. This must be a power of `2`.

Returns: A pointer to the reallocated aligned block of memory.

Exceptions:

- `ArgumentException`: `alignment` is not a power of two.
- `OutOfMemoryException`: Reallocating `byteCount` of memory with `alignment` failed.

#### Remarks

This method acts as `AlignedAlloc` if `ptr` is `null`.

This method allows `byteCount` to be `0` and will return a valid pointer that should not be dereferenced and that should be passed to free to avoid memory leaks.

This method is a platform dependent aligned reallocation API such as `_aligned_realloc` on Win32.

This method is not compatible with `Free` or `Realloc`. Instead, call  `AlignedFree` or `AlignedRealloc`.

## NativeMemory.Alloc(UIntPtr) method

```csharp
public static void* Alloc (UIntPtr byteCount);
```

Allocates a block of memory of the specified size, in bytes.

Parameters:

- `byteCount`: The size, in bytes, of the block to allocate.

Returns: A pointer to the allocated block of memory.

Exceptions:

- `OutOfMemoryException`: Allocating `byteCount` of memory failed.

#### Remarks

This method allows `byteCount` to be `0` and will return a valid pointer that should not be dereferenced and that should be passed to free to avoid memory leaks.

This method is a thin wrapper over the C `malloc` API.

## NativeMemory.Alloc(UIntPtr, UIntPtr) method

```csharp
public static void* Alloc (UIntPtr elementCount, UIntPtr elementSize);
```

Allocates a block of memory of the specified size, in elements.

Parameters:

- `elementCount`: The count, in elements, of the block to allocate.
- `elementSize`: The size, in bytes, of each element in the allocation.

Returns: A pointer to the allocated block of memory.

Exceptions:

- `OutOfMemoryException`: Allocating `elementCount` * `elementSize` bytes of memory failed.

#### Remarks

This method allows `elementCount` and/or `elementSize` to be `0` and will return a valid pointer that should not be dereferenced and that should be passed to free to avoid memory leaks.

This method is a thin wrapper over the C `malloc` API.

## NativeMemory.AllocZeroed(UIntPtr) method

```csharp
public static void* AllocZeroed (UIntPtr byteCount);
```

Allocates and zeroes a block of memory of the specified size, in bytes.

Parameters:

- `byteCount`: The size, in bytes, of the block to allocate.

Returns: A pointer to the allocated and zeroed block of memory.

Exceptions:

- `OutOfMemoryException`: Allocating `byteCount` of memory failed.

#### Remarks

This method allows `byteCount` to be `0` and will return a valid pointer that should not be dereferenced and that should be passed to free to avoid memory leaks.

This method is a thin wrapper over the C `calloc` API.

## NativeMemory.AllocZeroed(UIntPtr, UIntPtr) method

```csharp
public static void* AllocZeroed (UIntPtr elementCount, UIntPtr elementSize);
```

Allocates and zeroes a block of memory of the specified size, in elements.

Parameters:

- `elementCount`: The count, in elements, of the block to allocate.
- `elementSize`: The size, in bytes, of each element in the allocation.

Returns: A pointer to the allocated and zeroed block of memory.

Exceptions:

- `OutOfMemoryException`: Allocating `elementCount` * `elementSize` bytes of memory failed.

#### Remarks

This method allows `elementCount` and `elementSize` to be `0`. It returns a valid pointer that should not be dereferenced and that should be passed to free to avoid memory leaks.

This method is a thin wrapper over the C `calloc` API.

## NativeMemory.Clear(Void*, UIntPtr) method

```csharp
public static void Clear (void* ptr, UIntPtr byteCount);
```

Clears a block of memory.

Parameters:

- `ptr`: A pointer to the block of memory that should be cleared.
- `byteCount`: The size, in bytes, of the block to clear.

#### Remarks

If this method is called with `ptr` being `null` and `byteCount` being `0`, it will be equivalent to a no-op.

The behavior when `ptr` is `null` and `byteCount` is greater than `0` is undefined.

## NativeMemory.Copy(Void*, Void*, UIntPtr) method

```csharp
public static void Copy (void* source, void* destination, UIntPtr byteCount);
```

Copies a block of memory from memory location `source` to memory location `destination`.

Parameters:

- `source`: A pointer to the source of data to be copied.
- `destination`: A pointer to the destination memory block where the data is to be copied.
- `byteCount`: The size, in bytes, to be copied from the source location to the destination.

To be added.

## NativeMemory.Fill(Void*, UIntPtr, Byte) method

```csharp
public static void Fill (void* ptr, UIntPtr byteCount, byte value);
```

Copies the byte `value` to the first `byteCount` bytes of the memory located at `ptr`.

Parameters:

- `ptr`: A pointer to the block of memory to fill.
- `byteCount`: The number of bytes to be set to `value`.
- `value`: The value to be set.

To be added.

## NativeMemory.Free(Void*) method

```csharp
public static void Free (void* ptr);
```

Frees a block of memory.

Parameters:

- `ptr`: A pointer to the block of memory that should be freed.

#### Remarks

This method does nothing if `ptr` is `null`.

This method is a thin wrapper over the C `free` API.

## NativeMemory.Realloc(Void*, UIntPtr) method

```csharp
public static void* Realloc (void* ptr, UIntPtr byteCount);
```

Reallocates a block of memory to be the specified size, in bytes.

Parameters:

- `ptr`: The previously allocated block of memory.
- `byteCount`: The size, in bytes, of the reallocated block.

Returns: A pointer to the reallocated block of memory.

Exceptions:

- `OutOfMemoryException`: Reallocating `byteCount` of memory failed.

#### Remarks

This method acts as `Alloc` if `ptr` is `null`.

This method allows `byteCount` to be `0` and will return a valid pointer that should not be dereferenced and that should be passed to free to avoid memory leaks.

This method is a thin wrapper over the C `realloc` API.
