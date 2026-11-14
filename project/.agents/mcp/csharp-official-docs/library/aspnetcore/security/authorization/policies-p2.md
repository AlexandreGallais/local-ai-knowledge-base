---
title: "Policy-based authorization in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/authorization/policies.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Policy-based authorization in ASP.NET Core (part 2 of 2)

## Authorization handlers

An authorization handler is responsible for the evaluation of a requirement's properties. The authorization handler evaluates the requirements against a provided `Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext` to determine if access is allowed.

A requirement can have multiple handlers. A handler may inherit `Microsoft.AspNetCore.Authorization.AuthorizationHandler`1`, where `TRequirement` is the requirement to handle. Alternatively, a handler may implement `Microsoft.AspNetCore.Authorization.IAuthorizationHandler` directly to handle more than one type of requirement.

### Use a handler for one requirement

The following example shows a one-to-one relationship in which a minimum age handler handles a single requirement:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Policies/Handlers/MinimumAgeHandler.cs._
The preceding code determines if the current user principal has a date of birth claim. Authorization can't occur when the claim is missing, in which case a completed task is returned. When a claim is present, the user's age is calculated. If the user meets the minimum age defined by the requirement, authorization is considered successful. When authorization is successful, `context.Succeed` is invoked with the satisfied requirement as its sole parameter.

### Use a handler for multiple requirements

The following example shows a one-to-many relationship in which a permission handler can handle three different types of requirements:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Policies/Handlers/PermissionHandler.cs._
The preceding code traverses `Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext.PendingRequirements`—a property containing requirements not marked as successful. For a `ReadPermission` requirement, the user must be either an owner or a sponsor to access the requested resource. For an `EditPermission` or `DeletePermission` requirement, they must be an owner to access the requested resource.

### Handler registration

Register handlers in the services collection during configuration. The following example registers a minimum age handler (`MinimumAgeHandler`) as a singleton service, but a handler can be registered using any of the built-in service lifetimes:

```csharp
builder.Services.AddSingleton<IAuthorizationHandler, MinimumAgeHandler>();
```

It's possible to bundle both a requirement and a handler into a single class implementing both `Microsoft.AspNetCore.Authorization.IAuthorizationRequirement` and `Microsoft.AspNetCore.Authorization.IAuthorizationHandler`. This bundling creates a tight coupling between the handler and requirement and is only recommended for simple requirements and handlers. Creating a class that implements both interfaces removes the need to register the handler in the service container due to the built-in `Microsoft.AspNetCore.Authorization.Infrastructure.PassThroughAuthorizationHandler` that allows requirements to handle themselves.

See the implementation of the ASP.NET Core `AssertionRequirement` class for an example where the `Microsoft.AspNetCore.Authorization.Infrastructure.AssertionRequirement` is both a requirement and the handler in a fully self-contained class. The `Microsoft.AspNetCore.Authorization.Infrastructure.AssertionRequirement` framework's API allows you to validate access using inline lambda expressions instead of writing separate, boilerplate requirement and handler classes.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

### What should a handler return?

The `Handle` method in the handler example returns no value. How is a status of either success or failure indicated?

* A handler indicates success by calling `context.Succeed`, passing the successfully validated requirement (`Microsoft.AspNetCore.Authorization.IAuthorizationRequirement`).

* A handler isn't required to handle failures generally, as other handlers for the same requirement may succeed.

* To guarantee failure, even if other requirement handlers succeed, call `context.Fail`.

If a handler calls `context.Succeed` or `context.Fail`, all other handlers are still called. This allows requirements to produce side effects, such as logging, which takes place even if another handler successfully validates or fails on a requirement. When set to `false`, the `Microsoft.AspNetCore.Authorization.AuthorizationOptions.InvokeHandlersAfterFailure` property short-circuits the execution of handlers when `context.Fail` is called. `Microsoft.AspNetCore.Authorization.AuthorizationOptions.InvokeHandlersAfterFailure` defaults to `true`, in which case all handlers are called.

> **Note:**
> Authorization handlers are called even if authentication fails. Also handlers can execute in any order, so do ***not*** depend on the order of calling handlers.

### Why would I want multiple handlers for a requirement?

In cases where you want evaluation to be on an **OR** basis, implement multiple handlers for a single requirement. For example, assume that the Contoso Corporation has doors that only open with key cards. If you leave your key card at home, the receptionist prints a temporary sticker and opens the door for you. In this scenario, the app has a single requirement but multiple handlers, each one examining a single requirement.

In the following example implementations:

* `BuildingEntryRequirement` is the building entry requirement.
* `BadgeEntryHandler` (the individual has a badge) and `TemporaryStickerHandler` (the individual has a temporary sticker) are separate handlers, each examining a single requirement.

`BuildingEntryRequirement.cs`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Policies/Requirements/BuildingEntryRequirement.cs._
`BadgeEntryHandler.cs`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Policies/Handlers/BadgeEntryHandler.cs._
`TemporaryStickerHandler.cs`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Policies/Handlers/TemporaryStickerHandler.cs._
Ensure that both handlers are registered. If either of the handlers succeed when a policy evaluates the `BuildingEntryRequirement`, the policy evaluation succeeds.

## Use a `Func` to fulfill a policy

There are situations where fulfilling a policy is simple to express in code with a `Func<AuthorizationHandlerContext, bool>` delegate when configuring a policy with the `RequireAssertion` policy builder. For example, the preceding `BadgeEntryHandler` can be rewritten as follows:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/policies/6.0/AuthorizationPoliciesSample/Program.cs._
## Authorization via an external service sample

The Authorization via an external service sample (`dotnet/AspNetCore.Docs.Samples` GitHub repository) shows how to implement additional authorization requirements with an external authorization service. The solution's `Contoso.API` project is secured with Microsoft Entra ID. An additional authorization check from the `Contoso.Security.API` project returns a payload describing whether the `Contoso.API` client app can invoke the `GetWeather` API.

### Configure the sample

The following demonstration relies on using NSwag (Swagger/OpenAPI) or cURL in a command shell.

In the `Contoso.Security.API` project, set the `AllowedClients` placeholder (`{CLIENT ID}`) to any test GUID value (for example, `00001111-aaaa-2222-bbbb-3333cccc4444`):

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/AuthorizationExternalService/Contoso.Security.API/appsettings.json._
In a command shell opened to the `Contoso.API` project, use `dotnet user-jwts` to generate an access token with an `appid` claim for the client app's ID, which was created in the preceding step (for example, `00001111-aaaa-2222-bbbb-3333cccc4444`).

```dotnetcli
dotnet user-jwts create --claim appid={GUID}
```

Example:

```dotnetcli
dotnet user-jwts create --claim appid=00001111-aaaa-2222-bbbb-3333cccc4444
```

The output produces a token after "<example-value>" in the command shell:

```dotnetcli
New JWT saved with ID '{JWT ID}'.
Name: {USER}
Custom Claims: [appid=00001111-aaaa-2222-bbbb-3333cccc4444]

Token: {TOKEN}
```

Set the value of the token (where the `{TOKEN}` placeholder appears in the preceding output) aside for use later.

You can decode the token in an online JWT decoder, such as `jwt.ms` to see its contents, revealing that it contains an `appid` claim with the client app's ID:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}.{
  "unique_name": "{USER}",
  "sub": "{USER}",
  "jti": "14ed7729",
  "appid": "{CLIENT ID}",
  "aud": [
    "https://localhost:7250",
    "http://localhost:7251"
  ],
  "nbf": 1780660887,
  "exp": 1788609687,
  "iat": 1780660888,
  "iss": "dotnet-user-jwts"
}.[Signature]
```

Execute the command again with an incorrect client ID (`appid`) value:

```dotnetcli
dotnet user-jwts create --claim appid=aaaabbbb-0000-cccc-1111-dddd2222eeee
```

Set the value of the second token aside.

Start both the `Contoso.API` and `Contoso.Security.API` projects in Visual Studio or with the `dotnet watch` command in a command shell:

```dotnetcli
dotnet watch
```

# Swagger UI

In the Swagger UI of the `Contoso.API` project (`https://localhost:7250/swagger/index.html`), select the **Authorize** button.

In the **Available authorizations: Bearer** window, enter the access token. Select the **Authorize** button. Close the **Available authorizations** window.

Under **default**, select the **Get** button for the `/WeatherForecast` endpoint. Select the **Try it out** button. Select the **Execute** button.

The output under **Responses** > **Server response** > **Response body** shows the weather forecast JSON returned by the `Contoso.API` project.

Perform the same steps with the access token that was generated with an invalid client app ID. The response is *403 - Forbidden*.

# cURL in a command shell

In a command shell, use the .NET CLI to execute the following `curl.exe` command to request the `WeatherForecast` endpoint. Replace the `{TOKEN}` placeholder with the first JWT bearer token that you saved earlier:

```dotnetcli
curl.exe -i -H "<example-value>" https://localhost:7250/WeatherForecast
```

The output indicates success because the user's birth date claim indicates that they're at least 21 years old:

```dotnetcli
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Fri, 05 Jun 2026 12:48:58 GMT
Server: Kestrel
Transfer-Encoding: chunked

[{ ... WEATHER DATA ... }]
```

Execute the command again using the second token with the invalid client ID (`appid`). The result indicates a policy failure:

```dotnetcli
HTTP/1.1 403 Forbidden
Content-Length: 0
Date: Fri, 05 Jun 2026 13:09:56 GMT
Server: Kestrel
```

You can add breakpoints in the `Contoso.Security.API.SecurityPolicyController` and see that the passed client ID (`appid`) is used to assert whether it is allowed to obtain weather data.

You can also send the client ID directly to the `Contoso.Security.API` either via the Swagger UI or cURL in a command shell (for example: `https://localhost:7123/SecurityPolicy/{CLIENT ID}`) to see it return either `true` or `false` for `canGetWeather`.

```dotnetcli
curl.exe -i -H "<example-value>" https://localhost:7123/SecurityPolicy/{CLIENT ID}
```

With the correct client ID (`appid`), `canGetWeather` is `true`:

```dotnetcli
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Fri, 05 Jun 2026 13:19:49 GMT
Server: Kestrel
Transfer-Encoding: chunked

{"canGetWeather":true}
```

---

## Related content

* Quickstart: Configure an application to expose a web API
* Authorization via an external service sample (`dotnet/AspNetCore.Docs.Samples` GitHub repository)
