---
title: "Timeout class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Timeout.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Timeout class

Namespace: `System.Threading`

```csharp
public static class Timeout
```

Contains constants that specify infinite time-out intervals. This class cannot be inherited.

#### Remarks
The members of this class are used to specify infinite time-out intervals in threading operations. `Infinite` is used by methods that accept an integer `millisecondsTimeout` parameter, such as `Sleep`, `Join`, and `AcquireReaderLock`. `InfiniteTimeSpan` is used by methods that accept a `timeout` parameter of type `TimeSpan`, such as `Sleep`, `Join`, and `AcquireReaderLock`.

#### Examples
The following example shows a thread going to sleep for an infinite time and subsequently being woken up.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Interrupt/source.cs._

## Timeout.Infinite field

```csharp
public const int Infinite = -1;
```

A constant used to specify an infinite waiting period, for threading methods that accept an `Int32` parameter.

#### Remarks
For threading methods that accept a `millisecondsTimeout` parameter, such as `Sleep` and `Join`, this value is used to suspend the thread indefinitely. However, in most cases, we recommend that you use other `Threading` classes, such as `Mutex`, `Monitor`, `EventWaitHandle`, or `Semaphore` instead, to synchronize threads or manage resources.

The value of this field is -1 (0xFFFFFFFF).

## Timeout.InfiniteTimeSpan field

```csharp
public static readonly TimeSpan InfiniteTimeSpan;
```

A constant used to specify an infinite waiting period, for methods that accept a `TimeSpan` parameter.

#### Remarks
For threading methods that accept a `timeout` parameter of type `TimeSpan`, such as `Sleep` and `Join`, this value is used to suspend the thread indefinitely. However, in most cases, we recommend that you use other `Threading` classes, such as `Mutex`, `Monitor`, `EventWaitHandle`, or `Semaphore` instead, to synchronize threads or manage resources.

The value of this field is -00:00:00.0010000, or -1 millisecond.
