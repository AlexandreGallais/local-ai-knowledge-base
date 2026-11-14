---
title: "HttpListener class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpListener class (part 3 of 3)

## HttpListener.GetContextAsync() method

```csharp
public System.Threading.Tasks.Task<System.Net.HttpListenerContext> GetContextAsync ();
```

Waits for an incoming request as an asynchronous operation.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns an `HttpListenerContext` object that represents a client request.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete when the incoming request has been received.

Before calling this method, you must call the `HttpListener.Start` method and add at least one URI prefix to listen for by adding the URI strings to the `HttpListenerPrefixCollection` returned by the `Prefixes` property. For a detailed description of prefixes, see the `HttpListener` class overview.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `GetContext`.

## HttpListener.Start() method

```csharp
public void Start ();
```

Allows this instance to receive incoming requests.

Exceptions:

- `HttpListenerException`: A Win32 function call failed. Check the exception's `HttpListenerException.ErrorCode` property to determine the cause of the exception.
- `ObjectDisposedException`: This object is closed.

#### Remarks
This method must be called before you call the `HttpListener.GetContext` or `HttpListener.BeginGetContext` method.

After you have started an `HttpListener` object, you can use the `HttpListener.Stop` method to stop it.

> **Note:**
> If this listener instance uses https, you must install and select a Server Certificate. Otherwise, an `HttpWebRequest` query of this `HttpListener` will fail with an unexpected close of the connection. You can configure Server Certificates and other listener options by using HttpCfg.exe.

#### Examples
The following code example demonstrates using the `HttpListener.Start` method to begin processing incoming requests.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListener.Stop() method

```csharp
public void Stop ();
```

Causes this instance to stop receiving new incoming requests and terminates processing of all ongoing requests.

Exceptions:

- `ObjectDisposedException`: This object has been closed.

#### Remarks
If this instance is already stopped, calling this method has no effect.

After you have stopped an `HttpListener` object, you can use the `HttpListener.Start` method to restart it.

This method does not block to finish sending responses for currently accepted connections.

#### Examples

The following code example demonstrates using the `HttpListener.Stop` method to stop processing incoming requests.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListener.System.IDisposable.Dispose() method

```csharp
void IDisposable.Dispose ();
```

Releases the resources held by this `HttpListener` object.

#### Remarks
Applications should use the `HttpListener.Close` method instead of calling this method.
