---
title: "PosixSignalRegistration class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/PosixSignalRegistration.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PosixSignalRegistration class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class PosixSignalRegistration : IDisposable
```

Handles a `PosixSignal`.

To be added.

## PosixSignalRegistration.Create(PosixSignal, PosixSignalContext>) method

```csharp
public static System.Runtime.InteropServices.PosixSignalRegistration Create (System.Runtime.InteropServices.PosixSignal signal, Action<System.Runtime.InteropServices.PosixSignalContext> handler);
```

Registers a `handler` that is invoked when the `signal` occurs.

Parameters:

- `signal`: The signal to register for.
- `handler`: The handler that gets invoked.

Returns: A `PosixSignalRegistration` instance that can be disposed to unregister the handler.

Exceptions:

- `ArgumentNullException`: `handler` is `null`.
- `PlatformNotSupportedException`: `signal` is not supported by the platform.
- `IOException`: An error occurred while setting up the signal handling or while installing the handler for the specified signal.

#### Remarks

Raw values can be provided for `signal` on Unix by casting them to `PosixSignal`.
Default handling of the signal can be canceled through `Cancel`.
`SIGINT` and `SIGQUIT` can be canceled on both
Windows and on Unix platforms; `SIGTERM` can only be canceled on Unix.
On Unix, terminal configuration can be canceled for `SIGCHLD` and `SIGCONT`.
In .NET 10 and later versions, the handlers are executed in reverse order of their registration.

## PosixSignalRegistration.Dispose() method

```csharp
public void Dispose ();
```

Unregisters the handler.

To be added.

## PosixSignalRegistration.Finalize() method

```csharp
~PosixSignalRegistration ();
```

Unregisters the handler.

To be added.
