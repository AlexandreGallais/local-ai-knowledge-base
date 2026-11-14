---
title: "EventLogPermissionAccess enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLogPermissionAccess.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLogPermissionAccess enum

Namespace: `System.Diagnostics`

```csharp
public enum EventLogPermissionAccess
```

Defines access levels used by `EventLog` permission classes.

To be added.

## EventLogPermissionAccess.Administer field

```csharp
Administer
```

The `EventLog` can create an event source, read existing logs, delete event sources or logs, respond to entries, clear an event log, listen to events, and access a collection of all event logs.

## EventLogPermissionAccess.Audit field

```csharp
Audit
```

The `EventLog` can read existing logs, delete event sources or logs, respond to entries, clear an event log, listen to events, and access a collection of all event logs. `Note` This member is now obsolete, use `EventLogPermissionAccess.Administer` instead.

## EventLogPermissionAccess.Browse field

```csharp
Browse
```

The `EventLog` can read existing logs. `Note` This member is now obsolete, use `EventLogPermissionAccess.Administer` instead.

## EventLogPermissionAccess.Instrument field

```csharp
Instrument
```

The `EventLog` can read or write to existing logs, and create event sources and logs. `Note` This member is now obsolete, use `EventLogPermissionAccess.Write` instead.

## EventLogPermissionAccess.None field

```csharp
None
```

The `EventLog` has no permissions.

## EventLogPermissionAccess.Write field

```csharp
Write
```

The `EventLog` can write to existing logs, and create event sources and logs.
