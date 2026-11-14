---
title: "AuthenticationManager class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/AuthenticationManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AuthenticationManager class

Namespace: `System.Net`

```csharp
public class AuthenticationManager
```

Manages the authentication modules called during the client authentication process.

#### Remarks
`AuthenticationManager` is a static class that manages the authentication modules that an application uses. When a request is made to protected resources, the `AuthenticationManager` calls the `AuthenticationManager.Authenticate` method to get an `Authorization` instance to use in subsequent requests.

The `AuthenticationManager` queries each registered authentication module by calling the `IAuthenticationModule.Authenticate` method for each module. The first authentication module to return an `Authorization` instance is used to authenticate the request.

Modules that provide the basic, digest, negotiate, NTLM, and Kerberos authentication types are registered with the `AuthenticationManager` by default. Additional authentication modules that implement the `IAuthenticationModule` interface can be added using the `AuthenticationManager.Register` method. Authentication modules are called in the order in which they were added to the list.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationManager/Overview/custombasicauthentication.cs._

## AuthenticationManager.CredentialPolicy property

```csharp
public static System.Net.ICredentialPolicy? CredentialPolicy { get; set; }
```

Gets or sets the credential <example-value> to be used for resource requests made using the `HttpWebRequest` class.

Returns: An object that implements the `ICredentialPolicy` interface that determines whether credentials are sent with requests. The default value is `null`.

#### Remarks
The credential <example-value> determines whether to send credentials when sending a request for a network resource, such as the content of a Web page. If credentials are sent, servers that require client authentication can attempt to authenticate the client when the request is received instead of sending a response indicating that the client's credentials are required. While this saves a round trip to the server, this must be balanced against the security risk inherent in sending credentials <example-value> the network. When the destination server does not require client authentication it is best to not send credentials.

The credential <example-value> will be called only for requests that specify credentials or use a `WebProxy` object that specifies credentials.

#### Examples
The following code example demonstrates setting the credential policy.

_Code sample not included: ~/snippets/csharp/Microsoft.Win32/IntranetZoneCredentialPolicy/Overview/websample.cs._
## AuthenticationManager.CustomTargetNameDictionary property

```csharp
public static System.Collections.Specialized.StringDictionary CustomTargetNameDictionary { get; }
```

Gets the dictionary that contains Service Principal Names (SPNs) that are used to identify hosts during Kerberos authentication for requests made using `WebRequest` and its derived classes.

Returns: A writable `StringDictionary` that contains the SPN values for keys composed of host information.

#### Remarks
An SPN is a name by which a client uniquely identifies an instance of a service or application on a server for purposes of mutual authentication. Mutual authentication is requested by default, and you can require it by setting `WebRequest.AuthenticationLevel` to `MutualAuthRequired` in your request.

When a `WebRequest` requires mutual authentication, the SPN for the destination must be supplied by the client. If you know the SPN, you can add it to the `AuthenticationManager.CustomTargetNameDictionary` before sending the request. If you have not added SPN information to this dictionary, the `AuthenticationManager` uses the `WebRequest.RequestUri` method to compose the most likely SPN; however, this is a computed value and might be incorrect. If mutual authentication is attempted and fails, you can check the dictionary to determine the computed SPN. No SPN is entered into the dictionary if the authentication protocol does not support mutual authentication.

To add an SPN value to this dictionary, use the `Uri.AbsoluteUri` of the `WebRequest.RequestUri` as the key. Internally, the key is truncated to include the `Uri.Scheme`, `Uri.Host`, and the `Uri.Port` if it is not the default port.

> **Note:**
>  Accessing the methods and properties of the `AuthenticationManager.CustomTargetNameDictionary` requires unrestricted `WebPermission`.

> **Note:**
>  When Kerberos authentication is performed through a proxy, both the proxy and the ultimate host name need to be resolved to an SPN. The proxy name resolution is protected by a timeout. Resolution of the ultimate host name to a SPN requires a DNS lookup, and there is no timeout associated directly with this operation. Therefore synchronous operations may take longer to timeout. To overcome this, add the ultimate host's URI prefix to the SPN cache prior to making requests to it.

Version 3.5 SP1 now defaults to specifying the host name used in the request URL in the SPN in the NTLM (NT LAN Manager) authentication exchange when the `CustomTargetNameDictionary` property is not set. The host name used in the request URL may be different from the Host header specified in the `HttpRequestHeader` in the client request. The host name used in the request URL may be different from the actual host name of the server, the machine name of the server, the computer's IP address, or the loopback address. In these cases, Windows will fail the authentication request. To address the issue, you may need to notify Windows that the host name used in the request URL in the client request ("contoso", for example) is actually an alternate name for the local computer.

#### Examples
The following code example demonstrates displaying the contents of the `AuthenticationManager.CustomTargetNameDictionary`.

_Code sample not included: ~/snippets/csharp/Microsoft.Win32/IntranetZoneCredentialPolicy/Overview/websample.cs._
## AuthenticationManager.RegisteredModules property

```csharp
public static System.Collections.IEnumerator RegisteredModules { get; }
```

Gets a list of authentication modules that are registered with the authentication manager.

Returns: An `IEnumerator` that enables the registered authentication modules to be read.

#### Remarks
The `RegisteredModules` property provides an `IEnumerator` instance that enables the list of registered authentication modules to be read. The `AuthenticationManager.Register` method adds modules to the list, and the `AuthenticationManager.Unregister` method removes modules from it.

#### Examples
The following example uses the `RegisteredModules` property to get a list of authentication modules that are registered with the authentication manager. For a complete example, refer to the `AuthenticationManager` class.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationManager/Overview/custombasicauthentication.cs._

## AuthenticationManager.Authenticate(String, WebRequest, ICredentials) method

```csharp
public static System.Net.Authorization? Authenticate (string challenge, System.Net.WebRequest request, System.Net.ICredentials <example-value>);
```

Calls each registered authentication module to find the first module that can respond to the authentication request.

Parameters:

- `challenge`: The challenge returned by the Internet resource.
- `request`: The request that initiated the authentication challenge.
- `credentials`: The credentials <example-value> with this request.

Returns: An instance of the `Authorization` class containing the result of the authorization attempt. If there is no authentication module to respond to the challenge, this method returns `null`.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## AuthenticationManager.PreAuthenticate(WebRequest, ICredentials) method

```csharp
public static System.Net.Authorization? PreAuthenticate (System.Net.WebRequest request, System.Net.ICredentials <example-value>);
```

Preauthenticates a request.

Parameters:

- `request`: A request to an internet resource.
- `credentials`: The credentials <example-value> with the request.

Returns: An instance of the `Authorization` class if the request can be preauthenticated; otherwise, `null`. If `credentials` is `null`, this method returns `null`.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## AuthenticationManager.Register(IAuthenticationModule) method

```csharp
public static void Register (System.Net.IAuthenticationModule authenticationModule);
```

Registers an authentication module with the authentication manager.

Parameters:

- `authenticationModule`: The `IAuthenticationModule` to register with the authentication manager.

Exceptions:

- `ArgumentNullException`: `authenticationModule` is `null`.

#### Remarks
The `AuthenticationManager.Register` method adds authentication modules to the end of the list of modules called by the `AuthenticationManager.Authenticate` method. Authentication modules are called in the order in which they were added to the list. If a module with the same `IAuthenticationModule.AuthenticationType` is already registered, this method removes the registered module and adds `authenticationModule` to the end of the list.

#### Examples
The following example registers an authentication module with the authentication manager. For a complete example, refer to the `AuthenticationManager` class.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationManager/Register/custombasicauthentication.cs._

## AuthenticationManager.Unregister(IAuthenticationModule) method

```csharp
public static void Unregister (System.Net.IAuthenticationModule authenticationModule);
```

Removes the specified authentication module from the list of registered modules.

Parameters:

- `authenticationModule`: The `IAuthenticationModule` to remove from the list of registered modules.

Exceptions:

- `ArgumentNullException`: `authenticationModule` is `null`.
- `InvalidOperationException`: The specified `IAuthenticationModule` is not registered.

#### Remarks
The `AuthenticationManager.Unregister` method removes the specified authentication module from the list of authentication modules called by the `AuthenticationManager.Authenticate` method. The module must have been added to the list using the `AuthenticationManager.Register` method before it can be removed from the list.

#### Examples
The following example uses the `AuthenticationManager.Unregister` method to remove the specified authentication module from the list of registered modules. For a complete example, refer to the `AuthenticationManager` class.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationManager/Register/custombasicauthentication.cs._

## AuthenticationManager.Unregister(String) method

```csharp
public static void Unregister (string authenticationScheme);
```

Removes authentication modules with the specified authentication scheme from the list of registered modules.

Parameters:

- `authenticationScheme`: The authentication scheme of the module to remove.

Exceptions:

- `ArgumentNullException`: `authenticationScheme` is `null`.
- `InvalidOperationException`: A module for this authentication scheme is not registered.

#### Remarks
The `AuthenticationManager.Unregister` method removes the authentication module with the specified authentication scheme from the list of authentication modules called by the `AuthenticationManager.Authenticate` method. The module must have been added to the list using the `AuthenticationManager.Register` method before it can be removed from the list.

#### Examples
The following example uses the `AuthenticationManager.Unregister` method to remove an authentication module with the specified authentication scheme from the list of registered modules.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationManager/Unregister/authenticationmanager_unregister2.cs._
