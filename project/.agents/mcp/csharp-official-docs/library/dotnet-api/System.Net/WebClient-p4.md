---
title: "WebClient class (part 4 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebClient class (part 4 of 6)

## WebClient.UploadFile(Uri, String) method

```csharp
public byte[] UploadFile (Uri address, string fileName);
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

## WebClient.UploadFile(String, String, String) method

```csharp
public byte[] UploadFile (string address, string? method, string fileName);
```

Uploads the specified local file to the specified resource, using the specified method.

Parameters:

- `address`: The URI of the resource to receive the file.
- `method`: The method used to send the file to the resource. If `null`, the default is POST for http and STOR for ftp.
- `fileName`: The file to send to the resource.

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

## WebClient.UploadFile(Uri, String, String) method

```csharp
public byte[] UploadFile (Uri address, string? method, string fileName);
```

Uploads the specified local file to the specified resource, using the specified method.

Parameters:

- `address`: The URI of the resource to receive the file.
- `method`: The method used to send the file to the resource. If `null`, the default is POST for http and STOR for ftp.
- `fileName`: The file to send to the resource.

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

## WebClient.UploadFileAsync(Uri, String) method

```csharp
public void UploadFileAsync (Uri address, string fileName);
```

Uploads the specified local file to the specified resource, using the POST method. This method does not block the calling thread.

Parameters:

- `address`: The URI of the resource to receive the file. For HTTP resources, this URI must identify a resource that can accept a request sent with the POST method, such as a script or ASP page.
- `fileName`: The file to send to the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `fileName` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

`fileName` is `null`, is `String.Empty`, contains invalid character, or the specified path to the file does not exist.

-or-

An error occurred while opening the stream.

-or-

There was no response from the server hosting the resource.

-or-

The `Content-type` header begins with `multipart`.

## WebClient.UploadFileAsync(Uri, String, String) method

```csharp
public void UploadFileAsync (Uri address, string? method, string fileName);
```

Uploads the specified local file to the specified resource, using the POST method. This method does not block the calling thread.

Parameters:

- `address`: The URI of the resource to receive the file. For HTTP resources, this URI must identify a resource that can accept a request sent with the POST method, such as a script or ASP page.
- `method`: The method used to send the data to the resource. If `null`, the default is POST for http and STOR for ftp.
- `fileName`: The file to send to the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `fileName` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

`fileName` is `null`, is `String.Empty`, contains invalid character, or the specified path to the file does not exist.

-or-

An error occurred while opening the stream.

-or-

There was no response from the server hosting the resource.

-or-

The `Content-type` header begins with `multipart`.

## WebClient.UploadFileAsync(Uri, String, String, Object) method

```csharp
public void UploadFileAsync (Uri address, string? method, string fileName, object? userToken);
```

Uploads the specified local file to the specified resource, using the POST method. This method does not block the calling thread.

Parameters:

- `address`: The URI of the resource to receive the file. For HTTP resources, this URI must identify a resource that can accept a request sent with the POST method, such as a script or ASP page.
- `method`: The method used to send the data to the resource. If `null`, the default is POST for http and STOR for ftp.
- `fileName`: The file to send to the resource.
- `userToken`: A user-defined object that is passed to the method invoked when the asynchronous operation completes.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `fileName` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

`fileName` is `null`, is `String.Empty`, contains invalid character, or the specified path to the file does not exist.

-or-

An error occurred while opening the stream.

-or-

There was no response from the server hosting the resource.

-or-

The `Content-type` header begins with `multipart`.

## WebClient.UploadFileTaskAsync(String, String) method

```csharp
public System.Threading.Tasks.Task<byte[]> UploadFileTaskAsync (string address, string fileName);
```

Uploads the specified local file to a resource as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the file. For HTTP resources, this URI must identify a resource that can accept a request sent with the POST method, such as a script or ASP page.
- `fileName`: The local file to send to the resource.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Byte` array containing the body of the response received from the resource when the file was uploaded.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `fileName` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

`fileName` is `null`, is `String.Empty`, contains invalid character, or the specified path to the file does not exist.

-or-

An error occurred while opening the stream.

-or-

There was no response from the server hosting the resource.

-or-

The `Content-type` header begins with `multipart`.

## WebClient.UploadFileTaskAsync(Uri, String) method

```csharp
public System.Threading.Tasks.Task<byte[]> UploadFileTaskAsync (Uri address, string fileName);
```

Uploads the specified local file to a resource as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the file. For HTTP resources, this URI must identify a resource that can accept a request sent with the POST method, such as a script or ASP page.
- `fileName`: The local file to send to the resource.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Byte` array containing the body of the response received from the resource when the file was uploaded.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `fileName` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

`fileName` is `null`, is `String.Empty`, contains invalid character, or the specified path to the file does not exist.

-or-

An error occurred while opening the stream.

-or-

There was no response from the server hosting the resource.

-or-

The `Content-type` header begins with `multipart`.

## WebClient.UploadFileTaskAsync(String, String, String) method

```csharp
public System.Threading.Tasks.Task<byte[]> UploadFileTaskAsync (string address, string? method, string fileName);
```

Uploads the specified local file to a resource as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the file. For HTTP resources, this URI must identify a resource that can accept a request sent with the POST method, such as a script or ASP page.
- `method`: The method used to send the data to the resource. If `null`, the default is POST for http and STOR for ftp.
- `fileName`: The local file to send to the resource.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Byte` array containing the body of the response received from the resource when the file was uploaded.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `fileName` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

`fileName` is `null`, is `String.Empty`, contains invalid character, or the specified path to the file does not exist.

-or-

An error occurred while opening the stream.

-or-

There was no response from the server hosting the resource.

-or-

The `Content-type` header begins with `multipart`.

## WebClient.UploadFileTaskAsync(Uri, String, String) method

```csharp
public System.Threading.Tasks.Task<byte[]> UploadFileTaskAsync (Uri address, string? method, string fileName);
```

Uploads the specified local file to a resource as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the file. For HTTP resources, this URI must identify a resource that can accept a request sent with the POST method, such as a script or ASP page.
- `method`: The method used to send the data to the resource. If `null`, the default is POST for http and STOR for ftp.
- `fileName`: The local file to send to the resource.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Byte` array containing the body of the response received from the resource when the file was uploaded.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `fileName` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

`fileName` is `null`, is `String.Empty`, contains invalid character, or the specified path to the file does not exist.

-or-

An error occurred while opening the stream.

-or-

There was no response from the server hosting the resource.

-or-

The `Content-type` header begins with `multipart`.

## WebClient.UploadString(String, String) method

```csharp
public string UploadString (string address, string data);
```

Uploads the specified string to the specified resource, using the POST method.

Parameters:

- `address`: The URI of the resource to receive the string. For Http resources, this URI must identify a resource that can accept a request sent with the POST method, such as a script or ASP page.
- `data`: The string to be uploaded.

Returns: A `String` containing the response sent by the server.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadString(Uri, String) method

```csharp
public string UploadString (Uri address, string data);
```

Uploads the specified string to the specified resource, using the POST method.

Parameters:

- `address`: The URI of the resource to receive the string. For Http resources, this URI must identify a resource that can accept a request sent with the POST method, such as a script or ASP page.
- `data`: The string to be uploaded.

Returns: A `String` containing the response sent by the server.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadString(String, String, String) method

```csharp
public string UploadString (string address, string? method, string data);
```

Uploads the specified string to the specified resource, using the specified method.

Parameters:

- `address`: The URI of the resource to receive the string. This URI must identify a resource that can accept a request sent with the `method` method.
- `method`: The HTTP method used to send the string to the resource. If null, the default is POST for http and STOR for ftp.
- `data`: The string to be uploaded.

Returns: A `String` containing the response sent by the server.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

There was no response from the server hosting the resource.

-or-

`method` cannot be used to send content.
