---
title: "CancellationTokenSource class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/CancellationTokenSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CancellationTokenSource class (part 2 of 2)

## CancellationTokenSource.CreateLinkedTokenSource(CancellationToken>) method

```csharp
public static System.Threading.CancellationTokenSource CreateLinkedTokenSource (scoped ReadOnlySpan<System.Threading.CancellationToken> tokens);
```

Creates a `CancellationTokenSource` that will be in the canceled state when any of the source tokens are in the canceled state.

Parameters:

- `tokens`: The <see cref="<example-value>">CancellationToken</see> instances to observe.

Returns: A `CancellationTokenSource` that is linked to the source tokens.

To be added.

## CancellationTokenSource.CreateLinkedTokenSource(CancellationToken) method

```csharp
public static System.Threading.CancellationTokenSource CreateLinkedTokenSource (System.Threading.CancellationToken token);
```

Creates a `CancellationTokenSource` that will be in the canceled state when the supplied token is in the canceled state.

Parameters:

- `token`: The cancellation token to observe.

Returns: An object that's linked to the source token.

To be added.

## CancellationTokenSource.CreateLinkedTokenSource(CancellationToken[]) method

```csharp
public static System.Threading.CancellationTokenSource CreateLinkedTokenSource (params System.Threading.CancellationToken[] tokens);
```

Creates a `CancellationTokenSource` that will be in the canceled state when any of the source tokens in the specified array are in the canceled state.

Parameters:

- `tokens`: An array that contains the cancellation token <example-value> to observe.

Returns: A `CancellationTokenSource` that is linked to the source tokens.

Exceptions:

- `ObjectDisposedException`: A `CancellationTokenSource` associated with one of the source tokens has been disposed.
- `ArgumentNullException`: `tokens` is `null`.
- `ArgumentException`: `tokens` is empty.

To be added.

## CancellationTokenSource.CreateLinkedTokenSource(CancellationToken, CancellationToken) method

```csharp
public static System.Threading.CancellationTokenSource CreateLinkedTokenSource (System.Threading.CancellationToken <example-value>, System.Threading.CancellationToken <example-value>);
```

Creates a `CancellationTokenSource` that will be in the canceled state when any of the source tokens are in the canceled state.

Parameters:

- `token1`: The first cancellation token to observe.
- `token2`: The second cancellation token to observe.

Returns: A `CancellationTokenSource` that is linked to the source tokens.

Exceptions:

- `ObjectDisposedException`: A `CancellationTokenSource` associated with one of the source tokens has been disposed.

To be added.

## CancellationTokenSource.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `CancellationTokenSource` class.

#### Remarks
Call `Dispose` when you are finished using the `CancellationTokenSource`. The `Dispose` method leaves the `CancellationTokenSource` in an unusable state. After calling `Dispose`, you must release all references to the `CancellationTokenSource` so the garbage collector can reclaim the memory that the `CancellationTokenSource` was occupying.

Note that calling `Dispose` does not communicate a request for cancellation to consumers of the associated `CancellationTokenSource.Token`. You can communicate a request for cancellation by calling methods such as `CancellationTokenSource.Cancel` or `CancellationTokenSource.CancelAfter`.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
> Always call `Dispose` before you release your last reference to the `CancellationTokenSource`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `CancellationTokenSource` object's `Finalize` method.

## CancellationTokenSource.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `CancellationTokenSource` class and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## CancellationTokenSource.TryReset() method

```csharp
public bool TryReset ();
```

Attempts to reset the `CancellationTokenSource` to be used for an unrelated operation.

Returns: `true` if the `CancellationTokenSource` has not had cancellation requested and could have its state reset to be reused for a subsequent operation; otherwise, `false`.

#### Remarks

`TryReset` is intended to be used by the sole owner of the `CancellationTokenSource`
when it is known that:

- The operation with which the `CancellationTokenSource` was used has completed.
- No-one else will attempt to cancel it.
- Any remaining registrations are erroneous.

Upon a successful reset, such registrations will no longer be notified for any subsequent cancellation of the
`CancellationTokenSource`; however, if any component still holds a reference to this
`CancellationTokenSource` either directly or indirectly via a `CancellationToken`
handed out from it, polling via their reference will show the current state any time after the reset as
it's the same instance.  Usage of `TryReset` concurrently with requesting cancellation is not
thread-safe and may result in `TryReset` returning `true` even if cancellation was already requested. Also, it may result
in registrations not being invoked as part of the concurrent cancellation request.
