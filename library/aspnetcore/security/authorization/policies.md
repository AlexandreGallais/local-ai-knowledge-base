---
title: "Policy-based authorization in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authorization/policies.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Policy-based authorization in ASP.NET Core

An ASP.NET Core authorization policy is a set of one or more authorization requirements that the framework evaluates to decide whether a user is allowed to access a resource. A policy can be registered with a name and applied to resources that require it.

This article explains:

* How to require authenticated users by default.
* How to create requirements.
* How to register and apply policies.
* How named, default, and fallback policies are selected.
* Authorization handlers for single and multiple requirement evaluation.
* How multiple requirements in a single policy are evaluated.

A named policy is applied with `[Authorize(Policy = "...")]` (Razor components, pages, and controllers) or `RequireAuthorization(...)` (endpoints), and the framework uses handlers to evaluate the requirements behind a policy. `Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider` (Custom authorization policy providers in ASP.NET Core documentation) generates policies dynamically instead of registering them at app startup.

Role-based authorization and claims-based authorization use a requirement, a requirement handler, and a preconfigured authorization policy. These building blocks support the expression of authorization evaluations in code.

This article uses Razor component examples and focuses on Blazor authorization scenarios for ASP.NET Core 3.1 or later. For Razor Pages and MVC guidance that applies to all releases of ASP.NET Core, see the following resources after reading this article:

* Policy-based authorization in ASP.NET Core Razor Pages
* Policy-based authorization in ASP.NET Core MVC

Some examples in this article (ASP.NET Core 8.0 or later) use *primary constructors*, available in C# 12 (.NET 8) or later. For more information, see Declare primary constructors for classes and structs (C# documentation tutorial) and Primary constructors (C# Guide).

## Require global user authentication

For a server-side app where most or all endpoints require authentication, set a fallback policy that requires an authenticated user. This secure-by-default approach protects newly added endpoints that don't specify authorization metadata.

The fallback policy, not the default policy, applies to endpoints that don't specify authorization metadata. The default policy applies when an endpoint selects it with `[Authorize]` or `RequireAuthorization()` without a policy name. For complete policy selection rules, see the Default and fallback policies section.

```csharp
var requireAuthPolicy = new AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .Build();

builder.Services.AddAuthorizationBuilder()
    .SetFallbackPolicy(requireAuthPolicy);
```

Apply `[AllowAnonymous]` or call `AllowAnonymous()` for endpoints that are intentionally public.

The fallback policy applies to requests processed by the authorization middleware. For example:

* A request that doesn't match an endpoint uses the fallback policy if the authorization middleware runs for the request.
* Static files served by static file middleware before the authorization middleware aren't protected by the fallback policy.
* Public endpoints can depend on static assets that must also allow anonymous access.

For more information, see Static files in ASP.NET Core and Server-side Blazor app authorization patterns. Blazor WebAssembly apps don't support a server-side fallback authorization policy. For Blazor WebAssembly authorization patterns, see Secure ASP.NET Core Blazor WebAssembly.

## Default and fallback policies

The authorization middleware combines the authorization metadata for an endpoint into a policy. The following table describes how the metadata determines which policy is used:

| Authorization metadata | Policy or behavior |
| --- | --- |
| None | The `Microsoft.AspNetCore.Authorization.AuthorizationOptions.FallbackPolicy` is used, if it's configured. By default, the fallback policy is `null`, so authorization isn't required. |
| `[Authorize]` or `RequireAuthorization()` without a policy name | The `Microsoft.AspNetCore.Authorization.AuthorizationOptions.DefaultPolicy` is used unless the endpoint also has an explicit `AuthorizationPolicy` instance. By default, the default policy requires an authenticated user. |
| `[Authorize(Policy = "{POLICY NAME}")]` or `RequireAuthorization("{POLICY NAME}")` | The named policy is used. |
| `[Authorize(Roles = "{ROLES}")]` | A policy is built with the specified roles. The default policy isn't added for this authorization declaration. |
| `RequireAuthorization(policy)` with an `AuthorizationPolicy` instance | The explicit policy is used. If explicit policy metadata is present, bare authorization data and authentication-scheme-only authorization data don't add the default policy. |
| `[Authorize(AuthenticationSchemes = "{SCHEME}")]` without a policy name or roles | The specified authentication scheme is used. The default policy is also used unless the endpoint has an explicit `AuthorizationPolicy` instance. |
| Multiple `[Authorize]` attributes or policy-selecting `RequireAuthorization(...)` calls | The selected named policies, roles, authentication schemes, and explicit policies are combined. Bare authorization data adds the default policy only when no explicit `AuthorizationPolicy` instance is present. All requirements in the combined policy must succeed. The fallback policy isn't used. |
| `[AllowAnonymous]` or `AllowAnonymous()` | The authorization middleware doesn't enforce an authorization failure for the endpoint. Authentication can still run and populate `Microsoft.AspNetCore.Http.HttpContext.User`. |

The fallback policy isn't combined with a named or default policy. For the declarations shown in the preceding table, it's selected only when no authorization policy is produced from the endpoint's authorization metadata. For example, `[Authorize]` uses the default policy instead of the fallback policy, and `[Authorize(Policy = "{POLICY NAME}")]` uses the named policy instead of the fallback policy.

Requirements supplied as endpoint metadata through `Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData` are added after policy selection. If no other authorization metadata produces a policy, these requirements are combined with the fallback policy when a fallback policy is configured.

## Requirements and policy registration

An authorization policy consists of one or more *requirements*, which are used by a policy to evaluate authorization for the current user principal. A requirement implements `Microsoft.AspNetCore.Authorization.IAuthorizationRequirement`, which is an empty marker interface.

When a requirement doesn't contain data or have properties (parameters), it acts as an empty marker to trigger an associated *authorization handler* (`Microsoft.AspNetCore.Authorization.IAuthorizationHandler`) for processing authorization (described in detail later in this article). Because the handler in this case relies entirely on the HTTP context, user claims, or backend data to make a decision about the user meeting the requirement, the requirement class itself doesn't require internal data or parameters. The requirement only instructs the framework which rule to evaluate.

For example, consider the following minimum age requirement (`MinimumAgeRequirement`), which is implemented merely as a marker class:

```csharp
public class MinimumAgeRequirement : IAuthorizationRequirement { }
```

The preceding requirement is used to create a policy that confirms the user is over a specific age that the handler checks. An `AuthorizationHandler<MinimumAgeRequirement>` inspects the `AuthorizationHandlerContext.User`. If the user has a birth date claim that indicates they're over a certain age, the requirement succeeds. The requirement object doesn't require any properties (parameters) in this case. The next example demonstrates the complete implementation of a minimum age requirement that has a parameter to set the minimum age.

Consider the following `MinimumAgeRequirement` requirement, which describes a single parameter, a minimum age, to evaluate for user authorization:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Policies/Requirements/MinimumAgeRequirement.cs._
A policy is registered as part of the authorization service configuration in the app's `Program` file by calling `Microsoft.AspNetCore.Authorization.AuthorizationBuilder.AddPolicy*`. The following example creates an `AtLeast21` policy with a single requirement of a minimum age, and it sets the minimum age to 21 years old.

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("AtLeast21", policy => 
        policy.Requirements.Add(new MinimumAgeRequirement(21)));
```

If an authorization policy contains multiple authorization requirements, all of the requirements must pass in order for the policy evaluation to succeed. In other words, multiple authorization requirements added to a single authorization policy are treated on an **AND** basis.

## Apply policies to Razor components

Apply policies to Razor components using the `[Authorize]` attribute with the policy name:

```razor
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize(Policy = "CustomerServiceMember")]
```

If multiple policies are applied, ***all*** policies must pass before access is granted:

```razor
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize(Policy = "CustomerServiceMember")]
@attribute [Authorize(Policy = "HumanResourcesMember")]
```

## Apply policies to endpoints

Apply policies to endpoints by using `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization*` with the policy name. For example:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/policies/6.0/AuthorizationPoliciesSample/Program.cs._
## Apply policies in MVC and Razor Pages apps

For guidance on applying policies in Razor Pages and MVC apps, see the following resources:

* Policy-based authorization in ASP.NET Core Razor Pages
* Policy-based authorization in ASP.NET Core MVC

## Authorization service interface (`IAuthorizationService`)

`Microsoft.AspNetCore.Authorization.IAuthorizationService` is primarily responsible for determining if authorization is successful when an `Microsoft.AspNetCore.Authorization.IAuthorizationService.AuthorizeAsync*` overload is called:

* `AuthorizeAsync(ClaimsPrincipal user, object resource, IEnumerable<IAuthorizationRequirement> requirements)`: Checks if a user meets a specific set of authorization requirements for a specified resource.
* `AuthorizeAsync(ClaimsPrincipal user, object resource, string policyName)`: Checks if a user meets a specific authorization policy for a specified resource.

If a resource isn't required for policy evaluation, `null` is passed for the resource.

The preceding methods return an `Microsoft.AspNetCore.Authorization.AuthorizationResult` wrapped in a `System.Threading.Tasks.Task`.

Each `Microsoft.AspNetCore.Authorization.IAuthorizationHandler` is responsible for checking if requirements are met via `Microsoft.AspNetCore.Authorization.IAuthorizationHandler.HandleAsync*`. The `Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext` class contains the authorization information used by the `Microsoft.AspNetCore.Authorization.IAuthorizationHandler` implementation. `Microsoft.AspNetCore.Authorization.IAuthorizationRequirement` is a marker interface with no methods that serves as the mechanism for tracking whether authorization is successful. When `Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.Succeed*` is called with the `Microsoft.AspNetCore.Authorization.IAuthorizationRequirement`, the policy is met:

```csharp
context.Succeed(requirement);
```
