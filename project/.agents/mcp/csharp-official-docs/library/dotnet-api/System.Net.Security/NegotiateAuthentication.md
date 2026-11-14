---
title: "NegotiateAuthentication class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/NegotiateAuthentication.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NegotiateAuthentication class

Namespace: `System.Net.Security`

```csharp
public sealed class NegotiateAuthentication : IDisposable
```

Represents a stateful authentication exchange that uses the Negotiate, NTLM, or Kerberos security protocols to authenticate the client or server, in client-server communication.

NTLM is a legacy authentication protocol and should be used only when required for compatibility with existing systems. Prefer Kerberos or another modern authentication protocol when possible. Negotiate can select NTLM when Kerberos is unavailable.

## NegotiateAuthentication.NegotiateAuthentication(NegotiateAuthenticationClientOptions) constructor

```csharp
public NegotiateAuthentication (System.Net.Security.NegotiateAuthenticationClientOptions clientOptions);
```

Initializes a new instance of the `NegotiateAuthentication` for client-side authentication session.

Parameters:

- `clientOptions`: The property bag for the authentication options.

To be added.

## NegotiateAuthentication.NegotiateAuthentication(NegotiateAuthenticationServerOptions) constructor

```csharp
public NegotiateAuthentication (System.Net.Security.NegotiateAuthenticationServerOptions serverOptions);
```

Initializes a new instance of the `NegotiateAuthentication` for server-side authentication session.

Parameters:

- `serverOptions`: The property bag for the authentication options.

To be added.

## NegotiateAuthentication.ImpersonationLevel property

```csharp
public System.Security.Principal.TokenImpersonationLevel ImpersonationLevel { get; }
```

Gets a value that indicates the negotiated level of impersonation.

Returns: To be added.

To be added.

## NegotiateAuthentication.IsAuthenticated property

```csharp
public bool IsAuthenticated { get; }
```

Gets a value that indicates whether the authentication exchange has completed.

Returns: `true` if the authentication exchange has completed; otherwise, `false`.

#### Remarks

This property indicates whether the authentication exchange has completed, not whether authentication succeeded. A `true` value can be returned after either successful authentication or a terminal authentication failure.

To determine whether authentication actually succeeded, inspect the `NegotiateAuthenticationStatusCode` returned by the most recent call to `NegotiateAuthentication.GetOutgoingBlob`. The status is `Completed` on success; any other value indicates that authentication didn't complete successfully.

## NegotiateAuthentication.IsEncrypted property

```csharp
public bool IsEncrypted { get; }
```

Gets a value that indicates whether data encryption was negotiated.

Returns: To be added.

To be added.

## NegotiateAuthentication.IsMutuallyAuthenticated property

```csharp
public bool IsMutuallyAuthenticated { get; }
```

Gets a value that indicates whether both server and client have been authenticated.

Returns: To be added.

To be added.

## NegotiateAuthentication.IsServer property

```csharp
public bool IsServer { get; }
```

Gets a value that indicates whether the local side of the authentication is representing the server.

Returns: To be added.

To be added.

## NegotiateAuthentication.IsSigned property

```csharp
public bool IsSigned { get; }
```

Gets a value that indicates whether data signing was negotiated.

Returns: To be added.

To be added.

## NegotiateAuthentication.Package property

```csharp
public string Package { get; }
```

Gets the name of the negotiated authentication package.

Returns: To be added.

#### Remarks

The negotiated authentication package is only available when the session
authentication was finished (see `IsAuthenticated`). For
unfinished authentication sessions, the value is undefined and usually
returns the initial authentication package name specified in
`Package` or
`Package`.

If the Negotiate package was used for authentication, the value of this
property will be Kerberos, NTLM, or any other specific protocol that was
negotiated between both sides of the authentication.

## NegotiateAuthentication.ProtectionLevel property

```csharp
public System.Net.Security.ProtectionLevel ProtectionLevel { get; }
```

Indicates the negotiated level of protection.

Returns: To be added.

#### Remarks

The negotiated level of protection is only available when the session
authentication was finished (see `IsAuthenticated`). The
protection level can be higher than the initially requested protection
level specified by `RequiredProtectionLevel` or
`RequiredProtectionLevel`.

## NegotiateAuthentication.RemoteIdentity property

```csharp
public System.Security.Principal.IIdentity RemoteIdentity { get; }
```

Gets information about the identity of the remote party.

Returns: An `IIdentity` object that describes the identity of the remote endpoint.

Exceptions:

- `InvalidOperationException`: Authentication failed or has not occurred.
- `Win32Exception`: System error occurred when trying to retrieve the identity.

To be added.

## NegotiateAuthentication.TargetName property

```csharp
public string? TargetName { get; }
```

Gets the target name (service principal name) of the server.

Returns: To be added.

#### Remarks

For the server side of the authentication, the property returns the target name
specified by the client after authentication completes successfully.

For the client side of the authentication, the property returns the target name
specified in `TargetName`.

## NegotiateAuthentication.ComputeIntegrityCheck(Byte>, Byte>) method

```csharp
public void ComputeIntegrityCheck (ReadOnlySpan<byte> message, System.Buffers.IBufferWriter<byte> signatureWriter);
```

Computes the integrity check of a given message.

Parameters:

- `message`: Input message for MIC calculation.
- `signatureWriter`: Buffer writer where the MIC is written.

Exceptions:

- `InvalidOperationException`: Authentication failed or has not occurred.

Implements the GSSAPI GetMIC operation.
The method modifies the internal state and may update sequence numbers depending on the selected algorithm. Two successive invocations thus don't produce the same result and it's important to carefully pair GetMIC and VerifyMIC calls on the both sides of the authenticated session.

## NegotiateAuthentication.Dispose() method

```csharp
public void Dispose ();
```

Releases the unmanaged resources used by the `NegotiateAuthentication` and optionally releases the managed resources.

To be added.

## NegotiateAuthentication.GetOutgoingBlob(Byte>, NegotiateAuthenticationStatusCode) method

```csharp
public byte[]? GetOutgoingBlob (ReadOnlySpan<byte> incomingBlob, out System.Net.Security.NegotiateAuthenticationStatusCode statusCode);
```

Evaluates an authentication token sent by the other party and returns a token in response.

Parameters:

- `incomingBlob`: Incoming authentication token, or empty value when initiating the authentication exchange.
- `statusCode`: Status code returned by the authentication provider.

Returns: An outgoing authentication token to be sent to the other party.

#### Remarks

When initiating the authentication exchange, one of the parties starts with an empty incomingBlob parameter.

Successful authentication returns either the `Completed`
or `ContinueNeeded` status code.
Any other status code indicates an unrecoverable error.

When `ContinueNeeded` is returned, the
return value is an authentication token to be transported to the other party.

## NegotiateAuthentication.GetOutgoingBlob(String, NegotiateAuthenticationStatusCode) method

```csharp
public string? GetOutgoingBlob (string? incomingBlob, out System.Net.Security.NegotiateAuthenticationStatusCode statusCode);
```

Evaluates an authentication token sent by the other party and returns a token in response.

Parameters:

- `incomingBlob`: Incoming authentication token, or empty value when initiating the authentication exchange. Encoded as base64.
- `statusCode`: Status code returned by the authentication provider.

Returns: An outgoing authentication token to be sent to the other party, encoded as base64.

#### Remarks

When initiating the authentication exchange, one of the parties starts
with an empty incomingBlob parameter.

Successful authentication returns either the `Completed`
or `ContinueNeeded` status code.
Any other status code indicates an unrecoverable error.

When `ContinueNeeded` is returned, the
return value is an authentication token to be transported to the other party.

## NegotiateAuthentication.Unwrap(Byte>, Byte>, Boolean) method

```csharp
public System.Net.Security.NegotiateAuthenticationStatusCode Unwrap (ReadOnlySpan<byte> input, System.Buffers.IBufferWriter<byte> outputWriter, out bool wasEncrypted);
```

Unwraps an input message with signature or encryption applied by the other party.

Parameters:

- `input`: Input message to be unwrapped.
- `outputWriter`: Buffer writter where the unwrapped message is written.
- `wasEncrypted`: When this method returns, contains a value that indicates whether the wrapped message had encryption applied.

Returns:

`NegotiateAuthenticationStatusCode.Completed` on success.

`NegotiateAuthenticationStatusCode.MessageAltered` if the message signature was invalid.

`NegotiateAuthenticationStatusCode.InvalidToken` if the wrapped message was in invalid format.
Other `NegotiateAuthenticationStatusCode` values on failure.

Exceptions:

- `InvalidOperationException`: Authentication failed or has not occurred.

To be added.

## NegotiateAuthentication.UnwrapInPlace(Byte>, Int32, Int32, Boolean) method

```csharp
public System.Net.Security.NegotiateAuthenticationStatusCode UnwrapInPlace (Span<byte> input, out int unwrappedOffset, out int unwrappedLength, out bool wasEncrypted);
```

Unwraps, in place, an input message with signature or encryption applied by the other party.

Parameters:

- `input`: The input message to be unwrapped. When this method returns, contains the decoded data.
- `unwrappedOffset`: When this method returns, contains the offset in the input buffer where the unwrapped message was written.
- `unwrappedLength`: When this method returns, contains the length of the unwrapped message.
- `wasEncrypted`: When this method returns, contains a value that specifies whether the wrapped message had encryption applied.

Returns:

`NegotiateAuthenticationStatusCode.Completed` on success.

`NegotiateAuthenticationStatusCode.MessageAltered` if the message signature was invalid.

`NegotiateAuthenticationStatusCode.InvalidToken` if the wrapped message was in invalid format.
Other `NegotiateAuthenticationStatusCode` values on failure.

Exceptions:

- `InvalidOperationException`: Authentication failed or has not occurred.

To be added.

## NegotiateAuthentication.VerifyIntegrityCheck(Byte>, Byte>) method

```csharp
public bool VerifyIntegrityCheck (ReadOnlySpan<byte> message, ReadOnlySpan<byte> signature);
```

Verifies the message integrity check of a given message.

Parameters:

- `message`: Input message for MIC calculation.
- `signature`: MIC to be verified.

Returns: `true` if the MIC is successfully verified, otherwise `false`.

Exceptions:

- `InvalidOperationException`: Authentication failed or has not occurred.

Implements the GSSAPI VerifyMIC operation.
The method modifies the internal state and may update sequence numbers depending on the selected algorithm. Two successive invocations thus don't produce the same result and it's important to carefully pair GetMIC and VerifyMIC calls on the both sides of the authenticated session.

## NegotiateAuthentication.Wrap(Byte>, Byte>, Boolean, Boolean) method

```csharp
public System.Net.Security.NegotiateAuthenticationStatusCode Wrap (ReadOnlySpan<byte> input, System.Buffers.IBufferWriter<byte> outputWriter, bool requestEncryption, out bool isEncrypted);
```

Wraps an input message with a signature and optionally an encryption.

Parameters:

- `input`: Input message to be wrapped.
- `outputWriter`: Buffer writter where the wrapped message is written.
- `requestEncryption`: `true` to request encryption; otherwise, `false`.
- `isEncrypted`: When this method returns, contains a value that indicates whether encryption was applied in the wrapping.

Returns: `NegotiateAuthenticationStatusCode.Completed` on success, or other `NegotiateAuthenticationStatusCode` values on failure.

Exceptions:

- `InvalidOperationException`: Authentication failed or has not occurred.

#### Remarks

Like the GSS_Wrap API, the authentication protocol implementation may choose to override the requested value in the requestEncryption parameter. This may result in either downgrade or upgrade of the protection level.
