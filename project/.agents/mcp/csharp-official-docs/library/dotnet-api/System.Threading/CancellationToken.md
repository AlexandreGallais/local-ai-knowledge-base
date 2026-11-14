---
title: "CancellationToken <example-value> (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/CancellationToken.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CancellationToken <example-value>

Namespace: `System.Threading`

```csharp
public readonly struct CancellationToken : <example-value><System.Threading.CancellationToken>
```

Propagates notification that operations should be canceled.

#### Remarks
A `CancellationToken` enables cooperative cancellation between threads, thread pool work items, or `Task` objects. You create a cancellation token by instantiating a `CancellationTokenSource` object, which manages cancellation tokens retrieved from its `Token` property. You then  pass the cancellation token to any number of threads, tasks, or operations that should receive notice of cancellation. The token <example-value> be used to initiate cancellation. When the owning object calls `CancellationTokenSource.Cancel`, the `IsCancellationRequested` property on every copy of the cancellation token is set to `true`. The objects that receive the notification can respond in whatever manner is appropriate.

For more information and code examples see Cancellation in Managed Threads.

#### Examples
The following example uses a random number generator to emulate a data collection application that reads 10 integral values from eleven different instruments. A value of zero indicates that the measurement has failed for one instrument, in which case the operation should be cancelled and no overall mean should be computed.

To handle the possible cancellation of the operation, the example instantiates a `CancellationTokenSource` object that generates a cancellation token that's passed to a `TaskFactory` object. In turn, the `TaskFactory` object passes the cancellation token to each of the tasks responsible for collecting readings for a particular instrument. The `ContinueWhenAll<T1,T2>` method is called to ensure that the mean is computed only after all readings have been gathered successfully. If a task has not completed because it was cancelled, the `TaskFactory.ContinueWhenAll` method throws an exception.

_Code sample not included: ~/snippets/csharp/System.Threading/CancellationToken/Overview/cancel1.cs._

## CancellationToken.CancellationToken(Boolean) constructor

```csharp
public CancellationToken (bool canceled);
```

Initializes the `CancellationToken`.

Parameters:

- `canceled`: The canceled state for the token.

#### Remarks
Tokens created with this constructor will remain in the canceled state specified by the `canceled` parameter. If `canceled` is `false`, both `CancellationToken.CanBeCanceled` and `CancellationToken.IsCancellationRequested` will be `false`.

If `canceled` is `true`, both `CancellationToken.CanBeCanceled` and `CancellationToken.IsCancellationRequested` will be `true`.

## CancellationToken.CanBeCanceled property

```csharp
public bool CanBeCanceled { get; }
```

Gets whether this token is capable of being in the canceled state.

Returns: `true` if this token is capable of being in the canceled state; otherwise, `false`.

#### Remarks
If `CancellationToken.CanBeCanceled` returns `false`, it is guaranteed that the token will never transition into a canceled state, meaning that `CancellationToken.IsCancellationRequested` will never return `true`. A cancellation token that cannot be canceled is returned by the static `None` property.

You can optionally use this property to determine whether a cancellation token can be canceled before examining the value of the `IsCancellationRequested` property to determine whether it has been canceled.

## CancellationToken.IsCancellationRequested property

```csharp
public bool IsCancellationRequested { get; }
```

Gets whether cancellation has been requested for this token.

Returns: `true` if cancellation has been requested for this token; otherwise, `false`.

#### Remarks
This property indicates whether cancellation has been requested for this token, either through the token <example-value> being constructed in a canceled state, or through calling `CancellationTokenSource.Cancel` on the token's associated `CancellationTokenSource`.

If this property is `true`, it only guarantees that cancellation has been requested. It does not guarantee that every registered handler has finished executing, nor that cancellation requests have finished propagating to all registered handlers. Additional synchronization may be required, particularly in situations where related objects are being canceled concurrently.

#### Examples
The following is a simple example that executes a server process until the `IsCancellationRequested` property returns `true`.

_Code sample not included: ~/snippets/csharp/System.Threading/CancellationToken/IsCancellationRequested/cancellation.cs._

The example instantiates a `CancellationTokenSource` object, which controls access to the cancellation token. It then defines two thread procedures. The first is defined as a lambda expression that pools the keyboard and, when the "C" key is pressed, calls `CancellationTokenSource.Cancel` to set the cancellation token to the cancelled state. The second is a parameterized method, `ServerClass.StaticMethod`, that executes a loop until the `IsCancellationRequested` property is `true`.

The main thread then starts the two threads and blocks until the thread that executes the `ServerClass.StaticMethod` method terminates.

## CancellationToken.None property

```csharp
public static System.Threading.CancellationToken None { get; }
```

Returns an empty `CancellationToken` value.

Returns: An empty cancellation token.

#### Remarks
The cancellation token <example-value> by this property cannot be canceled; that is, its `CanBeCanceled` property is `false`.

You can also use the C#  default(CancellationToken) statement to create an empty cancellation token.

Two empty cancellation tokens are always equal.

## CancellationToken.WaitHandle property

```csharp
public System.Threading.WaitHandle WaitHandle { get; }
```

Gets a `WaitHandle` that is signaled when the token is canceled.

Returns: A `WaitHandle` that is signaled when the token is canceled.

Exceptions:

- `ObjectDisposedException`: The associated `CancellationTokenSource` has been disposed.

#### Remarks
Accessing this property causes a `WaitHandle` to be instantiated. It is preferable to only use this property when necessary, and to then dispose the associated `CancellationTokenSource` instance at the earliest opportunity (disposing the source will dispose of this allocated handle). The handle should not be closed or disposed directly.

## CancellationToken.Equals(Object) method

```csharp
public override bool Equals (object? other);
```

Determines whether the current `CancellationToken` instance is equal to the specified `Object`.

Parameters:

- `other`: The other object to compare with this instance.

Returns: `true` if `other` is a `CancellationToken` and if the two instances are equal; otherwise, `false`. See the Remarks section for more information.

Exceptions:

- `ObjectDisposedException`: An associated `CancellationTokenSource` has been disposed.

#### Remarks

Two cancellation tokens are equal if any one of the following conditions is true:

- They are associated with the same `CancellationTokenSource`.

- They were both constructed from public `CancellationToken` constructors, and their `IsCancellationRequested` values are equal.

- The value of both cancellation tokens is `None`.

## CancellationToken.Equals(CancellationToken) method

```csharp
public bool Equals (System.Threading.CancellationToken other);
```

Determines whether the current `CancellationToken` instance is equal to the specified token.

Parameters:

- `other`: The other `CancellationToken` to compare with this instance.

Returns: `true` if the instances are equal; otherwise, `false`. See the Remarks section for more information.

#### Remarks

Two cancellation tokens are equal if any one of the following conditions is true:

- They are associated with the same `CancellationTokenSource`.

- They were both constructed from public `CancellationToken` constructors, and their `IsCancellationRequested` values are equal.

- The value of both cancellation tokens is `None`.

## CancellationToken.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for a `CancellationToken`.

Returns: A hash code for the current `CancellationToken` instance.

To be added.

## CancellationToken.op_Equality(CancellationToken, CancellationToken) method

```csharp
public static bool operator == (System.Threading.CancellationToken left, System.Threading.CancellationToken right);
```

Determines whether two `CancellationToken` instances are equal.

Parameters:

- `left`: The first instance.
- `right`: The second instance.

Returns: `true` if the instances are equal; otherwise, `false` See the Remarks section for more information.

Exceptions:

- `ObjectDisposedException`: An associated `CancellationTokenSource` has been disposed.

#### Remarks

Two cancellation tokens are equal if any one of the following conditions is true:

- They are associated with the same `CancellationTokenSource`.

- They were both constructed from public `CancellationToken` constructors, and their `IsCancellationRequested` values are equal.

- The value of both cancellation tokens is `None`.

## CancellationToken.op_Inequality(CancellationToken, CancellationToken) method

```csharp
public static bool operator != (System.Threading.CancellationToken left, System.Threading.CancellationToken right);
```

Determines whether two `CancellationToken` instances are not equal.

Parameters:

- `left`: The first instance.
- `right`: The second instance.

Returns: `true` if the instances are not equal; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: An associated `CancellationTokenSource` has been disposed.

#### Remarks

For the definition of equality, see the `CancellationToken.Equals` method.

## CancellationToken.Register(Action) method

```csharp
public System.Threading.CancellationTokenRegistration Register (Action callback);
```

Registers a delegate that will be called when this `CancellationToken` is canceled.

Parameters:

- `callback`: The delegate to be executed when the `CancellationToken` is canceled.

Returns: The `CancellationTokenRegistration` instance that can be used to unregister the callback.

Exceptions:

- `ObjectDisposedException`: The associated `CancellationTokenSource` has been disposed.
- `ArgumentNullException`: `callback` is null.

#### Remarks
If this token is already in the canceled state, the delegate will be run immediately and synchronously. Any exception the delegate generates will be propagated out of this method call.

The current `ExecutionContext` is captured along with the delegate and will be used when executing it.

The current `SynchronizationContext` is not captured.

## CancellationToken.Register(Action, Boolean) method

```csharp
public System.Threading.CancellationTokenRegistration Register (Action callback, bool useSynchronizationContext);
```

Registers a delegate that will be called when this `CancellationToken` is canceled.

Parameters:

- `callback`: The delegate to be executed when the `CancellationToken` is canceled.
- `useSynchronizationContext`: A value that indicates whether to capture the current `SynchronizationContext` and use it when invoking the `callback`.

Returns: The `CancellationTokenRegistration` instance that can be used to unregister the callback.

Exceptions:

- `ObjectDisposedException`: The associated `CancellationTokenSource` has been disposed.
- `ArgumentNullException`: `callback` is null.

#### Remarks
If this token is already in the canceled state, the delegate will be run immediately and synchronously. Any exception the delegate generates will be propagated out of this method call.

The current `ExecutionContext` is captured along with the delegate and will be used when executing it.

If `useSynchronizationContext` is `true`, the current `SynchronizationContext`, if one exists, is also captured along with the delegate and will be used when executing it. Otherwise, `SynchronizationContext` is not captured.

## CancellationToken.Register(CancellationToken>, Object) method

```csharp
public System.Threading.CancellationTokenRegistration Register (Action<object?,System.Threading.CancellationToken> callback, object? state);
```

Registers a delegate that will be called when this <see cref="<example-value>">CancellationToken</see> is canceled.

Parameters:

- `callback`: The delegate to be executed when the <see cref="<example-value>">CancellationToken</see> is canceled.
- `state`: The state to pass to the `callback` when the delegate is invoked.  This may be `null`.

Returns: The `CancellationTokenRegistration` instance that can be used to unregister the callback.

Exceptions:

- `ArgumentNullException`: `callback` is `null`.

#### Remarks

If this token is already in the canceled state, the delegate will be run immediately and synchronously. Any exception the delegate
generates will be propagated out of this method call. The current `ExecutionContext`, if one exists,
is captured along with the delegate and is used when executing it. The current `SynchronizationContext` is not captured.

## CancellationToken.Register(Object>, Object) method

```csharp
public System.Threading.CancellationTokenRegistration Register (Action<object?> callback, object? state);
```

Registers a delegate that will be called when this `CancellationToken` is canceled.

Parameters:

- `callback`: The delegate to be executed when the `CancellationToken` is canceled.
- `state`: The state to pass to the `callback` when the delegate is invoked. This may be null.

Returns: The `CancellationTokenRegistration` instance that can be used to unregister the callback.

Exceptions:

- `ObjectDisposedException`: The associated `CancellationTokenSource` has been disposed.
- `ArgumentNullException`: `callback` is null.

#### Remarks
If this token is already in the canceled state, the delegate will be run immediately and synchronously. Any exception the delegate generates will be propagated out of this method call.

The current `ExecutionContext` is captured along with the delegate and will be used when executing it.

The current `SynchronizationContext` is not captured.
