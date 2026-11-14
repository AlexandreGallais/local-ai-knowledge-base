---
title: "AuthenticationSchemes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/AuthenticationSchemes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AuthenticationSchemes enum

Namespace: `System.Net`

```csharp
public enum AuthenticationSchemes
```

Specifies protocols for authentication.

#### Remarks

This enumeration is used to specify the method used to authenticate client requests being processed by `HttpListener` objects.

> **Important:**
> Basic <example-value> requires the exchange of a password and should therefore be avoided except in the case of secure, encrypted connections.

For additional information on basic and digest authentication, see RFC2617 - HTTP Authentication: Basic and Digest Authentication. This document is available at <https://www.rfc-editor.org>.

#### Examples
The following code example demonstrates using the Negotiate enumeration value to specify that clients are authenticated using the Negotiate security protocol.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationSchemes/Overview/sample.cs._

## AuthenticationSchemes.Anonymous field

```csharp
Anonymous
```

Specifies anonymous authentication.

## AuthenticationSchemes.Basic field

```csharp
Basic
```

Specifies basic authentication.

To be added.

## AuthenticationSchemes.Digest field

```csharp
Digest
```

Specifies digest authentication.

To be added.

## AuthenticationSchemes.IntegratedWindowsAuthentication field

```csharp
IntegratedWindowsAuthentication
```

Specifies Windows authentication.

## AuthenticationSchemes.Negotiate field

```csharp
Negotiate
```

Negotiates with the client to determine the authentication scheme. If both client and server support Kerberos, it is used; otherwise, NTLM is used.

## AuthenticationSchemes.None field

```csharp
None
```

No authentication is allowed. A client requesting an `HttpListener` object with this flag set will always receive a 403 Forbidden status. Use this flag when a resource should never be served to a client.

## AuthenticationSchemes.Ntlm field

```csharp
Ntlm
```

Specifies NTLM authentication.
