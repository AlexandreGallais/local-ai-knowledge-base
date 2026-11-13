---
title: "Call a web API from an ASP.NET Core Blazor app (part 5 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/call-web-api.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Call a web API from an ASP.NET Core Blazor app (part 5 of 6)

## `HttpClient` and `HttpRequestMessage` with Fetch API request options

*The guidance in this section applies to client-side scenarios that rely upon bearer token authentication.*

`HttpClient` (API documentation) and `System.Net.Http.HttpRequestMessage` can be used to customize requests. For example, you can specify the HTTP method and request headers. The following component makes a `POST` request to a web API endpoint and shows the response body.

`TodoRequest.razor`:

```razor
@page "/todo-request"
@using System.Net.Http.Headers
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication
@inject HttpClient Http
@inject IAccessTokenProvider TokenProvider

<h1>ToDo Request</h1>

<h1>ToDo Request Example</h1>

<button @onclick="PostRequest">Submit POST request</button>

<p>Response body returned by the server:</p>

<p>@responseBody</p>

@code {
    private string? responseBody;

    private async Task PostRequest()
    {
        using var request = new HttpRequestMessage()
        {
            Method = new HttpMethod("POST"),
            RequestUri = new Uri("https://localhost:10000/todoitems"),
            Content =
                JsonContent.Create(new TodoItem
                {
                    Name = "My New Todo Item",
                    IsComplete = false
                })
        };

        var tokenResult = await TokenProvider.RequestAccessToken();

        if (tokenResult.TryGetToken(out var token))
        {
            request.Headers.Authorization =
                new AuthenticationHeaderValue("<example-value>", token.Value);

            request.Content.Headers.TryAddWithoutValidation(
                "x-custom-header", "value");

            using var response = await Http.SendAsync(request);
            var responseStatusCode = response.StatusCode;

            responseBody = await response.Content.ReadAsStringAsync();
        }
    }

    public class TodoItem
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public bool IsComplete { get; set; }
    }
}
```

Blazor's client-side implementation of `System.Net.Http.HttpClient` uses Fetch API and configures the underlying request-specific Fetch API options via `System.Net.Http.HttpRequestMessage` extension methods and `Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions`. Set additional options using the generic `Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestOption*` extension method. Blazor and the underlying Fetch API don't directly add or modify request headers. For more information on how user agents, such as browsers, interact with headers, consult external user agent documentation sets and other web resources.

Response streaming is enabled by default.

Calling `System.Net.Http.HttpContent.ReadAsStreamAsync*` for an `System.Net.Http.HttpResponseMessage.Content` (`response.Content.ReadAsStreamAsync()`) returns a `BrowserHttpReadStream` (reference source), not a `System.IO.MemoryStream`. `BrowserHttpReadStream` doesn't support synchronous operations, such as `Stream.Read(Span<Byte>)`. If your code uses synchronous operations, you can opt-out of response streaming or copy the `System.IO.Stream` into a `System.IO.MemoryStream` yourself.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

To opt-out of response streaming globally, use either of the following approaches:

* Add the `<WasmEnableStreamingResponse>` property to the project file with a value of `false`:

  ```xml
  <WasmEnableStreamingResponse>false</WasmEnableStreamingResponse>
  ```

* Set the `DOTNET_WASM_ENABLE_STREAMING_RESPONSE` environment variable to `false` or `0`.

To opt-out of response streaming for an individual request, set `Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserResponseStreamingEnabled*` to `false` on the `System.Net.Http.HttpRequestMessage` (`request` in the following example):

```csharp
request.SetBrowserResponseStreamingEnabled(false);
```

To include credentials in a cross-origin request, use the `Microsoft.AspNetCore.Components.WebAssembly.Http.WebAssemblyHttpRequestMessageExtensions.SetBrowserRequestCredentials*` extension method:

```csharp
request.SetBrowserRequestCredentials(BrowserRequestCredentials.Include);
```

For more information on Fetch API options, see MDN web docs: WindowOrWorkerGlobalScope.fetch(): Parameters.

## Handle errors

Handle web API response errors in developer code when they occur. For example, `System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync*` expects a JSON response from the web API with a `Content-Type` of `application/json`. If the response isn't in JSON format, content validation throws a `System.NotSupportedException`.

In the following example, the URI endpoint for the weather forecast data request is misspelled. The URI should be to `WeatherForecast` but appears in the call as `WeatherForcast`, which is missing the letter `e` in `Forecast`.

The `System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync*` call expects JSON to be returned, but the web API returns HTML for an unhandled exception with a `Content-Type` of `text/html`. The unhandled exception occurs because the path to `/WeatherForcast` isn't found and middleware can't serve a page or view for the request.

In `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*` on the client, `System.NotSupportedException` is thrown when the response content is validated as non-JSON. The exception is caught in the `catch` block, where custom logic could log the error or present a friendly error message to the user.

`ReturnHTMLOnException.razor`:

```razor
@page "/return-html-on-exception"
@using {PROJECT NAME}.Shared
@inject HttpClient Http

<h1>Fetch data but receive HTML on unhandled exception</h1>

@if (forecasts == null)
{
    <p><em>Loading...</em></p>
}
else
{
    <h2>Temperatures by Date</h2>

    <ul>
        @foreach (var forecast in forecasts)
        {
            <li>
                @forecast.Date.ToShortDateString():
                @forecast.TemperatureC &#8451;
                @forecast.TemperatureF &#8457;
            </li>
        }
    </ul>
}

<p>
    @exceptionMessage
</p>

@code {
    private WeatherForecast[]? forecasts;
    private string? exceptionMessage;

    protected override async Task OnInitializedAsync()
    {
        try
        {
            // The URI endpoint "WeatherForecast" is misspelled on purpose on the 
            // next line. See the preceding text for more information.
            forecasts = await Http.GetFromJsonAsync<WeatherForecast[]>("WeatherForcast");
        }
        catch (NotSupportedException exception)
        {
            exceptionMessage = exception.Message;
        }
    }
}
```

> **Note:**
> The preceding example is for demonstration purposes. A web API can be configured to return JSON even when an endpoint doesn't exist or an unhandled exception occurs on the server.

For more information, see Handle errors in ASP.NET Core Blazor apps.

## Cross-Origin Resource Sharing (CORS)

Browser security often restricts a webpage from making requests to a different origin than the one that served the webpage. This restriction is called the *same-origin policy*. The same-origin policy restricts (but doesn't prevent) a malicious site from reading sensitive data from another site. To make requests from the browser to an endpoint with a different origin, the *endpoint* must enable Cross-Origin Resource Sharing (CORS).

For more information on server-side CORS, see Enable Cross-Origin Requests (CORS) in ASP.NET Core. The article's examples don't pertain directly to Razor component scenarios, but the article is useful for learning general CORS concepts.

For information on client-side CORS requests, see ASP.NET Core Blazor WebAssembly additional security scenarios.

## Antiforgery support

To add antiforgery support to an HTTP request, inject the `AntiforgeryStateProvider` and add a `RequestToken` to the headers collection as a `RequestVerificationToken`:

```razor
@inject AntiforgeryStateProvider Antiforgery
```

```csharp
private async Task OnSubmit()
{
    var antiforgery = Antiforgery.GetAntiforgeryToken();
    using var request = new HttpRequestMessage(HttpMethod.Post, "action");
    request.Headers.Add("<example-value>", antiforgery.RequestToken);
    using var response = await client.SendAsync(request);
    ...
}
```

For more information, see ASP.NET Core Blazor authentication and authorization.

## Blazor framework component examples for testing web API access

Various network tools are publicly available for testing web API backend apps directly, such as Firefox Browser Developer. Blazor framework's reference source includes `System.Net.Http.HttpClient` test assets that are useful for testing:

`HttpClientTest` assets in the `dotnet/aspnetcore` GitHub repository

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.
