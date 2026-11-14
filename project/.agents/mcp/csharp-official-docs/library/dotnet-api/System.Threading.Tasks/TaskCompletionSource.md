---
title: "TaskCompletionSource class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskCompletionSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskCompletionSource class

Namespace: `System.Threading.Tasks`

```csharp
public class TaskCompletionSource
```

Represents the producer side of a `Task` unbound to a delegate, providing access to the consumer side through the `Task` property.

#### Remarks

It is often the case that a `Task` is desired to represent another asynchronous operation.
`TaskCompletionSource` is provided for this purpose. It enables the creation of a task that can be handed out to consumers, and those consumers can use the members of the task as they would any other. However, unlike most tasks, the state of a task created by a `TaskCompletionSource` is controlled explicitly by the methods on `TaskCompletionSource`. This enables the completion of the external asynchronous operation to be propagated to the underlying `Task`. The separation also ensures that consumers are not able to transition the state without access to the corresponding `TaskCompletionSource`.
All members of `TaskCompletionSource` are thread-safe and may be used from multiple threads concurrently.

## TaskCompletionSource.TaskCompletionSource() constructor

```csharp
public TaskCompletionSource ();
```

Creates a `TaskCompletionSource`.

To be added.

## TaskCompletionSource.TaskCompletionSource(Object) constructor

```csharp
public TaskCompletionSource (object? state);
```

Creates a `TaskCompletionSource` with the specified state.

Parameters:

- `state`: The state to use as the underlying `Task`'s `AsyncState`.

To be added.

## TaskCompletionSource.TaskCompletionSource(TaskCreationOptions) constructor

```csharp
public TaskCompletionSource (System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a `TaskCompletionSource` with the specified options.

Parameters:

- `creationOptions`: The options to use when creating the underlying `Task`.

Exceptions:

- `ArgumentOutOfRangeException`: One or more of the specified `creationOptions` are invalid for use with a `TaskCompletionSource`.

#### Remarks

The `Task` created by this instance and accessible through its `Task` property will be instantiated using the specified `creationOptions`.

## TaskCompletionSource.TaskCompletionSource(Object, TaskCreationOptions) constructor

```csharp
public TaskCompletionSource (object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a `TaskCompletionSource` with the specified state and options.

Parameters:

- `state`: The state to use as the underlying `Task`'s `AsyncState`.
- `creationOptions`: The options to use when creating the underlying `Task`.

Exceptions:

- `ArgumentOutOfRangeException`: One or more of the specified `creationOptions` are invalid for use with a `TaskCompletionSource`.

To be added.

## TaskCompletionSource.Task property

```csharp
public System.Threading.Tasks.Task Task { get; }
```

Gets the `Task` created by this `TaskCompletionSource`.

Returns: To be added.

#### Remarks

This property gives a consumer access to the `Task` that's controlled by this instance.
The `SetResult`, `SetException`, `SetException`, and `SetCanceled` methods (and their `Try` variants) on this instance all result in the relevant state transitions on this underlying `Task`.

## TaskCompletionSource.SetCanceled() method

```csharp
public void SetCanceled ();
```

Transitions the underlying `Task` into the `TaskStatus.Canceled` state.

Exceptions:

- `InvalidOperationException`: The underlying `Task` is already in one of the three final states: `TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`.

To be added.

## TaskCompletionSource.SetCanceled(CancellationToken) method

```csharp
public void SetCanceled (System.Threading.CancellationToken <example-value>);
```

Transitions the underlying `Task` into the `TaskStatus.Canceled` state using the specified token.

Parameters:

- `cancellationToken`: The cancellation token with which to cancel the `Task`.

Exceptions:

- `InvalidOperationException`: The underlying `Task` is already in one of the three final states: `TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`.

To be added.

## TaskCompletionSource.SetException(Exception>) method

```csharp
public void SetException (System.Collections.Generic.IEnumerable<Exception> exceptions);
```

Transitions the underlying `Task` into the `TaskStatus.Faulted` state.

Parameters:

- `exceptions`: The collection of exceptions to bind to this `Task`.

Exceptions:

- `ArgumentNullException`: `exceptions` is `null`.
- `ArgumentException`: There are one or more `null` elements in `exceptions`.
- `InvalidOperationException`: The underlying `Task` is already in one of the three final states: `TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`.

To be added.

## TaskCompletionSource.SetException(Exception) method

```csharp
public void SetException (Exception exception);
```

Transitions the underlying `Task` into the `TaskStatus.Faulted` state.

Parameters:

- `exception`: The exception to bind to this `Task`.

Exceptions:

- `ArgumentNullException`: `exception` is `null`.
- `InvalidOperationException`: The underlying `Task` is already in one of the three final states: `TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`.

To be added.

## TaskCompletionSource.SetFromTask(Task) method

```csharp
public void SetFromTask (System.Threading.Tasks.Task completedTask);
```

Transitions the underlying `Task<T>` into the same completion state as the specified `completedTask`.

Parameters:

- `completedTask`: The completed task whose completion status (including exception or cancellation information) should be copied to the underlying task.

Exceptions:

- `ArgumentNullException`: `completedTask` is `null`.
- `ArgumentException`: `completedTask` is not completed.
- `InvalidOperationException`: The underlying `Task<T>` is already in one of the three final states:
`TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`.

This operation will return `false` if the `Task<T>` is already in one of the three final states:
`TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`.

## TaskCompletionSource.SetResult() method

```csharp
public void SetResult ();
```

Transitions the underlying `Task` into the `TaskStatus.RanToCompletion` state.

Exceptions:

- `InvalidOperationException`: The underlying `Task` is already in one of the three final states: `TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`.

To be added.

## TaskCompletionSource.TrySetCanceled() method

```csharp
public bool TrySetCanceled ();
```

Attempts to transition the underlying `Task` into the `TaskStatus.Canceled` state.

Returns: `true` if the operation was successful; otherwise, `false`.

#### Remarks

This operation will return `false` if the `Task` is already in one of the three final states:
`RanToCompletion`, `Faulted`, or `Canceled`.

## TaskCompletionSource.TrySetCanceled(CancellationToken) method

```csharp
public bool TrySetCanceled (System.Threading.CancellationToken <example-value>);
```

Attempts to transition the underlying `Task` into the `TaskStatus.Canceled` state.

Parameters:

- `cancellationToken`: The cancellation token with which to cancel the `Task`.

Returns: `true` if the operation was successful; otherwise, `false`.

#### Remarks

This operation will return `false` if the `Task` is already in one of the three final states:
`RanToCompletion`, `Faulted`, or `Canceled`.

## TaskCompletionSource.TrySetException(Exception>) method

```csharp
public bool TrySetException (System.Collections.Generic.IEnumerable<Exception> exceptions);
```

Attempts to transition the underlying `Task` into the `TaskStatus.Faulted` state.

Parameters:

- `exceptions`: The collection of exceptions to bind to this `Task`.

Returns: `true` if the operation was successful; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `exceptions` is `null`.
- `ArgumentException`: There are one or more `null` elements in `exceptions`.
- `ArgumentException`: The `exceptions` collection is empty.

#### Remarks

This operation will return `false` if the `Task` is already in one of the three final states:
`RanToCompletion`, `Faulted`, or `Canceled`.

## TaskCompletionSource.TrySetException(Exception) method

```csharp
public bool TrySetException (Exception exception);
```

Attempts to transition the underlying `Task` into the `TaskStatus.Faulted` state.

Parameters:

- `exception`: The exception to bind to this `Task`.

Returns: `true` if the operation was successful; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `exception` is `null`.

#### Remarks

This operation will return `false` if the `Task` is already in one of the three final states:
`RanToCompletion`, `Faulted`, or `Canceled`.

## TaskCompletionSource.TrySetFromTask(Task) method

```csharp
public bool TrySetFromTask (System.Threading.Tasks.Task completedTask);
```

Attempts to transition the underlying `Task<T>` into the same completion state as the specified `completedTask`.

Parameters:

- `completedTask`: The completed task whose completion status (including exception or cancellation information) should be copied to the underlying task.

Returns: `true` if the operation was successful; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `completedTask` is `null`.
- `ArgumentException`: `completedTask` is not completed.

This operation will return `false` if the `Task<T>` is already in one of the three final states:
`TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`.

## TaskCompletionSource.TrySetResult() method

```csharp
public bool TrySetResult ();
```

Attempts to transition the underlying `Task` into the `TaskStatus.RanToCompletion` state.

Returns: `true` if the operation was successful; otherwise, `false`.

#### Remarks

This operation will return `false` if the `Task` is already in one of the three final states:
`RanToCompletion`, `Faulted`, or `Canceled`.
