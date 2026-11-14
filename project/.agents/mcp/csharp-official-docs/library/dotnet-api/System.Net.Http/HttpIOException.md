---
title: "HttpIOException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpIOException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpIOException class

Namespace: `System.Net.Http`

```csharp
public class HttpIOException : System.IO.IOException
```

The exception that is thrown when an error occurs while reading the response.

To be added.

## HttpIOException.HttpIOException(HttpRequestError, String, Exception) constructor

```csharp
public HttpIOException (System.Net.Http.HttpRequestError httpRequestError, string? message = default, Exception? innerException = default);
```

Initializes a new instance of the `HttpIOException` class.

Parameters:

- `httpRequestError`: The `HttpRequestError` that caused the exception.
- `message`: The message string describing the error.
- `innerException`: The exception that is the cause of the current exception.

To be added.

## HttpIOException.HttpRequestError property

```csharp
public System.Net.Http.HttpRequestError HttpRequestError { get; }
```

Gets the `HttpRequestError` that caused the exception.

Returns: To be added.

To be added.

## HttpIOException.Message property

```csharp
public override string Message { get; }
```

Gets a message that describes the current exception.

Returns: The error message that explains the reason for the exception, or an empty string ("").

To be added.
