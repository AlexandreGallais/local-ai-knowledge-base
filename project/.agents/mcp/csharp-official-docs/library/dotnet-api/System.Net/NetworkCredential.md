---
title: "NetworkCredential class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/NetworkCredential.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetworkCredential class

Namespace: `System.Net`

```csharp
public class NetworkCredential : System.Net.ICredentials, System.Net.ICredentialsByHost
```

Provides credentials for password-based authentication schemes such as basic, digest, NTLM, and Kerberos authentication.

#### Remarks
The `NetworkCredential` class is a base class that supplies credentials in password-based authentication schemes such as basic, digest, NTLM, and Kerberos. Classes that implement the `ICredentials` interface, such as the `CredentialCache` class, return `NetworkCredential` objects.

> **Note:**
> On Unix platforms, use of NTLM authentication may require installing the NTLM plugin for the GSSAPI layer used by the implemention. On Ubuntu distributions, the package is called `gss-ntlmssp`. Alternatively, applications may opt in for a managed implementation of NTLM by setting the `_UseManagedNtlm` .csproj property (.NET 9+ only), or setting the `System.Net.Security.UseManagedNtlm` AppContext switch.
>
> On Windows, NTLM and Negotiate (Kerberos) authentication always depend on GSSAPI of the operating system.

This class does not support public key-based authentication methods such as Secure Sockets Layer (SSL) client authentication.

#### Examples
The following code example associates a `NetworkCredential` object with a set of Uniform Resource Identifiers (URIs) in a `CredentialCache`. It then passes the `CredentialCache` to a `HttpClient` object, which uses it to authenticate requests to an Internet server.

_Code sample not included: ~/snippets/csharp/System.Net/NetworkCredential/Overview/source.cs._

## NetworkCredential.NetworkCredential() constructor

```csharp
public NetworkCredential ();
```

Initializes a new instance of the `NetworkCredential` class.

#### Remarks
The parameterless constructor for the `NetworkCredential` class initializes all properties to `null`.

## NetworkCredential.NetworkCredential(String, SecureString) constructor

```csharp
public NetworkCredential (string? userName, System.Security.SecureString? password);
```

Initializes a new instance of the `NetworkCredential` class with the specified user name and password.

Parameters:

- `userName`: The user name associated with the credentials.
- `password`: The password for the user name associated with the credentials.

Exceptions:

- `NotSupportedException`: The `SecureString` class is not supported on this platform.

#### Remarks
The constructor initializes a `NetworkCredential` object with the `UserName` property set to `userName` and the `Password` property set to `password`.

The `password` parameter is a `SecureString` instance.

If this constructor is called with the `password` parameter set to `null`, a new instance of `SecureString` is initialized, If secure strings are not supported on this platform, then the `NotSupportedException` is thrown

## NetworkCredential.NetworkCredential(String, String) constructor

```csharp
public NetworkCredential (string? userName, string? password);
```

Initializes a new instance of the `NetworkCredential` class with the specified user name and password.

Parameters:

- `userName`: The user name associated with the credentials.
- `password`: The password for the user name associated with the credentials.

#### Remarks
The constructor initializes a `NetworkCredential` object with the `UserName` property set to `userName` and the `Password` property set to `password`.

#### Examples
The following code example creates a `NetworkCredential` object using the specified user name and password.

_Code sample not included: ~/snippets/csharp/System.Net/NetworkCredential/.ctor/networkcredential_constructor2.cs._

## NetworkCredential.NetworkCredential(String, SecureString, String) constructor

```csharp
public NetworkCredential (string? userName, System.Security.SecureString? password, string? domain);
```

Initializes a new instance of the `NetworkCredential` class with the specified user name, password, and domain.

Parameters:

- `userName`: The user name associated with the credentials.
- `password`: The password for the user name associated with the credentials.
- `domain`: The domain associated with these credentials.

Exceptions:

- `NotSupportedException`: The `SecureString` class is not supported on this platform.

#### Remarks
The constructor initializes a `NetworkCredential` object with the `UserName` property set to `userName`, the `Password` property set to `password`, and the `Domain` property set to `domain`.

The `password` parameter is a `SecureString` instance.

If this constructor is called with the `password` parameter set to `null`, a new instance of `SecureString` is initialized, If secure strings are not supported on this platform, then the `NotSupportedException` is thrown

## NetworkCredential.NetworkCredential(String, String, String) constructor

```csharp
public NetworkCredential (string? userName, string? password, string? domain);
```

Initializes a new instance of the `NetworkCredential` class with the specified user name, password, and domain.

Parameters:

- `userName`: The user name associated with the credentials.
- `password`: The password for the user name associated with the credentials.
- `domain`: The domain associated with these credentials.

#### Remarks
The constructor initializes a `NetworkCredential` object with the `UserName` property set to `userName`, the `Password` property set to `password`, and the `Domain` property set to `domain`.

## NetworkCredential.Domain property

```csharp
public string Domain { get; set; }
```

Gets or sets the domain or computer name that verifies the credentials.

Returns: The name of the domain associated with the credentials.

#### Remarks
The `Domain` property specifies the domain or realm to which the user name belongs. Typically, this is the host computer name where the application runs or the user domain for the currently logged in user.

#### Examples
The following code example uses the `Domain` property to set the domain associated with the credentials.

_Code sample not included: ~/snippets/csharp/System.Net/NetworkCredential/Domain/networkcredential_username_password_domain.cs._

## NetworkCredential.Password <example-value>

```csharp
public string Password { get; set; }
```

Gets or sets the password for the user name associated with the credentials.

Returns: The password <example-value> with the credentials. If this `NetworkCredential` instance was initialized with the `password` parameter set to `null`, then the `NetworkCredential.Password` property will return an empty string.

#### Examples
The following code example uses the `Password` property to set the password <example-value> with the credentials.

_Code sample not included: ~/snippets/csharp/System.Net/NetworkCredential/Domain/networkcredential_username_password_domain.cs._

## NetworkCredential.SecurePassword <example-value>

```csharp
public System.Security.SecureString SecurePassword { get; set; }
```

Gets or sets the password as a `SecureString` instance.

Returns: The password for the user name associated with the credentials.

Exceptions:

- `NotSupportedException`: The `SecureString` class is not supported on this platform.

#### Remarks
If an application attempts to set the `SecurePassword` property to `null`, a new instance of `SecureString` is initialized, If secure strings are not supported on this platform, then the `NotSupportedException` is thrown

## NetworkCredential.UserName property

```csharp
public string UserName { get; set; }
```

Gets or sets the user name associated with the credentials.

Returns: The user name associated with the credentials.

#### Examples
The following code example uses the `UserName` property to set the user name associated with the credentials.

_Code sample not included: ~/snippets/csharp/System.Net/NetworkCredential/Domain/networkcredential_username_password_domain.cs._

## NetworkCredential.GetCredential(Uri, String) method

```csharp
public System.Net.NetworkCredential <example-value> (Uri? uri, string? authenticationType);
```

Returns an instance of the `NetworkCredential` class for the specified Uniform Resource Identifier (URI) and authentication type.

Parameters:

- `uri`: The URI that the client provides authentication for.
- `authenticationType`: To be added.

Returns: A `NetworkCredential` object.

#### Examples
The following code example uses the `NetworkCredential.GetCredential` method to retrieve a `NetworkCredential` object for the specified URI.

_Code sample not included: ~/snippets/csharp/System.Net/NetworkCredential/GetCredential/networkcredential_getcredential.cs._

## NetworkCredential.GetCredential(String, Int32, String) method

```csharp
public System.Net.NetworkCredential <example-value> (string? host, int port, string? authenticationType);
```

Returns an instance of the `NetworkCredential` class for the specified host, port, and authentication type.

Parameters:

- `host`: The host computer that authenticates the client.
- `port`: The port on the `host` that the client communicates with.
- `authenticationType`: The type of authentication requested, as defined in the `IAuthenticationModule.AuthenticationType` property.

Returns: A `NetworkCredential` for the specified host, port, and authentication protocol, or `null` if there are no credentials <example-value> for the specified host, port, and authentication protocol.

#### Remarks
The value of `authType` corresponds to the `AuthenticationType` property.
