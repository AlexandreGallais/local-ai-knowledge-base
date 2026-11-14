---
title: "WebClient class (part 5 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebClient class (part 5 of 6)

## WebClient.UploadString(Uri, String, String) method

```csharp
public string UploadString (Uri address, string? method, string data);
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

## WebClient.UploadStringAsync(Uri, String) method

```csharp
public void UploadStringAsync (Uri address, string data);
```

Uploads the specified string to the specified resource. This method does not block the calling thread.

Parameters:

- `address`: The URI of the resource to receive the string. For HTTP resources, this URI must identify a resource that can accept a request sent with the POST method, such as a script or ASP page.
- `data`: The string to be uploaded.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadStringAsync(Uri, String, String) method

```csharp
public void UploadStringAsync (Uri address, string? method, string data);
```

Uploads the specified string to the specified resource. This method does not block the calling thread.

Parameters:

- `address`: The URI of the resource to receive the string. For HTTP resources, this URI must identify a resource that can accept a request sent with the POST method, such as a script or ASP page.
- `method`: The HTTP method used to send the file to the resource. If null, the default is POST for http and STOR for ftp.
- `data`: The string to be uploaded.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

`method` cannot be used to send content.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadStringAsync(Uri, String, String, Object) method

```csharp
public void UploadStringAsync (Uri address, string? method, string data, object? userToken);
```

Uploads the specified string to the specified resource. This method does not block the calling thread.

Parameters:

- `address`: The URI of the resource to receive the string. For HTTP resources, this URI must identify a resource that can accept a request sent with the POST method, such as a script or ASP page.
- `method`: The HTTP method used to send the file to the resource. If null, the default is POST for http and STOR for ftp.
- `data`: The string to be uploaded.
- `userToken`: A user-defined object that is passed to the method invoked when the asynchronous operation completes.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

`method` cannot be used to send content.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadStringTaskAsync(String, String) method

```csharp
public System.Threading.Tasks.Task<string> UploadStringTaskAsync (string address, string data);
```

Uploads the specified string to the specified resource as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the string. For HTTP resources, this URI must identify a resource that can accept a request sent with the POST method, such as a script or ASP page.
- `data`: The string to be uploaded.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `String` containing the response sent by the server.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadStringTaskAsync(Uri, String) method

```csharp
public System.Threading.Tasks.Task<string> UploadStringTaskAsync (Uri address, string data);
```

Uploads the specified string to the specified resource as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the string. For HTTP resources, this URI must identify a resource that can accept a request sent with the POST method, such as a script or ASP page.
- `data`: The string to be uploaded.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `String` containing the response sent by the server.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadStringTaskAsync(String, String, String) method

```csharp
public System.Threading.Tasks.Task<string> UploadStringTaskAsync (string address, string? method, string data);
```

Uploads the specified string to the specified resource as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the string. For HTTP resources, this URI must identify a resource that can accept a request sent with the POST method, such as a script or ASP page.
- `method`: The HTTP method used to send the file to the resource. If null, the default is POST for http and STOR for ftp.
- `data`: The string to be uploaded.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `String` containing the response sent by the server.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

`method` cannot be used to send content.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadStringTaskAsync(Uri, String, String) method

```csharp
public System.Threading.Tasks.Task<string> UploadStringTaskAsync (Uri address, string? method, string data);
```

Uploads the specified string to the specified resource as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to receive the string. For HTTP resources, this URI must identify a resource that can accept a request sent with the POST method, such as a script or ASP page.
- `method`: The HTTP method used to send the file to the resource. If null, the default is POST for http and STOR for ftp.
- `data`: The string to be uploaded.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `String` containing the response sent by the server.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

`method` cannot be used to send content.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadValues(String, NameValueCollection) method

```csharp
public byte[] UploadValues (string address, System.Collections.Specialized.NameValueCollection data);
```

Uploads the specified name/value collection to the resource identified by the specified URI.

Parameters:

- `address`: The URI of the resource to receive the collection.
- `data`: The `NameValueCollection` to send to the resource.

Returns: A `Byte` array containing the body of the response from the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, and `address` is invalid.

-or-

`data` is `null`.

-or-

There was no response from the server hosting the resource.

-or-

An error occurred while opening the stream.

-or-

The `Content-type` header is not `null` or "application/x-www-form-urlencoded".

## WebClient.UploadValues(Uri, NameValueCollection) method

```csharp
public byte[] UploadValues (Uri address, System.Collections.Specialized.NameValueCollection data);
```

Uploads the specified name/value collection to the resource identified by the specified URI.

Parameters:

- `address`: The URI of the resource to receive the collection.
- `data`: The `NameValueCollection` to send to the resource.

Returns: A `Byte` array containing the body of the response from the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, and `address` is invalid.

-or-

`data` is `null`.

-or-

There was no response from the server hosting the resource.

-or-

An error occurred while opening the stream.

-or-

The `Content-type` header is not `null` or "application/x-www-form-urlencoded".

## WebClient.UploadValues(String, String, NameValueCollection) method

```csharp
public byte[] UploadValues (string address, string? method, System.Collections.Specialized.NameValueCollection data);
```

Uploads the specified name/value collection to the resource identified by the specified URI, using the specified method.

Parameters:

- `address`: The URI of the resource to receive the collection.
- `method`: The HTTP method used to send the file to the resource. If null, the default is POST for http and STOR for ftp.
- `data`: The `NameValueCollection` to send to the resource.

Returns: A `Byte` array containing the body of the response from the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, and `address` is invalid.

-or-

`data` is `null`.

-or-

An error occurred while opening the stream.

-or-

There was no response from the server hosting the resource.

-or-

The `Content-type` header value is not `null` and is not `application/x-www-form-urlencoded`.

## WebClient.UploadValues(Uri, String, NameValueCollection) method

```csharp
public byte[] UploadValues (Uri address, string? method, System.Collections.Specialized.NameValueCollection data);
```

Uploads the specified name/value collection to the resource identified by the specified URI, using the specified method.

Parameters:

- `address`: The URI of the resource to receive the collection.
- `method`: The HTTP method used to send the file to the resource. If null, the default is POST for http and STOR for ftp.
- `data`: The `NameValueCollection` to send to the resource.

Returns: A `Byte` array containing the body of the response from the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress`, and `address` is invalid.

-or-

`data` is `null`.

-or-

An error occurred while opening the stream.

-or-

There was no response from the server hosting the resource.

-or-

The `Content-type` header value is not `null` and is not `application/x-www-form-urlencoded`.

## WebClient.UploadValuesAsync(Uri, NameValueCollection) method

```csharp
public void UploadValuesAsync (Uri address, System.Collections.Specialized.NameValueCollection data);
```

Uploads the data in the specified name/value collection to the resource identified by the specified URI. This method does not block the calling thread.

Parameters:

- `address`: The URI of the resource to receive the collection. This URI must identify a resource that can accept a request sent with the default method.
- `data`: The `NameValueCollection` to send to the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

There was no response from the server hosting the resource.

## WebClient.UploadValuesAsync(Uri, String, NameValueCollection) method

```csharp
public void UploadValuesAsync (Uri address, string? method, System.Collections.Specialized.NameValueCollection data);
```

Uploads the data in the specified name/value collection to the resource identified by the specified URI, using the specified method. This method does not block the calling thread.

Parameters:

- `address`: The URI of the resource to receive the collection. This URI must identify a resource that can accept a request sent with the `method` method.
- `method`: The method used to send the string to the resource. If null, the default is POST for http and STOR for ftp.
- `data`: The `NameValueCollection` to send to the resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `data` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

There was no response from the server hosting the resource.

-or-

`method` cannot be used to send content.
