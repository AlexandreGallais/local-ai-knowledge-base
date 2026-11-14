---
title: "CredentialCache class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/CredentialCache.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CredentialCache class

Namespace: `System.Net`

```csharp
public class CredentialCache : System.Collections.IEnumerable, System.Net.ICredentials, System.Net.ICredentialsByHost
```

Provides storage for multiple credentials.

#### Remarks
The `CredentialCache` class stores credentials for multiple Internet resources. Applications that need to access multiple resources can store the credentials for those resources in a `CredentialCache` instance that then provides the proper set of credentials to the Internet resource when required. When the `CredentialCache.GetCredential` method is called, it compares the Uniform Resource Identifier (URI) and authentication type provided with those stored in the cache and returns the first set of credentials that match.

The `DefaultCredentials` property contains the system credentials of the current security context. For client applications, these represent the user name, password, and domain of the user who is currently logged in. For ASP.NET applications, the default credentials are the user credentials of the logged-in user or the user being impersonated.

#### Examples
The following code example initializes a `CredentialCache` with multiple security credentials and uses those credentials with a `WebRequest`.

_Code sample not included: ~/snippets/csharp/System.Net/CredentialCache/Overview/source.cs._

## CredentialCache.CredentialCache() constructor

```csharp
public CredentialCache ();
```

Creates a new instance of the `CredentialCache` class.

#### Remarks
The constructor creates a `CredentialCache` instance.

#### Examples
The following code example initializes a `CredentialCache` with multiple security credentials and uses those credentials with a `WebRequest`.

_Code sample not included: ~/snippets/csharp/System.Net/CredentialCache/Overview/source.cs._

## CredentialCache.DefaultCredentials <example-value>

```csharp
public static System.Net.ICredentials <example-value> { get; }
```

Gets the system credentials of the application.

Returns: An `ICredentials` that represents the system credentials of the application.

#### Remarks
The `DefaultCredentials` property applies only to NTLM, negotiate, and Kerberos-based authentication.

`CredentialCache.DefaultCredentials` represents the system credentials for the current security context in which the application is running. For a client-side application, these are usually the Windows credentials (user name, password, and domain) of the user running the application. For ASP.NET applications, the default credentials are the user credentials of the logged-in user, or the user being impersonated.

To get the credentials as a `NetworkCredential` instance, use the `DefaultNetworkCredentials` property.

> **Note:**
> The `ICredentials` instance returned by `CredentialCache.DefaultCredentials` cannot be used to view the user name, password, or domain of the current security context.

#### Examples
The following code example uses the `DefaultCredentials` property to get the system credentials of the application.

_Code sample not included: ~/snippets/csharp/System.Net/CredentialCache/DefaultCredentials/credentialcache_defaultcredentials.cs._

## CredentialCache.DefaultNetworkCredentials <example-value>

```csharp
public static System.Net.NetworkCredential <example-value> { get; }
```

Gets the network credentials of the current security context.

Returns: An `NetworkCredential` that represents the network credentials of the current user or application.

#### Remarks
The credentials <example-value> by the `DefaultNetworkCredentials` property is applicable only for NTLM, negotiate, and Kerberos-based authentication.

The credentials <example-value> by `CredentialCache.DefaultNetworkCredentials` represents the authentication credentials for the current security context in which the application is running. For a client-side application, these are usually the Windows credentials (user name, password, and domain) of the user running the application. For ASP.NET applications, the default network credentials are the user credentials of the logged-in user, or the user being impersonated.

## CredentialCache.Add(Uri, String, NetworkCredential) method

```csharp
public void Add (Uri uriPrefix, string authType, System.Net.NetworkCredential cred);
```

Adds a `NetworkCredential` instance to the credential cache for use with protocols other than SMTP and associates it with a Uniform Resource Identifier (URI) prefix and authentication protocol.

Parameters:

- `uriPrefix`: A `Uri` that specifies the URI prefix of the resources that the credential <example-value> access to.
- `authType`: The authentication scheme used by the resource named in `uriPrefix`.
- `cred`: The `NetworkCredential` to add to the credential cache.

Exceptions:

- `ArgumentNullException`: `uriPrefix` is `null`.

-or-

`authType` is `null`.
- `ArgumentException`: The same credentials are added more than once.

#### Remarks
The `CredentialCache.Add` method places a `NetworkCredential` instance for use with protocols other than SMTP into the `CredentialCache`. The cache stores credentials in the order in which they are added to it. When the `GetCredential` method is called, it returns the proper matching `NetworkCredential` instance.

#### Examples
The following code example initializes a `CredentialCache` with multiple security credentials and uses those credentials with a `WebRequest`.

_Code sample not included: ~/snippets/csharp/System.Net/CredentialCache/Overview/source.cs._

## CredentialCache.Add(String, Int32, String, NetworkCredential) method

```csharp
public void Add (string host, int port, string authenticationType, System.Net.NetworkCredential <example-value>);
```

Adds a `NetworkCredential` instance for use with SMTP to the credential cache and associates it with a host computer, port, and authentication protocol. Credentials added using this method are valid for SMTP only. This method does not work for HTTP or FTP requests.

Parameters:

- `host`: A `String` that identifies the host computer.
- `port`: A `Int32` that specifies the port to connect to on `host`.
- `authenticationType`: A `String` that identifies the authentication scheme used when connecting to `host` using `credential`.
- `credential`: The `NetworkCredential` to add to the credential cache.

Exceptions:

- `ArgumentNullException`: `host` is `null`.

-or-

`authenticationType` is `null`.
- `ArgumentException`: `authenticationType` not an accepted value.
- `ArgumentOutOfRangeException`: `port` is less than zero.

#### Remarks
This method places a `NetworkCredential` instance for use with SMTP into the `CredentialCache`. The cache stores credentials in the order in which they are added to it. When the `GetCredential` method is called, it returns a `NetworkCredential` instance that is selected by matching the `host`, `port`, and `authenticationType`. The comparison is done case-insensitively.

The supported values for `authenticationType` are "NTLM", "Digest", "Kerberos", and "Negotiate".

Credentials added with this method are only valid for use with SMTP. This method does not work for HTTP or FTP protocols.

#### Examples
The following code example initializes a `CredentialCache` with multiple security credentials for use with SMTP and uses one of those credentials with a `SmtpClient`.

_Code sample not included: ~/snippets/csharp/System.Net/CredentialCache/Add/source.cs._

## CredentialCache.GetCredential(Uri, String) method

```csharp
public System.Net.NetworkCredential? GetCredential (Uri uriPrefix, string authType);
```

Returns the `NetworkCredential` instance associated with the specified Uniform Resource Identifier (URI) and authentication type.

Parameters:

- `uriPrefix`: A `Uri` that specifies the URI prefix of the resources that the credential <example-value> access to.
- `authType`: The authentication scheme used by the resource named in `uriPrefix`.

Returns: A `NetworkCredential` or, if there is no matching credential in the cache, `null`.

Exceptions:

- `ArgumentNullException`: `uriPrefix` or `authType` is `null`.

#### Remarks
The `GetCredential` method searches the `CredentialCache` and returns the `NetworkCredential` instance for the specified URI and authorization type. If the `CredentialCache` contains no matching `NetworkCredential` instance, `null` is returned.

`CredentialCache.GetCredential` uses the longest matching URI prefix in the cache to determine which set of credentials to return for an authorization type. The following table shows examples.

|URI Prefix|Matches|
|----------------|-------------|
|`http://www.contoso.com/portal/news.htm`|Requests for the specific Web page `news.htm`.|
|`http://www.contoso.com/portal/`|Requests for all content in the `portal` path, except the page `news.htm`.|
|`http://www.contoso.com/`|Requests for all resources at `www.contoso.com`, except those in the `portal` path.|

#### Examples
The following code example uses the `GetCredential` method to return the `NetworkCredential` instance associated with the specified URI and authentication type.

_Code sample not included: ~/snippets/csharp/System.Net/CredentialCache/GetCredential/credentialcache_getcredential.cs._

## CredentialCache.GetCredential(String, Int32, String) method

```csharp
public System.Net.NetworkCredential? GetCredential (string host, int port, string authenticationType);
```

Returns the `NetworkCredential` instance associated with the specified host, port, and authentication protocol.

Parameters:

- `host`: A `String` that identifies the host computer.
- `port`: A `Int32` that specifies the port to connect to on `host`.
- `authenticationType`: A `String` that identifies the authentication scheme used when connecting to `host`.

Returns: A `NetworkCredential` or, if there is no matching credential in the cache, `null`.

Exceptions:

- `ArgumentNullException`: `host` is `null`.

-or-

`authenticationType` is `null`.
- `ArgumentException`: `authenticationType` not an accepted value.

-or-

`host` is equal to the empty string ("").
- `ArgumentOutOfRangeException`: `port` is less than zero.

#### Remarks
This method searches the `CredentialCache` and returns the `NetworkCredential` instance for the specified host, port, and authorization type. The `host`, `port`, and `authenticationType` values passed to this method are case-insensitively compared to the values specified when the credential was added to the `CredentialCache` using the `CredentialCache.Add` methods.

The supported values for `authenticationType` are "NTLM", "Digest", "Kerberos", and "Negotiate".

## CredentialCache.GetEnumerator() method

```csharp
public System.Collections.IEnumerator GetEnumerator ();
```

Returns an enumerator that can iterate through the `CredentialCache` instance.

Returns: An `IEnumerator` for the `CredentialCache`.

#### Examples
The following code example uses the `CredentialCache.GetEnumerator` method to return an enumerator that can iterate through the `CredentialCache` instance.

_Code sample not included: ~/snippets/csharp/System.Net/CredentialCache/GetEnumerator/credentialcache_getenumerator.cs._

## CredentialCache.Remove(Uri, String) method

```csharp
public void Remove (Uri? uriPrefix, string? authType);
```

Deletes a `NetworkCredential` instance from the cache if it is associated with the specified Uniform Resource Identifier (URI) prefix and authentication protocol.

Parameters:

- `uriPrefix`: A `Uri` that specifies the URI prefix of the resources that the credential is used for.
- `authType`: The authentication scheme used by the host named in `uriPrefix`.

#### Remarks
This method removes a `NetworkCredential` instance from the `CredentialCache` if the specified URI prefix and authentication protocol match those associated with the credential. Multiple calls to the `CredentialCache.Remove` method for the same `NetworkCredential` have no effect.

If `authType` is `null` or `uriPrefix` is `null`, or no matching credential is found in the cache, this method does nothing.

#### Examples
The following code example uses this method to delete a `NetworkCredential` instance from the cache.

_Code sample not included: ~/snippets/csharp/System.Net/CredentialCache/Remove/credentialcache_add_remove.cs._

## CredentialCache.Remove(String, Int32, String) method

```csharp
public void Remove (string? host, int port, string? authenticationType);
```

Deletes a `NetworkCredential` instance from the cache if it is associated with the specified host, port, and authentication protocol.

Parameters:

- `host`: A `String` that identifies the host computer.
- `port`: A `Int32` that specifies the port to connect to on `host`.
- `authenticationType`: A `String` that identifies the authentication scheme used when connecting to `host`.

#### Remarks
This method removes a `NetworkCredential` instance from the `CredentialCache` if the specified host, port, and authentication protocol match those associated with the credential. Multiple calls to the `CredentialCache.Remove` method for the same `NetworkCredential` have no effect.

If `authenticationType` is `null` or `uriPrefix` is `null`, or no matching credential is found in the cache, this method does nothing.
