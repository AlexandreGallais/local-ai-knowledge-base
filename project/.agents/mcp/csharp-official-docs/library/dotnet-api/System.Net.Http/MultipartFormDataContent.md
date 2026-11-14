---
title: "MultipartFormDataContent class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/MultipartFormDataContent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MultipartFormDataContent class

Namespace: `System.Net.Http`

```csharp
public class MultipartFormDataContent : System.Net.Http.MultipartContent
```

Provides a container for content encoded using multipart/form-data MIME type.

#### Remarks
This type is derived from `MultipartContent` type. All `MultipartFormDataContent` does is provide methods to add required Content-Disposition headers to content object added to the collection.

## MultipartFormDataContent.MultipartFormDataContent() constructor

```csharp
public MultipartFormDataContent ();
```

Creates a new instance of the `MultipartFormDataContent` class.

To be added.

## MultipartFormDataContent.MultipartFormDataContent(String) constructor

```csharp
public MultipartFormDataContent (string boundary);
```

Creates a new instance of the `MultipartFormDataContent` class.

Parameters:

- `boundary`: The boundary string for the multipart form data content.

Exceptions:

- `ArgumentException`: The `boundary` was `null` or contains only white space characters.

-or-

The `boundary` ends with a space character.
- `ArgumentOutOfRangeException`: The length of the `boundary` was greater than 70.

To be added.

## MultipartFormDataContent.Add(HttpContent) method

```csharp
public override void Add (System.Net.Http.HttpContent content);
```

Adds HTTP content to a collection of `HttpContent` objects that get serialized to multipart/form-data MIME type.

Parameters:

- `content`: The HTTP content to add to the collection.

Exceptions:

- `ArgumentNullException`: The `content` was `null`.

To be added.

## MultipartFormDataContent.Add(HttpContent, String) method

```csharp
public void Add (System.Net.Http.HttpContent content, string name);
```

Adds HTTP content to a collection of `HttpContent` objects that get serialized to multipart/form-data MIME type.

Parameters:

- `content`: The HTTP content to add to the collection.
- `name`: The name for the HTTP content to add.

Exceptions:

- `ArgumentException`: The `name` was `null` or contains only white space characters.
- `ArgumentNullException`: The `content` was `null`.

To be added.

## MultipartFormDataContent.Add(HttpContent, String, String) method

```csharp
public void Add (System.Net.Http.HttpContent content, string name, string fileName);
```

Adds HTTP content to a collection of `HttpContent` objects that get serialized to multipart/form-data MIME type.

Parameters:

- `content`: The HTTP content to add to the collection.
- `name`: The name for the HTTP content to add.
- `fileName`: The file name for the HTTP content to add to the collection.

Exceptions:

- `ArgumentException`: The `name` was `null` or contains only white space characters.

-or-

The `fileName` was `null` or contains only white space characters.
- `ArgumentNullException`: The `content` was `null`.

To be added.

## MultipartFormDataContent.SerializeToStreamAsync(Stream, TransportContext, CancellationToken) method

```csharp
protected override System.Threading.Tasks.Task SerializeToStreamAsync (System.IO.Stream stream, System.Net.TransportContext? context, System.Threading.CancellationToken <example-value>);
```

Serializes and writes the content provided in the constructor to an HTTP content stream as an asynchronous operation.

Parameters:

- `stream`: The target stream.
- `context`: Information about the transport, like channel binding token. This parameter may be `null`.
- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation does not block. When the returned `Task` object completes, the whole content has been written to the `stream` parameter.
