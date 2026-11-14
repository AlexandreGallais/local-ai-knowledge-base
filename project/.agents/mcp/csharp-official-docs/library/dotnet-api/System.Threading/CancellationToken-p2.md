---
title: "CancellationToken <example-value> (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/CancellationToken.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CancellationToken <example-value> (part 2 of 2)

## CancellationToken.Register(Object>, Object, Boolean) method

```csharp
public System.Threading.CancellationTokenRegistration Register (Action<object?> callback, object? state, bool useSynchronizationContext);
```

Registers a delegate that will be called when this `CancellationToken` is canceled.

Parameters:

- `callback`: The delegate to be executed when the `CancellationToken` is canceled.
- `state`: The state to pass to the `callback` when the delegate is invoked. This may be null.
- `useSynchronizationContext`: A Boolean value that indicates whether to capture the current `SynchronizationContext` and use it when invoking the `callback`.

Returns: The `CancellationTokenRegistration` instance that can be used to unregister the callback.

Exceptions:

- `ObjectDisposedException`: The associated `CancellationTokenSource` has been disposed.
- `ArgumentNullException`: `callback` is null.

#### Remarks
If this token is already in the canceled state, the delegate will be run immediately and synchronously. Any exception the delegate generates will be propagated out of this method call.

The current `ExecutionContext` is captured along with the delegate and will be used when executing it.

If `useSynchronizationContext` is `true`, the current `SynchronizationContext`, if one exists, is also captured along with the delegate and will be used when executing it. Otherwise, `SynchronizationContext` is not captured.

## CancellationToken.ThrowIfCancellationRequested() method

```csharp
public void ThrowIfCancellationRequested ();
```

Throws a `OperationCanceledException` if this token has had cancellation requested.

Exceptions:

- `OperationCanceledException`: The token has had cancellation requested.

#### Remarks
This method provides functionality equivalent to:

C#

```csharp
if (token.IsCancellationRequested)
    throw new OperationCanceledException(token);
```

```vb
If token.IsCancellationRequested Then
    Throw New OperationCanceledException(token)
End If
```

## CancellationToken.UnsafeRegister(CancellationToken>, Object) method

```csharp
public System.Threading.CancellationTokenRegistration UnsafeRegister (Action<object?,System.Threading.CancellationToken> callback, object? state);
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
generates is propagated out of this method call. `ExecutionContext` is not captured or flowed to the callback's invocation.

## CancellationToken.UnsafeRegister(Object>, Object) method

```csharp
public System.Threading.CancellationTokenRegistration UnsafeRegister (Action<object?> callback, object? state);
```

Registers a delegate that is called when this `CancellationToken` is canceled.

Parameters:

- `callback`: The delegate to execute when the `CancellationToken` is canceled.
- `state`: The state to pass to the `callback` when the delegate is invoked.  This may be `null`.

Returns: An object that can
be used to unregister the callback.

Exceptions:

- `ArgumentNullException`: `callback` is null.

If this token is already in the canceled state, the delegate is run immediately and synchronously.
Any exception the delegate generates is propagated out of this method call.

The  `ExecutionContext` is not captured or flowed
to the callback's invocation.
