---
title: "ICredentials <example-value>"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/ICredentials.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICredentials <example-value>

Namespace: `System.Net`

```csharp
public interface ICredentials
```

Provides the base authentication interface for retrieving credentials for Web client authentication.

#### Remarks
The `ICredentials` interface provides the `ICredentials.GetCredential` method to objects that supply network credentials to applications.

#### Examples
The following example illustrates how to use the `ICredentials` interface.

_Code sample not included: ~/snippets/csharp/System.Net/ICredentials/Overview/icredential.cs._

## ICredentials.GetCredential(Uri, String) method

```csharp
public System.Net.NetworkCredential? GetCredential (Uri uri, string authType);
```

Returns a `NetworkCredential` object that is associated with the specified URI, and authentication type.

Parameters:

- `uri`: The `Uri` that the client is providing authentication for.
- `authType`: The type of authentication, as defined in the `IAuthenticationModule.AuthenticationType` property.

Returns: The `NetworkCredential` that is associated with the specified URI and authentication type, or, if no credentials are available, `null`.

#### Remarks
The `ICredentials.GetCredential` method returns a `NetworkCredential` instance that contains the credentials that are associated with the specified URI and authorization scheme. When no credentials are available, the `ICredentials.GetCredential` method returns `null`.

#### Examples
The following uses `ICredentials.GetCredential` to retrieve a `NetworkCredential` instance.

_Code sample not included: ~/snippets/csharp/System.Net/ICredentials/Overview/icredential.cs._
