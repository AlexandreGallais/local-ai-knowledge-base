---
title: "HttpListener class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpListener class (part 2 of 3)

## HttpListener.ExtendedProtectionSelectorDelegate property

```csharp
public System.Net.HttpListener.ExtendedProtectionSelector? ExtendedProtectionSelectorDelegate { get; set; }
```

Gets or sets the delegate called to determine the `ExtendedProtectionPolicy` to use for each request.

Returns: A `ExtendedProtectionPolicy` that specifies the policy to use for extended protection.

Exceptions:

- `ArgumentException`: An attempt was made to set the `HttpListener.ExtendedProtectionSelectorDelegate` property, but the `ExtendedProtectionPolicy.CustomChannelBinding` property must be `null`.
- `ArgumentNullException`: An attempt was made to set the `HttpListener.ExtendedProtectionSelectorDelegate` property to `null`.
- `InvalidOperationException`: An attempt was made to set the `HttpListener.ExtendedProtectionSelectorDelegate` property after the `HttpListener.Start` method was already called.
- `ObjectDisposedException`: This object is closed.
- `PlatformNotSupportedException`: An attempt was made to set the `HttpListener.ExtendedProtectionSelectorDelegate` property on a platform that does not support extended protection.

#### Remarks
The `ExtendedProtectionPolicy` property is used with integrated Windows authentication to provide extended protection. The `ExtendedProtectionPolicy` property allows the configuration of the extended protection policy for the whole `HttpListener` session. The `ExtendedProtectionSelectorDelegate` property allows the configuration of the extended protection policy per individual request.

The `CustomChannelBinding` property must be `null`. The `HttpListener` instance gets the Channel Binding Token (CBT) directly from its own TLS session if there is one.

For each request, the delegate can choose the settings that the `HttpListener` instance will use to provide extended protection.

If a delegate returns `null` for this property, this represents a `ExtendedProtectionPolicy` that the `PolicyEnforcement` property set to `Never`.

## HttpListener.IgnoreWriteExceptions property

```csharp
public bool IgnoreWriteExceptions { get; set; }
```

Gets or sets a `Boolean` value that specifies whether your application receives exceptions that occur when an `HttpListener` sends the response to the client.

Returns: `true` if this `HttpListener` should not return exceptions that occur when sending the response to the client; otherwise, `false`. The default value is `false`.

Exceptions:

- `ObjectDisposedException`: This object has been closed.

#### Remarks
Set this property to `true` if your application does not require that a response is successfully sent to each client.

#### Examples
The following code example demonstrates setting this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListener.IsListening property

```csharp
public bool IsListening { get; }
```

Gets a value that indicates whether `HttpListener` has been started.

Returns: `true` if the `HttpListener` was started; otherwise, `false`.

#### Remarks
To start an `HttpListener`, call the `HttpListener.Start` method.

#### Examples
The following code example demonstrates using this property to determine the listening state of an instance.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListener.IsSupported property

```csharp
public static bool IsSupported { get; }
```

Gets a value that indicates whether `HttpListener` can be used with the current operating system.

Returns: `true` on all platforms.

#### Examples
The following code example demonstrates the use of the `IsSupported` property to detect whether an `HttpListener` object can be used with the current operating system.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListener.Prefixes property

```csharp
public System.Net.HttpListenerPrefixCollection Prefixes { get; }
```

Gets the Uniform Resource Identifier (URI) prefixes handled by this `HttpListener` object.

Returns: An `HttpListenerPrefixCollection` that contains the URI prefixes that this `HttpListener` object is configured to handle.

Exceptions:

- `ObjectDisposedException`: This object has been closed.

#### Remarks
The prefixes are in canonical form. For a detailed description of prefixes, see the `HttpListener` class overview.

#### Examples
The following code example demonstrates using the `Prefixes` property to obtain and print the URI prefixes that are handled.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListener.Realm property

```csharp
public string? Realm { get; set; }
```

Gets or sets the realm, or resource partition, associated with this `HttpListener` object.

Returns: A `String` value that contains the name of the realm associated with the `HttpListener` object.

Exceptions:

- `ObjectDisposedException`: This object has been closed.

#### Remarks
Servers use realms to partition protected resources; each partition can have its own authentication scheme and/or authorization database. Realms are used only for basic and digest authentication. After a client successfully authenticates, the authentication is valid for all resources in a given realm. For a detailed description of realms, see RFC 2617 at https://www.ietf.org/.

An instance of `HttpListener` has only one associated realm.

#### Examples
The following code example demonstrates setting the `Realm` property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListener.TimeoutManager property

```csharp
public System.Net.HttpListenerTimeoutManager TimeoutManager { get; }
```

The timeout manager for this `HttpListener` instance.

Returns: The timeout manager for this `HttpListener` instance.

#### Remarks
The timeout manager defines the connection timeout limits for this `HttpListener` instance.

## HttpListener.UnsafeConnectionNtlmAuthentication property

```csharp
public bool UnsafeConnectionNtlmAuthentication { get; set; }
```

Gets or sets a `Boolean` value that controls whether, when NTLM is used, additional requests using the same Transmission Control Protocol (TCP) connection are required to authenticate.

Returns: `true` if the `IIdentity` of the first request will be used for subsequent requests on the same connection; otherwise, `false`. The default value is `false`.

Exceptions:

- `ObjectDisposedException`: This object has been closed.

#### Remarks
When this property is set to `true` and the first request over a particular TCP connection is authenticated using NTLM, subsequent requests over the same TCP connection are processed using the authentication information (`IIdentity`) of the initial request.

This property has no effect when NTLM is not the authentication protocol. When Negotiate is specified as the authentication protocol, this property has an effect only if NTLM is the actual protocol used for authentication.

> **Note:**
> While setting this property to `true` increases performance because the `HttpListener` does not send additional NTLM authentication challenges, there is a security risk in not requiring all requests to provide authentication information. You must determine whether the increase in performance is worth this risk.

#### Examples
The following code example demonstrates setting this property.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListener.Abort() method

```csharp
public void Abort ();
```

Shuts down the `HttpListener` object immediately, discarding all currently queued requests.

#### Remarks
This method disposes of all resources held by this listener. Any pending requests are unable to complete.

After calling this method, you will receive an `ObjectDisposedException` if you attempt to use this `HttpListener`.

#### Examples
The following code example demonstrates calling this method.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListener.BeginGetContext(AsyncCallback, Object) method

```csharp
public IAsyncResult BeginGetContext (AsyncCallback? callback, object? state);
```

Begins asynchronously retrieving an incoming request.

Parameters:

- `callback`: An `AsyncCallback` delegate that references the method to invoke when a client request is available.
- `state`: A user-defined object that contains information about the operation. This object is passed to the `callback` delegate when the operation completes.

Returns: An `IAsyncResult` object that indicates the status of the asynchronous operation.

Exceptions:

- `HttpListenerException`: A Win32 function call failed. Check the exception's `HttpListenerException.ErrorCode` property to determine the cause of the exception.
- `InvalidOperationException`: This object has not been started or is currently stopped.
- `ObjectDisposedException`: This object is closed.

#### Remarks
The `HttpListener.BeginGetContext` method begins an asynchronous (non-blocking) call to receive incoming client requests. Before calling this method, you must call the `HttpListener.Start` method and add at least one Uniform Resource Identifier (URI) prefix to listen for by adding the URI strings to the `HttpListenerPrefixCollection` returned by the `Prefixes` property.

The asynchronous operation must be completed by calling the `HttpListener.EndGetContext` method. Typically, the method is invoked by the `callback` delegate.

This method does not block while the operation completes. To get an incoming request and block until the operation completes, call the `HttpListener.GetContext` method.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously.

#### Examples
The following code example demonstrates using the `HttpListener.BeginGetContext` method to specify a callback method that will handle incoming client requests.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

The following code example implements a callback method.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListener.Close() method

```csharp
public void Close ();
```

Shuts down the `HttpListener`.

#### Remarks
After calling this method, you can no longer use the `HttpListener` object. To temporarily pause an `HttpListener` object, use the `HttpListener.Stop` method.

This method shut downs the `HttpListener` object without processing queued requests. Any pending requests are unable to complete.

#### Examples

The following code example demonstrates calling the `Close` method:

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListener.EndGetContext(IAsyncResult) method

```csharp
public System.Net.HttpListenerContext EndGetContext (IAsyncResult asyncResult);
```

Completes an asynchronous operation to retrieve an incoming client request.

Parameters:

- `asyncResult`: An `IAsyncResult` object that was obtained when the asynchronous operation was started.

Returns: An `HttpListenerContext` object that represents the client request.

Exceptions:

- `ArgumentException`: `asyncResult` was not obtained by calling the `HttpListener.BeginGetContext` method.
- `ArgumentNullException`: `asyncResult` is `null`.
- `HttpListenerException`: A Win32 function call failed. Check the exception's `HttpListenerException.ErrorCode` property to determine the cause of the exception.
- `InvalidOperationException`: The `HttpListener.EndGetContext` method was already called for the specified `asyncResult` object.
- `ObjectDisposedException`: This object is closed.

#### Remarks
The `HttpListener.EndGetContext` method is called, usually within an application-defined callback method invoked by a delegate, to obtain the `HttpListenerContext` object that contains an incoming client request and its associated response. This method completes an operation previously started by calling the `HttpListener.BeginGetContext` method. If the operation has not completed, this method blocks until it does.

Because calling the `HttpListener.EndGetContext` method requires the `HttpListener` object, this object is typically passed into a callback method by using the state object passed into the `HttpListener.BeginGetContext` method. You can obtain this state object by using the `AsyncState` property of the `asyncResult` object.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously.

#### Examples
The following code example shows the implementation of a callback method that calls the `HttpListener.EndGetContext` method.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListener.GetContext() method

```csharp
public System.Net.HttpListenerContext GetContext ();
```

Waits for an incoming request and returns when one is received.

Returns: An `HttpListenerContext` object that represents a client request.

Exceptions:

- `HttpListenerException`: A Win32 function call failed. Check the exception's `HttpListenerException.ErrorCode` property to determine the cause of the exception.
- `InvalidOperationException`: This object has not been started or is currently stopped.

-or-

The `HttpListener` does not have any Uniform Resource Identifier (URI) prefixes to respond to.
- `ObjectDisposedException`: This object is closed.

#### Remarks
Before calling this method, you must call the `HttpListener.Start` method and add at least one URI prefix to listen for by adding the URI strings to the `HttpListenerPrefixCollection` returned by the `Prefixes` property. For a detailed description of prefixes, see the `HttpListener` class overview.

This method blocks while waiting for an incoming request. If you want incoming requests to be processed asynchronously (on separate threads) so that your application does not block, use the `HttpListener.BeginGetContext` method.

#### Examples
The following code example demonstrates calling this method.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._
