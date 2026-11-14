---
title: "HttpClientJsonExtensions class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Json/HttpClientJsonExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClientJsonExtensions class (part 3 of 4)

## HttpClientJsonExtensions.GetFromJsonAsync<TValue>(HttpClient, String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<TValue?> GetFromJsonAsync<TValue> (this System.Net.Http.HttpClient client, string? requestUri, System.Threading.CancellationToken <example-value> = default);
```

Sends a GET request to the specified Uri and returns the value that results from deserializing the response body as JSON in an asynchronous operation.

Parameters:

- `TValue`: The target type to deserialize to.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

This method uses `Web` options for deserialization, whereas `JsonSerializer` deserialization methods do not, by default.

## HttpClientJsonExtensions.GetFromJsonAsync<TValue>(HttpClient, Uri, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<TValue?> GetFromJsonAsync<TValue> (this System.Net.Http.HttpClient client, Uri? requestUri, System.Threading.CancellationToken <example-value> = default);
```

Sends a GET request to the specified Uri and returns the value that results from deserializing the response body as JSON in an asynchronous operation.

Parameters:

- `TValue`: The target type to deserialize to.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

This method uses `Web` options for deserialization, whereas `JsonSerializer` deserialization methods do not, by default.

## HttpClientJsonExtensions.GetFromJsonAsync<TValue>(HttpClient, String, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<TValue?> GetFromJsonAsync<TValue> (this System.Net.Http.HttpClient client, string? requestUri, System.Text.Json.JsonSerializerOptions? options, System.Threading.CancellationToken <example-value> = default);
```

Sends a GET request to the specified Uri and returns the value that results from deserializing the response body as JSON in an asynchronous operation.

Parameters:

- `TValue`: The target type to deserialize to.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `options`: Options to control the behavior during deserialization. The default options are those specified by `JsonSerializerDefaults.Web`.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.GetFromJsonAsync<TValue>(HttpClient, String, JsonTypeInfo<TValue>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<TValue?> GetFromJsonAsync<TValue> (this System.Net.Http.HttpClient client, string? requestUri, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Sends a GET request to the specified Uri and returns the value that results from deserializing the response body as JSON in an asynchronous operation.

Parameters:

- `TValue`: The target type to deserialize to.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `jsonTypeInfo`: The JsonTypeInfo used to control the deserialization behavior.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.GetFromJsonAsync<TValue>(HttpClient, Uri, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<TValue?> GetFromJsonAsync<TValue> (this System.Net.Http.HttpClient client, Uri? requestUri, System.Text.Json.JsonSerializerOptions? options, System.Threading.CancellationToken <example-value> = default);
```

Sends a GET request to the specified Uri and returns the value that results from deserializing the response body as JSON in an asynchronous operation.

Parameters:

- `TValue`: The target type to deserialize to.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `options`: Options to control the behavior during deserialization. The default options are those specified by `JsonSerializerDefaults.Web`.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.GetFromJsonAsync<TValue>(HttpClient, Uri, JsonTypeInfo<TValue>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<TValue?> GetFromJsonAsync<TValue> (this System.Net.Http.HttpClient client, Uri? requestUri, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Sends a GET request to the specified Uri and returns the value that results from deserializing the response body as JSON in an asynchronous operation.

Parameters:

- `TValue`: The target type to deserialize to.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `jsonTypeInfo`: The JsonTypeInfo used to control the deserialization behavior.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.PatchAsJsonAsync<TValue>(HttpClient, String, TValue, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PatchAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, string? requestUri, TValue value, System.Threading.CancellationToken <example-value>);
```

Sends a PATCH request to the specified Uri containing the `value` serialized as JSON in the request body.

Parameters:

- `TValue`: The type of the value to serialize.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `value`: The value to serialize.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `client` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.PatchAsJsonAsync<TValue>(HttpClient, Uri, TValue, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PatchAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, Uri? requestUri, TValue value, System.Threading.CancellationToken <example-value>);
```

Sends a PATCH request to the specified Uri containing the `value` serialized as JSON in the request body.

Parameters:

- `TValue`: The type of the value to serialize.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `value`: The value to serialize.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `client` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.PatchAsJsonAsync<TValue>(HttpClient, String, TValue, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PatchAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, string? requestUri, TValue value, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Sends a PATCH request to the specified Uri containing the `value` serialized as JSON in the request body.

Parameters:

- `TValue`: The type of the value to serialize.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `value`: The value to serialize.
- `options`: Options to control the behavior during serialization. The default options are those specified by `JsonSerializerDefaults.Web`.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `client` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.PatchAsJsonAsync<TValue>(HttpClient, String, TValue, JsonTypeInfo<TValue>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PatchAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, string? requestUri, TValue value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Sends a PATCH request to the specified Uri containing the `value` serialized as JSON in the request body.

Parameters:

- `TValue`: The type of the value to serialize.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `value`: The value to serialize.
- `jsonTypeInfo`: The JsonTypeInfo used to control the behavior during serialization.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `client` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.PatchAsJsonAsync<TValue>(HttpClient, Uri, TValue, JsonSerializerOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PatchAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, Uri? requestUri, TValue value, System.Text.Json.JsonSerializerOptions? options = default, System.Threading.CancellationToken <example-value> = default);
```

Sends a PATCH request to the specified Uri containing the `value` serialized as JSON in the request body.

Parameters:

- `TValue`: The type of the value to serialize.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `value`: The value to serialize.
- `options`: Options to control the behavior during serialization. The default options are those specified by `JsonSerializerDefaults.Web`.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `client` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.PatchAsJsonAsync<TValue>(HttpClient, Uri, TValue, JsonTypeInfo<TValue>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PatchAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, Uri? requestUri, TValue value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<TValue> jsonTypeInfo, System.Threading.CancellationToken <example-value> = default);
```

Sends a PATCH request to the specified Uri containing the `value` serialized as JSON in the request body.

Parameters:

- `TValue`: The type of the value to serialize.
- `client`: The client used to send the request.
- `requestUri`: The Uri the request is sent to.
- `value`: The value to serialize.
- `jsonTypeInfo`: The JsonTypeInfo used to control the behavior during serialization.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `client` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpClientJsonExtensions.PostAsJsonAsync<TValue>(HttpClient, String, TValue, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PostAsJsonAsync<TValue> (this System.Net.Http.HttpClient client, string? requestUri, TValue value, System.Threading.CancellationToken <example-value>);
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
