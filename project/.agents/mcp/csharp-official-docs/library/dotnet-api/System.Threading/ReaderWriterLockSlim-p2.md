---
title: "ReaderWriterLockSlim class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ReaderWriterLockSlim.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReaderWriterLockSlim class (part 2 of 5)

## ReaderWriterLockSlim.ReaderWriterLockSlim() constructor

```csharp
public ReaderWriterLockSlim ();
```

Initializes a new instance of the `ReaderWriterLockSlim` class with default property values.

#### Remarks
A `ReaderWriterLockSlim` that is initialized with this constructor does not allow recursion. That is, the `RecursionPolicy` property returns `NoRecursion`.

For more information about recursion policy and its effects, see the `LockRecursionPolicy` enumeration and the `ReaderWriterLockSlim` class.

#### Examples
The following example shows a simple synchronized cache that holds strings with integer keys. An instance of `ReaderWriterLockSlim` is used to synchronize access to the `Dictionary<T1,T2>` that serves as the inner cache. The parameterless constructor is used to create the lock.

The example includes simple methods to add to the cache, delete from the cache, and read from the cache. To demonstrate time-outs, the example includes a method that adds to the cache only if it can do so within a specified time-out.

To demonstrate upgradeable mode, the example includes a method that retrieves the value associated with a key and compares it with a new value. If the value is unchanged, the method returns a status indicating no change. If no value is found for the key, the key/value pair is inserted. If the value has changed, it is updated. Upgradeable mode allows the thread to upgrade from read access to write access as needed, without the risk of deadlocks.

The example includes a nested enumeration that specifies the return values for the method that demonstrates upgradeable mode.

The example uses the parameterless constructor to create the lock, so recursion is not allowed. Programming the `ReaderWriterLockSlim` is simpler and less prone to error when the lock does not allow recursion.

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/classexample1.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/classexample1.cs._

The following code then uses the `SynchronizedCache` object to store a dictionary of vegetable names. It creates three tasks. The first writes the names of vegetables stored in an array to a `SynchronizedCache` instance. The second and third task display the names of the vegetables, the first in ascending order (from low index to high index), the second in descending order. The final task searches for the string "cucumber" and, when it finds it, calls the `ReaderWriterLockSlim.EnterUpgradeableReadLock` method  to substitute the string "green bean".

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/classexample1.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/classexample1.cs._

## ReaderWriterLockSlim.ReaderWriterLockSlim(LockRecursionPolicy) constructor

```csharp
public ReaderWriterLockSlim (System.Threading.LockRecursionPolicy recursionPolicy);
```

Initializes a new instance of the `ReaderWriterLockSlim` class, specifying the lock recursion policy.

Parameters:

- `recursionPolicy`: One of the enumeration values that specifies the lock recursion policy.

#### Remarks
Recursion policy determines the restrictions on threads that enter the lock more than once. For example, if a lock was created with `NoRecursion` and a thread has entered the lock in read mode, `LockRecursionException` is thrown if the thread tries to reenter the lock in read mode. Similarly, if a thread has entered the lock in write mode, `LockRecursionException` is thrown if the thread tries to reenter the lock in any mode.

> **Note:**
> A thread in upgradeable mode can upgrade to write mode or downgrade to read mode regardless of the lock recursion policy setting.

Regardless of recursion policy, a thread that initially entered read mode is not allowed to upgrade to upgradeable mode or write mode, because that pattern creates a strong probability of deadlocks.

For more information about recursion policy and its effects, see the `LockRecursionPolicy` enumeration and the `ReaderWriterLockSlim` class.

#### Examples
The following example shows two exception scenarios, one that depends on the `LockRecursionPolicy` setting and one that does not.

In the first scenario, the thread enters read mode and then tries to enter read mode recursively. If the `ReaderWriterLockSlim` is created by using the parameterless constructor, which sets recursion policy to `NoRecursion`, an exception is thrown. If `SupportsRecursion` is used to create the `ReaderWriterLockSlim`, no exception is thrown.

In the second scenario, the thread enters read mode and then tries to enter write mode. `LockRecursionException` is thrown regardless of the lock recursion policy.

_Code sample not included: ~/snippets/csharp/System.Threading/LockRecursionPolicy/Overview/ClassExample1.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockRecursionPolicy/Overview/ClassExample1.cs._

The following code then uses the `SynchronizedCache` object to store a dictionary of vegetable names. It creates three tasks. The first writes the names of vegetables stored in an array to a `SynchronizedCache` instance. The second and third task display the names of the vegetables, the first in ascending order (from low index to high index), the second in descending order. The final task searches for the string "cucumber" and, when it finds it, calls the `ReaderWriterLockSlim.EnterUpgradeableReadLock` method  to substitute the string "green bean".

_Code sample not included: ~/snippets/csharp/System.Threading/LockRecursionPolicy/Overview/ClassExample1.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockRecursionPolicy/Overview/ClassExample1.cs._

## ReaderWriterLockSlim.CurrentReadCount property

```csharp
public int CurrentReadCount { get; }
```

Gets the total number of unique threads that have entered the lock in read mode.

Returns: The number of unique threads that have entered the lock in read mode.

#### Remarks
A thread is counted only once, even if the lock allows recursion and the thread has entered read mode multiple times.

Use this property only for debugging, profiling, and logging purposes, and not to control the behavior of an algorithm. The results can change as soon as they have been calculated. Therefore, it is not safe to make decisions based on this property.

#### Examples
The following example shows how to use the `CurrentReadCount` property to generate an event log entry if the number of threads in read mode exceeds a threshold.

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/CurrentReadCount/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/CurrentReadCount/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/CurrentReadCount/source.cs._

## ReaderWriterLockSlim.IsReadLockHeld property

```csharp
public bool IsReadLockHeld { get; }
```

Gets a value that indicates whether the current thread has entered the lock in read mode.

Returns: `true` if the current thread has entered read mode; otherwise, `false`.

#### Remarks
This property is intended for use in asserts or for other debugging purposes. Do not use it to control the flow of program execution.

#### Examples
The following example shows how to use the `IsReadLockHeld` property to generate an assert if the current thread has entered read mode unexpectedly.

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/CurrentReadCount/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/CurrentReadCount/source.cs._

## ReaderWriterLockSlim.IsUpgradeableReadLockHeld property

```csharp
public bool IsUpgradeableReadLockHeld { get; }
```

Gets a value that indicates whether the current thread has entered the lock in upgradeable mode.

Returns: `true` if the current thread has entered upgradeable mode; otherwise, `false`.

#### Remarks
This property is intended for use in asserts or for other debugging purposes. Do not use it to control the flow of program execution.

#### Examples
The following example shows how to use the `IsUpgradeableReadLockHeld` property to generate an assert if the current thread has entered upgradeable mode unexpectedly.

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/CurrentReadCount/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/CurrentReadCount/source.cs._

## ReaderWriterLockSlim.IsWriteLockHeld property

```csharp
public bool IsWriteLockHeld { get; }
```

Gets a value that indicates whether the current thread has entered the lock in write mode.

Returns: `true` if the current thread has entered write mode; otherwise, `false`.

#### Remarks
This property is intended for use in asserts or for other debugging purposes. Do not use it to control the flow of program execution.

#### Examples
The following example shows how to use the `IsWriteLockHeld` property to generate an assert if the current thread has entered write mode unexpectedly.

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/CurrentReadCount/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/CurrentReadCount/source.cs._

## ReaderWriterLockSlim.RecursionPolicy property

```csharp
public System.Threading.LockRecursionPolicy RecursionPolicy { get; }
```

Gets a value that indicates the recursion policy for the current `ReaderWriterLockSlim` object.

Returns: One of the enumeration values that specifies the lock recursion policy.

#### Remarks
Recursion policy determines the restrictions on threads that enter the lock more than once. For example, if a lock was created with `NoRecursion` and a thread has entered the lock in read mode, `LockRecursionException` is thrown if the thread tries to reenter the lock in read mode.

> **Note:**
> A thread in upgradeable mode can upgrade to write mode or downgrade to read mode regardless of the lock recursion policy setting.

Regardless of recursion policy, a thread that initially entered read mode is not allowed to upgrade to upgradeable mode or write mode, because that pattern creates a strong probability of deadlocks.

For more information about recursion policy and its effects, see the `LockRecursionPolicy` enumeration and the `ReaderWriterLockSlim` class.

## ReaderWriterLockSlim.RecursiveReadCount property

```csharp
public int RecursiveReadCount { get; }
```

Gets the number of times the current thread has entered the lock in read mode, as an indication of recursion.

Returns: 0 (zero) if the current thread has not entered read mode, 1 if the thread has entered read mode but has not entered it recursively, or *n* if the thread has entered the lock recursively *n* - 1 times.

#### Remarks
Use this property only for debugging, profiling, and logging purposes, and not to control the behavior of an algorithm. The results can change as soon as they have been calculated. Therefore, it is not safe to make decisions based on this property.

## ReaderWriterLockSlim.RecursiveUpgradeCount property

```csharp
public int RecursiveUpgradeCount { get; }
```

Gets the number of times the current thread has entered the lock in upgradeable mode, as an indication of recursion.

Returns: 0 if the current thread has not entered upgradeable mode, 1 if the thread has entered upgradeable mode but has not entered it recursively, or *n* if the thread has entered upgradeable mode recursively *n* - 1 times.

#### Remarks
Use this property only for debugging, profiling, and logging purposes, and not to control the behavior of an algorithm. The results can change as soon as they have been calculated. Therefore, it is not safe to make decisions based on this property.

## ReaderWriterLockSlim.RecursiveWriteCount property

```csharp
public int RecursiveWriteCount { get; }
```

Gets the number of times the current thread has entered the lock in write mode, as an indication of recursion.

Returns: 0 if the current thread has not entered write mode, 1 if the thread has entered write mode but has not entered it recursively, or *n* if the thread has entered write mode recursively *n* - 1 times.

#### Remarks
Use this property only for debugging, profiling, and logging purposes, and not to control the behavior of an algorithm. The results can change as soon as they have been calculated. Therefore, it is not safe to make decisions based on this property.

## ReaderWriterLockSlim.WaitingReadCount property

```csharp
public int WaitingReadCount { get; }
```

Gets the total number of threads that are waiting to enter the lock in read mode.

Returns: The total number of threads that are waiting to enter read mode.

#### Remarks
Use this property only for debugging, profiling, and logging purposes, and not to control the behavior of an algorithm. The results can change as soon as they have been calculated. Therefore, it is not safe to make decisions based on this property.

#### Examples
The following example shows how to use the `WaitingReadCount` property to generate an event log entry if the number of threads that are blocked, waiting to enter read mode, exceeds a threshold.

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/CurrentReadCount/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/CurrentReadCount/source.cs._

## ReaderWriterLockSlim.WaitingUpgradeCount property

```csharp
public int WaitingUpgradeCount { get; }
```

Gets the total number of threads that are waiting to enter the lock in upgradeable mode.

Returns: The total number of threads that are waiting to enter upgradeable mode.

#### Remarks
Use this property only for debugging, profiling, and logging purposes, and not to control the behavior of an algorithm. The results can change as soon as they have been calculated. Therefore, it is not safe to make decisions based on this property.

#### Examples
The following example shows how to use the `WaitingUpgradeCount` property to generate an event log entry if the number of threads that are blocked, waiting to enter upgradeable mode, exceeds a threshold.

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/CurrentReadCount/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/CurrentReadCount/source.cs._
