---
title: "WebClient class (part 6 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebClient class (part 6 of 6)

## WebClient.UploadValuesAsync(Uri, String, NameValueCollection, Object) method

```csharp
public void UploadValuesAsync (Uri address, string? method, System.Collections.Specialized.NameValueCollection data, object? userToken);
```

Uploads the data in the specified name/value collection to the resource identified by the specified URI, using the specified method. This method does not block the calling thread, and allows the caller to pass an object to the method that is invoked when the operation completes.

Parameters:

- `address`: The URI of the resource to receive the collection. This URI must identify a resource that can accept a request sent with the `method` method.
- `method`: The HTTP method used to send the string to the resource. If null, the default is POST for http and STOR for ftp.
- `data`: The `NameValueCollection` to send to the resource.
- `userToken`: A user-defined object that is passed to the method invoked when the asynchronous operation completes.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

There was no response from the server hosting the resource.

-or-

`method` cannot be used to send content.

## WebClient.UploadValuesTaskAsync(String, NameValueCollection) method

```csharp
public System.Threading.Tasks.Task<byte[]> UploadValuesTaskAsync (string address, System.Collections.Specialized.NameValueCollection data);
```

Uploads the specified name/value collection to the resource identified by the specified URI as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the collection.
- `data`: The `NameValueCollection` to send to the resource.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Byte` array containing the response sent by the server.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, and `address` is invalid.

-or-

There was no response from the server hosting the resource.

-or-

An error occurred while opening the stream.

-or-

The `Content-type` header is not `null` or "application/x-www-form-urlencoded".

## WebClient.UploadValuesTaskAsync(Uri, NameValueCollection) method

```csharp
public System.Threading.Tasks.Task<byte[]> UploadValuesTaskAsync (Uri address, System.Collections.Specialized.NameValueCollection data);
```

Uploads the specified name/value collection to the resource identified by the specified URI as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the collection.
- `data`: The `NameValueCollection` to send to the resource.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Byte` array containing the response sent by the server.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, and `address` is invalid.

-or-

An error occurred while opening the stream.

-or-

There was no response from the server hosting the resource.

-or-

The `Content-type` header value is not `null` and is not `application/x-www-form-urlencoded`.

## WebClient.UploadValuesTaskAsync(String, String, NameValueCollection) method

```csharp
public System.Threading.Tasks.Task<byte[]> UploadValuesTaskAsync (string address, string? method, System.Collections.Specialized.NameValueCollection data);
```

Uploads the specified name/value collection to the resource identified by the specified URI as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the collection.
- `method`: The HTTP method used to send the collection to the resource. If null, the default is POST for http and STOR for ftp.
- `data`: The `NameValueCollection` to send to the resource.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Byte` array containing the response sent by the server.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, and `address` is invalid.

-or-

`method` cannot be used to send content.

-or-

There was no response from the server hosting the resource.

-or-

An error occurred while opening the stream.

-or-

The `Content-type` header is not `null` or "application/x-www-form-urlencoded".

## WebClient.UploadValuesTaskAsync(Uri, String, NameValueCollection) method

```csharp
public System.Threading.Tasks.Task<byte[]> UploadValuesTaskAsync (Uri address, string? method, System.Collections.Specialized.NameValueCollection data);
```

Uploads the specified name/value collection to the resource identified by the specified URI as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the collection.
- `method`: The HTTP method used to send the collection to the resource. If null, the default is POST for http and STOR for ftp.
- `data`: The `NameValueCollection` to send to the resource.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Byte` array containing the response sent by the server.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, and `address` is invalid.

-or-

`method` cannot be used to send content.

-or-

There was no response from the server hosting the resource.

-or-

An error occurred while opening the stream.

-or-

The `Content-type` header is not `null` or "application/x-www-form-urlencoded".

## WebClient.DownloadDataCompleted event

```csharp
public event System.Net.DownloadDataCompletedEventHandler? DownloadDataCompleted;
```

Occurs when an asynchronous data download operation completes.

## WebClient.DownloadFileCompleted event

```csharp
public event System.ComponentModel.AsyncCompletedEventHandler? DownloadFileCompleted;
```

Occurs when an asynchronous file download operation completes.

## WebClient.DownloadProgressChanged event

```csharp
public event System.Net.DownloadProgressChangedEventHandler? DownloadProgressChanged;
```

Occurs when an asynchronous download operation successfully transfers some or all of the data.

## WebClient.DownloadStringCompleted event

```csharp
public event System.Net.DownloadStringCompletedEventHandler? DownloadStringCompleted;
```

Occurs when an asynchronous resource-download operation completes.

## WebClient.OpenReadCompleted event

```csharp
public event System.Net.OpenReadCompletedEventHandler? OpenReadCompleted;
```

Occurs when an asynchronous operation to open a stream containing a resource completes.

## WebClient.OpenWriteCompleted event

```csharp
public event System.Net.OpenWriteCompletedEventHandler? OpenWriteCompleted;
```

Occurs when an asynchronous operation to open a stream to write data to a resource completes.

## WebClient.UploadDataCompleted event

```csharp
public event System.Net.UploadDataCompletedEventHandler? UploadDataCompleted;
```

Occurs when an asynchronous data-upload operation completes.

## WebClient.UploadFileCompleted event

```csharp
public event System.Net.UploadFileCompletedEventHandler? UploadFileCompleted;
```

Occurs when an asynchronous file-upload operation completes.

## WebClient.UploadProgressChanged event

```csharp
public event System.Net.UploadProgressChangedEventHandler? UploadProgressChanged;
```

Occurs when an asynchronous upload operation successfully transfers some or all of the data.

## WebClient.UploadStringCompleted event

```csharp
public event System.Net.UploadStringCompletedEventHandler? UploadStringCompleted;
```

Occurs when an asynchronous string-upload operation completes.

## WebClient.UploadValuesCompleted event

```csharp
public event System.Net.UploadValuesCompletedEventHandler? UploadValuesCompleted;
```

Occurs when an asynchronous upload of a name/value collection completes.

## WebClient.WriteStreamClosed event

```csharp
public event System.Net.WriteStreamClosedEventHandler? WriteStreamClosed;
```

Occurs when an asynchronous operation to write data to a resource using a write stream is closed.
