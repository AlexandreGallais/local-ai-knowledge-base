---
title: "HttpListenerResponse class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpListenerResponse.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpListenerResponse class (part 2 of 2)

## HttpListenerResponse.AppendHeader(String, String) method

```csharp
public void AppendHeader (string name, string value);
```

Appends a value to the specified HTTP header to be sent with this response.

Parameters:

- `name`: The name of the HTTP header to append `value` to.
- `value`: The value to append to the `name` header.

Exceptions:

- `ArgumentException`: `name` is `null` or an empty string ("").

-or-

You are not allowed to specify a value for the specified header.

-or-

`name` or `value` contains invalid characters.

#### Remarks
Calling this method is equivalent to calling the `WebHeaderCollection.Add` method on the collection returned by the `Headers` property.

If the header specified in `header` does not exist, this method inserts a new header into the `Headers` property's collection. If `header` is present in the collection, this method adds `value` to the existing values. To replace the value of an existing header, use the `HttpListenerResponse.AddHeader` method.

## HttpListenerResponse.Close() method

```csharp
public void Close ();
```

Sends the response to the client and releases the resources held by this `HttpListenerResponse` instance.

#### Remarks
This method closes the response stream and the `HttpListenerRequest` associated with the response.

#### Examples
The following code example demonstrates calling this method to send a `Forbidden` (403) response to the client.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationSchemes/Overview/sample.cs._

## HttpListenerResponse.Close(Byte[], Boolean) method

```csharp
public void Close (byte[] responseEntity, bool willBlock);
```

Returns the specified byte array to the client and releases the resources held by this `HttpListenerResponse` instance.

Parameters:

- `responseEntity`: A `Byte` array that contains the response to send to the client.
- `willBlock`: `true` to block execution while flushing the stream to the client; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `responseEntity` is `null`.
- `ObjectDisposedException`: This object is closed.

#### Remarks
If you are sending body data with the response, you can use this method to send it as a `Byte` array instead of writing the body data to the `OutputStream` property and calling the `HttpListenerResponse.Close` method.

This method closes the response stream and the `HttpListenerRequest` associated with the response.

If `false` is specified as the `willBlock`, the method returns immediately and the connection is closed asynchronously once the data is sent.

> **Note:**
> If closing asynchronously, it is not possible for the caller to determine when the data have been sent. In addition to that, disposing the `HttpListenerResponse`, `HttpListenerContext` or `HttpListener` may close the connection before all the data are sent.

#### Examples
The following code example demonstrates calling this method.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerResponse.CopyFrom(HttpListenerResponse) method

```csharp
public void CopyFrom (System.Net.HttpListenerResponse templateResponse);
```

Copies properties from the specified `HttpListenerResponse` to this response.

Parameters:

- `templateResponse`: The `HttpListenerResponse` instance to copy.

#### Remarks
If you regularly change many properties from their default values to a fixed set of new values, it is convenient to use an `HttpListenerResponse` instance as a template. Customize the template response once and, instead of configuring each response separately, call the `HttpListenerResponse.CopyFrom` method to configure a new response based on property values in the template response.

The following properties are copied from `templateResponse` to the current instance.

-   `HttpListenerResponse.Headers`

-   `HttpListenerResponse.ContentLength64`

-   `HttpListenerResponse.StatusCode`

-   `HttpListenerResponse.StatusDescription`

-   `HttpListenerResponse.KeepAlive`

-   `HttpListenerResponse.ProtocolVersion`

#### Examples
The following code example demonstrates creating a response by copying a template response.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationSchemes/Overview/sample.cs._

## HttpListenerResponse.Redirect(String) method

```csharp
public void Redirect (string url);
```

Configures the response to redirect the client to the specified URL.

Parameters:

- `url`: The URL that the client should use to locate the requested resource.

#### Remarks
The `HttpListenerResponse.Redirect` method is used to redirect a client to the new location for a resource. This method sets the response's `Location` header to `url`, the `StatusCode` property to `Redirect`, and the `StatusDescription` property to "Found".

#### Examples
The following code example demonstrates calling this method.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerResponse.SetCookie(Cookie) method

```csharp
public void SetCookie (System.Net.Cookie cookie);
```

Adds or updates a `Cookie` in the collection of cookies sent with this response.

Parameters:

- `cookie`: A `Cookie` for this response.

Exceptions:

- `ArgumentNullException`: `cookie` is `null`.
- `ArgumentException`: The cookie already exists in the collection and could not be replaced.

#### Remarks
Two cookies are considered the same if the values of their `Cookie.Name`, `Cookie.Domain`, and `Cookie.Path` properties are the same. If these three pieces of information are the same, the method attempts to update the cookie. The name and domain comparisons are not case sensitive, but the path comparison is case sensitive.

#### Examples
The following code example demonstrates calling this method.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerResponse.System.IDisposable.Dispose() method

```csharp
void IDisposable.Dispose ();
```

Releases all resources used by the `HttpListenerResponse`.

#### Remarks
Use the `HttpListenerResponse.Close` method to send the response and release resources held by an `HttpListenerResponse`. To discard the response and release the resources held by this instance, use the `HttpListenerResponse.Abort` method.
