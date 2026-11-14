---
title: "ICredentialsByHost interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/ICredentialsByHost.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICredentialsByHost interface

Namespace: `System.Net`

```csharp
public interface ICredentialsByHost
```

Provides the interface for retrieving credentials for a host, port, and authentication type.

#### Remarks
The credentials are used for authentication of requests sent to hosts using the `WebClient` class, and `WebRequest` and its derived classes.

## ICredentialsByHost.GetCredential(String, Int32, String) method

```csharp
public System.Net.NetworkCredential? GetCredential (string host, int port, string authenticationType);
```

Returns the credential for the specified host, port, and authentication protocol.

Parameters:

- `host`: The host computer that is authenticating the client.
- `port`: The port on `host` that the client will communicate with.
- `authenticationType`: The authentication protocol.

Returns: A `NetworkCredential` for the specified host, port, and authentication protocol, or `null` if there are no credentials <example-value> for the specified host, port, and authentication protocol.

#### Remarks
The value of `authType` corresponds to the `AuthenticationType` property.
