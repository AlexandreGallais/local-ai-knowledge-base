---
title: "FtpWebRequest class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/FtpWebRequest.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FtpWebRequest class

Namespace: `System.Net`

```csharp
public sealed class FtpWebRequest : System.Net.WebRequest
```

Implements a File Transfer Protocol (FTP) client.

#### Remarks

> **Important:**
> We don't recommend that you use the `FtpWebRequest` class for new development. For more information and alternatives to `FtpWebRequest`, see WebRequest shouldn't be used on GitHub.

To obtain an instance of `FtpWebRequest`, use the `WebRequest.Create` method. You can also use the `WebClient` class to upload and download information from an FTP server. Using either of these approaches, when you specify a network resource that uses the FTP scheme (for example, `"ftp://contoso.com"`) the `FtpWebRequest` class provides the ability to programmatically interact with FTP servers.

The URI can be relative or absolute. If the URI is of the form `"<example-value>"` (%2f is an escaped '<example-value>'), then the URI is absolute, and the current directory is `/path`. If, however, the URI is of the form `"<example-value>"`, first .NET logs into the FTP server (using the user name and password set by the `Credentials` property), then the current directory is set to `<UserLoginDirectory>/path`.

You must have a valid user name and password for the server or the server must allow anonymous logon. You can specify the credentials used to connect to the server by setting the `Credentials` property or you can include them in the `Uri.UserInfo` portion of the URI passed to the `WebRequest.Create` method. If you include `Uri.UserInfo` information in the URI, the `Credentials` property is set to a new network credential with the specified user name and password information.

> **Caution:**
> Unless the `EnableSsl` property is `true`, all data and commands, including your user name and password <example-value>, are sent to the server in clear text. Anyone monitoring network traffic can view your credentials and use them to connect to the server. If you are connecting to an FTP server that requires credentials and supports Secure Sockets Layer (SSL), you should set `FtpWebRequest.EnableSsl` to `true`.

You must have `WebPermission` to access the FTP resource; otherwise, a `SecurityException` exception is thrown.

Specify the FTP command to send to the server by setting the `Method` property to a value defined in the `Ftp` structure. To transmit text data, change the `UseBinary` property from its default value (`true`) to `false`. For details and restrictions, see `FtpWebRequest.Method`.

When using an `FtpWebRequest` object to upload a file to a server, you must write the file content to the request stream obtained by calling the `FtpWebRequest.GetRequestStream` method or its asynchronous counterparts, the `FtpWebRequest.BeginGetRequestStream` and `FtpWebRequest.EndGetRequestStream` methods. You must write to the stream and close the stream before sending the request.

Requests are sent to the server by calling the `FtpWebRequest.GetResponse` method or its asynchronous counterparts, the `FtpWebRequest.BeginGetResponse` and `FtpWebRequest.EndGetResponse` methods. When the requested operation completes, an `FtpWebResponse` object is returned. The `FtpWebResponse` object provides the status of the operation and any data downloaded from the server.

You can set a time-out value for reading or writing to the server by using the `ReadWriteTimeout` property. If the time-out period is exceeded, the calling method throws a `WebException` with `WebExceptionStatus` set to `Timeout`.

When downloading a file from an FTP server, if the command was successful, the contents of the requested file are available in the response object's stream. You can access this stream by calling the `FtpWebResponse.GetResponseStream` method. For more information, see `FtpWebResponse`.

If the `Proxy` property is set, either directly or in a configuration file, communications with the FTP server are made through the specified proxy. If the specified proxy is an HTTP proxy, only the `DownloadFile`, `ListDirectory`, and `ListDirectoryDetails` commands are supported.

Only downloaded binary content is cached; that is, content received using the `DownloadFile` command with the `UseBinary` property set to `true`.

Multiple `FtpWebRequest`s reuse existing connections, if possible.

For more information about the FTP protocol, see RFC 959: File Transfer Protocol.

#### Examples
The following code example demonstrates deleting a file from an FTP server.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
The following code example demonstrates downloading a file from an FTP server by using the `WebClient` class.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
The following code example demonstrates using asynchronous operations to upload a file to an FTP server.

_Code sample not included: ~/snippets/csharp/System.Net/FtpWebRequest/Overview/async.cs._
## FtpWebRequest.ClientCertificates property

```csharp
public System.Security.Cryptography.X509Certificates.X509CertificateCollection ClientCertificates { get; set; }
```

Gets or sets the certificates used for establishing an encrypted connection to the FTP server.

Returns: An `X509CertificateCollection` object that contains the client certificates.

Exceptions:

- `ArgumentNullException`: The value specified for a set operation is `null`.

#### Remarks
Client certificates are used to authenticate the client during the initial SSL connection negotiation. For more information, see `FtpWebRequest.EnableSsl`.

> **Note:**
> .NET caches SSL sessions as they are created and attempts to reuse a cached session for a new request, if possible. When attempting to reuse an SSL session, .NET uses the first element of `HttpWebRequest.ClientCertificates` (if there is one), or tries to reuse an anonymous session if `HttpWebRequest.ClientCertificates` is empty.

## FtpWebRequest.ConnectionGroupName property

```csharp
public override string? ConnectionGroupName { get; set; }
```

Gets or sets the name of the connection group that contains the service point used to send the current request.

Returns: A `String` value that contains a connection group name.

Exceptions:

- `InvalidOperationException`: A new value was specified for this property for a request that is already in progress.

#### Remarks
Connection groups associate a set of requests with a particular connection or set of connections. The connections in a connection group can be reused only by requests that have the same credentials and that specify the connection group name. When a request does not specify a connection group name, any existing connection to the requested server that is not associated with a connection group can be used. When the credentials are not the same, the existing connection is closed and the new request must be reauthenticated.

Using connection groups can improve performance because this allows all of the requests for a user to reuse the connection authenticated with the user's credentials.

Changing the `ConnectionGroupName` property after calling the `FtpWebRequest.GetRequestStream`, `FtpWebRequest.BeginGetRequestStream`, `FtpWebRequest.GetResponse`, or `FtpWebRequest.BeginGetResponse` method causes an `InvalidOperationException` exception.

#### Examples
The following code example retrieves the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebRequest.ContentLength property

```csharp
public override long ContentLength { get; set; }
```

Gets or sets a value that is ignored by the `FtpWebRequest` class.

Returns: An `Int64` value that should be ignored.

#### Remarks
The `ContentLength` property is provided only for compatibility with other implementations of the `WebRequest` and `WebResponse` classes. There is no reason to use `FtpWebRequest.ContentLength`.

## FtpWebRequest.ContentOffset property

```csharp
public long ContentOffset { get; set; }
```

Gets or sets a byte offset into the file being downloaded by this request.

Returns: An `Int64` instance that specifies the file offset, in bytes. The default value is zero.

Exceptions:

- `InvalidOperationException`: A new value was specified for this property for a request that is already in progress.
- `ArgumentOutOfRangeException`: The value specified for this property is less than zero.

#### Remarks
Set the `ContentOffset` property when downloading a file from an FTP server. This offset indicates the position in the server's file that marks the start of the data to be downloaded. The offset is specified as the number of bytes from the start of the file; the offset of the first byte is zero.

Setting `FtpWebRequest.ContentOffset` causes the `FtpWebRequest` to send a restart (`REST`) command to the server. This command is ignored by most FTP server implementations if you are uploading data to the server.

Changing `FtpWebRequest.ContentOffset` after calling the `FtpWebRequest.GetRequestStream`, `FtpWebRequest.BeginGetRequestStream`, `FtpWebRequest.GetResponse`, or `FtpWebRequest.BeginGetResponse` method causes an `InvalidOperationException` exception.

#### Examples
The following code example demonstrates downloading part of a file from a server and appending the downloaded data to a local file.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebRequest.ContentType property

```csharp
public override string? ContentType { get; set; }
```

Always throws a `NotSupportedException`.

Returns: Always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: Content type information is not supported for FTP.

#### Remarks
The `ContentType` property is provided only for compatibility with other implementations of the `WebRequest` and `WebResponse` classes. There is no reason to use `FtpWebRequest.ContentType`.

## FtpWebRequest.Credentials <example-value>

```csharp
public override System.Net.ICredentials? Credentials { get; set; }
```

Gets or sets the credentials used to communicate with the FTP server.

Returns: An `ICredentials` instance; otherwise, `null` if the property has not been set.

Exceptions:

- `ArgumentNullException`: The value specified for a set operation is `null`.
- `ArgumentException`: An `ICredentials` of a type other than `NetworkCredential` was specified for a set operation.
- `InvalidOperationException`: A new value was specified for this property for a request that is already in progress.

#### Remarks
You are not required to specify credentials when connecting using anonymous logon. You must set the `Credentials` property by using a credential of type `NetworkCredential`; this ensures that the user name and password can be read and sent to the server.

> **Caution:**
> Credentials <example-value> is not encrypted when transmitted to the server unless the `EnableSsl` property is set to `true`.

Changing `FtpWebRequest.Credentials` after calling the `FtpWebRequest.GetRequestStream`, `FtpWebRequest.BeginGetRequestStream`, `FtpWebRequest.GetResponse`, or `FtpWebRequest.BeginGetResponse` method causes an `InvalidOperationException` exception.

#### Examples
The following code example retrieves the value of this property and uses it to display the user name.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebRequest.DefaultCachePolicy property

```csharp
public static System.Net.Cache.RequestCachePolicy? DefaultCachePolicy { get; set; }
```

Defines the default cache policy for all FTP requests.

Returns: A `RequestCachePolicy` that defines the cache policy for FTP requests.

Exceptions:

- `ArgumentNullException`: The caller tried to set this property to `null`.

#### Remarks
Only content received using the `DownloadFile` command is cached.

The following table describes the effects of FTP caching policies on `FtpWebRequest`.

|Policy|Effect|
|------------|------------|
|`Default`|Returns the cached resource if the resource is fresh, the content length is accurate, and the expiration, modification, and content length attributes are present.|
|`BypassCache`|Returns the resource from the server.|
|`CacheOnly`|Returns the cached resource if the content length is present and matches the entry size; otherwise, throws a `WebException`.|
|`CacheIfAvailable`|Returns the cached resource if the content length is provided and matches the entry size; otherwise, the resource is downloaded from the server and is returned to the caller.|
|`Revalidate`|Returns the cached resource if the timestamp of the cached resource is the same as the time stamp of the resource on the server; otherwise, the resource is downloaded from the server, stored in the cache, and returned to the caller.|
|`Reload`|Downloads the resource from the server, stores it in the cache, and returns the resource to the caller.|
|`NoCacheNoStore`|If a cached resource exists, it is deleted. The resource is downloaded from the server and is returned to the caller.|

> **Note:**
> Setting `FtpWebRequest.DefaultCachePolicy` overrides any configuration setting.

## FtpWebRequest.EnableSsl property

```csharp
public bool EnableSsl { get; set; }
```

Gets or sets a `Boolean` that specifies that an SSL connection should be used.

Returns: `true` if control and data transmissions are encrypted; otherwise, `false`. The default value is `false`.

Exceptions:

- `InvalidOperationException`: The connection to the FTP server has already been established.

#### Remarks

> **Caution:**
> Unless the `EnableSsl` property is `true`, all data and commands, including your user name and password <example-value>, are sent to the server in clear text. Anyone monitoring network traffic can view your credentials and use them to connect to the server. If you are connecting to an FTP server that requires credentials and supports SSL, you should set `FtpWebRequest.EnableSsl` to `true`.

The `"AUTH TLS"` command is sent to the server to request an encrypted session. If the server does not recognize this command, you receive a `WebException` exception.

#### Examples
The following code example uses an encrypted connection to download the directory listing from an FTP server.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebRequest.Headers property

```csharp
public override System.Net.WebHeaderCollection Headers { get; set; }
```

Gets an empty `WebHeaderCollection` object.

Returns: An empty `WebHeaderCollection` object.

#### Remarks
The `Headers` property is provided only for compatibility with other implementations of the `WebRequest` and `WebResponse` classes. There is no reason to use `FtpWebRequest.Headers`.
