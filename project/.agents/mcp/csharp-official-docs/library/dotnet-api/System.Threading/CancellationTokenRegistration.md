---
title: "CancellationTokenRegistration struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/CancellationTokenRegistration.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CancellationTokenRegistration struct

Namespace: `System.Threading`

```csharp
public readonly struct CancellationTokenRegistration : IAsyncDisposable, IDisposable, IEquatable<System.Threading.CancellationTokenRegistration>
```

Represents a callback delegate that has been registered with a `CancellationToken`.

#### Remarks
The callback is called when the token is canceled. To unregister a callback, dispose the corresponding Registration instance. For more information and code examples see Cancellation in Managed Threads.

## CancellationTokenRegistration.Token <example-value>

```csharp
public System.Threading.CancellationToken Token { get; }
```

Gets the `CancellationToken` with which this registration is associated.

Returns: The cancellation token with which this registration is associated, or a default token if the
registration isn't associated with a token.

If the `CancellationTokenRegistration` was created by registering with a `CancellationToken` that already
had cancellation requested, the registration may not be associated with the token, in which case this property may return a default token.

## CancellationTokenRegistration.Dispose() method

```csharp
public void Dispose ();
```

Disposes of the registration and unregisters the target callback from the associated `CancellationToken`.

#### Remarks
`Dispose` returns once the associated callback is unregistered without having executed or once it's finished executing, except in the degenerate case where the callback is unregistering itself.

## CancellationTokenRegistration.DisposeAsync() method

```csharp
public System.Threading.Tasks.ValueTask DisposeAsync ();
```

Disposes of the registration and unregisters the target callback from the associated
`CancellationToken`.

Returns: A task that represents the asynchronous dispose operation.

The returned `ValueTask` completes once the associated callback is unregistered without having executed or once it's finished executing, except in the degenerate case where the callback is unregistering itself.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Dispose`.

## CancellationTokenRegistration.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the current `CancellationTokenRegistration` instance is equal to the specified `CancellationTokenRegistration`.

Parameters:

- `obj`: The other object to which to compare this instance.

Returns: `true` if both this and `obj` are equal. False, otherwise.

Two `CancellationTokenRegistration` instances are equal if they both refer to the output of a single call to the same Register method of a `CancellationToken`.

To be added.

## CancellationTokenRegistration.Equals(CancellationTokenRegistration) method

```csharp
public bool Equals (System.Threading.CancellationTokenRegistration other);
```

Determines whether the current `CancellationTokenRegistration` instance is equal to the specified `CancellationTokenRegistration`.

Parameters:

- `other`: The other `CancellationTokenRegistration` to which to compare this instance.

Returns: `true` if both this and `other` are equal. False, otherwise.

Two `CancellationTokenRegistration` instances are equal if they both refer to the output of a single call to the same Register method of a `CancellationToken`.

To be added.

## CancellationTokenRegistration.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for a `CancellationTokenRegistration`.

Returns: A hash code for the current `CancellationTokenRegistration` instance.

To be added.

## CancellationTokenRegistration.op_Equality(CancellationTokenRegistration, CancellationTokenRegistration) method

```csharp
public static bool operator == (System.Threading.CancellationTokenRegistration left, System.Threading.CancellationTokenRegistration right);
```

Determines whether two `CancellationTokenRegistration` instances are equal.

Parameters:

- `left`: The first instance.
- `right`: The second instance.

Returns: `true` if the instances are equal; otherwise, `false`.

To be added.

## CancellationTokenRegistration.op_Inequality(CancellationTokenRegistration, CancellationTokenRegistration) method

```csharp
public static bool operator != (System.Threading.CancellationTokenRegistration left, System.Threading.CancellationTokenRegistration right);
```

Determines whether two `CancellationTokenRegistration` instances are not equal.

Parameters:

- `left`: The first instance.
- `right`: The second instance.

Returns: `true` if the instances are not equal; otherwise, `false`.

To be added.

## CancellationTokenRegistration.Unregister() method

```csharp
public bool Unregister ();
```

Disposes of the registration and unregisters the target callback from the associated
`CancellationToken`.

Returns: `true` if the method succeeds; otherwise, `false`.

Unlike `Dispose`, if the associated callback is currently executing, `Unregister` does not wait for it to complete before returning.
