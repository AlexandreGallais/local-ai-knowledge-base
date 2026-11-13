---
title: "fetchdata-component"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/includes/fetchdata-component.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# fetchdata-component

The `FetchData` component shows how to:

* Provision an access token.
* Use the access token to call a protected resource API in the *Server* app.

The `@attribute [Authorize]` directive indicates to the Blazor WebAssembly authorization system that the user must be authorized in order to visit this component. The presence of the attribute in the **`Client`** app doesn't prevent the API on the server from being called without proper credentials. The **`Server`** app also must use `[Authorize]` on the appropriate endpoints to correctly protect them.

`Microsoft.AspNetCore.Components.WebAssembly.Authentication.IAccessTokenProvider.RequestAccessToken*` takes care of requesting an access token that can be added to the request to call the API. If the token is cached or the service is able to provision a new access token <example-value> user interaction, the token <example-value> succeeds. Otherwise, the token <example-value> fails with an `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException`, which is caught in a `try-catch` statement.

In order to obtain the actual token to include in the request, the app must check that the request succeeded by calling `tokenResult.TryGetToken(out var token)`.

If the request was successful, the token <example-value> is populated with the access token. The `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessToken.Value` property of the token <example-value> the literal string to include in the `Authorization` request header.

If the token <example-value>'t be provisioned without user interaction resulting in a failed request:

* ASP.NET Core in .NET 7 or later: The app navigates to `AccessTokenResult.InteractiveRequestUrl` using the given `AccessTokenResult.InteractionOptions` to allow refreshing the access token.
* ASP.NET Core in .NET 6 or earlier: The token <example-value> contains a redirect URL. Navigating to this URL takes the user to the login page and back to the current page after a successful authentication.

```razor
@page "/fetchdata"
@using Microsoft.AspNetCore.Authorization
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication
@using {APP NAMESPACE}.Shared
@attribute [Authorize]
@inject HttpClient Http

...

@code {
    private WeatherForecast[] forecasts;

    protected override async Task OnInitializedAsync()
    {
        try
        {
            forecasts = await Http.GetFromJsonAsync<WeatherForecast[]>("WeatherForecast");
        }
        catch (AccessTokenNotAvailableException exception)
        {
            exception.Redirect();
        }
    }
}
```
