---
title: "CancellationTokenSource class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/CancellationTokenSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CancellationTokenSource class

Namespace: `System.Threading`

```csharp
public class CancellationTokenSource : IDisposable
```

Signals to a `CancellationToken` that it should be canceled.

#### Remarks

.NET uses a unified model for cooperative cancellation of asynchronous or long-running synchronous operations that involves two objects:

- A `CancellationTokenSource` object, which provides a cancellation token <example-value> its `Token` property and sends a cancellation message by calling its `CancellationTokenSource.Cancel` or `CancellationTokenSource.CancelAfter` method.
- A `CancellationToken` object, which indicates whether cancellation is requested.

The general pattern for implementing the cooperative cancellation model is:

- Instantiate a `CancellationTokenSource` object, which manages and sends cancellation notification to the individual cancellation tokens.
- Pass the token <example-value> by the `Token` property to each task or thread that listens for cancellation.
- Call the `CancellationToken.IsCancellationRequested` method from operations that receive the cancellation token. Provide a mechanism for each task or thread to respond to a cancellation request. Whether you choose to cancel an operation, and exactly how you do it, depends on your application logic.
- Call the `CancellationTokenSource.Cancel` method to provide notification of cancellation. This sets the `IsCancellationRequested` property on every copy of the cancellation token to `true`.
- Call the `CancellationTokenSource.Dispose` method when you are finished with the `CancellationTokenSource` object.

For more information, see Cancellation in Managed Threads.

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

#### Examples
The following example uses a random number generator to emulate a data collection application that reads 10 integral values from eleven different instruments. A value of zero indicates that the measurement has failed for one instrument, in which case the operation should be cancelled and no overall mean should be computed.

To handle the possible cancellation of the operation, the example instantiates a `CancellationTokenSource` object that generates a cancellation token which is passed to a `TaskFactory` object. The `TaskFactory` object in turn passes the cancellation token to each of the tasks responsible for collecting readings for a particular instrument. The `ContinueWhenAll<T1,T2>` method is called to ensure that the mean is computed only after all readings have been gathered successfully. If a task has not completed because it has been cancelled, the call to the `TaskFactory.ContinueWhenAll` method throws an exception.

_Code sample not included: ~/snippets/csharp/System.Threading/CancellationToken/Overview/cancel1.cs._

## CancellationTokenSource.CancellationTokenSource() constructor

```csharp
public CancellationTokenSource ();
```

Initializes a new instance of the `CancellationTokenSource` class.

To be added.

## CancellationTokenSource.CancellationTokenSource(Int32) constructor

```csharp
public CancellationTokenSource (int millisecondsDelay);
```

Initializes a new instance of the `CancellationTokenSource` class that will be canceled after the specified delay in milliseconds.

Parameters:

- `millisecondsDelay`: The time interval in milliseconds to wait before canceling this `CancellationTokenSource`.

Exceptions:

- `ArgumentOutOfRangeException`: `millisecondsDelay` is less than -1.

#### Remarks
The countdown for the `millisecondsDelay` starts during the call to the constructor.  When the `millisecondsDelay` expires, the constructed `CancellationTokenSource` is canceled (if it has not been canceled already).

Subsequent calls to `CancellationTokenSource.CancelAfter` will reset the `millisecondsDelay` for the constructed `CancellationTokenSource`, if it has not been canceled already.

## CancellationTokenSource.CancellationTokenSource(TimeSpan) constructor

```csharp
public CancellationTokenSource (TimeSpan delay);
```

Initializes a new instance of the `CancellationTokenSource` class that will be canceled after the specified time span.

Parameters:

- `delay`: The time interval to wait before canceling this `CancellationTokenSource`.

Exceptions:

- `ArgumentOutOfRangeException`: `delay`.`TimeSpan.TotalMilliseconds` is less than -1 or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> (or <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see> - 1 on some versions of .NET). Note that this upper bound is more restrictive than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>.

#### Remarks
The countdown for the delay starts during the call to the constructor. When the delay expires, the constructed `CancellationTokenSource` is canceled, if it has not been canceled already.

Subsequent calls to `CancellationTokenSource.CancelAfter` will reset the delay for the constructed `CancellationTokenSource`, if it has not been canceled already.

## CancellationTokenSource.CancellationTokenSource(TimeSpan, TimeProvider) constructor

```csharp
public CancellationTokenSource (TimeSpan delay, TimeProvider timeProvider);
```

Initializes a new instance of the `CancellationTokenSource` class that will be canceled after the specified `TimeSpan`.

Parameters:

- `delay`: The time interval to wait before canceling this `CancellationTokenSource`.
- `timeProvider`: The `TimeProvider` with which to interpret the `delay`.

Exceptions:

- `ArgumentOutOfRangeException`: `delay`'s `TimeSpan.TotalMilliseconds` is less than -1 or greater than `UInt32.MaxValue` - 1.
- `ArgumentNullException`: `timeProvider` is `null`.

The countdown for the delay starts during the call to the constructor.  When the delay expires, the constructed `CancellationTokenSource` is canceled, if it has not been canceled already. Subsequent calls to CancelAfter will reset the delay for the constructed `CancellationTokenSource`, if it has not been canceled already.

## CancellationTokenSource.IsCancellationRequested property

```csharp
public bool IsCancellationRequested { get; }
```

Gets whether cancellation has been requested for this `CancellationTokenSource`.

Returns: `true` if cancellation has been requested for this `CancellationTokenSource`; otherwise, `false`.

#### Remarks
This property indicates whether cancellation has been requested for this token <example-value>, such as due to a call to its `CancellationTokenSource.Cancel` method.

If this property returns `true`, it only guarantees that cancellation has been requested. It does not guarantee that every handler registered with the corresponding token has finished executing, nor that cancellation requests have finished propagating to all registered handlers. Additional synchronization may be required, particularly in situations where related objects are being canceled concurrently.

## CancellationTokenSource.Token <example-value>

```csharp
public System.Threading.CancellationToken Token { get; }
```

Gets the `CancellationToken` associated with this `CancellationTokenSource`.

Returns: The `CancellationToken` associated with this `CancellationTokenSource`.

Exceptions:

- `ObjectDisposedException`: The token <example-value> has been disposed.

To be added.

## CancellationTokenSource.Cancel() method

```csharp
public void Cancel ();
```

Communicates a request for cancellation.

Exceptions:

- `ObjectDisposedException`: This `CancellationTokenSource` has been disposed.
- `AggregateException`: An aggregate exception containing all the exceptions thrown by the registered callbacks on the associated `CancellationToken`.

#### Remarks

The associated `CancellationToken` is notified of the cancellation and transitions to a state where `CancellationToken.IsCancellationRequested` returns true.

Any callbacks or cancelable operations registered with the `CancellationToken` are executed, if they haven'<example-value>'t execute the same callback again unless reregistered. (Avoid multiple calls to `Cancel`, because the intent of such code is often unclear.)

Callbacks are executed synchronously in LIFO order.

We recommend that cancelable operations and callbacks registered with `CancellationToken` not throw exceptions.

This overload of Cancel aggregates any exceptions thrown into an `AggregateException`, such that one callback throwing an exception will not prevent other registered callbacks from being executed.

Calling this method has the same effect as calling `Cancel(false)`).

#### Examples

The following example uses a random number generator to emulate a data collection application that reads 10 integral values from eleven different instruments. A value of zero indicates that the measurement has failed for one instrument, in which case the operation should be cancelled and no overall mean should be computed.

To handle the possible cancellation of the operation, the example instantiates a `CancellationTokenSource` object that generates a cancellation token which is passed to a `TaskFactory` object. The `TaskFactory` object in turn passes the cancellation token to each of the tasks responsible for collecting readings for a particular instrument. The `ContinueWhenAll<T1,T2>` method is called to ensure that the mean is computed only after all readings have been gathered successfully. If a task has not because it has been cancelled, the call to the `TaskFactory.ContinueWhenAll` method throws an exception.

_Code sample not included: ~/snippets/csharp/System.Threading/CancellationToken/Overview/cancel1.cs._

## CancellationTokenSource.Cancel(Boolean) method

```csharp
public void Cancel (bool throwOnFirstException);
```

Communicates a request for cancellation, and specifies whether remaining callbacks and cancelable operations should be processed if an exception occurs.

Parameters:

- `throwOnFirstException`: `true` if exceptions should immediately propagate; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: This `CancellationTokenSource` has been disposed.
- `AggregateException`: An aggregate exception containing all the exceptions thrown by the registered callbacks on the associated `CancellationToken`.

#### Remarks

The associated `CancellationToken` is notified of the cancellation and transitions to a state where `CancellationToken.IsCancellationRequested` returns `true`.

Any callbacks or cancelable operations registered with the `CancellationToken` are executed, if they haven'<example-value>'t execute the same callback again unless reregistered. (Avoid multiple calls to `Cancel`, because the intent of such code is often unclear.)

Callbacks are executed synchronously in LIFO order.

We recommend that cancelable operations and callbacks registered with `CancellationToken` not throw exceptions.

If `throwOnFirstException` is `true`, an exception will immediately propagate out of the call to `CancellationTokenSource.Cancel`, preventing the remaining callbacks and cancelable operations from being processed.

If `throwOnFirstException` is `false`, this overload aggregates any exceptions thrown into an `AggregateException`, such that one callback throwing an exception will not prevent other registered callbacks from being executed.

## CancellationTokenSource.CancelAfter(Int32) method

```csharp
public void CancelAfter (int millisecondsDelay);
```

Schedules a cancel operation on this `CancellationTokenSource` after the specified number of milliseconds.

Parameters:

- `millisecondsDelay`: The time span to wait before canceling this `CancellationTokenSource`.

Exceptions:

- `ObjectDisposedException`: The exception thrown when this `CancellationTokenSource` has been disposed.
- `ArgumentOutOfRangeException`: The exception thrown when `millisecondsDelay` is less than -1.

#### Remarks
The countdown for the `millisecondsDelay` starts during this call. When the `millisecondsDelay` expires, this `CancellationTokenSource` is canceled, if it has not been canceled already.

Subsequent calls to CancelAfter will reset the `millisecondsDelay` for this `CancellationTokenSource`, if it has not been canceled already.

## CancellationTokenSource.CancelAfter(TimeSpan) method

```csharp
public void CancelAfter (TimeSpan delay);
```

Schedules a cancel operation on this `CancellationTokenSource` after the specified time span.

Parameters:

- `delay`: The time span to wait before canceling this `CancellationTokenSource`.

Exceptions:

- `ObjectDisposedException`: The exception thrown when this `CancellationTokenSource` has been disposed.
- `ArgumentOutOfRangeException`: `delay`.`TimeSpan.TotalMilliseconds` is less than -1 or greater than Int32.MaxValue (or UInt32.MaxValue - 1 on some versions of .NET). Note that this upper bound is more restrictive than TimeSpan.MaxValue.

#### Remarks
The countdown for the delay starts during this call. When the delay expires, this `CancellationTokenSource` is canceled, if it has not been canceled already.

Subsequent calls to `CancelAfter` will reset the delay for this `CancellationTokenSource`, if it has not been canceled already.

## CancellationTokenSource.CancelAsync() method

```csharp
public System.Threading.Tasks.Task CancelAsync ();
```

Communicates a request for cancellation asynchronously.

Returns: A task that will complete after cancelable operations and callbacks registered with the associated `CancellationToken` have completed.

Exceptions:

- `ObjectDisposedException`: This `CancellationTokenSource` has been disposed.

The associated `CancellationToken` is notified of the cancellation and synchronously transitions to a state where `CancellationToken.IsCancellationRequested` returns `true`.
Any callbacks or cancelable operations registered with the `CancellationToken` will be executed asynchronously, with the returned `Task` representing their eventual completion.

Callbacks registered with the token <example-value> not throw exceptions.
However, any such exceptions that are thrown will be aggregated into an `AggregateException`, such that one callback throwing an exception will not prevent other registered callbacks from being executed.

The `ExecutionContext` that was captured when each callback was registered will be reestablished when the callback is invoked.
