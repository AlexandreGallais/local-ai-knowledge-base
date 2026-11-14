---
title: "Task class (part 10 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Task.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Task class (part 10 of 11)

## Task.WhenAll<TResult>(Task<TResult>>) method

```csharp
public static System.Threading.Tasks.Task<TResult[]> WhenAll<TResult> (System.Collections.Generic.IEnumerable<System.Threading.Tasks.Task<TResult>> tasks);
```

Creates a task that will complete when all of the `Task<T>` objects in an enumerable collection have completed.

Parameters:

- `TResult`: The type of the completed task.
- `tasks`: The tasks to wait on for completion.

Returns: A task that represents the completion of all of the supplied tasks.

Exceptions:

- `ArgumentNullException`: The `tasks` argument was `null`.
- `ArgumentException`: The `tasks` collection contained a `null` task.

#### Remarks
The call to `WhenAll<T>` method does not block the calling thread. However, a call to the returned `Result` property does block the calling thread.

If any of the supplied tasks completes in a faulted state, the returned task will also complete in a `Faulted` state, where its exceptions will contain the aggregation of the set of unwrapped exceptions from each of the supplied tasks.

If none of the supplied tasks faulted but at least one of them was canceled, the returned task will end in the `Canceled` state.

If none of the tasks faulted and none of the tasks were canceled, the resulting task will end in the `RanToCompletion` state.  The `Result` property of the returned task will be set to an array containing all of the results of the supplied tasks in the same order as they were provided (e.g. if the input tasks array contained t1, t2, t3, the output task's `Result` property will return an `TResult[]` where `arr[0] == t1.Result, arr[1] == t2.Result, and arr[2] == t3.Result)`.

If the `tasks` argument contains no tasks, the returned task will immediately transition to a `RanToCompletion` state before it's returned to the caller. The returned `TResult[]` will be an array of 0 elements.

#### Examples
The following example creates ten tasks, each of which instantiates a random number generator that creates 1,000 random numbers between 1 and 1,000 and computes their mean. The `Delay` method is used to delay instantiation of the random number generators so that they are not created with identical seed values. The call to the `Task.WhenAll` method then returns an `Int64` array that contains the mean computed by each task. These are then used to calculate the overall mean.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/WhenAll/whenall1.cs._

In this case, the ten individual tasks are stored in a `List<T>` object. `List<T>` implements the `IEnumerable<T>` interface.

## Task.WhenAll<TResult>(Task<TResult>>) method

```csharp
public static System.Threading.Tasks.Task<TResult[]> WhenAll<TResult> (scoped ReadOnlySpan<System.Threading.Tasks.Task<TResult>> tasks);
```

Creates a task that will complete when all of the supplied tasks have completed.

Parameters:

- `TResult`: The type of the result returned by the tasks.
- `tasks`: The tasks to wait on for completion.

Returns: A task that represents the completion of all of the supplied tasks.

Exceptions:

- `ArgumentException`: The `tasks` array contains a `null` task.

If any of the supplied tasks completes in a faulted state, the returned task will also complete in a Faulted state, where its exceptions will contain the aggregation of the set of unwrapped exceptions from each of the supplied tasks.

If none of the supplied tasks faulted but at least one of them was canceled, the returned task will end in the Canceled state.

If none of the tasks faulted and none of the tasks were canceled, the resulting task will end in the RanToCompletion state.
The Result of the returned task will be set to an array containing all of the results of the supplied tasks in the same order as they were provided (e.g. if the input tasks array contained t1, t2, t3, the output task's Result will return an TResult[] where arr[0] == t1.Result, arr[1] == t2.Result, and arr[2] == t3.Result).

If the supplied array/enumerable contains no tasks, the returned task will immediately transition to a RanToCompletion state before it's returned to the caller.  The returned TResult[] will be an array of 0 elements.

## Task.WhenAll<TResult>(Task<TResult>[]) method

```csharp
public static System.Threading.Tasks.Task<TResult[]> WhenAll<TResult> (params System.Threading.Tasks.Task<TResult>[] tasks);
```

Creates a task that will complete when all of the `Task<T>` objects in an array have completed.

Parameters:

- `TResult`: The type of the completed task.
- `tasks`: The tasks to wait on for completion.

Returns: A task that represents the completion of all of the supplied tasks.

Exceptions:

- `ArgumentNullException`: The `tasks` argument was `null`.
- `ArgumentException`: The `tasks` array contained a `null` task.

#### Remarks
The call to `WhenAll<T>` method does not block the calling thread. However, a call to the returned `Result` property does block the calling thread.

If any of the supplied tasks completes in a faulted state, the returned task will also complete in a `Faulted` state, where its exceptions will contain the aggregation of the set of unwrapped exceptions from each of the supplied tasks.

If none of the supplied tasks faulted but at least one of them was canceled, the returned task will end in the `Canceled` state.

If none of the tasks faulted and none of the tasks were canceled, the resulting task will end in the `RanToCompletion` state.  The `Task<T>.Result` of the returned task will be set to an array containing all of the results of the supplied tasks in the same order as they were provided (e.g. if the input tasks array contained t1, t2, t3, the output   task's `Task<T>.Result` will return an `TResult[]` where `arr[0] == t1.Result, arr[1] == t2.Result, and arr[2] == t3.Result)`.

If the supplied array/enumerable contains no tasks, the returned task will immediately transition to a `RanToCompletion` state before it's returned to the caller.  The returned `TResult[]` will be an array of 0 elements.

#### Examples
The following example creates ten tasks, each of which instantiates a random number generator that creates 1,000 random numbers between 1 and 1,000 and computes their mean. In this case, the ten individual tasks are stored in a `Task<Int64>` array.  The `Delay` method is used to delay instantiation of the random number generators so that they are not created with identical seed values. The call to the `Task.WhenAll` method then returns an `Int64` array that contains the mean computed by each task. These are then used to calculate the overall mean.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/WhenAll/whenall2.cs._

## Task.WhenAny(Task>) method

```csharp
public static System.Threading.Tasks.Task<System.Threading.Tasks.Task> WhenAny (System.Collections.Generic.IEnumerable<System.Threading.Tasks.Task> tasks);
```

Creates a task that will complete when any of the supplied tasks have completed.

Parameters:

- `tasks`: The tasks to wait on for completion.

Returns: A task that represents the completion of one of the supplied tasks.  The return task's Result is the task that completed.

Exceptions:

- `ArgumentNullException`: The `tasks` argument was `null`.
- `ArgumentException`: The `tasks` array contained a null task, or was empty.

#### Remarks
The returned task will complete when any of the supplied tasks has completed.  The returned task will always end in the `RanToCompletion` state  with its Result set to the first task to complete.  This is true even if the first task to complete ended in the `Canceled` or `Faulted` state.

## Task.WhenAny(Task>) method

```csharp
public static System.Threading.Tasks.Task<System.Threading.Tasks.Task> WhenAny (scoped ReadOnlySpan<System.Threading.Tasks.Task> tasks);
```

Creates a task that will complete when any of the supplied tasks have completed.

Parameters:

- `tasks`: The tasks to wait on for completion.

Returns: A task that represents the completion of one of the supplied tasks.  The return Task's Result is the task that completed.

Exceptions:

- `ArgumentException`: The `tasks` array contains a `null` task, or is empty.

The returned task will complete when any of the supplied tasks has completed.  The returned task will always end in the RanToCompletion state with its Result set to the first task to complete.  This is `true` even if the first task to complete ended in the Canceled or Faulted state.

## Task.WhenAny(Task[]) method

```csharp
public static System.Threading.Tasks.Task<System.Threading.Tasks.Task> WhenAny (params System.Threading.Tasks.Task[] tasks);
```

Creates a task that will complete when any of the supplied tasks have completed.

Parameters:

- `tasks`: The tasks to wait on for completion.

Returns: A task that represents the completion of one of the supplied tasks.  The return task's Result is the task that completed.

Exceptions:

- `ArgumentNullException`: The `tasks` argument was null.
- `ArgumentException`: The `tasks` array contained a null task, or was empty.

#### Remarks
The returned task will complete when any of the supplied tasks has completed.  The returned task will always end in the `RanToCompletion` state   with its `Result` set to the first task to complete.  This is true even if the first task to complete ended in the `Canceled` or `Faulted` state.

## Task.WhenAny(Task, Task) method

```csharp
public static System.Threading.Tasks.Task<System.Threading.Tasks.Task> WhenAny (System.Threading.Tasks.Task task1, System.Threading.Tasks.Task task2);
```

Creates a task that will complete when either of the supplied tasks have completed.

Parameters:

- `task1`: The first task to wait on for completion.
- `task2`: The second task to wait on for completion.

Returns: A new task that represents the completion of one of the supplied tasks. Its `Result` is the task that completed first.

Exceptions:

- `ArgumentNullException`: `task1` or `task2` was `null`.

#### Remarks

The returned task completes when any of the supplied tasks has completed. The returned task always ends in the `RanToCompletion` state with its `Result` set to the first task to complete. This is true even if the first task to complete ended in the `Canceled` or `Faulted` state.

## Task.WhenAny<TResult>(Task<TResult>>) method

```csharp
public static System.Threading.Tasks.Task<System.Threading.Tasks.Task<TResult>> WhenAny<TResult> (System.Collections.Generic.IEnumerable<System.Threading.Tasks.Task<TResult>> tasks);
```

Creates a task that will complete when any of the supplied tasks have completed.

Parameters:

- `TResult`: The type of the completed task.
- `tasks`: The tasks to wait on for completion.

Returns: A task that represents the completion of one of the supplied tasks.  The return task's Result is the task that completed.

Exceptions:

- `ArgumentNullException`: The `tasks` argument was `null`.
- `ArgumentException`: The `tasks` array contained a null task, or was empty.

#### Remarks
The returned task will complete when any of the supplied tasks has completed.  The returned task will always end in the `RanToCompletion` state with its `Result` set to the first task to complete. This is true even if the first task to complete ended in the `Canceled` or `Faulted` state.

## Task.WhenAny<TResult>(Task<TResult>>) method

```csharp
public static System.Threading.Tasks.Task<System.Threading.Tasks.Task<TResult>> WhenAny<TResult> (scoped ReadOnlySpan<System.Threading.Tasks.Task<TResult>> tasks);
```

Creates a task that will complete when any of the supplied tasks have completed.

Parameters:

- `TResult`: The type of the result returned by the tasks.
- `tasks`: The tasks to wait on for completion.

Returns: A task that represents the completion of one of the supplied tasks.  The return Task's Result is the task that completed.

Exceptions:

- `ArgumentException`: The `tasks` array contains a `null` task, or is empty.

The returned task will complete when any of the supplied tasks has completed.  The returned task will always end in the RanToCompletion state with its Result set to the first task to complete.  This is `true` even if the first task to complete ended in the Canceled or Faulted state.

## Task.WhenAny<TResult>(Task<TResult>[]) method

```csharp
public static System.Threading.Tasks.Task<System.Threading.Tasks.Task<TResult>> WhenAny<TResult> (params System.Threading.Tasks.Task<TResult>[] tasks);
```

Creates a task that will complete when any of the supplied tasks have completed.

Parameters:

- `TResult`: The type of the completed task.
- `tasks`: The tasks to wait on for completion.

Returns: A task that represents the completion of one of the supplied tasks.  The return task's Result is the task that completed.

Exceptions:

- `ArgumentNullException`: The `tasks` argument was null.
- `ArgumentException`: The `tasks` array contained a null task, or was empty.

#### Remarks
The returned task will complete when any of the supplied tasks has completed.  The returned task will always end in the `RanToCompletion` state with its `Result` set to the first task to complete. This is true even if the first task to complete ended in the `Canceled` or `Faulted` state.

## Task.WhenAny<TResult>(Task<TResult>, Task<TResult>) method

```csharp
public static System.Threading.Tasks.Task<System.Threading.Tasks.Task<TResult>> WhenAny<TResult> (System.Threading.Tasks.Task<TResult> task1, System.Threading.Tasks.Task<TResult> task2);
```

Creates a task that will complete when either of the supplied tasks have completed.

Parameters:

- `TResult`: The type of the result of the returned task.
- `task1`: The first task to wait on for completion.
- `task2`: The second task to wait on for completion.

Returns: A task that represents the completion of one of the supplied tasks. The returned task's `TResult` is the task that completed first.

Exceptions:

- `ArgumentNullException`: `task1` or `task2` was `null`.

#### Remarks

The returned task completes when any of the supplied tasks has completed. The returned task always ends in the `RanToCompletion` state with its `Result` set to the first task to complete. This is true even if the first task to complete ended in the `Canceled` or `Faulted` state.

> **Tip:**
> In every overload of Task.WhenAny(), when the method returns the first completed task, the other tasks will continue running until completion, even if any of them completed in the `Canceled` or `Faulted` state. If that behavior is undesirable, you can cancel all the remaining tasks once the first task completes.

## Task.WhenEach(Task>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Threading.Tasks.Task> WhenEach (System.Collections.Generic.IEnumerable<System.Threading.Tasks.Task> tasks);
```

To be added.

Parameters:

- `tasks`: The tasks to iterate through as they complete.

Returns: To be added.

To be added.
