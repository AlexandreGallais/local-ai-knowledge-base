---
title: "What's new in .NET 9 runtime (part 4 of 4)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-9/runtime.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET 9 runtime (part 4 of 4)

### Object stack allocation for boxes

Value types, such as `int` and `struct`, are typically allocated on the stack instead of the heap. However, to enable various code patterns, they're frequently "boxed" into objects.

Consider the following snippet:

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
`Compare` is conveniently written such that if you wanted to compare other types, like strings or `double` values, you could reuse the same implementation. But in this example, it also has the performance drawback of requiring any value types that are passed to it to be *boxed*.

The x64 assembly code generated for `RunIt` is as follows:

```al
push     rbx
sub      rsp, 32
mov      rcx, 0x7FFB9F8074D0      ; System.Int32
call     CORINFO_HELP_NEWSFAST
mov      rbx, rax
mov      dword ptr [rbx+0x08], 3
mov      rcx, 0x7FFB9F8074D0      ; System.Int32
call     CORINFO_HELP_NEWSFAST
mov      dword ptr [rax+0x08], 4
add      rbx, 8
mov      ecx, dword ptr [rbx]
cmp      ecx, dword ptr [rax+0x08]
sete     al
movzx    rax, al
xor      ecx, ecx
mov      edx, 100
test     eax, eax
mov      eax, edx
cmovne   eax, ecx
add      rsp, 32
pop      rbx
ret
```

The calls to `CORINFO_HELP_NEWSFAST` are the heap allocations for the boxed integer arguments. Also, notice that there isn't any call to `Compare`; the compiler decided to inline it into `RunIt`. This inlining means the boxes never "escape." In other words, throughout the execution of `Compare`, it knows `x` and `y` are actually integers, and they can be safely unboxed them without affecting the comparison logic.

Starting in .NET 9, the 64-bit compiler allocates unescaped boxes on the stack, which unlocks several other optimizations. In this example, the compiler now omits the heap allocations, but because it knows `x` and `y` are 3 and 4, it can also omit the body of `Compare`; the compiler can determine `x.Equals(y)` is false at compile time, so `RunIt` should always return 100. Here's the updated assembly:

```al
mov      eax, 100
ret
```
