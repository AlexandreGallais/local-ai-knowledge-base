---
title: "StringContent class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/StringContent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringContent class

Namespace: `System.Net.Http`

```csharp
public class StringContent : System.Net.Http.ByteArrayContent
```

Provides HTTP content based on a string.

To be added.

## StringContent.StringContent(String) constructor

```csharp
public StringContent (string content);
```

Creates a new instance of the `StringContent` class.

Parameters:

- `content`: The content used to initialize the `StringContent`.

#### Remarks
The media type for the `StringContent` created defaults to text/plain.

## StringContent.StringContent(String, MediaTypeHeaderValue) constructor

```csharp
public StringContent (string content, System.Net.Http.Headers.MediaTypeHeaderValue? mediaType);
```

Creates a new instance of the `StringContent` class.

Parameters:

- `content`: The content used to initialize the `StringContent`.
- `mediaType`: The media type to use for the content.

To be added.

## StringContent.StringContent(String, Encoding) constructor

```csharp
public StringContent (string content, System.Text.Encoding? encoding);
```

Creates a new instance of the `StringContent` class.

Parameters:

- `content`: The content used to initialize the `StringContent`.
- `encoding`: The encoding to use for the content.

#### Remarks
The media type for the `StringContent` created defaults to text/plain.

## StringContent.StringContent(String, Encoding, MediaTypeHeaderValue) constructor

```csharp
public StringContent (string content, System.Text.Encoding? encoding, System.Net.Http.Headers.MediaTypeHeaderValue? mediaType);
```

Creates a new instance of the `StringContent` class.

Parameters:

- `content`: The content used to initialize the `StringContent`.
- `encoding`: The encoding to use for the content.
- `mediaType`: The media type to use for the content.

To be added.

## StringContent.StringContent(String, Encoding, String) constructor

```csharp
public StringContent (string content, System.Text.Encoding? encoding, string? mediaType);
```

Creates a new instance of the `StringContent` class.

Parameters:

- `content`: The content used to initialize the `StringContent`.
- `encoding`: The encoding to use for the content.
- `mediaType`: The media type to use for the content.

To be added.

## StringContent.SerializeToStreamAsync(Stream, TransportContext, CancellationToken) method

```csharp
protected override System.Threading.Tasks.Task SerializeToStreamAsync (System.IO.Stream stream, System.Net.TransportContext? context, System.Threading.CancellationToken <example-value>);
```

Serializes and writes the string provided in the constructor to an HTTP content stream as an asynchronous operation.

Parameters:

- `stream`: The target stream.
- `context`: Information about the transport, like channel binding token. This parameter may be `null`.
- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation does not block. When the returned `Task` object completes, the whole string has been written to the `stream` parameter.
