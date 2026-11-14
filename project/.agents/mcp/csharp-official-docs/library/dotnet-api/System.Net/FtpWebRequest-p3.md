---
title: "FtpWebRequest class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/FtpWebRequest.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FtpWebRequest class (part 3 of 3)

## FtpWebRequest.BeginGetResponse(AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginGetResponse (AsyncCallback? callback, object? state);
```

Begins sending a request and receiving a response from an FTP server asynchronously.

Parameters:

- `callback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `state`: A user-defined object that contains information about the operation. This object is passed to the `callback` delegate when the operation completes.

Returns: An `IAsyncResult` instance that indicates the status of the operation.

Exceptions:

- `InvalidOperationException`: `FtpWebRequest.GetResponse` or `FtpWebRequest.BeginGetResponse` has already been called for this instance.

#### Remarks
You must complete the asynchronous operation by calling the `FtpWebRequest.EndGetResponse` method. Typically, `FtpWebRequest.EndGetResponse` is called by the method referenced by `callback`. To determine the state of the operation, check the properties in the `IAsyncResult` object returned by the `FtpWebRequest.BeginGetResponse` method.

If the `Proxy` property is set, either directly or in a configuration file, communications with the FTP server are made through the specified proxy.

`FtpWebRequest.BeginGetResponse` does not block while waiting for the response from the server. To block, call the `FtpWebRequest.GetResponse` method in place of `FtpWebRequest.BeginGetResponse`.

For more information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously.

This member emits trace information when you enable network tracing in your application.

> **Note:**
> If a `WebException` is thrown, use the `WebException.Response` and `WebException.Status` properties of the exception to determine the response from the server.

#### Examples
The following code example demonstrates ending an asynchronous operation to get a request's stream, and then starting a request to get the response. This code example is part of a larger example provided for the `FtpWebRequest` class overview.

_Code sample not included: ~/snippets/csharp/System.Net/FtpWebRequest/Overview/async.cs._
## FtpWebRequest.EndGetRequestStream(IAsyncResult) method

```csharp
public override System.IO.Stream EndGetRequestStream (IAsyncResult asyncResult);
```

Ends a pending asynchronous operation started with `FtpWebRequest.BeginGetRequestStream`.

Parameters:

- `asyncResult`: The `IAsyncResult` object that was returned when the operation started.

Returns: A writable `Stream` instance associated with this instance.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not obtained by calling `FtpWebRequest.BeginGetRequestStream`.
- `InvalidOperationException`: This method was already called for the operation identified by `asyncResult`.

#### Remarks
If the operation has not completed, the `FtpWebRequest.EndGetRequestStream` method blocks until the operation completes. To determine whether the operation has completed, check the `IsCompleted` property before calling `FtpWebRequest.EndGetRequestStream`.

In addition to the exceptions noted in "Exceptions," `FtpWebRequest.EndGetRequestStream` rethrows exceptions that were thrown while opening the stream for writing.

> **Note:**
> This member emits trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates ending an asynchronous operation to get a request's stream. This code example is part of a larger example provided for the `FtpWebRequest` class overview.

_Code sample not included: ~/snippets/csharp/System.Net/FtpWebRequest/Overview/async.cs._
## FtpWebRequest.EndGetResponse(IAsyncResult) method

```csharp
public override System.Net.WebResponse EndGetResponse (IAsyncResult asyncResult);
```

Ends a pending asynchronous operation started with `FtpWebRequest.BeginGetResponse`.

Parameters:

- `asyncResult`: The `IAsyncResult` that was returned when the operation started.

Returns: A `WebResponse` reference that contains an `FtpWebResponse` instance. This object contains the FTP server's response to the request.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not obtained by calling `FtpWebRequest.BeginGetResponse`.
- `InvalidOperationException`: This method was already called for the operation identified by `asyncResult`.
- `WebException`: An error occurred using an HTTP proxy.

#### Remarks
If the operation has not completed at the time the `FtpWebRequest.EndGetResponse` method is called, `FtpWebRequest.EndGetResponse` blocks until the operation completes. To prevent blocking, check the `IsCompleted` property before calling `FtpWebRequest.EndGetResponse`.

In addition to the exceptions noted in "Exceptions," `FtpWebRequest.EndGetResponse` rethrows exceptions that were thrown while communicating with the server.

> **Note:**
> This member emits trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates ending an asynchronous operation to get a response. This code example is part of a larger example provided for the `FtpWebRequest` class overview.

_Code sample not included: ~/snippets/csharp/System.Net/FtpWebRequest/Overview/async.cs._
## FtpWebRequest.GetRequestStream() method

```csharp
public override System.IO.Stream GetRequestStream ();
```

Retrieves the stream used to upload data to an FTP server.

Returns: A writable `Stream` instance used to store data to be sent to the server by the current request.

Exceptions:

- `InvalidOperationException`: `FtpWebRequest.BeginGetRequestStream` has been called and has not completed.

-or-

An HTTP proxy is enabled, and you attempted to use an FTP command other than `Ftp.DownloadFile`, `Ftp.ListDirectory`, or `Ftp.ListDirectoryDetails`.
- `WebException`: A connection to the FTP server could not be established.
- `ProtocolViolationException`: The `FtpWebRequest.Method` property is not set to `Ftp.UploadFile` or `Ftp.AppendFile`.

#### Remarks
Set the request properties before calling the `FtpWebRequest.GetRequestStream` method. After writing the data to the stream, you must close the stream prior to sending the request.

If you have not set the `Method` property to `UploadFile` or `AppendFile`, you cannot get the stream.

`FtpWebRequest.GetRequestStream` blocks while waiting for the stream. To prevent this, call the `FtpWebRequest.BeginGetRequestStream` method in place of `FtpWebRequest.GetRequestStream`.

> **Note:**
> This member emits trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates copying a file to a request's data stream and sending a request to the server to upload the data and append it to a file.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
## FtpWebRequest.GetResponse() method

```csharp
public override System.Net.WebResponse GetResponse ();
```

Returns the FTP server response.

Returns: A `WebResponse` reference that contains an `FtpWebResponse` instance. This object contains the FTP server's response to the request.

Exceptions:

- `InvalidOperationException`: `FtpWebRequest.GetResponse` or `FtpWebRequest.BeginGetResponse` has already been called for this instance.

-or-

An HTTP proxy is enabled, and you attempted to use an FTP command other than `Ftp.DownloadFile`, `Ftp.ListDirectory`, or `Ftp.ListDirectoryDetails`.
- `WebException`: `FtpWebRequest.EnableSsl` is set to `true`, but the server does not support this feature.

-or-

A `FtpWebRequest.Timeout` was specified and the timeout has expired.

#### Remarks
To access the FTP-specific properties, you must cast the `WebResponse` object returned by this method to `FtpWebResponse`.

`FtpWebRequest.GetResponse` causes a control connection to be established, and might also create a data connection. `FtpWebRequest.GetResponse` blocks until the response is received. To prevent this, you can perform this operation asynchronously by calling the `FtpWebRequest.BeginGetResponse` and `FtpWebRequest.EndGetResponse` methods in place of `FtpWebRequest.GetResponse`.

If the `Proxy` property is set, either directly or in a configuration file, communications with the FTP server are made through the proxy.

If a `WebException` is thrown, use the `WebException.Response` and `WebException.Status` properties of the exception to determine the response from the server.

This member emits trace information when you enable network tracing in your application.> [!NOTE]
> Multiple calls to `FtpWebRequest.GetResponse` return the same response object; the request is not reissued.

#### Examples
The following code example demonstrates copying a file to a request's data stream and sending a request to append data to a file to the server. The example calls `FtpWebRequest.GetResponse` to send the request and block until the response is returned by the server.

_Code sample not included: ~/snippets/csharp/System.Net/FtpStatusCode/Overview/ftptests.cs._
