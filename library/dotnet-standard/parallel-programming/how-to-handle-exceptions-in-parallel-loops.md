---
title: "How to: Handle Exceptions in Parallel Loops"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-handle-exceptions-in-parallel-loops.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Handle Exceptions in Parallel Loops

The `System.Threading.Tasks.Parallel.For*` and `System.Threading.Tasks.Parallel.ForEach*` overloads do not have any special mechanism to handle exceptions that might be thrown. In this respect, they resemble regular `for` and `foreach` loops (`For` and `For Each` in Visual Basic); an unhandled exception causes the loop to terminate as soon as all currently running iterations finish.

 When you add your own exception-handling logic to parallel loops, handle the case in which similar exceptions might be thrown on multiple threads concurrently, and the case in which an exception thrown on one thread causes another exception to be thrown on another thread. You can handle both cases by wrapping all exceptions from the loop in a `System.AggregateException`. The following example shows one possible approach.

> **Note:**
> When "Just My Code" is enabled, Visual Studio in some cases will break on the line that throws the exception and display an error message that says "exception not handled by user code." This error is benign. You can press F5 to continue from it, and see the exception-handling behavior that is demonstrated in the example below. To prevent Visual Studio from breaking on the first error, just uncheck the "Just My Code" checkbox under **Tools, Options, Debugging, General**.

## Example

 In this example, all exceptions are caught and then wrapped in an `System.AggregateException` which is thrown. The caller can decide which exceptions to handle.

 ```csharp
﻿using System.Collections.Concurrent;

public static partial class Program
{
    public static void ThrowDemo()
    {
        var task = Task.Factory.StartNew(
            () => throw new CustomException("I'm bad, but not too bad!"));

        try
        {
            task.Wait();
        }
        catch (AggregateException ae)
        {
            // Assume we know what's going on with this particular exception.
            // Rethrow anything else. AggregateException.Handle provides
            // another way to express this. See later example.
            foreach (var ex in ae.InnerExceptions)
            {
                if (ex is CustomException)
                {
                    Console.WriteLine(ex.Message);
                }
                else
                {
                    throw;
                }
            }
        }
    }

    static void CancelDemo()
    {
        bool someCondition = true;
        var tokenSource = new CancellationTokenSource();
        var token = tokenSource.Token;
        var task = Task.Factory.StartNew(() =>
        {
            CancellationToken ct = token;
            while (someCondition)
            {
                // Do some work...
                Thread.SpinWait(50_000);
                ct.ThrowIfCancellationRequested();
            }
        },
        token);

        // No waiting required.
        tokenSource.Dispose();
    }
}

public static partial class Program
{
    public static void ExceptionTwo()
    {
        // Create some random data to process in parallel.
        // There is a good probability this data will cause some exceptions to be thrown.
        byte[] data = new byte[5_000];
        Random r = Random.Shared;
        r.NextBytes(data);

        try
        {
            ProcessDataInParallel(data);
        }
        catch (AggregateException ae)
        {
            var ignoredExceptions = new List<Exception>();
            // This is where you can choose which exceptions to handle.
            foreach (var ex in ae.Flatten().InnerExceptions)
            {
                if (ex is ArgumentException) Console.WriteLine(ex.Message);
                else ignoredExceptions.Add(ex);
            }
            if (ignoredExceptions.Count > 0)
            {
                throw new AggregateException(ignoredExceptions);
            }
        }

        Console.WriteLine("Press any key to exit.");
        Console.ReadKey();
    }

    private static void ProcessDataInParallel(byte[] data)
    {
        // Use ConcurrentQueue to enable safe enqueueing from multiple threads.
        var exceptions = new ConcurrentQueue<Exception>();

        // Execute the complete loop and capture all exceptions.
        Parallel.ForEach(data, d =>
        {
            try
            {
                // Cause a few exceptions, but not too many.
                if (d < 3) throw new ArgumentException($"Value is {d}. Value must be greater than or equal to 3.");
                else Console.Write(d + " ");
            }
            // Store the exception and continue with the loop.
            catch (Exception e)
            {
                exceptions.Enqueue(e);
            }
        });
        Console.WriteLine();

        // Throw the exceptions here after the loop completes.
        if (!exceptions.IsEmpty)
        {
            throw new AggregateException(exceptions);
        }
    }
}
```

## See also

- Data Parallelism
- Lambda Expressions in PLINQ and TPL
