---
title: "Unsafe class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/Unsafe.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Unsafe class

Namespace: `System.Runtime.CompilerServices`

```csharp
public static class Unsafe
```

Contains generic, low-level functionality for manipulating managed and unmanaged pointers.

#### Remarks

> **Warning:**
> This type is intended for advanced pointer manipulation scenarios. Callers are assumed to be familiar with ECMA-335, Sec. II.14.4 and III.1.1.5, and with the ECMA-335 CLI Specification Addendum.
>
> Most APIs on this type do not perform any argument checking or validation. Incorrect use of these APIs could corrupt process memory or destabilize the .NET runtime.

This type is typically used by low-level library authors who want to write high-performance code and are willing to suppress .NET's typical type safety checks to meet their performance goals.

Consider the following example, which reverses the elements within a `Span<T>`.

> **Note:**
> These examples exist simply for demonstration purposes. In real-world applications, developers should instead use helper functions like `MemoryExtensions.Reverse`, which are better optimized than even these examples.

```csharp
// A safe, verifiable way to reverse a Span<T>.
static void Reverse<T>(Span<T> span)
{
  while (span.Length > 1)
  {
    T firstElement = span[0];
    T lastElement = span[^1];
    span[0] = lastElement;
    span[^1] = firstElement;
    span = span[1..^1];
  }
}
```

This method is fully type-safe and the .NET runtime may insert bounds checks to help enforce safety. However, low-level library authors may want to suppress .NET's normal safety checks in order to improve the performance of their own code. Such developers would typically rely on static analysis tools or their own code reviews to help enforce correctness. The `Unsafe` APIs allow a developer to rewrite this code using unverifiable constructs, as the following example shows.

```csharp
// A correct but unverifiable way to reverse a Span<T>.
static void Reverse<T>(Span<T> span)
{
  if (span.Length > 1)
  {
    ref T refLeft = ref MemoryMarshal.GetReference(span);
    ref T refRight = ref Unsafe.Add(ref refLeft, span.Length - 1);
    do
    {
      T leftElement = refLeft;
      T rightElement = refRight;
      refLeft = rightElement;
      refRight = leftElement;
      refLeft = ref Unsafe.Add(ref refLeft, 1);
      refRight = ref Unsafe.Subtract(ref refRight, 1);
    } while (Unsafe.IsAddressLessThan(ref refLeft, ref refRight));
  }
}
```

Since the `Unsafe` APIs suppress typical type-safety validation, it is up to callers to ensure that the code they're writing is legal. Misuse of these APIs could cause access violations, create GC holes, produce incorrect codegen, or otherwise induce undefined and destabilizing behaviors within the .NET runtime.

## Unsafe.Add<T>(Void*, Int32) method

```csharp
public static void* Add<T> (void* source, int elementOffset) where T : allows ref struct;
```

Adds an element offset to the given unmanaged pointer.

Parameters:

- `T`: The type whose size will be used as a scale factor for `elementOffset`.
- `source`: The unmanaged pointer to add the offset to.
- `elementOffset`: The offset to add.

Returns: A new unmanaged pointer that reflects the addition of the specified offset to the source pointer.

#### Remarks

The `elementOffset` parameter is the number of `T`-sized elements (not bytes) to add to the `source` pointer. For example, given a source pointer _ptr_, the call `Unsafe.Add<int>(ptr, 20)` will return a new pointer whose address points 80 bytes (= 20 elements \* 4 bytes per element) beyond _ptr_.

If `elementOffset` is a calculated value rather than a hardcoded literal, callers should consider the possibility of integer overflow. For example, in the call `Unsafe.Add<int>(ptr, a * b)`, the caller must ensure the intermediate value `a * b` does not overflow the bounds of `Int32`.

## Unsafe.Add<T>(T, Int32) method

```csharp
public static ref T Add<T> (ref T source, int elementOffset) where T : allows ref struct;
```

Adds an offset to the given managed pointer.

Parameters:

- `T`: The elemental type of the managed pointer.
- `source`: The managed pointer to add the offset to.
- `elementOffset`: The offset to add.

Returns: A new managed pointer that reflects the addition of the specified offset to the source pointer.

#### Remarks

The `elementOffset` parameter is the number of `T`-sized elements (not bytes) to add to the `source` pointer. For example, given a source pointer _ptr_ of type `ref int`, the call `Unsafe.Add<int>(ref ptr, 20)` will return a new pointer whose address points 80 bytes (= 20 elements \* 4 bytes per element) beyond _ptr_.

If `elementOffset` is a calculated value rather than a hardcoded literal, callers should consider the possibility of integer overflow. For example, in the call `Unsafe.Add<int>(ref ptr, a * b)`, the caller must ensure the intermediate value `a * b` does not overflow the bounds of `Int32`.

## Unsafe.Add<T>(T, IntPtr) method

```csharp
public static ref T Add<T> (ref T source, IntPtr elementOffset) where T : allows ref struct;
```

Adds an element offset to the given managed pointer.

Parameters:

- `T`: The elemental type of the managed pointer.
- `source`: The managed pointer to add the offset to.
- `elementOffset`: The offset to add.

Returns: A new managed pointer that reflects the addition of the specified offset to the source pointer.

#### Remarks

The `elementOffset` parameter is the number of `T`-sized elements (not bytes) to add to the `source` pointer. For example, given a source pointer _ptr_ of type `ref int`, the call `Unsafe.Add<int>(ref ptr, (nint)20)` will return a new pointer whose address points 80 bytes (= 20 elements \* 4 bytes per element) beyond _ptr_.

If `elementOffset` is a calculated value rather than a hardcoded literal, callers should consider the possibility of integer overflow. For example, in the call `Unsafe.Add<int>(ref ptr, a * b)`, the caller must ensure the intermediate value `a * b` does not overflow the bounds of `IntPtr`.

## Unsafe.Add<T>(T, UIntPtr) method

```csharp
public static ref T Add<T> (ref T source, UIntPtr elementOffset) where T : allows ref struct;
```

Adds an element offset to the given managed pointer.

Parameters:

- `T`: The elemental type of the managed pointer.
- `source`: The managed pointer to add the offset to.
- `elementOffset`: The offset to add.

Returns: A new managed pointer that reflects the addition of the specified offset to the source pointer.

#### Remarks

The `elementOffset` parameter is the number of `T`-sized elements (not bytes) to add to the `source` pointer. For example, given a source pointer _ptr_ of type `ref int`, the call `Unsafe.Add<int>(ref ptr, (nuint)20)` will return a new pointer whose address points 80 bytes (= 20 elements \* 4 bytes per element) beyond _ptr_.

If `elementOffset` is a calculated value rather than a hardcoded literal, callers should consider the possibility of integer overflow. For example, in the call `Unsafe.Add<int>(ref ptr, a * b)`, the caller must ensure the intermediate value `a * b` does not overflow the bounds of `UIntPtr`.

## Unsafe.AddByteOffset<T>(T, IntPtr) method

```csharp
public static ref T AddByteOffset<T> (ref T source, IntPtr byteOffset) where T : allows ref struct;
```

Adds a byte offset to the given managed pointer.

Parameters:

- `T`: The elemental type of the managed pointer.
- `source`: The managed pointer to add the offset to.
- `byteOffset`: The offset to add.

Returns: A new managed pointer that reflects the addition of the specified byte offset to the source pointer.

#### Remarks

The `byteOffset` parameter is the number of bytes to add to the `source` pointer. For example, given a source pointer _ptr_ of type `ref int`, the call `Unsafe.AddByteOffset<int>(ref ptr, 20)` will return a new pointer whose address points 20 bytes beyond _ptr_.

If `byteOffset` is a calculated value rather than a hardcoded literal, callers should consider the possibility of integer overflow. For example, in the call `Unsafe.AddByteOffset<int>(ref ptr, a * b)`, the caller must ensure the intermediate value `a * b` does not overflow the bounds of `IntPtr`.

## Unsafe.AddByteOffset<T>(T, UIntPtr) method

```csharp
public static ref T AddByteOffset<T> (ref T source, UIntPtr byteOffset) where T : allows ref struct;
```

Adds a byte offset to the given managed pointer.

Parameters:

- `T`: The elemental type of the managed pointer.
- `source`: The managed pointer to add the offset to.
- `byteOffset`: The offset to add.

Returns: A new managed pointer that reflects the addition of the specified byte offset to the source pointer.

#### Remarks

The `byteOffset` parameter is the number of bytes to add to the `source` pointer. For example, given a source pointer _ptr_ of type `ref int`, the call `Unsafe.AddByteOffset<int>(ref ptr, (nuint)20)` will return a new pointer whose address points 20 bytes beyond _ptr_.

If `byteOffset` is a calculated value rather than a hardcoded literal, callers should consider the possibility of integer overflow. For example, in the call `Unsafe.AddByteOffset<int>(ref ptr, a * b)`, the caller must ensure the intermediate value `a * b` does not overflow the bounds of `UIntPtr`.

## Unsafe.AreSame<T>(T, T) method

```csharp
public static bool AreSame<T> (ref readonly T left, ref readonly T right) where T : allows ref struct;
```

Determines whether the specified managed pointers point to the same location.

Parameters:

- `T`: The elemental type of the managed pointers.
- `left`: The first managed pointer to compare.
- `right`: The second managed pointer to compare.

Returns: `true` if `left` and `right` point to the same location; otherwise, `false`.

To be added.

## Unsafe.As<T>(Object) method

```csharp
public static T? As<T> (object? o) where T : class;
```

Casts the given object to the specified type.

Parameters:

- `T`: The type which the object will be cast to.
- `o`: The object to cast.

Returns: The original object, cast to the given type.

#### Remarks

This API is used to cast an object to the given type, suppressing the runtime's normal type safety checks. It is the caller's responsibility to ensure that the cast is legal. No `InvalidCastException` will be thrown.

The behavior of `Unsafe.As<T>(o)` is only well-defined if the typical "safe" casting operation `(T)o` would have succeeded. Use of this API to circumvent casts that would otherwise have failed is unsupported and could result in runtime instability.

To help enforce correct usage, developers might consider using a standard cast or a debug-only assert in their code, as shown in the following examples.

```csharp
void ReinterpretCastAndUse_Sample1(object o)
{
  // Assume that we know through some other means that 'o' is a string,
  // and we want our library's debug builds to verify this.
  // One way to do this is through a standard-style cast.
  // A standard-style cast will throw InvalidCastException at runtime if the cast fails.
  // n.b. Casts of null objects to reference types will succeed.

#if DEBUG
  string s = (string)o;
#else
  string s = Unsafe.As<string>(o);
#endif

  DoSomethingWith(s);
}

void ReinterpretCastAndUse_Sample2(object o)
{
  // Another way to check this is through a debug-only assert.
  // Failed assertions will trigger attached debuggers or terminate the application immediately.
  // Calls to Debug.Assert are removed from release builds.

  Debug.Assert(o is null or string, "Unsafe.As call below is illegal!");
  string s = Unsafe.As<string>(o);

  DoSomethingWith(s);
}
```

## Unsafe.As<TFrom,TTo>(TFrom) method

```csharp
public static ref TTo As<TFrom,TTo> (ref TFrom source) where TFrom : allows ref struct where TTo : allows ref struct;
```

Reinterprets the given managed pointer as a new managed pointer to a value of type `TTo`.

Parameters:

- `TFrom`: The type of managed pointer to reinterpret.
- `TTo`: The desired type of the managed pointer.
- `source`: The managed pointer to reinterpret.

Returns: A managed pointer to a value of type `TTo`.

#### Remarks

This API is conceptually similar to C++'s `reinterpret_cast<>`. It is the caller's responsibility to ensure that the cast is legal. No runtime check will be performed.

Only the managed pointer is reinterpreted. The referenced value itself will remain unchanged. Consider the following example.

```csharp
int[] intArray = new int[] { 0x1234_5678 }; // a 1-element array
ref int refToInt32 = ref intArray[0]; // managed pointer to first Int32 in array
ref short refToInt16 = ref Unsafe.As<int, short>(ref refToInt32); // reinterpret as managed pointer to Int16
Console.WriteLine($"0x{refToInt16:x4}");
```

The output of this program depends on the endianness of the current machine. On big-endian architectures, this code outputs `0x1234`. On little-endian architectures, this code outputs `0x5678`.

When casting a managed pointer from a narrower type to a wider type, the caller must ensure that dereferencing the pointer will not incur an out-of-bounds access. The caller is also responsible for ensuring that the resulting pointer is properly aligned for the referenced type. For more information on alignment assumptions, see ECMA-335, Sec. I.12.6.2 ("Alignment").

## Unsafe.AsPointer<T>(T) method

```csharp
public static void* AsPointer<T> (ref readonly T value) where T : allows ref struct;
```

Converts a managed pointer into an unmanaged pointer.

Parameters:

- `T`: The elemental type of the managed pointer.
- `value`: The managed pointer to convert.

Returns: An unmanaged pointer corresponding to the original source pointer.

#### Remarks

Unmanaged pointers are not tracked by the .NET garbage collector. If the original managed pointer points within a GC-managed object, the caller must ensure that the source object is pinned. If the source object is not pinned and the GC relocates the object, dereferencing the unmanaged pointer could cause an access violation.

## Unsafe.AsRef<T>(Void*) method

```csharp
public static ref T AsRef<T> (void* source) where T : allows ref struct;
```

Converts an unmanaged pointer into a managed pointer to a value of type `T`.

Parameters:

- `T`: The elemental type of the managed pointer.
- `source`: The unmanaged pointer to convert.

Returns: A managed pointer to a value of type `T`.

#### Remarks

The caller is responsible for ensuring that the resulting managed pointer is properly aligned for the referenced type. For more information on alignment requirements, see ECMA-335, Sec. I.12.6.2 ("Alignment").
