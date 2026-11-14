---
title: "AuthenticatedStream class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/AuthenticatedStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AuthenticatedStream class

Namespace: `System.Net.Security`

```csharp
public abstract class AuthenticatedStream : System.IO.Stream
```

Provides methods for passing credentials <example-value> a stream and requesting or performing authentication for client-server applications.

#### Remarks
This abstract class provides methods and properties that are common to authenticated streams.

Authenticated streams can provide authentication, data signing, and encryption services that can help maintain the integrity and confidentiality of data transmitted using the `AuthenticatedStream.InnerStream`.

The security protocol implemented by a class that derives from `AuthenticatedStream` together with the security protocols supported on the client and server will determine the security features that are available to an application. The `NegotiateStream` and `SslStream` classes inherit from `AuthenticatedStream` and implement the Negotiate and Secure Sockets Layer security protocols, respectively.

#### Examples
The following example demonstrates displaying the properties of an authenticated stream.

_Code sample not included: ~/snippets/csharp/System.Net.Security/AuthenticatedStream/Overview/client.cs._

## AuthenticatedStream.AuthenticatedStream(Stream, Boolean) constructor

```csharp
protected AuthenticatedStream (System.IO.Stream innerStream, bool leaveInnerStreamOpen);
```

Initializes a new instance of the `AuthenticatedStream` class.

Parameters:

- `innerStream`: A `Stream` object used by the `AuthenticatedStream` for sending and receiving data.
- `leaveInnerStreamOpen`: A `Boolean` that indicates whether closing this `AuthenticatedStream` object also closes `innerStream`.

Exceptions:

- `ArgumentNullException`: `innerStream` is `null`.

-or-

`innerStream` is equal to `Stream.Null`.

#### Remarks
When you specify `true` for the `leaveStreamOpen` parameter, closing the `AuthenticatedStream` has no effect on the `innerStream` stream.

This constructor is provided for implementers of authenticated streams, and can be called only by classes that are derived from `AuthenticatedStream`.

## AuthenticatedStream.InnerStream property

```csharp
protected System.IO.Stream InnerStream { get; }
```

Gets the stream used by this `AuthenticatedStream` for sending and receiving data.

Returns: A `Stream` object.

#### Remarks
Classes that inherit from `AuthenticatedStream` can use this property to access the stream passed to the `%23ctor`.

## AuthenticatedStream.IsAuthenticated property

```csharp
public abstract bool IsAuthenticated { get; }
```

Gets a `Boolean` value that indicates whether authentication was successful.

Returns: `true` if successful authentication occurred; otherwise, `false`.

#### Remarks
The methods called to perform authentication are defined in the classes that inherit from `AuthenticatedStream`.

#### Examples
The following example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/AuthenticatedStream/Overview/client.cs._

## AuthenticatedStream.IsEncrypted property

```csharp
public abstract bool IsEncrypted { get; }
```

Gets a `Boolean` value that indicates whether data sent using this `AuthenticatedStream` is encrypted.

Returns: `true` if data is encrypted before being transmitted over the network and decrypted when it reaches the remote endpoint; otherwise, `false`.

#### Remarks
Encryption helps to protect the privacy of the data; namely, it helps to ensure that while data is in transit, it cannot be deciphered by third parties.

#### Examples
The following example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/AuthenticatedStream/Overview/client.cs._

## AuthenticatedStream.IsMutuallyAuthenticated property

```csharp
public abstract bool IsMutuallyAuthenticated { get; }
```

Gets a `Boolean` value that indicates whether both server and client have been authenticated.

Returns: `true` if the client and server have been authenticated; otherwise, `false`.

#### Remarks
Not all security protocols support mutual authentication. To determine whether mutual authentication is supported by the security protocol implemented in a class that inherits from `AuthenticatedStream`, check the class documentation.

#### Examples
The following example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/AuthenticatedStream/Overview/client.cs._

## AuthenticatedStream.IsServer property

```csharp
public abstract bool IsServer { get; }
```

Gets a `Boolean` value that indicates whether the local side of the connection was authenticated as the server.

Returns: `true` if the local endpoint was authenticated as the server side of a client-server authenticated connection; `false` if the local endpoint was authenticated as the client.

#### Remarks
Most security protocols used for client-server authentication define specific behavior and requirements for supplying credentials for authentication based on whether you are the client or the server.

#### Examples
The following example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/AuthenticatedStream/Overview/client.cs._

## AuthenticatedStream.IsSigned property

```csharp
public abstract bool IsSigned { get; }
```

Gets a `Boolean` value that indicates whether the data sent using this stream is signed.

Returns: `true` if the data is signed before being transmitted; otherwise, `false`.

#### Remarks
Data signing helps to protect the integrity of the data; namely, it helps the recipient determine whether the data has been tampered with while in transit.

#### Examples
The following example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/AuthenticatedStream/Overview/client.cs._

## AuthenticatedStream.LeaveInnerStreamOpen property

```csharp
public bool LeaveInnerStreamOpen { get; }
```

Gets whether the stream used by this `AuthenticatedStream` for sending and receiving data has been left open.

Returns: `true` if the inner stream has been left open; otherwise, `false`.

#### Remarks
When set to `true`, the stream passed to the constructor of this class will not be closed after the instance of this class is closed. When set to `false`, closing the instance of this class will also close the underlying transport stream. The default value of this property is `false`.

## AuthenticatedStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `AuthenticatedStream` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is true, this method releases all resources held by any managed objects that this `AuthenticatedStream` references. This method invokes the `Dispose()` method of each referenced object.

## AuthenticatedStream.DisposeAsync() method

```csharp
public override System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously releases the unmanaged and managed resources used by the `AuthenticatedStream`.

Returns: A task that represents the asynchronous dispose operation.

#### Remarks
This method allows performing resource-intensive dispose operations without blocking the main thread.

This method also disposes the inner stream when `LeaveInnerStreamOpen` is `false`; otherwise, the inner stream is just flushed.

Calling `DisposeAsync` allows the resources used by the `AuthenticatedStream` to be reallocated for other purposes. For more information, see Cleaning Up Unmanaged Resources.
