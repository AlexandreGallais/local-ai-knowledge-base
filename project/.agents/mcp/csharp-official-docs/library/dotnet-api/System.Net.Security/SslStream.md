---
title: "SslStream class (part 1 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/SslStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SslStream class

Namespace: `System.Net.Security`

```csharp
public class SslStream : System.Net.Security.AuthenticatedStream
```

Provides a stream used for client-server communication that uses the Secure Socket Layer (SSL) security protocol to authenticate the server and optionally the client.

#### Remarks
SSL protocols help to provide confidentiality and integrity checking for messages transmitted using an `SslStream`. An SSL connection, such as that provided by `SslStream`, should be used when communicating sensitive information between a client and a server. Using an `SslStream` helps to prevent anyone from reading and tampering with information while it is in transit on the network.

An `SslStream` instance transmits data using a stream that you supply when creating the `SslStream`. When you supply this underlying stream, you have the option to specify whether closing the `SslStream` also closes the underlying stream. Typically, the `SslStream` class is used with the `TcpClient` and `TcpListener` classes. The `TcpClient.GetStream` method provides a `NetworkStream` suitable for use with the `SslStream` class.

After creating an `SslStream`, the server and optionally, the client must be authenticated. The server must provide an X509 certificate that establishes proof of its identity and can request that the client also do so. Authentication must be performed before transmitting information using an `SslStream`. Clients initiate authentication using the synchronous `SslStream.AuthenticateAsClient` methods, which block until the authentication completes, or the asynchronous `SslStream.BeginAuthenticateAsClient` methods, which do not block waiting for the authentication to complete. Servers initiate authentication using the synchronous `SslStream.AuthenticateAsServer` or asynchronous `SslStream.BeginAuthenticateAsServer` methods. Both client and server must initiate the authentication.

The authentication is handled by the Security Support Provider (SSPI) channel provider. The client is given an opportunity to control validation of the server's certificate by specifying a `RemoteCertificateValidationCallback` delegate when creating an `SslStream`. The server can also control validation by supplying a `RemoteCertificateValidationCallback` delegate. The method referenced by the delegate includes the remote party's certificate and any errors SSPI encountered while validating the certificate. Note that if the server specifies a delegate, the delegate's method is invoked regardless of whether the server requested client authentication. If the server did not request client authentication, the server's delegate method receives a null certificate and an empty array of certificate errors.

If the server requires client authentication, the client must specify one or more certificates for authentication. If the client has more than one certificate, the client can provide a `LocalCertificateSelectionCallback` delegate to select the correct certificate for the server. The client's certificates must be located in the current user's "My" certificate store. Client authentication via certificates is not supported for the `Ssl2` (SSL version 2) protocol.

If the authentication fails, you receive a `AuthenticationException`, and the `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

When the authentication process, also known as the SSL handshake, succeeds, the identity of the server (and optionally, the client) is established and the `SslStream` can be used by the client and server to exchange messages. Before sending or receiving information, the client and server should check the security services and levels provided by the `SslStream` to determine whether the protocol, algorithms, and strengths selected meet their requirements for integrity and confidentiality. If the current settings are not sufficient, the stream should be closed. You can check the security services provided by the `SslStream` using the `SslStream.IsEncrypted` and `SslStream.IsSigned` properties. The following table shows the elements that report the cryptographic settings used for authentication, encryption and data signing.

|Element|Members|
|-------------|-------------|
|The security protocol used to authenticate the server and, optionally, the client.|The `SslProtocol` property and the associated `SslProtocols` enumeration.|
|The key <example-value> algorithm.|The `KeyExchangeAlgorithm` property and the associated `ExchangeAlgorithmType` enumeration.|
|The message integrity algorithm.|The `HashAlgorithm` property and the associated `HashAlgorithmType` enumeration.|
|The message confidentiality algorithm.|The `CipherAlgorithm` property and the associated `CipherAlgorithmType` enumeration.|
|The strengths of the selected algorithms.|The `SslStream.KeyExchangeStrength`, `SslStream.HashStrength`, and `SslStream.CipherStrength` properties.|

After a successful authentication, you can send data using the synchronous `SslStream.Write` or asynchronous `SslStream.BeginWrite` methods. You can receive data using the synchronous `SslStream.Read` or asynchronous `SslStream.BeginRead` methods.

If you specified to the `SslStream.%23ctor` that the underlying stream should be left open, you are responsible for closing that stream when you are done using it.

> **Note:**
>  If the application that creates the `SslStream` object runs with the credentials of a Normal user, the application will not be able to access certificates installed in the local machine store unless permission has been explicitly given to the user to do so.

`SslStream` assumes that a timeout along with any other `IOException` when one is thrown from the inner stream will be treated as fatal by its caller. Reusing a `SslStream` instance after a timeout will return garbage. An application should `Stream.Close` the `SslStream` and throw an exception in these cases.

To opt out of the behavior that blocks insecure cipher and hashing algorithms for connections in order to maintain interoperability with your existing SSL3 services OR TLS w/ RC4 services, see Cannot connect to a server by using the ServicePointManager or SslStream APIs after upgrade to .NET Framework 4.6.

Use the overloads for methods that authenticate SslStreams that don't specify a TLS version, but instead use the TLS version defined as the system default in SCHANNEL, as a way to be able to later modify the defaults, without the need to rebuild and redeploy your app.

#### Examples
The following code example demonstrates creating an `TcpListener` that uses the `SslStream` class to communicate with clients.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

The following code example demonstrates creating a `TcpClient` that uses the `SslStream` class to communicate with a server.

_Code sample not included: ~/snippets/csharp/System.Net.Security/RemoteCertificateValidationCallback/Overview/clientsync.cs._

## SslStream.SslStream(Stream) constructor

```csharp
public SslStream (System.IO.Stream innerStream);
```

Initializes a new instance of the `SslStream` class using the specified `Stream`.

Parameters:

- `innerStream`: A `Stream` object used by the `SslStream` for sending and receiving data.

Exceptions:

- `ArgumentException`: `innerStream` is not readable.

-or-

`innerStream` is not writable.
- `ArgumentNullException`: `innerStream` is `null`.

-or-

`innerStream` is equal to `Stream.Null`.

#### Remarks
If a value is not specified in the configuration file for encryptionpolicy, the `EncryptionPolicy` defaults to `RequireEncryption` for the `SslStream` instance that is constructed.

The use of the Null cipher is required when the encryption policy is set to `NoEncryption`.

## SslStream.SslStream(Stream, Boolean) constructor

```csharp
public SslStream (System.IO.Stream innerStream, bool leaveInnerStreamOpen);
```

Initializes a new instance of the `SslStream` class using the specified `Stream` and stream closure behavior.

Parameters:

- `innerStream`: A `Stream` object used by the `SslStream` for sending and receiving data.
- `leaveInnerStreamOpen`: A Boolean value that indicates the closure behavior of the `Stream` object used by the `SslStream` for sending and receiving data. This parameter indicates if the inner stream is left open.

Exceptions:

- `ArgumentException`: `innerStream` is not readable.

-or-

`innerStream` is not writable.
- `ArgumentNullException`: `innerStream` is `null`.

-or-

`innerStream` is equal to `Stream.Null`.

#### Remarks
When you specify `true` for the `leaveStreamOpen` parameter, closing the `SslStream` has no effect on the `innerStream` stream; you must explicitly close `innerStream` when you no longer need it.

If a value is not specified in the configuration file for encryptionpolicy, the `EncryptionPolicy` defaults to `RequireEncryption` for the `SslStream` instance that is constructed.

The use of the Null cipher is required when the encryption policy is set to `NoEncryption`.

#### Examples
The following code example demonstrates calling this constructor.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.SslStream(Stream, Boolean, RemoteCertificateValidationCallback) constructor

```csharp
public SslStream (System.IO.Stream innerStream, bool leaveInnerStreamOpen, System.Net.Security.RemoteCertificateValidationCallback? userCertificateValidationCallback);
```

Initializes a new instance of the `SslStream` class using the specified `Stream`, stream closure behavior and certificate validation delegate.

Parameters:

- `innerStream`: A `Stream` object used by the `SslStream` for sending and receiving data.
- `leaveInnerStreamOpen`: A Boolean value that indicates the closure behavior of the `Stream` object used by the `SslStream` for sending and receiving data. This parameter indicates if the inner stream is left open.
- `userCertificateValidationCallback`: A `RemoteCertificateValidationCallback` delegate responsible for validating the certificate supplied by the remote party.

Exceptions:

- `ArgumentException`: `innerStream` is not readable.

-or-

`innerStream` is not writable.
- `ArgumentNullException`: `innerStream` is `null`.

-or-

`innerStream` is equal to `Stream.Null`.

#### Remarks
When you specify `true` for the `leaveStreamOpen` parameter, closing the `SslStream` has no effect on the `innerStream` stream; you must explicitly close `innerStream` when you no longer need it.

The `userCertificateValidationCallback` delegate's `certificateErrors` argument contains any Windows error codes returned by the channel Security Support Provider Interface (SSPI). The return value of the method invoked by the `userCertificateValidationCallback` delegate determines whether authentication succeeds.

The security protocol and cryptographic algorithms are already selected when the `userCertificateValidationCallback` delegate's method is invoked. You can use the method to determine whether the selected cryptographic algorithms and strengths are sufficient for your application. If not, the method should return `false` to prevent the `SslStream` from being created.

If a value is not specified in the configuration file for encryptionpolicy, the `EncryptionPolicy` defaults to `RequireEncryption` for the `SslStream` instance that is constructed.

The use of the Null cipher is required when the encryption policy is set to `NoEncryption`.

> **Note:**
> .NET caches SSL sessions as they are created and attempts to reuse a cached session for subsequent requests, if possible. When attempting to reuse an SSL session, .NET uses the first element of the `X509Certificate2Collection` provided during authentication (if there is one), or tries to reuse an anonymous session if the certificate collection is empty.

> **Note:**
> Client certificates are not supported in the SSL version 2 protocol.

#### Examples
The following code example creates an `SslStream` and initiates the client portion of the authentication.

_Code sample not included: ~/snippets/csharp/System.Net.Security/RemoteCertificateValidationCallback/Overview/clientsync.cs._
