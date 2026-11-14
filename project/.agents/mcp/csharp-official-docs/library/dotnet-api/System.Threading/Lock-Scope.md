---
title: "Lock+Scope struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Lock+Scope.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Lock+Scope struct

Namespace: `System.Threading`

```csharp
public ref struct Lock.Scope
```

Represents a `Lock` that might have been entered.

#### Remarks

This type is intended to be used with the `Lock.EnterScope` method, which returns a `Scope` representing the lock that was entered, and with a language construct that automatically disposes the `Scope`, such as the C# `using` keyword. Disposing the `Scope` exits the lock. Ensure that `Scope.Dispose` is called even in case of exceptions.

For more information, see `Lock.EnterScope` and the Remarks for `Lock`.

## Lock+Scope.Dispose() method

```csharp
public void Dispose ();
```

Exits the lock if the `Scope` represents a lock that was entered.

Exceptions:

- `SynchronizationLockException`: The `Scope` represents a lock that was entered and the current thread does not hold the lock.

#### Remarks

If the current thread holds the lock multiple times, such as recursively, the lock is exited only once. The current thread should ensure that each `Lock.EnterScope` is matched with a `Scope.Dispose` on the `Scope` returned by `EnterScope`.

For more information, see the Remarks for `Scope`.
