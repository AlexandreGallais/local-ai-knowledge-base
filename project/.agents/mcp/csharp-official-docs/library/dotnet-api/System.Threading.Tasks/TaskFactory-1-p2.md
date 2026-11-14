---
title: "TaskFactory<TResult> class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskFactory`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskFactory<TResult> class (part 2 of 4)

## TaskFactory<TResult>.ContinueWhenAll<TAntecedentResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>[],TResult>) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAll<TAntecedentResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Func<System.Threading.Tasks.Task<TAntecedentResult>[],TResult> continuationFunction);
```

Creates a continuation task that will be started upon the completion of a set of provided tasks.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `tasks`: The array of tasks from which to continue.
- `continuationFunction`: The function delegate to execute asynchronously when all tasks in the `tasks` array have completed.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.
- `ArgumentException`: The `tasks` array contains a null value or is empty.

#### Remarks
After completion, a task is in one of these states: `RanToCompletion`, `Faulted`, or `Canceled` states.

## TaskFactory<TResult>.ContinueWhenAll<TAntecedentResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>[],TResult>, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAll<TAntecedentResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Func<System.Threading.Tasks.Task<TAntecedentResult>[],TResult> continuationFunction, System.Threading.CancellationToken <example-value>);
```

Creates a continuation task that will be started upon the completion of a set of provided tasks.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `tasks`: The array of tasks from which to continue.
- `continuationFunction`: The function delegate to execute asynchronously when all tasks in the `tasks` array have completed.
- `cancellationToken`: The cancellation token that will be assigned to the new continuation task.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.
- `ArgumentException`: The `tasks` array contains a null value or is empty.

#### Remarks
After completion, a task is in one of these states: `RanToCompletion`, `Faulted`, or `Canceled` states.

## TaskFactory<TResult>.ContinueWhenAll<TAntecedentResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>[],TResult>, TaskContinuationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAll<TAntecedentResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Func<System.Threading.Tasks.Task<TAntecedentResult>[],TResult> continuationFunction, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Creates a continuation task that will be started upon the completion of a set of provided tasks.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `tasks`: The array of tasks from which to continue.
- `continuationFunction`: The function delegate to execute asynchronously when all tasks in the `tasks` array have completed.
- `continuationOptions`: One of the enumeration values that controls the behavior of the created continuation task. The `NotOn*` and `OnlyOn*` values are not valid.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value.
- `ArgumentException`: The `tasks` array contains a null value or is empty.

#### Remarks
After completion, a task is in one of these states: `RanToCompletion`, `Faulted`, or `Canceled` states.

## TaskFactory<TResult>.ContinueWhenAll<TAntecedentResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>[],TResult>, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAll<TAntecedentResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Func<System.Threading.Tasks.Task<TAntecedentResult>[],TResult> continuationFunction, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation task that will be started upon the completion of a set of provided tasks.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `tasks`: The array of tasks from which to continue.
- `continuationFunction`: The function delegate to execute asynchronously when all tasks in the `tasks` array have completed.
- `cancellationToken`: The cancellation token that will be assigned to the new continuation task.
- `continuationOptions`: One of the enumeration values that controls the behavior of the created continuation task. The `NotOn*` and `OnlyOn*` values are not valid.
- `scheduler`: The scheduler that is used to schedule the created continuation task.

Returns: The new continuation task.

Exceptions:

- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.

-or-

The `scheduler` argument is `null`.
- `ArgumentException`: The `tasks` array contains a null value or is empty.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value.
- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has already been disposed.

#### Remarks
After completion, a task is in one of these states: `RanToCompletion`, `Faulted`, or `Canceled` states.

## TaskFactory<TResult>.ContinueWhenAny(Task[], Task,TResult>) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAny (System.Threading.Tasks.Task[] tasks, Func<System.Threading.Tasks.Task,TResult> continuationFunction);
```

Creates a continuation task that will be started upon the completion of any task in the provided set.

Parameters:

- `tasks`: The array of tasks from which to continue when one task completes.
- `continuationFunction`: The function delegate to execute asynchronously when one task in the `tasks` array completes.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.
- `ArgumentException`: The `tasks` array contains a null value or is empty.

#### Remarks
After completion, a task is in one of these states: `RanToCompletion`, `Faulted`, or `Canceled` states.

## TaskFactory<TResult>.ContinueWhenAny(Task[], Task,TResult>, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAny (System.Threading.Tasks.Task[] tasks, Func<System.Threading.Tasks.Task,TResult> continuationFunction, System.Threading.CancellationToken <example-value>);
```

Creates a continuation task that will be started upon the completion of any task in the provided set.

Parameters:

- `tasks`: The array of tasks from which to continue when one task completes.
- `continuationFunction`: The function delegate to execute asynchronously when one task in the `tasks` array completes.
- `cancellationToken`: The cancellation token that will be assigned to the new continuation task.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `tasks` array is null.

-or-

The `continuationFunction` argument is null.
- `ArgumentException`: The `tasks` array contains a null value.

-or-

The `tasks` array is empty.

#### Remarks
After completion, a task is in one of these states: `RanToCompletion`, `Faulted`, or `Canceled` states.

## TaskFactory<TResult>.ContinueWhenAny(Task[], Task,TResult>, TaskContinuationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAny (System.Threading.Tasks.Task[] tasks, Func<System.Threading.Tasks.Task,TResult> continuationFunction, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Creates a continuation task that will be started upon the completion of any task in the provided set.

Parameters:

- `tasks`: The array of tasks from which to continue when one task completes.
- `continuationFunction`: The function delegate to execute asynchronously when one task in the `tasks` array completes.
- `continuationOptions`: One of the enumeration values that controls the behavior of the created continuation task. The `NotOn*` and `OnlyOn*` values are not valid.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid enumeration value.
- `ArgumentException`: The `tasks` array contains a null value.

-or-

The `tasks` array is empty.

#### Remarks
After completion, a task is in one of these states: `RanToCompletion`, `Faulted`, or `Canceled` states.

## TaskFactory<TResult>.ContinueWhenAny(Task[], Task,TResult>, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAny (System.Threading.Tasks.Task[] tasks, Func<System.Threading.Tasks.Task,TResult> continuationFunction, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation task that will be started upon the completion of any task in the provided set.

Parameters:

- `tasks`: The array of tasks from which to continue when one task completes.
- `continuationFunction`: The function delegate to execute asynchronously when one task in the `tasks` array completes.
- `cancellationToken`: The cancellation token that will be assigned to the new continuation task.
- `continuationOptions`: One of the enumeration values that controls the behavior of the created continuation task. The `NotOn*` and `OnlyOn*` values are not valid.
- `scheduler`: The task scheduler that is used to schedule the created continuation task.

Returns: The new continuation task.

Exceptions:

- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.

-or-

The `scheduler` argument is `null`.
- `ArgumentException`: The `tasks` array contains a null value.

-or-

The `tasks` array is empty.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid `TaskContinuationOptions` value.
- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has already been disposed.

#### Remarks
After completion, a task is in one of these states: `RanToCompletion`, `Faulted`, or `Canceled` states.

## TaskFactory<TResult>.ContinueWhenAny<TAntecedentResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>,TResult>) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAny<TAntecedentResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Func<System.Threading.Tasks.Task<TAntecedentResult>,TResult> continuationFunction);
```

Creates a continuation task that will be started upon the completion of any task in the provided set.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `tasks`: The array of tasks from which to continue when one task completes.
- `continuationFunction`: The function delegate to execute asynchronously when one task in the `tasks` array completes.

Returns: The new continuation `Task<T>`.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.
- `ArgumentException`: The `tasks` array contains a null value.

-or-

The `tasks` array is empty.

#### Remarks
After completion, a task is in one of these states: `RanToCompletion`, `Faulted`, or `Canceled` states.

## TaskFactory<TResult>.ContinueWhenAny<TAntecedentResult>(Task<TAntecedentResult>[], Task<TAntecedentResult>,TResult>, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAny<TAntecedentResult> (System.Threading.Tasks.Task<TAntecedentResult>[] tasks, Func<System.Threading.Tasks.Task<TAntecedentResult>,TResult> continuationFunction, System.Threading.CancellationToken <example-value>);
```

Creates a continuation task that will be started upon the completion of any task in the provided set.

Parameters:

- `TAntecedentResult`: The type of the result of the antecedent `tasks`.
- `tasks`: The array of tasks from which to continue when one task completes.
- `continuationFunction`: The function delegate to execute asynchronously when one task in the `tasks` array completes.
- `cancellationToken`: The cancellation token that will be assigned to the new continuation task.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.
- `ArgumentException`: The `tasks` array contains a null value.

-or-

The `tasks` array is empty.

#### Remarks
After completion, a task is in one of these states: `RanToCompletion`, `Faulted`, or `Canceled` states.
