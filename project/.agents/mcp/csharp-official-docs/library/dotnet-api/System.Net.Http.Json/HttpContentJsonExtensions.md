---
title: "HttpContentJsonExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Json/HttpContentJsonExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpContentJsonExtensions class

Namespace: `System.Net.Http.Json`

```csharp
public static class HttpContentJsonExtensions
```

Contains extension methods to read and then parse the `HttpContent` from JSON.

To be added.

## HttpContentJsonExtensions.ReadFromJsonAsAsyncEnumerable<TValue>(HttpContent, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TValue?> ReadFromJsonAsAsyncEnumerable<TValue> (this System.Net.Http.HttpContent content, System.Threading.CancellationToken <example-value> = default);
```

Reads the HTTP content and returns the value that results from deserializing the content as JSON in an async enumerable operation.

Parameters:

- `TValue`: The target type to deserialize to.
- `content`: To be added.
- `cancellationToken`: To be added.

Returns: An `IAsyncEnumerable<T>` that represents the deserialized response body.

Exceptions:

- `ArgumentNullException`: The `content` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpContentJsonExtensions.ReadFromJsonAsAsyncEnumerable<TValue>(HttpContent, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TValue?> ReadFromJsonAsAsyncEnumerable<TValue> (this System.Net.Http.HttpContent content, System.Text.Json.JsonSerializerOptions? options, System.Threading.CancellationToken <example-value> = default);
```

Reads the HTTP content and returns the value that results from deserializing the content as JSON in an async enumerable operation.

Parameters:

- `TValue`: The target type to deserialize to.
- `content`: The content to read from.
- `options`: Options to control the behavior during deserialization.
The default options are those specified by `JsonSerializerDefaults.Web`.
- `cancellationToken`: To be added.

Returns: An `IAsyncEnumerable<T>` that represents the deserialized response body.

Exceptions:

- `ArgumentNullException`: The `content` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpContentJsonExtensions.ReadFromJsonAsAsyncEnumerable<TValue>(HttpContent, JsonTypeInfo<TValue>, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TValue?> ReadFromJsonAsAsyncEnumerable<TValue> (this System.Net.Http.HttpContent content, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Reads the HTTP content and returns the value that results from deserializing the content as JSON in an async enumerable operation.

Parameters:

- `TValue`: The target type to deserialize to.
- `content`: The content to read from.
- `jsonTypeInfo`: The JsonTypeInfo used to control the deserialization behavior.
- `cancellationToken`: To be added.

Returns: An `IAsyncEnumerable<T>` that represents the deserialized response body.

Exceptions:

- `ArgumentNullException`: The `content` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpContentJsonExtensions.ReadFromJsonAsync(HttpContent, Type, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<object?> ReadFromJsonAsync (this System.Net.Http.HttpContent content, Type type, System.Threading.CancellationToken <example-value> = default);
```

Reads the HTTP content and returns the value that results from deserializing the content as JSON in an asynchronous operation.

Parameters:

- `content`: The content to read from.
- `type`: The type of the object to deserialize to and return.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpContentJsonExtensions.ReadFromJsonAsync(HttpContent, Type, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<object?> ReadFromJsonAsync (this System.Net.Http.HttpContent content, Type type, System.Text.Json.JsonSerializerOptions? options, System.Threading.CancellationToken <example-value> = default);
```

Reads the HTTP content and returns the value that results from deserializing the content as JSON in an asynchronous operation.

Parameters:

- `content`: The content to read from.
- `type`: The type of the object to deserialize to and return.
- `options`: Options to control the behavior during deserialization. The default options are those specified by `JsonSerializerDefaults.Web`.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpContentJsonExtensions.ReadFromJsonAsync(HttpContent, Type, JsonSerializerContext, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<object?> ReadFromJsonAsync (this System.Net.Http.HttpContent content, Type type, System.Text.Json.Serialization.JsonSerializerContext context, System.Threading.CancellationToken <example-value> = default);
```

Reads the HTTP content and returns the value that results from deserializing the content as JSON in an asynchronous operation.

Parameters:

- `content`: The content to read from.
- `type`: The type of the object to deserialize to and return.
- `context`: The JsonSerializerContext used to control the deserialization behavior.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpContentJsonExtensions.ReadFromJsonAsync<T>(HttpContent, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<T?> ReadFromJsonAsync<T> (this System.Net.Http.HttpContent content, System.Threading.CancellationToken <example-value> = default);
```

Reads the HTTP content and returns the value that results from deserializing the content as JSON in an asynchronous operation.

Parameters:

- `T`: The target type to deserialize to.
- `content`: The content to read from.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpContentJsonExtensions.ReadFromJsonAsync<T>(HttpContent, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<T?> ReadFromJsonAsync<T> (this System.Net.Http.HttpContent content, System.Text.Json.JsonSerializerOptions? options, System.Threading.CancellationToken <example-value> = default);
```

Reads the HTTP content and returns the value that results from deserializing the content as JSON in an asynchronous operation.

Parameters:

- `T`: The target type to deserialize to.
- `content`: The content to read from.
- `options`: Options to control the behavior during deserialization. The default options are those specified by `JsonSerializerDefaults.Web`.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpContentJsonExtensions.ReadFromJsonAsync<T>(HttpContent, JsonTypeInfo<T>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<T?> ReadFromJsonAsync<T> (this System.Net.Http.HttpContent content, System.Text.Json.Serialization.Metadata.JsonTypeInfo<T> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Reads the HTTP content and returns the value that results from deserializing the content as JSON in an asynchronous operation.

Parameters:

- `T`: The target type to deserialize to.
- `content`: The content to read from.
- `jsonTypeInfo`: The JsonTypeInfo used to control the deserialization behavior.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
