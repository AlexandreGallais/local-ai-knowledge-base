---
title: "Potential pitfalls with PLINQ (part 1 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/potential-pitfalls-with-plinq.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Potential pitfalls with PLINQ

In many cases, PLINQ can provide significant performance improvements over sequential LINQ to Objects queries. However, the work of parallelizing the query execution introduces complexity that can lead to problems that, in sequential code, are not as common or are not encountered at all. This topic lists some practices to avoid when you write PLINQ queries.

## Don't assume that parallel is always faster

Parallelization sometimes causes a PLINQ query to run slower than its LINQ to Objects equivalent. The basic rule of thumb is that queries that have few source elements and fast user delegates are unlikely to speedup much. However, because many factors are involved in performance, we recommend that you measure actual results before you decide whether to use PLINQ. For more information, see Understanding Speedup in PLINQ.

## Avoid writing to shared memory locations

In sequential code, it is not uncommon to read from or write to static variables or class fields. However, whenever multiple threads are accessing such variables concurrently, there is a big potential for race conditions. Even though you can use locks to synchronize access to the variable, the cost of synchronization can hurt performance. Therefore, we recommend that you avoid, or at least limit, access to shared state in a PLINQ query as much as possible.

### Example: Race condition with shared memory

The following example demonstrates a race condition that occurs when multiple threads write to a shared variable. The variable `total` is accessed and modified concurrently by multiple threads without synchronization, leading to unpredictable results:

```csharp
static void DemonstrateRaceCondition()
{
    int total = 0;
    var numbers = Enumerable.Range(0, 10000);

    // UNSAFE: Multiple threads writing to shared variable
    numbers.AsParallel().ForAll(n => total += n);

    Console.WriteLine($"Total (with race condition): {total}");
    // Expected: 49,995,000 but result is unpredictable due to race condition
}
```
```vb
Shared Sub DemonstrateRaceCondition()
    Dim total As Integer = 0
    Dim numbers = Enumerable.Range(0, 10000)

    ' UNSAFE: Multiple threads writing to shared variable
    numbers.AsParallel().ForAll(Sub(n) total += n)

    Console.WriteLine($"Total (with race condition): {total}")
    ' Expected: 49,995,000 but result is unpredictable due to race condition
End Sub
```
In this code, the operation `total += n` is not atomic. It involves reading the current value of `total`, adding `n`, and writing the result back to `total`. When multiple threads execute this operation simultaneously, they can read the same value, add to it in different threads, and write back results that overwrite each other. This causes some additions to be lost, producing an incorrect final result.

The correct approach is to use thread-safe operations that don't require shared mutable state:

```csharp
static void DemonstrateCorrectApproach()
{
    var numbers = Enumerable.Range(0, 10000);

    // SAFE: Use thread-safe aggregate operation
    int total = numbers.AsParallel().Sum();

    Console.WriteLine($"Total (correct): {total}");
    // Result is always 49,995,000
}
```
```vb
Shared Sub DemonstrateCorrectApproach()
    Dim numbers = Enumerable.Range(0, 10000)

    ' SAFE: Use thread-safe aggregate operation
    Dim total As Integer = numbers.AsParallel().Sum()

    Console.WriteLine($"Total (correct): {total}")
    ' Result is always 49,995,000
End Sub
```
The `Sum` method handles parallelization internally in a thread-safe manner, ensuring correct results without the need for explicit synchronization. Other safe approaches include using `System.Linq.ParallelEnumerable.Aggregate*` for custom aggregations or collecting results into thread-safe collections like `System.Collections.Concurrent.ConcurrentBag`1`.
