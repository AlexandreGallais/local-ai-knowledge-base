---
title: "LocalCertificateSelectionCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/LocalCertificateSelectionCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LocalCertificateSelectionCallback delegate

Namespace: `System.Net.Security`

```csharp
public delegate System.Security.Cryptography.X509Certificates.X509Certificate? LocalCertificateSelectionCallback(object sender, string targetHost, X509CertificateCollection localCertificates, X509Certificate? remoteCertificate, string[] acceptableIssuers);
```

Selects the local Secure Sockets Layer (SSL) certificate used for authentication.

Parameters:

- `sender`: An object that contains state information for this validation.
- `targetHost`: The host server specified by the client.
- `localCertificates`: An `X509CertificateCollection` containing local certificates.
- `remoteCertificate`: The certificate used to authenticate the remote party.
- `acceptableIssuers`: A `String` array of certificate issuers acceptable to the remote party.

Returns: An `X509Certificate` used for establishing an SSL connection.

#### Remarks
This delegate is used to construct instances of the `SslStream` class. The `SslStream` class is used to help secure information exchanged between a client and server. The client and server use this delegate to select a certificate to be used for authentication.

#### Examples
The following code example demonstrates a method implementation for this delegate.

_Code sample not included: ~/snippets/csharp/System.Net.Security/LocalCertificateSelectionCallback/Overview/clientasync.cs._
The following code example demonstrates creating an instance of this delegate.

_Code sample not included: ~/snippets/csharp/System.Net.Security/LocalCertificateSelectionCallback/Overview/clientasync.cs._
