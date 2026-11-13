---
title: "Call a web API from an ASP.NET Core Blazor app (part 6 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/call-web-api.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Call a web API from an ASP.NET Core Blazor app (part 6 of 6)

## Sample apps

For working examples, see the following sample apps in the Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download).

### `BlazorWebAppCallWebApi`

Call an external (not in the Blazor Web App) todo list web API from a Blazor Web App:

* `Backend`: A web API app for maintaining a todo list, based on Minimal APIs. The web API app is a separate app from the Blazor Web App, possibly hosted on a different server.
* `BlazorApp`/`BlazorApp.Client`: A Blazor Web App that calls the web API app with an `System.Net.Http.HttpClient` for todo list operations, such as creating, reading, updating, and deleting (CRUD) items from the todo list.

For client-side rendering (CSR), which includes Interactive WebAssembly components and Auto components that have adopted CSR, calls are made with a preconfigured `System.Net.Http.HttpClient` registered in the `Program` file of the client project (`BlazorApp.Client`):

```csharp
builder.Services.AddScoped(sp =>
    new HttpClient
    {
        BaseAddress = new Uri(builder.Configuration["FrontendUrl"] ?? 
            "https://localhost:5002")
    });
```

For server-side rendering (SSR), which includes prerendered and interactive Server components, prerendered WebAssembly components, and Auto components that are prerendered or have adopted SSR, calls are made with an `System.Net.Http.HttpClient` registered in the `Program` file of the server project (`BlazorApp`):

```csharp
builder.Services.AddHttpClient();
```

Call an internal (inside the Blazor Web App) movie list API, where the API resides in the server project of the Blazor Web App:

* `BlazorApp`: A Blazor Web App that maintains a movie list:
  * When operations are performed on the movie list within the app on the server, ordinary API calls are used.
  * When API calls are made by a web-based client, a web API is used for movie list operations, based on Minimal APIs.
* `BlazorApp.Client`: The client project of the Blazor Web App, which contains Interactive WebAssembly and Auto components for user management of the movie list.

For CSR, which includes Interactive WebAssembly components and Auto components that have adopted CSR, calls to the API are made via a client-based service (`ClientMovieService`) that uses a preconfigured `System.Net.Http.HttpClient` registered in the `Program` file of the client project (`BlazorApp.Client`). Because these calls are made over a public or private web, the movie list API is a *web API*.

The following example obtains a list of movies from the `/movies` endpoint:

```csharp
public class ClientMovieService(HttpClient http) : IMovieService
{
    public async Task<Movie[]> GetMoviesAsync(bool watchedMovies) => 
        await http.GetFromJsonAsync<Movie[]>("movies") ?? [];
}
```

For SSR, which includes prerendered and interactive Server components, prerendered WebAssembly components, and Auto components that are prerendered or have adopted SSR, calls are made directly via a server-based service (`ServerMovieService`). The API doesn't rely on a network, so it's a standard API for movie list CRUD operations.

The following example obtains a list of movies:

```csharp
public class ServerMovieService(MovieContext db) : IMovieService
{
    public async Task<Movie[]> GetMoviesAsync(bool watchedMovies) => 
        watchedMovies ? 
        await db.Movies.Where(t => t.IsWatched).ToArrayAsync() : 
        await db.Movies.ToArrayAsync();
}
```

For more information on how to secure movie data in this scenario, see the weather data example described by Secure data in Blazor Web Apps with Interactive Auto rendering.

### `BlazorWebAppCallWebApi_Weather`

A weather data sample app that uses streaming rendering for weather data.

### `BlazorWebAssemblyCallWebApi`

Calls a todo list web API from a Blazor WebAssembly app:

* `Backend`: A web API app for maintaining a todo list, based on Minimal APIs.
* `BlazorTodo`: A Blazor WebAssembly app that calls the web API with a preconfigured `System.Net.Http.HttpClient` for todo list CRUD operations.

### `BlazorWebAssemblyStandaloneWithIdentity`

A standalone Blazor WebAssembly app secured with ASP.NET Core Identity:

* `Backend`: A backend web API app that maintains a user identity store for ASP.NET Core Identity.
* `BlazorWasmAuth`: A standalone Blazor WebAssembly frontend app with user authentication.

The solution demonstrates calling a secure web API for the following:

* Obtaining an authenticated user's roles.
* Data processing for all authenticated users.
* Data processing for authorized users (the user must be in the `Manager` role) via an authorization policy.

### `BlazorWebAppOidcBffAuto`

A Blazor Web App with global Interactive Auto rendering that uses OIDC authentication with Microsoft Entra without using Entra-specific packages. The sample demonstrates how to use a token <example-value> for web API calls to call an external secure web API.

### `BlazorWebAppOidcBffServer`

A Blazor Web App with global Interactive Server rendering that uses OIDC authentication with Microsoft Entra without using Entra-specific packages. The sample demonstrates how to pass an access token to call an external secure web API.

### `BlazorWebAppOidcBffYarpAspire`

A Blazor Web App with global Interactive Auto rendering that uses:

* OIDC authentication (Microsoft Entra without using Entra-specific packages)
* YARP
* Aspire

The solution includes a demonstration of obtaining weather data securely via an external web API when a component that adopts Interactive Auto rendering is rendered on the client.

### `BlazorWebAppEntraBff`

A Blazor Web App with global Auto interactivity that uses Microsoft identity platform with Microsoft Identity Web packages for Microsoft Entra ID. The solution includes a demonstration of obtaining weather data securely via an external web API when a component that adopts Interactive Auto rendering is rendered on the client.

### `BlazorWebAppEntraBffYarpAspire`

A Blazor Web App with global Auto interactivity that uses:

* Microsoft identity platform with Microsoft Identity Web packages for Microsoft Entra ID.
* YARP.
* Aspire.

The solution includes a demonstration of obtaining weather data securely via an external web API when a component that adopts Interactive Auto rendering is rendered on the client.

## Related content

### General

* Cross-Origin Resource Sharing (CORS) at W3C
* Enable Cross-Origin Requests (CORS) in ASP.NET Core: Although the content applies to ASP.NET Core apps, not Razor components, the article covers general CORS concepts.
* Secure data in Blazor Web Apps with Interactive Auto rendering

### Mitigation of overposting attacks

Web APIs can be vulnerable to an *overposting* attack, also known as a *mass assignment* attack. An overposting attack occurs when a malicious user issues an HTML form POST to the server that processes data for properties that aren't part of the rendered form and that the developer doesn't wish to allow users to modify. The term "overposting" literally means that the malicious user has *over*-POSTed with the form.

For guidance on mitigating overposting attacks, see Tutorial: Create a controller-based web API with ASP.NET Core.

### Server-side

* ASP.NET Core Blazor additional server-side security scenarios: Includes coverage on using `System.Net.Http.HttpClient` to make secure web API requests.
* HTTP requests with IHttpClientFactory - ASP.NET Core
* Enforce HTTPS in ASP.NET Core
* Kestrel HTTPS endpoint configuration

### Client-side

* ASP.NET Core Blazor WebAssembly additional security scenarios: Includes coverage on using `System.Net.Http.HttpClient` to make secure web API requests.
* Use Graph API with ASP.NET Core Blazor WebAssembly
* Fetch API
