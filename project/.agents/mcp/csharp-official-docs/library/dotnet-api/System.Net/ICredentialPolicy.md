---
title: "ICredentialPolicy interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/ICredentialPolicy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICredentialPolicy interface

Namespace: `System.Net`

```csharp
public interface ICredentialPolicy
```

Defines the credential <example-value> to be used for resource requests that are made using `WebRequest` and its derived classes.

#### Remarks
The credential <example-value> determines whether to send credentials when sending a `WebRequest` for a network resource, such as the content of a Web page. If credentials are sent, servers that require client authentication can attempt to authenticate the client when the request is received instead of sending a response that indicates that the client's credentials are required. While this saves a round trip to the server, this performance gain must be balanced against the security risk inherent in sending credentials <example-value> the network. When the destination server does not require client authentication, it is best not to send credentials.

> **Note:**
> `ICredentialPolicy` policies are invoked only if the `WebRequest` or the `WebProxy` that is associated with the request has credentials that are not `null`. Setting this policy has no effect on requests that do not specify credentials.

Use the `CredentialPolicy` property to set an `ICredentialPolicy` policy. The `IAuthenticationModule` that handles authentication for the request will invoke the `ICredentialPolicy.ShouldSendCredential` method before performing the authentication. If the method returns `false`, authentication is not performed.

An `ICredentialPolicy` policy affects all instances of `WebRequest` with non-null credentials. The policy cannot be overridden on individual requests.

#### Examples
The following code example shows an implementation of this interface that permits credentials to be sent only for requests that target specific hosts.

_Code sample not included: ~/snippets/csharp/Microsoft.Win32/IntranetZoneCredentialPolicy/Overview/websample.cs._
## ICredentialPolicy.ShouldSendCredential(Uri, WebRequest, NetworkCredential, IAuthenticationModule) method

```csharp
public bool ShouldSendCredential (Uri challengeUri, System.Net.WebRequest request, System.Net.NetworkCredential <example-value>, System.Net.IAuthenticationModule authenticationModule);
```

Returns a `Boolean` that indicates whether the client's credentials are sent with a resource request made using an instance of the `WebRequest` class.

Parameters:

- `challengeUri`: The `Uri` that will receive the request.
- `request`: The `WebRequest` that represents the resource being requested.
- `credential`: The `NetworkCredential` that will be sent with the request if this method returns `true`.
- `authenticationModule`: The `IAuthenticationModule` that will conduct the authentication, if authentication is required.

Returns: `true` if the credentials are sent with the request; otherwise, `false`.

#### Remarks
After an `ICredentialPolicy` policy has been specified by setting the `CredentialPolicy` property, the `IAuthenticationModule` that handles authentication for a `WebRequest` invokes the `ICredentialPolicy.ShouldSendCredential` method before performing the authentication. If this method returns `false`, authentication is not performed.

When the original request has been redirected or proxy authentication is required, the resource identified by `challengeUri` can be different from the requested resource that is specified in `WebRequest.RequestUri`. In the case of redirection, `challengeUri` contains the actual destination `Uri`. If proxy authentication is required, `challengeUri` contains the address of the proxy server that requires client authentication.
