---
title: "OverflowAction enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/OverflowAction.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OverflowAction enum

Namespace: `System.Diagnostics`

```csharp
public enum OverflowAction
```

Specifies how to handle entries in an event log that has reached its maximum file size.

#### Remarks
Every event log has a maximum size limit and a configurable setting that provides the rule for writing new entries at that limit. When the event log has reached its maximum size, you can specify one of the following rules:

- New entries will be discarded.

- New entries will overwrite older entries.

Use the `EventLog.ModifyOverflowPolicy` method to set the overflow behavior for an `EventLog`. Check the current configured behavior of an `EventLog` through its `OverflowAction` property.

> **Warning:**
> The `OverwriteOlder` behavior is deprecated. Using this value might cause the Event Log to behave as if the `DoNotOverwrite` value was used instead, which will cause events to be discarded when the log is full.

#### Examples

The following example enumerates the event logs defined on the local computer and displays configuration details for each event log.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/GetEventLogs/source1.cs._

## OverflowAction.DoNotOverwrite field

```csharp
DoNotOverwrite
```

Indicates that existing entries are retained when the event log is full and new entries are discarded.

## OverflowAction.OverwriteAsNeeded field

```csharp
OverwriteAsNeeded
```

Indicates that each new entry overwrites the oldest entry when the event log is full.

## OverflowAction.OverwriteOlder field

```csharp
OverwriteOlder
```

This field is deprecated.

> **Warning:**
> Do not use this value. Doing so might cause the Event Log to behave as if the `DoNotOverwrite` value was used instead.
