---
title: "IAuthenticationModule interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/IAuthenticationModule.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IAuthenticationModule interface

Namespace: `System.Net`

```csharp
public interface IAuthenticationModule
```

Provides the base authentication interface for Web client authentication modules.

#### Remarks
The `IAuthenticationModule` interface defines the properties and methods that custom authentication modules must use.

Authentication modules conduct the entire authentication process with a server, responding to an authentication challenge as appropriate. This process may consist of requests to an authentication server separate from the resource server, as well as any other activities required to properly authenticate a request for a URI.

Custom authentication modules should implement the `IAuthenticationModule` interface and then register with the `AuthenticationManager.Register` method. Authentication modules are also registered at program initialization by reading the configuration file.

#### Examples
The following example creates a customized authentication class by implementing the `IAuthenticationModule` interface. For a complete example refer to the `AuthenticationManager` class.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationManager/Overview/custombasicauthentication.cs._

## IAuthenticationModule.AuthenticationType property

```csharp
public string AuthenticationType { get; }
```

Gets the authentication type provided by this authentication module.

Returns: A string indicating the authentication type provided by this authentication module.

#### Remarks
The `AuthenticationType` property identifies the authentication type implemented by this authentication module. The `AuthenticationType` property is used by the `AuthenticationManager.Register` method to determine if the authentication module has been registered, and by the `AuthenticationManager.Unregister` method to remove a registered authentication module.

#### Examples
The following example shows how to use the `AuthenticationType` property. For a complete example refer to the `AuthenticationManager` class.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationManager/Overview/custombasicauthentication.cs._

## IAuthenticationModule.CanPreAuthenticate property

```csharp
public bool CanPreAuthenticate { get; }
```

Gets a value indicating whether the authentication module supports preauthentication.

Returns: `true` if the authorization module supports preauthentication; otherwise `false`.

#### Remarks
The `CanPreAuthenticate` property is set to `true` to indicate that the authentication module can respond with a valid `Authorization` instance when the `IAuthenticationModule.PreAuthenticate` method is called.

#### Examples
The following example shows how to use the `CanPreAuthenticate` property. For a complete example refer to the `AuthenticationManager` class.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationManager/Overview/custombasicauthentication.cs._

## IAuthenticationModule.Authenticate(String, WebRequest, ICredentials) method

```csharp
public System.Net.Authorization? Authenticate (string challenge, System.Net.WebRequest request, System.Net.ICredentials <example-value>);
```

Returns an instance of the `Authorization` class in response to an authentication challenge from a server.

Parameters:

- `challenge`: The authentication challenge sent by the server.
- `request`: The `WebRequest` instance associated with the challenge.
- `credentials`: The credentials <example-value> with the challenge.

Returns: An `Authorization` instance containing the authorization message for the request, or `null` if the challenge cannot be handled.

#### Remarks
The `IAuthenticationModule.Authenticate` method conducts the authentication process with the server and returns an `Authorization` instance to the `AuthenticationManager`.

#### Examples
The following example shows how to use the `IAuthenticationModule.Authenticate` method. For a complete example refer to the `AuthenticationManager` class.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationManager/Overview/custombasicauthentication.cs._

## IAuthenticationModule.PreAuthenticate(WebRequest, ICredentials) method

```csharp
public System.Net.Authorization? PreAuthenticate (System.Net.WebRequest request, System.Net.ICredentials <example-value>);
```

Returns an instance of the `Authorization` class for an authentication request to a server.

Parameters:

- `request`: The `WebRequest` instance associated with the authentication request.
- `credentials`: The credentials <example-value> with the authentication request.

Returns: An `Authorization` instance containing the authorization message for the request.

#### Remarks
When the `CanPreAuthenticate` property is `true`, the `IAuthenticationModule.PreAuthenticate` method will return an instance of the `Authorization` class containing an authentication message.

#### Examples
The following example shows how to use the `IAuthenticationModule.PreAuthenticate` method. For a complete example refer to the `AuthenticationManager` class.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationManager/Overview/custombasicauthentication.cs._
