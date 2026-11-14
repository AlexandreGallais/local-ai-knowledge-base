---
title: "FtpWebResponse class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/FtpWebResponse.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FtpWebResponse class

Namespace: `System.Net`

```csharp
public class FtpWebResponse : System.Net.WebResponse, IDisposable
```

Encapsulates a File Transfer Protocol (FTP) server's response to a request.

#### Remarks
Instances of `FtpWebResponse` are obtained by calling the `FtpWebRequest.GetResponse` method. The returned object must be cast to an `FtpWebResponse`. When your application no longer needs the `FtpWebResponse` object, call the `FtpWebResponse.Close` method to free the resources held by the `FtpWebResponse`.

The `StatusCode` property contains the status code returned by the server, and the `StatusDescription` property returns the status code and a message that describes the status. The values returned by these properties change as the messages are returned by the server.

Any data returned by the request, such as the list of file names returned for a `ListDirectory` request, is available in the stream returned by the `FtpWebResponse.GetResponseStream` method. The length of the stream data can be obtained from the `ContentLength` property.

#### Examples
The following code example sends a request to delete a file on an FTP server and displays the status message from the server's response to the request. For additional examples, see the members of the `Ftp` and `FtpWebRequest` classes.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebResponse.BannerMessage property

```csharp
public string? BannerMessage { get; }
```

Gets the message sent by the FTP server when a connection is established prior to logon.

Returns: A `String` that contains the banner message sent by the server; otherwise, `String.Empty` if no message is sent.

#### Examples
The following code example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebResponse.ContentLength property

```csharp
public override long ContentLength { get; }
```

Gets the length of the data received from the FTP server.

Returns: An `Int64` value that contains the number of bytes of data received from the FTP server.

#### Remarks
When a response stream is returned by the FTP server, the `ContentLength` property contains the number of bytes in the stream. `FtpWebResponse.ContentLength` returns −1 if no data was returned in the response or if the server did not send content length information. The return value is greater than or equal to zero if data was or should have been returned. For example, for requests that use the `ListDirectory` field, the `ContentLength` property always returns −1. For requests that use the `UploadFile` method, the `ContentLength` property is always zero. For requests that use the `DownloadFile` method, the property is greater than zero if the downloaded file contained data and is zero if it was empty.

For requests that use the `GetFileSize` method, `FtpWebResponse.ContentLength` returns the size of the specified file on the server.

#### Examples
The following code example downloads a file from on the specified FTP server. This property contains the number of bytes in the downloaded file.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebResponse.ExitMessage property

```csharp
public string? ExitMessage { get; }
```

Gets the message sent by the server when the FTP session is ending.

Returns: A `String` that contains the exit message sent by the server; otherwise, `String.Empty` if no message is sent.

#### Remarks
The `ExitMessage` property is not available until the connection to the server is closed or reused. If the `KeepAlive` property is `true`, the connection used by this request is not closed, which prevents the server from sending an exit message.

#### Examples
The following code example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebResponse.Headers property

```csharp
public override System.Net.WebHeaderCollection Headers { get; }
```

Gets an empty `WebHeaderCollection` object.

Returns: An empty `WebHeaderCollection` object.

#### Remarks
The `Headers` property is provided only for compatibility with other implementations of the `WebRequest` and `WebResponse` classes.

## FtpWebResponse.LastModified property

```csharp
public DateTime LastModified { get; }
```

Gets the date and time that a file on an FTP server was last modified.

Returns: A `DateTime` that contains the last modified date and time for a file.

#### Remarks
The `LastModified` property returns the data requested by the `GetDateTimestamp` method. For requests sent using any other method, `FtpWebResponse.LastModified` returns `MinValue`.

#### Examples
The following code example displays the date and time that a file on an FTP server was last modified.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebResponse.ResponseUri property

```csharp
public override Uri ResponseUri { get; }
```

Gets the URI that sent the response to the request.

Returns: A `Uri` instance that identifies the resource associated with this response.

#### Remarks
Because of server- and resource-specific behaviors, such as redirection, the value returned by the `RequestUri` property is not always the same as the value returned by the `ResponseUri` property.

For requests that use the `UploadFileWithUniqueName` method, `FtpWebResponse.ResponseUri` returns the name of the file on the server.

#### Examples
The following code example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebResponse.StatusCode property

```csharp
public System.Net.FtpStatusCode StatusCode { get; }
```

Gets the most recent status code sent from the FTP server.

Returns: An `FtpStatusCode` value that indicates the most recent status code returned with this response.

#### Remarks
The value returned by the `StatusCode` property is included in the `StatusDescription` property. When you are downloading data, the value of `FtpWebResponse.StatusCode` changes as status codes are returned by the FTP server. After you call the `FtpWebRequest.GetResponse` method, `FtpWebResponse.StatusCode` contains an intermediate status code. When you call the `FtpWebResponse.Close` method, `FtpWebResponse.StatusCode` contains the final status.

#### Examples
The following code example uploads a file to a server and displays the status.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebResponse.StatusDescription property

```csharp
public string? StatusDescription { get; }
```

Gets text that describes a status code sent from the FTP server.

Returns: A `String` instance that contains the status code and message returned with this response.

#### Remarks
The text returned by the `StatusDescription` property includes the 3-digit `StatusCode` property value. When downloading data, the value of `FtpWebResponse.StatusDescription` changes as status codes are returned by the FTP server. After you call the `FtpWebRequest.GetResponse` method, `FtpWebResponse.StatusDescription` contains an intermediate status code. When you call the `FtpWebResponse.Close` method, `FtpWebResponse.StatusDescription` contains the final status.

#### Examples
The following code example sends a request to delete a file on an FTP server and displays the status message from the server's response to the request.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebResponse.SupportsHeaders property

```csharp
public override bool SupportsHeaders { get; }
```

Gets a value that indicates whether the `FtpWebResponse.Headers` property is supported by the `FtpWebResponse` instance.

Returns: `true` if the `FtpWebResponse.Headers` property is supported by the `FtpWebResponse` instance; otherwise, `false`.

To be added.

## FtpWebResponse.WelcomeMessage property

```csharp
public string? WelcomeMessage { get; }
```

Gets the message sent by the FTP server when authentication is complete.

Returns: A `String` that contains the welcome message sent by the server; otherwise, `String.Empty` if no message is sent.

#### Remarks
If the connection is being reused (the `KeepAlive` property is set to `true`), the `WelcomeMessage` property returns the first welcome message received with the connection.

#### Examples
The following code example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebResponse.Close() method

```csharp
public override void Close ();
```

Frees the resources held by the response.

#### Remarks
The `FtpWebResponse.Close` method closes the data stream returned by the `FtpWebResponse.GetResponseStream` method if the `KeepAlive` property is `false`. During the close, data might be sent to the server on the control connection.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example downloads data from a server, reads the data from the response stream, and then closes it.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebResponse.GetResponseStream() method

```csharp
public override System.IO.Stream GetResponseStream ();
```

Retrieves the stream that contains response data sent from an FTP server.

Returns: A readable `Stream` instance that contains data returned with the response; otherwise, `Stream.Null` if no response data was returned by the server.

Exceptions:

- `InvalidOperationException`: The response did not return a data stream.

#### Remarks
After reading the data, you must close the stream. The stream is automatically closed when you close the `FtpWebResponse` object that contains it.

An exception is thrown unless the request method is `DownloadFile` or `ListDirectory`.

#### Examples
The following code example demonstrates getting the response stream for a `ListDirectory` request.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
