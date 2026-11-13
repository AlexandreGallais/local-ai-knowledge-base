---
title: "ASP.NET Core Blazor WebAssembly additional security scenarios (part 5 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/additional-scenarios.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor WebAssembly additional security scenarios (part 5 of 6)

## Customize the user

Users bound to the app can be customized.

### Customize the user with a payload claim

In the following example, the app'<example-value>'s authentication methods. The `amr` claim identifies how the subject of the token was authenticated in Microsoft identity platform v1.0 payload claims. The example uses a custom user account class based on `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount`.

Create a class that extends the `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount` class. The following example sets the `AuthenticationMethod` property to the user's array of `amr` JSON property values. `AuthenticationMethod` is populated automatically by the framework when the user is authenticated.

```csharp
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;

public class CustomUserAccount : RemoteUserAccount
{
    [JsonPropertyName("amr")]
    public string[]? AuthenticationMethod { get; set; }
}
```

Create a factory that extends `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccountClaimsPrincipalFactory`1` to create claims from the user's authentication methods stored in `CustomUserAccount.AuthenticationMethod`:

```csharp
using System.Security.Claims;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication.Internal;

public class CustomAccountFactory(NavigationManager navigation,
    IAccessTokenProviderAccessor accessor)
    : AccountClaimsPrincipalFactory<CustomUserAccount>(accessor)
{
    public override async ValueTask<ClaimsPrincipal> CreateUserAsync(
        CustomUserAccount account, RemoteAuthenticationUserOptions options)
    {
        var initialUser = await base.CreateUserAsync(account, options);

        if (initialUser.Identity != null && initialUser.Identity.IsAuthenticated)
        {
            var userIdentity = (ClaimsIdentity)initialUser.Identity;

            if (account.AuthenticationMethod is not null)
            {
                foreach (var value in account.AuthenticationMethod)
                {
                    userIdentity.AddClaim(new Claim("amr", value));
                }
            }
        }

        return initialUser;
    }
}
```

Register the `CustomAccountFactory` for the authentication provider in use. Any of the following registrations are valid:

* `Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddOidcAuthentication*`:

  ```csharp
  using Microsoft.AspNetCore.Components.WebAssembly.Authentication;

  ...

  builder.Services.AddOidcAuthentication<RemoteAuthenticationState, 
      CustomUserAccount>(options =>
      {
          ...
      })
      .AddAccountClaimsPrincipalFactory<RemoteAuthenticationState, 
          CustomUserAccount, CustomAccountFactory>();
  ```

* `Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication*`:

  ```csharp
  using Microsoft.AspNetCore.Components.WebAssembly.Authentication;

  ...

  builder.Services.AddMsalAuthentication<RemoteAuthenticationState, 
      CustomUserAccount>(options =>
      {
          ...
      })
      .AddAccountClaimsPrincipalFactory<RemoteAuthenticationState, 
          CustomUserAccount, CustomAccountFactory>();
  ```

* `Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddApiAuthorization*`:

  ```csharp
  using Microsoft.AspNetCore.Components.WebAssembly.Authentication;

  ...

  builder.Services.AddApiAuthorization<RemoteAuthenticationState, 
      CustomUserAccount>(options =>
      {
          ...
      })
      .AddAccountClaimsPrincipalFactory<RemoteAuthenticationState, 
          CustomUserAccount, CustomAccountFactory>();
  ```

### ME-ID security groups and roles with a custom user account class

For an additional example that works with ME-ID security groups and ME-ID Administrator Roles and a custom user account class, see ASP.NET Core Blazor WebAssembly with Microsoft Entra ID groups and roles.

### Authenticate users to only call protected third party APIs

Authenticate the user with a client-side OAuth flow against the third-party API provider:

 ```csharp
 builder.services.AddOidcAuthentication(options => { ... });
 ```

 In this scenario:

* The server hosting the app doesn't play a role.
* APIs on the server can't be protected.
* The app can only call protected third-party APIs.

### Authenticate users with a third-party provider and call protected APIs on the host server and the third party

Configure Identity with a third-party login provider. Obtain the tokens required for third-party API access and store them.

When a user logs in, Identity collects access and refresh tokens as part of the authentication process. At that point, there are a couple of approaches available for making API calls to third-party APIs.

#### Use a server access token to retrieve the third-party access token

Use the access token <example-value> on the server to retrieve the third-party access token from a server API endpoint. From there, use the third-party access token to call third-party API resources directly from Identity on the client.

***We don'<example-value>'t have a client secret <example-value> it can't be trusted to store secrets safely, and the access token is produced for a confidential client. A confidential client is a client that has a client secret and is assumed to be able to safely store secrets.

* The third-party access token might be granted additional scopes to perform sensitive operations based on the fact that the third-party emitted the token for a more trusted client.
* Similarly, refresh tokens shouldn'<example-value>'t trusted, as doing so gives the client unlimited access unless other restrictions are put into place.

#### Make API calls from the client to the server API in order to call third-party APIs

Make an API call from the client to the server API. From the server, retrieve the access token for the third-party API resource and issue whatever call is necessary.

***We recommend this approach.*** While this approach requires an extra network hop through the server to call a third-party API, it ultimately results in a safer experience:

* The server can store refresh tokens and ensure that the app doesn't lose access to third-party resources.
* The app can't leak access tokens from the server that might contain more sensitive permissions.

## Use OpenID Connect (OIDC) v2.0 endpoints

The authentication library and Blazor project templates use OpenID Connect (OIDC) v1.0 endpoints. To use a v2.0 endpoint, configure the JWT bearer `Microsoft.AspNetCore.Builder.JwtBearerOptions.Authority` option. In the following example, ME-ID is configured for v2.0 by appending a `v2.0` segment to the `Microsoft.AspNetCore.Builder.JwtBearerOptions.Authority` property:

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;

...

builder.Services.Configure<JwtBearerOptions>(
    JwtBearerDefaults.AuthenticationScheme, 
    options =>
    {
        options.Authority += "/v2.0";
    });
```

Alternatively, the setting can be made in the app settings (`appsettings.json`) file:

```json
{
  "Local": {
    "Authority": "https://login.microsoftonline.com/common/oauth2/v2.0",
    ...
  }
}
```

If tacking on a segment to the authority isn't appropriate for the app's OIDC provider, such as with non-ME-ID providers, set the `Microsoft.AspNetCore.Builder.OpenIdConnectOptions.Authority` property directly. Either set the property in `Microsoft.AspNetCore.Builder.JwtBearerOptions` or in the app settings file (`appsettings.json`) with the `Authority` key.

The list of claims in the ID token <example-value> for v2.0 endpoints. Microsoft documentation on the changes has been retired, but guidance on the claims in an ID token is available in the ID token <example-value> reference.

## Configure and use gRPC in components

To configure a Blazor WebAssembly app to use the ASP.NET Core gRPC framework:

* Enable gRPC-Web on the server. For more information, see gRPC-Web in ASP.NET Core gRPC apps.
* Register gRPC services for the app's message handler. The following example configures the app's authorization message handler to use the `GreeterClient` service from the gRPC tutorial (the `Program` file).

> **Note:**
> Prerendering is enabled by default in Blazor Web Apps, so you must account for the component rendering first from the server and then from the client. Any prerendered state should flow to the client so that it can be reused. For more information, see ASP.NET Core Blazor prerendered state persistence.

```csharp
using System.Net.Http;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Grpc.Net.Client;
using Grpc.Net.Client.Web;

...

builder.Services.AddScoped(sp =>
{
    var baseAddressMessageHandler = 
        sp.GetRequiredService<BaseAddressAuthorizationMessageHandler>();
    baseAddressMessageHandler.InnerHandler = new HttpClientHandler();
    var grpcWebHandler = 
        new GrpcWebHandler(GrpcWebMode.GrpcWeb, baseAddressMessageHandler);
    var channel = GrpcChannel.ForAddress(builder.HostEnvironment.BaseAddress, 
        new GrpcChannelOptions { HttpHandler = grpcWebHandler });

    return new Greeter.GreeterClient(channel);
});
```

A component in the client app can make gRPC calls using the gRPC client (`Grpc.razor`):

```razor
@page "/grpc"
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize]
@inject Greeter.GreeterClient GreeterClient

<h1>Invoke gRPC service</h1>

<p>
    <input @bind="name" placeholder="Type your name" />
    <button @onclick="GetGreeting" class="btn btn-primary">Call gRPC service</button>
</p>

Server response: <strong>@serverResponse</strong>

@code {
    private string name = "Bert";
    private string? serverResponse;

    private async Task GetGreeting()
    {
        try
        {
            var request = new HelloRequest { Name = name };
            var reply = await GreeterClient.SayHelloAsync(request);
            serverResponse = reply.Message;
        }
        catch (Grpc.Core.RpcException ex)
            when (ex.Status.DebugException is 
                AccessTokenNotAvailableException tokenEx)
        {
            tokenEx.Redirect();
        }
    }
}
```

To use the `Status.DebugException` property, use `Grpc.Net.Client` version 2.30.0 or later.

For more information, see gRPC-Web in ASP.NET Core gRPC apps.
