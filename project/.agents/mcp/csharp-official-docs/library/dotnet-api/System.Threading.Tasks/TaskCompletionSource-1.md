---
title: "TaskCompletionSource<TResult> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskCompletionSource`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskCompletionSource<TResult> class

Namespace: `System.Threading.Tasks`

```csharp
public class TaskCompletionSource<TResult>
```

Represents the producer side of a `Task<T>` unbound to a delegate, providing access to the consumer side through the `TaskCompletionSource<T>.Task` property.

Parameters:

- `TResult`: The type of the result value associated with this `TaskCompletionSource<T>`.

#### Remarks

In many scenarios, it's useful to enable a `Task<T>` to represent an external asynchronous operation. `TaskCompletionSource<T>` is provided for this purpose. It enables the creation of a task that can be handed out to consumers. The consumers can use the members of the task the same way as they would in any other scenario handling task member variables. However, unlike most tasks, the state of a task created by a TaskCompletionSource is controlled explicitly by the methods on TaskCompletionSource. This enables the completion of the external asynchronous operation to be propagated to the underlying Task. The separation also ensures that consumers are not able to transition the state without access to the corresponding TaskCompletionSource. For more information, see the entry The Nature of TaskCompletionSource\<TResult> in the Parallel Programming with .NET blog.

#### Examples

The following example shows how to use a `TaskCompletionSource<T>`:

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/TaskCompletionSourceTResult/Overview/taskcompletionsource.cs._

## TaskCompletionSource<TResult>.TaskCompletionSource() constructor

```csharp
public TaskCompletionSource ();
```

Creates a `TaskCompletionSource<T>`.

To be added.

## TaskCompletionSource<TResult>.TaskCompletionSource(Object) constructor

```csharp
public TaskCompletionSource (object? state);
```

Creates a `TaskCompletionSource<T>` with the specified state.

Parameters:

- `state`: The state to use as the underlying `Task<T>`'s AsyncState.

To be added.

## TaskCompletionSource<TResult>.TaskCompletionSource(TaskCreationOptions) constructor

```csharp
public TaskCompletionSource (System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a `TaskCompletionSource<T>` with the specified options.

Parameters:

- `creationOptions`: The options to use when creating the underlying `Task<T>`.

Exceptions:

- `ArgumentOutOfRangeException`: The `creationOptions` represent options invalid for use with a `TaskCompletionSource<T>`.

#### Remarks
The `Task<T>` created by this instance and accessible through its `Task` property will be instantiated using the specified `creationOptions`.

## TaskCompletionSource<TResult>.TaskCompletionSource(Object, TaskCreationOptions) constructor

```csharp
public TaskCompletionSource (object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a `TaskCompletionSource<T>` with the specified state and options.

Parameters:

- `state`: The state to use as the underlying `Task<T>`'s AsyncState.
- `creationOptions`: The options to use when creating the underlying `Task<T>`.

Exceptions:

- `ArgumentOutOfRangeException`: The `creationOptions` represent options invalid for use with a `TaskCompletionSource<T>`.

To be added.

## TaskCompletionSource<TResult>.Task property

```csharp
public System.Threading.Tasks.Task<TResult> Task { get; }
```

Gets the `Task<T>` created by this `TaskCompletionSource<T>`.

Returns: Returns the `Task<T>` created by this `TaskCompletionSource<T>`.

#### Remarks
This property enables a consumer to access the `Task<T>` that is controlled by this instance. When you create a `TaskCompletionSource<T>` object, the `Status` property of this `Task<T>` object returns `WaitingForActivation`

The `TaskCompletionSource<T>.SetResult`, `TaskCompletionSource<T>.SetException`, `TaskCompletionSource<T>.SetException`, and `TaskCompletionSource<T>.SetCanceled` methods (and their "Try" variants) on this instance all result in the relevant state transitions on this underlying Task.

## TaskCompletionSource<TResult>.SetCanceled() method

```csharp
public void SetCanceled ();
```

Transitions the underlying `Task<T>` into the `TaskStatus.Canceled` state.

Exceptions:

- `InvalidOperationException`: The underlying `Task<T>` is already in one of the three final states: `TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`, or if the underlying `Task<T>` has already been disposed.
- `ObjectDisposedException`: The `TaskCompletionSource<T>.Task` was disposed.

To be added.

## TaskCompletionSource<TResult>.SetCanceled(CancellationToken) method

```csharp
public void SetCanceled (System.Threading.CancellationToken <example-value>);
```

Transitions the underlying `Task<T>` into the `TaskStatus.Canceled` state using the specified token.

Parameters:

- `cancellationToken`: The cancellation token with which to cancel the `Task<T>`.

Exceptions:

- `InvalidOperationException`: The underlying `Task<T>` is already in one of the three final states: `TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`.

To be added.

## TaskCompletionSource<TResult>.SetException(Exception>) method

```csharp
public void SetException (System.Collections.Generic.IEnumerable<Exception> exceptions);
```

Transitions the underlying `Task<T>` into the `TaskStatus.Faulted` state and binds a collection of exception objects to it.

Parameters:

- `exceptions`: The collection of exceptions to bind to this `Task<T>`.

Exceptions:

- `ObjectDisposedException`: The `TaskCompletionSource<T>.Task` was disposed.
- `ArgumentNullException`: The `exceptions` argument is `null`.
- `ArgumentException`: There are one or more null elements in `exceptions`.
- `InvalidOperationException`: The underlying `Task<T>` is already in one of the three final states: `TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`.

To be added.

## TaskCompletionSource<TResult>.SetException(Exception) method

```csharp
public void SetException (Exception exception);
```

Transitions the underlying `Task<T>` into the `TaskStatus.Faulted` state and binds it to a specified exception.

Parameters:

- `exception`: The exception to bind to this `Task<T>`.

Exceptions:

- `ObjectDisposedException`: The `TaskCompletionSource<T>.Task` was disposed.
- `ArgumentNullException`: The `exception` argument is `null`.
- `InvalidOperationException`: The underlying `Task<T>` is already in one of the three final states: `TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`.

To be added.

## TaskCompletionSource<TResult>.SetFromTask(Task<TResult>) method

```csharp
public void SetFromTask (System.Threading.Tasks.Task<TResult> completedTask);
```

Transitions the underlying `Task<T>` into the same completion state as the specified `completedTask`.

Parameters:

- `completedTask`: The completed task whose completion status (including result, exception, or cancellation information) should be copied to the underlying task.

Exceptions:

- `ArgumentNullException`: `completedTask` is `null`.
- `ArgumentException`: `completedTask` is not completed.
- `InvalidOperationException`: The underlying `Task<T>` is already in one of the three final states:
`TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`.

This operation will return `false` if the `Task<T>` is already in one of the three final states:
`TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`.

## TaskCompletionSource<TResult>.SetResult(TResult) method

```csharp
public void SetResult (TResult result);
```

Transitions the underlying `Task<T>` into the `TaskStatus.RanToCompletion` state.

Parameters:

- `result`: The result value to bind to this `Task<T>`.

Exceptions:

- `ObjectDisposedException`: The `TaskCompletionSource<T>.Task` was disposed.
- `InvalidOperationException`: The underlying `Task<T>` is already in one of the three final states: `TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`.

To be added.

## TaskCompletionSource<TResult>.TrySetCanceled() method

```csharp
public bool TrySetCanceled ();
```

Attempts to transition the underlying `Task<T>` into the `TaskStatus.Canceled` state.

Returns: `true` if the operation was successful; false if the operation was unsuccessful or the object has already been disposed.

Exceptions:

- `ObjectDisposedException`: The `TaskCompletionSource<T>.Task` was disposed.

#### Remarks
This operation will return false if the `Task<T>` is already in one of the three final states: `RanToCompletion`, `Faulted`, or `Canceled`.

This method also returns false if the underlying `Task<T>` has already been disposed.

## TaskCompletionSource<TResult>.TrySetCanceled(CancellationToken) method

```csharp
public bool TrySetCanceled (System.Threading.CancellationToken <example-value>);
```

Attempts to transition the underlying `Task<T>` into the `TaskStatus.Canceled` state and enables a cancellation token to be stored in the canceled task.

Parameters:

- `cancellationToken`: A cancellation token.

Returns: `true` if the operation is successful; otherwise, `false`.

#### Remarks
The method returns false if the underlying `Task<T>` object is already in one of the following three final states.

-   `Canceled`

-   `Faulted`

-   `RanToCompletion`

This method also returns `false` if the underlying `Task<T>` object has already been disposed.

## TaskCompletionSource<TResult>.TrySetException(Exception>) method

```csharp
public bool TrySetException (System.Collections.Generic.IEnumerable<Exception> exceptions);
```

Attempts to transition the underlying `Task<T>` into the `TaskStatus.Faulted` state and binds a collection of exception objects to it.

Parameters:

- `exceptions`: The collection of exceptions to bind to this `Task<T>`.

Returns: `true` if the operation was successful; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `TaskCompletionSource<T>.Task` was disposed.
- `ArgumentNullException`: The `exceptions` argument is `null`.
- `ArgumentException`: There are one or more null elements in `exceptions`.

-or-

The `exceptions` collection is empty.

#### Remarks
This operation will return false if the `Task<T>` is already in one of the three final states: `RanToCompletion`, `Faulted`, or `Canceled`.

## TaskCompletionSource<TResult>.TrySetException(Exception) method

```csharp
public bool TrySetException (Exception exception);
```

Attempts to transition the underlying `Task<T>` into the `TaskStatus.Faulted` state and binds it to a specified exception.

Parameters:

- `exception`: The exception to bind to this `Task<T>`.

Returns: `true` if the operation was successful; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `TaskCompletionSource<T>.Task` was disposed.
- `ArgumentNullException`: The `exception` argument is `null`.

#### Remarks
This operation will return false if the `Task<T>` is already in one of the three final states: `RanToCompletion`, `Faulted`, or `Canceled`.

## TaskCompletionSource<TResult>.TrySetFromTask(Task<TResult>) method

```csharp
public bool TrySetFromTask (System.Threading.Tasks.Task<TResult> completedTask);
```

Attempts to transition the underlying `Task<T>` into the same completion state as the specified `completedTask`.

Parameters:

- `completedTask`: The completed task whose completion status (including result, exception, or cancellation information) should be copied to the underlying task.

Returns: `true` if the operation was successful; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `completedTask` is `null`.
- `ArgumentException`: `completedTask` is not completed.

This operation will return `false` if the `Task<T>` is already in one of the three final states:
`TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`.

## TaskCompletionSource<TResult>.TrySetResult(TResult) method

```csharp
public bool TrySetResult (TResult result);
```

Attempts to transition the underlying `Task<T>` into the `TaskStatus.RanToCompletion` state.

Parameters:

- `result`: The result value to bind to this `Task<T>`.

Returns: `true` if the operation was successful; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `TaskCompletionSource<T>.Task` was disposed.

#### Remarks
This operation will return false if the `Task<T>` is already in one of the three final states: `RanToCompletion`, `Faulted`, or `Canceled`.

This method also returns false if the underlying `Task<T>` has already been disposed.
