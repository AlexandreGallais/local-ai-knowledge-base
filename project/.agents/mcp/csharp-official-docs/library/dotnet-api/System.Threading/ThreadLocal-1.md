---
title: "ThreadLocal<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ThreadLocal`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadLocal<T> class

Namespace: `System.Threading`

```csharp
public class ThreadLocal<T> : IDisposable
```

Provides thread-local storage of data.

Parameters:

- `T`: Specifies the type of data stored per-thread.

#### Examples
The following example shows how to use `ThreadLocal<T>`:

_Code sample not included: ~/snippets/csharp/System.Threading/ThreadLocalT/Overview/threadlocal.cs._

## ThreadLocal<T>.ThreadLocal() constructor

```csharp
public ThreadLocal ();
```

Initializes the `ThreadLocal<T>` instance.

#### Remarks
The default value of `T` is used to initialize the instance when `ThreadLocal<T>.Value` is accessed for the first time.

This constructor is equivalent to calling the `%23ctor` constructor with a value of `false` for the `trackAllValues` argument.

## ThreadLocal<T>.ThreadLocal(Boolean) constructor

```csharp
public ThreadLocal (bool trackAllValues);
```

Initializes the `ThreadLocal<T>` instance and specifies whether all values are accessible from any thread.

Parameters:

- `trackAllValues`: `true` to track all values set on the instance and expose them through the `ThreadLocal<T>.Values` property; `false` otherwise. When set to `true`, a value stored from a given thread will be available through `ThreadLocal<T>.Values` even after that thread has exited.

#### Remarks
If `trackAllValues` is `false`, only the value of this instance for the current thread is accessible. Attempting to use the `Values` property to retrieve all values throws an `InvalidOperationException` exception.

## ThreadLocal<T>.ThreadLocal(Func<T>) constructor

```csharp
public ThreadLocal (Func<T> valueFactory);
```

Initializes the `ThreadLocal<T>` instance with the specified `valueFactory` function.

Parameters:

- `valueFactory`: The  `Func<T>` invoked to produce a lazily-initialized value when an attempt is made to retrieve `ThreadLocal<T>.Value` without it having been previously initialized.

Exceptions:

- `ArgumentNullException`: `valueFactory` is a null reference (Nothing in Visual Basic).

To be added.

## ThreadLocal<T>.ThreadLocal(Func<T>, Boolean) constructor

```csharp
public ThreadLocal (Func<T> valueFactory, bool trackAllValues);
```

Initializes the `ThreadLocal<T>` instance with the specified `valueFactory` function and a flag that indicates whether all values are accessible from any thread.

Parameters:

- `valueFactory`: The `Func<T>` invoked to produce a lazily-initialized value when an attempt is made to retrieve `ThreadLocal<T>.Value` without it having been previously initialized.
- `trackAllValues`: `true` to track all values set on the instance and expose them through the `ThreadLocal<T>.Values` property; `false` otherwise. When set to `true`, a value stored from a given thread will be available through `ThreadLocal<T>.Values` even after that thread has exited.

Exceptions:

- `ArgumentNullException`: `valueFactory` is a `null` reference (`Nothing` in Visual Basic).

#### Remarks
If `trackAllValues` is `false`, only the value of this instance for the current thread is accessible. Attempting to use the `Values` property to retrieve all values throws an `InvalidOperationException` exception.

## ThreadLocal<T>.IsValueCreated property

```csharp
public bool IsValueCreated { get; }
```

Gets whether `ThreadLocal<T>.Value` is initialized on the current thread.

Returns: true if `ThreadLocal<T>.Value` is initialized on the current thread; otherwise false.

Exceptions:

- `ObjectDisposedException`: The `ThreadLocal<T>` instance has been disposed.

To be added.

## ThreadLocal<T>.Value property

```csharp
public T Value { get; set; }
```

Gets or sets the value of this instance for the current thread.

Returns: Returns an instance of the object that this ThreadLocal is responsible for initializing.

Exceptions:

- `ObjectDisposedException`: The `ThreadLocal<T>` instance has been disposed.
- `InvalidOperationException`: The initialization function attempted to reference `ThreadLocal<T>.Value` recursively.
- `MissingMemberException`: No parameterless constructor is provided and no value factory is supplied.

#### Remarks
If this instance was not previously initialized for the current thread, accessing `ThreadLocal<T>.Value` will initialize it.
If a value factory was supplied during the construction, initialization will happen by invoking the function to retrieve the initial value for `ThreadLocal<T>.Value`.
Otherwise, the default value of `T` will be used.
Regardless of the initialization method, `ThreadLocal<T>.IsValueCreated` will be set to `true`.

## ThreadLocal<T>.Values property

```csharp
public System.Collections.Generic.IList<T> Values { get; }
```

Gets a list containing the values stored by all threads that have accessed this instance.

Returns: A list for all of the values stored by all of the threads that have accessed this instance.

Exceptions:

- `InvalidOperationException`: Values stored by all threads are not available because this instance was initialized with the `trackAllValues` argument set to `false` in the call to a class constructor.
- `ObjectDisposedException`: The `ThreadLocal<T>` instance has been disposed.

Each thread that has ever accessed this instance will contribute to this list the value last stored into the instance.  This includes threads that have since exited.

## ThreadLocal<T>.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `ThreadLocal<T>` class.

#### Remarks
Call `Dispose` when you are finished using the `ThreadLocal<T>`. The `Dispose` method leaves the `ThreadLocal<T>` in an unusable state. After calling `Dispose`, you must release all references to the `ThreadLocal<T>` so the garbage collector can reclaim the memory that the `ThreadLocal<T>` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Dispose` before you release your last reference to the `ThreadLocal<T>`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `ThreadLocal<T>` object's `Finalize` method.

## ThreadLocal<T>.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the resources used by this `ThreadLocal<T>` instance.

Parameters:

- `disposing`: A Boolean value that indicates whether this method is being called due to a call to `ThreadLocal<T>.Dispose`.

#### Remarks
Unlike most of the members of `ThreadLocal<T>`, this method is not thread-safe.

## ThreadLocal<T>.Finalize() method

```csharp
~ThreadLocal ();
```

Releases the resources used by this `ThreadLocal<T>` instance.

To be added.

## ThreadLocal<T>.ToString() method

```csharp
public override string? ToString ();
```

Creates and returns a string representation of this instance for the current thread.

Returns: The result of calling `Object.ToString` on the `ThreadLocal<T>.Value`.

Exceptions:

- `ObjectDisposedException`: The `ThreadLocal<T>` instance has been disposed.
- `NullReferenceException`: The `ThreadLocal<T>.Value` for the current thread is a null reference (Nothing in Visual Basic).
- `InvalidOperationException`: The initialization function attempted to reference `ThreadLocal<T>.Value` recursively.
- `MissingMemberException`: No parameterless constructor is provided and no value factory is supplied.

#### Remarks
Calling this method forces initialization for the current thread, as is the case with accessing `ThreadLocal<T>.Value` directly.
