---
title: "Call a web API from an ASP.NET Core Blazor app (part 3 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/call-web-api.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Call a web API from an ASP.NET Core Blazor app (part 3 of 6)

## POST as JSON (`PostAsJsonAsync`)

`System.Net.Http.Json.HttpClientJsonExtensions.PostAsJsonAsync*` sends a POST request to the specified URI containing the value serialized as JSON in the request body.

In the following component code, `newItemName` is provided by a bound element of the component. The `AddItem` method is triggered by selecting a `` element.

```csharp
await Http.PostAsJsonAsync("todoitems", addItem);
```

`System.Net.Http.Json.HttpClientJsonExtensions.PostAsJsonAsync*` returns an `System.Net.Http.HttpResponseMessage`. To deserialize the JSON content from the response message, use the `System.Net.Http.Json.HttpContentJsonExtensions.ReadFromJsonAsync*` extension method. The following example reads JSON weather data as an array:

```csharp
var content = await response.Content.ReadFromJsonAsync<WeatherForecast[]>() ?? 
    Array.Empty<WeatherForecast>();
```

## PUT as JSON (`PutAsJsonAsync`)

`System.Net.Http.Json.HttpClientJsonExtensions.PutAsJsonAsync*` sends an HTTP PUT request with JSON-encoded content.

In the following component code, `editItem` values for `Name` and `IsCompleted` are provided by bound elements of the component. The item's `Id` is set when the item is selected in another part of the UI (not shown) and `EditItem` is called. The `SaveItem` method is triggered by selecting the `` element. The following example doesn't show loading `todoItems` for brevity. See the GET from JSON (`GetFromJsonAsync`) section for an example of loading items.

```csharp
await Http.PutAsJsonAsync($"todoitems/{editItem.Id}", editItem);
```

`System.Net.Http.Json.HttpClientJsonExtensions.PutAsJsonAsync*` returns an `System.Net.Http.HttpResponseMessage`. To deserialize the JSON content from the response message, use the `System.Net.Http.Json.HttpContentJsonExtensions.ReadFromJsonAsync*` extension method. The following example reads JSON weather data as an array:

```csharp
var content = await response.Content.ReadFromJsonAsync<WeatherForecast[]>() ?? 
    Array.Empty<WeatherForecast>();
```

## PATCH as JSON (`PatchAsJsonAsync`)

`System.Net.Http.Json.HttpClientJsonExtensions.PatchAsJsonAsync*` sends an HTTP PATCH request with JSON-encoded content.

> **Note:**
> For more information, see JsonPatch in ASP.NET Core web API.

In the following example, `System.Net.Http.Json.HttpClientJsonExtensions.PatchAsJsonAsync*` receives a JSON PATCH document as a plain text string with escaped quotes:

```csharp
await Http.PatchAsJsonAsync(
    $"todoitems/{id}", 
    "[{\"operationType\":2,\"path\":\"/IsComplete\",\"op\":\"replace\",\"value\":true}]");
```

As of C# 11 (.NET 7), you can compose a JSON string as a raw string literal. Specify JSON syntax with the `System.Diagnostics.CodeAnalysis.StringSyntaxAttribute.Json*` field to the `[StringSyntax]` attribute for code analysis tooling:

```razor
@using System.Diagnostics.CodeAnalysis

...

@code {
    [StringSyntax(StringSyntaxAttribute.Json)]
    private const string patchOperation =
        """[{"operationType":2,"path":"/IsComplete","op":"replace","value":true}]""";

    ...

    await Http.PatchAsJsonAsync($"todoitems/{id}", patchOperation);
}
```

`System.Net.Http.Json.HttpClientJsonExtensions.PatchAsJsonAsync*` returns an `System.Net.Http.HttpResponseMessage`. To deserialize the JSON content from the response message, use the `System.Net.Http.Json.HttpContentJsonExtensions.ReadFromJsonAsync*` extension method. The following example reads JSON todo item data as an array. An empty array is created if no item data is returned by the method, so `content` isn't null after the statement executes:

```csharp
using var response = await Http.PatchAsJsonAsync(...);
var content = await response.Content.ReadFromJsonAsync<TodoItem[]>() ??
    Array.Empty<TodoItem>();
```

Laid out with indentation, spacing, and unescaped quotes, the unencoded PATCH document appears as the following JSON:

```json
[
  {
    "operationType": 2,
    "path": "/IsComplete",
    "op": "replace",
    "value": true
  }
]
```

To simplify the creation of PATCH documents in the app issuing PATCH requests, an app can use .NET JSON PATCH support, as the following guidance demonstrates.

Install the `Microsoft.AspNetCore.JsonPatch.SystemTextJson` NuGet package and use the API features of the package to compose a `Microsoft.AspNetCore.JsonPatch.JsonPatchDocument` for a PATCH request.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

Add `@using` directives for the `System.Text.Json`, `System.Text.Json.Serialization`, and `Microsoft.AspNetCore.JsonPatch.SystemTextJson`  namespaces to the top of the Razor component:

```razor
@using System.Text.Json
@using System.Text.Json.Serialization
@using Microsoft.AspNetCore.JsonPatch.SystemTextJson
```

Compose the `JsonPatchDocument` for a `TodoItem` with `IsComplete` set to `true` using the `JsonPatchDocument.Replace` method:

```csharp
var patchDocument = new JsonPatchDocument<TodoItem>()
    .Replace(p => p.IsComplete, true);
```

Pass the document's operations (`patchDocument.Operations`) to the `System.Net.Http.Json.HttpClientJsonExtensions.PatchAsJsonAsync*` call:

```csharp
private async Task UpdateItem(long id)
{
    await Http.PatchAsJsonAsync(
        $"todoitems/{id}", 
        patchDocument.Operations, 
        new JsonSerializerOptions()
        {
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault
        });
}
```

`System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition` is set to `System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingDefault` to ignore a property only if it equals the default value for its type.

Add `System.Text.Json.JsonSerializerOptions.WriteIndented` set to `true` if you want to present the JSON payload in a pleasant format for display. Writing indented JSON has no bearing on processing PATCH requests and isn't typically performed in production apps for web API requests.

Follow the guidance in the JsonPatch in ASP.NET Core web API article to add a PATCH controller action to the web API. Alternatively, PATCH request processing can be implemented as a Minimal API with the following steps.

Add a package reference for the `Microsoft.AspNetCore.JsonPatch.SystemTextJson` NuGet package to the web API app.

In the `Program` file add an `@using` directive for the `Microsoft.AspNetCore.JsonPatch.SystemTextJson` namespace:

```csharp
using Microsoft.AspNetCore.JsonPatch.SystemTextJson;
```

Provide the endpoint to the request processing pipeline of the web API:

```csharp
app.MapPatch("/todoitems/{id}", async (long id, TodoContext db) =>
{
    if (await db.TodoItems.FindAsync(id) is TodoItem todo)
    {
        var patchDocument = 
            new JsonPatchDocument<TodoItem>().Replace(p => p.IsComplete, true);
        patchDocument.ApplyTo(todo);
        await db.SaveChangesAsync();

        return TypedResults.Ok(todo);
    }

    return TypedResults.NotFound();
});
```

> **Warning:**
> As with the other examples in the JsonPatch in ASP.NET Core web API article, the preceding PATCH API doesn't protect the web API from over-posting attacks. For more information, see Tutorial: Create a controller-based web API with ASP.NET Core.

For a fully working PATCH experience, see the `BlazorWebAppCallWebApi` sample app.

## DELETE (`DeleteAsync`) and additional extension methods

`System.Net.Http` includes additional extension methods for sending HTTP requests and receiving HTTP responses. `System.Net.Http.HttpClient.DeleteAsync*` is used to send an HTTP DELETE request to a web API.

In the following component code, the `` element calls the `DeleteItem` method. The bound `` element supplies the `id` of the item to delete.

```csharp
await Http.DeleteAsync($"todoitems/{id}");
```

## Client-side request streaming

For Chromium-based browsers (for example, Google Chrome and Microsoft Edge) using the HTTP/2 protocol, and HTTPS, client-side Blazor uses Streams API to permit request streaming.

To enable request streaming, set `Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestStreamingEnabled*` to `true` on the `System.Net.Http.HttpRequestMessage`.

In the following file upload example:

* `content` is the file's `System.Net.Http.HttpContent`.
* `/Filesave` is the web API endpoint.
* `Http` is the `System.Net.Http.HttpClient`.

```csharp
using var request = new HttpRequestMessage(HttpMethod.Post, "/Filesave");
request.SetBrowserRequestStreamingEnabled(true);
request.Content = content;

using var response = await Http.SendAsync(request);
```

Streaming requests:

* Require HTTPS protocol and don't work on HTTP/1.x.
* Include a body but not a `Content-Length` header. CORS with a preflight request is required for cross-origin streaming requests.

For more information on file uploads with an `Microsoft.AspNetCore.Components.Forms.InputFile` component, see ASP.NET Core Blazor file uploads and the example at Upload files to a server with client-side rendering (CSR).

## Cookie-based request credentials

*The guidance in this section applies to client-side scenarios that rely upon an authentication cookie.*

For cookie-based authentication, which is considered more secure than bearer token <example-value>, cookie credentials can be sent with each web API request by calling `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.AddHttpMessageHandler*` with a `System.Net.Http.DelegatingHandler` on a preconfigured `System.Net.Http.HttpClient`. The handler configures `Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestCredentials*` with `Microsoft.AspNetCore.Components.WebAssembly.Http.BrowserRequestCredentials.Include`, which advises the browser to send credentials with each request, such as cookies or HTTP authentication headers, including for cross-origin requests.

`CookieHandler.cs`:

```csharp
public class CookieHandler : DelegatingHandler
{
    protected override Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken <example-value>)
    {
        request.SetBrowserRequestCredentials(BrowserRequestCredentials.Include);
        request.Headers.Add("X-Requested-With", [ "XMLHttpRequest" ]);

        return base.SendAsync(request, cancellationToken);
    }
}
```

> **Note:**
> For guidance on how to access an `AuthenticationStateProvider` from a `DelegatingHandler`, see ASP.NET Core Blazor additional server-side security scenarios.

The `CookieHandler` is registered in the `Program` file:

```csharp
builder.Services.AddTransient<CookieHandler>();
```

The message handler is added to any preconfigured `System.Net.Http.HttpClient` that requires cookie authentication:

```csharp
builder.Services.AddHttpClient(...)
    .AddHttpMessageHandler<CookieHandler>();
```

For a demonstration, see Secure ASP.NET Core Blazor WebAssembly with ASP.NET Core Identity.

When composing an `System.Net.Http.HttpRequestMessage`, set the browser request credentials and header directly:

```csharp
using var request = new HttpRequestMessage() { ... };

request.SetBrowserRequestCredentials(BrowserRequestCredentials.Include);
request.Headers.Add("X-Requested-With", [ "XMLHttpRequest" ]);
```

## Use a token <example-value> for web API calls

Blazor Web Apps with OIDC authentication can use a token <example-value> approach to make outgoing requests to secure external web API calls. This approach is used by the `BlazorWebAppOidc` and `BlazorWebAppOidcServer` sample apps described in the *Sample apps* section of this article.

For more information, see the following resources:

* ASP.NET Core Blazor additional server-side security scenarios
* *Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC)*
  * Without YARP and Aspire (Interactive Auto)
  * Without YARP and Aspire (Interactive Server)
