---
title: "EventLogEntryType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLogEntryType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLogEntryType enum

Namespace: `System.Diagnostics`

```csharp
public enum EventLogEntryType
```

Specifies the event type of an event log entry.

#### Remarks
The type of an event log entry provides additional information for the entry.  Applications set the entry type when they write the entry to the event log.

Each event must be of a single type; the event types cannot be combined for an entry.  The Event Viewer uses this type to determine which icon to display in the list view of the log.

#### Examples
The following code example demonstrates how to use the `EventLogEntryType` class to add information about triggered events to a log file. In this example, a `switch` statement is used to determine the event type. Each `case` statement uses the `EventLogEntryType` to specify the event type, gets the message and ID, and then writes the information to the log.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLogEntryType/Overview/eventlogentrytype_6.cs._

## EventLogEntryType.Error field

```csharp
Error
```

An error event. This indicates a significant problem the user should know about; usually a loss of functionality or data.

## EventLogEntryType.FailureAudit field

```csharp
FailureAudit
```

A failure audit event. This indicates a security event that occurs when an audited access attempt fails; for example, a failed attempt to open a file.

## EventLogEntryType.Information field

```csharp
Information
```

An information event. This indicates a significant, successful operation.

## EventLogEntryType.SuccessAudit field

```csharp
SuccessAudit
```

A success audit event. This indicates a security event that occurs when an audited access attempt is successful; for example, logging on successfully.

## EventLogEntryType.Warning field

```csharp
Warning
```

A warning event. This indicates a problem that is not immediately significant, but that may signify conditions that could cause future problems.
