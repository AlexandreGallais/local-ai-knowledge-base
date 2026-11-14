---
title: "SemaphoreSlim class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/SemaphoreSlim.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SemaphoreSlim class

Namespace: `System.Threading`

```csharp
public class SemaphoreSlim : IDisposable
```

Represents a lightweight alternative to `Semaphore` that limits the number of threads that can access a resource or pool of resources concurrently.

#### Remarks
Semaphores are of two types: local semaphores and named system semaphores. Local semaphores are local to an application, system semaphores are visible throughout the operating system and are suitable for inter-process synchronization. The `SemaphoreSlim` is a lightweight alternative to the `Semaphore` class that doesn't use Windows kernel semaphores. Unlike the `Semaphore` class, the `SemaphoreSlim` class doesn't support named system semaphores. You can use it as a local semaphore only. The `SemaphoreSlim` class is the recommended semaphore for synchronization within a single app.

A lightweight semaphore controls access to a pool of resources that is local to your application. When you instantiate a semaphore, you can specify the maximum number of threads that can enter the semaphore concurrently. You also specify the initial number of threads that can enter the semaphore concurrently. This defines the semaphore's count.

The count is decremented each time a thread enters the semaphore, and incremented each time a thread releases the semaphore. To enter the semaphore, a thread calls one of the `SemaphoreSlim.Wait` or `SemaphoreSlim.WaitAsync` overloads. To release the semaphore, it calls one of the `SemaphoreSlim.Release` overloads. When the count reaches zero, subsequent calls to one of the `Wait` methods block until other threads release the semaphore. If multiple threads are blocked, there is no guaranteed order, such as FIFO or LIFO, that controls when threads enter the semaphore.

The basic <example-value> for code that uses a semaphore to protect resources is:

```vb
' Enter semaphore by calling one of the Wait or WaitAsync methods.
SemaphoreSlim.Wait()
'
' Execute code protected by the semaphore.
'
SemaphoreSlim.Release()
```

When all threads have released the semaphore, the count is at the maximum value specified when the semaphore was created. The semaphore's count is available from the `CurrentCount` property.

> **Important:**
>  The `SemaphoreSlim` class doesn't enforce thread or task identity on calls to the `SemaphoreSlim.Wait`, `SemaphoreSlim.WaitAsync`, and `SemaphoreSlim.Release` methods. In addition, if the `%23ctor` constructor is used to instantiate the `SemaphoreSlim` object, the `CurrentCount` property can increase beyond the value set by the constructor. It is the programmer's responsibility to ensure that calls to `SemaphoreSlim.Wait` or `SemaphoreSlim.WaitAsync` methods are appropriately paired with calls to `SemaphoreSlim.Release` methods.

#### Examples
The following example creates a semaphore with a maximum count of three threads and an initial count of zero threads. The example starts five tasks, all of which block waiting for the semaphore. The main thread calls the `Release` overload to increase the semaphore count to its maximum, which allows three tasks to enter the semaphore. Each time the semaphore is released, the previous semaphore count is displayed. Console messages track semaphore use. The simulated work interval is increased slightly for each thread to make the output easier to read.

_Code sample not included: ~/snippets/csharp/System.Threading/SemaphoreSlim/Overview/example.cs._

## SemaphoreSlim.SemaphoreSlim(Int32) constructor

```csharp
public SemaphoreSlim (int initialCount);
```

Initializes a new instance of the `SemaphoreSlim` class, specifying the initial number of requests that can be granted concurrently.

Parameters:

- `initialCount`: The initial number of requests for the semaphore that can be granted concurrently.

Exceptions:

- `ArgumentOutOfRangeException`: `initialCount` is less than 0.

#### Remarks
The `initialCount` parameter defines the number of concurrent requests to enter the semaphore that can be granted. However, it doesn't define the maximum number of requests that can be granted concurrently. A   `SemaphoreSlim` object instantiated by calling this constructor doesn't throw a `SemaphoreFullException` exception if a call to the `SemaphoreSlim.Release` method increases the value of the `CurrentCount` property beyond `initialCount`. This occurs if there are more calls to `SemaphoreSlim.Release` methods than there are to `SemaphoreSlim.Wait` or `SemaphoreSlim.WaitAsync` methods. To set the maximum number of concurrent requests to enter the semaphore that can be granted, call the `%23ctor` constructor.

## SemaphoreSlim.SemaphoreSlim(Int32, Int32) constructor

```csharp
public SemaphoreSlim (int initialCount, int maxCount);
```

Initializes a new instance of the `SemaphoreSlim` class, specifying the initial and maximum number of requests that can be granted concurrently.

Parameters:

- `initialCount`: The initial number of requests for the semaphore that can be granted concurrently.
- `maxCount`: The maximum number of requests for the semaphore that can be granted concurrently.

Exceptions:

- `ArgumentOutOfRangeException`: `initialCount` is less than 0, or `initialCount` is greater than `maxCount`, or `maxCount` is equal to or less than 0.

To be added.

## SemaphoreSlim.AvailableWaitHandle property

```csharp
public System.Threading.WaitHandle AvailableWaitHandle { get; }
```

Returns a `WaitHandle` that can be used to wait on the semaphore.

Returns: A `WaitHandle` that can be used to wait on the semaphore.

Exceptions:

- `ObjectDisposedException`: The `SemaphoreSlim` has been disposed.

#### Remarks
Use this property only when you must wait on a SemaphoreSlim together with other kernel-based synchronization objects with the same wait handle. A successful wait on the `SemaphoreSlim.AvailableWaitHandle` does not imply a successful wait on the `SemaphoreSlim` itself, nor does it decrement the semaphore's count. After the available wait handle is signaled, you should wait on the `SemaphoreSlim` specifically.

## SemaphoreSlim.CurrentCount property

```csharp
public int CurrentCount { get; }
```

Gets the number of remaining threads that can enter the `SemaphoreSlim` object.

Returns: The number of remaining threads that can enter the semaphore.

#### Remarks
The initial value of the `CurrentCount` property is set by the call to the `SemaphoreSlim.%23ctor` class constructor. It is decremented by each call to the `SemaphoreSlim.Wait` or `SemaphoreSlim.WaitAsync` method, and incremented by each call to the `SemaphoreSlim.Release` method.

## SemaphoreSlim.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `SemaphoreSlim` class.

#### Remarks
Call `Dispose` when you are finished using the `SemaphoreSlim`. The `Dispose` method leaves the `SemaphoreSlim` in an unusable state. After calling `Dispose`, you must release all references to the `SemaphoreSlim` so the garbage collector can reclaim the memory that the `SemaphoreSlim` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Dispose` before you release your last reference to the `SemaphoreSlim`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `SemaphoreSlim` object's `Finalize` method.

## SemaphoreSlim.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `SemaphoreSlim`, and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
Unlike most of the members of `SemaphoreSlim`, `SemaphoreSlim.Dispose` is not thread-safe and may not be used concurrently with other members of this instance.

## SemaphoreSlim.Release() method

```csharp
public int Release ();
```

Releases the `SemaphoreSlim` object once.

Returns: The previous count of the `SemaphoreSlim`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `SemaphoreFullException`: The `SemaphoreSlim` has already reached its maximum size.

#### Remarks
A call to the `Release` method increments the `CurrentCount` property by one. If the value of the `CurrentCount` property is zero before this method is called, the method also allows one thread or task blocked by a call to the `SemaphoreSlim.Wait` or `SemaphoreSlim.WaitAsync` method to enter the semaphore.

## SemaphoreSlim.Release(Int32) method

```csharp
public int Release (int releaseCount);
```

Releases the `SemaphoreSlim` object a specified number of times.

Parameters:

- `releaseCount`: The number of times to exit the semaphore.

Returns: The previous count of the `SemaphoreSlim`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.
- `ArgumentOutOfRangeException`: `releaseCount` is less than 1.
- `SemaphoreFullException`: The `SemaphoreSlim` has already reached its maximum size.

#### Remarks
A call to the `Release` method increments the `CurrentCount` property by `releaseCount`. If the value of the `CurrentCount` property is zero before this method is called, the method also allows `releaseCount` threads or tasks blocked by a call to the `SemaphoreSlim.Wait` or `SemaphoreSlim.WaitAsync` method to enter the semaphore.

## SemaphoreSlim.Wait() method

```csharp
public void Wait ();
```

Blocks the current thread until it can enter the `SemaphoreSlim`.

Exceptions:

- `ObjectDisposedException`: The current instance has already been disposed.

#### Remarks
If a thread or task is able to enter the semaphore, it decrements the `CurrentCount` property by one.

## SemaphoreSlim.Wait(Int32) method

```csharp
public bool Wait (int millisecondsTimeout);
```

Blocks the current thread until it can enter the `SemaphoreSlim`, using a 32-bit signed integer that specifies the timeout.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, `Timeout.Infinite` (-1) to wait indefinitely, or zero to test the state of the wait handle and return immediately.

Returns: `true` if the current thread successfully entered the `SemaphoreSlim`; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite timeout -or- timeout is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The `SemaphoreSlim` has been disposed.

#### Remarks
If the timeout is set to -1 milliseconds, the method waits indefinitely.

If the timeout is set to zero milliseconds, the method doesn't block. It tests the state of the wait handle and returns immediately.

If a thread or task is able to enter the semaphore, it decrements the `CurrentCount` property by one.

If a thread or task is blocked when calling `Wait` and the timeout interval specified by `millisecondsTimeout` expires:

- The thread or task doesn't enter the semaphore.
- The `CurrentCount` property isn't decremented.

## SemaphoreSlim.Wait(CancellationToken) method

```csharp
public void Wait (System.Threading.CancellationToken <example-value>);
```

Blocks the current thread until it can enter the `SemaphoreSlim`, while observing a `CancellationToken`.

Parameters:

- `cancellationToken`: The `CancellationToken` token to observe.

Exceptions:

- `OperationCanceledException`: `cancellationToken` was canceled.
- `ObjectDisposedException`: The current instance has already been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has already been disposed.

#### Remarks
If a thread or task is able to enter the semaphore, it decrements the `CurrentCount` property by one.

If `cancellationToken` is cancelled, the thread or task doesn'<example-value>'t decremented. Instead, the method throws an `OperationCanceledException` exception.

## SemaphoreSlim.Wait(TimeSpan) method

```csharp
public bool Wait (TimeSpan timeout);
```

Blocks the current thread until it can enter the `SemaphoreSlim`, using a `TimeSpan` to specify the timeout.

Parameters:

- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, a `TimeSpan` that represents -1 milliseconds to wait indefinitely, or a `TimeSpan` that represents 0 milliseconds to test the wait handle and return immediately.

Returns: `true` if the current thread successfully entered the `SemaphoreSlim`; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1, which represents an infinite timeout.

-or-

In .NET 9 and earlier versions, `timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The semaphoreSlim instance has been disposed.

#### Remarks
If the timeout is set to -1 milliseconds, the method waits indefinitely.

If the timeout is set to zero milliseconds, the method doesn't block. It tests the state of the wait handle and returns immediately.

If a thread or task is able to enter the semaphore, it decrements the `CurrentCount` property by one.

If a thread or task is blocked when calling `Wait` and the timeout interval specified by `millisecondsTimeout` expires:

- The thread or task doesn't enter the semaphore.
- The `CurrentCount` property isn't decremented.
