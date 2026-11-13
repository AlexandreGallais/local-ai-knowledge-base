---
title: "ASP.NET Core Blazor authentication and authorization (part 5 of 7)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor authentication and authorization (part 5 of 7)

## Secure data in Blazor Web Apps with Interactive Auto rendering

When a Blazor Web App adopts server-side rendering (SSR) and client-side rendering (CSR) for components or an entire app that specifies the Interactive Auto render mode, authorization to access components and data is applied in *two places*. The component restricts access to itself (and any data that it obtains) when rendered on the server by virtue of an authorization attribute in the component's definition file (`@attribute [Authorize]`). When the component is rendered on the client, access to data is restricted via the server web API endpoints that are called from the client. Care must be taken when securing data access in both locations to prevent improper data access.

Consider the following scenario where secure weather data is displayed by a component. Demonstrations of some of the following approaches can be evaluated and tested using the `BlazorWebAppEntra`/`BlazorWebAppEntraBff` samples (.NET 9 or later) or the `BlazorWebAppOidc`/`BlazorWebAppOidcBff` samples (.NET 8 or later) in the Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download).

The client project maintains a `WeatherForecast` class to hold weather data:

```csharp
public sealed class WeatherForecast(DateOnly date, int temperatureC, string summary)
{
    public DateOnly Date { get; set; } = date;
    public int TemperatureC { get; set; } = temperatureC;
    public string? Summary { get; set; } = summary;
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
```

The client project's `IWeatherForecaster` interface defines a `GetWeatherForecastAsync` method for obtaining weather data:

```csharp
public interface IWeatherForecaster
{
    Task<IEnumerable<WeatherForecast>> GetWeatherForecastAsync();
}
```

The client project's `ClientWeatherForecaster` service implements `IWeatherForecaster`. The `GetWeatherForecastAsync` method calls a web API in the server project at the `/weather-forecast` endpoint for weather data:

```csharp
internal sealed class ClientWeatherForecaster(HttpClient httpClient)
    : IWeatherForecaster
{
    public async Task<IEnumerable<WeatherForecast>> GetWeatherForecastAsync() =>
        await httpClient.GetFromJsonAsync<WeatherForecast[]>("/weather-forecast") ??
            throw new IOException("No weather forecast!");
}
```

The client project maintains a `Weather` component that:

* Enforces authorization with an `[Authorize]` attribute.
* Uses the Persistent Component State service (`Microsoft.AspNetCore.Components.PersistentComponentState`) to persist weather forecast data when the component transitions from static to interactive SSR on the server. For more information, see ASP.NET Core Blazor prerendered state persistence.

```razor
@page "/weather"
@using Microsoft.AspNetCore.Authorization
@using BlazorWebAppEntra.Client.Weather
@attribute [Authorize]
@inject IWeatherForecaster WeatherForecaster

<PageTitle>Weather</PageTitle>

<h1>Weather</h1>

<p>This component demonstrates showing data.</p>

@if (Forecasts == null)
{
    <p><em>Loading...</em></p>
}
else
{
    <table class="table">
        <thead>
            <tr>
                <th>Date</th>
                <th aria-label="Temperature in Celsius">Temp. (C)</th>
                <th aria-label="Temperature in Fahrenheit">Temp. (F)</th>
                <th>Summary</th>
            </tr>
        </thead>
        <tbody>
            @foreach (var forecast in Forecasts)
            {
                <tr>
                    <td>@forecast.Date.ToShortDateString()</td>
                    <td>@forecast.TemperatureC</td>
                    <td>@forecast.TemperatureF</td>
                    <td>@forecast.Summary</td>
                </tr>
            }
        </tbody>
    </table>
}

@code {
    [PersistentState]
    public IEnumerable<WeatherForecast>? Forecasts { get; set; }

    protected override async Task OnInitializedAsync()
    {
        Forecasts ??= await WeatherForecaster.GetWeatherForecastAsync();
    }
}
```

The server project implements `IWeatherForecaster` as `ServerWeatherForecaster`, which generates and returns weather data via its `GetWeatherForecastAsync` method:

```csharp
internal sealed class ServerWeatherForecaster() : IWeatherForecaster
{
    public readonly string[] summaries =
    [
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot",
        "Sweltering", "Scorching"
    ];

    public async Task<IEnumerable<WeatherForecast>> GetWeatherForecastAsync()
    {
        // Simulate asynchronous loading to demonstrate streaming rendering
        await Task.Delay(500);

        return Enumerable.Range(1, 5).Select(index =>
            new WeatherForecast
            (
                DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                Random.Shared.Next(-20, 55),
                summaries[Random.Shared.Next(summaries.Length)]
            ))
        .ToArray();
    }
}
```

If the app must call an external web API to obtain the weather data, you can inject an HTTP client (`HttpClient`) to request the data:

```csharp
internal sealed class ServerWeatherForecaster(HttpClient httpClient,
    IHttpContextAccessor httpContextAccessor) : IWeatherForecaster
{
    public async Task<IEnumerable<WeatherForecast>> GetWeatherForecastAsync()
    {
        var httpContext = httpContextAccessor.HttpContext ??
            throw new InvalidOperationException("No HttpContext!");
        var accessToken = await httpContext.GetTokenAsync("access_token") ??
            throw new InvalidOperationException("No access_token was saved");
        using var request =
            new HttpRequestMessage(HttpMethod.Get, "/weather-forecast");
        request.Headers.Authorization = new("Bearer", accessToken);
        using var response = await httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadFromJsonAsync<WeatherForecast[]>() ??
            throw new IOException("No weather forecast!");
    }
}
```

In yet another approach, you can inject an HTTP client factory (`IHttpClientFactory`) into the `ServerWeatherForecaster` and call an external web API using a named HTTP Client with a token handler. For more information, see Call a web API from an ASP.NET Core Blazor app.

If the app uses Microsoft identity platform with Microsoft Identity Web packages for Microsoft Entra ID (see Call a web API from an ASP.NET Core Blazor app), the following `ServerWeatherForecaster` demonstrates making an external web API call. The access token is automatically attached to the request.

```csharp
internal sealed class ServerWeatherForecaster(IDownstreamApi downstreamApi) : IWeatherForecaster
{
    public async Task<IEnumerable<WeatherForecast>> GetWeatherForecastAsync()
    {
        using var response = await downstreamApi.CallApiForUserAsync("DownstreamApi",
            options =>
            {
                options.RelativePath = "/weather-forecast";
            });

        return await response.Content.ReadFromJsonAsync<WeatherForecast[]>() ??
            throw new IOException("No weather forecast!");
    }
}
```

Regardless of the approach taken by the `ServerWeatherForecaster` to obtain the data, the server project maintains a secure web API endpoint for client weather data calls. This endpoint results in a `ServerWeatherForecaster.GetWeatherForecastAsync` call on the server:

```csharp
app.MapGet("/weather-forecast", (
    [FromServices] IWeatherForecaster WeatherForecaster) =>
{
    return WeatherForecaster.GetWeatherForecastAsync();
}).RequireAuthorization();
```

Using the preceding approach, there are two systems in place to supply secure weather data to the user:

* When the `Weather` component is rendered *on the server*, the `ServerWeatherForecaster` service's `GetWeatherForecastAsync` method is used directly to obtain the weather data. The security of the data is enforced by the component's `[Authorize]` attribute. In summary, the security of the weather data is enforced by the component.
* When the `Weather` component is rendered *on the client*, the `ClientWeatherForecaster` service is used to make a web API call to the secure `/weather-forecast` endpoint that applies the `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization*` extension method. If the user has the authority to access weather data, the endpoint uses the `ServerWeatherForecaster` service to call `GetWeatherForecastAsync`. The data is returned to the client. In summary, the security of the weather data is enforced by the server app's web API endpoint.

The preceding approach works well when the security requirements of the web API match the security requirements of the component. For example, the same authorization policy can be applied to both the web API endpoint and the component.

Complex scenarios require additional planning and implementation. For example, a server web API that has multiple callers with different access permissions either requires a more sophisticated authorization policy, one or more additional policies, or additional endpoints with different access requirements.

As you build security into apps that adopt Interactive Auto rendering, be mindful that the security implemented for the server's web API endpoints doesn't secure the server's service implementation that's used when a component is rendered on the server and accesses data through the service. Carefully weigh the difference between accessing data on the server during SSR versus accessing the data on a client web API request during CSR. Strategically apply security to avoid improper access to data.

Examples in the Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download) that demonstrate the approach described in this section:

* `BlazorWebAppOidc`
* `BlazorWebAppOidcBff`
* `BlazorWebAppEntra`
* `BlazorWebAppEntraBff`

## `AuthenticationStateProvider` service

`Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` is the underlying service used by the `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` component and cascading authentication services to obtain the authentication state for a user.

You don't typically use `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` directly. Use the `AuthorizeView` component or `Task<AuthenticationState>` approaches described later in this article. The main drawback to using `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` directly is that the component isn't notified automatically if the underlying authentication state data changes.

To implement a custom `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider`, see ASP.NET Core Blazor authentication state, which includes guidance on implementing user authentication state change notifications.

## Obtain a user's claims principal data

The `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` service can provide the current user's `System.Security.Claims.ClaimsPrincipal` data, as shown in the following example.

`ClaimsPrincipalData.razor`:

```razor
@page "/claims-principal-data"
@using System.Security.Claims
@inject AuthenticationStateProvider AuthenticationStateProvider

<h1>ClaimsPrincipal Data</h1>

<button @onclick="GetClaimsPrincipalData">Get ClaimsPrincipal Data</button>

<p>@authMessage</p>

@if (claims.Any())
{
    <ul>
        @foreach (var claim in claims)
        {
            <li>@claim.Type: @claim.Value</li>
        }
    </ul>
}

<p>@surname</p>

@code {
    private string? authMessage;
    private string? surname;
    private IEnumerable<Claim> claims = Enumerable.Empty<Claim>();

    private async Task GetClaimsPrincipalData()
    {
        var authState = await AuthenticationStateProvider
            .GetAuthenticationStateAsync();
        var user = authState.User;

        if (user.Identity is not null && user.Identity.IsAuthenticated)
        {
            authMessage = $"{user.Identity.Name} is authenticated.";
            claims = user.Claims;
            surname = user.FindFirst(c => c.Type == ClaimTypes.Surname)?.Value;
        }
        else
        {
            authMessage = "The user is NOT authenticated.";
        }
    }
}
```

In the preceding example:

* `System.Security.Claims.ClaimsPrincipal.Claims` returns the user's claims (`claims`) for display in the UI.
* The line that obtains the user's surname (`surname`) calls `System.Security.Claims.ClaimsPrincipal.FindAll*` with a predicate to filter the user's claims.

If `user.Identity.IsAuthenticated` is `true` and because the user is a `System.Security.Claims.ClaimsPrincipal`, claims can be enumerated and membership in roles evaluated.

For more information on dependency injection (DI) and services, see ASP.NET Core Blazor dependency injection and Dependency injection in ASP.NET Core. For information on how to implement a custom `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider`, see ASP.NET Core Blazor authentication state.
