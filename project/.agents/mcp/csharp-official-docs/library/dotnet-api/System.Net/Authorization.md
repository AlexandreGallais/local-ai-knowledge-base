---
title: "Authorization class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/Authorization.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Authorization class

Namespace: `System.Net`

```csharp
public class Authorization
```

Contains an authentication message for an Internet server.

To be added.

## Authorization.Authorization(String) constructor

```csharp
public Authorization (string? token);
```

Creates a new instance of the `Authorization` class with the specified authorization message.

Parameters:

- `token`: The encrypted authorization message expected by the server.

#### Remarks
The `Authorization` instance is created with the `Message` property set to `token` and the `Complete` property set to `true`.

#### Examples
The following code example shows how to create an `Authorization` object.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationManager/Overview/custombasicauthentication.cs._

## Authorization.Authorization(String, Boolean) constructor

```csharp
public Authorization (string? token, bool finished);
```

Creates a new instance of the `Authorization` class with the specified authorization message and completion status.

Parameters:

- `token`: The encrypted authorization message expected by the server.
- `finished`: The completion status of the authorization attempt. `true` if the authorization attempt is complete; otherwise, `false`.

#### Remarks
The `Authorization` instance is created with the `Message` property set to `token` and the `Complete` property set to `finished`.

#### Examples
The following code example creates a new instance of the `Authorization` class with the specified authorization message and completion status.

_Code sample not included: ~/snippets/csharp/System.Net/Authorization/.ctor/authorization_protectionrealm.cs._

## Authorization.Authorization(String, Boolean, String) constructor

```csharp
public Authorization (string? token, bool finished, string? connectionGroupId);
```

Creates a new instance of the `Authorization` class with the specified authorization message, completion status, and connection group identifier.

Parameters:

- `token`: The encrypted authorization message expected by the server.
- `finished`: The completion status of the authorization attempt. `true` if the authorization attempt is complete; otherwise, `false`.
- `connectionGroupId`: A unique identifier that can be used to create private client-server connections that are bound only to this authentication scheme.

#### Examples
The following code example creates a new instance of the `Authorization` class with the specified authorization message, completion status, and connection group identifier.

_Code sample not included: ~/snippets/csharp/System.Net/Authorization/.ctor/authorization_constructor3.cs._

## Authorization.Complete property

```csharp
public bool Complete { get; }
```

Gets the completion status of the authorization.

Returns: `true` if the authentication process is complete; otherwise, `false`.

#### Remarks
The `Complete` property is set to `true` when the authentication process between the client and the server is finished. Some authentication modules, such as the Kerberos module, use multiple round trips between the client and server to complete the authentication process. To keep the `WebRequest` or descendant that initiated the authentication process from interrupting while authorization is taking place, the authentication module sets the `Complete` property to `false`.

#### Examples
The following code example uses the `Complete` property to get the completion status of the authorization.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationManager/Overview/custombasicauthentication.cs._

## Authorization.ConnectionGroupId property

```csharp
public string? ConnectionGroupId { get; }
```

Gets a unique identifier for user-specific connections.

Returns: A unique string that associates a connection with an authenticating entity.

#### Remarks
The `ConnectionGroupId` property is a unique string that associates a connection with a specific authenticating entity. For example, the NTLM authorization module ties the authentication credential <example-value> to a specific connection to prevent invalid reuse of the connection.

#### Examples
The following code example uses the `ConnectionGroupId` property to get the group identifier returned by the server.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationManager/Overview/custombasicauthentication.cs._

## Authorization.Message property

```csharp
public string? Message { get; }
```

Gets the message returned to the server in response to an authentication challenge.

Returns: The message that will be returned to the server in response to an authentication challenge.

#### Remarks
The `Message` property contains the authorization string that the client will return to the server when accessing protected resources. The actual contents of the message are defined by the authentication type the client and server are using. Basic HTTP authentication, for example, uses a different message than Kerberos authentication.

When an authentication module supports preauthentication, the `Message` property is sent with the initial request.

#### Examples
The following code example uses the `Message` property to get the message returned to the server in response to an authentication challenge.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationManager/Overview/custombasicauthentication.cs._

## Authorization.MutuallyAuthenticated property

```csharp
public bool MutuallyAuthenticated { get; set; }
```

Gets or sets a value that indicates whether mutual authentication occurred.

Returns: `true` if both client and server were authenticated; `false` if client or server weren't authenticated or if authentication hasn't completed.

To be added.

## Authorization.ProtectionRealm property

```csharp
public string[]? ProtectionRealm { get; set; }
```

Gets or sets the prefix for Uniform Resource Identifiers (URIs) that can be authenticated with the `Authorization.Message` property.

Returns: An array of strings that contains URI prefixes.

#### Remarks
The `ProtectionRealm` property contains a list of URI prefixes that the `Message` property can be used to authenticate. `WebRequest` and its descendants compare a URI to this list to determine if the `Authorization` is valid for a particular URI.

#### Examples
The following code example gets or sets the prefix for URIs that can be authenticated with the `Message` property.

_Code sample not included: ~/snippets/csharp/System.Net/Authorization/.ctor/authorization_protectionrealm.cs._
