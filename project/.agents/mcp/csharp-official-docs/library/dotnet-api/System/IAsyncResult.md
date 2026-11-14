---
title: "IAsyncResult interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IAsyncResult.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IAsyncResult interface

Namespace: `System`

```csharp
public interface IAsyncResult
```

Represents the status of an asynchronous operation.

#### Remarks
The `IAsyncResult` interface is implemented by classes containing methods that can operate asynchronously. It is the return type of methods that initiate an asynchronous operation, such as `FileStream.BeginRead`, and it is passed to methods that conclude an asynchronous operation, such as `FileStream.EndRead`. `IAsyncResult` objects are also passed to methods invoked by `AsyncCallback` delegates when an asynchronous operation completes.

An object that supports the `IAsyncResult` interface stores state information for an asynchronous operation and provides a synchronization object to allow threads to be signaled when the operation completes.

> **Note:**
>  The `AsyncResult` class is the implementation of `IAsyncResult` that is returned by the `BeginInvoke` method when you use a delegate to call a method asynchronously.

For a detailed description of how the `IAsyncResult` interface is used, see the Calling Synchronous Methods Asynchronously topic.

#### Examples
The following example demonstrates how to use the `AsyncWaitHandle` property to get a `WaitHandle`, and how to wait for an asynchronous call on a delegate. The `WaitHandle` is signaled when the asynchronous call completes, and you can wait for it by calling the `WaitHandle.WaitOne` method.

The example consists of two classes: the class that contains the method that is called asynchronously, and the class that contains the `Main` method that makes the call.

For more information and more examples of calling methods asynchronously by using delegates, see Calling Synchronous Methods Asynchronously.

_Code sample not included: ~/snippets/csharp/System/IAsyncResult/Overview/TestMethod.cs._

_Code sample not included: ~/snippets/csharp/System/IAsyncResult/Overview/waithandle.cs._

## IAsyncResult.AsyncState property

```csharp
public object? AsyncState { get; }
```

Gets a user-defined object that qualifies or contains information about an asynchronous operation.

Returns: A user-defined object that qualifies or contains information about an asynchronous operation.

#### Remarks
This property returns the object that is the last parameter of the method that initiates an asynchronous operation.

#### Examples
The following code example demonstrates how the `AsyncState` property is used to pass <example-value> to a callback method. The last parameter of the `BeginInvoke` method call is a format string, which the callback method uses to format an output message.

The example consists of two classes: the class that contains the method that is called asynchronously, and the class that contains the `Main` method that makes the call.

For more information about how this callback example works, and more examples of calling methods asynchronously by using delegates, see Calling Synchronous Methods Asynchronously.

_Code sample not included: ~/snippets/csharp/System/IAsyncResult/Overview/TestMethod.cs._

_Code sample not included: ~/snippets/csharp/System/IAsyncResult/Overview/callback.cs._

## IAsyncResult.AsyncWaitHandle property

```csharp
public System.Threading.WaitHandle AsyncWaitHandle { get; }
```

Gets a `WaitHandle` that is used to wait for an asynchronous operation to complete.

Returns: A `WaitHandle` that is used to wait for an asynchronous operation to complete.

#### Remarks
The return value allows the client to wait for an asynchronous operation to complete instead of polling `IAsyncResult.IsCompleted` until the operation concludes. The return value can be used to perform a `WaitHandle.WaitOne`, `WaitHandle.WaitAny`, or `WaitHandle.WaitAll` operation.

The common language runtime supplies a number of waitable objects, such as `ManualResetEvent`, `AutoResetEvent`, and `Mutex`, all of which mirror Win32 synchronization primitives.

#### Examples
The following example demonstrates how to use the `AsyncWaitHandle` property to get a `WaitHandle`, and how to wait for an asynchronous call on a delegate. The `WaitHandle` is signaled when the asynchronous call completes, and you can wait for it by calling the `WaitHandle.WaitOne` method.

The example consists of two classes: the class that contains the method that is called asynchronously, and the class that contains the `Main` method that makes the call.

For more information and more examples of calling methods asynchronously by using delegates, see Calling Synchronous Methods Asynchronously.

_Code sample not included: ~/snippets/csharp/System/IAsyncResult/Overview/TestMethod.cs._

_Code sample not included: ~/snippets/csharp/System/IAsyncResult/Overview/waithandle.cs._

## IAsyncResult.CompletedSynchronously property

```csharp
public bool CompletedSynchronously { get; }
```

Gets a value that indicates whether the asynchronous operation completed synchronously.

Returns: `true` if the asynchronous operation completed synchronously; otherwise, `false`.

#### Remarks
If the synchronous completion of the call is detected in the `AsyncCallback` delegate, it is probable that the thread that initiated the asynchronous operation is the current thread.

## IAsyncResult.IsCompleted property

```csharp
public bool IsCompleted { get; }
```

Gets a value that indicates whether the asynchronous operation has completed.

Returns: `true` if the operation is complete; otherwise, `false`.

#### Remarks
When this property is `true`, you can assume it is safe to discard any resources you allocate for use by the asynchronous operation.

#### Examples
The following example shows how to use the `IsCompleted` property of the `IAsyncResult` to discover when an asynchronous call completes. In this case, the asynchronous call is made by using the `BeginInvoke` method of a delegate. You might use the `IsCompleted` property to poll for completion when making the asynchronous call from a thread that services the user interface. Polling for completion allows the calling thread to continue executing while the asynchronous call executes on a `ThreadPool` thread.

The example consists of two classes: the class that contains the method that is called asynchronously, and the class that contains the `Main` method that makes the call.

For more information and more examples of calling methods asynchronously by using delegates, see Calling Synchronous Methods Asynchronously.

_Code sample not included: ~/snippets/csharp/System/IAsyncResult/Overview/TestMethod.cs._

_Code sample not included: ~/snippets/csharp/System/IAsyncResult/Overview/polling.cs._
