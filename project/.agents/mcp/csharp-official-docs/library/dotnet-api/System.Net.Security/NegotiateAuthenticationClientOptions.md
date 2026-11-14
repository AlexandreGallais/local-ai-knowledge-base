---
title: "NegotiateAuthenticationClientOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/NegotiateAuthenticationClientOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NegotiateAuthenticationClientOptions class

Namespace: `System.Net.Security`

```csharp
public class NegotiateAuthenticationClientOptions
```

Represents a property bag for the client side of an authentication exchange.

This property bag is used as argument for `NegotiateAuthentication` constructor for initializing a client-side authentication.

Initial values of the properties are set for an authentication using default network credentials. If you want to explicitly authenticate using a user name, password and domain combination then set the `NegotiateAuthenticationClientOptions.Credential` property appropriately.

Typical usage of the client-side authentication will also require specifying the the `NegotiateAuthenticationClientOptions.TargetName` property. While it may be omitted in some scenarios it is usually required to be set to a valid value like `HOST/contoso.com` or `HTTP/www.contoso.com`.

When the authentication is wrapped in a secure channel, like TLS, the channel binding can provide additional protection by strongly binding the authentication to a given transport channel. This is handled by setting the `NegotiateAuthenticationClientOptions.Binding` property. For `SslStream` the channel binding could be obtained through the `SslStream.TransportContext` property and calling the `TransportContext.GetChannelBinding` method.

## NegotiateAuthenticationClientOptions.NegotiateAuthenticationClientOptions() constructor

```csharp
public NegotiateAuthenticationClientOptions ();
```

Initializes a new instance of the `NegotiateAuthenticationClientOptions` class.

To be added.

## NegotiateAuthenticationClientOptions.AllowedImpersonationLevel property

```csharp
public System.Security.Principal.TokenImpersonationLevel AllowedImpersonationLevel { get; set; }
```

Gets or sets a value that indicates how the server can use the client's credentials to access resources.

Returns: To be added.

To be added.

## NegotiateAuthenticationClientOptions.Binding property

```csharp
public System.Security.Authentication.ExtendedProtection.ChannelBinding? Binding { get; set; }
```

Gets or sets the channel binding that's used for extended protection.

Returns: To be added.

To be added.

## NegotiateAuthenticationClientOptions.Credential <example-value>

```csharp
public System.Net.NetworkCredential <example-value> { get; set; }
```

Gets or sets the network credential that's used to establish the identity of the client.
The default value is `CredentialCache.DefaultNetworkCredentials`.

Returns: To be added.

To be added.

## NegotiateAuthenticationClientOptions.Package property

```csharp
public string Package { get; set; }
```

Gets or sets the GSSAPI authentication package used for the authentication.
Common values are Negotiate, NTLM, or Kerberos. The default value is Negotiate.

Returns: To be added.

NTLM is a legacy authentication protocol and should be used only when required for compatibility with existing systems. Negotiate prefers Kerberos when available but can fall back to NTLM. To prevent NTLM, request Kerberos explicitly when supported or use another modern authentication protocol.

## NegotiateAuthenticationClientOptions.RequiredProtectionLevel property

```csharp
public System.Net.Security.ProtectionLevel RequiredProtectionLevel { get; set; }
```

Gets or sets the required level of protection of the authentication exchange and any further data exchange. The default value is `ProtectionLevel.None`.

Returns: To be added.

To be added.

## NegotiateAuthenticationClientOptions.RequireMutualAuthentication property

```csharp
public bool RequireMutualAuthentication { get; set; }
```

Gets or sets a value that indicates whether mutual authentication is required between the client and server.

Returns: To be added.

To be added.

## NegotiateAuthenticationClientOptions.TargetName property

```csharp
public string? TargetName { get; set; }
```

Gets or sets the service principal name (SPN) that uniquely identifies the server for authentication.

Returns: To be added.

To be added.
