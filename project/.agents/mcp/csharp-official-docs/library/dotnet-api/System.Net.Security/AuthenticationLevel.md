---
title: "AuthenticationLevel enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/AuthenticationLevel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AuthenticationLevel enum

Namespace: `System.Net.Security`

```csharp
public enum AuthenticationLevel
```

Specifies client requirements for authentication and impersonation when using the `WebRequest` class and derived classes to request a resource.

#### Remarks
The values of this enumeration are used to set the `AuthenticationLevel` property.

> **Note:**
> The MutualAuthRequired and MutualAuthRequested values are relevant for Kerberos authentication. Kerberos authentication can be supported directly, or can be used if the Negotiate security protocol is used to select the actual security protocol. For more information about authentication protocols, see Internet Authentication.

#### Examples
The following code example demonstrates setting the authentication flags for a request.

_Code sample not included: ~/snippets/csharp/Microsoft.Win32/IntranetZoneCredentialPolicy/Overview/websample.cs._
## AuthenticationLevel.MutualAuthRequested field

```csharp
MutualAuthRequested
```

The client and server should be authenticated. The request does not fail if the server is not authenticated. To determine whether mutual authentication occurred, check the value of the `WebResponse.IsMutuallyAuthenticated` property.

## AuthenticationLevel.MutualAuthRequired field

```csharp
MutualAuthRequired
```

The client and server should be authenticated. If the server is not authenticated, your application will receive an `IOException` with a `ProtocolViolationException` inner exception that indicates that mutual authentication failed.

## AuthenticationLevel.None field

```csharp
None
```

No authentication is required for the client and server.
