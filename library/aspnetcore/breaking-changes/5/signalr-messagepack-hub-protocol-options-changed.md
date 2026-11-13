---
title: "Breaking change: SignalR: MessagePack Hub Protocol options type changed"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/5/signalr-messagepack-hub-protocol-options-changed.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# SignalR: MessagePack Hub Protocol options type changed

The ASP.NET Core SignalR MessagePack Hub Protocol options type has changed from `IList<MessagePack.IFormatterResolver>` to the MessagePack library's `MessagePackSerializerOptions` type.

For discussion on this change, see dotnet/aspnetcore#20506.

## Version introduced

5.0 Preview 4

## Old behavior

You can add to the options as shown in the following example:

```csharp
services.AddSignalR()
    .AddMessagePackProtocol(options =>
    {
        options.FormatterResolvers.Add(MessagePack.Resolvers.StandardResolver.Instance);
    });
```

And replace the options as follows:

```csharp
services.AddSignalR()
    .AddMessagePackProtocol(options =>
    {
        options.FormatterResolvers = new List<MessagePack.IFormatterResolver>()
        {
            MessagePack.Resolvers.StandardResolver.Instance
        };
    });
```

## New behavior

You can add to the options as shown in the following example:

```csharp
services.AddSignalR()
    .AddMessagePackProtocol(options =>
    {
        options.SerializerOptions =
            options.SerializeOptions.WithResolver(MessagePack.Resolvers.StandardResolver.Instance);
    });
```

And replace the options as follows:

```csharp
services.AddSignalR()
    .AddMessagePackProtocol(options =>
    {
        options.SerializerOptions = MessagePackSerializerOptions
                .Standard
                .WithResolver(MessagePack.Resolvers.StandardResolver.Instance)
                .WithSecurity(MessagePackSecurity.UntrustedData);
    });
```

## Reason for change

This change is part of moving to MessagePack v2.x, which was announced in aspnet/Announcements#404. The v2.x library has added an options API that's easier to use and provides more features than the list of `MessagePack.IFormatterResolver` that was exposed before.

## Recommended action

This breaking change affects anyone who is configuring values on `Microsoft.AspNetCore.SignalR.MessagePackHubProtocolOptions`. If you're using the ASP.NET Core SignalR MessagePack Hub Protocol and modifying the options, update your usage to use the new options API as shown above.

## Affected APIs

`Microsoft.AspNetCore.SignalR.MessagePackHubProtocolOptions`
