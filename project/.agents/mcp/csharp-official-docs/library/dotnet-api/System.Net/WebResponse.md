---
title: "WebResponse class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebResponse.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebResponse class

Namespace: `System.Net`

```csharp
public abstract class WebResponse : MarshalByRefObject, IDisposable, System.Runtime.Serialization.ISerializable
```

Provides a response from a Uniform Resource Identifier (URI). This is an `abstract` class.

#### Remarks
The `WebResponse` class is the `abstract` base class from which protocol-specific response classes are derived. Applications can participate in request and response transactions in a protocol-agnostic manner using instances of the `WebResponse` class while protocol-specific classes derived from `WebResponse` carry out the details of the request.

Client applications do not create `WebResponse` objects directly; they are created by calling the `WebRequest.GetResponse` method on a `WebRequest` instance.

#### Examples
The following example creates a `WebResponse` instance from a `WebRequest`.

_Code sample not included: ~/snippets/csharp/System.Net/WebResponse/Overview/source.cs._

## WebResponse.WebResponse() constructor

```csharp
protected WebResponse ();
```

Initializes a new instance of the `WebResponse` class.

#### Remarks
Applications do not call the `WebResponse` constructor directly; use the `WebRequest.GetResponse` method on a `WebRequest` instance.

## WebResponse.WebResponse(SerializationInfo, StreamingContext) constructor

```csharp
protected WebResponse (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Initializes a new instance of the `WebResponse` class from the specified instances of the `SerializationInfo` and `StreamingContext` classes.

Parameters:

- `serializationInfo`: An instance of the `SerializationInfo` class that contains the information required to serialize the new `WebRequest` instance.
- `streamingContext`: An instance of the `StreamingContext` class that indicates the source of the serialized stream that is associated with the new `WebRequest` instance.

Exceptions:

- `NotSupportedException`: Any attempt is made to access the constructor, when the constructor is not overridden in a descendant class.
- `PlatformNotSupportedException`: In all cases.

To be added.

## WebResponse.ContentLength property

```csharp
public virtual long ContentLength { get; set; }
```

When overridden in a descendant class, gets or sets the content length of data being received.

Returns: The number of bytes returned from the Internet resource.

Exceptions:

- `NotSupportedException`: Any attempt is made to get or set the property, when the property is not overridden in a descendant class.

#### Remarks
The `ContentLength` property contains the length, in bytes, of the response from the Internet resource. For request methods that contain header information, the `WebResponse.ContentLength` does not include the length of the header information.

> **Note:**
> The `WebResponse` class is an `abstract` class. The actual behavior of `WebResponse` instances at run time is determined by the descendant class returned by `WebRequest.GetResponse`. For more information about default values and exceptions, please see the documentation for the descendant classes, such as `HttpWebResponse` and `FileWebResponse`.

#### Examples
The following example uses the `ContentLength` property to obtain the Length of the resource returned.

_Code sample not included: ~/snippets/csharp/System.Net/WebResponse/ContentLength/webresponse_contentlength_type.cs._

## WebResponse.ContentType property

```csharp
public virtual string ContentType { get; set; }
```

When overridden in a derived class, gets or sets the content type of the data being received.

Returns: A string that contains the content type of the response.

Exceptions:

- `NotSupportedException`: Any attempt is made to get or set the property, when the property is not overridden in a descendant class.

#### Remarks
The `ContentType` property contains the MIME content type of the response from the Internet resource, if known.

> **Note:**
> The `WebResponse` class is an `abstract` class. The actual behavior of `WebResponse` instances at run time is determined by the descendant class returned by `WebRequest.GetResponse`. For more information about default values and exceptions, please see the documentation for the descendant classes, such as `HttpWebResponse` and `FileWebResponse`.

#### Examples
The following example uses the `ContentType` property to obtain the content type of the response.

_Code sample not included: ~/snippets/csharp/System.Net/WebResponse/ContentLength/webresponse_contentlength_type.cs._

## WebResponse.Headers property

```csharp
public virtual System.Net.WebHeaderCollection Headers { get; }
```

When overridden in a derived class, gets a collection of header name-value pairs associated with this request.

Returns: An instance of the `WebHeaderCollection` class that contains header values associated with this response.

Exceptions:

- `NotSupportedException`: Any attempt is made to get or set the property, when the property is not overridden in a descendant class.

#### Remarks
The `Headers` property contains the name-value header pairs returned in the response.

> **Note:**
> The `WebResponse` class is an `abstract` class. The actual behavior of `WebResponse` instances at run time is determined by the descendant class returned by `WebRequest.GetResponse`. For more information about default values and exceptions, please see the documentation for the descendant classes, such as `HttpWebResponse` and `FileWebResponse`.

#### Examples
The following example displays all of the header name-value pairs returned in the `WebResponse`.

_Code sample not included: ~/snippets/csharp/System.Net/WebResponse/Headers/webresponse_headers.cs._

## WebResponse.IsFromCache property

```csharp
public virtual bool IsFromCache { get; }
```

Gets a `Boolean` value that indicates whether this response was obtained from the cache.

Returns: `true` if the response was taken from the cache; otherwise, `false`.

#### Remarks
The current cache policy and the presence of the requested resource in the cache determine whether a response can be retrieved from the cache. Using cached responses usually improves application performance, but there is a risk that the response in the cache does not match the response on the server. Use the `CachePolicy` property to set and the `RequestCachePolicy` class to enumerate the current caching policy.

Note that getting this property can throw `ObjectDisposedException`.

## WebResponse.IsMutuallyAuthenticated property

```csharp
public virtual bool IsMutuallyAuthenticated { get; }
```

Gets a `Boolean` value that indicates whether mutual authentication occurred.

Returns: `true` if both client and server were authenticated; otherwise, `false`.

#### Remarks
To request mutual authentication, set the `AuthenticationLevel` property using the `MutualAuthRequested` or `MutualAuthRequired` enumeration value. The default value for the `AuthenticationLevel` property contains `Delegation` and `MutualAuthRequested`.

Note that getting this property can throw `ObjectDisposedException`.

#### Examples
The following code example checks the value of this property.

_Code sample not included: ~/snippets/csharp/Microsoft.Win32/IntranetZoneCredentialPolicy/Overview/websample.cs._
## WebResponse.ResponseUri property

```csharp
public virtual Uri ResponseUri { get; }
```

When overridden in a derived class, gets the URI of the Internet resource that actually responded to the request.

Returns: An instance of the `Uri` class that contains the URI of the Internet resource that actually responded to the request.

Exceptions:

- `NotSupportedException`: Any attempt is made to get or set the property, when the property is not overridden in a descendant class.

#### Remarks
The `ResponseUri` property contains the URI of the Internet resource that actually provided the response data. This resource might not be the originally requested URI if the underlying protocol allows redirection of the request.

> **Note:**
> The `WebResponse` class is an `abstract` class. The actual behavior of `WebResponse` instances at run time is determined by the descendant class returned by `WebRequest.GetResponse`. For more information about default values and exceptions, please see the documentation for the descendant classes, such as `HttpWebResponse` and `FileWebResponse`.

#### Examples
The following example uses the `ResponseUri` property to determine the location from which the `WebResponse` originated.

_Code sample not included: ~/snippets/csharp/System.Net/WebRequest/Create/webresponse_responseuri.cs._

## WebResponse.SupportsHeaders property

```csharp
public virtual bool SupportsHeaders { get; }
```

Gets a value that indicates if headers are supported.

Returns: `true` if headers are supported; otherwise, `false`.

To be added.

## WebResponse.Close() method

```csharp
public virtual void Close ();
```

When overridden by a descendant class, closes the response stream.

Exceptions:

- `NotSupportedException`: Any attempt is made to access the method, when the method is not overridden in a descendant class.

#### Remarks
The `WebResponse.Close` method cleans up the resources used by a `WebResponse` and closes the underlying stream by calling the `Stream.Close` method.

> **Note:**
> The response must be closed to avoid running out of system resources. The response stream can be closed by calling `Stream.Close` or `WebResponse.Close`.

> **Note:**
> The `WebResponse` class is an `abstract` class. The actual behavior of `WebResponse` instances at run time is determined by the descendant class returned by `WebRequest.GetResponse`. For more information about default values and exceptions, please see the documentation for the descendant classes, such as `HttpWebResponse` and `FileWebResponse`.

#### Examples
The following example uses the `WebResponse.Close` method to close the `WebResponse`.

_Code sample not included: ~/snippets/csharp/System.Net/WebResponse/Close/webresponse_close.cs._

## WebResponse.Dispose() method

```csharp
public void Dispose ();
```

Releases the unmanaged resources used by the `WebResponse` object.

To be added.

## WebResponse.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `WebResponse` object, and optionally disposes of the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to releases only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `WebResponse` references. This method invokes the `Dispose()` method of each referenced object.

## WebResponse.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
protected virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Populates a `SerializationInfo` with the data that is needed to serialize the target object.

Parameters:

- `serializationInfo`: The `SerializationInfo` to populate with data.
- `streamingContext`: A `StreamingContext` that specifies the destination for this serialization.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## WebResponse.GetResponseStream() method

```csharp
public virtual System.IO.Stream GetResponseStream ();
```

When overridden in a descendant class, returns the data stream from the Internet resource.

Returns: An instance of the `Stream` class for reading data from the Internet resource.

Exceptions:

- `NotSupportedException`: Any attempt is made to access the method, when the method is not overridden in a descendant class.

#### Remarks
The `WebResponse.GetResponseStream` method returns the data stream from the Internet resource.

> **Note:**
> The response stream must be closed to avoid running out of system resources. The response stream can be closed by calling `Stream.Close` or `WebResponse.Close`

#### Examples
The following example uses `WebResponse.GetResponseStream` to return a `StreamReader` instance. A small local buffer is used to read data from the `StreamReader` and output it to the console.

_Code sample not included: ~/snippets/csharp/System.Net/WebResponse/GetResponseStream/webresponse_getresponsestream.cs._

## WebResponse.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Populates a `SerializationInfo` instance with the data that is needed to serialize `WebResponse`.

Parameters:

- `serializationInfo`: A `SerializationInfo` that will hold the serialized data for the `WebResponse`.
- `streamingContext`: A `StreamingContext` that contains the destination of the serialized stream that is associated with the new `WebResponse`.

To be added.
