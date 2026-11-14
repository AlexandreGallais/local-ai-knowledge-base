---
title: "FtpWebRequest class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/FtpWebRequest.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FtpWebRequest class (part 2 of 3)

## FtpWebRequest.KeepAlive property

```csharp
public bool KeepAlive { get; set; }
```

Gets or sets a `Boolean` value that specifies whether the control connection to the FTP server is closed after the request completes.

Returns: `true` if the connection to the server should not be destroyed; otherwise, `false`. The default value is `true`.

Exceptions:

- `InvalidOperationException`: A new value was specified for this property for a request that is already in progress.

#### Remarks
When the `KeepAlive` property is set to `false`, the control connection is closed when you call the `FtpWebResponse.Close` method.

Changing `FtpWebRequest.KeepAlive` after calling the `FtpWebRequest.GetRequestStream`, `FtpWebRequest.BeginGetRequestStream`, `FtpWebRequest.GetResponse`, or `FtpWebRequest.BeginGetResponse` method causes an `InvalidOperationException` exception.

#### Examples
The following code example retrieves and displays property values for a specified `FtpWebRequest` object.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebRequest.Method property

```csharp
public override string Method { get; set; }
```

Gets or sets the command to send to the FTP server.

Returns: A `String` value that contains the FTP command to send to the server. The default value is `Ftp.DownloadFile`.

Exceptions:

- `InvalidOperationException`: A new value was specified for this property for a request that is already in progress.
- `ArgumentException`: The method is invalid.

-or-

The method is not supported.

-or-

Multiple methods were specified.

#### Remarks
The `Method` property determines which command is sent to the server. You set the `FtpWebRequest.Method` by using the strings defined in the public field members of the `Ftp` class. Note that the strings defined in the `Ftp` class are the only supported options for the `Method` property. Setting the `Method` property to any other value will result in an `ArgumentException` exception.

When setting `FtpWebRequest.Method` to `UploadFile`, you must do so before calling the `FtpWebRequest.GetRequestStream` method. Failure to call these members in the correct order causes a `ProtocolViolationException` exception when you attempt to get the request stream.

The credentials <example-value> for the `FtpWebRequest` object must have permission to perform the specified method. If not, the FTP command fails.

To determine the success or failure of a command, check the `FtpWebResponse.StatusCode` and `FtpWebResponse.StatusDescription` properties.

#### Examples
The following code example sets this property to `DeleteFile`.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebRequest.PreAuthenticate property

```csharp
public override bool PreAuthenticate { get; set; }
```

Always throws a `NotSupportedException`.

Returns: Always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: Preauthentication is not supported for FTP.

#### Remarks
The `PreAuthenticate` property is provided only for compatibility with other implementations of the `WebRequest` and `WebResponse` classes.

## FtpWebRequest.Proxy property

```csharp
public override System.Net.IWebProxy? Proxy { get; set; }
```

Gets or sets the proxy used to communicate with the FTP server.

Returns: Always `null`.

Exceptions:

- `ArgumentNullException`: This property cannot be set to `null`.
- `InvalidOperationException`: A new value was specified for this property for a request that is already in progress.

> **Note:**
> This property is not supported, and setting it has no effect. Getting the property value returns `null`.

## FtpWebRequest.ReadWriteTimeout property

```csharp
public int ReadWriteTimeout { get; set; }
```

Gets or sets a time-out when reading from or writing to a stream.

Returns: The number of milliseconds before the reading or writing times out. The default value is 300,000 milliseconds (5 minutes).

Exceptions:

- `InvalidOperationException`: The request has already been sent.
- `ArgumentOutOfRangeException`: The value specified for a set operation is less than or equal to zero and is not equal to `Timeout.Infinite`.

#### Remarks
The `FtpWebRequest.ReadWriteTimeout` is used when writing to the stream returned by the `FtpWebRequest.GetRequestStream` method or reading from the stream returned by the `FtpWebResponse.GetResponseStream` method.

Specifically, the `ReadWriteTimeout` property controls the time-out for the `Stream.Read` method, which is used to read the stream returned by the `FtpWebResponse.GetResponseStream` method, and for the `Stream.Write` method, which is used to write to the stream returned by the `FtpWebRequest.GetRequestStream` method. If the time-out period is exceeded, the calling method throws a `WebException` with `WebExceptionStatus` set to `Timeout`.

To specify the amount of time to wait for the request to complete, use the `Timeout` property.

## FtpWebRequest.RenameTo property

```csharp
public string? RenameTo { get; set; }
```

Gets or sets the new name of a file being renamed.

Returns: The new name of the file being renamed.

Exceptions:

- `ArgumentException`: The value specified for a set operation is `null` or an empty string.
- `InvalidOperationException`: A new value was specified for this property for a request that is already in progress.

To be added.

## FtpWebRequest.RequestUri property

```csharp
public override Uri RequestUri { get; }
```

Gets the URI requested by this instance.

Returns: A `Uri` instance that identifies a resource that is accessed using the File Transfer Protocol.

#### Remarks
The value of the `RequestUri` property is the URI specified when the `WebRequest.Create` method was called to obtain this instance.

#### Examples
The following code example displays this property value.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebRequest.ServicePoint property

```csharp
public System.Net.ServicePoint ServicePoint { get; }
```

Gets the `ServicePoint` object used to connect to the FTP server.

Returns: A `ServicePoint` object that can be used to customize connection behavior.

#### Remarks
If no `ServicePoint` object exists, one is created for the FTP server. To set the maximum number of connections that can be open for an FTP server, set the `ConnectionLimit` property of the `ServicePoint` instance returned by this property.

#### Examples
The following code example retrieves the service point from a request and sets the maximum number of connections to one.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebRequest.Timeout property

```csharp
public override int Timeout { get; set; }
```

Gets or sets the number of milliseconds to wait for a request.

Returns: An `Int32` value that contains the number of milliseconds to wait before a request times out. The default value is `Timeout.Infinite`.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified is less than zero and is not `Timeout.Infinite`.
- `InvalidOperationException`: A new value was specified for this property for a request that is already in progress.

#### Remarks
To specify an infinite value, set the `Timeout` property to `Infinite` (-1). This is the default value.

`FtpWebRequest.Timeout` is the number of milliseconds that a synchronous request made with the `FtpWebRequest.GetResponse` method waits for a response and that the `FtpWebRequest.GetRequestStream` method waits for a stream. If a resource does not respond within the time-out period, the request throws a `WebException` with the `Status` property set to `Timeout`.

Changing `FtpWebRequest.Timeout` after calling the `FtpWebRequest.GetRequestStream`, `FtpWebRequest.BeginGetRequestStream`, `FtpWebRequest.GetResponse`, or `FtpWebRequest.BeginGetResponse` method causes an `InvalidOperationException` exception.

A Domain Name System (DNS) query may take up to 15 seconds to return or time out. If your request contains a host name that requires resolution and you set `FtpWebRequest.Timeout` to a value less than 15 seconds, it may take 15 seconds or more before a `WebException` is thrown to indicate a time-out on your request.

#### Examples
The following code example sets this property.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebRequest.UseBinary property

```csharp
public bool UseBinary { get; set; }
```

Gets or sets a `Boolean` value that specifies the data type for file transfers.

Returns: `true` to indicate to the server that the data to be transferred is binary; `false` to indicate that the data is text. The default value is `true`.

Exceptions:

- `InvalidOperationException`: A new value was specified for this property for a request that is already in progress.

#### Remarks
If you are sending binary data, such as an image, set this property to `true`. If you are sending text, set the property to `false`. Specifying `true` causes the `FtpWebRequest` to send a `"TYPE I"` command to the server. Specifying `false` causes the `FtpWebRequest` to send a `"Type A"` command to the server. FTP servers can ignore these commands.

Changing `FtpWebRequest.UseBinary` after calling the `FtpWebRequest.GetRequestStream`, `FtpWebRequest.BeginGetRequestStream`, `FtpWebRequest.GetResponse`, or `FtpWebRequest.BeginGetResponse` method causes an `InvalidOperationException` exception.

#### Examples
The following code example retrieves and displays property values for a specified `FtpWebRequest` object.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebRequest.UseDefaultCredentials <example-value>

```csharp
public override bool UseDefaultCredentials { get; set; }
```

Always throws a `NotSupportedException`.

Returns: Always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: Default credentials are not supported for FTP.

#### Remarks
The `UseDefaultCredentials` property is provided only for compatibility with other implementations of the `WebRequest` and `WebResponse` classes. There is no reason to use `FtpWebRequest.UseDefaultCredentials`.

## FtpWebRequest.UsePassive property

```csharp
public bool UsePassive { get; set; }
```

Gets or sets the behavior of a client application's data transfer process.

Returns: `false` if the client application's data transfer process listens for a connection on the data port; otherwise, `true` if the client should initiate a connection on the data port. The default value is `true`.

Exceptions:

- `InvalidOperationException`: A new value was specified for this property for a request that is already in progress.

#### Remarks
Setting the `UsePassive` property to `true` sends the "`PASV"` command to the server. This command requests the server to listen on a data port and to wait for a connection rather than initiate one upon receipt of a transfer command.

For a description of the behaviors that are specified using `FtpWebRequest.UsePassive`, see RFC 959: "File Transfer Protocol", Section 3.2: "Establishing Data Connections" and Section 4.1.2: "Transfer Parameter Commands".

Changing `FtpWebRequest.UsePassive` after calling the `FtpWebRequest.GetRequestStream`, `FtpWebRequest.BeginGetRequestStream`, `FtpWebRequest.GetResponse`, or `FtpWebRequest.BeginGetResponse` method causes an `InvalidOperationException` exception.

If `FtpWebRequest.UsePassive` is set to `true`, the FTP server may not send the size of the file, and download progress can always be zero. If `FtpWebRequest.UsePassive` is set to `false`, a firewall can raise an alert and block the file download.

#### Examples
The following code example retrieves and displays property values for a specified `FtpWebRequest` object.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebRequest.Abort() method

```csharp
public override void Abort ();
```

Terminates an asynchronous FTP operation.

#### Remarks
If there is no operation in progress, this method does nothing. If a file transfer is in progress, this method terminates the transfer.

> **Note:**
> This member emits trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates how the user can terminate an asynchronous upload of a file from the local directory to the server.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebRequest.BeginGetRequestStream(AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginGetRequestStream (AsyncCallback? callback, object? state);
```

Begins asynchronously opening a request's content stream for writing.

Parameters:

- `callback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `state`: A user-defined object that contains information about the operation. This object is passed to the `callback` delegate when the operation completes.

Returns: An `IAsyncResult` instance that indicates the status of the operation.

Exceptions:

- `InvalidOperationException`: A previous call to this method or `FtpWebRequest.GetRequestStream` has not yet completed.
- `WebException`: A connection to the FTP server could not be established.
- `ProtocolViolationException`: The `FtpWebRequest.Method` property is not set to `Ftp.UploadFile`.

#### Remarks
You must complete the asynchronous operation by calling the `FtpWebRequest.EndGetRequestStream` method. Typically, `FtpWebRequest.EndGetRequestStream` is called by the method referenced by `callback`. To determine the state of the operation, check the properties in the `IAsyncResult` object returned by this method.

This method does not block while waiting for the stream. To block, call `FtpWebRequest.GetRequestStream` in place of this method.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously.

> **Note:**
> This member emits trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates beginning an asynchronous operation to get a request's stream. This code example is part of a larger example provided for the `FtpWebRequest` class overview.

_Code sample not included: ~/snippets/csharp/System.Net/FtpWebRequest/Overview/async.cs._
