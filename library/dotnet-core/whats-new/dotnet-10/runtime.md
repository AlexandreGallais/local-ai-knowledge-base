---
title: "What's new in .NET 10 runtime (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-10/runtime.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in the .NET 10 runtime

This article describes new features and performance improvements in the .NET runtime for .NET 10.

## JIT compiler improvements

The JIT compiler in .NET 10 includes significant enhancements that improve performance through better code generation and optimization strategies.

### Improved code generation for struct arguments

.NET's JIT compiler is capable of an optimization called physical promotion, where the members of a struct are placed in registers rather than on the stack, eliminating memory accesses. This optimization is particularly useful when passing a struct to a method, and the calling convention requires the struct members to be passed in registers.

.NET 10 improves the JIT compiler's internal representation to handle values that share a register. Previously, when struct members needed to be packed into a single register, the JIT would store values to memory first and then load them into a register. Now, the JIT compiler can place the promoted members of struct arguments into shared registers directly, eliminating unnecessary memory operations.

Consider the following example:

```csharp
struct Point
{
    public long X;
    public long Y;

    public Point(long x, long y)
    {
        X = x;
        Y = y;
    }
}

[MethodImpl(MethodImplOptions.NoInlining)]
private static void Consume(Point p)
{
    Console.WriteLine(p.X + p.Y);
}

private static void Main()
{
    Point p = new Point(10, 20);
    Consume(p);
}
```

On x64, the members of `Point` are passed to `Consume` in separate registers, and since physical promotion kicked in for the local `p`, nothing is allocated on the stack first:

```asm
Program:Main() (FullOpts):
       mov      edi, 10
       mov      esi, 20
       tail.jmp [Program:Consume(Program+Point)]
```

Now, suppose the type of the members of `Point` was changed to `int` instead of `long`. Because an `int` is four bytes wide, and registers are eight bytes wide on x64, the calling convention requires the members of `Point` to be passed in one register. Previously, the JIT compiler would first store the values to memory, and then load the eight-byte chunk into a register. With the .NET 10 improvements, the JIT compiler can now place the promoted members of struct arguments into shared registers directly:

```asm
Program:Main() (FullOpts):
       mov      rdi, 0x140000000A
       tail.jmp [Program:Consume(Program+Point)]
```

This eliminates the need for intermediate memory storage, resulting in more efficient assembly code.

### Improved loop inversion

The JIT compiler can hoist the condition of a `while` loop and transform the loop body into a `do-while` loop, producing the final shape:

```csharp
if (loopCondition)
{
    do
    {
        // loop body
    } while (loopCondition);
}
```

This transformation is called loop inversion. By moving the condition to the bottom of the loop, the JIT removes the need to branch to the top of the loop to test the condition, improving code layout. Numerous optimizations (like loop cloning, loop unrolling, and induction variable optimizations) also depend on loop inversion to produce this shape to aid analysis.

.NET 10 enhances loop inversion by switching from a lexical analysis implementation to a graph-based loop recognition implementation. This change brings improved precision by considering all natural loops (loops with a single entry point) and ignoring false positives that were previously considered. This translates into higher optimization potential for .NET programs with `for` and `while` statements.

### Array interface method devirtualization

One of the focus areas for .NET 10 is to reduce the abstraction overhead of popular language features. In pursuit of this goal, the JIT's ability to devirtualize method calls has expanded to cover array interface methods.

Consider the typical approach of looping over an array:

```csharp
static int Sum(int[] array)
{
    int sum = 0;
    for (int i = 0; i < array.Length; i++)
    {
        sum += array[i];
    }
    return sum;
}
```

This code shape is easy for the JIT to optimize, mainly because there aren't any virtual calls to reason about. Instead, the JIT can focus on removing bounds checks on the array access and applying the loop optimizations that were added in .NET 9. The following example adds some virtual calls:

```csharp
static int Sum(int[] array)
{
    int sum = 0;
    IEnumerable<int> temp = array;

    foreach (var num in temp)
    {
        sum += num;
    }
    return sum;
}
```

The type of the underlying collection is clear, and the JIT should be able to transform this snippet into the first one. However, array interfaces are implemented differently from "normal" interfaces, such that the JIT doesn't know how to devirtualize them. This means the enumerator calls in the `foreach` loop remain virtual, blocking multiple optimizations such as inlining and stack allocation.

Starting in .NET 10, the JIT can devirtualize and inline array interface methods. This is the first of many steps to achieve performance parity between the implementations, as detailed in the .NET 10 de-abstraction plans.

### Array enumeration de-abstraction

Efforts to reduce the abstraction overhead of array iteration via enumerators have improved the JIT's inlining, stack allocation, and loop cloning abilities. For example, the overhead of enumerating arrays via `IEnumerable` is reduced, and conditional escape analysis now enables stack allocation of enumerators in certain scenarios.

### Improved code layout

The JIT compiler in .NET 10 introduces a new approach to organizing method code into basic <example-value> for better runtime performance. Previously, the JIT used a reverse postorder (RPO) traversal of the program's flowgraph as an initial layout, followed by iterative transformations. While effective, this approach had limitations in modeling the trade-offs between reducing branching and increasing hot code density.

In .NET 10, the JIT models the block reordering problem as a reduction of the asymmetric Travelling Salesman Problem and implements the 3-opt heuristic to find a near-optimal traversal. This optimization improves hot path density and reduces branch distances, resulting in better runtime performance.

### Inlining improvements

Various inlining improvements have been made in .NET 10.

The JIT can now inline methods that become eligible for devirtualization due to previous inlining. This improvement allows the JIT to uncover more optimization opportunities, such as further inlining and devirtualization.

Some methods that have exception-handling semantics, in particular those with `try-finally` blocks, can also be inlined.

To better take advantage of the JIT's ability to stack-allocate some arrays, the inliner's heuristics have been adjusted to increase the profitability of candidates that might be returning small, fixed-sized arrays.

#### Return types

During inlining, the JIT now updates the type of temporary variables that hold return values. If all return sites in a callee yield the same type, this precise type information is used to devirtualize subsequent calls. This enhancement complements the improvements in late devirtualization and array enumeration de-abstraction.

#### Profile data

.NET 10 enhances the JIT's inlining policy to take better advantage of profile data. Among numerous heuristics, the JIT's inliner doesn't consider methods over a certain size to avoid bloating the caller method. When the caller has profile data that suggests an inlining candidate is frequently executed, the inliner increases its size tolerance for the candidate.

Suppose the JIT inlines some callee `Callee` without profile data into some caller `Caller` with profile data. This discrepancy can occur if the callee is too small to be worth instrumenting, or if it's inlined too often to have a sufficient call count. If `Callee` has its own inlining candidates, the JIT previously didn't consider them with its default size limit due to `Callee` lacking profile data. Now, the JIT will realize `Caller` has profile data and loosen its size restriction (but, to account for loss of precision, not to the same degree as if `Callee` had profile data).

Similarly, when the JIT decides a call site isn't profitable for inlining, it marks the method with `NoInlining` to save future inlining attempts from considering it. However, many inlining heuristics are sensitive to profile data. For example, the JIT might decide a method is too large to be worth inlining in the absence of profile data. But when the caller is sufficiently hot, the JIT might be willing to relax its size restriction and inline the call. In .NET 10, the JIT no longer flags unprofitable inlinees with `NoInlining` to avoid pessimizing call sites with profile data.

## AVX10.2 support

.NET 10 introduces support for the Advanced Vector Extensions (AVX) 10.2 for x64-based processors. The new intrinsics available in the `System.Runtime.Intrinsics.X86.Avx10v2` class can be tested once capable hardware is available.

Because AVX10.2-enabled hardware isn't yet available, the JIT's support for AVX10.2 is currently disabled by default.
