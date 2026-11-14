---
title: "SynchronizationContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/SynchronizationContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SynchronizationContext class

Namespace: `System.Threading`

```csharp
public class SynchronizationContext
```

Provides the basic <example-value> for propagating a synchronization context in various synchronization models.

#### Remarks
The `SynchronizationContext` class is a base class that provides a free-threaded context with no synchronization.

The purpose of the synchronization model implemented by this class is to allow the internal asynchronous/synchronous operations of the common language runtime to behave properly with different synchronization models. This model also simplifies some of the requirements that managed applications have had to follow in order to work correctly under different synchronization environments.

Providers of synchronization models can extend this class and provide their own implementations for these methods.

For more information about synchronization contexts, see the article It's All About the SynchronizationContext in the MSDN Magazine.

## SynchronizationContext.SynchronizationContext() constructor

```csharp
public SynchronizationContext ();
```

Creates a new instance of the `SynchronizationContext` class.

#### Remarks
The parameterless constructor performs no parameter initialization.

## SynchronizationContext.Current property

```csharp
public static System.Threading.SynchronizationContext? Current { get; }
```

Gets the synchronization context for the current thread.

Returns: A `SynchronizationContext` object representing the current synchronization context.

#### Remarks
This property is useful for propagating a synchronization context from one thread to another.

## SynchronizationContext.CreateCopy() method

```csharp
public virtual System.Threading.SynchronizationContext CreateCopy ();
```

When overridden in a derived class, creates a copy of the synchronization context.

Returns: A new `SynchronizationContext` object.

#### Remarks
The default implementation returns an empty `SynchronizationContext` object.

## SynchronizationContext.IsWaitNotificationRequired() method

```csharp
public bool IsWaitNotificationRequired ();
```

Determines if wait notification is required.

Returns: `true` if wait notification is required; otherwise, `false`.

To be added.

## SynchronizationContext.OperationCompleted() method

```csharp
public virtual void OperationCompleted ();
```

When overridden in a derived class, responds to the notification that an operation has completed.

#### Remarks
The default implementation contains no code. You can optionally override this method to provide code that executes when an operation is complete.

## SynchronizationContext.OperationStarted() method

```csharp
public virtual void OperationStarted ();
```

When overridden in a derived class, responds to the notification that an operation has started.

#### Remarks
The default implementation contains no code. You can optionally override this method to provide code that executes when an operation starts.

## SynchronizationContext.Post(SendOrPostCallback, Object) method

```csharp
public virtual void Post (System.Threading.SendOrPostCallback d, object? state);
```

When overridden in a derived class, dispatches an asynchronous message to a synchronization context.

Parameters:

- `d`: The `SendOrPostCallback` delegate to call.
- `state`: The object passed to the delegate.

#### Remarks
The `SynchronizationContext.Post` method starts an asynchronous request to post a message.

## SynchronizationContext.Send(SendOrPostCallback, Object) method

```csharp
public virtual void Send (System.Threading.SendOrPostCallback d, object? state);
```

When overridden in a derived class, dispatches a synchronous message to a synchronization context.

Parameters:

- `d`: The `SendOrPostCallback` delegate to call.
- `state`: The object passed to the delegate.

Exceptions:

- `NotSupportedException`: The method was called in a Windows Store app. The implementation of `SynchronizationContext` for Windows Store apps does not support the `SynchronizationContext.Send` method.

#### Remarks
The `SynchronizationContext.Send` method starts a synchronous request to send a message.

## SynchronizationContext.SetSynchronizationContext(SynchronizationContext) method

```csharp
public static void SetSynchronizationContext (System.Threading.SynchronizationContext? syncContext);
```

Sets the current synchronization context.

Parameters:

- `syncContext`: The `SynchronizationContext` object to be set.

To be added.

## SynchronizationContext.SetWaitNotificationRequired() method

```csharp
protected void SetWaitNotificationRequired ();
```

Sets notification that wait notification is required and prepares the callback method so it can be called more reliably when a wait occurs.

To be added.

## SynchronizationContext.Wait(IntPtr[], Boolean, Int32) method

```csharp
public virtual int Wait (IntPtr[] waitHandles, bool waitAll, int millisecondsTimeout);
```

Waits for any or all the elements in the specified array to receive a signal.

Parameters:

- `waitHandles`: An array of type `IntPtr` that contains the native operating system handles.
- `waitAll`: `true` to wait for all handles; `false` to wait for any handle.
- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite` (-1) to wait indefinitely.

Returns: The array index of the object that satisfied the wait.

Exceptions:

- `ArgumentNullException`: `waitHandles` is null.

#### Remarks
The `SynchronizationContext.Wait` method calls the external declaration `SynchronizationContext.WaitHelper` to perform the wait activity.  Override the `SynchronizationContext.Wait` method to change the wait behavior for the synchronization context.

## SynchronizationContext.WaitHelper(IntPtr[], Boolean, Int32) method

```csharp
protected static int WaitHelper (IntPtr[] waitHandles, bool waitAll, int millisecondsTimeout);
```

Helper function that waits for any or all the elements in the specified array to receive a signal.

Parameters:

- `waitHandles`: An array of type `IntPtr` that contains the native operating system handles.
- `waitAll`: `true` to wait for all handles;  `false` to wait for any handle.
- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite` (-1) to wait indefinitely.

Returns: The array index of the object that satisfied the wait.

#### Remarks
`SynchronizationContext.WaitHelper` is a declaration for an unmanaged external helper function. `SynchronizationContext.WaitHelper` is called by the `SynchronizationContext.Wait` method to wait for a signal for the specified operating system handles.
