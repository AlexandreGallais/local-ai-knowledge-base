---
title: "EventCommand enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventCommand.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventCommand enum

Namespace: `System.Diagnostics.Tracing`

```csharp
public enum EventCommand
```

Describes the command (`EventCommandEventArgs.Command` property) that is passed to the `EventSource.OnEventCommand` callback.

To be added.

## EventCommand.Disable field

```csharp
Disable
```

Disable the event.

## EventCommand.Enable field

```csharp
Enable
```

Enable the event.

## EventCommand.SendManifest field

```csharp
SendManifest
```

Send the manifest.

## EventCommand.Update field

```csharp
Update
```

Update the event.
