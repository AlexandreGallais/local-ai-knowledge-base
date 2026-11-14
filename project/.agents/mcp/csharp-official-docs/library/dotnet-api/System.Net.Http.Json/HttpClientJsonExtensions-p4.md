---
title: "HttpClientJsonExtensions class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Json/HttpClientJsonExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClientJsonExtensions class (part 4 of 4)

## HttpClientJsonExtensions.PostAsJsonAsync<TValue>(HttpClient, Uri, TValue, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PostAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, Uri? requestUri, TValue value, System.Threading.CancellationToken <example-value>);
```

Sends a POST request to the specified Uri containing the `value` serialized as JSON in the request body.

Parameters:

- `TValue`: The type of the value to serialize.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `value`: The value to serialize.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

This method uses `Web` options for serialization, whereas `JsonSerializer` serialization methods do not, by default.

## HttpClientJsonExtensions.PostAsJsonAsync<TValue>(HttpClient, String, TValue, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PostAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, string? requestUri, TValue value, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Sends a POST request to the specified Uri containing the `value` serialized as JSON in the request body.

Parameters:

- `TValue`: The type of the value to serialize.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `value`: The value to serialize.
- `options`: Options to control the behavior during serialization. The default options are those specified by `JsonSerializerDefaults.Web`.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.PostAsJsonAsync<TValue>(HttpClient, String, TValue, JsonTypeInfo<TValue>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PostAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, string? requestUri, TValue value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Sends a POST request to the specified Uri containing the `value` serialized as JSON in the request body.

Parameters:

- `TValue`: The type of the value to serialize.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `value`: The value to serialize.
- `jsonTypeInfo`: The JsonTypeInfo used to control the serialization behavior.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.PostAsJsonAsync<TValue>(HttpClient, Uri, TValue, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PostAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, Uri? requestUri, TValue value, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Sends a POST request to the specified Uri containing the `value` serialized as JSON in the request body.

Parameters:

- `TValue`: The type of the value to serialize.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `value`: The value to serialize.
- `options`: Options to control the behavior during serialization. The default options are those specified by `JsonSerializerDefaults.Web`.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.PostAsJsonAsync<TValue>(HttpClient, Uri, TValue, JsonTypeInfo<TValue>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PostAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, Uri? requestUri, TValue value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Sends a POST request to the specified Uri containing the `value` serialized as JSON in the request body.

Parameters:

- `TValue`: The type of the value to serialize.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `value`: The value to serialize.
- `jsonTypeInfo`: The JsonTypeInfo used to control the serialization behavior.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.PutAsJsonAsync<TValue>(HttpClient, String, TValue, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PutAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, string? requestUri, TValue value, System.Threading.CancellationToken <example-value>);
```

Sends a PUT request to the specified Uri containing the `value` serialized as JSON in the request body.

Parameters:

- `TValue`: The type of the value to serialize.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `value`: The value to serialize.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

This method uses `Web` options for serialization, whereas `JsonSerializer` serialization methods do not, by default.

## HttpClientJsonExtensions.PutAsJsonAsync<TValue>(HttpClient, Uri, TValue, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PutAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, Uri? requestUri, TValue value, System.Threading.CancellationToken <example-value>);
```

Sends a PUT request to the specified Uri containing the `value` serialized as JSON in the request body.

Parameters:

- `TValue`: The type of the value to serialize.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `value`: The value to serialize.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

This method uses `Web` options for serialization, whereas `JsonSerializer` serialization methods do not, by default.

## HttpClientJsonExtensions.PutAsJsonAsync<TValue>(HttpClient, String, TValue, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PutAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, string? requestUri, TValue value, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Sends a PUT request to the specified Uri containing the `value` serialized as JSON in the request body.

Parameters:

- `TValue`: The type of the value to serialize.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `value`: The value to serialize.
- `options`: Options to control the behavior during serialization. The default options are those specified by `JsonSerializerDefaults.Web`.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.PutAsJsonAsync<TValue>(HttpClient, String, TValue, JsonTypeInfo<TValue>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PutAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, string? requestUri, TValue value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Sends a PUT request to the specified Uri containing the `value` serialized as JSON in the request body.

Parameters:

- `TValue`: The type of the value to serialize.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `value`: The value to serialize.
- `jsonTypeInfo`: The JsonTypeInfo used to control the serialization behavior.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.PutAsJsonAsync<TValue>(HttpClient, Uri, TValue, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PutAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, Uri? requestUri, TValue value, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Sends a PUT request to the specified Uri containing the `value` serialized as JSON in the request body.

Parameters:

- `TValue`: The type of the value to serialize.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `value`: The value to serialize.
- `options`: Options to control the behavior during serialization. The default options are those specified by `JsonSerializerDefaults.Web`.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.PutAsJsonAsync<TValue>(HttpClient, Uri, TValue, JsonTypeInfo<TValue>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PutAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, Uri? requestUri, TValue value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Sends a PUT request to the specified Uri containing the `value` serialized as JSON in the request body.

Parameters:

- `TValue`: The type of the value to serialize.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `value`: The value to serialize.
- `jsonTypeInfo`: The JsonTypeInfo used to control the serialization behavior.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
