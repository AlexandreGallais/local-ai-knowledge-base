---
title: "Parallel class (part 1 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Parallel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Parallel class

Namespace: `System.Threading.Tasks`

```csharp
public static class Parallel
```

Provides support for parallel loops and regions.

#### Remarks
The `Parallel` class provides library-based data parallel replacements for common operations such as for loops, for each loops, and execution of a set of statements.

#### Examples
This example demonstrates several approaches to implementing a parallel loop using multiple language constructs.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Parallel/Overview/parallelintro.cs._

## Parallel.For(Int32, Int32, ParallelLoopState>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult For (int fromInclusive, int toExclusive, Action<int,System.Threading.Tasks.ParallelLoopState> body);
```

Executes a `for` loop in which iterations may run in parallel and the state of the loop can be monitored and manipulated.

Parameters:

- `fromInclusive`: The start index, inclusive.
- `toExclusive`: The end index, exclusive.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `body` argument is `null`.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.

#### Remarks
The `body` delegate is invoked once for each value in the iteration range (`fromInclusive`, `toExclusive`). It is provided with two arguments:

- An `Int32` value that represents the iteration count.

- A `ParallelLoopState` instance that can be used to break out of the loop prematurely. The `ParallelLoopState` object is created by the compiler; it cannot be instantiated in user code.

Calling the `ParallelLoopState.Break` method informs the `for` operation that iterations after the current one don't have to execute. However, all iterations before the current one will still have to be executed if they haven't already.

Therefore, calling `ParallelLoopState.Break` is similar to using a break operation within a conventional `for` loop in a language like C#, but it is not a perfect substitute: For example, there is no guarantee that iterations after the current one will definitely not execute.

If executing all iterations before the current one is not necessary, use the `ParallelLoopState.Stop` method instead of using `ParallelLoopState.Break`. Calling `ParallelLoopState.Stop` informs the `for` loop that it may abandon all remaining iterations, regardless of whether they're before or after the current iteration, because all required work will have already been completed. However, as with `ParallelLoopState.Break`, there are no guarantees regarding which other iterations will not execute.

If a loop is ended prematurely, the `ParallelLoopResult` structure that is returned will contain relevant information about the loop's completion.

If `fromInclusive` is greater than or equal to `toExclusive`, the method returns immediately without performing any iterations.

#### Examples
The following example executes up to 100 iterations of a loop in parallel. Each iteration pauses for a random interval from 1 to 1,000 milliseconds. A randomly generated value determines on which iteration of the loop the `ParallelLoopState.Break` method is called. As the output from the example shows, no iterations whose index is greater than the `LowestBreakIteration` property value start after the call to the `ParallelLoopState.Break` method.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Parallel/For/break1.cs._

Because iterations of the loop are still likely to be executing when the `ParallelLoopState.Break` method is called, each iteration calls the `ShouldExitCurrentIteration` property to check whether another iteration has called the `ParallelLoopState.Break` method. If  the property value is `true`, the iteration checks the value of the `LowestBreakIteration` property and, if it is greater than the current iteration's index value, returns immediately.

## Parallel.For(Int32, Int32, Int32>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult For (int fromInclusive, int toExclusive, Action<int> body);
```

Executes a `for` loop in which iterations may run in parallel.

Parameters:

- `fromInclusive`: The start index, inclusive.
- `toExclusive`: The end index, exclusive.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `body` argument is `null`.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.

#### Remarks
The `body` delegate is invoked once for each value in the iteration range (`fromInclusive`, `toExclusive`). It is provided with the iteration count (`Int32`) as a parameter.

If `fromInclusive` is greater than or equal to `toExclusive`, the method returns immediately without performing any iterations.

#### Examples
The following example uses the `Parallel.For` method for 100 invocations of a delegate that generates random byte values and computes their sum.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Parallel/For/for1.cs._

## Parallel.For(Int64, Int64, ParallelLoopState>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult For (long fromInclusive, long toExclusive, Action<long,System.Threading.Tasks.ParallelLoopState> body);
```

Executes a `for` loop with 64-bit indexes in which iterations may run in parallel and the state of the loop can be monitored and manipulated.

Parameters:

- `fromInclusive`: The start index, inclusive.
- `toExclusive`: The end index, exclusive.
- `body`: The delegate that is invoked once per iteration.

Returns: A `ParallelLoopResult` structure that contains information on what portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `body` argument is `null`.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.

#### Remarks
The `body` delegate is invoked once for each value in the iteration range (`fromInclusive`, `toExclusive`). It is provided with the following parameters: the iteration count (`Int64`), and a `ParallelLoopState` instance that may be used to break out of the loop prematurely.

Calling the `ParallelLoopState.Break` method informs the `for` operation that iterations after the current one don't have to be executed, but all iterations before the current one do.

Therefore, calling Break is similar to using a break operation within a conventional `for` loop in a language like C#, but it is not a perfect substitute: For example, there is no guarantee that iterations after the current one will definitely not execute.

If executing all iterations before the current one is not necessary, use the `ParallelLoopState.Stop` method instead of using `ParallelLoopState.Break`. Calling `ParallelLoopState.Stop` informs the `for` loop that it may abandon all remaining iterations, regardless of whether they're before or after the current iteration, because all required work will have already been completed. However, as with `ParallelLoopState.Break`, there are no guarantees regarding which other iterations will not execute.

If a loop is ended prematurely, the `ParallelLoopResult` structure that is returned will contain relevant information about the loop's completion.

If `fromInclusive` is greater than or equal to `toExclusive`, then the method returns immediately without performing any iterations.

## Parallel.For(Int64, Int64, Int64>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult For (long fromInclusive, long toExclusive, Action<long> body);
```

Executes a `for` loop with 64-bit indexes in which iterations may run in parallel.

Parameters:

- `fromInclusive`: The start index, inclusive.
- `toExclusive`: The end index, exclusive.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `body` argument is `null`.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.

#### Remarks
The `body` delegate is invoked once for each value in the iteration range (`fromInclusive`, `toExclusive`). It is provided with the iteration count (`Int64`) as a parameter.

If `fromInclusive` is greater than or equal to `toExclusive`, the method returns immediately without performing any iterations.

## Parallel.For(Int32, Int32, ParallelOptions, ParallelLoopState>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult For (int fromInclusive, int toExclusive, System.Threading.Tasks.ParallelOptions parallelOptions, Action<int,System.Threading.Tasks.ParallelLoopState> body);
```

Executes a `for` loop in which iterations may run in parallel, loop options can be configured, and the state of the loop can be monitored and manipulated.

Parameters:

- `fromInclusive`: The start index, inclusive.
- `toExclusive`: The end index, exclusive.
- `parallelOptions`: An object that configures the behavior of this operation.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` in the `parallelOptions` argument is canceled.
- `ArgumentNullException`: The `body` argument is `null`.

-or-

The `parallelOptions` argument is `null`.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `CancellationToken` in the `parallelOptions` has been disposed.

#### Remarks
The `body` delegate is invoked once for each value in the iteration range (`fromInclusive`, `toExclusive`). It is provided with the following parameters: the iteration count (`Int32`), and a `ParallelLoopState` instance that may be used to break out of the loop prematurely.

If `fromInclusive` is greater than or equal to `toExclusive`, the method returns immediately without performing any iterations.

## Parallel.For(Int32, Int32, ParallelOptions, Int32>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult For (int fromInclusive, int toExclusive, System.Threading.Tasks.ParallelOptions parallelOptions, Action<int> body);
```

Executes a `for` loop in which iterations may run in parallel and loop options can be configured.

Parameters:

- `fromInclusive`: The start index, inclusive.
- `toExclusive`: The end index, exclusive.
- `parallelOptions`: An object that configures the behavior of this operation.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` in the `parallelOptions` argument is canceled.
- `ArgumentNullException`: The `body` argument is `null`.

-or-

The `parallelOptions` argument is `null`.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `CancellationToken` in the `parallelOptions` has been disposed.

#### Remarks
The `body` delegate is invoked once for each value in the iteration range (`fromInclusive`, `toExclusive`). It is provided with the iteration count (`Int32`) as a parameter.

If `fromInclusive` is greater than or equal to `toExclusive`, then the method returns immediately without performing any iterations.

#### Examples
The following example shows how to cancel a parallel loop:

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Parallel/Overview/parallelforcancel.cs._

## Parallel.For(Int64, Int64, ParallelOptions, ParallelLoopState>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult For (long fromInclusive, long toExclusive, System.Threading.Tasks.ParallelOptions parallelOptions, Action<long,System.Threading.Tasks.ParallelLoopState> body);
```

Executes a `for` loop with 64-bit indexes in which iterations may run in parallel, loop options can be configured, and the state of the loop can be monitored and manipulated.

Parameters:

- `fromInclusive`: The start index, inclusive.
- `toExclusive`: The end index, exclusive.
- `parallelOptions`: An object that configures the behavior of this operation.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` in the `parallelOptions` argument is canceled.
- `ArgumentNullException`: The `body` argument is `null`.

-or-

The `parallelOptions` argument is `null`.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `CancellationToken` in the `parallelOptions` has been disposed.

#### Remarks
The `body` delegate is invoked once for each value in the iteration range (`fromInclusive`, `toExclusive`). It is provided with the following parameters: the iteration count (`Int64`), and a `ParallelLoopState` instance that may be used to break out of the loop prematurely.

If `fromInclusive` is greater than or equal to `toExclusive`, the method returns immediately without performing any iterations.

#### Examples
The following example shows how to use the `Parallel.For` method with a `ParallelOptions` object:

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Parallel/Overview/parallelfor.cs._
