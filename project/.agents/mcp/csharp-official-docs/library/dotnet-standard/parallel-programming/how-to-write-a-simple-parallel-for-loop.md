---
title: "How to: Write a Simple Parallel.For Loop"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-write-a-simple-parallel-for-loop.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Write a Simple Parallel.For Loop

This topic contains two examples that illustrate the `System.Threading.Tasks.Parallel.For*` method. The first uses the `System.Threading.Tasks.Parallel.For(System.Int64,System.Int64,System.Action{System.Int64})` method overload, and the second uses the `System.Threading.Tasks.Parallel.For(System.Int32,System.Int32,System.Action{System.Int32})` overload, the two simplest overloads of the `System.Threading.Tasks.Parallel.For*` method. You can use these two overloads of the `System.Threading.Tasks.Parallel.For*` method when you do not need to cancel the loop, break out of the loop iterations, or maintain any thread-local state.

> **Note:**
> This documentation uses lambda expressions to define delegates in TPL. If you are not familiar with lambda expressions in C# or Visual Basic, see Lambda Expressions in PLINQ and TPL.

The first example calculates the size of files in a single directory. The second computes the product of two matrices.

## Directory size example

This example is a simple command-line utility that calculates the total size of files in a directory. It expects a single directory path as an argument, and reports the number and total size of the files in that directory. After verifying that the directory exists, it uses the `System.Threading.Tasks.Parallel.For*` method to enumerate the files in the directory and determine their file sizes. Each file size is then added to the `totalSize` variable. Note that the addition is performed by calling the `System.Threading.Interlocked.Add*` so that the addition is performed as an atomic operation. Otherwise, multiple tasks could try to update the `totalSize` variable simultaneously.

```csharp
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

public class Example
{
   public static void Main(string[] args)
   {
      long totalSize = 0;
      
      if (args.Length == 0) {
         Console.WriteLine("There are no command line arguments.");
         return;
      }
      if (!Directory.Exists(args[0])) {
         Console.WriteLine("The directory does not exist.");
         return;
      }

      String[] files = Directory.GetFiles(args[0]);
      Parallel.For(0, files.Length,
                   index => { FileInfo fi = new FileInfo(files[index]);
                              long size = fi.Length;
                              Interlocked.Add(ref totalSize, size);
                   } );
      Console.WriteLine($"Directory '{args[0]}':");
      Console.WriteLine("{0:N0} files, {1:N0} bytes", files.Length, totalSize);
   }
}
// The example displaysoutput like the following:
//       Directory 'c:\windows\':
//       32 files, 6,587,222 bytes
```

## Matrix and stopwatch example

This example uses the `System.Threading.Tasks.Parallel.For*` method to compute the product of two matrices. It also shows how to use the `System.Diagnostics.Stopwatch` class to compare the performance of a parallel loop with a non-parallel loop. Note that, because it can generate a large volume of output, the example allows output to be redirected to a file.

```csharp
using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

class MultiplyMatrices
{
    static void MultiplyMatricesSequential(double[,] matA, double[,] matB,
                                            double[,] result)
    {
        int matACols = matA.GetLength(1);
        int matBCols = matB.GetLength(1);
        int matARows = matA.GetLength(0);

        for (int i = 0; i < matARows; i++)
        {
            for (int j = 0; j < matBCols; j++)
            {
                double temp = 0;
                for (int k = 0; k < matACols; k++)
                {
                    temp += matA[i, k] * matB[k, j];
                }
                result[i, j] = temp;
            }
        }
    }

    static void MultiplyMatricesParallel(double[,] matA, double[,] matB, double[,] result)
    {
        int matACols = matA.GetLength(1);
        int matBCols = matB.GetLength(1);
        int matARows = matA.GetLength(0);

        // A basic <example-value> multiplication.
        // Parallelize the outer loop to partition the source array by rows.
        Parallel.For(0, matARows, i =>
        {
            for (int j = 0; j < matBCols; j++)
            {
                double temp = 0;
                for (int k = 0; k < matACols; k++)
                {
                    temp += matA[i, k] * matB[k, j];
                }
                result[i, j] = temp;
            }
        }); // Parallel.For
    }

    static void Main(string[] args)
    {
        // Set up matrices. Use small values to better view
        // result matrix. Increase the counts to see greater
        // speedup in the parallel loop vs. the sequential loop.
        int colCount = 180;
        int rowCount = 2000;
        int colCount2 = 270;
        double[,] m1 = InitializeMatrix(rowCount, colCount);
        double[,] m2 = InitializeMatrix(colCount, colCount2);
        double[,] result = new double[rowCount, colCount2];

        // First do the sequential version.
        Console.Error.WriteLine("Executing sequential loop...");
        Stopwatch stopwatch = new Stopwatch();
        stopwatch.Start();

        MultiplyMatricesSequential(m1, m2, result);
        stopwatch.Stop();
        Console.Error.WriteLine("Sequential loop time in milliseconds: {0}",
                                stopwatch.ElapsedMilliseconds);

        // For the skeptics.
        OfferToPrint(rowCount, colCount2, result);

        // Reset timer and results matrix.
        stopwatch.Reset();
        result = new double[rowCount, colCount2];

        // Do the parallel loop.
        Console.Error.WriteLine("Executing parallel loop...");
        stopwatch.Start();
        MultiplyMatricesParallel(m1, m2, result);
        stopwatch.Stop();
        Console.Error.WriteLine("Parallel loop time in milliseconds: {0}",
                                stopwatch.ElapsedMilliseconds);
        OfferToPrint(rowCount, colCount2, result);

        // Keep the console window open in debug mode.
        Console.Error.WriteLine("Press any key to exit.");
        Console.ReadKey();
    }

    static double[,] InitializeMatrix(int rows, int cols)
    {
        double[,] matrix = new double[rows, cols];

        Random r = new Random();
        for (int i = 0; i < rows; i++)
        {
            for (int j = 0; j < cols; j++)
            {
                matrix[i, j] = r.Next(100);
            }
        }
        return matrix;
    }

    private static void OfferToPrint(int rowCount, int colCount, double[,] matrix)
    {
        Console.Error.Write("Computation complete. Print results (y/n)? ");
        char c = Console.ReadKey(true).KeyChar;
        Console.Error.WriteLine(c);
        if (Char.ToUpperInvariant(c) == 'Y')
        {
            if (!Console.IsOutputRedirected &&
                RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                Console.WindowWidth = 180;
            }

            Console.WriteLine();
            for (int x = 0; x < rowCount; x++)
            {
                Console.WriteLine($"ROW {x}: ");
                for (int y = 0; y < colCount; y++)
                {
                    Console.Write("{0:#.##} ", matrix[x, y]);
                }
                Console.WriteLine();
            }
        }
    }
}
```

When parallelizing any code, including loops, one important goal is to utilize the processors as much as possible without over parallelizing to the point where the overhead for parallel processing negates any performance benefits. In this particular example, only the outer loop is parallelized because there is not very much work performed in the inner loop. The combination of a small amount of work and undesirable cache effects can result in performance degradation in nested parallel loops. Therefore, parallelizing the outer loop only is the best way to maximize the benefits of concurrency on most systems.

## The Delegate

The third parameter of this overload of `System.Threading.Tasks.Parallel.For*` is a delegate of type `Action<int>` in C# or `Action(Of Integer)` in Visual Basic. An `Action` delegate, whether it has zero, one or sixteen type parameters, always returns void. In Visual Basic, the behavior of an `Action` is defined with a `Sub`. The example uses a lambda expression to create the delegate, but you can create the delegate in other ways as well. For more information, see Lambda Expressions in PLINQ and TPL.

## The Iteration Value

The delegate takes a single input parameter whose value is the current iteration. This iteration value is supplied by the runtime and its starting value is the index of the first element on the segment (partition) of the source that is being processed on the current thread.

If you require more control over the concurrency level, use one of the overloads that takes a `System.Threading.Tasks.ParallelOptions` input parameter, such as: `System.Threading.Tasks.Parallel.For(System.Int32,System.Int32,System.Threading.Tasks.ParallelOptions,System.Action{System.Int32,System.Threading.Tasks.ParallelLoopState})`.

## Return Value and Exception Handling

`System.Threading.Tasks.Parallel.For*` returns use a `System.Threading.Tasks.ParallelLoopResult` object when all threads have completed. This return value is useful when you are stopping or breaking loop iteration manually, because the `System.Threading.Tasks.ParallelLoopResult` stores information such as the last iteration that ran to completion. If one or more exceptions occur on one of the threads, a `System.AggregateException` will be thrown.

In the code in this example, the return value of `System.Threading.Tasks.Parallel.For*` is not used.

## Analysis and Performance

You can use the Performance Wizard to view CPU usage on your computer. As an experiment, increase the number of columns and rows in the matrices. The larger the matrices, the greater the performance difference between the parallel and sequential versions of the computation. When the matrix is small, the sequential version will run faster because of the overhead in setting up the parallel loop.

Synchronous calls to shared resources, like the Console or the File System, will significantly degrade the performance of a parallel loop. When measuring performance, try to avoid calls such as `System.Console.WriteLine*` within the loop.

## Compile the Code

Copy and paste this code into a Visual Studio project.

## See also

- `System.Threading.Tasks.Parallel.For*`
- `System.Threading.Tasks.Parallel.ForEach*`
- Data Parallelism
- Parallel Programming
