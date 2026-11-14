---
title: "FileWebRequest class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/FileWebRequest.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileWebRequest class (part 2 of 2)

## FileWebRequest.GetRequestStreamAsync() method

```csharp
public override System.Threading.Tasks.Task<System.IO.Stream> GetRequestStreamAsync ();
```

Returns a stream for writing data to the file system resource as an asynchronous operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The stream is being used by a previous call to `FileWebRequest.BeginGetRequestStream`.

-or-

The stream already received a response previous to your request.
- `ProtocolViolationException`: The `FileWebRequest.Method` property is GET or HEAD.
- `WebException`: The `FileWebRequest` was aborted.

#### Remarks

> **Note:**
> In the case of asynchronous requests, the client application is responsible for implementing its own time-out mechanism.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `GetRequestStream`.

## FileWebRequest.GetResponse() method

```csharp
public override System.Net.WebResponse GetResponse ();
```

Returns a response to a file system request.

Returns: A `WebResponse` that contains the response from the file system resource.

Exceptions:

- `WebException`: The request timed out.

#### Remarks
The `FileWebRequest.GetResponse` method returns a `WebResponse` object that contains the response from the file system resource.

The `FileWebRequest.GetResponse` method provides synchronous access to the `WebResponse`. For asynchronous access, use the `FileWebRequest.BeginGetResponse` and `FileWebRequest.EndGetResponse` methods.

#### Examples
The following code example uses the `FileWebRequest.GetResponse` method to return a file system request response.

_Code sample not included: ~/snippets/csharp/System.Net/FileWebRequest/GetResponse/getresponse.cs._

## FileWebRequest.GetResponseAsync() method

```csharp
public override System.Threading.Tasks.Task<System.Net.WebResponse> GetResponseAsync ();
```

Returns a response to a file system request as an asynchronous operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The stream is already in use by a previous call to `FileWebRequest.BeginGetResponse`.
- `WebException`: The `FileWebRequest` was aborted.

#### Remarks

> **Note:**
> In the case of asynchronous requests, the client application is responsible for implementing its own time-out mechanism.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `GetResponse`.

## FileWebRequest.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Populates a `SerializationInfo` object with the required data to serialize the `FileWebRequest`.

Parameters:

- `serializationInfo`: A `SerializationInfo` that holds the serialized data for the `FileWebRequest`.
- `streamingContext`: A `StreamingContext` that contains the destination of the serialized stream that is associated with the new `FileWebRequest`.

To be added.
