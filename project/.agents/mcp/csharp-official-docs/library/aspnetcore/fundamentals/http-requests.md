---
title: "HTTP requests with IHttpClientFactory - ASP.NET Core (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/http-requests.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Make HTTP requests with IHttpClientFactory in ASP.NET Core

By Kirk Larkin, Steve Gordon, Glenn Condron, and Ryan Nowak.

You can register the `System.Net.Http.IHttpClientFactory` and use it to configure and create `System.Net.Http.HttpClient` instances in an app. The `IHttpClientFactory` interface offers the following benefits:

* Provides a central location for naming and configuring logical `HttpClient` instances. For example, a client named *github* can be registered and configured to access GitHub. A default client can be registered for general access.

* Codifies the concept of outgoing middleware via delegating handlers in the `HttpClient` instance. Provides extensions for Polly-based middleware to take advantage of delegating handlers in `HttpClient`.

* Manages the pooling and lifetime of underlying `HttpClientMessageHandler` instances. Automatic management avoids common DNS (Domain Name System) problems that occur when manually managing `HttpClient` lifetimes.

* Adds a configurable logging experience (via the `ILogger`) for all requests sent through clients created by the factory.

This article describes how to make HTTP requests by using `IHttpClientFactory` in ASP.NET Core applications. The sample code version uses `System.Text.Json` to deserialize JSON content returned in HTTP responses. For samples that use `Json.NET` and `ReadAsAsync<T>`, use the browser **Version** selector to select a 2.x version of this article.

## Review consumption patterns

There are several ways `IHttpClientFactory` can be used in an app:

* Basic usage
* Named clients
* Typed clients
* Generated clients

The best approach depends upon the app's requirements.

### Basic usage

Register `IHttpClientFactory` by calling the `AddHttpClient` method in the _Program.cs_ file:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddHttpClient();
```
An `IHttpClientFactory` can be requested by using dependency injection (DI). The following code uses `IHttpClientFactory` to create an `HttpClient` instance:

```csharp
public class BasicModel : PageModel
{
    private readonly IHttpClientFactory _httpClientFactory;

    public BasicModel(IHttpClientFactory httpClientFactory) =>
        _httpClientFactory = httpClientFactory;

    public IEnumerable<GitHubBranch>? GitHubBranches { get; set; }

    public async Task OnGet()
    {
        var httpRequestMessage = new HttpRequestMessage(
            HttpMethod.Get,
            "https://api.github.com/repos/dotnet/AspNetCore.Docs/branches")
        {
            Headers =
            {
                { HeaderNames.Accept, "application/vnd.github.v3+json" },
                { HeaderNames.UserAgent, "HttpRequestsSample" }
            }
        };

        var httpClient = _httpClientFactory.CreateClient();
        var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);

        if (httpResponseMessage.IsSuccessStatusCode)
        {
            using var contentStream =
                await httpResponseMessage.Content.ReadAsStreamAsync();
            
            GitHubBranches = await JsonSerializer.DeserializeAsync
                <IEnumerable<GitHubBranch>>(contentStream);
        }
    }
}
```
In the example, the call to `IHttpClientFactory` is a good way to refactor an existing app. This approach has no effect on how `HttpClient` is used.

In scenarios where `HttpClient` instances are created in an existing app, replace the occurrences with calls to the `System.Net.Http.IHttpClientFactory.CreateClient*`.

### Named clients

Named clients are suitable for the following scenarios:

* The app requires many distinct uses of `HttpClient`.
* There are many `HttpClient` instances with different configurations.

Specify the configuration for a named `HttpClient` instance during its registration in the _Program.cs_ file:

```csharp
builder.Services.AddHttpClient("GitHub", httpClient =>
{
    httpClient.BaseAddress = new Uri("https://api.github.com/");

    // using Microsoft.Net.Http.Headers;
    // The GitHub API requires two headers.
    httpClient.DefaultRequestHeaders.Add(
        HeaderNames.Accept, "application/vnd.github.v3+json");
    httpClient.DefaultRequestHeaders.Add(
        HeaderNames.UserAgent, "HttpRequestsSample");
});
```
In the code snippet, the client is configured with:

* The base address `https://api.github.com/`.
* Two headers required to work with the GitHub API.

#### CreateClient method

For each call to the `System.Net.Http.IHttpClientFactory.CreateClient*`:

* A new instance of `HttpClient` is created.
* The configuration action is called.

To create a named client, pass the client name into the `CreateClient` method:

```csharp
public class NamedClientModel : PageModel
{
    private readonly IHttpClientFactory _httpClientFactory;

    public NamedClientModel(IHttpClientFactory httpClientFactory) =>
        _httpClientFactory = httpClientFactory;

    public IEnumerable<GitHubBranch>? GitHubBranches { get; set; }

    public async Task OnGet()
    {
        var httpClient = _httpClientFactory.CreateClient("GitHub");
        var httpResponseMessage = await httpClient.GetAsync(
            "repos/dotnet/AspNetCore.Docs/branches");

        if (httpResponseMessage.IsSuccessStatusCode)
        {
            using var contentStream =
                await httpResponseMessage.Content.ReadAsStreamAsync();
            
            GitHubBranches = await JsonSerializer.DeserializeAsync
                <IEnumerable<GitHubBranch>>(contentStream);
        }
    }
}
```
In the code snippet, the request doesn't need to specify a hostname. The code can pass the path only because the base address configured for the client is used.

### Typed clients

Typed clients provide several benefits:

* Access to the same capabilities as named clients without the need to use strings as keys.
* IntelliSense and compiler help when consuming clients.
* The ability to define a single location to configure and interact with a particular `HttpClient` instance. For example, a single typed client might be used for a single backend endpoint, or to encapsulate all logic dealing with the endpoint.
* Support for DI and injection where the app requires the functionality.

A typed client accepts an `HttpClient` parameter in its constructor:

```csharp
public class GitHubService
{
    private readonly HttpClient _httpClient;

    public GitHubService(HttpClient httpClient)
    {
        _httpClient = httpClient;

        _httpClient.BaseAddress = new Uri("https://api.github.com/");

        // using Microsoft.Net.Http.Headers;
        // The GitHub API requires two headers.
        _httpClient.DefaultRequestHeaders.Add(
            HeaderNames.Accept, "application/vnd.github.v3+json");
        _httpClient.DefaultRequestHeaders.Add(
            HeaderNames.UserAgent, "HttpRequestsSample");
    }

    public async Task<IEnumerable<GitHubBranch>?> GetAspNetCoreDocsBranchesAsync() =>
        await _httpClient.GetFromJsonAsync<IEnumerable<GitHubBranch>>(
            "repos/dotnet/AspNetCore.Docs/branches");
}
```
In the code snippet:

* The configuration is moved into the typed client.
* The provided `HttpClient` instance is stored as a private field.

API-specific methods can be created that expose `HttpClient` functionality. For example, the `GetAspNetCoreDocsBranches` method encapsulates code to retrieve docs GitHub branches.

The following code calls `Microsoft.Extensions.DependencyInjection.HttpClientFactoryServiceCollectionExtensions.AddHttpClient*` in the _Program.cs_ file to register the `GitHubService` typed client class:

```csharp
builder.Services.AddHttpClient<GitHubService>();
```
The typed client is registered as transient with DI. In the snippet, the `AddHttpClient` method registers `GitHubService` as a transient service. This registration uses a factory method to:

- Create an instance of `HttpClient`.
- Create an instance of `GitHubService` and passing in the instance of `HttpClient` to its constructor.

The typed client can be injected and consumed directly:

```csharp
public class TypedClientModel : PageModel
{
    private readonly GitHubService _gitHubService;

    public TypedClientModel(GitHubService gitHubService) =>
        _gitHubService = gitHubService;

    public IEnumerable<GitHubBranch>? GitHubBranches { get; set; }

    public async Task OnGet()
    {
        try
        {
            GitHubBranches = await _gitHubService.GetAspNetCoreDocsBranchesAsync();
        }
        catch (HttpRequestException)
        {
            // ...
        }
    }
}
```
The configuration for a typed client can also be specified during its registration in the _Program.cs_ file, rather than in the typed client's constructor:

```csharp
builder.Services.AddHttpClient<GitHubService>(httpClient =>
{
    httpClient.BaseAddress = new Uri("https://api.github.com/");

    // ...
});
```
### Generated clients

The `IHttpClientFactory` interface can be used in combination with third-party libraries such as Refit. Refit is a REST library for .NET that converts C# interfaces into HTTP clients using source generation at compile time. Call the `AddRefitClient` method to register the interface as a typed `HttpClient` for making external HTTP calls.

A custom interface represents the external API:

```csharp
public interface IGitHubClient
{
    [Get("/repos/dotnet/AspNetCore.Docs/branches")]
    Task<IEnumerable<GitHubBranch>> GetAspNetCoreDocsBranchesAsync();
}
```
Call `AddRefitClient` to generate the dynamic implementation, and then call the `ConfigureHttpClient` method to configure the underlying `HttpClient` instance:

```csharp
builder.Services.AddRefitClient<IGitHubClient>()
    .ConfigureHttpClient(httpClient =>
    {
        httpClient.BaseAddress = new Uri("https://api.github.com/");

        // using Microsoft.Net.Http.Headers;
        // The GitHub API requires two headers.
        httpClient.DefaultRequestHeaders.Add(
            HeaderNames.Accept, "application/vnd.github.v3+json");
        httpClient.DefaultRequestHeaders.Add(
            HeaderNames.UserAgent, "HttpRequestsSample");
    });
```
Use DI to access the dynamic implementation of `IGitHubClient`:

```csharp
public class RefitModel : PageModel
{
    private readonly IGitHubClient _gitHubClient;

    public RefitModel(IGitHubClient gitHubClient) =>
        _gitHubClient = gitHubClient;

    public IEnumerable<GitHubBranch>? GitHubBranches { get; set; }

    public async Task OnGet()
    {
        try
        {
            GitHubBranches = await _gitHubClient.GetAspNetCoreDocsBranchesAsync();
        }
        catch (ApiException)
        {
            // ...
        }
    }
}
```
## Make POST, PUT, and DELETE requests

In the preceding examples, all HTTP requests use the GET HTTP verb. `HttpClient` also supports other HTTP verbs, including:

* POST
* PUT
* DELETE
* PATCH

For a complete list of supported HTTP verbs, see the `System.Net.Http.HttpMethod`.

The following example shows how to make an HTTP POST request:

```csharp
public async Task CreateItemAsync(TodoItem todoItem)
{
    var todoItemJson = new StringContent(
        JsonSerializer.Serialize(todoItem),
        Encoding.UTF8,
        Application.Json); // using static System.Net.Mime.MediaTypeNames;

    using var httpResponseMessage =
        await _httpClient.PostAsync("/api/TodoItems", todoItemJson);

    httpResponseMessage.EnsureSuccessStatusCode();
}
```
In the preceding code, the `CreateItemAsync` method:

* Serializes the `TodoItem` parameter to JSON by using `System.Text.Json`.
* Creates an instance of `System.Net.Http.StringContent` to package the serialized JSON for sending in the HTTP request body.
* Calls the `System.Net.Http.HttpClient.PostAsync*` to send the JSON content to the specified URL. The value is a relative URL that is added to the HttpClient.BaseAddress.
* Calls the `System.Net.Http.HttpResponseMessage.EnsureSuccessStatusCode*` to throw an exception if the response status code doesn't indicate success.

`HttpClient` also supports other types of content. For example, `System.Net.Http.MultipartContent` and `System.Net.Http.StreamContent`. For a complete list of supported content, see `System.Net.Http.HttpContent`.

The following example shows an HTTP PUT request:

```csharp
public async Task SaveItemAsync(TodoItem todoItem)
{
    var todoItemJson = new StringContent(
        JsonSerializer.Serialize(todoItem),
        Encoding.UTF8,
        Application.Json);

    using var httpResponseMessage =
        await _httpClient.PutAsync($"/api/TodoItems/{todoItem.Id}", todoItemJson);

    httpResponseMessage.EnsureSuccessStatusCode();
}
```
The code snippet is similar to the POST example. The `SaveItemAsync` method calls the `System.Net.Http.HttpClient.PutAsync*` instead of `PostAsync`.

The following example shows an HTTP DELETE request:

```csharp
public async Task DeleteItemAsync(long itemId)
{
    using var httpResponseMessage =
        await _httpClient.DeleteAsync($"/api/TodoItems/{itemId}");

    httpResponseMessage.EnsureSuccessStatusCode();
}
```
In the code snippet, the `DeleteItemAsync` method calls `System.Net.Http.HttpClient.DeleteAsync*`. Because HTTP DELETE requests typically contain no body, the `DeleteAsync` method doesn't provide an overload that accepts an instance of `HttpContent`.

To learn more about using different HTTP verbs with `HttpClient`, see `System.Net.Http.HttpClient`.
