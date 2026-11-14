---
title: "WebClient class (part 2 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebClient class (part 2 of 6)

## WebClient.DownloadStringAsync(Uri, Object) method

```csharp
public void DownloadStringAsync (Uri address, object? userToken);
```

Downloads the specified string to the specified resource. This method does not block the calling thread.

Parameters:

- `address`: A `Uri` containing the URI to download.
- `userToken`: A user-defined object that is passed to the method invoked when the asynchronous operation completes.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while downloading the resource.

## WebClient.DownloadStringTaskAsync(String) method

```csharp
public System.Threading.Tasks.Task<string> DownloadStringTaskAsync (string address);
```

Downloads the resource as a `String` from the URI specified as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to download.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Byte` array containing the downloaded resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while downloading the resource.

## WebClient.DownloadStringTaskAsync(Uri) method

```csharp
public System.Threading.Tasks.Task<string> DownloadStringTaskAsync (Uri address);
```

Downloads the resource as a `String` from the URI specified as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to download.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Byte` array containing the downloaded resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while downloading the resource.

## WebClient.GetWebRequest(Uri) method

```csharp
protected virtual System.Net.WebRequest GetWebRequest (Uri address);
```

Returns a `WebRequest` object for the specified resource.

Parameters:

- `address`: A `Uri` that identifies the resource to request.

Returns: A new `WebRequest` object for the specified resource.

## WebClient.GetWebResponse(WebRequest) method

```csharp
protected virtual System.Net.WebResponse GetWebResponse (System.Net.WebRequest request);
```

Returns the `WebResponse` for the specified `WebRequest`.

Parameters:

- `request`: A `WebRequest` that is used to obtain the response.

Returns: A `WebResponse` containing the response for the specified `WebRequest`.

## WebClient.GetWebResponse(WebRequest, IAsyncResult) method

```csharp
protected virtual System.Net.WebResponse GetWebResponse (System.Net.WebRequest request, IAsyncResult result);
```

Returns the `WebResponse` for the specified `WebRequest` using the specified `IAsyncResult`.

Parameters:

- `request`: A `WebRequest` that is used to obtain the response.
- `result`: An `IAsyncResult` object obtained from a previous call to `WebRequest.BeginGetResponse` .

Returns: A `WebResponse` containing the response for the specified `WebRequest`.

## WebClient.OnDownloadDataCompleted(DownloadDataCompletedEventArgs) method

```csharp
protected virtual void OnDownloadDataCompleted (System.Net.DownloadDataCompletedEventArgs e);
```

Raises the `WebClient.DownloadDataCompleted` event.

Parameters:

- `e`: A `DownloadDataCompletedEventArgs` object that contains event data.

## WebClient.OnDownloadFileCompleted(AsyncCompletedEventArgs) method

```csharp
protected virtual void OnDownloadFileCompleted (System.ComponentModel.AsyncCompletedEventArgs e);
```

Raises the `WebClient.DownloadFileCompleted` event.

Parameters:

- `e`: An `AsyncCompletedEventArgs` object containing event data.

## WebClient.OnDownloadProgressChanged(DownloadProgressChangedEventArgs) method

```csharp
protected virtual void OnDownloadProgressChanged (System.Net.DownloadProgressChangedEventArgs e);
```

Raises the `WebClient.DownloadProgressChanged` event.

Parameters:

- `e`: A `DownloadProgressChangedEventArgs` object containing event data.

## WebClient.OnDownloadStringCompleted(DownloadStringCompletedEventArgs) method

```csharp
protected virtual void OnDownloadStringCompleted (System.Net.DownloadStringCompletedEventArgs e);
```

Raises the `WebClient.DownloadStringCompleted` event.

Parameters:

- `e`: A `DownloadStringCompletedEventArgs` object containing event data.

## WebClient.OnOpenReadCompleted(OpenReadCompletedEventArgs) method

```csharp
protected virtual void OnOpenReadCompleted (System.Net.OpenReadCompletedEventArgs e);
```

Raises the `WebClient.OpenReadCompleted` event.

Parameters:

- `e`: A `OpenReadCompletedEventArgs` object containing event data.

## WebClient.OnOpenWriteCompleted(OpenWriteCompletedEventArgs) method

```csharp
protected virtual void OnOpenWriteCompleted (System.Net.OpenWriteCompletedEventArgs e);
```

Raises the `WebClient.OpenWriteCompleted` event.

Parameters:

- `e`: A `OpenWriteCompletedEventArgs` object containing event data.

## WebClient.OnUploadDataCompleted(UploadDataCompletedEventArgs) method

```csharp
protected virtual void OnUploadDataCompleted (System.Net.UploadDataCompletedEventArgs e);
```

Raises the `WebClient.UploadDataCompleted` event.

Parameters:

- `e`: A `UploadDataCompletedEventArgs` object containing event data.

## WebClient.OnUploadFileCompleted(UploadFileCompletedEventArgs) method

```csharp
protected virtual void OnUploadFileCompleted (System.Net.UploadFileCompletedEventArgs e);
```

Raises the `WebClient.UploadFileCompleted` event.

Parameters:

- `e`: An `UploadFileCompletedEventArgs` object containing event data.

## WebClient.OnUploadProgressChanged(UploadProgressChangedEventArgs) method

```csharp
protected virtual void OnUploadProgressChanged (System.Net.UploadProgressChangedEventArgs e);
```

Raises the `WebClient.UploadProgressChanged` event.

Parameters:

- `e`: An `UploadProgressChangedEventArgs` object containing event data.

## WebClient.OnUploadStringCompleted(UploadStringCompletedEventArgs) method

```csharp
protected virtual void OnUploadStringCompleted (System.Net.UploadStringCompletedEventArgs e);
```

Raises the `WebClient.UploadStringCompleted` event.

Parameters:

- `e`: An `UploadStringCompletedEventArgs` object containing event data.

#### Remarks
Classes that inherit from this class can override this method to perform additional tasks when the `UploadStringCompleted` event occurs.

Raising an event invokes the event handler through a delegate. For more information, see Handling and Raising Events.

The `WebClient.OnUploadStringCompleted` method also allows derived classes to handle the event without attaching a delegate. This is the preferred technique for handling the event in a derived class.

#### Examples
The following code example shows an implementation of this method that can be customized by a class derived from `WebClient`.

_Code sample not included: ~/snippets/csharp/System.Net/WebClient/GetWebRequest/mywebclient.cs._

## WebClient.OnUploadValuesCompleted(UploadValuesCompletedEventArgs) method

```csharp
protected virtual void OnUploadValuesCompleted (System.Net.UploadValuesCompletedEventArgs e);
```

Raises the `WebClient.UploadValuesCompleted` event.

Parameters:

- `e`: A `UploadValuesCompletedEventArgs` object containing event data.

## WebClient.OnWriteStreamClosed(WriteStreamClosedEventArgs) method

```csharp
protected virtual void OnWriteStreamClosed (System.Net.WriteStreamClosedEventArgs e);
```

Raises the `WebClient.WriteStreamClosed` event.

Parameters:

- `e`: A `WriteStreamClosedEventArgs` object containing event data.

To be added.

## WebClient.OpenRead(String) method

```csharp
public System.IO.Stream OpenRead (string address);
```

Opens a readable stream for the data downloaded from a resource with the URI specified as a `String`.

Parameters:

- `address`: The URI specified as a `String` from which to download data.

Returns: A `Stream` used to read data from a resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, `address` is invalid.

-or-

An error occurred while downloading data.

## WebClient.OpenRead(Uri) method

```csharp
public System.IO.Stream OpenRead (Uri address);
```

Opens a readable stream for the data downloaded from a resource with the URI specified as a `Uri`.

Parameters:

- `address`: The URI specified as a `Uri` from which to download data.

Returns: A `Stream` used to read data from a resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, `address` is invalid.

-or-

An error occurred while downloading data.

## WebClient.OpenReadAsync(Uri) method

```csharp
public void OpenReadAsync (Uri address);
```

Opens a readable stream containing the specified resource. This method does not block the calling thread.

Parameters:

- `address`: The URI of the resource to retrieve.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and address is invalid.

-or-

An error occurred while downloading the resource.

-or-

An error occurred while opening the stream.

## WebClient.OpenReadAsync(Uri, Object) method

```csharp
public void OpenReadAsync (Uri address, object? userToken);
```

Opens a readable stream containing the specified resource. This method does not block the calling thread.

Parameters:

- `address`: The URI of the resource to retrieve.
- `userToken`: A user-defined object that is passed to the method invoked when the asynchronous operation completes.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and address is invalid.

-or-

An error occurred while downloading the resource.

-or-

An error occurred while opening the stream.

## WebClient.OpenReadTaskAsync(String) method

```csharp
public System.Threading.Tasks.Task<System.IO.Stream> OpenReadTaskAsync (string address);
```

Opens a readable stream containing the specified resource as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to retrieve.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Stream` used to read data from a resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and address is invalid.

-or-

An error occurred while downloading the resource.

-or-

An error occurred while opening the stream.

## WebClient.OpenReadTaskAsync(Uri) method

```csharp
public System.Threading.Tasks.Task<System.IO.Stream> OpenReadTaskAsync (Uri address);
```

Opens a readable stream containing the specified resource as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to retrieve.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Stream` used to read data from a resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and address is invalid.

-or-

An error occurred while downloading the resource.

-or-

An error occurred while opening the stream.

## WebClient.OpenWrite(String) method

```csharp
public System.IO.Stream OpenWrite (string address);
```

Opens a stream for writing data to the specified resource.

Parameters:

- `address`: The URI of the resource to receive the data.

Returns: A `Stream` used to write data to the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, and `address` is invalid.

-or-

An error occurred while opening the stream.

## WebClient.OpenWrite(Uri) method

```csharp
public System.IO.Stream OpenWrite (Uri address);
```

Opens a stream for writing data to the specified resource.

Parameters:

- `address`: The URI of the resource to receive the data.

Returns: A `Stream` used to write data to the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, and `address` is invalid.

-or-

An error occurred while opening the stream.

## WebClient.OpenWrite(String, String) method

```csharp
public System.IO.Stream OpenWrite (string address, string? method);
```

Opens a stream for writing data to the specified resource, using the specified method.

Parameters:

- `address`: The URI of the resource to receive the data.
- `method`: The method used to send the data to the resource. If null, the default is POST for http and STOR for ftp.

Returns: A `Stream` used to write data to the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, and `address` is invalid.

-or-

An error occurred while opening the stream.

## WebClient.OpenWrite(Uri, String) method

```csharp
public System.IO.Stream OpenWrite (Uri address, string? method);
```

Opens a stream for writing data to the specified resource, by using the specified method.

Parameters:

- `address`: The URI of the resource to receive the data.
- `method`: The method used to send the data to the resource. If null, the default is POST for http and STOR for ftp.

Returns: A `Stream` used to write data to the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, and `address` is invalid.

-or-

An error occurred while opening the stream.

## WebClient.OpenWriteAsync(Uri) method

```csharp
public void OpenWriteAsync (Uri address);
```

Opens a stream for writing data to the specified resource. This method does not block the calling thread.

Parameters:

- `address`: The URI of the resource to receive the data.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
