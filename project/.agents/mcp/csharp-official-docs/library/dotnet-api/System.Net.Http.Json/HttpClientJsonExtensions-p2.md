---
title: "HttpClientJsonExtensions class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Json/HttpClientJsonExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClientJsonExtensions class (part 2 of 4)

## HttpClientJsonExtensions.GetFromJsonAsAsyncEnumerable<TValue>(HttpClient, String, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TValue?> GetFromJsonAsAsyncEnumerable<TValue> (this System.Net.Http.HttpClient client, string? requestUri, System.Threading.CancellationToken <example-value> = default);
```

Sends an `HTTP GET`request to the specified `requestUri` and returns the value that results from deserializing the response body as JSON in an async enumerable operation.

Parameters:

- `TValue`: The target type to deserialize to.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: An `IAsyncEnumerable<T>` that represents the deserialized response body.

Exceptions:

- `ArgumentNullException`: The `client` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.GetFromJsonAsAsyncEnumerable<TValue>(HttpClient, Uri, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TValue?> GetFromJsonAsAsyncEnumerable<TValue> (this System.Net.Http.HttpClient client, Uri? requestUri, System.Threading.CancellationToken <example-value> = default);
```

Sends an `HTTP GET`request to the specified `requestUri` and returns the value that results from deserializing the response body as JSON in an async enumerable operation.

Parameters:

- `TValue`: The target type to deserialize to.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: An `IAsyncEnumerable<T>` that represents the deserialized response body.

Exceptions:

- `ArgumentNullException`: The `client` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.GetFromJsonAsAsyncEnumerable<TValue>(HttpClient, String, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TValue?> GetFromJsonAsAsyncEnumerable<TValue> (this System.Net.Http.HttpClient client, string? requestUri, System.Text.Json.JsonSerializerOptions? options, System.Threading.CancellationToken <example-value> = default);
```

Sends an `HTTP GET` request to the specified `requestUri` and returns the value that results from deserializing the response body as JSON in an async enumerable operation.

Parameters:

- `TValue`: The target type to deserialize to.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `options`: To be added.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: An `IAsyncEnumerable<T>` that represents the deserialized response body.

Exceptions:

- `ArgumentNullException`: The `client` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.GetFromJsonAsAsyncEnumerable<TValue>(HttpClient, String, JsonTypeInfo<TValue>, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TValue?> GetFromJsonAsAsyncEnumerable<TValue> (this System.Net.Http.HttpClient client, string? requestUri, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Sends an `HTTP GET`request to the specified `requestUri` and returns the value that results from deserializing the response body as JSON in an async enumerable operation.

Parameters:

- `TValue`: The target type to deserialize to.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `jsonTypeInfo`: The JsonTypeInfo used to control the behavior during deserialization.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: An `IAsyncEnumerable<T>` that represents the deserialized response body.

Exceptions:

- `ArgumentNullException`: The `client` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.GetFromJsonAsAsyncEnumerable<TValue>(HttpClient, Uri, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TValue?> GetFromJsonAsAsyncEnumerable<TValue> (this System.Net.Http.HttpClient client, Uri? requestUri, System.Text.Json.JsonSerializerOptions? options, System.Threading.CancellationToken <example-value> = default);
```

Sends an `HTTP GET`request to the specified `requestUri` and returns the value that results from deserializing the response body as JSON in an async enumerable operation.

Parameters:

- `TValue`: The target type to deserialize to.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `options`: To be added.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: An `IAsyncEnumerable<T>` that represents the deserialized response body.

Exceptions:

- `ArgumentNullException`: The `client` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.GetFromJsonAsAsyncEnumerable<TValue>(HttpClient, Uri, JsonTypeInfo<TValue>, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TValue?> GetFromJsonAsAsyncEnumerable<TValue> (this System.Net.Http.HttpClient client, Uri? requestUri, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Sends an `HTTP GET`request to the specified `requestUri` and returns the value that results from deserializing the response body as JSON in an async enumerable operation.

Parameters:

- `TValue`: The target type to deserialize to.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `jsonTypeInfo`: The JsonTypeInfo used to control the behavior during deserialization.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: An `IAsyncEnumerable<T>` that represents the deserialized response body.

Exceptions:

- `ArgumentNullException`: The `client` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.GetFromJsonAsync(HttpClient, String, Type, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<object?> GetFromJsonAsync (this System.Net.Http.HttpClient client, string? requestUri, Type type, System.Threading.CancellationToken <example-value> = default);
```

Sends a GET request to the specified Uri and returns the value that results from deserializing the response body as JSON in an asynchronous operation.

Parameters:

- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `type`: The type of the object to deserialize to and return.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

This method uses `Web` options for deserialization, whereas `JsonSerializer` deserialization methods do not, by default.

## HttpClientJsonExtensions.GetFromJsonAsync(HttpClient, Uri, Type, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<object?> GetFromJsonAsync (this System.Net.Http.HttpClient client, Uri? requestUri, Type type, System.Threading.CancellationToken <example-value> = default);
```

Sends a GET request to the specified Uri and returns the value that results from deserializing the response body as JSON in an asynchronous operation.

Parameters:

- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `type`: The type of the object to deserialize to and return.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

This method uses `Web` options for deserialization, whereas `JsonSerializer` deserialization methods do not, by default.

## HttpClientJsonExtensions.GetFromJsonAsync(HttpClient, String, Type, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<object?> GetFromJsonAsync (this System.Net.Http.HttpClient client, string? requestUri, Type type, System.Text.Json.JsonSerializerOptions? options, System.Threading.CancellationToken <example-value> = default);
```

Sends a GET request to the specified Uri and returns the value that results from deserializing the response body as JSON in an asynchronous operation.

Parameters:

- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `type`: The type of the object to deserialize to and return.
- `options`: Options to control the behavior during deserialization. The default options are those specified by `JsonSerializerDefaults.Web`.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.GetFromJsonAsync(HttpClient, String, Type, JsonSerializerContext, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<object?> GetFromJsonAsync (this System.Net.Http.HttpClient client, string? requestUri, Type type, System.Text.Json.Serialization.JsonSerializerContext context, System.Threading.CancellationToken <example-value> = default);
```

Sends a GET request to the specified Uri and returns the value that results from deserializing the response body as JSON in an asynchronous operation.

Parameters:

- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `type`: The type of the object to deserialize to and return.
- `context`: The JsonSerializerContext used to control the deserialization behavior.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.GetFromJsonAsync(HttpClient, Uri, Type, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<object?> GetFromJsonAsync (this System.Net.Http.HttpClient client, Uri? requestUri, Type type, System.Text.Json.JsonSerializerOptions? options, System.Threading.CancellationToken <example-value> = default);
```

Sends a GET request to the specified Uri and returns the value that results from deserializing the response body as JSON in an asynchronous operation.

Parameters:

- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `type`: The type of the object to deserialize to and return.
- `options`: Options to control the behavior during deserialization. The default options are those specified by `JsonSerializerDefaults.Web`.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.GetFromJsonAsync(HttpClient, Uri, Type, JsonSerializerContext, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<object?> GetFromJsonAsync (this System.Net.Http.HttpClient client, Uri? requestUri, Type type, System.Text.Json.Serialization.JsonSerializerContext context, System.Threading.CancellationToken <example-value> = default);
```

Sends a GET request to the specified Uri and returns the value that results from deserializing the response body as JSON in an asynchronous operation.

Parameters:

- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `type`: The type of the object to deserialize to and return.
- `context`: The JsonSerializerContext used to control the deserialization behavior.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
