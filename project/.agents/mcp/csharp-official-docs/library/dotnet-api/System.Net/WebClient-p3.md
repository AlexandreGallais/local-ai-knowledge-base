---
title: "WebClient class (part 3 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebClient class (part 3 of 6)

## WebClient.OpenWriteAsync(Uri, String) method

```csharp
public void OpenWriteAsync (Uri address, string? method);
```

Opens a stream for writing data to the specified resource. This method does not block the calling thread.

Parameters:

- `address`: The URI of the resource to receive the data.
- `method`: The method used to send the data to the resource. If null, the default is POST for http and STOR for ftp.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

## WebClient.OpenWriteAsync(Uri, String, Object) method

```csharp
public void OpenWriteAsync (Uri address, string? method, object? userToken);
```

Opens a stream for writing data to the specified resource, using the specified method. This method does not block the calling thread.

Parameters:

- `address`: The URI of the resource to receive the data.
- `method`: The method used to send the data to the resource. If null, the default is POST for http and STOR for ftp.
- `userToken`: A user-defined object that is passed to the method invoked when the asynchronous operation completes.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while opening the stream.

## WebClient.OpenWriteTaskAsync(String) method

```csharp
public System.Threading.Tasks.Task<System.IO.Stream> OpenWriteTaskAsync (string address);
```

Opens a stream for writing data to the specified resource as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the data.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Stream` used to write data to the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while opening the stream.

## WebClient.OpenWriteTaskAsync(Uri) method

```csharp
public System.Threading.Tasks.Task<System.IO.Stream> OpenWriteTaskAsync (Uri address);
```

Opens a stream for writing data to the specified resource as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the data.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Stream` used to write data to the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while opening the stream.

## WebClient.OpenWriteTaskAsync(String, String) method

```csharp
public System.Threading.Tasks.Task<System.IO.Stream> OpenWriteTaskAsync (string address, string? method);
```

Opens a stream for writing data to the specified resource as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the data.
- `method`: The method used to send the data to the resource. If null, the default is POST for http and STOR for ftp.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Stream` used to write data to the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while opening the stream.

## WebClient.OpenWriteTaskAsync(Uri, String) method

```csharp
public System.Threading.Tasks.Task<System.IO.Stream> OpenWriteTaskAsync (Uri address, string? method);
```

Opens a stream for writing data to the specified resource as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the data.
- `method`: The method used to send the data to the resource. If null, the default is POST for http and STOR for ftp.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Stream` used to write data to the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while opening the stream.

## WebClient.UploadData(String, Byte[]) method

```csharp
public byte[] UploadData (string address, byte[] data);
```

Uploads a data buffer to a resource identified by a URI.

Parameters:

- `address`: The URI of the resource to receive the data.
- `data`: The data buffer to send to the resource.

Returns: A `Byte` array containing the body of the response from the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, and `address` is invalid.

-or-

`data` is `null`.

-or-

An error occurred while sending the data.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadData(Uri, Byte[]) method

```csharp
public byte[] UploadData (Uri address, byte[] data);
```

Uploads a data buffer to a resource identified by a URI.

Parameters:

- `address`: The URI of the resource to receive the data.
- `data`: The data buffer to send to the resource.

Returns: A `Byte` array containing the body of the response from the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, and `address` is invalid.

-or-

`data` is `null`.

-or-

An error occurred while sending the data.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadData(String, String, Byte[]) method

```csharp
public byte[] UploadData (string address, string? method, byte[] data);
```

Uploads a data buffer to the specified resource, using the specified method.

Parameters:

- `address`: The URI of the resource to receive the data.
- `method`: The HTTP method used to send the data to the resource. If null, the default is POST for http and STOR for ftp.
- `data`: The data buffer to send to the resource.

Returns: A `Byte` array containing the body of the response from the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, and `address` is invalid.

-or-

`data` is `null`.

-or-

An error occurred while uploading the data.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadData(Uri, String, Byte[]) method

```csharp
public byte[] UploadData (Uri address, string? method, byte[] data);
```

Uploads a data buffer to the specified resource, using the specified method.

Parameters:

- `address`: The URI of the resource to receive the data.
- `method`: The HTTP method used to send the data to the resource. If null, the default is POST for http and STOR for ftp.
- `data`: The data buffer to send to the resource.

Returns: A `Byte` array containing the body of the response from the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, and `address` is invalid.

-or-

`data` is `null`.

-or-

An error occurred while uploading the data.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadDataAsync(Uri, Byte[]) method

```csharp
public void UploadDataAsync (Uri address, byte[] data);
```

Uploads a data buffer to a resource identified by a URI, using the POST method. This method does not block the calling thread.

Parameters:

- `address`: The URI of the resource to receive the data.
- `data`: The data buffer to send to the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while opening the stream.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadDataAsync(Uri, String, Byte[]) method

```csharp
public void UploadDataAsync (Uri address, string? method, byte[] data);
```

Uploads a data buffer to a resource identified by a URI, using the specified method. This method does not block the calling thread.

Parameters:

- `address`: The URI of the resource to receive the data.
- `method`: The method used to send the data to the resource. If `null`, the default is POST for http and STOR for ftp.
- `data`: The data buffer to send to the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while opening the stream.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadDataAsync(Uri, String, Byte[], Object) method

```csharp
public void UploadDataAsync (Uri address, string? method, byte[] data, object? userToken);
```

Uploads a data buffer to a resource identified by a URI, using the specified method and identifying token.

Parameters:

- `address`: The URI of the resource to receive the data.
- `method`: The method used to send the data to the resource. If `null`, the default is POST for http and STOR for ftp.
- `data`: The data buffer to send to the resource.
- `userToken`: A user-defined object that is passed to the method invoked when the asynchronous operation completes.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while opening the stream.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadDataTaskAsync(String, Byte[]) method

```csharp
public System.Threading.Tasks.Task<byte[]> UploadDataTaskAsync (string address, byte[] data);
```

Uploads a data buffer that contains a `Byte` array to the URI specified as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the data.
- `data`: The data buffer to send to the resource.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Byte` array containing the body of the response received from the resource when the data buffer was uploaded.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while opening the stream.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadDataTaskAsync(Uri, Byte[]) method

```csharp
public System.Threading.Tasks.Task<byte[]> UploadDataTaskAsync (Uri address, byte[] data);
```

Uploads a data buffer that contains a `Byte` array to the URI specified as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the data.
- `data`: The data buffer to send to the resource.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Byte` array containing the body of the response received from the resource when the data buffer was uploaded.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while opening the stream.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadDataTaskAsync(String, String, Byte[]) method

```csharp
public System.Threading.Tasks.Task<byte[]> UploadDataTaskAsync (string address, string? method, byte[] data);
```

Uploads a data buffer that contains a `Byte` array to the URI specified as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the data.
- `method`: The method used to send the data to the resource. If `null`, the default is POST for http and STOR for ftp.
- `data`: The data buffer to send to the resource.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Byte` array containing the body of the response received from the resource when the data buffer was uploaded.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while opening the stream.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadDataTaskAsync(Uri, String, Byte[]) method

```csharp
public System.Threading.Tasks.Task<byte[]> UploadDataTaskAsync (Uri address, string? method, byte[] data);
```

Uploads a data buffer that contains a `Byte` array to the URI specified as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the data.
- `method`: The method used to send the data to the resource. If `null`, the default is POST for http and STOR for ftp.
- `data`: The data buffer to send to the resource.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Byte` array containing the body of the response received from the resource when the data buffer was uploaded.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while opening the stream.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadFile(String, String) method

```csharp
public byte[] UploadFile (string address, string fileName);
```

Uploads the specified local file to a resource with the specified URI.

Parameters:

- `address`: The URI of the resource to receive the file. For example, ftp://localhost/samplefile.txt.
- `fileName`: The file to send to the resource. For example, "samplefile.txt".

Returns: A `Byte` array containing the body of the response from the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `fileName` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, and `address` is invalid.

-or-

`fileName` is `null`, is `String.Empty`, contains invalid characters, or does not exist.

-or-

An error occurred while uploading the file.

-or-

There was no response from the server hosting the resource.

-or-

The `Content-type` header begins with `multipart`.
