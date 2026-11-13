---
title: "Lambda Expressions in PLINQ and TPL"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/lambda-expressions-in-plinq-and-tpl.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Lambda Expressions in PLINQ and TPL

The Task Parallel Library (TPL) contains many methods that take one of the `System.Func`1` or `System.Action` family of delegates as input parameters. You use these delegates to pass in your custom program logic to the parallel loop, task or query. The code examples for TPL as well as PLINQ use lambda expressions to create instances of those delegates as inline code blocks. This topic provides a brief introduction to Func and Action and shows you how to use lambda expressions in the Task Parallel Library and PLINQ.

> **Note:**
> For more information about delegates in general, see Delegates and Delegates. For more information about lambda expressions in C# and Visual Basic, see Lambda Expressions and Lambda Expressions.

## Func Delegate

A `Func` delegate encapsulates a method that returns a value. In a `Func` signature, the last, or rightmost, type parameter always specifies the return type. One common cause of compiler errors is to attempt to pass in two input parameters to a `System.Func`2`; in fact this type takes only one input parameter. .NET defines 17 versions of `Func`: `System.Func`1`, `System.Func`2`, `System.Func`3`, and so on up through `System.Func`17`.

## Action Delegate

A `System.Action` delegate encapsulates a method (Sub in Visual Basic) that does not return a value. In an `Action` type signature, the type parameters represent only input parameters. Like `Func`, .NET defines 17 versions of `Action`, from a version that has no type parameters up through a version that has 16 type parameters.

## Example

The following example for the `System.Threading.Tasks.Parallel.ForEach``2(System.Collections.Generic.IEnumerable{``0},System.Func{``1},System.Func{``0,System.Threading.Tasks.ParallelLoopState,``1,``1},System.Action{``1})` method shows how to express both Func and Action delegates by using lambda expressions.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

class ForEachWithThreadLocal
{
    // Demonstrated features:
    // 		Parallel.ForEach()
    //		Thread-local state
    // Expected results:
    //      This example sums up the elements of an int[] in parallel.
    //      Each thread maintains a local sum. When a thread is initialized, that local sum is set to 0.
    //      On every iteration the current element is added to the local sum.
    //      When a thread is done, it safely adds its local sum to the global sum.
    //      After the loop is complete, the global sum is printed out.
    // Documentation:
    //		http://msdn.microsoft.com/library/dd990270(VS.100).aspx
    static void Main()
    {
        // The sum of these elements is 40.
        int[] input = { 4, 1, 6, 2, 9, 5, 10, 3 };
        int sum = 0;

        try
        {
            Parallel.ForEach(
                    input,					        // source collection
                    () => 0,					        // thread local initializer
                    (n, loopState, localSum) =>		// body
                    {
                        localSum += n;
                        Console.WriteLine("Thread={0}, n={1}, localSum={2}", Thread.CurrentThread.ManagedThreadId, n, localSum);
                        return localSum;
                    },
                    (localSum) => Interlocked.Add(ref sum, localSum)					// thread local aggregator
                );

            Console.WriteLine($"\nSum={sum}");
        }
        // No exception is expected in this example, but if one is still thrown from a task,
        // it will be wrapped in AggregateException and propagated to the main thread.
        catch (AggregateException e)
        {
            Console.WriteLine($"Parallel.ForEach has thrown an exception. THIS WAS NOT EXPECTED.\n{e}");
        }
    }
}
```

## See also

- Parallel Programming
