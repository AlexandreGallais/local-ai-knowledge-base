---
title: "SignalR authentication and authorization (part 3 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/signalr/authn-and-authz.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# SignalR authentication and authorization (part 3 of 4)

### Authentication refresh

A SignalR connection can outlive the access token that established it. When CloseOnAuthenticationExpiration is enabled, the server closes the connection after the token <example-value>, and the client must reconnect to continue. Messages sent during the gap are missed, and group and user routing are disrupted until the client reconnects.

Authentication refresh, available in .NET 11 and later, lets a client update the credentials for an active connection without reconnecting. The server re-authenticates the refresh request through the normal endpoint authorization pipeline and replaces the connection's `System.Security.Claims.ClaimsPrincipal` in place, as long as the refreshed principal maps to the same SignalR user.

#### Enable authentication refresh on the server

Enable authentication refresh in the hub's `MapHub` options by setting `EnableAuthenticationRefresh` to `true`. Enable it together with `CloseOnAuthenticationExpiration` so that a connection whose token <example-value> without being refreshed in time is closed, rather than left open with stale credentials:

```csharp
app.MapHub<ChatHub>("/chat", options =>
{
    options.CloseOnAuthenticationExpiration = true;
    options.EnableAuthenticationRefresh = true;
});
```

When authentication refresh is enabled and the authentication ticket has an expiration, the negotiate response reports the remaining token <example-value> so the client can schedule refreshes.

Setting `EnableAuthenticationRefresh` to `true` adds a `/refresh` endpoint to the app's route table, alongside the hub's existing `/negotiate` endpoint. For a hub mapped at `/chat`, the endpoint is `/chat/refresh`. The endpoint isn't registered when `EnableAuthenticationRefresh` is `false`, so it only appears in the route table for hubs that opt in.

The endpoint behaves as follows:

* It accepts `POST` only. Any other HTTP method returns a 405 status code.
* The client identifies its connection with the connection token in the `id` query string, the same way that send, poll, and delete requests do.
* The request is authenticated by the app's normal authentication and authorization middleware before it reaches the endpoint, and the hub's authorization metadata applies to it.
* A successful refresh returns a 200 status code with a JSON body. When the refreshed ticket has an expiration, the body contains a `tokenLifetimeSeconds` property that the client uses to reschedule automatic refreshes.
* A rejected or invalid refresh returns a JSON body with an `error` property. The status code indicates the reason:
  * 403: The connection's identity check or `OnAuthenticationRefresh` rejected the refresh.
  * 404: The connection token doesn't match a known connection.
  * 400: The request omits the connection token, the connection negotiated protocol version 0, or either the connection's current user or the refreshed principal is a Windows identity.

Include the `/refresh` route when configuring a reverse proxy, firewall, or web application firewall in front of the app, and when writing route-scoped authorization or CORS policies. A proxy that forwards `/negotiate` but blocks `/refresh` causes every refresh attempt to fail, and connections close when their tokens expire if `CloseOnAuthenticationExpiration` is enabled.

To inspect or reject a refresh, set the `OnAuthenticationRefresh` callback. It runs after the refresh request is authenticated but before the connection's user is replaced. Return `false` to reject the refresh, in which case the endpoint responds with an HTTP 403 status code and the connection keeps its current user.

The built-in check compares the first `sub`, `ClaimTypes.NameIdentifier`, or `ClaimTypes.Upn` claim in each principal, in that order. The following examples show how the check works:

* **Same identity claim:** The connection's current principal and refreshed principal both have a `sub` claim whose value is `123` and issuer is `https://login.example.com`. The refresh succeeds even if the refreshed principal has a different tenant, role, or scope claim.
* **Changed identity claim:** The connection's current principal has a `sub` claim whose value is `123` and issuer is `https://login.example.com`, but the refreshed principal has a different value, issuer, or claim type. The refresh is rejected.
* **No identity claim:** When neither principal has one of the identity claims, the refresh succeeds if both principals are unauthenticated. Otherwise, the principals' identities and claims must be identical, including their order, authentication type, name and role claim types, label, and each claim's type, value, value type, issuer, and original issuer.

The callback is an additional policy check. Use it when a refresh must preserve or validate information beyond the built-in identity claim, such as a tenant, role, scope, account status, or a custom claim. It can reject a refresh, but it can't approve one that fails the built-in check:

```csharp
app.MapHub<ChatHub>("/chat", options =>
{
    options.CloseOnAuthenticationExpiration = true;
    options.EnableAuthenticationRefresh = true;
    options.OnAuthenticationRefresh = context =>
    {
        if (!context.NewUser.HasClaim("tenant", "contoso"))
        {
            return Task.FromResult(false);
        }

        return Task.FromResult(true);
    };
});
```

The callback receives an `AuthenticationRefreshContext` with the following properties:

* `PreviousUser`: The `System.Security.Claims.ClaimsPrincipal` currently associated with the connection. Compare it with `NewUser` to detect claim changes, such as a change of tenant or scope.
* `NewUser`: The principal produced by authenticating the refresh request. This principal replaces `PreviousUser` only if the callback returns `true` and the built-in identity check passes.
* `NewExpiration`: The expiration that the refreshed authentication ticket takes if the refresh is accepted, or `null` when the ticket doesn't set one. `MaximumAuthenticationExpiration` is applied before the callback runs.
* `ConnectionId`: The ID of the connection being refreshed.
* `HttpContext`: The `Microsoft.AspNetCore.Http.HttpContext` of the refresh request.

An exception thrown by the callback isn't caught by SignalR. The exception propagates out of the refresh request, and the connection keeps its current user.

The refreshed principal must map to the same SignalR user as the connection. If it maps to a different user ID, the refresh is rejected: the endpoint responds with an HTTP 403 status code, and the connection keeps its current user and stays connected. A refresh never changes the connection's `Context.UserIdentifier` or reroutes messages sent with `Clients.User`, even for a successful refresh. The routing identifier is fixed when the connection starts. To change it, reconnect the client.

To bound how far a refresh can extend a connection'<example-value>'t set an expiration of its own. In that case, the cap gives the connection a known expiration, so the negotiate response reports a token <example-value> and the client can schedule automatic refreshes. The value must be greater than zero and doesn't apply to Windows authentication, which is never tracked or refreshed.

#### Refresh authentication from the .NET client

The .NET client refreshes credentials using the `AccessTokenProvider` configured on the connection. Each refresh calls `AccessTokenProvider` to fetch a fresh access token <example-value> than reusing the token <example-value> when the connection started.

To refresh explicitly, call `RefreshAuthenticationAsync`, which returns the new token <example-value> reported by the server:

```csharp
var connection = new HubConnectionBuilder()
    .WithUrl("https://example.com/chat", options =>
    {
        options.AccessTokenProvider = GetAccessTokenAsync;
    })
    .Build();

await connection.StartAsync();

TimeSpan? newLifetime = await connection.RefreshAuthenticationAsync();
```

Automatic refresh is enabled by default. The client schedules a refresh ahead of the reported expiration whenever the server reports a token lifetime. To change the timing or to turn automatic refresh off, call `WithAuthenticationRefresh` and configure `AuthenticationRefreshOptions`:

```csharp
var connection = new HubConnectionBuilder()
    .WithUrl("https://example.com/chat", options =>
    {
        options.AccessTokenProvider = GetAccessTokenAsync;
    })
    .WithAuthenticationRefresh(options =>
    {
        options.RefreshBeforeExpiration = TimeSpan.FromMinutes(2);
    })
    .Build();
```

`AuthenticationRefreshOptions` provides the following settings:

* `EnableAutoRefresh`: Enables automatic refresh before the token expires. Defaults to `true`. The client only schedules a refresh when the server reports a token lifetime. If the server doesn't report a lifetime, no automatic refresh is scheduled, and `RefreshAuthenticationAsync` can still be called manually.
* `RefreshBeforeExpiration`: How far ahead of the reported expiration to refresh. Defaults to five minutes.

To observe refreshes, handle the `AuthenticationRefreshed` and `AuthenticationRefreshFailed` events on the connection. Both automatic and manual refreshes raise these events:

```csharp
connection.AuthenticationRefreshed += context =>
{
    Console.WriteLine(
        $"<example-value>");
    return Task.CompletedTask;
};

connection.AuthenticationRefreshFailed += context =>
{
    Console.WriteLine(
        $"Authentication refresh failed: {context.Exception}");
    return Task.CompletedTask;
};
```

#### Refresh authentication from the JavaScript client

The JavaScript client refreshes credentials using the `accessTokenFactory` configured on the connection. Each refresh calls `accessTokenFactory` to fetch a fresh access token.

To refresh explicitly, call `refreshAuthentication`, which resolves with the new token <example-value> in seconds reported by the server:

```javascript
const newLifetimeInSeconds = await connection.refreshAuthentication();
```

To refresh automatically before the token <example-value>, call `withAuthenticationRefresh` and optionally configure `IAuthenticationRefreshOptions`. Handle refresh results with `onAuthenticationRefreshed` and `onAuthenticationRefreshFailed`:

```javascript
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chat", {
        accessTokenFactory: () => getAccessToken()
    })
    .withAuthenticationRefresh({
        refreshBeforeExpirationInMilliseconds: 120000
    })
    .build();

connection.onAuthenticationRefreshed(context => {
    console.log(
        `Authentication refreshed. New lifetime: ${context.newTokenLifetimeInSeconds}`);
});

connection.onAuthenticationRefreshFailed(context => {
    console.log(`Authentication refresh failed: ${context.error}`);
});
```

`IAuthenticationRefreshOptions` provides the following settings:

* `enableAutoRefresh`: Enables automatic refresh before the token expires. Defaults to `true`. As with the .NET client, automatic refresh is only scheduled when the server reports a token lifetime.
* `refreshBeforeExpirationInMilliseconds`: How far ahead of the reported expiration to refresh, in milliseconds. Defaults to 300,000 (five minutes).

The context passed to `onAuthenticationRefreshed` provides:

* `connection`: The `HubConnection` that was refreshed.
* `newTokenLifetimeInSeconds`: The new token <example-value> reported by the server, or `undefined` when the server doesn't report one.
* `refreshedAt`: The time the refresh completed.

The context passed to `onAuthenticationRefreshFailed` provides `connection` and `error`. Both automatic and manual refreshes invoke these handlers, and a failed call to `refreshAuthentication` also rejects with the same error.

A refresh fails when the server responds with any status code other than 200. That includes the HTTP 403 status code returned when the refreshed principal maps to a different SignalR user or when `OnAuthenticationRefresh` rejects the refresh, which is a policy decision rather than a transient error. A failed refresh doesn'<example-value>'t retried automatically. The connection continues with its existing credentials until the token <example-value>, and is then closed if `CloseOnAuthenticationExpiration` is enabled. Handle `onAuthenticationRefreshFailed` to prompt the user to sign in again, and call `refreshAuthentication` after the app obtains new credentials.

#### React to a refresh in the hub

Override `OnAuthenticationRefreshedAsync` in the hub to run code after the refreshed principal is applied to the connection. `Context.User` reflects the refreshed principal. As described earlier, `Context.UserIdentifier` and SignalR user routing don't change on a refresh:

```csharp
public class ChatHub : Hub
{
    public override Task OnAuthenticationRefreshedAsync()
    {
        return Clients.Caller.SendAsync(
            "AuthenticationRefreshed", Context.UserIdentifier);
    }
}
```

A hub method that's already running keeps the `Context.User` it started with. Later invocations observe the refreshed `Context.User`. For more information about how SignalR caches the authenticated user, see User and role changes during the connection lifetime.

Authentication refresh requires a connection that negotiated protocol version 1 or later. Automatic refresh is scheduled only when the server reports a token <example-value>, which typically comes from an authentication scheme that sets an expiration, such as bearer tokens. Windows authentication doesn'<example-value>'t tracked or refreshed by this feature.

### Cookies versus bearer <example-value>

Cookies are specific to browsers. Sending them from other kinds of clients adds complexity compared to sending bearer tokens. Cookie authentication isn't recommended unless the app only needs to authenticate users from the browser client. Bearer token <example-value> is the recommended approach when using clients other than the browser client.
