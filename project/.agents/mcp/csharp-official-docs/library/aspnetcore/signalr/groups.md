---
title: "Manage users and groups in SignalR"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/signalr/groups.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Manage users and groups in SignalR

By Brennan Conroy

SignalR allows messages to be sent to all connections associated with a specific user and to named groups of connections.

View or download sample code (how to download)

## Users in SignalR

A single user in SignalR can have multiple connections to an app. For example, a user could be connected on their desktop as well as their phone. Each device has a separate SignalR connection, but they're all associated with the same user. If a message is sent to the user, all of the connections associated with that user receive the message. The user identifier for a connection can be accessed by the `Context.UserIdentifier` property in the hub.

By default, SignalR uses the `ClaimTypes.NameIdentifier` from the `ClaimsPrincipal` associated with the connection as the user identifier. To customize this behavior, see Use claims to customize identity handling.

Send a message to a specific user by passing the user identifier to the `User` function in a hub method, as shown in the following example:

> **Note:**
> The user identifier is case-sensitive.

```csharp
public Task SendPrivateMessage(string user, string message)
{
    return Clients.User(user).SendAsync("ReceiveMessage", message);
}
```

## Groups in SignalR

A group is a collection of connections associated with a name. Messages can be sent to all connections in a group. Groups are the recommended way to send to a connection or multiple connections because the groups are managed by the application. A connection can be a member of multiple groups. Groups are ideal for something like a chat application, where each room can be represented as a group.

### Add or remove connections from a group

Connections are added to or removed from groups via the `AddToGroupAsync` and `RemoveFromGroupAsync` methods:

```csharp
public async Task AddToGroup(string groupName)
{
    await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

    await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has joined the group {groupName}.");
}

public async Task RemoveFromGroup(string groupName)
{
    await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

    await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
}
```

It's safe to add a user to a group multiple times, no exception is thrown in the case that the user already exists in the group.

Group membership isn't preserved when a connection reconnects. The connection needs to rejoin the group when it's re-established. It's not possible to count the members of a group, since this information isn't available if the application is scaled to multiple servers.

Groups are kept in memory, so they won't persist through a server restart. Consider the Azure SignalR service for scenarios requiring group membership to be persisted. For more information, see Azure SignalR

To protect access to resources while using groups, use authentication and authorization functionality in ASP.NET Core. If a user is added to a group only when the credentials are valid for that group, messages sent to that group will only go to authorized users. However, groups are not a security feature. Authentication claims have features that groups don't, such as expiry and revocation. If a user's permission to access the group is revoked, the app must remove the user from the group explicitly.

> **Note:**
> Group names are case-sensitive.

## Related content

* Get started with ASP.NET Core SignalR
* Use hubs in ASP.NET Core SignalR
* Publish an ASP.NET Core SignalR app to Azure App Service
