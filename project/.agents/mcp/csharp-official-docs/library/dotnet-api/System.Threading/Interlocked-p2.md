---
title: "Interlocked class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Interlocked.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Interlocked class (part 2 of 3)

## Interlocked.CompareExchange(Object, Object, Object) method

```csharp
public static object? CompareExchange (ref object? location1, object? value, object? comparand);
```

Compares two objects for reference equality and, if they are equal, replaces the first object, as an atomic operation.

Parameters:

- `location1`: The destination object that is compared by reference with `comparand` and possibly replaced.
- `value`: The object that replaces the destination object if the reference comparison results in equality.
- `comparand`: The object that is compared by reference to the object at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

#### Remarks

> **Important:**
> The `CompareExchange<T>` method overload provides a generic alternative that can be used for concrete reference types.

If `comparand` and the object in `location1` are equal by reference, then `value` is stored in `location1`. Otherwise, no operation is performed. The compare and exchange operations are performed as an atomic operation. The return value of `Interlocked.CompareExchange` is the original value in `location1`, whether or not the exchange takes place.

> **Note:**
> The objects are compared for reference equality rather than value equality. As a result, two boxed instances of the same value type (for example, the integer 3) always appear to be unequal and no operation is performed. Do not use this overload with value types.

## Interlocked.CompareExchange(SByte, SByte, SByte) method

```csharp
public static sbyte CompareExchange (ref sbyte location1, sbyte value, sbyte comparand);
```

Compares two 8-bit signed integers for equality and, if they are equal, replaces the first value, as an atomic operation.

Parameters:

- `location1`: The destination, whose value is compared with `comparand` and possibly replaced.
- `value`: The value that replaces the destination value if the comparison results in equality.
- `comparand`: The value that is compared to the value at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.CompareExchange(Single, Single, Single) method

```csharp
public static float CompareExchange (ref float location1, float value, float comparand);
```

Compares two single-precision floating point numbers for equality and, if they are equal, replaces the first value, as an atomic operation.

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
The following code example demonstrates a thread-safe method that accumulates a running total of `Single` values. Two threads add a series of `Single` values using the thread-safe method and ordinary addition, and when the threads complete the totals are compared. On a dual-processor computer, there is a significant difference in the totals.

In the thread-safe method, the initial value of the running total is saved, and then the `Interlocked.CompareExchange` method is used to exchange the newly computed total with the old total. If the return value is not equal to the saved value of the running total, then another thread has updated the total in the meantime. In that case, the attempt to update the running total must be repeated.

_Code sample not included: ~/snippets/csharp/System.Threading/Interlocked/CompareExchange/source1.cs._

## Interlocked.CompareExchange(UInt16, UInt16, UInt16) method

```csharp
public static ushort CompareExchange (ref ushort location1, ushort value, ushort comparand);
```

Compares two 16-bit signed integers for equality and, if they are equal, replaces the first value, as an atomic operation.

Parameters:

- `location1`: The destination, whose value is compared with `comparand` and possibly replaced.
- `value`: The value that replaces the destination value if the comparison results in equality.
- `comparand`: The value that is compared to the value at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.CompareExchange(UInt32, UInt32, UInt32) method

```csharp
public static uint CompareExchange (ref uint location1, uint value, uint comparand);
```

Compares two 32-bit unsigned integers for equality and, if they are equal, replaces the first value, as an atomic operation.

Parameters:

- `location1`: The destination, whose value is compared with `comparand` and possibly replaced.
- `value`: The value that replaces the destination value if the comparison results in equality.
- `comparand`: The value that is compared to the value at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.CompareExchange(UInt64, UInt64, UInt64) method

```csharp
public static ulong CompareExchange (ref ulong location1, ulong value, ulong comparand);
```

Compares two 64-bit unsigned integers for equality and, if they are equal, replaces the first value, as an atomic operation.

Parameters:

- `location1`: The destination, whose value is compared with `comparand` and possibly replaced.
- `value`: The value that replaces the destination value if the comparison results in equality.
- `comparand`: The value that is compared to the value at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.CompareExchange(UIntPtr, UIntPtr, UIntPtr) method

```csharp
public static UIntPtr CompareExchange (ref UIntPtr location1, UIntPtr value, UIntPtr comparand);
```

Compares two native-sized unsigned integers for equality and, if they are equal, replaces the first one, as an atomic operation.

Parameters:

- `location1`: The destination, whose value is compared with the value of `comparand` and possibly replaced by `value`.
- `value`: The value that replaces the destination value if the comparison results in equality.
- `comparand`: The value that is compared to the value at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.CompareExchange<T>(T, T, T) method

```csharp
public static T CompareExchange<T> (ref T location1, T value, T comparand);
```

Compares two instances of the specified type `T` for reference equality and, if they're equal, replaces the first one, as an atomic operation.

Parameters:

- `T`: The type to be used for `location1`, `value`, and `comparand`.
- `location1`: The destination, whose value is compared by reference with `comparand` and possibly replaced. This is a reference parameter (`ref` in C#, `ByRef` in Visual Basic).
- `value`: The value that replaces the destination value if the comparison by reference results in equality.
- `comparand`: The value that is compared by reference to the value at `location1`.

Returns: The original value in `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a null pointer.
- `NotSupportedException`: An unsupported `T` is specified. On .NET 8 and earlier versions, `T` must be a reference type. On .NET 9 and later versions, `T` must be a reference, primitive, or enum type.

#### Remarks

If `comparand` and the value in `location1` are equal by reference, then `value` is stored in `location1`. Otherwise, no operation is performed. The comparison and the exchange are performed as an atomic operation. The return value of this method is the original value in `location1`, whether or not the exchange takes place.

## Interlocked.Decrement(Int32) method

```csharp
public static int Decrement (ref int location);
```

Decrements a specified variable and stores the result, as an atomic operation.

Parameters:

- `location`: The variable whose value is to be decremented.

Returns: The value of the variable immediately after the decrement operation finished.

Exceptions:

- `ArgumentNullException`: The address of `location` is a `null` pointer.
- `NullReferenceException`: The address of `location` is a `null` pointer.

#### Remarks
This method handles an overflow condition by wrapping: If `location` = `MinValue`, `location` - 1 = `MaxValue`. No exception is thrown.

#### Examples
The following example determines how many random numbers that range from 0 to 1,000 are required to generate 1,000 random numbers with a midpoint value. To keep track of the number of midpoint values, a variable, `midpointCount`, is set equal to 1,000 and decremented each time the random number generator returns a midpoint value. Because three threads generate the random numbers, the `Decrement` method is called to ensure that multiple threads don't update `midpointCount` concurrently. Note that a lock is also used to protect the random number generator, and that a `CountdownEvent` object is used to ensure that the `Main` method doesn't finish execution before the three threads.

_Code sample not included: ~/snippets/csharp/System.Threading/Interlocked/Decrement/decrement1.cs._

The following example is similar to the previous one, except that it uses the `Task` class instead of a thread procedure to generate 50,000 random midpoint integers. In this example, a lambda expression replaces the `GenerateNumbers` thread procedure, and the call to the `Task.WaitAll` method eliminates the need for the `CountdownEvent` object.

_Code sample not included: ~/snippets/csharp/System.Threading/Interlocked/Decrement/decrement2.cs._

## Interlocked.Decrement(Int64) method

```csharp
public static long Decrement (ref long location);
```

Decrements the specified variable and stores the result, as an atomic operation.

Parameters:

- `location`: The variable whose value is to be decremented.

Returns: The value of the variable immediately after the decrement operation finished.

Exceptions:

- `ArgumentNullException`: The address of `location` is a `null` pointer.
- `NullReferenceException`: The address of `location` is a `null` pointer.

#### Remarks
This method handles an overflow condition by wrapping: if `location` = `MinValue`, `location` - 1 = `MaxValue`. No exception is thrown.

## Interlocked.Decrement(UInt32) method

```csharp
public static uint Decrement (ref uint location);
```

Decrements a specified variable and stores the result, as an atomic operation.

Parameters:

- `location`: The variable whose value is to be decremented.

Returns: The value of the variable immediately after the decrement operation finished.

Exceptions:

- `NullReferenceException`: The address of `location` is a `null` pointer.

To be added.

## Interlocked.Decrement(UInt64) method

```csharp
public static ulong Decrement (ref ulong location);
```

Decrements a specified variable and stores the result, as an atomic operation.

Parameters:

- `location`: The variable whose value is to be decremented.

Returns: The value of the variable immediately after the decrement operation finished.

Exceptions:

- `NullReferenceException`: The address of `location` is a `null` pointer.

To be added.

## Interlocked.Exchange(Byte, Byte) method

```csharp
public static byte Exchange (ref byte location1, byte value);
```

Sets a 8-bit unsigned integer to a specified value and returns the original value, as an atomic operation.

Parameters:

- `location1`: The variable to set to the specified value.
- `value`: The value to which the `location1` parameter is set.

Returns: The original value of `location1`.

Exceptions:

- `NullReferenceException`: The address of location1 is a `null` pointer.

To be added.

## Interlocked.Exchange(Double, Double) method

```csharp
public static double Exchange (ref double location1, double value);
```

Sets a double-precision floating point number to a specified value and returns the original value, as an atomic operation.

Parameters:

- `location1`: The variable to set to the specified value.
- `value`: The value to which the `location1` parameter is set.

Returns: The original value of `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.

## Interlocked.Exchange(Int16, Int16) method

```csharp
public static short Exchange (ref short location1, short value);
```

Sets a 16-bit unsigned integer to a specified value and returns the original value, as an atomic operation.

Parameters:

- `location1`: The variable to set to the specified value.
- `value`: The value to which the `location1` parameter is set.

Returns: The original value of `location1`.

Exceptions:

- `NullReferenceException`: The address of location1 is a `null` pointer.

To be added.

## Interlocked.Exchange(Int32, Int32) method

```csharp
public static int Exchange (ref int location1, int value);
```

Sets a 32-bit signed integer to a specified value and returns the original value, as an atomic operation.

Parameters:

- `location1`: The variable to set to the specified value.
- `value`: The value to which the `location1` parameter is set.

Returns: The original value of `location1`.

Exceptions:

- `ArgumentNullException`: The address of `location1` is a `null` pointer.
- `NullReferenceException`: The address of `location1` is a `null` pointer.

#### Examples
The following code example shows a thread-safe resource locking mechanism.

_Code sample not included: ~/snippets/csharp/System.Threading/Interlocked/Overview/class1.cs._

## Interlocked.Exchange(Int64, Int64) method

```csharp
public static long Exchange (ref long location1, long value);
```

Sets a 64-bit signed integer to a specified value and returns the original value, as an atomic operation.

Parameters:

- `location1`: The variable to set to the specified value.
- `value`: The value to which the `location1` parameter is set.

Returns: The original value of `location1`.

Exceptions:

- `NullReferenceException`: The address of `location1` is a `null` pointer.

To be added.
