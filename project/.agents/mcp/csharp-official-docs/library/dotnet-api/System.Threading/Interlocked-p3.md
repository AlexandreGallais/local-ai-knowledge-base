---
title: "Interlocked class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Interlocked.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Interlocked class (part 3 of 3)

## Interlocked.Exchange(IntPtr, IntPtr) method

```csharp
public static IntPtr Exchange (ref IntPtr location1, IntPtr value);
```

Sets a native-sized signed integer to a specified value and returns the original value, as an atomic operation.

Parameters:

- `location1`: The variable to set to the specified value.
- `value`: The value to which the `location1` parameter is set.

Returns: The original value of `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.Exchange(Object, Object) method

```csharp
public static object? Exchange (ref object? location1, object? value);
```

Sets an object to a specified value and returns a reference to the original object, as an atomic operation.

Parameters:

- `location1`: The variable to set to the specified value.
- `value`: The value to which the `location1` parameter is set.

Returns: The original value of `location1`.

Exceptions:

- `ArgumentNullException`: The address of `location1` is a `null` pointer.
- `NullReferenceException`: The address of `location1` is a `null` pointer.

#### Remarks

> **Important:**
> The `Exchange<T>` method overload provides a generic alternative that can be used for concrete reference types.

## Interlocked.Exchange(SByte, SByte) method

```csharp
public static sbyte Exchange (ref sbyte location1, sbyte value);
```

Sets a 8-bit signed integer to a specified value and returns the original value, as an atomic operation.

Parameters:

- `location1`: The variable to set to the specified value.
- `value`: The value to which the `location1` parameter is set.

Returns: The original value of `location1`.

Exceptions:

- `NullReferenceException`: The address of location1 is a `null` pointer.

To be added.

## Interlocked.Exchange(Single, Single) method

```csharp
public static float Exchange (ref float location1, float value);
```

Sets a single-precision floating point number to a specified value and returns the original value, as an atomic operation.

Parameters:

- `location1`: The variable to set to the specified value.
- `value`: The value to which the `location1` parameter is set.

Returns: The original value of `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.Exchange(UInt16, UInt16) method

```csharp
public static ushort Exchange (ref ushort location1, ushort value);
```

Sets a 16-bit signed integer to a specified value and returns the original value, as an atomic operation.

Parameters:

- `location1`: The variable to set to the specified value.
- `value`: The value to which the `location1` parameter is set.

Returns: The original value of `location1`.

Exceptions:

- `NullReferenceException`: The address of location1 is a `null` pointer.

To be added.

## Interlocked.Exchange(UInt32, UInt32) method

```csharp
public static uint Exchange (ref uint location1, uint value);
```

Sets a 32-bit unsigned integer to a specified value and returns the original value, as an atomic operation.

Parameters:

- `location1`: The variable to set to the specified value.
- `value`: The value to which the `location1` parameter is set.

Returns: The original value of `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.Exchange(UInt64, UInt64) method

```csharp
public static ulong Exchange (ref ulong location1, ulong value);
```

Sets a 64-bit unsigned integer to a specified value and returns the original value, as an atomic operation.

Parameters:

- `location1`: The variable to set to the specified value.
- `value`: The value to which the `location1` parameter is set.

Returns: The original value of `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.Exchange(UIntPtr, UIntPtr) method

```csharp
public static UIntPtr Exchange (ref UIntPtr location1, UIntPtr value);
```

Sets a native-sized unsigned integer to a specified value and returns the original value, as an atomic operation.

Parameters:

- `location1`: The variable to set to the specified value.
- `value`: The value to which the `location1` parameter is set.

Returns: The original value of `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.Exchange<T>(T, T) method

```csharp
public static T Exchange<T> (ref T location1, T value);
```

Sets a variable of the specified type `T` to a specified value and returns the original value, as an atomic operation.

Parameters:

- `T`: The type to be used for `location1` and `value`.
- `location1`: The variable to set to the specified value. This is a reference parameter (`ref` in C#, `ByRef` in Visual Basic).
- `value`: The value to which the `location1` parameter is set.

Returns: The original value of `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.
- `NotSupportedException`: An unsupported `T` is specified. On .NET 8 and earlier versions, `T` must be a reference type. On .NET 9 and later versions, `T` must be a reference, primitive, or enum type.

To be added.

## Interlocked.Increment(Int32) method

```csharp
public static int Increment (ref int location);
```

Increments a specified variable and stores the result, as an atomic operation.

Parameters:

- `location`: The variable whose value is to be incremented.

Returns: The value of the variable immediately after the increment operation finished.

Exceptions:

- `NullReferenceException`: The address of `location` is a `null` pointer.

#### Remarks
This method handles an overflow condition by wrapping: if `location` = `MaxValue`, `location` + 1 = `MinValue`. No exception is thrown.

#### Examples
The following example determines how many random numbers that range from 0 to 1,000 are required to generate 1,000 random numbers with a midpoint value. To keep track of the number of midpoint values, a variable, `midpointCount`, is set equal to 0 and incremented each time the random number generator returns a midpoint value until it reaches 10,000. Because three threads generate the random numbers, the `Increment` method is called to ensure that multiple threads don't update `midpointCount` concurrently. Note that a lock is also used to protect the random number generator, and that a `CountdownEvent` object is used to ensure that the `Main` method doesn't finish execution before the three threads.

_Code sample not included: ~/snippets/csharp/System.Threading/Interlocked/Increment/increment3.cs._

The following example is similar to the previous one, except that it uses the `Task` class instead of a thread procedure to generate 50,000 random midpoint integers. In this example, a lambda expression replaces the `GenerateNumbers` thread procedure, and the call to the `Task.WaitAll` method eliminates the need for the `CountdownEvent` object.

_Code sample not included: ~/snippets/csharp/System.Threading/Interlocked/Increment/increment4.cs._

## Interlocked.Increment(Int64) method

```csharp
public static long Increment (ref long location);
```

Increments a specified variable and stores the result, as an atomic operation.

Parameters:

- `location`: The variable whose value is to be incremented.

Returns: The value of the variable immediately after the increment operation finished.

Exceptions:

- `NullReferenceException`: The address of `location` is a `null` pointer.

#### Remarks
This method handles an overflow condition by wrapping: if `location` = `MaxValue`, `location` + 1 = `MinValue`. No exception is thrown.

## Interlocked.Increment(UInt32) method

```csharp
public static uint Increment (ref uint location);
```

Increments a specified variable and stores the result, as an atomic operation.

Parameters:

- `location`: The variable whose value is to be incremented.

Returns: The value of the variable immediately after the increment operation finished.

Exceptions:

- `NullReferenceException`: The address of `location` is a `null` pointer.

To be added.

## Interlocked.Increment(UInt64) method

```csharp
public static ulong Increment (ref ulong location);
```

Increments a specified variable and stores the result, as an atomic operation.

Parameters:

- `location`: The variable whose value is to be incremented.

Returns: The value of the variable immediately after the increment operation finished.

Exceptions:

- `NullReferenceException`: The address of `location` is a `null` pointer.

To be added.

## Interlocked.MemoryBarrier() method

```csharp
public static void MemoryBarrier ();
```

Synchronizes memory access as follows: The processor that executes the current thread cannot reorder instructions in such a way that memory accesses before the call to `Interlocked.MemoryBarrier` execute after memory accesses that follow the call to `Interlocked.MemoryBarrier`.

#### Remarks
This method is a wrapper for the `Thread.MemoryBarrier` method.

For most purposes, the C# `lock` statement, the Visual Basic `SyncLock` statement, or the `Monitor` class provide easier ways to synchronize data.

## Interlocked.MemoryBarrierProcessWide() method

```csharp
public static void MemoryBarrierProcessWide ();
```

Provides a process-wide memory barrier that ensures that reads and writes from any CPU cannot move across the barrier.

The `MemoryBarrierProcessWide` method differs from the "normal" `Interlocked.MemoryBarrier` method as follows:

- The normal memory barrier ensures that the reads and writes from the current CPU can't move across the barrier. The process-wide memory barrier ensures that any read or write from any CPU being used in the process can't move across the barrier.

- The normal memory barrier allows reasonable shared access if *every* thread accessing the data uses barriers. The process-wide memory barrier forces *other CPUs* to synchronize with process memory (for example, to flush write buffers and synchronize read buffers). This allows for non-interlocked operations on some threads and still have reasonable shared access.

- The normal memory barrier imposes very little overhead; normal interlocked operations probably cost fewer than a hundred cycles. The process-wide memory barrier is very expensive. It has to force every CPU in the process do to something, at a probable cost of thousands of cycles.

The `MemoryBarrierProcessWide` method also suffers from all the subtleties of lock-free programming. Nevertheless, this method can be extremely useful when you actually need to call it, which should be rare.

This method wraps a call to FlushProcessWriteBuffers on Windows and `sys_membarrier` on Linux.

## Interlocked.Or(Int32, Int32) method

```csharp
public static int Or (ref int location1, int value);
```

Bitwise "ors" two 32-bit signed integers and replaces the first integer with the result, as an atomic operation.

Parameters:

- `location1`: A variable containing the first value to be combined. The result is stored in `location1`.
- `value`: The value to be combined with the integer at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.Or(Int64, Int64) method

```csharp
public static long Or (ref long location1, long value);
```

Bitwise "ors" two 64-bit signed integers and replaces the first integer with the result, as an atomic operation.

Parameters:

- `location1`: A variable containing the first value to be combined. The result is stored in `location1`.
- `value`: The value to be combined with the integer at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.Or(UInt32, UInt32) method

```csharp
public static uint Or (ref uint location1, uint value);
```

Bitwise "ors" two 32-bit unsigned integers and replaces the first integer with the result, as an atomic operation.

Parameters:

- `location1`: A variable containing the first value to be combined. The result is stored in `location1`.
- `value`: The value to be combined with the integer at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.Or(UInt64, UInt64) method

```csharp
public static ulong Or (ref ulong location1, ulong value);
```

Bitwise "ors" two 64-bit unsigned integers and replaces the first integer with the result, as an atomic operation.

Parameters:

- `location1`: A variable containing the first value to be combined. The result is stored in `location1`.
- `value`: The value to be combined with the integer at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.Or<T>(T, T) method

```csharp
public static T Or<T> (ref T location1, T value) where T : struct;
```

To be added.

Parameters:

- `T`: To be added.
- `location1`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Interlocked.Read(Int64) method

```csharp
public static long Read (ref readonly long location);
```

Returns a 64-bit value, loaded as an atomic operation.

Parameters:

- `location`: The 64-bit value to be loaded.

Returns: The loaded value.

#### Remarks
The `Interlocked.Read` method is unnecessary on 64-bit systems, because 64-bit read operations are already atomic. On 32-bit systems, 64-bit read operations are not atomic unless performed using `Interlocked.Read`.

> **Important:**
> On 32-bit platforms, despite taking a readonly reference parameter, this method requires write access to the memory location because it uses `Interlocked.CompareExchange` internally to ensure atomicity. Attempting to read from read-only memory (such as memory-mapped files opened with read-only access) can result in an `AccessViolationException`.

## Interlocked.Read(UInt64) method

```csharp
public static ulong Read (ref readonly ulong location);
```

Returns a 64-bit unsigned value, loaded as an atomic operation.

Parameters:

- `location`: The 64-bit value to be loaded.

Returns: The loaded value.

#### Remarks
The `Interlocked.Read` method is unnecessary on 64-bit systems, because 64-bit read operations are already atomic. On 32-bit systems, 64-bit read operations are not atomic unless performed using `Interlocked.Read`.

> **Important:**
> On 32-bit platforms, despite taking a readonly reference parameter, this method requires write access to the memory location because it uses `Interlocked.CompareExchange` internally to ensure atomicity. Attempting to read from read-only memory (such as memory-mapped files opened with read-only access) can result in an `AccessViolationException`.
