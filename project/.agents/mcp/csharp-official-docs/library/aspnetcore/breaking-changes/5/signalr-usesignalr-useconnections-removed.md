---
title: "Breaking change: SignalR: UseSignalR and UseConnections methods removed"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/5/signalr-usesignalr-useconnections-removed.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# SignalR: UseSignalR and UseConnections methods removed

In ASP.NET Core 3.0, SignalR adopted endpoint routing. As part of that change, the `Microsoft.AspNetCore.Builder.SignalRAppBuilderExtensions.UseSignalR*`, `Microsoft.AspNetCore.Builder.ConnectionsAppBuilderExtensions.UseConnections*`, and some related methods were marked as obsolete. In ASP.NET Core 5.0, those obsolete methods were removed. For the full list of methods, see Affected APIs.

For discussion on this issue, see dotnet/aspnetcore#20082.

## Version introduced

5.0 Preview 3

## Old behavior

SignalR hubs and connection handlers could be registered in the middleware pipeline using the `UseSignalR` or `UseConnections` methods.

## New behavior

SignalR hubs and connection handlers should be registered within `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints*` using the `Microsoft.AspNetCore.SignalR.HubRouteBuilder.MapHub*` and `Microsoft.AspNetCore.Http.Connections.ConnectionsRouteBuilder.MapConnectionHandler*` extension methods on `Microsoft.AspNetCore.Routing.IEndpointRouteBuilder`.

## Reason for change

The old methods had custom routing logic that didn't interact with other routing components in ASP.NET Core. In ASP.NET Core 3.0, a new general-purpose routing system, called endpoint routing, was introduced. Endpoint routing enabled SignalR to interact with other routing components. Switching to this model allows users to realize the full benefits of endpoint routing. Consequently, the old methods have been removed.

## Recommended action

Remove code that calls `UseSignalR` or `UseConnections` from your project's `Startup.Configure` method. Replace it with calls to `MapHub` or `MapConnectionHandler`, respectively, within the body of a call to `UseEndpoints`. For example:

**Old code:**

```csharp
app.UseSignalR(routes =>
{
    routes.MapHub<SomeHub>("/path");
});
```

**New code:**

```csharp
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<SomeHub>("/path");
});
```

In general, your previous `MapHub` and `MapConnectionHandler` calls can be transferred directly from the body of `UseSignalR` and `UseConnections` to `UseEndpoints` with little-to-no change needed.

## Affected APIs

- `Microsoft.AspNetCore.Builder.ConnectionsAppBuilderExtensions.UseConnections*`
- `Microsoft.AspNetCore.Builder.SignalRAppBuilderExtensions.UseSignalR*`
- `Microsoft.AspNetCore.Http.Connections.ConnectionsRouteBuilder.MapConnections*`
- `Microsoft.AspNetCore.Http.Connections.ConnectionsRouteBuilder.MapConnectionHandler*`
- `Microsoft.AspNetCore.SignalR.HubRouteBuilder.MapHub*`
