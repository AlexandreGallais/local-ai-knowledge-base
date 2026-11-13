---
title: "How to: Write a Parallel.For Loop with Thread-Local Variables"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-write-a-parallel-for-loop-with-thread-local-variables.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Write a Parallel.For Loop with Thread-Local Variables

This example shows how to use thread-local variables to store and retrieve state in each separate task that is created by a `System.Threading.Tasks.Parallel.For*` loop. By using thread-local data, you can avoid the overhead of synchronizing a large number of accesses to shared state. Instead of writing to a shared resource on each iteration, you compute and store the value until all iterations for the task are complete. You can then write the final result once to the shared resource, or pass it to another method.

## Example

 The following example calls the `System.Threading.Tasks.Parallel.For``1(System.Int32,System.Int32,System.Func{``0},System.Func{System.Int32,System.Threading.Tasks.ParallelLoopState,``0,``0},System.Action{``0})` method to calculate the sum of the values in an array that contains one million elements. The value of each element is equal to its index.

 ```csharp
namespace ThreadLocalFor
{
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    class Test
    {
        static void Main()
        {
            int[] nums = Enumerable.Range(0, 1_000_000).ToArray();
            long total = 0;

            // Use type parameter to make subtotal a long, not an int
            Parallel.For<long>(0, nums.Length, () => 0,
                (j, loop, subtotal) =>
                {
                    subtotal += nums[j];
                    return subtotal;
                },
                subtotal => Interlocked.Add(ref total, subtotal));

            Console.WriteLine($"The total is {total:N0}");
            Console.WriteLine("Press any key to exit");
            Console.ReadKey();
        }
    }
}

namespace NotInUse
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    class FromSnippet1
    {
        static void MultiplyMatrixScalar(int cols, double[,] matrix, double scalar)
        {
            // Parallelize the outer loop to partition the source array by rows.
            int rowCount = matrix.Length / cols;
            Parallel.For(0, rowCount, i =>
            {
                for (int j = 0; j < cols; j++)
                {
                    matrix[i, j] *= scalar;
                }
            });
        }

        static void ComputeHeron(double x, int precision)
        {
            Random rand = Random.Shared;

            double r = rand.Next(1, (int)x);
            double f = (double)1 / precision;
            while (true)
            {
                r = (r + x / r) / 2;

                Console.WriteLine((double)r);
                if ((double)(r - (double)(x / r)) < f)
                    break;
            }
            int places = (from c in precision.ToString().ToCharArray()
                          where c == '0'
                          select c).Count();
            Console.WriteLine($"The square root of {x} to {places} places is {r}");
        }
    }
}
```

 The first two parameters of every `System.Threading.Tasks.Parallel.For*` method specify the beginning and ending iteration values. In this overload of the method, the third parameter is where you initialize your local state. In this context, local state means a variable whose lifetime extends from just before the first iteration of the loop on the current thread, to just after the last iteration.

 The type of the third parameter is a `System.Func`1` where `TResult` is the type of the variable that will store the thread-local state. Its type is defined by the generic type argument supplied when calling the generic `System.Threading.Tasks.Parallel.For``1(System.Int32,System.Int32,System.Func{``0},System.Func{System.Int32,System.Threading.Tasks.ParallelLoopState,``0,``0},System.Action{``0})` method, which in this case is `System.Int64`. The type argument tells the compiler the type of the temporary variable that will be used to store the thread-local state. In this example, the expression `() => 0` (or `Function() 0` in Visual Basic) initializes the thread-local variable to zero. If the generic type argument is a reference type or user-defined value type, the expression would look like this:

```csharp
() => new MyClass()
```

```vb
Function() new MyClass()
```

 The fourth parameter defines the loop logic. It must be a delegate or lambda expression whose signature is `Func<int, ParallelLoopState, long, long>` in C# or `Func(Of Integer, ParallelLoopState, Long, Long)` in Visual Basic. The first parameter is the value of the loop counter for that iteration of the loop. The second is a `System.Threading.Tasks.ParallelLoopState` object that can be used to break out of the loop; this object is provided by the `System.Threading.Tasks.Parallel` class to each occurrence of the loop. The third parameter is the thread-local variable. The last parameter is the return type. In this case, the type is `System.Int64` because that is the type we specified in the `System.Threading.Tasks.Parallel.For*` type argument. That variable is named `subtotal` and is returned by the lambda expression. The return value is used to initialize `subtotal` on each subsequent iteration of the loop. You can also think of this last parameter as a value that is passed to each iteration, and then passed to the `localFinally` delegate when the last iteration is complete.

 The fifth parameter defines the method that is called once, after all the iterations on a particular thread have completed. The type of the input argument again corresponds to the type argument of the `System.Threading.Tasks.Parallel.For``1(System.Int32,System.Int32,System.Func{``0},System.Func{System.Int32,System.Threading.Tasks.ParallelLoopState,``0,``0},System.Action{``0})` method and the type returned by the body lambda expression. In this example, the value is added to a variable at class scope in a thread safe way by calling the `System.Threading.Interlocked.Add*` method. By using a thread-local variable, we have avoided writing to this class variable on every iteration of the loop.

 For more information about how to use lambda expressions, see Lambda Expressions in PLINQ and TPL.

## See also

- Data Parallelism
- Parallel Programming
- Task Parallel Library (TPL)
- Lambda Expressions in PLINQ and TPL
