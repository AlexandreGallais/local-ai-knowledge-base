---
title: "Task class (part 11 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Task.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Task class (part 11 of 11)

## Task.WhenEach(Task>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Threading.Tasks.Task> WhenEach (scoped ReadOnlySpan<System.Threading.Tasks.Task> tasks);
```

To be added.

Parameters:

- `tasks`: The tasks to iterate through as they complete.

Returns: To be added.

To be added.

## Task.WhenEach(Task[]) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Threading.Tasks.Task> WhenEach (params System.Threading.Tasks.Task[] tasks);
```

Creates an `IAsyncEnumerable<T>` that will yield the supplied tasks as those tasks complete.

Parameters:

- `tasks`: The task to iterate through when completed.

Returns: An `IAsyncEnumerable<T>` for iterating through the supplied tasks.

Exceptions:

- `ArgumentNullException`: `tasks` is `null`.
- `ArgumentException`: `tasks` contains a `null`.

The supplied tasks will become available to be output via the enumerable once they've completed. The exact order in which the tasks will become available is not defined.

## Task.WhenEach<TResult>(Task<TResult>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Threading.Tasks.Task<TResult>> WhenEach<TResult> (System.Collections.Generic.IEnumerable<System.Threading.Tasks.Task<TResult>> tasks);
```

To be added.

Parameters:

- `TResult`: The type of the result returned by the tasks.
- `tasks`: The tasks to iterate through as they complete.

Returns: To be added.

To be added.

## Task.WhenEach<TResult>(Task<TResult>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Threading.Tasks.Task<TResult>> WhenEach<TResult> (scoped ReadOnlySpan<System.Threading.Tasks.Task<TResult>> tasks);
```

To be added.

Parameters:

- `TResult`: The type of the result returned by the tasks.
- `tasks`: The tasks to iterate through as they complete.

Returns: To be added.

To be added.

## Task.WhenEach<TResult>(Task<TResult>[]) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Threading.Tasks.Task<TResult>> WhenEach<TResult> (params System.Threading.Tasks.Task<TResult>[] tasks);
```

To be added.

Parameters:

- `TResult`: The type of the result returned by the tasks.
- `tasks`: The tasks to iterate through as they complete.

Returns: To be added.

To be added.

## Task.Yield() method

```csharp
public static System.Runtime.CompilerServices.YieldAwaitable Yield ();
```

Creates an awaitable task that asynchronously yields back to the current context when awaited.

Returns: A context that, when awaited, will asynchronously transition back into the current context at the time of the await. If the current `SynchronizationContext` is non-null, it is treated as the current context. Otherwise, the task scheduler that is associated with the currently executing task is treated as the current context.

#### Remarks
You can use `await Task.Yield();` in an asynchronous method to force the method to complete asynchronously. If there is a current synchronization context (`SynchronizationContext` object), this will post the remainder of the method's execution back to that context. However, the context will decide how to prioritize this work relative to other work that may be pending. The synchronization context that is present on a UI thread in most UI environments will often prioritize work posted to the context higher than input and rendering work. For this reason, do not rely on `await Task.Yield();` to keep a UI responsive.  For more information, see the entry Useful Abstractions Enabled with ContinueWith in the Parallel Programming with .NET blog.
