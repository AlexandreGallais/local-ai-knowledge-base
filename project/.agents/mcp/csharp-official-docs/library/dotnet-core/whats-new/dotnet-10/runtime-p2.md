---
title: "What's new in .NET 10 runtime (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-10/runtime.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in .NET 10 runtime (part 2 of 2)

## Stack allocation

Stack allocation reduces the number of objects the GC has to track, and it also unlocks other optimizations. For example, after an object is stack-allocated, the JIT can consider replacing it entirely with its scalar values. Because of this, stack allocation is key to reducing the abstraction penalty of reference types. .NET 10 adds stack allocation for small arrays of  value types _and_ small arrays of reference types. It also includes escape analysis for local struct fields and delegates. (Objects that can't escape can be allocated on the stack.)

### Small arrays of value types

The JIT now stack-allocates small, fixed-sized arrays of value types that don't contain GC pointers when they can be guaranteed not to outlive their parent method. In the following example, the JIT knows at compile time that `numbers` is an array of only three integers that doesn't outlive a call to `Sum`, and therefore allocates it on the stack.

```csharp
static void Sum()
{
    int[] numbers = {1, 2, 3};
    int sum = 0;

    for (int i = 0; i < numbers.Length; i++)
    {
        sum += numbers[i];
    }

    Console.WriteLine(sum);
}
```

### Small arrays of reference types

.NET 10 extends the .NET 9 stack allocation improvements to small arrays of reference types. Previously, arrays of reference types were always allocated on the heap, even when their lifetime was scoped to a single method. Now, the JIT can stack-allocate such arrays when it determines that they don't outlive their creation context. In the following example, the array `words` is now allocated on the stack.

```csharp
static void Print()
{
    string[] words = {"Hello", "World!"};
    foreach (var str in words)
    {
        Console.WriteLine(str);
    }
}
```

### Escape analysis

*Escape analysis* determines if an object can outlive its parent method. Objects "escape" when assigned to non-local variables or passed to functions not inlined by the JIT. If an object can't escape, it can be allocated on the stack. .NET 10 includes escape analysis for:

- Local struct fields
- Delegates

#### Local struct fields

Starting in .NET 10, the JIT considers objects referenced by *struct fields*, which enables more stack allocations and reduces heap overhead. Consider the following example:

```csharp
public class Program
{
    struct GCStruct
    {
        public int[] arr;
    }

    public static int Main()
    {
        int[] x = new int[10];
        GCStruct y = new GCStruct() { arr = x };
        return y.arr[0];
    }
}
```

Normally, the JIT stack-allocates small, fixed-sized arrays that don't escape, such as `x`. Its assignment to `y.arr` doesn't cause `x` to escape, because `y` doesn't escape either. However, the JIT's previous escape analysis implementation didn't model struct field references. In .NET 9, the x64 assembly generated for `Main` includes a call to `CORINFO_HELP_NEWARR_1_VC` to allocate `x` on the heap, indicating it was marked as escaping:

```asm
Program:Main():int (FullOpts):
       push     rax
       mov      rdi, 0x719E28028A98      ; int[]
       mov      esi, 10
       call     CORINFO_HELP_NEWARR_1_VC
       mov      eax, dword ptr [rax+0x10]
       add      rsp, 8
       ret
```

In .NET 10, the JIT no longer marks objects referenced by local struct fields as escaping, as long as the struct in question does not escape. The assembly now looks like this (notice that the heap allocation helper call is gone):

```asm
Program:Main():int (FullOpts):
       sub      rsp, 56
       vxorps   xmm8, xmm8, xmm8
       vmovdqu  ymmword ptr [rsp], ymm8
       vmovdqa  xmmword ptr [rsp+0x20], xmm8
       xor      eax, eax
       mov      qword ptr [rsp+0x30], rax
       mov      rax, 0x7F9FC16F8CC8      ; int[]
       mov      qword ptr [rsp], rax
       lea      rax, [rsp]
       mov      dword ptr [rax+0x08], 10
       lea      rax, [rsp]
       mov      eax, dword ptr [rax+0x10]
       add      rsp, 56
       ret
```

For more information about de-abstraction improvements in .NET 10, see dotnet/runtime#108913.

#### Delegates

When source code is compiled to IL, each delegate is transformed into a closure class with a method corresponding to the delegate's definition and fields matching any captured variables. At runtime, a closure object is created to instantiate the captured variables, along with a `Func` object to invoke the delegate. If escape analysis determines the `Func` object won't outlive its current scope, the JIT allocates it on the stack.

Consider the following `Main` method:

```csharp
 public static int Main()
{
    int local = 1;
    int[] arr = new int[100];
    var func = (int x) => x + local;
    int sum = 0;

    foreach (int num in arr)
    {
        sum += func(num);
    }

    return sum;
}
```

Previously, the JIT produces the following abbreviated x64 assembly for `Main`. Before entering the loop, `arr`, `func`, and the closure class for `func` called `Program+<>c__DisplayClass0_0` are all allocated on the _heap_, as indicated by the `CORINFO_HELP_NEW*` calls.

```asm
       ; prolog omitted for brevity
       mov      rdi, 0x7DD0AE362E28      ; Program+<>c__DisplayClass0_0
       call     CORINFO_HELP_NEWSFAST
       mov      rbx, rax
       mov      dword ptr [rbx+0x08], 1
       mov      rdi, 0x7DD0AE268A98      ; int[]
       mov      esi, 100
       call     CORINFO_HELP_NEWARR_1_VC
       mov      r15, rax
       mov      rdi, 0x7DD0AE4A9C58      ; System.Func`2[int,int]
       call     CORINFO_HELP_NEWSFAST
       mov      r14, rax
       lea      rdi, bword ptr [r14+0x08]
       mov      rsi, rbx
       call     CORINFO_HELP_ASSIGN_REF
       mov      rsi, 0x7DD0AE461140      ; code for Program+<>c__DisplayClass0_0:<Main>b__0(int):int:this
       mov      qword ptr [r14+0x18], rsi
       xor      ebx, ebx
       add      r15, 16
       mov      r13d, 100
G_M24375_IG03:  ;; offset=0x0075
       mov      esi, dword ptr [r15]
       mov      rdi, gword ptr [r14+0x08]
       call     [r14+0x18]System.Func`2[int,int]:Invoke(int):int:this
       add      ebx, eax
       add      r15, 4
       dec      r13d
       jne      SHORT G_M24375_IG03
       ; epilog omitted for brevity
```

Now, because `func` is never referenced outside the scope of `Main`, it's also allocated on the _stack_:

```asm
       ; prolog omitted for brevity
       mov      rdi, 0x7B52F7837958      ; Program+<>c__DisplayClass0_0
       call     CORINFO_HELP_NEWSFAST
       mov      rbx, rax
       mov      dword ptr [rbx+0x08], 1
       mov      rsi, 0x7B52F7718CC8      ; int[]
       mov      qword ptr [rbp-0x1C0], rsi
       lea      rsi, [rbp-0x1C0]
       mov      dword ptr [rsi+0x08], 100
       lea      r15, [rbp-0x1C0]
       xor      r14d, r14d
       add      r15, 16
       mov      r13d, 100
G_M24375_IG03:  ;; offset=0x0099
       mov      esi, dword ptr [r15]
       mov      rdi, rbx
       mov      rax, 0x7B52F7901638      ; address of definition for "func"
       call     rax
       add      r14d, eax
       add      r15, 4
       dec      r13d
       jne      SHORT G_M24375_IG03
       ; epilog omitted for brevity
```

Notice there is one remaining `CORINFO_HELP_NEW*` call, which is the heap allocation for the closure. The runtime team plans to expand escape analysis to support stack allocation of closures in a future release.

## NativeAOT type preinitializer improvements

NativeAOT's type preinitializer now supports all variants of the `conv.*` and `neg` opcodes. This enhancement allows preinitialization of methods that include casting or negation operations, further optimizing runtime performance.

## Arm64 write-barrier improvements

.NET's garbage collector (GC) is generational, meaning it separates live objects by age to improve collection performance. The GC collects younger generations more often under the assumption that long-lived objects are less likely to be unreferenced (or "dead") at any given time. However, suppose an old object starts referencing a young object; the GC needs to know it can't collect the young object. However, needing to scan older objects to collect a young object defeats the performance gains of a generational GC.

To solve this problem, the JIT inserts write barriers before object reference updates to keep the GC informed. On x64, the runtime can dynamically switch between write-barrier implementations to balance write speeds and collection efficiency, depending on the GC's configuration. In .NET 10, this functionality is also available on Arm64. In particular, the new default write-barrier implementation on Arm64 handles GC regions more precisely, which improves collection performance at a slight cost to write-barrier throughput. Benchmarks show GC pause improvements from 8% to over 20% with the new GC defaults.
