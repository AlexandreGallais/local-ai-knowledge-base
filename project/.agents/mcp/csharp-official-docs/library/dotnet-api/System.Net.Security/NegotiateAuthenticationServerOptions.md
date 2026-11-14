---
title: "NegotiateAuthenticationServerOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/NegotiateAuthenticationServerOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NegotiateAuthenticationServerOptions class

Namespace: `System.Net.Security`

```csharp
public class NegotiateAuthenticationServerOptions
```

Represents a property bag for the server side of an authentication exchange.

This property bag is used as argument for `NegotiateAuthentication` constructor for initializing a server-side authentication.

## NegotiateAuthenticationServerOptions.NegotiateAuthenticationServerOptions() constructor

```csharp
public NegotiateAuthenticationServerOptions ();
```

Initializes a new instance of the `NegotiateAuthenticationServerOptions` class.

To be added.

## NegotiateAuthenticationServerOptions.Binding property

```csharp
public System.Security.Authentication.ExtendedProtection.ChannelBinding? Binding { get; set; }
```

Gets or sets the channel binding that's used for extended protection.

Returns: To be added.

To be added.

## NegotiateAuthenticationServerOptions.Credential <example-value>

```csharp
public System.Net.NetworkCredential <example-value> { get; set; }
```

Gets or sets the network credential that's used to establish the identity of the client.
The default value is `CredentialCache.DefaultNetworkCredentials`.

Returns: To be added.

To be added.

## NegotiateAuthenticationServerOptions.Package property

```csharp
public string Package { get; set; }
```

Gets or sets the GSSAPI authentication package used for the authentication.
Common values are Negotiate, NTLM, or Kerberos. The default value is Negotiate.

Returns: To be added.

NTLM is a legacy authentication protocol and should be used only when required for compatibility with existing systems. Negotiate prefers Kerberos when available but can fall back to NTLM. To prevent NTLM, request Kerberos explicitly when supported or use another modern authentication protocol.

## NegotiateAuthenticationServerOptions.Policy property

```csharp
public System.Security.Authentication.ExtendedProtection.ExtendedProtectionPolicy? Policy { get; set; }
```

Gets or sets the extended security and validation policies.

Returns: To be added.

To be added.

## NegotiateAuthenticationServerOptions.RequiredImpersonationLevel property

```csharp
public System.Security.Principal.TokenImpersonationLevel RequiredImpersonationLevel { get; set; }
```

Gets or sets a value that indicates how the server can use the client's credentials to access resources.

Returns: To be added.

To be added.

## NegotiateAuthenticationServerOptions.RequiredProtectionLevel property

```csharp
public System.Net.Security.ProtectionLevel RequiredProtectionLevel { get; set; }
```

Gets or sets the required level of protection of the authentication exchange and any further data exchange. The default value is `ProtectionLevel.None`.

Returns: To be added.

To be added.
