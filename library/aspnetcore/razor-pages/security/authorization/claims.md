---
title: "Claim-based authorization in ASP.NET Core Razor Pages"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/razor-pages/security/authorization/claims.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Claim-based authorization in ASP.NET Core Razor Pages

When an identity is created for an app user upon signing into an app, the identity provider may assign one or more claims to the user's identity. A claim is a name value pair that represents what the subject (a user, an app or service, or a device/computer) is, not what the subject can do. A claim can be evaluated by the app to determine access rights to data and other secured resources during the process of authorization and can also be used to make or express authentication decisions about a subject. An identity can contain multiple claims with multiple values and can contain multiple claims of the same type. This article explains how to add claims checks for authorization in an ASP.NET Core app.

This article uses Razor Pages examples and focuses on Razor Pages authorization scenarios. For Blazor and MVC guidance, see the following resources:

* Claim-based authorization in ASP.NET Core
* Claim-based authorization in ASP.NET Core MVC

Examples throughout this article apply claim-based authorization via one or more `[Authorize]` attributes on `PageModel` classes. Alternatively, claim-based authorization can be applied using *conventions*. For more information, see Razor Pages route and app conventions in ASP.NET Core.

## Sample app

The sample app for this article is the `WebAll` sample app (`dotnet/AspNetCore.Docs.Samples` GitHub repository) (how to download). For more information, see the sample's README file (`README.md`).

## Add claim checks

Claim-based authorization checks:

* Are declarative.
* Are applied to Razor Pages, MVC controllers, or actions within a controller.
* Can't be applied at the Razor Page handler level. They must be applied to the page model class.

Claims in code specify claims which the current user must possess, and optionally the value the claim must hold to access the requested resource. Claims requirements are policy based. The developer must build and register a policy expressing the claims requirements.

The simplest type of claim policy looks for the presence of a claim and doesn't check the value.

Build and register the policy and call `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*` (place the call after the line that calls `Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*`). Registering the policy takes place as part of the Authorization service configuration, typically in the `Program` file:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/claims/7.x/WebAll/Program.cs._
Apply the policy using the `Policy` property on the `[Authorize]` attribute to specify the policy name. In the following example, the `EmployeeOnly` policy checks for the presence of an `EmployeeNumber` claim on the current identity:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/claims/7.x/WebAll/Pages/Index.cshtml.cs._
Filter attributes, including the `[Authorize]` attribute, can only be applied to the entire `PageModel` class and can't be applied to specific page handler methods. If you need to implement different authorization rules for different page handlers, adopt either of the following approaches.

* Use separate Razor Pages for operations requiring different authorization levels, using partial views for shared content.

* Inject `Microsoft.AspNetCore.Authorization.IAuthorizationService` and manually check the authorization policy by calling `Microsoft.AspNetCore.Authorization.IAuthorizationService.AuthorizeAsync*` within handler methods. If authorization fails, the handler returns a `Forbid` result (`Microsoft.AspNetCore.Mvc.ForbidResult`).

  The following example demonstrates the approach:

  * The page's `OnGet` handler requires a Sid claim via the `RequireSidClaim` policy.
  * The page's `OnPostAsync` handler requires an email claim via the `RequireEmailClaim` policy.

  > **Note:**
  > Constructor injection of `Microsoft.AspNetCore.Authorization.IAuthorizationService` in the following example is supported with primary constructors in C# 12 (.NET 8) or later.

  ```csharp
  public class AuthPageHandlersExampleModel(
      IAuthorizationService authorizationService) : PageModel
  {
      public async Task<IActionResult> OnGet()
      {
          var authResult = 
              await authorizationService.AuthorizeAsync(User, "RequireSidClaim");

          if (!authResult.Succeeded)
          {
              return Forbid();
          }

          // Authorized logic

          return Page();
      }

      public async Task<IActionResult> OnPostAsync()
      {
          var authResult = 
              await authorizationService.AuthorizeAsync(User, "RequireEmailClaim");

          if (!authResult.Succeeded)
          {
              return Forbid();
          }

          // Authorized logic

          return Page();
      }
  }
  ```

  Alternatively, page handler methods can check claims directly by calling `System.Security.Claims.ClaimsIdentity.HasClaim*`:

  ```csharp
  public IActionResult OnGet()
  {
      if (!User.HasClaim(c => c.Type == ClaimTypes.Sid))
      {
          return Forbid();
      }

      // Authorized logic

      return Page();
  }

  public IActionResult OnPostAsync()
  {
      if (!User.HasClaim(c => c.Type == ClaimTypes.Email))
      {
          return Forbid();
      }

      // Authorized logic

      return Page();
  }
  ```

  > **Note:**
  > `System.Security.Claims.ClaimTypes` is in the `System.Security.Claims` namespace.

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

If multiple policies are applied at the controller and action levels, ***all*** policies must pass before access is granted. In the following sample, both page handler methods must fulfill *both* the `EmployeeOnly` policy and the `HumanResources` policy:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/claims/7.x/WebAll/Pages/X/Salary.cshtml.cs._
If you want more complicated policies, such as taking a date of birth claim, calculating an age from it then checking the age is 21 or older then you need to write custom policy handlers.

## Claim case sensitivity

Claim *values* are compared using `StringComparison.Ordinal`. This means values such as `Admin` (uppercase `A`) and `admin` (lowercase `a`) are always treated as different claim values, regardless of which authentication handler created the identity.

Separately, claim *type* comparison (used to locate claims by type, such as `EmployeeNumber`, `department`, or `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`) may be case-sensitive or case-insensitive depending on the `System.Security.Claims.ClaimsIdentity` implementation. With `Microsoft.IdentityModel` in ASP.NET Core 8.0 or later (used by `Microsoft.Extensions.DependencyInjection.JwtBearerExtensions.AddJwtBearer*`, `Microsoft.Extensions.DependencyInjection.OpenIdConnectExtensions.AddOpenIdConnect*`, `Microsoft.Extensions.DependencyInjection.WsFederationExtensions.AddWsFederation*`, and `Microsoft.Identity.Web.AppBuilderExtension.AddMicrosoftIdentityWebApp*`/`Microsoft.Identity.Web.AppBuilderExtension.AddMicrosoftIdentityWebApi*`), `Microsoft.IdentityModel.Tokens.CaseSensitiveClaimsIdentity` is produced during token validation, which uses case-sensitive claim type matching.

The default `System.Security.Claims.ClaimsIdentity` provided by the .NET runtime (used in most cases, including all cookie-based flows) still uses case-insensitive claim type matching.

In practice, this distinction rarely matters when the same claim types are issued and checked consistently. Role authorization follows the same rules because roles are represented as claims. Always use consistent casing for claim values and claim types to avoid subtle issues.
