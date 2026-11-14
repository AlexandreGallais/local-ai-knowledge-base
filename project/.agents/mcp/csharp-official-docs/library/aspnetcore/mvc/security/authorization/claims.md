---
title: "Claim-based authorization in ASP.NET Core MVC"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/security/authorization/claims.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Claim-based authorization in ASP.NET Core MVC

When an identity is created for an app user upon signing into an app, the identity provider may assign one or more claims to the user's identity. A claim is a name value pair that represents what the subject (a user, an app or service, or a device/computer) is, not what the subject can do. A claim can be evaluated by the app to determine access rights to data and other secured resources during the process of authorization and can also be used to make or express authentication decisions about a subject. An identity can contain multiple claims with multiple values and can contain multiple claims of the same type. This article explains how to add claims checks for authorization in an ASP.NET Core app.

This article uses MVC examples and focuses on MVC scenarios. For Blazor and Razor Pages guidance, see the following resources:

* Claim-based authorization in ASP.NET Core
* Claim-based authorization in ASP.NET Core Razor Pages

## Sample app

The sample app for this article is the `WebAll` sample app (`dotnet/AspNetCore.Docs.Samples` GitHub repository) (how to download). For more information, see the sample's README file (`README.md`).

## Add claim checks

Claim-based authorization checks are declarative and applied to controllers or actions within a controller.

Claims in code specify claims which the current user must possess, and optionally the value the claim must hold to access the requested resource. Claims requirements are policy based. The developer must build and register a policy expressing the claims requirements.

The simplest type of claim policy looks for the presence of a claim and doesn't check the value.

Build and register the policy and call `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*` (place the call after the line that calls `Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*`). Registering the policy takes place as part of the Authorization service configuration, typically in the `Program` file:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/claims/7.x/WebAll/Program.cs._
Apply the policy using the `Policy` property on the `[Authorize]` attribute to specify the policy name. In the following example, the `EmployeeOnly` policy checks for the presence of an `EmployeeNumber` claim on the current identity:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/claims/7.x/WebAll/Controllers/Home2Controller.cs._
The `[Authorize]` attribute can be applied to an entire controller, in which case only identities matching the policy are allowed access to any action on the controller:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/claims/7.x/WebAll/Controllers/VacationController.cs._
If you have a controller that's protected by the `[Authorize]` attribute but want to allow anonymous access to a particular action, apply the `[AllowAnonymous]` attribute:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/claims/7.x/WebAll/Controllers/VacationController.cs._
You can specify a list of allowed values when creating a policy. The following policy only passes for employees whose employee number is 1, 2, 3, 4, or 5:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/claims/7.x/WebAll/Program.cs._
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

If multiple policies are applied at the controller and action levels, ***all*** policies must pass <example-value> access is granted:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/claims/7.x/WebAll/Controllers/SalaryController.cs._
In the preceding example, any identity that fulfills the `EmployeeOnly` policy can access the `Payslip` action, as that policy is enforced on the controller. However, in order to call the `UpdateSalary` action, the identity must fulfill *both* the `EmployeeOnly` policy and the `HumanResources` policy.

If you want more complicated policies, such as taking a date of birth claim, calculating an age from it then checking the age is 21 or older then you need to write custom policy handlers.

## Claim case sensitivity

Claim *values* are compared using `StringComparison.Ordinal`. This means `Admin` (uppercase `A`) and `admin` (lowercase `a`) are always treated as different claim values, regardless of which authentication handler created the identity.

Separately, the claim *type* comparison (used to locate claims by their type, such as `email`) may be case-sensitive or case-insensitive depending on the `System.Security.Claims.ClaimsIdentity` implementation. With `Microsoft.IdentityModel` in ASP.NET Core 8.0 or later (used by `Microsoft.Extensions.DependencyInjection.JwtBearerExtensions.AddJwtBearer*`, `Microsoft.Extensions.DependencyInjection.OpenIdConnectExtensions.AddOpenIdConnect*`, `Microsoft.Extensions.DependencyInjection.WsFederationExtensions.AddWsFederation*`, and `Microsoft.Identity.Web.AppBuilderExtension.AddMicrosoftIdentityWebApp*`/`Microsoft.Identity.Web.AppBuilderExtension.AddMicrosoftIdentityWebApi*`), `Microsoft.IdentityModel.Tokens.CaseSensitiveClaimsIdentity` is produced during token <example-value>, which uses case-sensitive claim type matching.

The default `System.Security.Claims.ClaimsIdentity` provided by the .NET runtime (used in most cases, including all cookie-based flows) still uses case-insensitive claim type matching.

In practice, this distinction rarely matters when the claim type is configured once during identity creation and matched consistently. This also applies to roles when they're represented as claims. Always use consistent casing for claim values and claim types to avoid subtle issues.
