---
title: "Thread class (part 6 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Thread.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Thread class (part 6 of 7)

## Thread.Start(Object) method

```csharp
public void Start (object? parameter);
```

Causes the operating system to change the state of the current instance to `ThreadState.Running`, and optionally supplies an object containing data to be used by the method the thread executes.

Parameters:

- `parameter`: An object that contains data to be used by the method the thread executes.

Exceptions:

- `ThreadStateException`: The thread has already been started.
- `OutOfMemoryException`: There is not enough memory available to start this thread.
- `InvalidOperationException`: This thread was created using a `ThreadStart` delegate instead of a `ParameterizedThreadStart` delegate.

#### Remarks
Once a thread is in the `Running` state, the operating system can schedule it for execution. The thread begins executing at the first line of the method represented by the `ThreadStart` or `ParameterizedThreadStart` delegate supplied to the thread constructor. Note that the call to `Thread.Start` does not block the calling thread.

Once the thread terminates, it cannot be restarted with another call to `Start`.

This overload and the `ParameterizedThreadStart` delegate make it easy to pass data to a thread procedure, but the technique is not type safe because any object can be passed to this overload. A more robust way to pass data to a thread procedure is to put both the thread procedure and the data fields into a worker object. For more information, see Creating Threads and Passing Data at Start Time.

#### Examples
The following example creates a `ParameterizedThreadStart` delegate with a static method and an instance method.

_Code sample not included: ~/snippets/csharp/System.Threading/ParameterizedThreadStart/Overview/source.cs._

## Thread.Suspend() method

```csharp
public void Suspend ();
```

Either suspends the thread, or if the thread is already suspended, has no effect.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## Thread.TrySetApartmentState(ApartmentState) method

```csharp
public bool TrySetApartmentState (System.Threading.ApartmentState state);
```

Sets the apartment state of a thread before it is started.

Parameters:

- `state`: The new apartment state.

Returns: `true` if the apartment state is set; otherwise, `false`.

Exceptions:

- `PlatformNotSupportedException`: On macOS and Linux: In all cases.
- `ArgumentException`: `state` is not a valid apartment state.
- `ThreadStateException`: The thread was started and has terminated, or the call is not being made from the thread's context while the thread is running.

#### Remarks
New threads are initialized as `MTA` if their apartment state has not been set before they are started. Apartment state must be set before a thread is started.

> **Note:**
> The main application thread is initialized to `MTA` by default. The only way to set the apartment state of the main application thread to `STA` is to apply the `STAThreadAttribute` attribute to the entry point method.

The `Thread.TrySetApartmentState` method, along with the `Thread.GetApartmentState` method and the `Thread.SetApartmentState` method, replaces the `ApartmentState` property.

#### Examples
The following code example demonstrates the `Thread.GetApartmentState`, `Thread.SetApartmentState`, and `Thread.TrySetApartmentState` methods. The code example creates a thread. Before the thread is started, `Thread.GetApartmentState` displays the initial `Unknown` state and `Thread.SetApartmentState` changes the state to `STA`. The `Thread.TrySetApartmentState` method then returns `false` when attempting to change the state to `MTA` because the apartment state is already set. If the same operation had been attempted with `Thread.SetApartmentState`, `InvalidOperationException` would have been thrown.

After the thread is started, the `Thread.TrySetApartmentState` method is used again. This time it throws `ThreadStateException` because the thread has already been started.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/GetApartmentState/source.cs._

## Thread.UnsafeStart() method

```csharp
public void UnsafeStart ();
```

Causes the operating system to change the state of the current instance to `ThreadState.Running`.

Exceptions:

- `ThreadStateException`: The thread has already been started.
- `OutOfMemoryException`: There is not enough memory available to start this thread.

#### Remarks

Unlike `Start`, which captures the current `ExecutionContext` and uses that context to invoke the thread's delegate,
`UnsafeStart` explicitly avoids capturing the current context and flowing it to the invocation.

## Thread.UnsafeStart(Object) method

```csharp
public void UnsafeStart (object? parameter);
```

Causes the operating system to change the state of the current instance to `ThreadState.Running`, and optionally supplies an object containing data to be used by the method the thread executes.

Parameters:

- `parameter`: An object that contains data to be used by the method the thread executes.

Exceptions:

- `ThreadStateException`: The thread has already been started.
- `OutOfMemoryException`: There is not enough memory available to start this thread.
- `InvalidOperationException`: This thread was created using a `ThreadStart` delegate instead of a `ParameterizedThreadStart` delegate.

#### Remarks

Unlike `Start`, which captures the current `ExecutionContext` and uses that context to invoke the thread's delegate,
`UnsafeStart` explicitly avoids capturing the current context and flowing it to the invocation.

## Thread.VolatileRead(Byte) method

```csharp
public static byte VolatileRead (ref byte address);
```

Reads the value of a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `address`: The field to be read.

Returns: The value that was read.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileRead(Double) method

```csharp
public static double VolatileRead (ref double address);
```

Reads the value of a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `address`: The field to be read.

Returns: The value that was read.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileRead(Int16) method

```csharp
public static short VolatileRead (ref short address);
```

Reads the value of a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `address`: The field to be read.

Returns: The value that was read.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileRead(Int32) method

```csharp
public static int VolatileRead (ref int address);
```

Reads the value of a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `address`: The field to be read.

Returns: The value that was read.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileRead(Int64) method

```csharp
public static long VolatileRead (ref long address);
```

Reads the value of a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `address`: The field to be read.

Returns: The value that was read.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileRead(IntPtr) method

```csharp
public static IntPtr VolatileRead (ref IntPtr address);
```

Reads the value of a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `address`: The field to be read.

Returns: The value that was read.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileRead(Object) method

```csharp
public static object? VolatileRead (ref object? address);
```

Reads the value of a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `address`: The field to be read.

Returns: The value that was read.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileRead(SByte) method

```csharp
public static sbyte VolatileRead (ref sbyte address);
```

Reads the value of a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `address`: The field to be read.

Returns: The value that was read.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileRead(Single) method

```csharp
public static float VolatileRead (ref float address);
```

Reads the value of a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `address`: The field to be read.

Returns: The value that was read.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileRead(UInt16) method

```csharp
public static ushort VolatileRead (ref ushort address);
```

Reads the value of a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `address`: The field to be read.

Returns: The value that was read.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileRead(UInt32) method

```csharp
public static uint VolatileRead (ref uint address);
```

Reads the value of a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `address`: The field to be read.

Returns: The value that was read.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileRead(UInt64) method

```csharp
public static ulong VolatileRead (ref ulong address);
```

Reads the value of a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `address`: The field to be read.

Returns: The value that was read.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileRead(UIntPtr) method

```csharp
public static UIntPtr VolatileRead (ref UIntPtr address);
```

Reads the value of a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears after this method in the code, the processor cannot move it before this method.

Parameters:

- `address`: The field to be read.

Returns: The value that was read.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.

## Thread.VolatileWrite(Byte, Byte) method

```csharp
public static void VolatileWrite (ref byte address, byte value);
```

Writes a value to a field. On systems that require it, inserts a memory barrier that prevents the processor from reordering memory operations as follows: If a read or write appears before this method in the code, the processor cannot move it after this method.

Parameters:

- `address`: The field to which the value is to be written.
- `value`: The value to be written.

#### Remarks
`Thread.VolatileRead` and `Thread.VolatileWrite` are legacy APIs and have been replaced by `Volatile.Read` and `Volatile.Write`. See the `Volatile` class for more information.
