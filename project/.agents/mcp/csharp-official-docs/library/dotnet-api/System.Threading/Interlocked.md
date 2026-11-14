---
title: "Interlocked class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Interlocked.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Interlocked class

Namespace: `System.Threading`

```csharp
public static class Interlocked
```

Provides atomic operations for variables that are shared by multiple threads.

#### Remarks
The methods of this class help protect against errors that can occur when the scheduler switches contexts while a thread is updating a variable that can be accessed by other threads, or when two threads are executing concurrently on separate processors. The members of this class do not throw exceptions.

The `Interlocked.Increment` and `Interlocked.Decrement` methods increment or decrement a variable and store the resulting value in a single operation. On most computers, incrementing a variable is not an atomic operation, requiring the following steps:

1. Load a value from an instance variable into a register.
2. Increment or decrement the value.
3. Store the value in the instance variable.

If you do not use `Interlocked.Increment` and `Interlocked.Decrement`, a thread can be preempted after executing the first two steps. Another thread can then execute all three steps. When the first thread resumes execution, it overwrites the value in the instance variable, and the effect of the increment or decrement performed by the second thread is lost.

The `Interlocked.Add` method atomically adds an integer value to an integer variable and returns the new value of the variable.

The `Interlocked.Exchange` method atomically exchanges the values of the specified variables. The `Interlocked.CompareExchange` method combines two operations: comparing two values and storing a third value in one of the variables, based on the outcome of the comparison. The compare and exchange operations are performed as an atomic operation.

Ensure that any write or read access to a shared variable is atomic. Otherwise, the data might be corrupted or the loaded value might be incorrect.

#### Examples
The following code example shows a thread-safe resource locking mechanism.

_Code sample not included: ~/snippets/csharp/System.Threading/Interlocked/Overview/class1.cs._

## Interlocked.Add(Int32, Int32) method

```csharp
public static int Add (ref int location1, int value);
```

Adds two 32-bit integers and replaces the first integer with the sum, as an atomic operation.

Parameters:

- `location1`: A variable containing the first value to be added. The sum of the two values is stored in `location1`.
- `value`: The value to be added to the integer at `location1`.

Returns: The new value that was stored at `location1` by this operation.

Exceptions:

- `NullReferenceException`: The address of `location1` is a null pointer.

#### Remarks
This method handles an overflow condition by wrapping: if the value at `location1` is `MaxValue` and `value` is 1, the result is `MinValue`; if `value` is 2, the result is (`MinValue` + 1); and so on. No exception is thrown.

## Interlocked.Add(Int64, Int64) method

```csharp
public static long Add (ref long location1, long value);
```

Adds two 64-bit integers and replaces the first integer with the sum, as an atomic operation.

Parameters:

- `location1`: A variable containing the first value to be added. The sum of the two values is stored in `location1`.
- `value`: The value to be added to the integer at `location1`.

Returns: The new value that was stored at `location1` by this operation.

Exceptions:

- `NullReferenceException`: The address of `location1` is a null pointer.

#### Remarks
This method handles an overflow condition by wrapping: if the value at `location1` is `MaxValue` and `value` is 1, the result is `MinValue`; if `value` is 2, the result is (`MinValue` + 1); and so on. No exception is thrown.

## Interlocked.Add(UInt32, UInt32) method

```csharp
public static uint Add (ref uint location1, uint value);
```

Adds two 32-bit unsigned integers and replaces the first integer with the sum, as an atomic operation.

Parameters:

- `location1`: A variable containing the first value to be added. The sum of the two values is stored in `location1`.
- `value`: The value to be added to the integer at `location1`.

Returns: The new value that was stored at `location1` by this operation.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.Add(UInt64, UInt64) method

```csharp
public static ulong Add (ref ulong location1, ulong value);
```

Adds two 64-bit unsigned integers and replaces the first integer with the sum, as an atomic operation.

Parameters:

- `location1`: A variable containing the first value to be added. The sum of the two values is stored in `location1`.
- `value`: The value to be added to the integer at `location1`.

Returns: The new value that was stored at `location1` by this operation.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.And(Int32, Int32) method

```csharp
public static int And (ref int location1, int value);
```

Bitwise "ands" two 32-bit signed integers and replaces the first integer with the result, as an atomic operation.

Parameters:

- `location1`: A variable containing the first value to be combined. The result is stored in `location1`.
- `value`: The value to be combined with the integer at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.And(Int64, Int64) method

```csharp
public static long And (ref long location1, long value);
```

Bitwise "ands" two 64-bit signed integers and replaces the first integer with the result, as an atomic operation.

Parameters:

- `location1`: A variable containing the first value to be combined. The result is stored in `location1`.
- `value`: The value to be combined with the integer at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.And(UInt32, UInt32) method

```csharp
public static uint And (ref uint location1, uint value);
```

Bitwise "ands" two 32-bit unsigned integers and replaces the first integer with the result, as an atomic operation.

Parameters:

- `location1`: A variable containing the first value to be combined. The result is stored in `location1`.
- `value`: The value to be combined with the integer at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.And(UInt64, UInt64) method

```csharp
public static ulong And (ref ulong location1, ulong value);
```

Bitwise "ands" two 64-bit unsigned integers and replaces the first integer with the result, as an atomic operation.

Parameters:

- `location1`: A variable containing the first value to be combined. The result is stored in `location1`.
- `value`: The value to be combined with the integer at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.And<T>(T, T) method

```csharp
public static T And<T> (ref T location1, T value) where T : struct;
```

To be added.

Parameters:

- `T`: To be added.
- `location1`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.

## Interlocked.CompareExchange(Byte, Byte, Byte) method

```csharp
public static byte CompareExchange (ref byte location1, byte value, byte comparand);
```

Compares two 8-bit unsigned integers for equality and, if they are equal, replaces the first value, as an atomic operation.

Parameters:

- `location1`: The destination, whose value is compared with `comparand` and possibly replaced.
- `value`: The value that replaces the destination value if the comparison results in equality.
- `comparand`: The value that is compared to the value at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.CompareExchange(Double, Double, Double) method

```csharp
public static double CompareExchange (ref double location1, double value, double comparand);
```

Compares two double-precision floating point numbers for equality and, if they are equal, replaces the first value, as an atomic operation.

Parameters:

- `location1`: The destination, whose value is compared with `comparand` and possibly replaced.
- `value`: The value that replaces the destination value if the comparison results in equality.
- `comparand`: The value that is compared to the value at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a null pointer.

#### Remarks
If `comparand` and the value in `location1` are equal, then `value` is stored in `location1`. Otherwise, no operation is performed. The compare and exchange operations are performed as an atomic operation. The return value of `Interlocked.CompareExchange` is the original value in `location1`, whether or not the exchange takes place.

#### Examples
The following code example demonstrates a thread-safe method that accumulates a running total of `Double` values. Two threads add a series of `Double` values using the thread-safe method and ordinary addition, and when the threads complete the totals are compared. On a dual-processor computer, there is a significant difference in the totals.

In the thread-safe method, the initial value of the running total is saved, and then the `Interlocked.CompareExchange` method is used to exchange the newly computed total with the old total. If the return value is not equal to the saved value of the running total, then another thread has updated the total in the meantime. In that case, the attempt to update the running total must be repeated.

_Code sample not included: ~/snippets/csharp/System.Threading/Interlocked/CompareExchange/source.cs._

## Interlocked.CompareExchange(Int16, Int16, Int16) method

```csharp
public static short CompareExchange (ref short location1, short value, short comparand);
```

Compares two 16-bit unsigned integers for equality and, if they are equal, replaces the first value, as an atomic operation.

Parameters:

- `location1`: The destination, whose value is compared with `comparand` and possibly replaced.
- `value`: The value that replaces the destination value if the comparison results in equality.
- `comparand`: The value that is compared to the value at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.CompareExchange(Int32, Int32, Int32) method

```csharp
public static int CompareExchange (ref int location1, int value, int comparand);
```

Compares two 32-bit signed integers for equality and, if they are equal, replaces the first value, as an atomic operation.

Parameters:

- `location1`: The destination, whose value is compared with `comparand` and possibly replaced.
- `value`: The value that replaces the destination value if the comparison results in equality.
- `comparand`: The value that is compared to the value at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a null pointer.

#### Remarks
If `comparand` and the value in `location1` are equal, then `value` is stored in `location1`. Otherwise, no operation is performed. The compare and exchange operations are performed as an atomic operation. The return value of `Interlocked.CompareExchange` is the original value in `location1`, whether or not the exchange takes place.

#### Examples
The following code example demonstrates a thread-safe method that accumulates a running total. The initial value of the running total is saved, and then the `Interlocked.CompareExchange` method is used to exchange the newly computed total with the old total. If the return value is not equal to the saved value of the running total, then another thread has updated the total in the meantime. In that case, the attempt to update the running total must be repeated.

> **Note:**
> The `Interlocked.Add` method provides a more convenient way to accumulate thread-safe running totals for integers.

_Code sample not included: ~/snippets/csharp/System.Threading/Interlocked/CompareExchange/source2.cs._

## Interlocked.CompareExchange(Int64, Int64, Int64) method

```csharp
public static long CompareExchange (ref long location1, long value, long comparand);
```

Compares two 64-bit signed integers for equality and, if they are equal, replaces the first value, as an atomic operation.

Parameters:

- `location1`: The destination, whose value is compared with `comparand` and possibly replaced.
- `value`: The value that replaces the destination value if the comparison results in equality.
- `comparand`: The value that is compared to the value at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a null pointer.

#### Remarks
If `comparand` and the value in `location1` are equal, then `value` is stored in `location1`. Otherwise, no operation is performed. The compare and exchange operations are performed as an atomic operation. The return value of `Interlocked.CompareExchange` is the original value in `location1`, whether or not the exchange takes place.

## Interlocked.CompareExchange(IntPtr, IntPtr, IntPtr) method

```csharp
public static IntPtr CompareExchange (ref IntPtr location1, IntPtr value, IntPtr comparand);
```

Compares two native-sized signed integers for equality and, if they are equal, replaces the first one, as an atomic operation.

Parameters:

- `location1`: The destination, whose value is compared with the value of `comparand` and possibly replaced by `value`.
- `value`: The value that replaces the destination value if the comparison results in equality.
- `comparand`: The value that is compared to the value at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a null pointer.

#### Remarks
If `comparand` and the value in `location1` are equal, then `value` is stored in `location1`. Otherwise, no operation is performed. The compare and exchange operations are performed as an atomic operation. The return value of this method is the original value in `location1`, whether or not the exchange takes place.

> **Note:**
> `IntPtr` is a platform-specific type.
