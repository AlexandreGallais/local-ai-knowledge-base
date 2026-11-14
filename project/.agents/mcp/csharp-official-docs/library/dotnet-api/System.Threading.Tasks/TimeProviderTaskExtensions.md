---
title: "TimeProviderTaskExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TimeProviderTaskExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeProviderTaskExtensions class

Namespace: `System.Threading.Tasks`

```csharp
public static class TimeProviderTaskExtensions
```

Provide extensions methods for `Task` operations with `TimeProvider`.

The Microsoft.Bcl.TimeProvider library interfaces are intended solely for use in building against pre-.NET 8 surface area.
If your code is being built against .NET 8 or higher, then this library should not be utilized.

## TimeProviderTaskExtensions.CreateCancellationTokenSource(TimeProvider, TimeSpan) method

```csharp
public static System.Threading.CancellationTokenSource CreateCancellationTokenSource (this TimeProvider timeProvider, TimeSpan delay);
```

Initializes a new instance of the `CancellationTokenSource` class that will be canceled after the specified `TimeSpan`.

Parameters:

- `timeProvider`: The `TimeProvider` with which to interpret the `delay`.
- `delay`: The time interval to wait before canceling this `CancellationTokenSource`.

Returns: `CancellationTokenSource` that will be canceled after the specified `delay`.

Exceptions:

- `ArgumentOutOfRangeException`: The `delay` is negative and not equal to `Timeout.InfiniteTimeSpan` or greater than maximum allowed timer duration.

The countdown for the delay starts during the call to the constructor. When the delay expires,
the constructed `CancellationTokenSource` is canceled if it has
not been canceled already.

If running on .NET versions earlier than .NET 8.0, there is a constraint when invoking `CancellationTokenSource.CancelAfter` on the resultant object.
This action will not terminate the initial timer indicated by `delay`. However, this restriction does not apply on .NET 8.0 and later versions.

## TimeProviderTaskExtensions.Delay(TimeProvider, TimeSpan, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task Delay (this TimeProvider timeProvider, TimeSpan delay, System.Threading.CancellationToken <example-value> = default);
```

Creates a task that completes after a specified time interval.

Parameters:

- `timeProvider`: The `TimeProvider` with which to interpret `delay`.
- `delay`: The `TimeSpan` to wait before completing the returned task, or `Timeout.InfiniteTimeSpan` to wait indefinitely.
- `cancellationToken`: A cancellation token to observe while waiting for the task to complete.

Returns: A task that represents the time delay.

Exceptions:

- `ArgumentNullException`: The `timeProvider` argument is null.
- `ArgumentOutOfRangeException`: `delay` represents a negative time interval other than `Timeout.InfiniteTimeSpan`.

To be added.

## TimeProviderTaskExtensions.WaitAsync(Task, TimeSpan, TimeProvider, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task WaitAsync (this System.Threading.Tasks.Task task, TimeSpan timeout, TimeProvider timeProvider, System.Threading.CancellationToken <example-value> = default);
```

Gets a `Task` that will complete when this `Task` completes, when the specified timeout expires, or when the specified `CancellationToken` has cancellation requested.

Parameters:

- `task`: The task for which to wait on until completion.
- `timeout`: The timeout after which the `Task` should be faulted with a `TimeoutException` if it hasn't otherwise completed.
- `timeProvider`: The `TimeProvider` with which to interpret `timeout`.
- `cancellationToken`: The `CancellationToken` to monitor for a cancellation request.

Returns: The `Task` representing the asynchronous wait.  It may or may not be the same instance as the current instance.

Exceptions:

- `ArgumentNullException`: The `timeProvider` argument is null.
- `ArgumentOutOfRangeException`: `timeout` represents a negative time interval other than `Timeout.InfiniteTimeSpan`.

To be added.

## TimeProviderTaskExtensions.WaitAsync<TResult>(Task<TResult>, TimeSpan, TimeProvider, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<TResult> WaitAsync<TResult> (this System.Threading.Tasks.Task<TResult> task, TimeSpan timeout, TimeProvider timeProvider, System.Threading.CancellationToken <example-value> = default);
```

Gets a `Task` that will complete when this `Task` completes, when the specified timeout expires, or when the specified `CancellationToken` has cancellation requested.

Parameters:

- `TResult`: To be added.
- `task`: The task for which to wait on until completion.
- `timeout`: The timeout after which the `Task` should be faulted with a `TimeoutException` if it hasn't otherwise completed.
- `timeProvider`: The `TimeProvider` with which to interpret `timeout`.
- `cancellationToken`: The `CancellationToken` to monitor for a cancellation request.

Returns: The `Task` representing the asynchronous wait.  It may or may not be the same instance as the current instance.

Exceptions:

- `ArgumentNullException`: The `timeProvider` argument is null.
- `ArgumentOutOfRangeException`: `timeout` represents a negative time interval other than `Timeout.InfiniteTimeSpan`.

To be added.
