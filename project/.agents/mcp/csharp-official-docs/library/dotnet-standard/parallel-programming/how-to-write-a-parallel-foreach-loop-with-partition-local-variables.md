---
title: "How to: Write a Parallel.ForEach loop with partition-local variables"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-write-a-parallel-foreach-loop-with-partition-local-variables.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Write a Parallel.ForEach loop with partition-local variables

The following example shows how to write a `System.Threading.Tasks.Parallel.ForEach*` method that uses partition-local variables. When a `System.Threading.Tasks.Parallel.ForEach*` loop executes, it divides its source collection into multiple partitions. Each partition has its own copy of the partition-local variable. A partition-local variable is similar to a thread-local variable, except that multiple partitions can run on a single thread.

The code and parameters in this example closely resemble the corresponding `System.Threading.Tasks.Parallel.For*` method. For more information, see How to: Write a Parallel.For Loop with Thread-Local Variables.

To use a partition-local variable in a `System.Threading.Tasks.Parallel.ForEach*` loop, you must call one of the method overloads that takes two type parameters. The first type parameter, `TSource`, specifies the type of the source element, and the second type parameter, `TLocal`, specifies the type of the partition-local variable.

## Example

The following example calls the `System.Threading.Tasks.Parallel.ForEach``2(System.Collections.Generic.IEnumerable{``0},System.Func{``1},System.Func{``0,System.Threading.Tasks.ParallelLoopState,``1,``1},System.Action{``1})` overload to compute the sum of an array of one million elements. This overload has four parameters:

- `source`, which is the data source. It must implement `System.Collections.Generic.IEnumerable`1`. The data source in our example is the one million member `IEnumerable<Int32>` object returned by the `System.Linq.Enumerable.Range*` method.

- `localInit`, or the function that initializes the partition-local variable. This function is called once for each partition in which the `System.Threading.Tasks.Parallel.ForEach*` operation executes. Our example initializes the partition-local variable to zero.

- `body`, a `System.Func`4` that is invoked by the parallel loop on each iteration of the loop. Its signature is `Func\<TSource, ParallelLoopState, TLocal, TLocal>`. You supply the code for the delegate, and the loop passes in the input parameters, which are:

  - The current element of the `System.Collections.Generic.IEnumerable`1`.

  - A `System.Threading.Tasks.ParallelLoopState` variable that you can use in your delegate's code to examine the state of the loop.

  - The partition-local variable.

  Your delegate returns the partition-local variable, which is then passed to the next iteration of the loop that executes in that particular partition. Each loop partition maintains a separate instance of this variable.

  In the example, the delegate adds the value of each integer to the partition-local variable, which maintains a running total of the values of the integer elements in that partition.

- `localFinally`, an `Action<TLocal>` delegate that the `System.Threading.Tasks.Parallel.ForEach*` invokes when the looping operations in each partition have completed. The `System.Threading.Tasks.Parallel.ForEach*` method passes your `Action<TLocal>` delegate the final value of the partition-local variable for this loop partition, and you provide the code that performs the required action for combining the result from this partition with the results from the other partitions. This delegate can be invoked concurrently by multiple tasks. Because of this, the example uses the `System.Threading.Interlocked.Add(System.Int32@,System.Int32)` method to synchronize access to the `total` variable. Because the delegate type is an `System.Action`1`, there is no return value.

```csharp
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

class Test
{
    static void Main()
    {
        int[] nums = Enumerable.Range(0, 1000000).ToArray();
        long total = 0;

        // First type parameter is the type of the source elements
        // Second type parameter is the type of the thread-local variable (partition subtotal)
        Parallel.ForEach<int, long>(
            nums, // source collection
            () => 0, // method to initialize the local variable
            (j, loop, subtotal) => // method invoked by the loop on each iteration
            {
                subtotal += j; //modify local variable
                return subtotal; // value to be passed to next iteration
            },
            // Method to be executed when each partition has completed.
            // finalResult is the final value of subtotal for a particular partition.
            (finalResult) => Interlocked.Add(ref total, finalResult));

        Console.WriteLine($"The total from Parallel.ForEach is {total:N0}");
    }
}
// The example displays the following output:
//        The total from Parallel.ForEach is 499,999,500,000
```

## See also

- Data Parallelism
- How to: Write a Parallel.For Loop with Thread-Local Variables
- Lambda Expressions in PLINQ and TPL
