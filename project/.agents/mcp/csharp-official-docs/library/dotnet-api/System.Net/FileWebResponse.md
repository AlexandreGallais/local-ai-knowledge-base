---
title: "FileWebResponse class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/FileWebResponse.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileWebResponse class

Namespace: `System.Net`

```csharp
public class FileWebResponse : System.Net.WebResponse, System.Runtime.Serialization.ISerializable
```

Provides a file system implementation of the `WebResponse` class.

#### Remarks
The `FileWebResponse` class implements the `WebResponse` `abstract` base class to return file system resources for the `FileWebRequest` class.

Client applications do not create `FileWebResponse` instances directly; instead, they are created by calling the `FileWebRequest.GetResponse` method on a `FileWebRequest` instance.

The `FileWebResponse.GetResponseStream` method returns a `Stream` instance that provides read-only access to a file system resource.

The `FileWebResponse` class relies on the `File` class for error handling.

## FileWebResponse.FileWebResponse(SerializationInfo, StreamingContext) constructor

```csharp
protected FileWebResponse (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Initializes a new instance of the `FileWebResponse` class from the specified instances of the `SerializationInfo` and `StreamingContext` classes.

Parameters:

- `serializationInfo`: A `SerializationInfo` instance that contains the information required to serialize the new `FileWebResponse` instance.
- `streamingContext`: An instance of the `StreamingContext` class that contains the source of the serialized stream associated with the new `FileWebResponse` instance.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## FileWebResponse.ContentLength property

```csharp
public override long ContentLength { get; }
```

Gets the length of the content in the file system resource.

Returns: The number of bytes returned from the file system resource.

#### Remarks
The `ContentLength` property contains the length, in bytes, of the file system resource.

#### Examples
The following example uses the `ContentLength` property to obtain the content length of the file system resource.

_Code sample not included: ~/snippets/csharp/System.Net/FileWebResponse/ContentLength/filewebresponse_contentlength_contenttype.cs._

## FileWebResponse.ContentType property

```csharp
public override string ContentType { get; }
```

Gets the content type of the file system resource.

Returns: The value "binary/octet-stream".

#### Remarks
The `ContentType` property contains the content type of the file system resource. The value of `FileWebResponse.ContentType` is always "binary/octet-stream".

#### Examples
The following example uses the `ContentType` property to obtain the content type of the file system resource.

_Code sample not included: ~/snippets/csharp/System.Net/FileWebResponse/ContentLength/filewebresponse_contentlength_contenttype.cs._

## FileWebResponse.Headers property

```csharp
public override System.Net.WebHeaderCollection Headers { get; }
```

Gets a collection of header name/value pairs associated with the response.

Returns: A `WebHeaderCollection` that contains the header name/value pairs associated with the response.

#### Remarks
The `Headers` property contains two name/value pairs, one for content length and one for content type, both of which are also exposed as properties, `FileWebResponse.ContentLength` and `FileWebResponse.ContentType`.

#### Examples
The following example uses the `Headers` property to retrieve the name/value pairs associated with the response.

_Code sample not included: ~/snippets/csharp/System.Net/FileWebResponse/Headers/filewebresponse_headers.cs._

## FileWebResponse.ResponseUri property

```csharp
public override Uri ResponseUri { get; }
```

Gets the URI of the file system resource that provided the response.

Returns: A `Uri` that contains the URI of the file system resource that provided the response.

#### Remarks
The `ResponseUri` property contains the URI of the file system resource that provided the response. This is always the file system resource that was requested.

#### Examples
The following example uses the `FileWebResponse.ResponseUri` to retrieve the URI of the file system resource that provided the response.

_Code sample not included: ~/snippets/csharp/System.Net/FileWebResponse/ResponseUri/filewebresponse_responseuri.cs._

## FileWebResponse.SupportsHeaders property

```csharp
public override bool SupportsHeaders { get; }
```

Gets a value that indicates whether the `FileWebResponse.Headers` property is supported by the `FileWebResponse` instance.

Returns: `true` if the `FileWebResponse.Headers` property is supported by the `FileWebResponse` instance; otherwise, `false`.

To be added.

## FileWebResponse.Close() method

```csharp
public override void Close ();
```

Closes the response stream.

#### Remarks
The `FileWebResponse.Close` method cleans up the resources used by a `FileWebResponse` and closes the response stream by calling the `Stream.Close` method.

> **Note:**
> The response stream must be closed to avoid running out of system resources. You can closes the response stream by calling either `Stream.Close` or `FileWebResponse.Close`

#### Examples
The following example uses the `FileWebResponse.Close` method to close the response stream.

_Code sample not included: ~/snippets/csharp/System.Net/FileWebResponse/Close/filewebresponse_close.cs._

## FileWebResponse.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
protected override void GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Populates a `SerializationInfo` with the data needed to serialize the target object.

Parameters:

- `serializationInfo`: The `SerializationInfo` to populate with data.
- `streamingContext`: A `StreamingContext` that specifies the destination for this serialization.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## FileWebResponse.GetResponseStream() method

```csharp
public override System.IO.Stream GetResponseStream ();
```

Returns the data stream from the file system resource.

Returns: A `Stream` for reading data from the file system resource.

#### Remarks
The `FileWebResponse.GetResponseStream` method returns the data stream from the file system resource.

> **Note:**
> The response stream must be closed to avoid running out of system resources. The response stream can be closed by calling `Stream.Close` or `FileWebResponse.Close`

#### Examples
The following example uses the `FileWebResponse.GetResponseStream` method to return the data stream from the file system resource.

_Code sample not included: ~/snippets/csharp/System.Net/FileWebResponse/GetResponseStream/filewebresponse_getresponsestream.cs._

## FileWebResponse.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Populates a `SerializationInfo` instance with the data needed to serialize the `FileWebResponse`.

Parameters:

- `serializationInfo`: A `SerializationInfo` , which will hold the serialized data for the `FileWebResponse`.
- `streamingContext`: A `StreamingContext` containing the destination of the serialized stream associated with the new `FileWebResponse`.

To be added.
