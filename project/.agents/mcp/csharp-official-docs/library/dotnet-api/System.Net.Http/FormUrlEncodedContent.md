---
title: "FormUrlEncodedContent class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/FormUrlEncodedContent.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FormUrlEncodedContent class

Namespace: `System.Net.Http`

```csharp
public class FormUrlEncodedContent : System.Net.Http.ByteArrayContent
```

A container for name/value tuples encoded using application/x-www-form-urlencoded MIME type.

To be added.

## FormUrlEncodedContent.FormUrlEncodedContent(String>>) constructor

```csharp
public FormUrlEncodedContent (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,string>> nameValueCollection);
```

Initializes a new instance of the `FormUrlEncodedContent` class with a specific collection of name/value pairs.

Parameters:

- `nameValueCollection`: A collection of name/value pairs.

To be added.

## FormUrlEncodedContent.SerializeToStreamAsync(Stream, TransportContext, CancellationToken) method

```csharp
protected override System.Threading.Tasks.Task SerializeToStreamAsync (System.IO.Stream stream, System.Net.TransportContext? context, System.Threading.CancellationToken <example-value>);
```

Serializes and writes all name/value tuples provided in the constructor to an HTTP content stream as an asynchronous operation.

Parameters:

- `stream`: The target stream.
- `context`: Information about the transport, like channel binding token. This parameter may be `null`.
- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation does not block. When the returned `Task` object completes, the all name/value tuples has been written to the `stream` parameter.
