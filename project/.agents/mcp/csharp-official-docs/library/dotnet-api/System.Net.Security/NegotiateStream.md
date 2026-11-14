---
title: "NegotiateStream class (part 1 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/NegotiateStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NegotiateStream class

Namespace: `System.Net.Security`

```csharp
public class NegotiateStream : System.Net.Security.AuthenticatedStream
```

Provides a stream that uses the Negotiate security protocol to authenticate the client, and optionally the server, in client-server communication.

#### Remarks
Use the `NegotiateStream` class for authentication and to help secure information transmitted between a client and a server. Using `NegotiateStream`, you can do the following.

- Send the client's credentials to the server for Impersonation or Delegation.
- Request server authentication.
- Encrypt and/or sign data before transmitting it.

Authentication must be performed before transmitting information. Clients request authentication using the synchronous `NegotiateStream.AuthenticateAsClient` methods, which block until the authentication completes, or the asynchronous `NegotiateStream.BeginAuthenticateAsClient` methods, which do not block while waiting for the authentication to complete. Servers request authentication using the synchronous `NegotiateStream.AuthenticateAsServer` or asynchronous `NegotiateStream.BeginAuthenticateAsServer` methods. The client, and optionally the server, is authenticated using the Negotiate security protocol. The Kerberos protocol is used for authentication if both client and server support it; otherwise NTLM is used. The `NegotiateStream` class performs the authentication using the Security Support Provider Interface (SSPI).

When authentication succeeds, you must check the `NegotiateStream.IsEncrypted` and `NegotiateStream.IsSigned` properties to determine what security services will be used by the `NegotiateStream` to help secure your data during transmission. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred. You can get information about the remote client or server using the `RemoteIdentity` property.

If the authentication fails, you will receive an `AuthenticationException` or a `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.

You send data using the synchronous `NegotiateStream.Write` or asynchronous `NegotiateStream.BeginWrite` or `NegotiateStream.WriteAsync` methods. You receive data using the synchronous `NegotiateStream.Read` or asynchronous `NegotiateStream.ReadAsync` or `NegotiateStream.BeginRead` methods. If security services such as encryption or signing are enabled, these are automatically applied to your data by the `NegotiateStream`.

The `NegotiateStream` transmits data using a stream that you supply when creating the `NegotiateStream`. When you supply this underlying stream, you have the option to specify whether closing the `NegotiateStream` also closes the underlying stream.

#### Examples

The following example demonstrates the client side of a client-server connection that uses the `NegotiateStream`. The client authenticates and sends a message to the server asynchronously.

_Code sample not included: ~/snippets/csharp/System.Net.Security/AuthenticatedStream/Overview/client.cs._

The following code example demonstrates the server side of a client-server connection that uses the `NegotiateStream` to authenticate the client and read a message sent by the client.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/Overview/server.cs._

## NegotiateStream.NegotiateStream(Stream) constructor

```csharp
public NegotiateStream (System.IO.Stream innerStream);
```

Initializes a new instance of the `NegotiateStream` class using the specified `Stream`.

Parameters:

- `innerStream`: A `Stream` object used by the `NegotiateStream` for sending and receiving data.

#### Examples

The following code example demonstrates calling this constructor.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/.ctor/client.cs._

## NegotiateStream.NegotiateStream(Stream, Boolean) constructor

```csharp
public NegotiateStream (System.IO.Stream innerStream, bool leaveInnerStreamOpen);
```

Initializes a new instance of the `NegotiateStream` class using the specified `Stream` and stream closure behavior.

Parameters:

- `innerStream`: A `Stream` object used by the `NegotiateStream` for sending and receiving data.
- `leaveInnerStreamOpen`: `true` to indicate that closing this `NegotiateStream` has no effect on `innerStream`; `false` to indicate that closing this `NegotiateStream` also closes `innerStream`.

Exceptions:

- `ArgumentNullException`: `innerStream` is `null`.

-or-

`innerStream` is equal to `Stream.Null`.

#### Remarks
When you specify `true` for the `leaveStreamOpen` parameter, closing the `NegotiateStream` has no effect on the `innerStream` stream; you must explicitly close `innerStream` when you no longer need it.

#### Examples

The following example demonstrates calling this constructor. This code example is part of a larger example provided for the `NegotiateStream` class.

_Code sample not included: ~/snippets/csharp/System.Net.Security/AuthenticatedStream/Overview/client.cs._

## NegotiateStream.CanRead property

```csharp
public override bool CanRead { get; }
```

Gets a `Boolean` value that indicates whether the underlying stream is readable.

Returns: `true` if authentication has occurred and the underlying stream is readable; otherwise, `false`.

#### Remarks
If successful authentication has occurred, this property returns the value returned by invoking the `CanRead` property on the underlying stream. The underlying stream is specified when you create an instance of the `NegotiateStream` class.

#### Examples

The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/.ctor/client.cs._

## NegotiateStream.CanSeek property

```csharp
public override bool CanSeek { get; }
```

Gets a `Boolean` value that indicates whether the underlying stream is seekable.

Returns: This property always returns `false`.

#### Remarks
You should not attempt to set the position of the `NegotiateStream` object or its underlying stream. The underlying stream is specified when you create an instance of the `NegotiateStream` class.

#### Examples

The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/.ctor/client.cs._

## NegotiateStream.CanTimeout property

```csharp
public override bool CanTimeout { get; }
```

Gets a `Boolean` value that indicates whether the underlying stream supports time-outs.

Returns: `true` if the underlying stream supports time-outs; otherwise, `false`.

#### Remarks
This property returns the value returned by invoking the `CanTimeout` property on the underlying stream. The underlying stream is specified when you create an instance of the `NegotiateStream` class.

#### Examples

The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/.ctor/client.cs._

## NegotiateStream.CanWrite property

```csharp
public override bool CanWrite { get; }
```

Gets a `Boolean` value that indicates whether the underlying stream is writable.

Returns: `true` if authentication has occurred and the underlying stream is writable; otherwise, `false`.

#### Remarks
If successful authentication has occurred, this property returns the value returned by invoking the `CanWrite` property on the underlying stream. The underlying stream is specified when you create an instance of the `NegotiateStream` class.

#### Examples

The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/.ctor/client.cs._

## NegotiateStream.ImpersonationLevel property

```csharp
public virtual System.Security.Principal.TokenImpersonationLevel ImpersonationLevel { get; }
```

Gets a value that indicates how the server can use the client's credentials.

Returns: One of the `TokenImpersonationLevel` values.

Exceptions:

- `InvalidOperationException`: Authentication failed or has not occurred.

#### Remarks
You must successfully authenticate before calling this method. Clients specify the impersonation level when they request authentication by calling one of the `NegotiateStream.AuthenticateAsClient` or `NegotiateStream.BeginAuthenticateAsClient` methods. If you authenticate without specifying a `TokenImpersonationLevel` , `Identification` is used.

#### Examples

The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/.ctor/client.cs._

## NegotiateStream.IsAuthenticated property

```csharp
public override bool IsAuthenticated { get; }
```

Gets a `Boolean` value that indicates whether authentication was successful.

Returns: `true` if successful authentication occurred; otherwise, `false`.

#### Remarks
Clients authenticate by calling the `NegotiateStream.AuthenticateAsClient` or `NegotiateStream.BeginAuthenticateAsClient` methods. Servers authenticate by calling the `NegotiateStream.AuthenticateAsServer` or `NegotiateStream.BeginAuthenticateAsServer` methods.

#### Examples

The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/.ctor/client.cs._

## NegotiateStream.IsEncrypted property

```csharp
public override bool IsEncrypted { get; }
```

Gets a `Boolean` value that indicates whether this `NegotiateStream` uses data encryption.

Returns: `true` if data is encrypted before being transmitted over the network and decrypted when it reaches the remote endpoint; otherwise, `false`.

#### Remarks
Encryption helps to protect the privacy of the data; namely, it helps to ensure that while data is in transit it cannot be deciphered by third parties.

#### Examples

The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/.ctor/client.cs._

## NegotiateStream.IsMutuallyAuthenticated property

```csharp
public override bool IsMutuallyAuthenticated { get; }
```

Gets a `Boolean` value that indicates whether both the server and the client have been authenticated.

Returns: `true` if the server has been authenticated; otherwise, `false`.

#### Remarks
Mutual authentication is specified by the client when the client wants the server to provide credentials for authentication. By default, clients request mutual authentication.

The Negotiate protocol selects either NTLM or Kerberos depending on the security protocols supported by the client and server. NTLM does not support mutual authentication.

#### Examples

The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/.ctor/client.cs._

## NegotiateStream.IsServer property

```csharp
public override bool IsServer { get; }
```

Gets a `Boolean` value that indicates whether the local side of the connection used by this `NegotiateStream` was authenticated as the server.

Returns: `true` if the local endpoint was successfully authenticated as the server side of the authenticated connection; otherwise, `false`.

#### Remarks
If authentication failed or did not occur, this property returns `false`.

To authenticate as the server, call the `NegotiateStream.AuthenticateAsServer` or `NegotiateStream.BeginAuthenticateAsServer` methods.

#### Examples

The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/.ctor/client.cs._

## NegotiateStream.IsSigned property

```csharp
public override bool IsSigned { get; }
```

Gets a `Boolean` value that indicates whether the data sent using this stream is signed.

Returns: `true` if the data is signed before being transmitted; otherwise, `false`.

#### Remarks
Data signing helps to protect the integrity of the data; namely, it helps the recipient determine whether the data has been tampered with while in transit.

#### Examples

The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/.ctor/client.cs._

## NegotiateStream.Length property

```csharp
public override long Length { get; }
```

Gets the length of the underlying stream.

Returns: A `Int64` that specifies the length of the underlying stream.

Exceptions:

- `NotSupportedException`: Getting the value of this property is not supported when the underlying stream is a `NetworkStream`.

#### Remarks
This property returns the value returned by invoking the `Length` property on the underlying stream. If the underlying stream is not seekable, this property will typically throw an exception. The run-time type of the underlying stream determines the run-time type of the exception that is thrown.

#### Examples

The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/.ctor/client.cs._

## NegotiateStream.Position property

```csharp
public override long Position { get; set; }
```

Gets or sets the current position in the underlying stream.

Returns: A `Int64` that specifies the current position in the underlying stream.

Exceptions:

- `NotSupportedException`: Setting this property is not supported.

-or-

Getting the value of this property is not supported when the underlying stream is a `NetworkStream`.

#### Remarks
This property returns the value returned by invoking the `Position` property on the underlying stream. If the underlying stream is not seekable, this property will typically throw an exception. The run-time type of the underlying stream determines the run-time type of the exception that is thrown.

## NegotiateStream.ReadTimeout property

```csharp
public override int ReadTimeout { get; set; }
```

Gets or sets the amount of time a read operation blocks waiting for data.

Returns: A `Int32` that specifies the amount of time that will elapse before a read operation fails.

#### Remarks
This property returns the value returned by invoking the `ReadTimeout` property on the underlying stream. When you set this property, the `Stream.ReadTimeout` value on the underlying stream is set to the specified value.

If the underlying stream is a `NetworkStream`, `NegotiateStream.ReadTimeout` is in milliseconds and is set to `Infinite` by default so that read operations do not time out.

#### Examples

The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/.ctor/client.cs._
