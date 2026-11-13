---
title: "SignalR authentication and authorization (part 4 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/signalr/authn-and-authz.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# SignalR authentication and authorization (part 4 of 4)

### Windows authentication

If Windows authentication is configured in the app, SignalR can use that identity to secure hubs. However, to send messages to individual users, add a custom User ID provider. The Windows authentication system doesn't provide the "Name Identifier" claim. SignalR uses the claim to determine the user name.

Add a new class that implements `IUserIdProvider` and retrieve one of the claims from the user for use as the identifier. For example, to use the "Name" claim (which is the Windows username in the form `[Domain]/[Username]`), create the following class:

```csharp
public class NameUserIdProvider : IUserIdProvider
{
    public string GetUserId(HubConnectionContext connection)
    {
        return connection.User?.Identity?.Name;
    }
}
```

Rather than `ClaimTypes.Name`, use any value from the `User`, such as the Windows SID identifier, and so on.

> **Note:**
> The specified value must be unique among all the users in the system. Otherwise, a message intended for one user might end up reaching a different user.

Register this component in the `Program.cs` file:

```csharp
using Microsoft.AspNetCore.Authentication.Negotiate;
using Microsoft.AspNetCore.SignalR;
using SignalRAuthenticationSample;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

services.AddAuthentication(NegotiateDefaults.AuthenticationScheme)
   .AddNegotiate();

services.AddAuthorization(options =>
{
    options.FallbackPolicy = options.DefaultPolicy;
});
services.AddRazorPages();

services.AddSignalR();
services.AddSingleton<IUserIdProvider, NameUserIdProvider>();

var app = builder.Build();

// Code removed for brevity.
```

In the .NET client, Windows authentication must be enabled by setting the `Microsoft.AspNetCore.Http.Connections.Client.HttpConnectionOptions.UseDefaultCredentials` property:

```csharp
var connection = new HubConnectionBuilder()
    .WithUrl("https://example.com/chathub", options =>
    {
        options.UseDefaultCredentials = true;
    })
    .Build();
```

Windows authentication is supported in Microsoft Edge, but not in all browsers. For example, in Chrome and Safari, attempting to use Windows authentication and WebSockets fails. When Windows authentication fails, the client attempts to fall back to other transports, which might work.

### Use claims to customize identity handling

An app that authenticates users can derive SignalR user IDs from user claims. To specify how SignalR creates user IDs, implement `IUserIdProvider` and register the implementation.

The sample code demonstrates how to use claims to select the user's email address as the identifying property.

> **Note:**
> The specified value must be unique among all the users in the system. Otherwise, a message intended for one user might end up reaching a different user.

```csharp
public class EmailBasedUserIdProvider : IUserIdProvider
{
    public virtual string GetUserId(HubConnectionContext connection)
    {
        return connection.User?.FindFirst(ClaimTypes.Email)?.Value!;
    }
}
```

The account registration adds a claim with type `ClaimTypes.Email` to the ASP.NET identity database.

```csharp
public async Task<IActionResult> OnPostAsync(string returnUrl = null)
{
    returnUrl ??= Url.Content("~/");
    ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync())
                                                                          .ToList();
    if (ModelState.IsValid)
    {
        var user = CreateUser();

        await _userStore.SetUserNameAsync(user, Input.Email, CancellationToken.None);
        await _emailStore.SetEmailAsync(user, Input.Email, CancellationToken.None);
        var result = await _userManager.CreateAsync(user, Input.Password);

        // Add the email claim and value for this user.
        await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Email, Input.Email));

        // Remaining code removed for brevity.
```

Register this component in the `Program.cs` file:

```csharp
builder.Services.AddSingleton<IUserIdProvider, EmailBasedUserIdProvider>();
```

## Authorize users to access hubs and hub methods

By default, an unauthenticated user can call all methods in a hub. To require authentication, apply the `Microsoft.AspNetCore.Authorization.AuthorizeAttribute` attribute to the hub:

```csharp
[Authorize]
public class ChatHub: Hub
{
}
```

The constructor arguments and properties of the `[Authorize]` attribute can be used to restrict access to only users matching specific authorization policies. For example, with the custom authorization policy called `MyAuthorizationPolicy`, only users matching that policy can access the hub by using the following code:

```csharp
[Authorize("MyAuthorizationPolicy")]
public class ChatPolicyHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        await Clients.All.SendAsync("ReceiveSystemMessage", 
                                    $"{Context.UserIdentifier} joined.");
        await base.OnConnectedAsync();
    }
    // Code removed for brevity.
```

The `[Authorize]` attribute can be applied to individual hub methods. If the current user doesn't match the policy applied to the method, an error is returned to the caller:

```csharp
[Authorize]
public class ChatHub : Hub
{
    public async Task Send(string message)
    {
        // ... Send a message to all users ...
    }

    [Authorize("Administrators")]
    public void BanUser(string userName)
    {
        // ... Ban a user from the chat room (something only Administrators can do) ...
    }
}
```

### Use authorization handlers to customize hub method authorization

SignalR provides a custom resource to authorization handlers when a hub method requires authorization. The resource is an instance of `Microsoft.AspNetCore.SignalR.HubInvocationContext`. The `HubInvocationContext` includes the `Microsoft.AspNetCore.SignalR.HubCallerContext`, the name of the hub method being invoked, and the arguments to the hub method.

Consider the example of a chat room that allows multiple organizations to sign in via Microsoft Entra ID. Anyone with a Microsoft account can sign in to chat, but only members of the owning organization should be able to ban users or view users' chat histories. Also, there might be a need to restrict some functionality from specific users. In this scenario, notice how the `DomainRestrictedRequirement` serves as a custom `Microsoft.AspNetCore.Authorization.IAuthorizationRequirement`. Because the `HubInvocationContext` resource parameter is passed in, the internal logic can inspect the context in which the hub is being called, and make decisions on allowing the user to execute individual hub methods:

```csharp
[Authorize]
public class ChatHub : Hub
{
    public void SendMessage(string message)
    {
    }

    [Authorize("DomainRestricted")]
    public void BanUser(string username)
    {
    }

    [Authorize("DomainRestricted")]
    public void ViewUserHistory(string username)
    {
    }
}
```

```csharp
﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace SignalRAuthenticationSample;

public class DomainRestrictedRequirement :
    AuthorizationHandler<DomainRestrictedRequirement, HubInvocationContext>,
    IAuthorizationRequirement
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
        DomainRestrictedRequirement requirement,
        HubInvocationContext resource)
    {
        if (context.User.Identity != null &&
          !string.IsNullOrEmpty(context.User.Identity.Name) && 
          IsUserAllowedToDoThis(resource.HubMethodName,
                               context.User.Identity.Name) &&
          context.User.Identity.Name.EndsWith("@microsoft.com"))
        {
                context.Succeed(requirement);
            
        }
        return Task.CompletedTask;
    }

    private bool IsUserAllowedToDoThis(string hubMethodName,
        string currentUsername)
    {
        return !(currentUsername.Equals("user@example.com") &&
            hubMethodName.Equals("banUser", StringComparison.OrdinalIgnoreCase));
    }
}
```

In the `Program.cs` file, add the new policy, providing the custom `DomainRestrictedRequirement` requirement as a parameter to create the `DomainRestricted` policy:

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SignalRAuthenticationSample;
using SignalRAuthenticationSample.Data;
using SignalRAuthenticationSample.Hubs;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var services = builder.Services;

services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
services.AddDatabaseDeveloperPageExceptionFilter();

services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();

services.AddAuthorization(options =>
   {
       options.AddPolicy("DomainRestricted", policy =>
       {
           policy.Requirements.Add(new DomainRestrictedRequirement());
       });
   });

services.AddRazorPages();

var app = builder.Build();

// Code removed for brevity.
```

In the preceding example, the `DomainRestrictedRequirement` class is both an `IAuthorizationRequirement` and its own `AuthorizationHandler` for that requirement. It's acceptable to split these two components into separate classes to separate concerns. The approach in this example provides the benefit of not having to inject the `AuthorizationHandler` during startup because the requirement and the handler are the same thing.

As an alternative to registering the `DomainRestricted` policy and referencing it with `[Authorize("DomainRestricted")]`, you can apply an `Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData` attribute directly to a hub or hub method. SignalR combines the attribute's requirements into the effective policy for the method invocation. For more information, see Custom authorization policies with \`IAuthorizationRequirementData\`.

## Additional resources

* Bearer token <example-value> in ASP.NET Core (blog)
* Resource-based authorization
* View or download sample code (how to download)
