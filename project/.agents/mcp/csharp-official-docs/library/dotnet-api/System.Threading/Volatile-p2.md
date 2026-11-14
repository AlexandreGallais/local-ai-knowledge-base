---
title: "Volatile class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Volatile.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Volatile class (part 2 of 2)

## Volatile.Write(Int64, Int64) method

```csharp
public static void Write (ref long location, long value);
```

Writes the specified value to the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `location`: The field where the value is written.
- `value`: The value to write.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Write(IntPtr, IntPtr) method

```csharp
public static void Write (ref IntPtr location, IntPtr value);
```

Writes the specified value to the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `location`: The field where the value is written.
- `value`: The value to write.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Write(SByte, SByte) method

```csharp
public static void Write (ref sbyte location, sbyte value);
```

Writes the specified value to the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `location`: The field where the value is written.
- `value`: The value to write.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Write(Single, Single) method

```csharp
public static void Write (ref float location, float value);
```

Writes the specified value to the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `location`: The field where the value is written.
- `value`: The value to write.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Write(UInt16, UInt16) method

```csharp
public static void Write (ref ushort location, ushort value);
```

Writes the specified value to the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `location`: The field where the value is written.
- `value`: The value to write.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Write(UInt32, UInt32) method

```csharp
public static void Write (ref uint location, uint value);
```

Writes the specified value to the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `location`: The field where the value is written.
- `value`: The value to write.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Write(UInt64, UInt64) method

```csharp
public static void Write (ref ulong location, ulong value);
```

Writes the specified value to the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `location`: The field where the value is written.
- `value`: The value to write.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Write(UIntPtr, UIntPtr) method

```csharp
public static void Write (ref UIntPtr location, UIntPtr value);
```

Writes the specified value to the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `location`: The field where the value is written.
- `value`: The value to write.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.Write<T>(T, T) method

```csharp
public static void Write<T> (ref T location, T value) where T : class;
```

Writes the specified object reference to the specified field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `T`: The type of field to write. This must be a reference type, not a value type.
- `location`: The field where the object reference is written.
- `value`: The object reference to write.

#### Remarks
For more information, see the `Volatile` class.

## Volatile.WriteBarrier() method

```csharp
public static void WriteBarrier ();
```

Synchronizes memory access as follows:

The processor that executes the current thread cannot reorder instructions in such a way that memory writes after the call to `Volatile.WriteBarrier` execute before memory accesses that precede the call to `Volatile.WriteBarrier`.

To be added.
