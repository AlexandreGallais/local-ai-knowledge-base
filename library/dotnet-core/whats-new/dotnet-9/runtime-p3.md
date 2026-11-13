---
title: "What's new in .NET 9 runtime (part 3 of 4)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-9/runtime.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET 9 runtime (part 3 of 4)

### Inlining improvements

One of .NET's goals for the JIT compiler's inliner is to remove as many restrictions that block a method from being inlined as possible. .NET 9 enables inlining of:

- Shared generics that require runtime lookups.

  As an example, consider the following methods:

  ```csharp
  static bool Test<T>() => Callee<T>();
  static bool Callee<T>() => typeof(T) == typeof(int);
  ```

  When `T` is a reference type like `string`, the runtime creates *shared generics*, which are special instantiations of `Test` and `Callee` that are shared by all ref-type `T` types. To make this work, the runtime builds dictionaries that map generic types to internal types. These dictionaries are specialized per generic type (or per generic method), and are accessed at runtime to obtain information about `T` and types that depend on `T`. Historically, code compiled just-in-time was only capable of performing these runtime lookups against the root method's dictionary. This meant the JIT compiler couldn't inline `Callee` into `Test`—there was no way for the inlined code from `Callee` to access the proper dictionary, even though both methods were instantiated over the same type.

  .NET 9 has lifted this restriction by freely enabling runtime type lookups in callees, meaning the JIT compiler can now inline methods like `Callee` into `Test`.

  Suppose we call `Test<string>` in another method. In pseudocode, the inlining looks like this:

  ```csharp
  static bool Test<string>() => typeof(string) == typeof(int);
  ```

  That type check can be computed during compilation, so the final code looks like this:

  ```csharp
  static bool Test<string>() => false;
  ```

  Improvements to the JIT compiler's inliner can have compound effects on other inlining decisions, resulting in significant performance wins. For example, the decision to inline `Callee` might enable the call to `Test<string>` to be inlined as well, and so on. This produced hundreds of benchmark improvements, with at least 80 benchmarks improving by 10% or more.

- Accesses to *thread-local statics* on Windows x64, Linux x64, and Linux Arm64.

  For `static` class members, exactly one instance of the member exists across all instances of the class, which "share" the member. If the value of a `static` member is unique to each thread, making that value thread-local can improve performance, because it eliminates the need for a concurrency primitive to safely access the `static` member from its containing thread.

  Previously, accesses to thread-local statics in Native AOT-compiled programs required the compiler to emit a call into the runtime to get the base address of the thread-local storage. Now, the compiler can inline these calls, resulting in far fewer instructions to access this data.

### PGO improvements: Type checks and casts

.NET 8 enabled dynamic profile-guided optimization (PGO) by default. NET 9 expands the JIT compiler's PGO implementation to profile more code patterns. When tiered compilation is enabled, the JIT compiler already inserts instrumentation into your program to profile its behavior. When it recompiles with optimizations, the compiler leverages the profile it built at runtime to make decisions specific to the current run of your program. In .NET 9, the JIT compiler uses PGO data to improve the performance of *type checks*.

Determining the type of an object requires a call into the runtime, which comes with a performance penalty. When the type of an object needs to be checked, the JIT compiler emits this call for the sake of correctness (compilers usually cannot rule out any possibilities, even if they seem improbable). However, if PGO data suggests an object is likely to be a specific type, the JIT compiler now emits a *fast path* that cheaply checks for that type, and falls back on the slow path of calling into the runtime only if necessary.

### Arm64 vectorization in .NET libraries

A new `EncodeToUtf8` implementation takes advantage of the JIT compiler's ability to emit multi-register load/store instructions on Arm64. This behavior allows programs to process larger chunks of data with fewer instructions. .NET apps across various domains should see throughput improvements on Arm64 hardware that supports these features. Some benchmarks cut their execution time by more than half.

### Arm64 code generation

The JIT compiler already has the ability to transform its representation of contiguous loads to use the `ldp` instruction (for loading values) on Arm64. .NET 9 extends this ability to *store* operations.

The `str` instruction stores data from a single register to memory, while the `stp` instruction stores data from a *pair* of registers. Using `stp` instead of `str` means the same task can be accomplished with fewer store operations, which improves execution time. Shaving off one instruction might seem like a small improvement, but if the code runs in a loop for a nontrivial number of iterations, the performance gains can add up quickly.

For example, consider the following snippet:

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
The values of `b.x`, `b.y`, and `b.z` are updated in the loop body. At the assembly level, each member could be stored with a `str` instruction; or using `stp`, two of the stores (`b.x` and `b.y`, or `b.y` and `b.z`, because these pairs are contiguous in memory) can be handled with one instruction. To use the `stp` instruction to store to `b.x` and `b.y` simultaneously, the compiler also needs to determine that the computations `b.x + (dt * b.vx)` and `b.y + (dt * b.vy)` are independent of one another and can be performed before storing to `b.x` and `b.y`.

### Faster exceptions

The CoreCLR runtime has adopted a new exception handling approach that improves the performance of exception handling. The new implementation is based on the NativeAOT runtime's exception-handling model. The change removes support for Windows structured exception handling (SEH) and its emulation on Unix. The new approach is supported in all environment except for Windows x86 (32-bit).

The new exception handling implementation is 2-4 times faster, per some exception handling micro-benchmarks. The following perf improvements were measured in the perf lab:

- Windows x64: <https://github.com/dotnet/perf-autofiling-issues/issues/32280>
- Windows Arm64: <https://github.com/dotnet/perf-autofiling-issues/issues/32016>
- Linux x64: <https://github.com/dotnet/perf-autofiling-issues/issues/31367>
- Linux Arm64: <https://github.com/dotnet/perf-autofiling-issues/issues/31631>

The new implementation is enabled by default. However, should you need to switch back to the legacy exception handling behavior, you can do that in either of the following ways:

- Set `System.Runtime.LegacyExceptionHandling` to `true` in the `runtimeconfig.json` file.
- Set the `DOTNET_LegacyExceptionHandling` environment variable to `1`.

### Code layout

Compilers typically reason about a program's control flow using basic *blocks*, where each block is a chunk of code that can only be entered at the first instruction and exited via the last instruction. The order of basic blocks is important. If a block ends with a branch instruction, control flow transfers to another block. One goal of block reordering is to reduce the number of branch instructions in the generated code by maximizing *fall-through* behavior. If each basic block is followed by its most-likely successor, it can "fall into" its successor without needing a jump.

Until recently, the block reordering in the JIT compiler was limited by the flowgraph implementation. In .NET 9, the JIT compiler's block reordering algorithm has been replaced with a simpler, more global approach. The flowgraph data structures have been refactored to:

- Remove some restrictions around block ordering.
- Ingrain execution likelihoods into every control-flow change between blocks.

In addition, profile data is propagated and maintained as the method's flowgraph is transformed.

### Reduced address exposure

In .NET 9, the JIT compiler can better track the usage of local variable addresses and avoid unnecessary *address exposure*.

When the address of a local variable is used, the JIT compiler must take extra precautions when optimizing the method. For example, suppose the compiler is optimizing a method that passes the address of a local variable in a call to another method. Since the callee might use the address to access the local variable, to maintain correctness, the compiler avoids transforming the variable. Addressed-exposed locals can significantly inhibit the compiler's optimization potential.

### AVX10v1 support

New APIs have been added for AVX10, which is a new SIMD instruction set from Intel. You can accelerate your .NET applications on AVX10-enabled hardware with vectorized operations using the new `System.Runtime.Intrinsics.X86.Avx10v1` APIs.

### Hardware intrinsic code generation

Many hardware intrinsic APIs expect users to pass constant values for certain parameters. These constants are encoded directly into the intrinsic's underlying instruction, rather than being loaded into registers or accessed from memory. If a constant isn't provided, the intrinsic is replaced with a call to a fallback implementation that's functionally equivalent, but slower.

Consider the following example:

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
The use of `size` in the call to `Sse2.ShiftRightLogical128BitLane` can be substituted with the constant 1, and under normal circumstances, the JIT compiler is already capable of this substitution optimization. But when determining whether to generate the accelerated or fallback code for `Sse2.ShiftRightLogical128BitLane`, the compiler detects that a variable is being passed instead of a constant and prematurely decides against "intrinsifying" the call. Starting in .NET 9, the compiler recognizes more cases like this and substitutes the variable argument with its constant value, thus generating the accelerated code.

### Constant folding for floating point and SIMD operations

*Constant folding* is an existing optimization in the JIT compiler. *Constant folding* refers to the replacement of expressions that can be computed at compile time with the constants they evaluate to, thus eliminating computations at runtime. .NET 9 adds new constant-folding capabilities:

- For floating-point binary operations, where one of the operands is a constant:
  - `x + NaN` is now folded into `NaN`.
  - `x * 1.0` is now folded into `x`.
  - `x + -0` is now folded into `x`.
- For hardware intrinsics. For example, assuming `x` is a `Vector<T>`:
  - `x + Vector<T>.Zero` is now folded into `x`.
  - `x & Vector<T>.Zero` is now folded into `Vector<T>.Zero`.
  - `x & Vector<T>.AllBitsSet` is now folded into `x`.

### Arm64 SVE support

.NET 9 introduces experimental support for the Scalable Vector Extension (SVE), a SIMD instruction set for ARM64 CPUs. .NET already supported the NEON instruction set, so on NEON-capable hardware, your applications can leverage 128-bit vector registers. SVE supports flexible vector lengths all the way up to 2048 bits, unlocking more data processing per instruction. In .NET 9, `System.Numerics.Vector`1` is 128 bits wide when targeting SVE, and future work will enable scaling of its width to match the target machine's vector register size. You can accelerate your .NET applications on SVE-capable hardware using the new `System.Runtime.Intrinsics.Arm.Sve` APIs.

> **Note:**
> SVE support in .NET 9 is experimental. The APIs under `System.Runtime.Intrinsics.Arm.Sve` are marked with `System.Diagnostics.CodeAnalysis.ExperimentalAttribute`, which means they're subject to change in future releases. Additionally, debugger stepping and breakpoints through SVE-generated code might not function properly, resulting in application crashes or corruption of data.
