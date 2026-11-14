---
title: "Volatile class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Volatile.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Volatile class

Namespace: `System.Threading`

```csharp
public static class Volatile
```

Contains methods for performing volatile memory operations.

#### Remarks
On a multiprocessor system, due to performance optimizations in the compiler or processor, regular memory operations may appear to be reordered when multiple processors are operating on the same memory. Volatile memory operations prevent certain types of reordering with respect to the operation. A volatile write operation prevents earlier memory operations on the thread from being reordered to occur after the volatile write. A volatile read operation prevents later memory operations on the thread from being reordered to occur before the volatile read. These operations might involve memory barriers on some processors, which can affect performance.

For example, consider the following scenario with two threads and two `Int32` fields `x` and `y` that are initially zero:

| Thread 1 | Thread 2 |
| - | - |
| `x = 1;` | `int y2 = Volatile.Read(ref y);` |
| `Volatile.Write(ref y, 1);` | `int x2 = x;` |

The volatile read and write prevent reordering of the two operations within each thread, such as by the compiler or by the processor. Regardless of the order in which these operations actually occur on one thread relative to the other thread, even on a multiprocessor system where the threads may run on different processors, the volatile operations guarantee that thread 2 would not see `y2 == 1` and `x2 == 0`. On thread 1 the write to `x` must appear to occur before the volatile write to `y`, and on thread 2 the read of `x` must appear to occur after the volatile read of `y`. So if thread 2 sees `y2 == 1`, it must also see `x2 == 1`.

However, consider the same scenario as above with a specific sequence in which the operations occur:

| Sequence | Thread 1 | Thread 2 |
| -: | - | - |
| 1 | `x = 1;` | `...` |
| 2 | `Volatile.Write(ref y, 1);` | `...` |
| 3 | `...` | `int y2 = Volatile.Read(ref y);` |
| 4 | `...` | `int x2 = x;` |

Even though the volatile write to `y` on thread 1 occurred before the volatile read of `y` on thread 2, thread 2 may still see `y2 == 0`. The volatile write to `y` does not guarantee that a following volatile read of `y` on a different processor will see the updated value.

> **Note:**
> - Volatile reads and writes ensure that a value is read or written to memory and not cached (for example, in a processor register). Thus, you can use these operations to synchronize access to a field that can be updated by another thread or by hardware.
> - The `Volatile` class also provides read and write operations for some 64-bit types such as `Int64` and `Double`. Volatile reads and writes on such 64-bit memory are atomic even on 32-bit processors, unlike regular reads and writes.

Volatile memory operations are for special cases of synchronization, where normal locking is not an acceptable alternative. Under normal circumstances, the C# `lock` statement, the Visual Basic `SyncLock` statement, and the `Monitor` class provide the easiest and least error-prone way of synchronizing access to data, and the `Lazy<T>` class provides a simple way to write lazy initialization code without directly using double-checked locking.

The `Volatile.Read` and `Volatile.Write` methods enable functionality that is not supported in languages. For example:

- Some languages, such as Visual Basic, do not recognize the concept of volatile memory operations. The `Volatile` class provides that functionality in such languages.

> **Note:**
>  Calling one of these methods affects only a single memory access. To provide effective synchronization for a field, all access to the field must use `Volatile.Read` and `Volatile.Write`.

- In C#, using the `volatile` modifier on a field guarantees that every access to that field is a volatile memory operation, but the `volatile` modifier cannot be applied to array elements. The `Volatile.Read` and `Volatile.Write` methods can be used on array elements.

## Volatile.Read(Boolean) method

```csharp
public static bool Read (ref readonly bool location);
```

Reads the value of the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `location`: The field to read.

Returns: The value that was read.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Read(Byte) method

```csharp
public static byte Read (ref readonly byte location);
```

Reads the value of the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `location`: The field to read.

Returns: The value that was read.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Read(Double) method

```csharp
public static double Read (ref readonly double location);
```

Reads the value of the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `location`: The field to read.

Returns: The value that was read.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Read(Int16) method

```csharp
public static short Read (ref readonly short location);
```

Reads the value of the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `location`: The field to read.

Returns: The value that was read.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Read(Int32) method

```csharp
public static int Read (ref readonly int location);
```

Reads the value of the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `location`: The field to read.

Returns: The value that was read.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Read(Int64) method

```csharp
public static long Read (ref readonly long location);
```

Reads the value of the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `location`: The field to read.

Returns: The value that was read.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Read(IntPtr) method

```csharp
public static IntPtr Read (ref readonly IntPtr location);
```

Reads the value of the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `location`: The field to read.

Returns: The value that was read.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Read(SByte) method

```csharp
public static sbyte Read (ref readonly sbyte location);
```

Reads the value of the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `location`: The field to read.

Returns: The value that was read.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Read(Single) method

```csharp
public static float Read (ref readonly float location);
```

Reads the value of the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `location`: The field to read.

Returns: The value that was read.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Read(UInt16) method

```csharp
public static ushort Read (ref readonly ushort location);
```

Reads the value of the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `location`: The field to read.

Returns: The value that was read.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Read(UInt32) method

```csharp
public static uint Read (ref readonly uint location);
```

Reads the value of the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `location`: The field to read.

Returns: The value that was read.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Read(UInt64) method

```csharp
public static ulong Read (ref readonly ulong location);
```

Reads the value of the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `location`: The field to read.

Returns: The value that was read.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Read(UIntPtr) method

```csharp
public static UIntPtr Read (ref readonly UIntPtr location);
```

Reads the value of the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `location`: The field to read.

Returns: The value that was read.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Read<T>(T) method

```csharp
public static T Read<T> (ref readonly T location) where T : class;
```

Reads the object reference from the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `T`: The type of field to read. This must be a reference type, not a value type.
- `location`: The field to read.

Returns: The reference to `T` that was read. This reference is the latest written by any processor in the computer, regardless of the number of processors or the state of processor cache.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.ReadBarrier() method

```csharp
public static void ReadBarrier ();
```

Synchronizes memory access as follows:

The processor that executes the current thread cannot reorder instructions in such a way that memory reads before the call to `Volatile.ReadBarrier` execute after memory accesses that follow the call to `Volatile.ReadBarrier`.

To be added.

## Volatile.Write(Boolean, Boolean) method

```csharp
public static void Write (ref bool location, bool value);
```

Writes the specified value to the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `location`: The field where the value is written.
- `value`: The value to write.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Write(Byte, Byte) method

```csharp
public static void Write (ref byte location, byte value);
```

Writes the specified value to the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `location`: The field where the value is written.
- `value`: The value to write.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Write(Double, Double) method

```csharp
public static void Write (ref double location, double value);
```

Writes the specified value to the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `location`: The field where the value is written.
- `value`: The value to write.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Write(Int16, Int16) method

```csharp
public static void Write (ref short location, short value);
```

Writes the specified value to the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `location`: The field where the value is written.
- `value`: The value to write.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Write(Int32, Int32) method

```csharp
public static void Write (ref int location, int value);
```

Writes the specified value to the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `location`: The field where the value is written.
- `value`: The value to write.

#### Remarks
For more information, see the `Volatile` class.
