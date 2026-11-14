---
title: "WebRequest class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebRequest.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebRequest class (part 2 of 2)

## WebRequest.EndGetResponse(IAsyncResult) method

```csharp
public virtual System.Net.WebResponse EndGetResponse (IAsyncResult asyncResult);
```

When overridden in a descendant class, returns a `WebResponse`.

Parameters:

- `asyncResult`: An `IAsyncResult` that references a pending request for a response.

Returns: A `WebResponse` that contains a response to the Internet request.

Exceptions:

- `NotImplementedException`: Any attempt is made to access the method, when the method is not overridden in a descendant class.

## WebRequest.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
protected virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Populates a `SerializationInfo` with the data needed to serialize the target object.

Parameters:

- `serializationInfo`: The `SerializationInfo` to populate with data.
- `streamingContext`: A `StreamingContext` that specifies the destination for this serialization.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## WebRequest.GetRequestStream() method

```csharp
public virtual System.IO.Stream GetRequestStream ();
```

When overridden in a descendant class, returns a `Stream` for writing data to the Internet resource.

Returns: A `Stream` for writing data to the Internet resource.

Exceptions:

- `NotImplementedException`: Any attempt is made to access the method, when the method is not overridden in a descendant class.

## WebRequest.GetRequestStreamAsync() method

```csharp
public virtual System.Threading.Tasks.Task<System.IO.Stream> GetRequestStreamAsync ();
```

When overridden in a descendant class, returns a `Stream` for writing data to the Internet resource as an asynchronous operation.

Returns: The task object representing the asynchronous operation.

## WebRequest.GetResponse() method

```csharp
public virtual System.Net.WebResponse GetResponse ();
```

When overridden in a descendant class, returns a response to an Internet request.

Returns: A `WebResponse` containing the response to the Internet request.

Exceptions:

- `NotImplementedException`: Any attempt is made to access the method, when the method is not overridden in a descendant class.

## WebRequest.GetResponseAsync() method

```csharp
public virtual System.Threading.Tasks.Task<System.Net.WebResponse> GetResponseAsync ();
```

When overridden in a descendant class, returns a response to an Internet request as an asynchronous operation.

Returns: The task object representing the asynchronous operation.

## WebRequest.GetSystemWebProxy() method

```csharp
public static System.Net.IWebProxy GetSystemWebProxy ();
```

Returns a proxy configured with the Internet options settings of the currently impersonated user.

Returns: An `IWebProxy` used by every call to instances of `WebRequest`.

## WebRequest.RegisterPrefix(String, IWebRequestCreate) method

```csharp
public static bool RegisterPrefix (string prefix, System.Net.IWebRequestCreate creator);
```

Registers a `WebRequest` descendant for the specified URI.

Parameters:

- `prefix`: The complete URI or URI prefix that the `WebRequest` descendant services.
- `creator`: The create method that the `WebRequest` calls to create the `WebRequest` descendant.

Returns: `true` if registration is successful; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `prefix` is `null`

-or-

`creator` is `null`.

## WebRequest.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

When overridden in a descendant class, populates a `SerializationInfo` instance with the data needed to serialize the `WebRequest`.

Parameters:

- `serializationInfo`: A `SerializationInfo`, which holds the serialized data for the `WebRequest`.
- `streamingContext`: A `StreamingContext` that contains the destination of the serialized stream associated with the new `WebRequest`.

Exceptions:

- `NotImplementedException`: An attempt is made to serialize the object, when the interface is not overridden in a descendant class.

To be added.
