---
title: "Claim-based authorization in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authorization/claims.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Claim-based authorization in ASP.NET Core

When an identity is created for an app user upon signing into an app, the identity provider may assign one or more claims to the user's identity. A claim is a name value pair that represents what the subject (a user, an app or service, or a device/computer) is, not what the subject can do. A claim can be evaluated by the app to determine access rights to data and other secured resources during the process of authorization and can also be used to make or express authentication decisions about a subject. An identity can contain multiple claims with multiple values and can contain multiple claims of the same type. This article explains how to add claims checks for authorization in an ASP.NET Core app.

This article uses Razor component examples and focuses on Blazor authorization scenarios. For additional Blazor guidance, see the Related content section. For Razor Pages and MVC guidance, see the following resources:

* Claim-based authorization in ASP.NET Core Razor Pages
* Claim-based authorization in ASP.NET Core MVC

## Sample app

The Blazor Web App sample for this article is the `BlazorWebAppAuthorization` sample app (`dotnet/AspNetCore.Docs.Samples` GitHub repository) (how to download). The sample app uses seeded accounts with preconfigured claims to demonstrate most of the examples in this article. For more information, see the sample's README file (`README.md`).

> **Caution:**
> This sample app uses an in-memory database to store user information, which isn't suitable for production scenarios. The sample app is intended for demonstration purposes only and shouldn't be used as a starting point for production apps.

## Add claim checks

Claim-based authorization checks:

* Are declarative and specify claims via policies that the current user must present to access the requested resource.
* Are applied to Razor components (examples in this article), Razor Pages, or MVC controllers or actions within a controller.

The `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` component (`AuthorizeView` component in Blazor documentation) supports *policy-based* authorization, where the policy requires one or more claims. Alternatively, a claims-based authorization via one or more policy checks can be set up using `[Authorize]` attributes in Razor components. The developer must build and register a policy expressing the claims requirements. This section covers basic concepts. For complete coverage, see ASP.NET Core Blazor authentication and authorization.

The simplest type of claim policy looks for the presence of a claim and doesn't check the value.

Registering the policy takes place as part of the Authorization service configuration in the app's `Program` file:

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("EmployeeOnly", policy => policy.RequireClaim("EmployeeNumber"));
```

> **Note:**
> `WebApplicationBuilder.ConfigureApplication` (reference source) automatically adds a call for `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*` when `Microsoft.AspNetCore.Authorization.IAuthorizationHandlerProvider` is registered, which has been the behavior for ASP.NET Core since the release of .NET 8. Therefore, calling `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*` explicitly for server-side Blazor apps in .NET 8 or later is technically redundant, but the call isn't harmful. Calling it in developer code after it has already been called by the framework merely no-ops.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

Blazor WebAssembly apps call `Microsoft.Extensions.DependencyInjection.AuthorizationServiceCollectionExtensions.AddAuthorizationCore*` in the `Program` file to add authorization services:

```csharp
builder.Services.AddAuthorizationCore();
```

Apply the policy using the `Policy` property on the `[Authorize]` attribute to specify the policy name. In the following example, the `EmployeeOnly` policy checks for the presence of an `EmployeeNumber` claim on the current identity:

For policy-based authorization using an `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` component, use the `Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Policy` parameter with a single policy name.

`Pages/PassEmployeeOnlyPolicyWithAuthorizeView.razor`:

```razor
@page "/pass-employeeonly-policy-with-authorizeview"

<h1>Pass 'EmployeeOnly' policy with AuthorizeView</h1>

<AuthorizeView Policy="EmployeeOnly">
    <Authorized>
        <p>You satisfy the 'EmployeeOnly' policy.</p>
    </Authorized>
    <NotAuthorized>
        <p>You <b>don't</b> satisfy the 'EmployeeOnly' policy.</p>
    </NotAuthorized>
</AuthorizeView>
```

Alternatively, apply the policy using the `Policy` property on the `[Authorize]` attribute to specify the policy name. In the following example, the `EmployeeOnly` policy checks for the presence of an `EmployeeNumber` claim on the current identity:

`Pages/PassEmployeeOnlyPolicyWithAuthorizeAttribute.razor`:

```razor
@page "/pass-employeeonly-policy-with-authorize-attribute"
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize(Policy = "EmployeeOnly")]

<h1>Pass 'EmployeeOnly' policy with [Authorize] attribute</h1>

<p>You satisfy the 'EmployeeOnly' policy.</p>
```

You can specify a list of allowed values when creating a policy. The following policy only passes for employees whose employee number is 1, 2, 3, 4, or 5:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/claims/7.x/WebAll/Program.cs._
`Pages/PassFounderPolicyWithAuthorizeView.razor`:

```razor
@page "/pass-founder-policy-with-authorizeview"

<h1>Pass 'Founder' policy with AuthorizeView</h1>

<AuthorizeView Policy="Founder">
    <Authorized>
        <p>You satisfy the 'Founder' policy.</p>
    </Authorized>
    <NotAuthorized>
        <p>You <b>don't</b> satisfy the 'Founder' policy.</p>
    </NotAuthorized>
</AuthorizeView>
```

### Add a generic claim check

If the claim value isn't a single value or you need more flexible claim evaluation logic, such as pattern matching, checking the claim issuer, or parsing complex claim values, use `Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireAssertion*` with `System.Security.Claims.ClaimsPrincipal.HasClaim*`. For example, the following policy requires that the user's `email` claim ends with a specific domain:

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("ContosoOnly", policy =>
        policy.RequireAssertion(context =>
            context.User.HasClaim(c =>
                c.Type == "email" &&
                c.Value.EndsWith("@contoso.com", StringComparison.OrdinalIgnoreCase))));
```

For more information, see Policy-based authorization in ASP.NET Core.

## Evaluate multiple policies

Multiple policies are applied via multiple `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` components. The inner component requires the user to pass its policy and every policy of parent `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` components.

The following example:

* Requires a `CustomerServiceMember` policy, which indicates that the user is in the organization's customer service department because they have a `Department` claim with a value of `Customer Service`.
* Also requires a `HumanResourcesMember` policy, which indicates that the user is in the organization's human resources department because they have a `Department` claim with a value of `Human Resources`.

In the app's `Program` file:

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("CustomerServiceMember", policy =>
        policy.RequireClaim("Department", "Customer Service"))
    .AddPolicy("HumanResourcesMember", policy =>
        policy.RequireClaim("Department", "Human Resources"));
```

The following example uses `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` components.

`Pages/PassCustomerServiceMemberAndHumanResourcesMemberPoliciesWithAuthorizeViews.razor`:

```razor
@page "/pass-customerservicemember-and-humanresourcesmember-policies-with-authorizeviews"

<h1>Pass 'CustomerServiceMember' and 'HumanResourcesMember' policies with AuthorizeViews</h1>

<AuthorizeView Policy="CustomerServiceMember">
    <Authorized>
        <p>User: @context.User.Identity?.Name</p>
        <AuthorizeView Policy="HumanResourcesMember" Context="innerContext">
            <Authorized>
                <p>
                    You satisfy the 'CustomerServiceMember' and 'HumanResourcesMember' policies.
                </p>
            </Authorized>
            <NotAuthorized>
                <p>
                    You satisfy the 'CustomerServiceMember' policy, but you <b>don't</b> satisfy 
                    the 'HumanResourcesMember' policy.
                </p>
            </NotAuthorized>
        </AuthorizeView>
    </Authorized>
    <NotAuthorized>
        <p>
            You <b>don't</b> satisfy the 'CustomerServiceMember' policy.
        </p>
    </NotAuthorized>
</AuthorizeView>
```

The following example uses `[Authorize]` attributes.

`Pages/PassCustomerServiceMemberAndHumanResourcesMemberPoliciesWithAuthorizeAttributes.razor`:

```razor
@page "/pass-customerservicemember-and-humanresourcesmember-policies-with-authorize-attributes"
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize(Policy = "CustomerServiceMember")]
@attribute [Authorize(Policy = "HumanResourcesMember")]

<h1>
    Pass 'CustomerServiceMember' and 'HumanResourcesMember' policies with [Authorize] attributes
</h1>

<p>
    You satisfy the 'CustomerServiceMember' and 'HumanResourcesMember' policies.
</p>
```

For more complicated policies, such as taking a date of birth claim, calculating an age from it, then checking that the age is 21 or older, use `Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireAssertion*` or write custom policy handlers. Custom policy handlers are useful when you need access to dependency-injected services or want a reusable, testable authorization component.

## Claim case sensitivity

Claim *values* are compared using `StringComparison.Ordinal`. This means `Admin` (uppercase `A`) and `admin` (lowercase `a`) are always treated as different roles, regardless of which authentication handler created the identity.

Separately, the claim *type* comparison (used to locate role claims by their claim type, such as `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`) may be case-sensitive or case-insensitive depending on the `System.Security.Claims.ClaimsIdentity` implementation. With `Microsoft.IdentityModel` in ASP.NET Core 8.0 or later (used by `Microsoft.Extensions.DependencyInjection.JwtBearerExtensions.AddJwtBearer*`, `Microsoft.Extensions.DependencyInjection.OpenIdConnectExtensions.AddOpenIdConnect*`, `Microsoft.Extensions.DependencyInjection.WsFederationExtensions.AddWsFederation*`, and `Microsoft.Identity.Web.AppBuilderExtension.AddMicrosoftIdentityWebApp*`/`Microsoft.Identity.Web.AppBuilderExtension.AddMicrosoftIdentityWebApi*`), `Microsoft.IdentityModel.Tokens.CaseSensitiveClaimsIdentity` is produced during token <example-value>, which uses case-sensitive claim type matching.

The default `System.Security.Claims.ClaimsIdentity` provided by the .NET runtime (used in most cases, including all cookie-based flows) still uses case-insensitive claim type matching.

In practice, this distinction rarely matters for role authorization because the role claim type is set once during identity creation and matched consistently. Always use consistent casing for role names and claim types to avoid subtle issues.

## Related content

* ASP.NET Core Blazor authentication and authorization
* ASP.NET Core Blazor authentication state
* ASP.NET Core Blazor WebAssembly additional security scenarios
* Use Graph API with ASP.NET Core Blazor WebAssembly
* Secure ASP.NET Core Blazor WebAssembly
* Claim-based authorization in ASP.NET Core Razor Pages
* Claim-based authorization in ASP.NET Core MVC
* Extend or add custom claims, including role claims, using `IClaimsTransformation`
