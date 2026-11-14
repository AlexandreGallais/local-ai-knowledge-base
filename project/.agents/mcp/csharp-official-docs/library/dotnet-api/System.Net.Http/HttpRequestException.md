---
title: "HttpRequestException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpRequestException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpRequestException class

Namespace: `System.Net.Http`

```csharp
public class HttpRequestException : Exception
```

A base class for exceptions thrown by the `HttpClient` and `HttpMessageHandler` classes.

To be added.

## HttpRequestException.HttpRequestException() constructor

```csharp
public HttpRequestException ();
```

Initializes a new instance of the `HttpRequestException` class.

To be added.

## HttpRequestException.HttpRequestException(String) constructor

```csharp
public HttpRequestException (string? message);
```

Initializes a new instance of the `HttpRequestException` class with a specific message that describes the current exception.

Parameters:

- `message`: A message that describes the current exception.

To be added.

## HttpRequestException.HttpRequestException(String, Exception) constructor

```csharp
public HttpRequestException (string? message, Exception? inner);
```

Initializes a new instance of the `HttpRequestException` class with a specific message that describes the current exception and an inner exception.

Parameters:

- `message`: A message that describes the current exception.
- `inner`: The inner exception.

To be added.

## HttpRequestException.HttpRequestException(String, Exception, HttpStatusCode>) constructor

```csharp
public HttpRequestException (string? message, Exception? inner, System.Net.HttpStatusCode? statusCode);
```

Initializes a new instance of the `HttpRequestException` class with a specific message that describes the current exception, an inner exception, and an HTTP status code.

Parameters:

- `message`: A message that describes the current exception.
- `inner`: The inner exception.
- `statusCode`: The HTTP status code.

To be added.

## HttpRequestException.HttpRequestException(HttpRequestError, String, Exception, HttpStatusCode>) constructor

```csharp
public HttpRequestException (System.Net.Http.HttpRequestError httpRequestError, string? message = default, Exception? inner = default, System.Net.HttpStatusCode? statusCode = default);
```

Initializes a new instance of the `HttpRequestException` class with a specific message an inner exception, and an HTTP status code and an `HttpRequestException.HttpRequestError`.

Parameters:

- `httpRequestError`: The `HttpRequestException.HttpRequestError` that caused the exception.
- `message`: A message that describes the current exception.
- `inner`: The inner exception.
- `statusCode`: The HTTP status code.

To be added.

## HttpRequestException.HttpRequestError property

```csharp
public System.Net.Http.HttpRequestError HttpRequestError { get; }
```

Gets the `HttpRequestError` that caused the exception.

Returns: To be added.

To be added.

## HttpRequestException.StatusCode property

```csharp
public System.Net.HttpStatusCode? StatusCode { get; }
```

Gets the HTTP status code to be returned with the exception.

Returns: An HTTP status code if the exception represents a non-successful result, otherwise `null`.

To be added.
