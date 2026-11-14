---
title: "WebClient class (part 1 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebClient class

Namespace: `System.Net`

```csharp
public class WebClient : System.ComponentModel.Component
```

Provides common methods for sending data to and receiving data from a resource identified by a URI.

#### Remarks

## WebClient.WebClient() constructor

```csharp
public WebClient ();
```

Initializes a new instance of the `WebClient` class.

To be added.

## WebClient.AllowReadStreamBuffering property

```csharp
public bool AllowReadStreamBuffering { get; set; }
```

Gets or sets a value that indicates whether to buffer the data read from the Internet resource for a `WebClient` instance.

Returns: `true` to enable buffering of the data received from the Internet resource; `false` to disable buffering. The default is `true`.

## WebClient.AllowWriteStreamBuffering property

```csharp
public bool AllowWriteStreamBuffering { get; set; }
```

Gets or sets a value that indicates whether to buffer the data written to the Internet resource for a `WebClient` instance.

Returns: `true` to enable buffering of the data written to the Internet resource; `false` to disable buffering. The default is `true`.

To be added.

## WebClient.BaseAddress property

```csharp
public string BaseAddress { get; set; }
```

Gets or sets the base URI for requests made by a `WebClient`.

Returns: A `String` containing the base URI for requests made by a `WebClient` or `String.Empty` if no base address has been specified.

Exceptions:

- `ArgumentException`: `WebClient.BaseAddress` is set to an invalid URI. The inner exception may contain information that will help you locate the error.

## WebClient.CachePolicy property

```csharp
public System.Net.Cache.RequestCachePolicy? CachePolicy { get; set; }
```

Gets or sets the application's cache policy for any resources obtained by this WebClient instance using `WebRequest` objects.

Returns: A `RequestCachePolicy` object that represents the application's caching requirements.

To be added.

## WebClient.Credentials <example-value>

```csharp
public System.Net.ICredentials? Credentials { get; set; }
```

Gets or sets the network credentials that are sent to the host and used to authenticate the request.

Returns: An `ICredentials` containing the authentication credentials for the request. The default is `null`.

## WebClient.Encoding property

```csharp
public System.Text.Encoding Encoding { get; set; }
```

Gets or sets the `Encoding` used to upload and download strings.

Returns: A `Encoding` that is used to encode strings. The default value of this property is the encoding returned by `Encoding.Default`.

## WebClient.Headers property

```csharp
public System.Net.WebHeaderCollection Headers { get; set; }
```

Gets or sets a collection of header name/value pairs associated with the request.

Returns: A `WebHeaderCollection` containing header name/value pairs associated with this request.

## WebClient.IsBusy property

```csharp
public bool IsBusy { get; }
```

Gets whether a Web request is in progress.

Returns: `true` if the Web request is still in progress; otherwise `false`.

To be added.

## WebClient.Proxy property

```csharp
public System.Net.IWebProxy? Proxy { get; set; }
```

Gets or sets the proxy used by this `WebClient` object.

Returns: An `IWebProxy` instance used to send requests.

## WebClient.QueryString property

```csharp
public System.Collections.Specialized.NameValueCollection QueryString { get; set; }
```

Gets or sets a collection of query name/value pairs associated with the request.

Returns: A `NameValueCollection` that contains query name/value pairs associated with the request. If no pairs are associated with the request, the value is an empty `NameValueCollection`.

## WebClient.ResponseHeaders property

```csharp
public System.Net.WebHeaderCollection? ResponseHeaders { get; }
```

Gets a collection of header name/value pairs associated with the response.

Returns: A `WebHeaderCollection` containing header name/value pairs associated with the response, or `null` if no response has been received.

## WebClient.UseDefaultCredentials <example-value>

```csharp
public bool UseDefaultCredentials { get; set; }
```

Gets or sets a `Boolean` value that controls whether the `CredentialCache.DefaultCredentials` are sent with requests.

Returns: `true` if the default credentials are used; otherwise `false`. The default value is `false`.

## WebClient.CancelAsync() method

```csharp
public void CancelAsync ();
```

Cancels a pending asynchronous operation.

#### Remarks

## WebClient.DownloadData(String) method

```csharp
public byte[] DownloadData (string address);
```

Downloads the resource as a `Byte` array from the URI specified.

Parameters:

- `address`: The URI from which to download data.

Returns: A `Byte` array containing the downloaded resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while downloading data.
- `NotSupportedException`: The method has been called simultaneously on multiple threads.

## WebClient.DownloadData(Uri) method

```csharp
public byte[] DownloadData (Uri address);
```

Downloads the resource as a `Byte` array from the URI specified.

Parameters:

- `address`: The URI represented by the `Uri` object, from which to download data.

Returns: A `Byte` array containing the downloaded resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

## WebClient.DownloadDataAsync(Uri) method

```csharp
public void DownloadDataAsync (Uri address);
```

Downloads the resource as a `Byte` array from the URI specified as an asynchronous operation.

Parameters:

- `address`: A `Uri` containing the URI to download.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while downloading the resource.

## WebClient.DownloadDataAsync(Uri, Object) method

```csharp
public void DownloadDataAsync (Uri address, object? userToken);
```

Downloads the resource as a `Byte` array from the URI specified as an asynchronous operation.

Parameters:

- `address`: A `Uri` containing the URI to download.
- `userToken`: A user-defined object that is passed to the method invoked when the asynchronous operation completes.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while downloading the resource.

## WebClient.DownloadDataTaskAsync(String) method

```csharp
public System.Threading.Tasks.Task<byte[]> DownloadDataTaskAsync (string address);
```

Downloads the resource as a `Byte` array from the URI specified as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to download.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Byte` array containing the downloaded resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while downloading the resource.

## WebClient.DownloadDataTaskAsync(Uri) method

```csharp
public System.Threading.Tasks.Task<byte[]> DownloadDataTaskAsync (Uri address);
```

Downloads the resource as a `Byte` array from the URI specified as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to download.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Byte` array containing the downloaded resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while downloading the resource.

## WebClient.DownloadFile(String, String) method

```csharp
public void DownloadFile (string address, string fileName);
```

Downloads the resource with the specified URI to a local file.

Parameters:

- `address`: The URI from which to download data.
- `fileName`: The name of the local file that is to receive the data.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

`fileName` is `null` or `String.Empty`.

-or-

The file does not exist.

-or- An error occurred while downloading data.
- `NotSupportedException`: The method has been called simultaneously on multiple threads.

## WebClient.DownloadFile(Uri, String) method

```csharp
public void DownloadFile (Uri address, string fileName);
```

Downloads the resource with the specified URI to a local file.

Parameters:

- `address`: The URI specified as a `String`, from which to download data.
- `fileName`: The name of the local file that is to receive the data.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `fileName` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

`fileName` is `null` or `String.Empty`.

-or-

The file does not exist.

-or-

An error occurred while downloading data.
- `NotSupportedException`: The method has been called simultaneously on multiple threads.

## WebClient.DownloadFileAsync(Uri, String) method

```csharp
public void DownloadFileAsync (Uri address, string fileName);
```

Downloads, to a local file, the resource with the specified URI. This method does not block the calling thread.

Parameters:

- `address`: The URI of the resource to download.
- `fileName`: The name of the file to be placed on the local computer.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `fileName` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while downloading the resource.
- `InvalidOperationException`: The local file specified by `fileName` is in use by another thread.

## WebClient.DownloadFileAsync(Uri, String, Object) method

```csharp
public void DownloadFileAsync (Uri address, string fileName, object? userToken);
```

Downloads, to a local file, the resource with the specified URI. This method does not block the calling thread.

Parameters:

- `address`: The URI of the resource to download.
- `fileName`: The name of the file to be placed on the local computer.
- `userToken`: A user-defined object that is passed to the method invoked when the asynchronous operation completes.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `fileName` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while downloading the resource.
- `InvalidOperationException`: The local file specified by `fileName` is in use by another thread.

## WebClient.DownloadFileTaskAsync(String, String) method

```csharp
public System.Threading.Tasks.Task DownloadFileTaskAsync (string address, string fileName);
```

Downloads the specified resource to a local file as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to download.
- `fileName`: The name of the file to be placed on the local computer.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `fileName` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while downloading the resource.
- `InvalidOperationException`: The local file specified by `fileName` is in use by another thread.

## WebClient.DownloadFileTaskAsync(Uri, String) method

```csharp
public System.Threading.Tasks.Task DownloadFileTaskAsync (Uri address, string fileName);
```

Downloads the specified resource to a local file as an asynchronous operation using a task object.

Parameters:

- `address`: The URI of the resource to download.
- `fileName`: The name of the file to be placed on the local computer.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.

-or-

The `fileName` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while downloading the resource.
- `InvalidOperationException`: The local file specified by `fileName` is in use by another thread.

## WebClient.DownloadString(String) method

```csharp
public string DownloadString (string address);
```

Downloads the requested resource as a `String`. The resource to download is specified as a `String` containing the URI.

Parameters:

- `address`: A `String` containing the URI to download.

Returns: A `String` containing the requested resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while downloading the resource.
- `NotSupportedException`: The method has been called simultaneously on multiple threads.

## WebClient.DownloadString(Uri) method

```csharp
public string DownloadString (Uri address);
```

Downloads the requested resource as a `String`. The resource to download is specified as a `Uri`.

Parameters:

- `address`: A `Uri` object containing the URI to download.

Returns: A `String` containing the requested resource.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while downloading the resource.
- `NotSupportedException`: The method has been called simultaneously on multiple threads.

## WebClient.DownloadStringAsync(Uri) method

```csharp
public void DownloadStringAsync (Uri address);
```

Downloads the resource specified as a `Uri`. This method does not block the calling thread.

Parameters:

- `address`: A `Uri` containing the URI to download.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `WebException`: The URI formed by combining `WebClient.BaseAddress` and `address` is invalid.

-or-

An error occurred while downloading the resource.
