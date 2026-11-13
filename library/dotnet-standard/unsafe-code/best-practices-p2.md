---
title: "Unsafe code best practices - .NET (part 2 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/unsafe-code/best-practices.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Unsafe code best practices - .NET (part 2 of 4)

## 6. Bypassing the Write Barrier and non-atomic operations on GC references

Normally, all kind of writes or reads of GC references are always atomic. Also, all attempts
to assign a GC reference (or a byref to struct with GC fields) to a potential heap location
go through the Write Barrier that ensures that the GC is aware of new connections between objects.
However, unsafe code allows us to bypass these guarantees and introduce unreliable patterns. Example:

```csharp
unsafe void InvalidCode1(object[] arr1, object[] arr2)
{
    fixed (object* p1 = arr1)
    fixed (object* p2 = arr2)
    {
        nint* ptr1 = (nint*)p1;
        nint* ptr2 = (nint*)p2;

        // Bug! We're assigning a GC pointer to a heap location
        // without going through the Write Barrier.
        // Moreover, we also bypass array covariance checks.
        *ptr1 = *ptr2;
    }
}
```

Similarly, the following code with managed pointers is also unreliable:

```csharp
struct StructWithGcFields
{
    object a;
    int b;
}

void InvalidCode2(ref StructWithGcFields dst, ref StructWithGcFields src)
{
    // It's already a bad idea to cast a struct with GC fields to `ref byte`, etc.
    ref byte dstBytes = ref Unsafe.As<StructWithGcFields, byte>(ref dst);
    ref byte srcBytes = ref Unsafe.As<StructWithGcFields, byte>(ref src);

    // Bug! Bypasses the Write Barrier. Also, non-atomic writes/reads for GC references.
    Unsafe.CopyBlockUnaligned(
        ref dstBytes, ref srcBytes, (uint)Unsafe.SizeOf<StructWithGcFields>());

    // Bug! Same as above.
    Vector128.LoadUnsafe(ref srcBytes).StoreUnsafe(ref dstBytes);
}
```

### Recommendations

1. ❌ DON'T use non-atomic operations on GC references (for example, SIMD operations often don't provide them).
2. ❌ DON'T use unmanaged pointers to store GC references into heap locations (omitting the Write Barrier).

## 7. Assumptions about object lifetimes (finalizers, `GC.KeepAlive`)

Avoid making assumptions about the lifetime of objects from the GC's perspective.
Specifically, do not assume that an object is still alive when it might not be. Object lifetimes can vary
across different runtimes or even between different Tiers of the same method (Tier0 and Tier1 in RyuJIT).
Finalizers are a common scenario where such assumptions can be incorrect.

```csharp
public class MyClassWithBadCode
{
    public IntPtr _handle;

    public void DoWork() => DoSomeWork(_handle); // A use-after-free bug!

    ~MyClassWithBadCode() => DestroyHandle(_handle);
}

// Example usage:
var obj = new MyClassWithBadCode()
obj.DoWork();
```

In this example, `DestroyHandle` might be called before `DoWork` completes or even before it begins.
Therefore, it's crucial not to assume that objects, such as `this`, will remain alive until the end of the method.

```csharp
void DoWork()
{
    // A pseudo-code of what might happen under the hood:

    IntPtr reg = this._handle;
    // 'this' object is no longer alive at this point.

    // <-- GC interrupts here, collects the 'this' object, and triggers its finalizer.
    // DestroyHandle(_handle) is called.

    // Bug! 'reg' is now a dangling pointer.
    DoSomeWork(reg);

    // You can resolve the issue and force 'this' to be kept alive (thus ensuring the
    // finalizer will not run) by uncommenting the line below:
    // GC.KeepAlive(this);
}
```

Therefore, it is recommended to explicitly extend the lifetime of objects using `System.GC.KeepAlive(System.Object)`
or `System.Runtime.InteropServices.SafeHandle`.

Another classic instance of this problem is `System.Runtime.InteropServices.Marshal.GetFunctionPointerForDelegate``1(``0)` API:

```csharp
var callback = new NativeCallback(OnCallback);

// Convert delegate to function pointer
IntPtr fnPtr = Marshal.GetFunctionPointerForDelegate(callback);

// Bug! The delegate might be collected by the GC here.
// It should be kept alive until the native code is done with it.

RegisterCallback(fnPtr);
```

### Recommendations

1. ❌ DON'T make assumptions about object lifetimes. For instance, never assume `this` is always alive through the end of the method.
2. ✔️ DO use `System.Runtime.InteropServices.SafeHandle` for managing native resources.
3. ✔️ DO use `System.GC.KeepAlive(System.Object)` to extend the lifetime of objects when necessary.

## 8. Cross-thread access to local variables

Accessing local variables from a different thread is generally considered bad practice. However, it becomes explicitly undefined behavior when managed references are involved, as outlined in the .NET Memory Model.

Example: A struct containing GC references might be zeroed or overwritten in a non-thread-safe manner within a no-GC region while another thread is reading it, leading to undefined behavior.

### Recommendations

1. ❌ DON'T access locals across threads (especially if they contain GC references).
2. ✔️ DO use heap or unmanaged memory (for example, `System.Runtime.InteropServices.NativeMemory.Alloc*`) instead.

## 9. Unsafe bounds check removal

In C#, all idiomatic memory accesses include bounds checks by default.
The JIT compiler can remove these checks if it can prove that they are unnecessary, as in the example below.

```csharp
int SumAllElements(int[] array)
{
    int sum = 0;
    for (int i = 0; i < array.Length; i++)
    {
        // The JIT knows that within this loop body, i >= 0 and i < array.Length.
        // The JIT can reason that its own bounds check would be duplicative and
        // unnecessary, so it opts not to emit the bounds check into the final
        // generated code.
        sum += array[i];
    }
}
```

While the JIT is continually improving at recognizing such patterns, there are still scenarios where it leaves the checks in place,
potentially impacting performance in hot code. In such cases, you might be tempted to
use unsafe code to manually remove these checks without fully understanding the risks or
accurately assessing the performance benefits.

Consider for example the following method.

```csharp
int FetchAnElement(int[] array, int index)
{
    return array[index];
}
```

If the JIT cannot prove that `index` is always legally within the bounds of `array`, it will rewrite the method to look something like the below.

```csharp
int FetchAnElement_AsJitted(int[] array, int index)
{
    if (index < 0 || index >= array.Length)
        throw new IndexOutOfBoundsException();
    return array.GetElementAt(index);
}
```

To reduce the overhead from that check in hot code, you might be tempted to use unsafe-equivalent APIs (`Unsafe` and `MemoryMarshal`):

```csharp
int FetchAnElement_Unsafe1(int[] array, int index)
{
    // DANGER: The access below is not bounds-checked and could cause an access violation.
    return Unsafe.Add(ref MemoryMarshal.GetArrayDataReference(array), index);
}
```

Or use pinning and raw pointers:

```csharp
unsafe int FetchAnElement_Unsafe2(int[] array, int index)
{
    fixed (int* pArray = array)
    {
        // DANGER: The access below is not bounds-checked and could cause an access violation.
        return pArray[index];
    }
}
```

This can lead to random crashes or state corruption if `index` is outside the bounds of `array`.
Such unsafe transformations can have performance benefits on very hot paths, but these benefits are
often transient, as each .NET release improves the JIT's ability to eliminate unnecessary
bounds checks when it is safe to do so.

### Recommendations

1. ✔️ DO verify whether the latest version of .NET still can't eliminate the bounds check. If it can, rewrite using safe code. Otherwise, file an issue against the RyuJIT. Use this tracking issue as a good starting point.
2. ✔️ DO measure the real-world performance impact. If the performance gain is negligible or the code isn't proven to be hot outside of a trivial microbenchmark, rewrite using safe code.
3. ✔️ DO provide additional hints to the JIT, such as manual bounds checks before loops and saving fields to locals, as .NET Memory Model might conservatively prevent the JIT from removing bounds checks in some scenarios.
4. ✔️ DO guard code with `Debug.Assert` bounds checks if unsafe code is still necessary. Consider the example below.

```csharp
Debug.Assert(array is not null);
Debug.Assert((index >= 0) && (index < array.Length));
// Unsafe code here
```

You might even refactor these checks into reusable helper methods.

```csharp
[MethodImpl(MethodImplOptions.AggressiveInlining)]
static T UnsafeGetElementAt<T>(this T[] array, int index)
{
    Debug.Assert(array is not null);
    Debug.Assert((index >= 0) && (index < array.Length));
    return Unsafe.Add(ref MemoryMarshal.GetArrayDataReference(array), index);
}
```

Inclusion of `Debug.Assert` doesn't provide any soundness checks for Release builds, but it might help detect potential bugs in Debug builds.

## 10. Memory access coalescing

You might be tempted to use unsafe code to coalesce memory accesses to improve performance.
A classic example is the following code to write `"False"` into a char array:

```csharp
// Naive implementation
static void WriteToDestination_Safe(char[] dst)
{
    if (dst.Length < 5) { throw new ArgumentException(); }
    dst[0] = 'F';
    dst[1] = 'a';
    dst[2] = 'l';
    dst[3] = 's';
    dst[4] = 'e';
}

// Unsafe coalesced implementation
static void WriteToDestination_Unsafe(char[] destination)
{
    Span<char> dstSpan = destination;
    if (dstSpan.Length < 5) { throw new ArgumentException(); }
    ulong fals_val = BitConverter.IsLittleEndian ? 0x0073006C00610046ul : 0x00460061006C0073ul;
    MemoryMarshal.Write(MemoryMarshal.AsBytes(dstSpan.Slice(0, 4)), in fals_val); // Write "Fals" (4 chars)
    dstSpan[4] = 'e';                                                             // Write "e" (1 char)
}
```

In previous versions of .NET, the unsafe version using `MemoryMarshal` was measurably faster than
the straightforward safe version. However, modern versions of .NET contain a much improved JIT
that produces equivalent codegen for both cases. As of .NET 10, the x64 codegen is:

```asm
; WriteToDestination_Safe
cmp      eax, 5
jl       THROW_NEW_ARGUMENTEXCEPTION
mov      rax, 0x73006C00610046
mov      qword ptr [rdi+0x10], rax
mov      word  ptr [rdi+0x18], 101

; WriteToDestination_Unsafe
cmp      edi, 5
jl       THROW_NEW_ARGUMENTEXCEPTION
mov      rdi, 0x73006C00610046
mov      qword ptr [rax], rdi
mov      word  ptr [rax+0x08], 101
```

There is an even simpler and more readable version of the code:

```csharp
"False".CopyTo(dst);
```

As of .NET 10, this call produces identical codegen as above. It even has an additional benefit: it hints to the JIT that
strict per-element writes are not required to be atomic. The JIT might combine this hint with other contextual knowledge
to provide even more optimizations beyond what was discussed here.

### Recommendations

1. ✔️ DO prefer idiomatic safe code instead of unsafe for memory access coalescing:
    * Prefer `Span<T>.CopyTo` and `Span<T>.TryCopyTo` for copying data.
    * Prefer `String.Equals` and `Span<T>.SequenceEqual` for comparing data (even when using `StringComparer.OrdinalIgnoreCase`).
    * Prefer `Span<T>.Fill` for filling data and `Span<T>.Clear` for clearing data.
    * Be aware that per-element or per-fields writes/reads might be coalesced by JIT automatically.
2. ✔️ DO file an issue against dotnet/runtime if you write idiomatic code and observe that it is not optimized as expected.
3. ❌ DON'T coalesce memory accesses manually if you're not sure about misaligned memory access risks, atomicity guarantees, or the associated performance benefits.
