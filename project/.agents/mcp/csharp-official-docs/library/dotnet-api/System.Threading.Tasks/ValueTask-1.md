---
title: "ValueTask<TResult> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/ValueTask`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValueTask<TResult> struct

Namespace: `System.Threading.Tasks`

```csharp
public readonly struct ValueTask<TResult> : IEquatable<System.Threading.Tasks.ValueTask<TResult>>
```

Provides a value type that wraps a `Task<T>` and a `TResult`, only one of which is used.

Parameters:

- `TResult`: The result.

#### Remarks
A `ValueTask<T>` instance may either be awaited or converted to a `Task<T>` using `ValueTask<T>.AsTask`. A `ValueTask<T>` instance may only be awaited once, and consumers may not read `Result` until the instance has completed. If these limitations are unacceptable, convert the `ValueTask<T>` to a `Task<T>` by calling `ValueTask<T>.AsTask`.

The following operations should never be performed on a `ValueTask<T>` instance:

- Awaiting the instance multiple times.
- Calling `ValueTask<T>.AsTask` multiple times.
- Using `.Result` or `.GetAwaiter().GetResult()` when the operation hasn't yet completed, or using them multiple times.
- Using more than one of these techniques to consume the instance.

If you do any of the above, the results are undefined.

A method may return an instance of this value type when it's likely that the result of its operation will be available synchronously, and when it's expected to be invoked so frequently that the cost of allocating a new `Task<T>` for each call will be prohibitive.

There are tradeoffs to using a `ValueTask<T>` instead of a `Task<T>`. For example, while a `ValueTask<T>` can help avoid an allocation in the case where the successful result is available synchronously, it also contains multiple fields, whereas a `Task<T>` as a reference type is a single field. This means that returning a `ValueTask<T>` from a method results in copying more data. It also means, that if a method that returns a `ValueTask<T>` is awaited within an async method, the state machine for that async method will be larger, because it must store a struct containing multiple fields instead of a single reference.

For uses other than consuming the result of an asynchronous operation using await, `ValueTask<T>` can lead to a more convoluted programming model that requires more allocations. For example, consider a method that could return either a `Task<T>` with a cached task as a common result or a `ValueTask<T>`. If the consumer of the result wants to use it as a `Task<T>` in a method like `Task.WhenAll` or `Task.WhenAny`, the `ValueTask<T>` must first be converted to a `Task<T>` using `ValueTask<T>.AsTask`, leading to an allocation that would have been avoided if a cached `Task<T>` had been used in the first place.

As such, the default choice for any asynchronous method should be to return a `Task` or `Task<T>`. Only if performance analysis proves it worthwhile should a `ValueTask<T>` be used instead of a `Task<T>`. The non generic version of `ValueTask` is not recommended for most scenarios. The `CompletedTask` property should be used to hand back a successfully completed singleton in the case where a method returning a `Task` completes synchronously and successfully.

> **Note:**
>  The use of the `ValueTask<T>` type is supported starting with C# 7.0, and is not supported by any version of Visual Basic.

> **Note:**
> An instance created with the parameterless constructor or by the `default(ValueTask<TResult>)` syntax (a zero-initialized structure) represents a synchronously, successfully completed operation with a result of `default(TResult)`.

## ValueTask<TResult>.ValueTask(Task<TResult>) constructor

```csharp
public ValueTask (System.Threading.Tasks.Task<TResult> task);
```

Initializes a new instance of the `ValueTask<T>` class using the supplied task that represents the operation.

Parameters:

- `task`: The task.

Exceptions:

- `ArgumentNullException`: The `task` argument is `null`.

## ValueTask<TResult>.ValueTask(TResult) constructor

```csharp
public ValueTask (TResult result);
```

Initializes a new instance of the `ValueTask<T>` class using the supplied result of a successful operation.

Parameters:

- `result`: The result.

## ValueTask<TResult>.ValueTask(IValueTaskSource<TResult>, Int16) constructor

```csharp
public ValueTask (System.Threading.Tasks.Sources.IValueTaskSource<TResult> source, short token);
```

Initializes a new instance of the `ValueTask<T>` class with a `IValueTaskSource<T>` object that represents the operation.

Parameters:

- `source`: The source.
- `token`: An opaque value that is passed to the `IValueTaskSource`.

To be added.

## ValueTask<TResult>.IsCanceled property

```csharp
public bool IsCanceled { get; }
```

Gets a value that indicates whether this object represents a canceled operation.

Returns: `true` if this object represents a canceled operation; otherwise, `false`.

If the `ValueTask<T>` is backed by a result or by a `IValueTaskSource<T>`, this will always return `false`.  If it's backed by a `Task`, it'll return the value of the task's `IsCanceled` property.

## ValueTask<TResult>.IsCompleted property

```csharp
public bool IsCompleted { get; }
```

Gets a value that indicates whether this object represents a completed operation.

Returns: `true` if this object represents a completed operation; otherwise, `false`.

## ValueTask<TResult>.IsCompletedSuccessfully property

```csharp
public bool IsCompletedSuccessfully { get; }
```

Gets a value that indicates whether this object represents a successfully completed operation.

Returns: `true` if this object represents a successfully completed operation; otherwise, `false`.

## ValueTask<TResult>.IsFaulted property

```csharp
public bool IsFaulted { get; }
```

Gets a value that indicates whether this object represents a failed operation.

Returns: `true` if this object represents a failed operation; otherwise, `false`.

## ValueTask<TResult>.Result property

```csharp
public TResult Result { get; }
```

Gets the result.

Returns: The result.

#### Remarks
This property may only be accessed once, and only after this `ValueTask<T>` has completed.

If this `ValueTask<T>` has completed successfully, this property returns the resulting value. If this `ValueTask<T>` has faulted, this property raises an exception. The thrown exception is not wrapped in an `AggregateException`.

## ValueTask<TResult>.AsTask() method

```csharp
public System.Threading.Tasks.Task<TResult> AsTask ();
```

Retrieves a `Task<T>` object that represents this `ValueTask<T>`.

Returns: The `Task<T>` object that is wrapped in this `ValueTask<T>` if one exists, or a new `Task<T>` object that represents the result.

This method either returns the wrapped task object, if one exists, or it manufactures a new task object to represent the result.

## ValueTask<TResult>.ConfigureAwait(Boolean) method

```csharp
public System.Runtime.CompilerServices.ConfiguredValueTaskAwaitable<TResult> ConfigureAwait (bool continueOnCapturedContext);
```

Configures an awaiter for this value.

Parameters:

- `continueOnCapturedContext`: `true` to attempt to marshal the continuation back to the captured context; otherwise, `false`.

Returns: The configured awaiter.

## ValueTask<TResult>.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified object is equal to the current object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified object is equal to the current object; otherwise, `false`.

## ValueTask<TResult>.Equals(ValueTask<TResult>) method

```csharp
public bool Equals (System.Threading.Tasks.ValueTask<TResult> other);
```

Determines whether the specified `ValueTask<T>` object is equal to the current `ValueTask<T>` object.

Parameters:

- `other`: The object to compare with the current object.

Returns: `true` if the specified object is equal to the current object; otherwise, `false`.

## ValueTask<TResult>.GetAwaiter() method

```csharp
public System.Runtime.CompilerServices.ValueTaskAwaiter<TResult> GetAwaiter ();
```

Creates an awaiter for this value.

Returns: The awaiter.

## ValueTask<TResult>.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code for the current object.

## ValueTask<TResult>.op_Equality(ValueTask<TResult>, ValueTask<TResult>) method

```csharp
public static bool operator == (System.Threading.Tasks.ValueTask<TResult> left, System.Threading.Tasks.ValueTask<TResult> right);
```

Compares two values for equality.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if the two `ValueTask<T>` values are equal; otherwise, `false`.

## ValueTask<TResult>.op_Inequality(ValueTask<TResult>, ValueTask<TResult>) method

```csharp
public static bool operator != (System.Threading.Tasks.ValueTask<TResult> left, System.Threading.Tasks.ValueTask<TResult> right);
```

Determines whether two `ValueTask<T>` values are unequal.

Parameters:

- `left`: The first value to compare.
- `right`: The second value to compare.

Returns: `true` if the two `ValueTask<T>` values are not equal; otherwise, `false`.

## ValueTask<TResult>.Preserve() method

```csharp
public System.Threading.Tasks.ValueTask<TResult> Preserve ();
```

Gets a `ValueTask<T>` that may be used at any point in the future.

Returns: A task object for future use.

#### Remarks

Because a `ValueTask<T>` can be backed by a pooled `IValueTaskSource<T>`, it is not safe to await an arbitrary `ValueTask<T>` multiple times. You can use the `Preserve` method to convert this `ValueTask<T>` into the instance backed by a regular `Task<T>` that is safe to await multiple times. This method is similar to `AsTask`, but it returns the same `ValueTask<T>` instance when this `ValueTask<T>` represents a successful synchronously completed operation. After calling `Preserve` the original `ValueTask<T>` should never be used again.

## ValueTask<TResult>.ToString() method

```csharp
public override string? ToString ();
```

Returns a string that represents the current object.

Returns: A string that represents the current object.
