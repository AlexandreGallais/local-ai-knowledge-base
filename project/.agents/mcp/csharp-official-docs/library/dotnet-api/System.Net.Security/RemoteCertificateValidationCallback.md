---
title: "RemoteCertificateValidationCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/RemoteCertificateValidationCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RemoteCertificateValidationCallback delegate

Namespace: `System.Net.Security`

```csharp
public delegate bool RemoteCertificateValidationCallback(object sender, X509Certificate? certificate, X509Chain? chain, SslPolicyErrors sslPolicyErrors);
```

Verifies the remote Secure Sockets Layer (SSL) certificate used for authentication.

Parameters:

- `sender`: An object that contains state information for this validation.
- `certificate`: The certificate used to authenticate the remote party.
- `chain`: The chain of certificate authorities associated with the remote certificate.
- `sslPolicyErrors`: One or more errors associated with the remote certificate.

Returns: A `Boolean` value that determines whether the specified certificate is accepted for authentication.

#### Remarks
The delegate's `sslPolicyErrors` argument contains any certificate errors returned by SSPI while authenticating the client or server. The `Boolean` value returned by the method invoked by this delegate determines whether the authentication is allowed to succeed.

This delegate is used with the `SslStream` class.

#### Examples
The following code example implements a method that's invoked by an instance of the `RemoteCertificateValidationCallback` class. If there are validation errors, this method displays them and returns `false`, which prevents communication with the unauthenticated server.

_Code sample not included: ~/snippets/csharp/System.Net.Security/RemoteCertificateValidationCallback/Overview/clientsync.cs._
The following code example creates the delegate using the method defined in the preceding code example.

_Code sample not included: ~/snippets/csharp/System.Net.Security/RemoteCertificateValidationCallback/Overview/clientsync.cs._
