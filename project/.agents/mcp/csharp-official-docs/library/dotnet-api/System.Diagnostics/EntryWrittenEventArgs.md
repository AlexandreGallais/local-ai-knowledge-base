---
title: "EntryWrittenEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EntryWrittenEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EntryWrittenEventArgs class

Namespace: `System.Diagnostics`

```csharp
public class EntryWrittenEventArgs : EventArgs
```

Provides data for the `EventLog.EntryWritten` event.

#### Examples
The following example demonstrates the `EntryWrittenEventArgs.%23ctor` constructor. It creates a custom `EventLog` object and writes an entry into it. Then it creates an `EntryWrittenEventArgs` object using the first entry in the custom `EventLog`. This object is used to notify a message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EntryWrittenEventArgs/Overview/entrywritteneventargs_ctor1.cs._

## EntryWrittenEventArgs.EntryWrittenEventArgs() constructor

```csharp
public EntryWrittenEventArgs ();
```

Initializes a new instance of the `EntryWrittenEventArgs` class.

#### Examples
The following example demonstrates the `EntryWrittenEventArgs.%23ctor` constructor. It creates a custom `EventLog` object and writes an entry into it. Then it creates an `EntryWrittenEventArgs` object using the first entry in the custom `EventLog`. This object is used to notify a message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EntryWrittenEventArgs/Overview/entrywritteneventargs_ctor1.cs._

## EntryWrittenEventArgs.EntryWrittenEventArgs(EventLogEntry) constructor

```csharp
public EntryWrittenEventArgs (System.Diagnostics.EventLogEntry? entry);
```

Initializes a new instance of the `EntryWrittenEventArgs` class with the specified event log entry.

Parameters:

- `entry`: An `EventLogEntry` that represents the entry that was written.

#### Examples
The following example demonstrates the `EntryWrittenEventArgs.%23ctor` constructor. It creates a custom `EventLog` object and writes an entry into it. Then it creates an `EntryWrittenEventArgs` object using the first entry in the custom `EventLog`. This object is used to notify a message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EntryWrittenEventArgs/.ctor/entrywritteneventargs_ctor2.cs._

## EntryWrittenEventArgs.Entry property

```csharp
public System.Diagnostics.EventLogEntry? Entry { get; }
```

Gets the event log entry that was written to the log.

Returns: An `EventLogEntry` that represents the entry that was written to the event log.

#### Examples
The following example assumes that you have already implemented the sample in `%23ctor`.

It creates a custom `EventLog` object and writes an entry into it. Then it creates an `EntryWrittenEventArgs` object using the first entry in the custom EventLog. This object is used to notify a message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EntryWrittenEventArgs/.ctor/entrywritteneventargs_ctor2.cs._
