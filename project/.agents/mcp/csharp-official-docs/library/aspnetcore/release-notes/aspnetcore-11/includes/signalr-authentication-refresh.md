---
title: "signalr-authentication-refresh"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-11/includes/signalr-authentication-refresh.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# signalr-authentication-refresh

### SignalR authentication refresh

SignalR connections can refresh authentication without dropping the connection when the access token expires. The server exposes a `/refresh` endpoint alongside `/negotiate` and reports the token <example-value> in the negotiate response. A client re-authenticates before the token <example-value>, so a hub connection that previously closed when its bearer token aged out can stay open.

Enable the feature per hub on the server. The server can inspect or reject a refreshed identity by returning a value from `OnAuthenticationRefresh`:

```csharp
using System.Security.Claims;

app.MapHub<ChatHub>("/chat", options =>
{
    options.EnableAuthenticationRefresh = true;
    options.CloseOnAuthenticationExpiration = true;

    // Optional: inspect the refreshed identity and decide whether to accept it.
    options.OnAuthenticationRefresh = context =>
    {
        var previousSubject = context.PreviousUser.FindFirstValue("sub")
            ?? context.PreviousUser.FindFirstValue(ClaimTypes.NameIdentifier);
        var newSubject = context.NewUser.FindFirstValue("sub")
            ?? context.NewUser.FindFirstValue(ClaimTypes.NameIdentifier);

        return Task.FromResult(
            previousSubject is not null &&
            string.Equals(previousSubject, newSubject, StringComparison.Ordinal));
    };
});
```

A hub can react to a refreshed identity by overriding `OnAuthenticationRefreshedAsync`:

```csharp
public class ChatHub : Hub
{
    public override Task OnAuthenticationRefreshedAsync()
    {
        // The connection's User has been updated with the refreshed token.
        return Task.CompletedTask;
    }
}
```

Automatic refresh is on by default in the .NET client and is configurable with `WithAuthenticationRefresh`. Refresh notifications are events on `Microsoft.AspNetCore.SignalR.Client.HubConnection`, and `RefreshAuthenticationAsync` requests an immediate refresh after the app obtains new claims:

```csharp
await using var connection = new HubConnectionBuilder()
    .WithUrl("https://example.com/chat")
    .WithAuthenticationRefresh(options =>
    {
        // EnableAutoRefresh is true by default.
        options.RefreshBeforeExpiration = TimeSpan.FromMinutes(1);
    })
    .Build();

connection.AuthenticationRefreshed += context => Task.CompletedTask;
connection.AuthenticationRefreshFailed += context => Task.CompletedTask;

await connection.StartAsync();

// Refresh immediately after acquiring a token with updated claims.
await connection.RefreshAuthenticationAsync();
```
