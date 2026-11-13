---
title: "Secure an ASP.NET Core Blazor Web App with Windows Authentication"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/blazor-web-app-with-windows-authentication.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Secure an ASP.NET Core Blazor Web App with Windows Authentication

-->
-->

-->

This article describes how to secure a Blazor Web App with Windows Authentication using a sample app. For more information, see Configure Windows Authentication in ASP.NET Core.

The app specification for the Blazor Web App:

* Adopts the Interactive Server render mode with global interactivity.
* Establishes an authorization policy for a Windows security identifier to access a secure page.

## Sample app

Access the sample through the latest version folder in the Blazor samples repository with the following link. The sample is in the `BlazorWebAppWinAuthServer` folder for .NET 9 or later.

View or download sample code (how to download)

## Configuration

The sample app doesn't require configuration to run locally.

When deployed to a host, such as IIS, the app must adopt impersonation to run under the user's account. For more information, see Configure Windows Authentication in ASP.NET Core.

## Sample app code

Inspect the `Program` file in the sample app for the following API calls.

`Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication*` is called using the `Microsoft.AspNetCore.Authentication.Negotiate.NegotiateDefaults.AuthenticationScheme*` authentication scheme. `Microsoft.Extensions.DependencyInjection.NegotiateExtensions.AddNegotiate*` configures the `Microsoft.AspNetCore.Authentication.AuthenticationBuilder` to use Negotiate (also known as Windows, Kerberos, or NTLM) authentication, and the authentication handler supports Kerberos on Windows and Linux servers:

```csharp
builder.Services.AddAuthentication(NegotiateDefaults.AuthenticationScheme)
    .AddNegotiate();
```

`Microsoft.Extensions.DependencyInjection.PolicyServiceCollectionExtensions.AddAuthorization*` adds authorization policy services. The following code assigns the `Microsoft.AspNetCore.Authorization.AuthorizationOptions.DefaultPolicy`, which requires an authenticated user, to the `Microsoft.AspNetCore.Authorization.AuthorizationOptions.FallbackPolicy`. This configuration requires authentication when no policy is produced from authorization metadata:

```csharp
builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = options.DefaultPolicy;
});
```

For complete policy selection rules, see Policy-based authorization in ASP.NET Core.

`Microsoft.Extensions.DependencyInjection.CascadingAuthenticationStateServiceCollectionExtensions.AddCascadingAuthenticationState*` adds cascading authentication state to the service collection. This is equivalent to placing a `CascadingAuthenticationState` component at the root of the app's component hierarchy:

```csharp
builder.Services.AddCascadingAuthenticationState();
```

An authorization policy is added for a Windows security identifier (SID). The `S-1-5-113` well-known SID in the following example indicates that the user is a local account, which restricts network sign-in to local accounts instead of "administrator" or equivalent accounts:

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("LocalAccount", policy =>
        policy.RequireClaim(
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid",
            "S-1-5-113"));   
```

The authorization policy is enforced by the `LocalAccount` component.

`Components/Pages/LocalAccount.razor`:

```razor
@page "/local-account"
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize("LocalAccount")]

<h1>Local Account Only</h1>

<p>
    You can only reach this page by satisfying the
    <code>LocalAccount</code> authorization policy.
</p>
```

The `UserClaims` component lists the user's claims and roles, including the user's Windows security identifiers (SIDs) with SID translations.

`Components/Pages/UserClaims.razor`:

```razor
@page "/user-claims"
@using System.Security.Claims
@using System.Security.Principal
@using Microsoft.AspNetCore.Components.QuickGrid

<PageTitle>User Claims & Roles</PageTitle>

<h1>User Claims & Roles</h1>

<QuickGrid Items="claims" Pagination="pagination">
    <Paginator State="pagination" />
    <PropertyColumn Property="@(p => p.Type)" Sortable="true" />
    <PropertyColumn Property="@(p => p.Value)" Sortable="true" />
    <PropertyColumn Property="@(p => GetClaimAsHumanReadable(p))" Sortable="true" Title="Translation" />
    <PropertyColumn Property="@(p => p.Issuer)" Sortable="true" />
</QuickGrid>

<h1>User Roles</h1>

@if (roles.Any())
{
    <ul>
        @foreach (var role in roles)
        {
            <li>@role</li>
        }
    </ul>
}
else
{
    <p>No roles available.</p>
}

@code {
    private IQueryable<Claim> claims = Enumerable.Empty<Claim>().AsQueryable();
    private IEnumerable<string> roles = Enumerable.Empty<string>();
    PaginationState pagination = new PaginationState { ItemsPerPage = 10 };

    [CascadingParameter]
    private Task<AuthenticationState>? AuthState { get; set; }

    protected override async Task OnInitializedAsync()
    {
        if (AuthState == null)
        {
            return;
        }

        var authState = await AuthState;

        claims = authState.User.Claims.AsQueryable();

        roles = authState.User.Claims
            .Where(claim => claim.Type == ClaimTypes.Role)
            .Select(claim => claim.Value);
    }

    private string GetClaimAsHumanReadable(Claim claim)
    {
        if (!OperatingSystem.IsWindows() ||
            claim.Type is not (ClaimTypes.PrimarySid or ClaimTypes.PrimaryGroupSid
                or ClaimTypes.GroupSid))
        {
            // We're either not on Windows or not dealing with a SID Claim that
            // can be translated
            return string.Empty;
        }

        SecurityIdentifier sid = new SecurityIdentifier(claim.Value);

        try
        {
            // Throw an exception if the SID can't be translated
            var account = sid.Translate(typeof(NTAccount));

            return account.ToString();
        }
        catch (IdentityNotMappedException)
        {
            return "Could not be mapped";
        }
    }
}
```

## Related content

* Configure Windows Authentication in ASP.NET Core
* Security identifiers (Windows Server documentation)
