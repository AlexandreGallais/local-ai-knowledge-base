---
title: "Barrier class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Barrier.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Barrier class

Namespace: `System.Threading`

```csharp
public class Barrier : IDisposable
```

Enables multiple tasks to cooperatively work on an algorithm in parallel through multiple phases.

#### Remarks
A group of tasks cooperate by moving through a series of phases, where each in the group signals it has arrived at the `Barrier` in a given phase and implicitly waits for all others to arrive. The same `Barrier` can be used for multiple phases.

#### Examples
The following example shows how to use a barrier:

_Code sample not included: ~/snippets/csharp/System.Threading/Barrier/Overview/barrier.cs._

## Barrier.Barrier(Int32) constructor

```csharp
public Barrier (int participantCount);
```

Initializes a new instance of the `Barrier` class.

Parameters:

- `participantCount`: The number of participating threads.

Exceptions:

- `ArgumentOutOfRangeException`: `participantCount` is less than 0 or greater than 32,767.

To be added.

## Barrier.Barrier(Int32, Barrier>) constructor

```csharp
public Barrier (int participantCount, Action<System.Threading.Barrier>? postPhaseAction);
```

Initializes a new instance of the `Barrier` class.

Parameters:

- `participantCount`: The number of participating threads.
- `postPhaseAction`: The `Action<T>` to be executed after each phase. null (Nothing in Visual Basic) may be passed to indicate no action is taken.

Exceptions:

- `ArgumentOutOfRangeException`: `participantCount` is less than 0 or greater than 32,767.

#### Remarks
The `postPhaseAction` delegate will be executed after all participants have arrived at the barrier in one phase. The participants will not be released to the next phase until the postPhaseAction delegate has completed execution.

## Barrier.CurrentPhaseNumber property

```csharp
public long CurrentPhaseNumber { get; }
```

Gets the number of the barrier's current phase.

Returns: Returns the number of the barrier's current phase.

To be added.

## Barrier.ParticipantCount property

```csharp
public int ParticipantCount { get; }
```

Gets the total number of participants in the barrier.

Returns: Returns the total number of participants in the barrier.

To be added.

## Barrier.ParticipantsRemaining property

```csharp
public int ParticipantsRemaining { get; }
```

Gets the number of participants in the barrier that haven't yet signaled in the current phase.

Returns: Returns the number of participants in the barrier that haven't yet signaled in the current phase.

#### Remarks
This could be 0 during a post-phase action delegate execution or if the ParticipantCount is 0.

## Barrier.AddParticipant() method

```csharp
public long AddParticipant ();
```

Notifies the `Barrier` that there will be an additional participant.

Returns: The phase number of the barrier in which the new participants will first participate.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `InvalidOperationException`: Adding a participant would cause the barrier's participant count to exceed 32,767.

-or-

The method was invoked from within a post-phase action.

#### Remarks
If the barrier is currently executing a post phase action, this call is blocked until the post phase action completes and the barrier has moved on to the next phase.

## Barrier.AddParticipants(Int32) method

```csharp
public long AddParticipants (int participantCount);
```

Notifies the `Barrier` that there will be additional participants.

Parameters:

- `participantCount`: The number of additional participants to add to the barrier.

Returns: The phase number of the barrier in which the new participants will first participate.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `participantCount` is less than 0.

-or-

Adding `participantCount` participants would cause the barrier's participant count to exceed 32,767.
- `InvalidOperationException`: The method was invoked from within a post-phase action.

#### Remarks
If the barrier is currently executing a post phase action, this call is blocked until the post phase action completes and the barrier has moved on to the next phase.

## Barrier.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `Barrier` class.

Exceptions:

- `InvalidOperationException`: The method was invoked from within a post-phase action.

#### Remarks
Call `Dispose` when you are finished using the `Barrier`. The `Dispose` method leaves the `Barrier` in an unusable state. After calling `Dispose`, you must release all references to the `Barrier` so the garbage collector can reclaim the memory that the `Barrier` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Dispose` before you release your last reference to the `Barrier`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `Barrier` object's `Finalize` method.

## Barrier.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `Barrier`, and optionally releases the managed resources.

Parameters:

- `disposing`: true to release both managed and unmanaged resources; false to release only unmanaged resources.

#### Remarks
Unlike most of the members of `Barrier`, Dispose is not thread-safe and may not be used concurrently with other members of this instance.

## Barrier.RemoveParticipant() method

```csharp
public void RemoveParticipant ();
```

Notifies the `Barrier` that there will be one less participant.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `InvalidOperationException`: The barrier already has 0 participants.

-or-

The method was invoked from within a post-phase action.

To be added.

## Barrier.RemoveParticipants(Int32) method

```csharp
public void RemoveParticipants (int participantCount);
```

Notifies the `Barrier` that there will be fewer participants.

Parameters:

- `participantCount`: The number of additional participants to remove from the barrier.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: The total participant count is less than the specified `participantCount`
- `InvalidOperationException`: The barrier already has 0 participants.

-or-

The method was invoked from within a post-phase action.

-or-

The current participant count is less than the specified participantCount.

#### Remarks
If `participantCount` participants are already waiting on the barrier, this removal fulfills the barrier, the post phase action is executed and all of the participants are woken as if this participant being removed had successfully reached the barrier.

## Barrier.SignalAndWait() method

```csharp
public void SignalAndWait ();
```

Signals that a participant has reached the barrier and waits for all other participants to reach the barrier as well.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `InvalidOperationException`: The method was invoked from within a post-phase action, the barrier currently has 0 participants, or the barrier is signaled by more threads than are registered as participants.
- `BarrierPostPhaseException`: If an exception is thrown from the post phase action of a Barrier after all participating threads have called SignalAndWait, the exception will be wrapped in a BarrierPostPhaseException and be thrown on all participating threads.

To be added.

## Barrier.SignalAndWait(Int32) method

```csharp
public bool SignalAndWait (int millisecondsTimeout);
```

Signals that a participant has reached the barrier and waits for all other participants to reach the barrier as well, using a 32-bit signed integer to measure the timeout.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite`(-1) to wait indefinitely.

Returns: `true` if all participants reached the barrier within the specified time; otherwise `false`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `InvalidOperationException`: The method was invoked from within a post-phase action, the barrier currently has 0 participants, or the barrier is signaled by more threads than are registered as participants.
- `BarrierPostPhaseException`: If an exception is thrown from the post phase action of a Barrier after all participating threads have called SignalAndWait, the exception will be wrapped in a BarrierPostPhaseException and be thrown on all participating threads.

To be added.

## Barrier.SignalAndWait(CancellationToken) method

```csharp
public void SignalAndWait (System.Threading.CancellationToken <example-value>);
```

Signals that a participant has reached the barrier and waits for all other participants to reach the barrier, while observing a cancellation token.

Parameters:

- `cancellationToken`: The `CancellationToken` to observe.

Exceptions:

- `OperationCanceledException`: `cancellationToken` has been canceled.
- `ObjectDisposedException`: The current instance has already been disposed.
- `InvalidOperationException`: The method was invoked from within a post-phase action, the barrier currently has 0 participants, or the barrier is signaled by more threads than are registered as participants.

To be added.

## Barrier.SignalAndWait(TimeSpan) method

```csharp
public bool SignalAndWait (TimeSpan timeout);
```

Signals that a participant has reached the barrier and waits for all other participants to reach the barrier as well, using a `TimeSpan` object to measure the time interval.

Parameters:

- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.

Returns: `true` if all other participants reached the barrier; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out, or it is greater than 32,767.
- `InvalidOperationException`: The method was invoked from within a post-phase action, the barrier currently has 0 participants, or the barrier is signaled by more threads than are registered as participants.

To be added.

## Barrier.SignalAndWait(Int32, CancellationToken) method

```csharp
public bool SignalAndWait (int millisecondsTimeout, System.Threading.CancellationToken <example-value>);
```

Signals that a participant has reached the barrier and waits for all other participants to reach the barrier as well, using a 32-bit signed integer to measure the timeout, while observing a cancellation token.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite`(-1) to wait indefinitely.
- `cancellationToken`: The `CancellationToken` to observe.

Returns: `true` if all participants reached the barrier within the specified time; otherwise, `false`.

Exceptions:

- `OperationCanceledException`: `cancellationToken` has been canceled.
- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `InvalidOperationException`: The method was invoked from within a post-phase action, the barrier currently has 0 participants, or the barrier is signaled by more threads than are registered as participants.

#### Remarks
If the `cancellationToken` was canceled before the signal took effect, then an `OperationCanceledException` is thrown and the `Barrier.ParticipantsRemaining` value is not decreased. If the `cancellationToken` is not canceled or is canceled after the signal takes effect then `Barrier.ParticipantsRemaining` is decreased and no `OperationCanceledException` is thrown.

## Barrier.SignalAndWait(TimeSpan, CancellationToken) method

```csharp
public bool SignalAndWait (TimeSpan timeout, System.Threading.CancellationToken <example-value>);
```

Signals that a participant has reached the barrier and waits for all other participants to reach the barrier as well, using a `TimeSpan` object to measure the time interval, while observing a cancellation token.

Parameters:

- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.
- `cancellationToken`: The `CancellationToken` to observe.

Returns: `true` if all other participants reached the barrier; otherwise, `false`.

Exceptions:

- `OperationCanceledException`: `cancellationToken` has been canceled.
- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out.
- `InvalidOperationException`: The method was invoked from within a post-phase action, the barrier currently has 0 participants, or the barrier is signaled by more threads than are registered as participants.

To be added.
