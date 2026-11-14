---
title: "Unsafe code best practices - .NET (part 3 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/unsafe-code/best-practices.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Unsafe code best practices - .NET (part 3 of 4)

## 11. Unaligned memory access

The memory access coalescing described in Memory access coalescing often results in explicit
or implicit misaligned reads/writes. While this usually doesn't cause serious issues (aside from
potential performance penalties due to crossing cache and page boundaries), it still poses some real risks.

For example, consider the scenario where you're clearing two elements of an array at once:

```csharp
uint[] arr = _arr;
arr[i + 0] = 0;
arr[i + 1] = 0;
```

Let's say the previous values at these locations were both `uint.MaxValue` (`0xFFFFFFFF`).
The .NET Memory Model guarantees that both writes are atomic, so all other threads in the process will only ever
observe the new value `0` or the old value `0xFFFFFFFF`, never "torn" values like `0xFFFF0000`.

However, assume the following unsafe code is used to bypass the bounds check and zero both elements with a single 64-bit store:

```csharp
ref uint p = ref Unsafe.Add(ref MemoryMarshal.GetArrayDataReference(arr), i);
Unsafe.WriteUnaligned<ulong>(ref Unsafe.As<uint, byte>(ref p), 0UL);
```

This code has the side effect of removing the
atomicity guarantee. Torn values might be observed by other threads, leading to undefined behavior.
For such a coalesced write to be atomic, the memory must be aligned to the size of the write (8 bytes in this case).
If you attempt to manually align the memory prior to the operation, you must consider that the GC can relocate
(and, effectively, change the alignment of) the array at any time if it's not pinned.
See the .NET Memory Model documentation for more details.

Another risk of unaligned memory access is the potential for an application crash in certain scenarios.
While some .NET runtimes rely on the OS to fixup misaligned accesses, there are still some scenarios on some
platforms where misaligned access can lead to an `System.DataMisalignedException` (or `System.Runtime.InteropServices.SEHException`).
Some of the examples include:

* `Interlocked` operations on misaligned memory on some platforms (example).
* Misaligned floating point operations on ARM.
* Accessing special device memory with certain alignment requirements (not really supported by .NET).

### Recommendations

1. ❌ DON'T use unaligned memory accesses in lock-free algorithms and other scenarios where atomicity is important.
2. ✔️ DO align data manually if necessary, but keep in mind that the GC can relocate objects
at any time, effectively changing the alignment dynamically. This is especially important for various
`StoreAligned`/`LoadAligned` APIs in SIMD.
3. ✔️ DO use explicit unaligned Read/Write APIs such as `System.Runtime.CompilerServices.Unsafe.ReadUnaligned*`/`System.Runtime.CompilerServices.Unsafe.WriteUnaligned*`
instead of aligned ones such as `System.Runtime.CompilerServices.Unsafe.Read``1(System.Void*)`/`System.Runtime.CompilerServices.Unsafe.Write``1(System.Void*,``0)` or `System.Runtime.CompilerServices.Unsafe.As``2(``0@)` if data might be misaligned.
4. ✔️ DO keep in mind that various memory manipulation APIs such as `System.Span`1.CopyTo(System.Span{`0})` also don't provide atomicity guarantees.
5. ✔️ DO consult with the .NET Memory Model documentation (see references) for more details on atomicity guarantees.
6. ✔️ DO measure performance across all your target platforms, as some platforms impose a significant performance penalty for unaligned memory accesses. You may find that on these platforms, naive code performs better than clever code.
7. ✔️ DO keep in mind that there are scenarios and platforms where unaligned memory access might lead to an exception.

## 12. Binary (de)serialization of structs with paddings or non-blittable members

Be cautious when you use various serialization-like APIs to copy or read structs to or from byte arrays.
If a struct contains paddings or non-blittable members (for example, `bool` or GC fields), then classic unsafe memory operations such as `Fill`, `CopyTo`, and `SequenceEqual` might accidentally copy sensitive data from the stack to the paddings or treat garbage data as significant during comparisons creating rarely reproducible bugs. A common anti-pattern might look like this:

```csharp
T UnreliableDeserialization<TObject>(ReadOnlySpan<byte> data) where TObject : unmanaged
{
    return MemoryMarshal.Read<TObject>(data); // or Unsafe.ReadUnaligned
    // BUG! TObject : unmanaged doesn't guarantee that TObject is blittable and contains no paddings.
}
```

The only correct approach is to use field-by-field loads/store specialized for each `TObject` input (or generalized with Reflection, Source Generators, or (de)serialization libraries).

### Recommendations

1. ❌ DON'T use unsafe code to copy/load/compare structs with paddings or non-blittable members. Loads from untrusted inputs are problematic even for basic types like `bool` or `decimal`. At the same time, stores might accidentally serialize sensitive information from the stack in a struct's gaps/paddings.
2. ❌ DON'T rely on `T : unmanaged` constraint, `RuntimeHelpers.IsReferenceOrContainsReferences`, or similar APIs to guarantee that a generic type is safe to perform bitwise operations on. At the time of writing these guidelines, there is no reliable programmatic way to determine whether it is legal to perform arbitrary bitwise operations on a given type.
   * If you must perform such bitwise manipulation, only do it against this hardcoded list of types, and be aware of the current machine's endianness:
      * The primitive integral types `Byte`, `SByte`, `Int16`, `UInt16`, `Int32`, `UInt32`, `Int64`, and `UInt64`;
      * An `Enum` backed by one of the above primitive integral types;
      * `Char`, `Int128`, `UInt128`, `Half`, `Single`, `Double`, `IntPtr`, `UIntPtr`.
3. ✔️ DO use field-by-field loads/store (de)serialization instead. Consider using popular and safe libraries for (de)serialization.

## 13. Null managed pointers

Generally, byrefs (managed pointers) are rarely null and the only safe way to create a null byref as of today is
to initialize a `ref struct` with `default`. Then all its `ref` fields are null managed pointers:

```csharp
RefStructWithRefField s = default;
ref byte nullRef = ref s.refFld;
```

However, there are several unsafe ways to create null byrefs. Some examples include:

```csharp
// Null byref by calling Unsafe.NullRef directly:
ref object obj = ref Unsafe.NullRef<object>();

// Null byref by turning a null unmanaged pointer into a null managed pointer:
ref object obj = ref Unsafe.AsRef<object>((void*)0);
```

The risk of introducing memory safety issues is low, and any attempt to dereference
a null byref will lead to a well-defined NullReferenceException.
However, the C# compiler assumes that dereferencing a byref always succeeds
and produces no observable side effect. Therefore it is a legal optimization to elide any dereference whose resulting value is
immediately thrown away. See dotnet/runtime#98681 (and
this related comment) for an example of a now-fixed bug within .NET
where library code improperly relied on the dereference triggering a side effect, unaware that the C# compiler effectively short-circuited
the intended logic.

### Recommendations

1. ❌ DON'T create null byrefs in C# if it's not necessary. Consider using normal managed references, the
Null Object Pattern, or empty spans instead.
2. ❌ DON'T discard the result of a byref dereference, as it might be optimized out and lead to potential bugs.

## 14. `stackalloc`

`stackalloc` has historically been used to create small, non-escaping arrays on the stack, reducing GC pressure. In the future, JIT's Escape Analysis might start optimizing non-escaping GC allocations of arrays to stack objects, potentially making `stackalloc` redundant. Until then, `stackalloc` remains useful for allocating small buffers on the stack. For larger or escaping buffers, it is often combined with `ArrayPool<T>`.

### Recommendations

1. ✔️ DO always consume `stackalloc` into `ReadOnlySpan<T>`/`Span<T>` on the left side of the expression to provide bounds checks:

    ```csharp
    // Good:
    Span<int> s = stackalloc int[10];
    s[2] = 0;  // Bounds check is eliminated by JIT for this write.
    s[42] = 0; // IndexOutOfRangeException is thrown

    // Bad:
    int* s = stackalloc int[10];
    s[2] = 0;
    s[42] = 0; // Out of bounds write, undefined behavior.
    ```

2. ❌ DON'T use `stackalloc` inside loops. The stack space isn't reclaimed until the method returns, so including a `stackalloc` inside a loop could result in process termination due to stack overflow.
3. ❌ DON'T use large lengths for `stackalloc`. For example, 1024 bytes could be considered a reasonable upper bound.
4. ✔️ DO check the range of variables used as `stackalloc` lengths.

    ```csharp
    void ProblematicCode(int length)
    {
        Span<int> s = stackalloc int[length]; // Bad practice: check the range of `length`!
        Consume(s);
    }
    ```

    Fixed version:

    ```csharp
    void BetterCode(int length)
    {
        // The "throw if length < 0" check below is important, as attempting to stackalloc a negative
        // length will result in process termination.
        ArgumentOutOfRangeException.ThrowIfLessThan(length, 0, nameof(length));
        Span<int> s = length <= 256 ? stackalloc int[length] : new int[length];
        // Or:
        // Span<int> s = length <= 256 ? stackalloc int[256] : new int[length];
        // Which performs a faster zeroing of the stackalloc, but potentially consumes more stack space.
        Consume(s);
    }
    ```

5. ✔️ DO use modern C# features such as collection literals (`Span<int> s = [1, 2, 3];`), `params Span<T>`, and inline arrays to avoid manual memory management when possible.

## 15. Fixed-size buffers

Fixed-size buffers were useful for interop scenarios with data sources from other languages or platforms. They then were replaced by safer and more convenient inline arrays.
An example of a fixed-size buffer (requires `unsafe` context) is the following snippet:

```csharp
public struct MyStruct
{
    public unsafe fixed byte data[8];
    // Some other fields
}

MyStruct m = new();
ms.data[10] = 0; // Out-of-bounds write, undefined behavior.
```

A modern and a safer alternative is inline arrays:

```csharp
[System.Runtime.CompilerServices.InlineArray(8)]
public struct Buffer
{
    private int _element0; // can be generic
}

public struct MyStruct
{
    public Buffer buffer;
    // Some other fields
}

MyStruct ms = new();
ms.buffer[i] = 0; // Runtime performs a bounds check on index 'i'; could throw IndexOutOfRangeException.
ms.buffer[7] = 0; // Bounds check elided; index is known to be in range.
ms.buffer[10] = 0; // Compiler knows this is out of range and produces compiler error CS9166.
```

Another reason to avoid fixed-size buffers in favor of inline arrays, which are always zero-initialized by default, is that fixed-size buffers might have non-zeroed contents in certain scenarios.

### Recommendations

1. ✔️ DO prefer replacing fixed-size buffers with inline arrays or IL marshalling attributes where possible.
