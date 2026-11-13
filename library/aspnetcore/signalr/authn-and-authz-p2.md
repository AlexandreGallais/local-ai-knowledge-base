---
title: "SignalR authentication and authorization (part 2 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/signalr/authn-and-authz.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# SignalR authentication and authorization (part 2 of 4)

## Authenticate users connecting to a SignalR hub

SignalR can be used with ASP.NET Core authentication to associate a user with each connection. In a hub, authentication data can be accessed from the `Microsoft.AspNetCore.SignalR.HubConnectionContext.User` property. Authentication allows the hub to call methods on all connections associated with a user. For more information, see Manage users and groups in SignalR. Multiple connections can be associated with a single user.

The following code is an example that uses SignalR and ASP.NET Core authentication:

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SignalRAuthenticationSample.Data;
using SignalRAuthenticationSample.Hubs;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddRazorPages();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();
app.MapHub<ChatHub>("/chat");

app.Run();
```

> **Note:**
> If a token expires during the lifetime of a connection, by default the connection continues to work. `LongPolling` and `ServerSentEvents` connections fail on subsequent requests if they don't send new access tokens. For connections to close when the authentication token expires, set the CloseOnAuthenticationExpiration option.

### User and role changes during the connection lifetime

SignalR captures the authenticated user when a connection is established and caches it for the lifetime of the connection. The cached principal is exposed to hub methods through the `Context.User` property (`Microsoft.AspNetCore.SignalR.HubCallerContext.User`) and is used to authorize hub method invocations. SignalR doesn't automatically revalidate the user during the life of the connection, regardless of the authentication scheme. This behavior applies to all schemes, including cookie authentication and bearer token authentication.

Changes to a user's identity, roles, or claims that occur after the connection is established aren't reflected on an existing connection. This behavior applies even when the underlying transport makes new HTTP requests, such as the `LongPolling` and `ServerSentEvents` transports. Although the ASP.NET Core authentication middleware reauthenticates each of these HTTP requests, SignalR continues to use the principal that was cached when the connection was established.

Consider the following scenario:

* An app uses cookie authentication and the `LongPolling` transport. The same behavior applies to bearer token authentication and the `ServerSentEvents` transport.
* A user is signed in with the `Editor` role and has an open SignalR connection.
* The app removes the `Editor` role from that user.

On the next long-poll request, the authentication middleware might authenticate the user without the `Editor` role. For example, this can happen if roles are loaded from a data store or the cookie is refreshed. However, the hub continues to authorize the user's `[Authorize(Roles = "Editor")]` hub method invocations because `Context.User` (`Microsoft.AspNetCore.SignalR.HubCallerContext.User`) still holds the principal that was cached before the role was removed. The user can keep calling `Editor`-only hub methods until the connection is closed.

To enforce updated authorization on an active connection, take one of the following approaches:

* Close affected connections so that clients reconnect and reauthenticate. For bearer token authentication, the CloseOnAuthenticationExpiration option closes connections when the authentication token expires.
* Perform authorization checks in hub methods against current data, such as the user's current roles or claims from a data store, instead of relying only on the cached principal.

In .NET 11 and later, a client can refresh the credentials for an active connection without reconnecting. When the client presents an updated token, the server re-authenticates it and replaces the cached `Context.User` in place, so later hub method invocations authorize against the refreshed roles and claims. The refreshed principal must map to the same SignalR user, so a refresh updates roles and claims but doesn't change the connection's user identity or routing. For more information, see Authentication refresh.

### Cookie authentication

In a browser-based app, cookie authentication allows existing user credentials to automatically flow to SignalR connections. When the browser client is used, no extra configuration is needed. If the user is signed in to an app, the SignalR connection automatically inherits this authentication.

Cookies are a browser-specific way to send access tokens, but nonbrowser clients can send them. When the .NET client is used, the `Cookies` property can be configured in the `.WithUrl` call to provide a cookie. However, using cookie authentication from the .NET client requires the app to provide an API to exchange authentication data for a cookie.

> **Important:**
> Starting with ASP.NET Core 10, known API endpoints no longer redirect to login pages when using cookie authentication. Instead, they return 401/403 status codes. For details, see API endpoint authentication behavior in ASP.NET Core.

### Bearer token authentication

The client can provide an access token instead of using a cookie. The server validates the token and uses it to identify the user. For transports that make multiple HTTP requests (for example, `LongPolling` and `ServerSentEvents`), authentication runs on each request, but SignalR caches the resulting principal for the lifetime of the connection. As with cookie authentication, SignalR doesn't automatically revalidate the user during the life of the connection to check for token revocation or for changes to the user's roles or claims. For more information, see User and role changes during the connection lifetime.

In the JavaScript client, the token can be provided by using the accessTokenFactory option.

```typescript
// Connect, using the token we got.
this.connection = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/chat", { accessTokenFactory: () => this.loginToken })
    .build();
```

In the .NET client, there's a similar AccessTokenProvider property that can be used to configure the token:

```csharp
var connection = new HubConnectionBuilder()
    .WithUrl("https://example.com/chathub", options =>
    {
        options.AccessTokenProvider = () => Task.FromResult(_myAccessToken);
    })
    .Build();
```

> **Note:**
> The access token function is called before **every** HTTP request made by SignalR. If the token needs to be renewed in order to keep the connection active, do the renewal from within this function and return the updated token. The token might need to be renewed so it doesn't expire during the connection.

In standard web APIs, bearer tokens are sent in an HTTP header. However, browsers can't set custom headers, such as `Authorization`, on the WebSocket and Server-Sent Events APIs. Because of this browser limitation, SignalR sends the token as a query string parameter for those transports when the client runs in a browser.

The query string fallback is a browser API constraint, not a limitation of SignalR or the WebSocket protocol. Non-browser clients, such as the .NET client, send the token in the `Authorization` header. A reverse proxy, such as YARP fronting a backend-for-frontend (BFF), can also add the `Authorization` header to the proxied WebSocket request, so the backend authenticates with the header instead of the query string.

#### Built-in JWT authentication

On the server, bearer token authentication is configured by using the JSON web token (JWT) Bearer middleware:

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SignalRAuthenticationSample.Data;
using SignalRAuthenticationSample.Hubs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using SignalRAuthenticationSample;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddAuthentication(options =>
{
    // Identity made Cookie authentication the default.
    // However, we want JWT Bearer Auth to be the default.
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
  {
      // Configure the Authority to the expected value for
      // the authentication provider. This ensures the token
      // is appropriately validated.
      options.Authority = "Authority URL"; // TODO: Update URL

      // We have to hook the OnMessageReceived event in order to
      // allow the JWT authentication handler to read the access
      // token from the query string when a WebSocket or
      // Server-Sent Events request comes in.

      // Sending the access token in the query string is required when using WebSockets or ServerSentEvents
      // due to a limitation in Browser APIs. We restrict it to only calls to the
      // SignalR hub in this code.
      // See https://learn.microsoft.com/aspnet/core/signalr/security#access-token-logging
      // for more information about security considerations when using
      // the query string to transmit the access token.
      options.Events = new JwtBearerEvents
      {
          OnMessageReceived = context =>
          {
              var accessToken = context.Request.Query["access_token"];

              // If the request is for our hub...
              var path = context.HttpContext.Request.Path;
              if (!string.IsNullOrEmpty(accessToken) &&
                  (path.StartsWithSegments("/hubs/chat")))
              {
                  // Read the token out of the query string
                  context.Token = accessToken;
              }
              return Task.CompletedTask;
          }
      };
  });

builder.Services.AddRazorPages();
builder.Services.AddSignalR();

// Change to use Name as the user identifier for SignalR
// WARNING: This requires that the source of your JWT token
// ensures that the Name claim is unique!
// If the Name claim isn't unique, users could receive messages
// intended for a different user!
builder.Services.AddSingleton<IUserIdProvider, NameUserIdProvider>();

// Change to use email as the user identifier for SignalR
// builder.Services.AddSingleton<IUserIdProvider, EmailBasedUserIdProvider>();

// WARNING: use *either* the NameUserIdProvider *or* the
// EmailBasedUserIdProvider, but do not use both.

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();
app.MapHub<ChatHub>("/chatHub");

app.Run();
```

> **Note:**
> The query string is used on browsers when connecting with WebSockets and Server-Sent Events due to browser API limitations. When you use HTTPS, the TLS connection secures the query string values. However, many servers log query string values. For more information, see Security considerations in ASP.NET Core SignalR. SignalR uses headers to transmit tokens in environments that support them, such as the .NET and Java clients.

#### Identity Server JWT authentication

When using Duende IdentityServer, add a `Microsoft.Extensions.Options.PostConfigureOptions`1` service to the project:

```csharp
﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
public class ConfigureJwtBearerOptions : IPostConfigureOptions<JwtBearerOptions>
{
    public void PostConfigure(string name, JwtBearerOptions options)
    {
        var originalOnMessageReceived = options.Events.OnMessageReceived;
        options.Events.OnMessageReceived = async context =>
        {
            await originalOnMessageReceived(context);

            if (string.IsNullOrEmpty(context.Token))
            {
                var accessToken = context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;

                if (!string.IsNullOrEmpty(accessToken) &&
                    path.StartsWithSegments("/hubs"))
                {
                    context.Token = accessToken;
                }
            }
        };
    }
}
```

Register the service after adding services for authentication (with the `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication*` method) and the authentication handler for Identity Server (with the `Microsoft.AspNetCore.Authentication.AuthenticationBuilderExtensions.AddIdentityServerJwt*` method):

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection.Extensions;
using SignalRAuthenticationSample.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication()
    .AddIdentityServerJwt();
builder.Services.TryAddEnumerable(
    ServiceDescriptor.Singleton<IPostConfigureOptions<JwtBearerOptions>,
        ConfigureJwtBearerOptions>());

builder.Services.AddRazorPages();

var app = builder.Build();

// Code removed for brevity.
```
