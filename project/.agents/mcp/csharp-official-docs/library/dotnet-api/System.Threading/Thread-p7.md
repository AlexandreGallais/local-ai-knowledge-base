---
title: "Thread class (part 7 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Thread.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Thread class (part 7 of 7)

## Thread.VolatileWrite(Double, Double) method

```csharp
public static void VolatileWrite (ref double address, double value);
```

Writes a value to a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `address`: The field to which the value is to be written.
- `value`: The value to be written.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileWrite(Int16, Int16) method

```csharp
public static void VolatileWrite (ref short address, short value);
```

Writes a value to a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `address`: The field to which the value is to be written.
- `value`: The value to be written.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileWrite(Int32, Int32) method

```csharp
public static void VolatileWrite (ref int address, int value);
```

Writes a value to a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `address`: The field to which the value is to be written.
- `value`: The value to be written.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileWrite(Int64, Int64) method

```csharp
public static void VolatileWrite (ref long address, long value);
```

Writes a value to a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `address`: The field to which the value is to be written.
- `value`: The value to be written.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileWrite(IntPtr, IntPtr) method

```csharp
public static void VolatileWrite (ref IntPtr address, IntPtr value);
```

Writes a value to a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `address`: The field to which the value is to be written.
- `value`: The value to be written.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileWrite(Object, Object) method

```csharp
public static void VolatileWrite (ref object? address, object? value);
```

Writes a value to a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `address`: The field to which the value is to be written.
- `value`: The value to be written.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileWrite(SByte, SByte) method

```csharp
public static void VolatileWrite (ref sbyte address, sbyte value);
```

Writes a value to a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `address`: The field to which the value is to be written.
- `value`: The value to be written.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileWrite(Single, Single) method

```csharp
public static void VolatileWrite (ref float address, float value);
```

Writes a value to a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `address`: The field to which the value is to be written.
- `value`: The value to be written.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileWrite(UInt16, UInt16) method

```csharp
public static void VolatileWrite (ref ushort address, ushort value);
```

Writes a value to a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `address`: The field to which the value is to be written.
- `value`: The value to be written.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileWrite(UInt32, UInt32) method

```csharp
public static void VolatileWrite (ref uint address, uint value);
```

Writes a value to a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `address`: The field to which the value is to be written.
- `value`: The value to be written.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileWrite(UInt64, UInt64) method

```csharp
public static void VolatileWrite (ref ulong address, ulong value);
```

Writes a value to a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `address`: The field to which the value is to be written.
- `value`: The value to be written.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileWrite(UIntPtr, UIntPtr) method

```csharp
public static void VolatileWrite (ref UIntPtr address, UIntPtr value);
```

Writes a value to a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `address`: The field to which the value is to be written.
- `value`: The value to be written.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.Yield() method

```csharp
public static bool Yield ();
```

Causes the calling thread to yield execution to another thread that is ready to run on the current processor. The operating system selects the thread to yield to.

Returns: `true` if the operating system switched execution to another thread; otherwise, `false`.

#### Remarks
If this method succeeds, the rest of the thread's current time slice is yielded. The operating system schedules the calling thread for another time slice, according to its priority and the status of other threads that are available to run.

Yielding is limited to the processor that is executing the calling thread. The operating system will not switch execution to another processor, even if that processor is idle or is running a thread of lower priority. If there are no other threads that are ready to execute on the current processor, the operating system does not yield execution, and this method returns `false`.

This method is equivalent to using platform invoke to call the native Win32 `SwitchToThread` function. You should call the `Thread.Yield` method instead of using platform invoke, because platform invoke bypasses any custom threading behavior the host has requested.
