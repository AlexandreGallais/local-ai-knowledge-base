---
title: "ValueTask struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/ValueTask.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValueTask struct

Namespace: `System.Threading.Tasks`

```csharp
public readonly struct ValueTask : IEquatable<System.Threading.Tasks.ValueTask>
```

Provides an awaitable result of an asynchronous operation.

#### Remarks
A `ValueTask` instance may either be awaited or converted to a `Task` using `ValueTask.AsTask`. A `ValueTask` instance may only be awaited once, and consumers may not call `GetAwaiter` until the instance has completed. If these limitations are unacceptable, convert the `ValueTask` to a `Task` by calling `ValueTask.AsTask`.

The following operations should never be performed on a `ValueTask` instance:

- Awaiting the instance multiple times.
- Calling `ValueTask.AsTask` multiple times.
- Using more than one of these techniques to consume the instance.

If you do any of the above, the results are undefined.

A `ValueTask` is a structure that can wrap either a `Task` or a `IValueTaskSource` instance. Returning a `ValueTask` that wraps a `IValueTaskSource` instance from an asynchronous method enables high-throughput applications to avoid allocations by using a pool of reusable `IValueTaskSource` objects. For more information, see Understanding the Whys, Whats, and Whens of ValueTask.

Using a `ValueTask` instead of a `Task` introduces some overhead. Because `ValueTask` is a structure with multiple fields, returning it from the method results in copying more data compared to returning a single `Task` reference. As such, the default choice for any asynchronous method that does not return a result should be to return a `Task`. Only if performance analysis proves it worthwhile should a `ValueTask` be used instead of a `Task`. The `CompletedTask` property should be used to hand back a successfully completed singleton in the case where a method returning a `Task` completes synchronously and successfully.

> **Note:**
> The use of the `ValueTask` type is supported starting with C# 7.0 and is not supported by any version of Visual Basic.

> **Note:**
> An instance created with the parameterless constructor or by the `default(ValueTask)` syntax (a zero-initialized structure) represents a synchronously, successfully completed operation.

## ValueTask.ValueTask(Task) constructor

```csharp
public ValueTask (System.Threading.Tasks.Task task);
```

Initializes a new instance of the `ValueTask` class using the supplied task that represents the operation.

Parameters:

- `task`: The task that represents the operation.

To be added.

## ValueTask.ValueTask(IValueTaskSource, Int16) constructor

```csharp
public ValueTask (System.Threading.Tasks.Sources.IValueTaskSource source, short token);
```

Initializes a new instance of the `ValueTask` class using the supplied `IValueTaskSource` object that represents the operation.

Parameters:

- `source`: An object that represents the operation.
- `token`: An opaque value that is passed through to the `IValueTaskSource`.

To be added.

## ValueTask.CompletedTask property

```csharp
public static System.Threading.Tasks.ValueTask CompletedTask { get; }
```

Gets a task that has already completed successfully.

Returns: To be added.

To be added.

## ValueTask.IsCanceled property

```csharp
public bool IsCanceled { get; }
```

Gets a value that indicates whether this object represents a canceled operation.

Returns: `true` if this object represents a canceled operation; otherwise, `false`.

If the `ValueTask` is backed by a result or by a `IValueTaskSource`, this will always return `false`.  If it's backed by a `Task`, it'll return the value of the task's `IsCanceled` property.

## ValueTask.IsCompleted property

```csharp
public bool IsCompleted { get; }
```

Gets a value that indicates whether this object represents a completed operation.

Returns: `true` if this object represents a completed operation; otherwise, `false`.

To be added.

## ValueTask.IsCompletedSuccessfully property

```csharp
public bool IsCompletedSuccessfully { get; }
```

Gets a value that indicates whether this object represents a successfully completed operation.

Returns: `true` if this object represents a successfully completed operation; otherwise, `false`.

To be added.

## ValueTask.IsFaulted property

```csharp
public bool IsFaulted { get; }
```

Gets a value that indicates whether this object represents a failed operation.

Returns: `true` if this object represents a failed operation; otherwise, `false`.

To be added.

## ValueTask.AsTask() method

```csharp
public System.Threading.Tasks.Task AsTask ();
```

Retrieves a `Task` object that represents this `ValueTask`.

Returns: The `Task` object that is wrapped in this `ValueTask` if one exists, or a new `Task` object that represents the result.

This method either returns the wrapped task object, if one exists, or it manufactures a new task object to represent the result.

## ValueTask.ConfigureAwait(Boolean) method

```csharp
public System.Runtime.CompilerServices.ConfiguredValueTaskAwaitable ConfigureAwait (bool continueOnCapturedContext);
```

Configures an awaiter for this value.

Parameters:

- `continueOnCapturedContext`: `true` to attempt to marshal the continuation back to the captured context; otherwise, `false`.

Returns: The configured awaiter.

To be added.

## ValueTask.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified object is equal to the current `ValueTask` instance.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified object is equal to the current object; otherwise, `false`.

#### Remarks
Two `ValueTask` instances are equal when they wrap the same `Task` or the same pair of the `IValueTaskSource` object and the token.

## ValueTask.Equals(ValueTask) method

```csharp
public bool Equals (System.Threading.Tasks.ValueTask other);
```

Determines whether the specified `ValueTask` object is equal to the current `ValueTask` object.

Parameters:

- `other`: The object to compare with the current object.

Returns: `true` if the specified object is equal to the current object; otherwise, `false`.

#### Remarks
Two `ValueTask` instances are equal when they wrap the same `Task` or the same pair of the `IValueTaskSource` object and the token.

## ValueTask.FromCanceled(CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask FromCanceled (System.Threading.CancellationToken <example-value>);
```

Creates a `ValueTask` that has completed due to cancellation with the specified cancellation token.

Parameters:

- `cancellationToken`: The cancellation token with which to complete the task.

Returns: The canceled task.

To be added.

## ValueTask.FromCanceled<TResult>(CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TResult> FromCanceled<TResult> (System.Threading.CancellationToken <example-value>);
```

Creates a `ValueTask<T>` that has completed due to cancellation with the specified cancellation token.

Parameters:

- `TResult`: The type of the result of the returned task.
- `cancellationToken`: The cancellation token with which to complete the task.

Returns: The canceled task.

To be added.

## ValueTask.FromException(Exception) method

```csharp
public static System.Threading.Tasks.ValueTask FromException (Exception exception);
```

Creates a `ValueTask` that has completed with the specified exception.

Parameters:

- `exception`: The exception with which to complete the task.

Returns: The faulted task.

To be added.

## ValueTask.FromException<TResult>(Exception) method

```csharp
public static System.Threading.Tasks.ValueTask<TResult> FromException<TResult> (Exception exception);
```

Creates a `ValueTask<T>` that has completed with the specified exception.

Parameters:

- `TResult`: The type of the result of the returned task.
- `exception`: The exception with which to complete the task.

Returns: The faulted task.

To be added.

## ValueTask.FromResult<TResult>(TResult) method

```csharp
public static System.Threading.Tasks.ValueTask<TResult> FromResult<TResult> (TResult result);
```

Creates a `ValueTask<T>` that's completed successfully with the specified result.

Parameters:

- `TResult`: The type of the result returned by the task.
- `result`: The result to store into the completed task.

Returns: The successfully completed task.

To be added.

## ValueTask.GetAwaiter() method

```csharp
public System.Runtime.CompilerServices.ValueTaskAwaiter GetAwaiter ();
```

Creates an awaiter for this value.

Returns: The awaiter.

To be added.

## ValueTask.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code for the current object.

To be added.

## ValueTask.op_Equality(ValueTask, ValueTask) method

```csharp
public static bool operator == (System.Threading.Tasks.ValueTask left, System.Threading.Tasks.ValueTask right);
```

Compares two `ValueTask` values for equality.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if the two `ValueTask` values are equal; otherwise, `false`.

#### Remarks
Two `ValueTask` instances are equal when they wrap the same `Task` or the same pair of the `IValueTaskSource` object and the token.

## ValueTask.op_Inequality(ValueTask, ValueTask) method

```csharp
public static bool operator != (System.Threading.Tasks.ValueTask left, System.Threading.Tasks.ValueTask right);
```

Determines whether two `ValueTask` values are unequal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if the two `ValueTask` values are not equal; otherwise, `false`.

#### Remarks
Two `ValueTask` instances are equal when they wrap the same `Task` or the same pair of the `IValueTaskSource` object and the token.

## ValueTask.Preserve() method

```csharp
public System.Threading.Tasks.ValueTask Preserve ();
```

Gets a `ValueTask` that may be used at any point in the future.

Returns: The preserved `ValueTask`.

#### Remarks

Because a `ValueTask` can be backed by a pooled `IValueTaskSource`, it is not safe to await an arbitrary `ValueTask` multiple times. You can use the `Preserve` method to convert this `ValueTask` into the instance backed by a regular `Task` that is safe to await multiple times. This method is similar to `AsTask`, but it returns the same `ValueTask` instance when this `ValueTask` represents a successful synchronously completed operation. After calling `Preserve` the original `ValueTask` should never be used again.
