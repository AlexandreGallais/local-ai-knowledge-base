---
title: "LockRecursionPolicy enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/LockRecursionPolicy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LockRecursionPolicy enum

Namespace: `System.Threading`

```csharp
public enum LockRecursionPolicy
```

Specifies whether a lock can be entered multiple times by the same thread.

#### Remarks
The default recursion policy depends on the type of lock. For the default policy and the precise behavior of lock recursion for any given lock type, see the documentation for the type. For example, the `ReaderWriterLockSlim` class does not allow a thread to enter the lock in write mode if it already entered the lock in read mode, regardless of the lock policy setting, in order to reduce the chance of deadlocks.

Currently only one lock uses this enumeration:

-   `ReaderWriterLockSlim`. For more information, see the `RecursionPolicy` property.

#### Examples
The following example shows two exception scenarios, one that depends on the `LockRecursionPolicy` setting and one that does not.

In the first scenario, the thread enters the lock in read mode and then tries to enter read mode recursively. If the `ReaderWriterLockSlim` is created by using the parameterless constructor, which sets recursion policy to NoRecursion, an exception is thrown. If SupportsRecursion is used to create the `ReaderWriterLockSlim`, no exception is thrown.

In the second scenario, the thread enters the lock in read mode and then tries to enter the lock in write mode. `LockRecursionException` is thrown regardless of the lock recursion policy.

_Code sample not included: ~/snippets/csharp/System.Threading/LockRecursionPolicy/Overview/example1.cs._

## LockRecursionPolicy.NoRecursion field

```csharp
NoRecursion
```

If a thread tries to enter a lock recursively, an exception is thrown. Some classes may allow certain recursions when this setting is in effect.

## LockRecursionPolicy.SupportsRecursion field

```csharp
SupportsRecursion
```

A thread can enter a lock recursively. Some classes may restrict this capability.
