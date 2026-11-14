---
title: "TaskFactory class (part 4 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskFactory class (part 4 of 8)

## TaskFactory.ContinueWhenAny<TAntecedentResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>>, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task ContinueWhenAny<TAntecedentResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Action<System.Threading.Tasks.Task<TAntecedentResult>> continuationAction, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation `Task` that will be started upon the completion of any Task in the provided set.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `tasks`: The array of tasks from which to continue when one task completes.
- `continuationAction`: The action delegate to execute when one task in the `tasks` array completes.
- `cancellationToken`: The `CancellationToken` that will be assigned to the new continuation task.
- `continuationOptions`: The `TaskContinuationOptions` value that controls the behavior of the created continuation `Task`.
- `scheduler`: The `TaskScheduler` that is used to schedule the created continuation `Task<T>`.

Returns: The new continuation `Task`.

Exceptions:

- `ArgumentNullException`: The `tasks` array is `null`.

-or-

`continuationAction` is `null`.

-or-

paramref name="scheduler" /> is `null`.
- `ArgumentException`: The `tasks` array contains a `null` value.

-or-

The `tasks` array is empty.
- `ArgumentOutOfRangeException`: `continuationOptions` specifies an invalid `TaskContinuationOptions` value.
- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.

#### Remarks

The NotOn\* and OnlyOn\* `TaskContinuationOptions`, which constrain for which `TaskStatus` states a continuation will be executed, are illegal with `ContinueWhenAny`.

## TaskFactory.ContinueWhenAny<TResult>(Task[], Task,TResult>) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAny<TResult> (System.Threading.Tasks.Task[] tasks, Func<System.Threading.Tasks.Task,TResult> continuationFunction);
```

Creates a continuation `Task<T>` that will be started upon the completion of any Task in the provided set.

Parameters:

- `TResult`: The type of the result that is returned by the `continuationFunction` delegate and associated with the created `Task<T>`.
- `tasks`: The array of tasks from which to continue when one task completes.
- `continuationFunction`: The function delegate to execute asynchronously when one task in the `tasks` array completes.

Returns: The new continuation `Task<T>`.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

`continuationFunction` is `null`.
- `ArgumentException`: The `tasks` array contains a null value.

-or-

The `tasks` array is empty.

To be added.

## TaskFactory.ContinueWhenAny<TResult>(Task[], Task,TResult>, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAny<TResult> (System.Threading.Tasks.Task[] tasks, Func<System.Threading.Tasks.Task,TResult> continuationFunction, System.Threading.CancellationToken <example-value>);
```

Creates a continuation `Task<T>` that will be started upon the completion of any Task in the provided set.

Parameters:

- `TResult`: The type of the result that is returned by the `continuationFunction` delegate and associated with the created `Task<T>`.
- `tasks`: The array of tasks from which to continue when one task completes.
- `continuationFunction`: The function delegate to execute asynchronously when one task in the `tasks` array completes.
- `cancellationToken`: The `CancellationToken` that will be assigned to the new continuation task.

Returns: The new continuation `Task<T>`.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.

-or-

The provided `CancellationToken` has already been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

`continuationFunction` is `null`.
- `ArgumentException`: The `tasks` array contains a `null` value.

-or-

The `tasks` array is empty.

To be added.

## TaskFactory.ContinueWhenAny<TResult>(Task[], Task,TResult>, TaskContinuationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAny<TResult> (System.Threading.Tasks.Task[] tasks, Func<System.Threading.Tasks.Task,TResult> continuationFunction, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Creates a continuation `Task<T>` that will be started upon the completion of any Task in the provided set.

Parameters:

- `TResult`: The type of the result that is returned by the `continuationFunction` delegate and associated with the created `Task<T>`.
- `tasks`: The array of tasks from which to continue when one task completes.
- `continuationFunction`: The function delegate to execute asynchronously when one task in the `tasks` array completes.
- `continuationOptions`: The `TaskContinuationOptions` value that controls the behavior of the created continuation `Task<T>`.

Returns: The new continuation `Task<T>`.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

`continuationFunction` is `null`.
- `ArgumentOutOfRangeException`: `continuationOptions` specifies an invalid TaskContinuationOptions value.
- `ArgumentException`: The `tasks` array contains a `null` value.

-or-

The `tasks` array is empty.

#### Remarks

The NotOn\* and OnlyOn\* `TaskContinuationOptions`, which constrain for which `TaskStatus` states a continuation will be executed, are illegal with `ContinueWhenAny`.

## TaskFactory.ContinueWhenAny<TResult>(Task[], Task,TResult>, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAny<TResult> (System.Threading.Tasks.Task[] tasks, Func<System.Threading.Tasks.Task,TResult> continuationFunction, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation `Task<T>` that will be started upon the completion of any Task in the provided set.

Parameters:

- `TResult`: The type of the result that is returned by the `continuationFunction` delegate and associated with the created `Task<T>`.
- `tasks`: The array of tasks from which to continue when one task completes.
- `continuationFunction`: The function delegate to execute asynchronously when one task in the `tasks` array completes.
- `cancellationToken`: The `CancellationToken` that will be assigned to the new continuation task.
- `continuationOptions`: The `TaskContinuationOptions` value that controls the behavior of the created continuation `Task<T>`.
- `scheduler`: The `TaskScheduler` that is used to schedule the created continuation `Task<T>`.

Returns: The new continuation `Task<T>`.

Exceptions:

- `ArgumentNullException`: The `tasks` array is `null`.

-or-

`continuationFunction` is `null`.

-or-

`scheduler` is `null`.
- `ArgumentException`: The `tasks` array contains a `null` value.

-or-

The `tasks` array is empty.
- `ArgumentOutOfRangeException`: `continuationOptions` specifies an invalid TaskContinuationOptions value.
- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.

#### Remarks

The NotOn\* and OnlyOn\* `TaskContinuationOptions`, which constrain for which `TaskStatus` states a continuation will be executed, are illegal with `ContinueWhenAny`.

## TaskFactory.ContinueWhenAny<TAntecedentResult,TResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>,TResult>) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAny<TAntecedentResult,TResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Func<System.Threading.Tasks.Task<TAntecedentResult>,TResult> continuationFunction);
```

Creates a continuation `Task<T>` that will be started upon the completion of any Task in the provided set.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `TResult`: The type of the result that is returned by the `continuationFunction` delegate and associated with the created `Task<T>`.
- `tasks`: The array of tasks from which to continue when one task completes.
- `continuationFunction`: The function delegate to execute asynchronously when one task in the `tasks` array completes.

Returns: The new continuation `Task<T>`.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

`continuationFunction` is `null`.
- `ArgumentException`: The `tasks` array contains a null value.

-or-

The `tasks` array is empty.

To be added.

## TaskFactory.ContinueWhenAny<TAntecedentResult,TResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>,TResult>, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAny<TAntecedentResult,TResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Func<System.Threading.Tasks.Task<TAntecedentResult>,TResult> continuationFunction, System.Threading.CancellationToken <example-value>);
```

Creates a continuation `Task<T>` that will be started upon the completion of any Task in the provided set.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `TResult`: The type of the result that is returned by the `continuationFunction` delegate and associated with the created `Task<T>`.
- `tasks`: The array of tasks from which to continue when one task completes.
- `continuationFunction`: The function delegate to execute asynchronously when one task in the `tasks` array completes.
- `cancellationToken`: The `CancellationToken` that will be assigned to the new continuation task.

Returns: The new continuation `Task<T>`.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.

-or-

The provided `CancellationToken` has already been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

`continuationFunction` is `null`.
- `ArgumentException`: The `tasks` array contains a `null` value.

-or-

The `tasks` array is empty.

To be added.

## TaskFactory.ContinueWhenAny<TAntecedentResult,TResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>,TResult>, TaskContinuationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAny<TAntecedentResult,TResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Func<System.Threading.Tasks.Task<TAntecedentResult>,TResult> continuationFunction, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Creates a continuation `Task<T>` that will be started upon the completion of any Task in the provided set.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `TResult`: The type of the result that is returned by the `continuationFunction` delegate and associated with the created `Task<T>`.
- `tasks`: The array of tasks from which to continue when one task completes.
- `continuationFunction`: The function delegate to execute asynchronously when one task in the `tasks` array completes.
- `continuationOptions`: The `TaskContinuationOptions` value that controls the behavior of the created continuation `Task<T>`.

Returns: The new continuation `Task<T>`.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

`continuationFunction` is `null`.
- `ArgumentOutOfRangeException`: `continuationOptions` specifies an invalid TaskContinuationOptions value.
- `ArgumentException`: The `tasks` array contains a null value.

-or-

The `tasks` array is empty.

#### Remarks

The NotOn\* and OnlyOn\* `TaskContinuationOptions`, which constrain for which `TaskStatus` states a continuation will be executed, are illegal with `ContinueWhenAny`.

## TaskFactory.ContinueWhenAny<TAntecedentResult,TResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>,TResult>, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAny<TAntecedentResult,TResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Func<System.Threading.Tasks.Task<TAntecedentResult>,TResult> continuationFunction, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation `Task<T>` that will be started upon the completion of any Task in the provided set.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `TResult`: The type of the result that is returned by the `continuationFunction` delegate and associated with the created `Task<T>`.
- `tasks`: The array of tasks from which to continue when one task completes.
- `continuationFunction`: The function delegate to execute asynchronously when one task in the `tasks` array completes.
- `cancellationToken`: The `CancellationToken` that will be assigned to the new continuation task.
- `continuationOptions`: The `TaskContinuationOptions` value that controls the behavior of the created continuation `Task<T>`.
- `scheduler`: The `TaskScheduler` that is used to schedule the created continuation `Task<T>`.

Returns: The new continuation `Task<T>`.

Exceptions:

- `ArgumentNullException`: The `tasks` array is `null`.

-or-

`continuationFunction` is `null`.

-or-

`scheduler` is `null`.
- `ArgumentException`: The `tasks` array contains a null value.

-or-

The `tasks` array is empty.
- `ArgumentOutOfRangeException`: `continuationOptions` specifies an invalid TaskContinuationOptions value.
- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.

#### Remarks

The NotOn\* and OnlyOn\* `TaskContinuationOptions`, which constrain for which `TaskStatus` states a continuation will be executed, are illegal with `ContinueWhenAny`.
