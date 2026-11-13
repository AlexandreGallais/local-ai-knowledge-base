---
title: "Exception handling (Task Parallel Library) (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/exception-handling-task-parallel-library.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Exception handling (Task Parallel Library) (part 2 of 2)

## Using the handle method to filter inner exceptions

You can use the `System.AggregateException.Handle*` method to filter out exceptions that you can treat as "handled" without using any further logic. In the user delegate that is supplied to the `System.AggregateException.Handle(System.Func{System.Exception,System.Boolean})` method, you can examine the exception type, its `System.Exception.Message` property, or any other information about it that will let you determine whether it is benign. Any exceptions for which the delegate returns `false` are rethrown in a new `System.AggregateException` instance immediately after the `System.AggregateException.Handle*` method returns.

The following example is functionally equivalent to the first example in this topic, which examines each exception in the `System.AggregateException.InnerExceptions*` collection.  Instead, this exception handler calls the `System.AggregateException.Handle*` method object for each exception, and only rethrows exceptions that are not `CustomException` instances.

```csharp

public static partial class Program
{
    public static void HandleMethodThree()
    {
        var task = Task.Run(
            () => throw new CustomException("This exception is expected!"));

        try
        {
            task.Wait();
        }
        catch (AggregateException ae)
        {
            // Call the Handle method to handle the custom exception,
            // otherwise rethrow the exception.
            ae.Handle(ex =>
            {
                if (ex is CustomException)
                {
                    Console.WriteLine(ex.Message);
                }
                return ex is CustomException;
            });
        }
    }
}
// The example displays the following output:
//        This exception is expected!
```

The following is a more complete example that uses the `System.AggregateException.Handle*` method to provide special handling for an `System.UnauthorizedAccessException` exception when enumerating files.

```csharp
public static partial class Program
{
    public static void TaskException()
    {
        // This should throw an UnauthorizedAccessException.
        try
        {
            if (GetAllFiles(@"C:\") is { Length: > 0 } files)
            {
                foreach (var file in files)
                {
                    Console.WriteLine(file);
                }
            }
        }
        catch (AggregateException ae)
        {
            foreach (var ex in ae.InnerExceptions)
            {
                Console.WriteLine($"{ex.GetType().Name}: {ex.Message}");
            }
        }
        Console.WriteLine();

        // This should throw an ArgumentException.
        try
        {
            foreach (var s in GetAllFiles(""))
            {
                Console.WriteLine(s);
            }
        }
        catch (AggregateException ae)
        {
            foreach (var ex in ae.InnerExceptions)
                Console.WriteLine($"{ex.GetType().Name}: {ex.Message}");
        }
    }

    static string[] GetAllFiles(string path)
    {
        var task1 =
            Task.Run(() => Directory.GetFiles(
                path, "*.txt",
                SearchOption.AllDirectories));

        try
        {
            return task1.Result;
        }
        catch (AggregateException ae)
        {
            ae.Handle(x =>
            {
                // Handle an UnauthorizedAccessException
                if (x is UnauthorizedAccessException)
                {
                    Console.WriteLine(
                        "You do not have permission to access all folders in this path.");
                    Console.WriteLine(
                        "See your network administrator or try another path.");
                }
                return x is UnauthorizedAccessException;
            });
            return Array.Empty<string>();
        }
    }
}
// The example displays the following output:
//       You do not have permission to access all folders in this path.
//       See your network administrator or try another path.
//
//       ArgumentException: The path is not of a legal form.
```

## Observing exceptions by using the Task.Exception property

If a task completes in the `System.Threading.Tasks.TaskStatus.Faulted` state, its `System.Threading.Tasks.Task.Exception` property can be examined to discover which specific exception caused the fault. A good way to observe the `System.Threading.Tasks.Task.Exception` property is to use a continuation that runs only if the antecedent task faults, as shown in the following example.

```csharp

public static partial class Program
{
    public static void ExceptionPropagationTwo()
    {
        _ = Task.Run(
            () => throw new CustomException("task1 faulted."))
            .ContinueWith(_ =>
            {
                if (_.Exception?.InnerException is { } inner)
                {
                    Console.WriteLine($"{inner.GetType().Name}: {inner.Message}");
                }
            }, 
            TaskContinuationOptions.OnlyOnFaulted);
        
        Thread.Sleep(500);
    }
}
// The example displays output like the following:
//        CustomException: task1 faulted.
```

In a meaningful application, the continuation delegate could log detailed information about the exception and possibly spawn new tasks to recover from the exception. If a task faults, the following expressions throw the exception:

- `await task`
- `task.Wait()`
- `task.Result`
- `task.GetAwaiter().GetResult()`

Use a `try-catch` statement to handle and observe thrown exceptions. Alternatively, observe the exception by accessing the `System.Threading.Tasks.Task.Exception` property.

> **Important:**
> The `System.AggregateException` cannot be explicitly caught when using the following expressions:
>
> - `await task`
> - `task.GetAwaiter().GetResult()`

## UnobservedTaskException event

In some scenarios, such as when hosting untrusted plug-ins, benign exceptions might be common, and it might be too difficult to manually observe them all. In these cases, you can handle the `System.Threading.Tasks.TaskScheduler.UnobservedTaskException` event. The `System.Threading.Tasks.UnobservedTaskExceptionEventArgs` instance that is passed to your handler can be used to prevent the unobserved exception from being propagated back to the joining thread.

## See also

- Task Parallel Library (TPL)
