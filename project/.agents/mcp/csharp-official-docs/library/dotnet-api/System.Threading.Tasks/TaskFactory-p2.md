---
title: "TaskFactory class (part 2 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskFactory class (part 2 of 8)

## TaskFactory.ContinueWhenAll(Task[], Task[]>, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task ContinueWhenAll (System.Threading.Tasks.Task[] tasks, Action<System.Threading.Tasks.Task[]> continuationAction, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation task that starts when a set of specified tasks has completed.

Parameters:

- `tasks`: The array of tasks from which to continue.
- `continuationAction`: The action delegate to execute when all tasks in the `tasks` array have completed.
- `cancellationToken`: The cancellation token to assign to the new continuation task.
- `continuationOptions`: A bitwise combination of the enumeration values that control the behavior of the new continuation task.
- `scheduler`: The object that is used to schedule the new continuation task.

Returns: The new continuation task.

Exceptions:

- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationAction` argument is `null`.

-or-

The `scheduler` argument is `null`.
- `ArgumentException`: The `tasks` array is empty or contains a null value.
- `ArgumentOutOfRangeException`: `continuationOptions` specifies an invalid `TaskContinuationOptions` value.
- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.

#### Remarks

The NotOn\* and OnlyOn\* `TaskContinuationOptions`, which constrain for which `TaskStatus` states a continuation will be executed, are illegal with `ContinueWhenAll`.

## TaskFactory.ContinueWhenAll<TAntecedentResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>[]>) method

```csharp
public System.Threading.Tasks.Task ContinueWhenAll<TAntecedentResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Action<System.Threading.Tasks.Task<TAntecedentResult>[]> continuationAction);
```

Creates a continuation task that starts when a set of specified tasks has completed.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `tasks`: The array of tasks from which to continue.
- `continuationAction`: The action delegate to execute when all tasks in the `tasks` array have completed.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: An element in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationAction` argument is `null`.
- `ArgumentException`: The `tasks` array is empty or contains a null value.

To be added.

## TaskFactory.ContinueWhenAll<TAntecedentResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>[]>, CancellationToken) method

```csharp
public System.Threading.Tasks.Task ContinueWhenAll<TAntecedentResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Action<System.Threading.Tasks.Task<TAntecedentResult>[]> continuationAction, System.Threading.CancellationToken <example-value>);
```

Creates a continuation task that starts when a set of specified tasks has completed.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `tasks`: The array of tasks from which to continue.
- `continuationAction`: The action delegate to execute when all tasks in the `tasks` array have completed.
- `cancellationToken`: The cancellation token to assign to the new continuation task.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: An element in the `tasks` array has been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationAction` argument is `null`.
- `ArgumentException`: The `tasks` array is empty or contains a null value.

To be added.

## TaskFactory.ContinueWhenAll<TAntecedentResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>[]>, TaskContinuationOptions) method

```csharp
public System.Threading.Tasks.Task ContinueWhenAll<TAntecedentResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Action<System.Threading.Tasks.Task<TAntecedentResult>[]> continuationAction, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Creates a continuation task that starts when a set of specified tasks has completed.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `tasks`: The array of tasks from which to continue.
- `continuationAction`: The action delegate to execute when all tasks in the `tasks` array have completed.
- `continuationOptions`: A bitwise combination of the enumeration values that control the behavior of the new continuation task. The NotOn* and OnlyOn* members are not supported.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: An element in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationAction` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value.
- `ArgumentException`: The `tasks` array is empty or contains a null value.

#### Remarks

The NotOn\* and OnlyOn\* `TaskContinuationOptions`, which constrain for which `TaskStatus` states a continuation will be executed, are illegal with `ContinueWhenAll`.

## TaskFactory.ContinueWhenAll<TAntecedentResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>[]>, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task ContinueWhenAll<TAntecedentResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Action<System.Threading.Tasks.Task<TAntecedentResult>[]> continuationAction, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation task that starts when a set of specified tasks has completed.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `tasks`: The array of tasks from which to continue.
- `continuationAction`: The action delegate to execute when all tasks in the `tasks` array have completed.
- `cancellationToken`: The cancellation token to assign to the new continuation task.
- `continuationOptions`: A bitwise combination of the enumeration values that control the behavior of the new continuation task. The NotOn* and OnlyOn* members are not supported.
- `scheduler`: The object that is used to schedule the new continuation task.

Returns: The new continuation task.

Exceptions:

- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationAction` argument is `null`.

-or-

The `scheduler` argument is `null`.
- `ArgumentException`: The `tasks` array is empty or contains a null value.
- `ArgumentOutOfRangeException`: `continuationOptions` specifies an invalid `TaskContinuationOptions` value.
- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.

#### Remarks

The NotOn\* and OnlyOn\* `TaskContinuationOptions`, which constrain for which `TaskStatus` states a continuation will be executed, are illegal with `ContinueWhenAll`.

## TaskFactory.ContinueWhenAll<TResult>(Task[], Task[],TResult>) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAll<TResult> (System.Threading.Tasks.Task[] tasks, Func<System.Threading.Tasks.Task[],TResult> continuationFunction);
```

Creates a continuation task that starts when a set of specified tasks has completed.

Parameters:

- `TResult`: The type of the result that is returned by the `continuationFunction` delegate and associated with the created task.
- `tasks`: The array of tasks from which to continue.
- `continuationFunction`: The function delegate to execute asynchronously when all tasks in the `tasks` array have completed.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: An element in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.
- `ArgumentException`: The `tasks` array is empty or contains a null value.

To be added.

## TaskFactory.ContinueWhenAll<TResult>(Task[], Task[],TResult>, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAll<TResult> (System.Threading.Tasks.Task[] tasks, Func<System.Threading.Tasks.Task[],TResult> continuationFunction, System.Threading.CancellationToken <example-value>);
```

Creates a continuation task that starts when a set of specified tasks has completed.

Parameters:

- `TResult`: The type of the result that is returned by the `continuationFunction` delegate and associated with the created task.
- `tasks`: The array of tasks from which to continue.
- `continuationFunction`: The function delegate to execute asynchronously when all tasks in the `tasks` array have completed.
- `cancellationToken`: The cancellation token to assign to the new continuation task.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: An element in the `tasks` array has been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.
- `ArgumentException`: The `tasks` array is empty or contains a null value.

To be added.

## TaskFactory.ContinueWhenAll<TResult>(Task[], Task[],TResult>, TaskContinuationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAll<TResult> (System.Threading.Tasks.Task[] tasks, Func<System.Threading.Tasks.Task[],TResult> continuationFunction, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Creates a continuation task that starts when a set of specified tasks has completed.

Parameters:

- `TResult`: The type of the result that is returned by the `continuationFunction` delegate and associated with the created task.
- `tasks`: The array of tasks from which to continue.
- `continuationFunction`: The function delegate to execute asynchronously when all tasks in the `tasks` array have completed.
- `continuationOptions`: A bitwise combination of the enumeration values that control the behavior of the new continuation task. The NotOn* and OnlyOn* members are not supported.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: An element in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value.
- `ArgumentException`: The `tasks` array is empty or contains a null value.

#### Remarks

The NotOn\* and OnlyOn\* `TaskContinuationOptions`, which constrain for which `TaskStatus` states a continuation will be executed, are illegal with `ContinueWhenAll`.

## TaskFactory.ContinueWhenAll<TResult>(Task[], Task[],TResult>, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAll<TResult> (System.Threading.Tasks.Task[] tasks, Func<System.Threading.Tasks.Task[],TResult> continuationFunction, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation task that starts when a set of specified tasks has completed.

Parameters:

- `TResult`: The type of the result that is returned by the `continuationFunction` delegate and associated with the created task.
- `tasks`: The array of tasks from which to continue.
- `continuationFunction`: The function delegate to execute asynchronously when all tasks in the `tasks` array have completed.
- `cancellationToken`: The cancellation token to assign to the new continuation task.
- `continuationOptions`: A bitwise combination of the enumeration values that control the behavior of the new continuation task. The NotOn* and OnlyOn* members are not supported.
- `scheduler`: The object that is used to schedule the new continuation task.

Returns: The new continuation task.

Exceptions:

- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.

-or-

The `scheduler` argument is `null`.
- `ArgumentException`: The `tasks` array is empty or contains a null value.
- `ArgumentOutOfRangeException`: `continuationOptions` specifies an invalid `TaskContinuationOptions` value.
- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.

#### Remarks

The NotOn\* and OnlyOn\* `TaskContinuationOptions`, which constrain for which `TaskStatus` states a continuation will be executed, are illegal with `ContinueWhenAll`.

## TaskFactory.ContinueWhenAll<TAntecedentResult,TResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>[],TResult>) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAll<TAntecedentResult,TResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Func<System.Threading.Tasks.Task<TAntecedentResult>[],TResult> continuationFunction);
```

Creates a continuation task that starts when a set of specified tasks has completed.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `TResult`: The type of the result that is returned by the `continuationFunction` delegate and associated with the created task.
- `tasks`: The array of tasks from which to continue.
- `continuationFunction`: The function delegate to execute asynchronously when all tasks in the `tasks` array have completed.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: An element in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.
- `ArgumentException`: The `tasks` array is empty or contains a null value.

To be added.
