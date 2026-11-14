---
title: "What's new in .NET 9 runtime (part 2 of 4)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-9/runtime.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in .NET 9 runtime (part 2 of 4)

## Performance improvements

The following performance improvements have been made for .NET 9:

- Loop optimizations
- Inlining improvements
- PGO improvements: Type checks and casts
- Arm64 vectorization in .NET libraries
- Arm64 code generation
- Faster exceptions
- Code layout
- Reduced address exposure
- AVX10v1 support
- Hardware intrinsic code generation
- Constant folding for floating point and SIMD operations
- Arm64 SVE support
- Object stack allocation for boxes

### Loop optimizations

Improving code generation for loops is a priority for .NET 9. The following improvements are now available:

- Induction-variable widening
- Post-indexed addressing
- Strength reduction
- Loop counter variable direction

> **Note:**
> Induction-variable widening and post-indexed addressing are similar: they both optimize memory accesses with loop-index variables. However, they take different approaches since Arm64 offers a CPU capability and x64 doesn't. Induction-variable widening was implemented for x64 due to differences in CPU/ISA capability and needs.

#### Induction-variable widening

The 64-bit compiler features a new optimization called *induction variable (IV) widening*.

An IV is a variable whose value changes as the containing loop iterates. In the following `for` loop, `i` is an IV: `for (int i = 0; i < 10; i++)`. If the compiler can analyze how an IV's value evolves over its loop's iterations, it can produce more performant code for related expressions.

Consider the following example that iterates through an array:

```csharp
﻿using System;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics.X86;
using System.Runtime.Intrinsics;

class Runtime
{
    static int Sum(int[] nums)
    {
        int sum = 0;
        for (int i = 0; i < nums.Length; i++)
        {
            sum += nums[i];
        }

        return sum;
    }

    static int Sum2(Span<int> nums)
    {
        int sum = 0;
        ref int p = ref MemoryMarshal.GetReference(nums);
        ref int end = ref Unsafe.Add(ref p, nums.Length);
        while (Unsafe.IsAddressLessThan(ref p, ref end))
        {
            sum += p;
            p = ref Unsafe.Add(ref p, 1);
        }

        return sum;
    }

    class Body { public double x, y, z, vx, vy, vz, mass; }

    static void Advance(double dt, Body[] bodies)
    {
        foreach (Body b in bodies)
        {
            b.x += dt * b.vx;
            b.y += dt * b.vy;
            b.z += dt * b.vz;
        }
    }

    static byte Test1()
    {
        Vector128<byte> v = Vector128<byte>.Zero;
        const byte size = 1;
        v = Sse2.ShiftRightLogical128BitLane(v, size);
        return Sse41.Extract(v, 0);
    }

    static bool Compare(object? x, object? y)
    {
        if ((x == null) || (y == null))
        {
            return x == y;
        }

        return x.Equals(y);
    }

    public static int RunIt()
    {
        bool result = Compare(3, 4);
        return result ? 0 : 100;
    }
}
```
The index variable, `i`, is 4 bytes in size. At the assembly level, 64-bit registers are typically used to hold array indices on x64, and in previous .NET versions, the compiler generated code that zero-extended `i` to 8 bytes for the array access, but continued to treat `i` as a 4-byte integer elsewhere. However, extending `i` to 8 bytes requires an additional instruction on x64. With IV widening, the 64-bit JIT compiler now widens `i` to 8 bytes throughout the loop, omitting the zero extension. Looping over arrays is very common, and the benefits of this instruction removal quickly add up.

#### Post-indexed addressing on Arm64

Index variables are frequently used to read sequential regions of memory. Consider the idiomatic `for` loop:

```csharp
﻿using System;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics.X86;
using System.Runtime.Intrinsics;

class Runtime
{
    static int Sum(int[] nums)
    {
        int sum = 0;
        for (int i = 0; i < nums.Length; i++)
        {
            sum += nums[i];
        }

        return sum;
    }

    static int Sum2(Span<int> nums)
    {
        int sum = 0;
        ref int p = ref MemoryMarshal.GetReference(nums);
        ref int end = ref Unsafe.Add(ref p, nums.Length);
        while (Unsafe.IsAddressLessThan(ref p, ref end))
        {
            sum += p;
            p = ref Unsafe.Add(ref p, 1);
        }

        return sum;
    }

    class Body { public double x, y, z, vx, vy, vz, mass; }

    static void Advance(double dt, Body[] bodies)
    {
        foreach (Body b in bodies)
        {
            b.x += dt * b.vx;
            b.y += dt * b.vy;
            b.z += dt * b.vz;
        }
    }

    static byte Test1()
    {
        Vector128<byte> v = Vector128<byte>.Zero;
        const byte size = 1;
        v = Sse2.ShiftRightLogical128BitLane(v, size);
        return Sse41.Extract(v, 0);
    }

    static bool Compare(object? x, object? y)
    {
        if ((x == null) || (y == null))
        {
            return x == y;
        }

        return x.Equals(y);
    }

    public static int RunIt()
    {
        bool result = Compare(3, 4);
        return result ? 0 : 100;
    }
}
```
For each iteration of the loop, the index variable `i` is used to read an integer in `nums`, and then `i` is incremented. In Arm64 assembly, these two operations look as follows:

```al
ldr w0, [x1]
add x1, x1, #4
```

`ldr w0, [x1]` loads the integer at the memory address in `x1` into `w0`; this corresponds to the access of `nums[i]` in the source code. Then, `add x1, x1, #4` increases the address in `x1` by four bytes (the size of an integer), moving to the next integer in `nums`. This instruction corresponds to the `i++` operation executed at the end of each iteration.

Arm64 supports post-indexed addressing, where the "index" register is automatically incremented after its address is used. This means that two instructions can be combined into one, making the loop more efficient. The CPU only needs to decode one instruction instead of two, and the loop's code is now more cache-friendly.

Here's what the updated assembly looks like:

```al
ldr w0, [x1], #0x04
```

The `#0x04` at the end means the address in `x1` is incremented by four bytes after it's used to load an integer into `w0`. The 64-bit compiler now uses post-indexed addressing when generating Arm64 code.

#### Strength reduction

Strength reduction is a compiler optimization where an operation is replaced with a faster, logically equivalent operation. This technique is especially useful for optimizing loops. Consider the idiomatic `for` loop:

```csharp
﻿using System;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics.X86;
using System.Runtime.Intrinsics;

class Runtime
{
    static int Sum(int[] nums)
    {
        int sum = 0;
        for (int i = 0; i < nums.Length; i++)
        {
            sum += nums[i];
        }

        return sum;
    }

    static int Sum2(Span<int> nums)
    {
        int sum = 0;
        ref int p = ref MemoryMarshal.GetReference(nums);
        ref int end = ref Unsafe.Add(ref p, nums.Length);
        while (Unsafe.IsAddressLessThan(ref p, ref end))
        {
            sum += p;
            p = ref Unsafe.Add(ref p, 1);
        }

        return sum;
    }

    class Body { public double x, y, z, vx, vy, vz, mass; }

    static void Advance(double dt, Body[] bodies)
    {
        foreach (Body b in bodies)
        {
            b.x += dt * b.vx;
            b.y += dt * b.vy;
            b.z += dt * b.vz;
        }
    }

    static byte Test1()
    {
        Vector128<byte> v = Vector128<byte>.Zero;
        const byte size = 1;
        v = Sse2.ShiftRightLogical128BitLane(v, size);
        return Sse41.Extract(v, 0);
    }

    static bool Compare(object? x, object? y)
    {
        if ((x == null) || (y == null))
        {
            return x == y;
        }

        return x.Equals(y);
    }

    public static int RunIt()
    {
        bool result = Compare(3, 4);
        return result ? 0 : 100;
    }
}
```
The following x64 assembly code shows a snippet of the code that's generated for the loop's body:

```al
add ecx, dword ptr [rax+4*rdx+0x10]
inc edx
```

These instructions correspond to the expressions `sum += nums[i]` and `i++`, respectively. `rcx` (`ecx` holds the lower 32 bits of this register) contains the value of `sum`, `rax` contains the base address of `nums`, and `rdx` contains the value of `i`. To compute the address of `nums[i]`, the index in `rdx` is **multiplied** by four (the size of an integer). This offset is then **added** to the base address in `rax`, plus some padding. (After the integer at `nums[i]` is read, it's added to `rcx` and the index in `rdx` is incremented.) In other words, each array access requires a multiplication *and* an addition operation.

Multiplication is more expensive than addition, and replacing the former with the latter is a classic motivation for strength reduction. To avoid the computation of the element's address on each memory access, you could rewrite the example to access the integers in `nums` using a pointer rather than an index variable:

```csharp
﻿using System;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics.X86;
using System.Runtime.Intrinsics;

class Runtime
{
    static int Sum(int[] nums)
    {
        int sum = 0;
        for (int i = 0; i < nums.Length; i++)
        {
            sum += nums[i];
        }

        return sum;
    }

    static int Sum2(Span<int> nums)
    {
        int sum = 0;
        ref int p = ref MemoryMarshal.GetReference(nums);
        ref int end = ref Unsafe.Add(ref p, nums.Length);
        while (Unsafe.IsAddressLessThan(ref p, ref end))
        {
            sum += p;
            p = ref Unsafe.Add(ref p, 1);
        }

        return sum;
    }

    class Body { public double x, y, z, vx, vy, vz, mass; }

    static void Advance(double dt, Body[] bodies)
    {
        foreach (Body b in bodies)
        {
            b.x += dt * b.vx;
            b.y += dt * b.vy;
            b.z += dt * b.vz;
        }
    }

    static byte Test1()
    {
        Vector128<byte> v = Vector128<byte>.Zero;
        const byte size = 1;
        v = Sse2.ShiftRightLogical128BitLane(v, size);
        return Sse41.Extract(v, 0);
    }

    static bool Compare(object? x, object? y)
    {
        if ((x == null) || (y == null))
        {
            return x == y;
        }

        return x.Equals(y);
    }

    public static int RunIt()
    {
        bool result = Compare(3, 4);
        return result ? 0 : 100;
    }
}
```
The source code is more complicated, but it's logically equivalent to the initial implementation. Also, the assembly looks better:

```al
add ecx, dword ptr [rdx]
add rdx, 4
```

`rcx` (`ecx` holds the lower 32 bits of this register) still holds the value of `sum`, but `rdx` now holds the address pointed to by `p`, so accessing elements in `nums` just requires us to dereference `rdx`. All the multiplication and addition from the first example has been replaced by a single `add` instruction to move the pointer forward.

In .NET 9, the JIT compiler *automatically* transforms the first indexing pattern into the second without requiring you to rewrite any code.

#### Loop counter variable direction

The 64-bit compiler now recognizes when a loop's counter variable is used only to control the number of iterations, and transforms the loop to count down instead of up.

In the idiomatic `for (int i = ...)` pattern, the counter variable typically increases. Consider the following example:

```csharp
for (int i = 0; i < 100; i++)
{
    DoSomething();
}
```

However, on many architectures, it's more performant to decrement the loop's counter, like so:

```csharp
for (int i = 100; i > 0; i--)
{
    DoSomething();
}
```

For the first example, the compiler needs to emit an instruction to increment `i`, followed by an instruction to perform the `i < 100` comparison, followed by a conditional jump to continue the loop if the condition is still `true`—that's three instructions in total. However, if the counter's direction is flipped, one less instruction is needed. For example, on x64, the compiler can use the `dec` instruction to decrement `i`; when `i` reaches zero, the `dec` instruction sets a CPU flag that can be used as the condition for a jump instruction immediately following the `dec`.

The code size reduction is small, but if the loop runs for a nontrivial number of iterations, the performance improvement can be significant.
