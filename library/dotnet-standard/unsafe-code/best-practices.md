---
title: "Unsafe code best practices - .NET (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/unsafe-code/best-practices.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Unsafe code best practices

This article contains fine-grained recommendations for specific unsafe patterns, the risks
they entail, and how to mitigate those risks. These guidelines target all developers who are
writing or reviewing unsafe code in C#. Other
.NET languages such as F# and Visual Basic are outside of the scope of this article, although some recommendations
might be applicable to those languages as well.

## Glossary

* AVE - Access violation exception.
* Byref - A managed pointer (`ref T t`) that's similar to unmanaged pointer but tracked
by the GC. Typically points to arbitrary parts of objects or stack. Reference is effectively a managed pointer with +0 offset.
* CVE - Publicly disclosed cybersecurity vulnerabilities.
* JIT - Just-in-time compiler (RyuJIT in CoreCLR and NativeAOT).
* PGO - Profile-guided optimization.
* Unmanaged pointer (or raw pointer) - A pointer (`T* p`) that points to arbitrary memory location and is not managed or tracked by the GC.

For other terms, see .NET Runtime Glossary.

## Common unreliable patterns

C# provides a safe environment where developers don't need to worry about the internal workings of the runtime and the GC. Unsafe code allows you to bypass these safety checks, potentially introducing unreliable patterns that can lead to memory corruption. While such patterns might be useful in certain scenarios, you should use them with caution and only when absolutely necessary. Not only do C# and .NET not provide tools to verify the soundness of unsafe code (as various C/C++ sanitizers might provide), GC-specific behaviors might introduce additional risks in unsafe C# beyond those that traditional C/C++ developers might be familiar with.

Unsafe code around managed references should be written with the following conservative assumptions in mind:

* The GC can interrupt the execution of any method at any point of time at any instruction.
* The GC can move objects in memory and update all *tracked* references.
* The GC knows precisely when references are no longer needed.

A classic example of heap corruption occurs when the GC loses track of an object reference or
treats invalid pointers as heap references. This often results in non-deterministic crashes
or memory corruption. Heap corruption bugs are particularly challenging to diagnose and reproduce because:

* These issues can remain hidden for a long time and only manifest after an unrelated code change or runtime update.
* They often require precise timing to reproduce, such as the GC interrupting execution at a specific location and starting heap compaction, which is a rare and nondeterministic event.

The next sections describe common unsafe patterns with ✔️ DO and ❌ DON'T recommendations.

## 1. Untracked managed pointers (`Unsafe.AsPointer` and friends)

It's not possible to convert a managed (tracked) pointer to an unmanaged (untracked)
pointer in safe C#. When such need arises, it might be tempting to use `System.Runtime.CompilerServices.Unsafe.AsPointer``1(``0@)`
to avoid the overhead of a `fixed` statement. While there are valid
use cases for that, it introduces a risk of creating untracked pointers to moveable objects.
Example:

```csharp
unsafe void UnreliableCode(ref int x)
{
    int* nativePointer = (int*)Unsafe.AsPointer(ref x);
    nativePointer[0] = 42;
}
```

If the GC interrupts the execution of the `UnreliableCode` method right after the pointer has been read
(the address referenced by `x`) and relocates the referenced object, the GC will correctly update the
location stored in `x` but won't know anything about `nativePointer` and will not update the value
it contains. At that point, writing to `nativePointer` is writing to arbitrary memory.

```csharp
unsafe void UnreliableCode(ref int x)
{
    int* nativePointer = (int*)Unsafe.AsPointer(ref x);
    // <-- GC happens here between the two lines of code and updates `x` to point to a new location.
    // However, `nativePointer` still points to the old location as it's not reported to the GC
    
    nativePointer[0] = 42; // Potentially corrupting write, access violation, or other issue.
}
```

Once GC resumes the execution of the method, it will write 42 into the old location of `x`, which might lead
to an unexpected exception, general global state corruption, or process termination via an access violation.

The recommended solution is instead to use the `fixed` keyword and `&` address-of operator to ensure that the
GC cannot relocate the target reference for the duration of the operation.

```csharp
unsafe void ReliableCode(ref int x)
{
    fixed (int* nativePointer = &x) // `x` cannot be relocated for the duration of this block.
    {
        nativePointer[0] = 42;
    }
}
```

### Recommendations

1. ❌ DON'T use `ref X` arguments with an implicit contract that `X` is always stack-allocated, pinned, or otherwise not relocatable by the GC. Same applies to plain objects and Spans - don't introduce non-obvious caller-based contracts about their lifetimes in methods signatures. Consider instead taking a ref struct argument or changing the argument to be a raw pointer type (`X*`).
2. ❌ DON'T use a pointer from `System.Runtime.CompilerServices.Unsafe.AsPointer``1(``0@)` if it can outlive the original object it is pointing to. Per the API's documentation), it's up to the caller of `System.Runtime.CompilerServices.Unsafe.AsPointer``1(``0@)` to guarantee that the GC cannot relocate the reference. Ensure it's clearly visible to code reviewers that the caller has fulfilled this prerequisite.
3. ✔️ DO use GCHandle or `fixed` scopes instead of `System.Runtime.CompilerServices.Unsafe.AsPointer``1(``0@)` to define explicit scopes for unmanaged pointers and to ensure that the object is always pinned.
4. ✔️ DO use unmanaged pointers (with `fixed`) instead of byrefs when you need to align an array to a specific boundary. This ensures the GC won't relocate the object and invalidate any alignment assumptions your logic might rely upon.

## 2. Exposing pointers outside of the `fixed` scope

While the fixed
keyword defines a scope for the pointer obtained from the pinned object, it's still possible for that pointer
to escape the `fixed` scope and introduce bugs, as C# doesn't provide any ownership/lifecycle protections for it.
A typical example is the following snippet:

```csharp
unsafe int* GetPointerToArray(int[] array)
{
    fixed (int* pArray = array)
    {
        _ptrField = pArray; // Bug!

        Method(pArray);     // Bug if `Method` allows `pArray` to escape,
                            // perhaps by assigning it to a field.

        return pArray;      // Bug!

        // And other ways to escape the scope.
    }
}
```

In this example, the array is pinned properly using the `fixed` keyword (ensuring the GC can't relocate it within the `fixed` block),
but then the pointer is exposed outside of the `fixed` block. This creates a dangling pointer whose dereference will result in undefined behavior.

### Recommendations

1. ✔️ DO make sure that pointers in `fixed` blocks do not leave the defined scope.
2. ✔️ DO prefer safe low-level primitives with built-in escape analysis, such as C#'s ref struct. For more information, see Safe context constraint.

## 3. Internal implementation details of the runtime and libraries

While accessing or relying on internal implementation details is bad practice in general (and not supported by .NET), it's worth calling out specific commonly observed cases. This is not intended to be an exhaustive list of all possible things that could go wrong when code inappropriately relies on an internal implementation detail.

### Recommendations

1. ❌ DON'T alter or read any parts of an object's header.
   * Object headers might differ across runtimes.
   * In CoreCLR, the object header cannot be accessed safely without pinning the object first.
   * Never change object's type by modifying the MethodTable pointer.
2. ❌ DON'T store any data in an object's padding. Don't assume padding contents will be preserved or that padding is always zeroed by default.
3. ❌ DON'T make assumptions about the sizes and offsets of anything other than primitives and structs with sequential or explicit layout. Even then, exceptions exist, such as when GC handles are involved.
4. ❌ DON'T invoke nonpublic methods, access nonpublic fields, or mutate readonly fields in BCL types with reflection or unsafe code.
5. ❌ DON'T assume any given nonpublic member in the BCL will always be present or will have a specific shape. The .NET team does occasionally modify or remove nonpublic APIs in servicing releases.
6. ❌ DON'T change `static readonly` fields using reflection or unsafe code, as they're assumed to be constant. For example, RyuJIT usually inlines them as explicit constants.
7. ❌ DON'T simply assume that a reference is non-relocatable. This guidance applies to string and UTF-8 (`"..."u8`) literals, static fields, RVA fields, LOH objects, and so on.
   * These are runtime implementation details that might hold for some runtimes but not for others.
   * Unmanaged pointers to such objects might not stop assemblies from being unloaded, causing the pointers to become dangling. Use `fixed` scopes to ensure correctness.

   ```csharp
   ReadOnlySpan<int> rva = [1, 2, 4, 4];
   int* p = (int*)Unsafe.AsPointer(ref MemoryMarshal.GetReference(rva));
   // Bug! The assembly containing the RVA field might be unloaded at this point
   // and `p` becomes a dangling pointer.
   int value = p[0]; // Access violation or other issue.
   ```

8. ❌ DON'T write code that relies on the implementation details of a specific runtime.

## 4. Invalid managed pointers (even if they are never dereferenced)

Certain categories of code end up leaning on pointer manipulation and arithmetic, and such code
often has a choice between using unmanaged pointers (`T* p`) and managed pointers (`ref T p`).
These pointers can be manipulated arbitrarily, for instance, via operators on unmanaged pointers (`p++`) and
via `Unsafe` methods on managed pointers (`p = ref Unsafe.Add(ref p, 1)`). Both are considered "unsafe code"
and it's possible to create unreliable patterns with both. However, for certain algorithms, it can be easier to
accidentally create GC-unsafe patterns when manipulating managed pointers. Since unmanaged pointers aren't tracked
by the GC, the value they contain is only relevant when dereferenced by the developer's code. In contrast,
a managed pointer's value is relevant not only when it's dereferenced by the developer's code, but also
when it's examined by the GC. Thus, a developer can create invalid unmanaged pointers without consequence
as long as they're not dereferenced, but creating any invalid managed pointer is a bug. Example:

```csharp
unsafe void UnmanagedPointers(int[] array)
{
    fixed (int* p = array)
    {
        int* invalidPtr = p - 1000;
        // invalidPtr is pointing to an undefined location in memory
        // it's ok as long as it's not dereferenced.

        int* validPtr = invalidPtr + 1000; // Returning back to the original location
        *validPtr = 42; // OK
    }
}
```

However, similar code using byrefs (managed pointers) is invalid.

```csharp
void ManagedPointers_Incorrect(int[] array)
{
    ref int invalidPtr = ref Unsafe.Add(ref array[0], -1000); // Already a bug!
    ref int validPtr = ref Unsafe.Add(ref invalidPtr, 1000);
    validPtr = 42; // possibly corrupting write
}
```

While the managed implementation here avoids the minor pinning overhead, it is unsound because
`invalidPtr` *might* become an exterior pointer while the actual address of `array[0]` is being updated by GC.
Such bugs are subtle, and even .NET has run afoul of them during development.

### Recommendations

1. ❌ DON'T create invalid managed pointers, even if they are not dereferenced or they are located inside never-executed code paths.
   * For more information on what constitutes a valid managed pointer, see ECMA-335, Sec. II.14.4.2 Managed pointers; and ECMA-335 CLI Specification Addendum, Sec. II.14.4.2.
2. ✔️ DO use pinned unmanaged pointers if the algorithm requires such manipulations.

## 5. Reinterpret-like type casts

While all kinds of struct-to-class or class-to-struct casts are an undefined behavior by definition,
it's also possible to encounter unreliable patterns with struct-to-struct or class-to-class conversions.
A typical example of an unreliable pattern is the following code:

```csharp
struct S1
{
    string a;
    nint b;
}

struct S2
{
    string a;
    string b;
}

S1 s1 = ...
S2 s2 = Unsafe.As<S1, S2>(ref s1); // Bug! A random nint value becomes a reference reported to the GC.
```

And even if the layout is similar, you should still be careful when GC references (fields) are involved.

### Recommendations

1. ❌ DON'T cast structs to classes or vice versa.
2. ❌ DON'T use `Unsafe.As` for struct-to-struct or class-to-class conversions unless you're absolutely sure that the cast is legal. For more information, see the _Remarks_ section of the `Unsafe.As` API docs).
3. ✔️ DO prefer safer field-by-field copying, external libraries such as AutoMapper, or Source Generators for such conversions.
4. ✔️ DO prefer `Unsafe.BitCast` over `Unsafe.As`, as `BitCast` provides some rudimentary usage checks. Note that these checks do not provide full correctness guarantees, meaning `BitCast` is still considered an unsafe API.
