---
title: "EventLog class (part 2 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLog.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLog class (part 2 of 15)

## EventLog.EnableRaisingEvents property

```csharp
public bool EnableRaisingEvents { get; set; }
```

Gets or sets a value indicating whether the `EventLog` receives `EventLog.EntryWritten` event notifications.

Returns: `true` if the `EventLog` receives notification when an entry is written to the log; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The event log is on a remote computer.

#### Remarks
The `EnableRaisingEvents` property determines whether the `EventLog` raises events when entries are written to the log. When the property is `true`, components that receive the `EntryWritten` event will receive notification any time an entry is written to the log that is specified in the `Log` property. If `EventLog.EnableRaisingEvents` is `false`, no events are raised.

> **Note:**
> You can receive event notifications only when entries are written on the local computer. You cannot receive notifications for entries written on remote computers.

#### Examples
The following example handles an `EntryWritten` event.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/EnableRaisingEvents/source.cs._

## EventLog.Entries property

```csharp
public System.Diagnostics.EventLogEntryCollection Entries { get; }
```

Gets the contents of the event log.

Returns: An `EventLogEntryCollection` holding the entries in the event log. Each entry is associated with an instance of the `EventLogEntry` class.

#### Remarks
Use the `EventLog.Entries` member when reading from the event log.

Because the property is read-only, you cannot modify an entry or write to the log using `EventLog.Entries`. Instead, specify a `EventLog.Source` and call `EventLog.WriteEntry` to write a new log entry. You can use `EventLog.Entries` to count the number of entries in the event log, and view each `EventLogEntry` in the collection. Use the indexed `EventLogEntryCollection.Item` member to retrieve information about a specific entry, such as `EventLogEntry.Message`, `EventLogEntry.Category`, `EventLogEntry.TimeWritten`, or `EventLogEntry.EntryType`.

It is not necessary to specify a `EventLog.Source` when only reading from a log. You can specify only the `EventLog.Log` name and `EventLog.MachineName` (server computer name) properties for the `EventLog` instance. In either case, the `EventLog.Entries` member is automatically populated with the event log's list of entries. You can select the appropriate index for an item in this list to read individual entries.

An important distinction between reading and writing log entries is that it is not necessary to explicitly call a read method. After the `EventLog.Log` and `EventLog.MachineName` are specified, the `Entries` property is automatically populated. If you change the value of the `EventLog.Log` or `MachineName` property, the `Entries` property is repopulated the next time you read it.

> **Note:**
> You are not required to specify the `EventLog.MachineName` if you are connecting to a log. If you do not specify the `EventLog.MachineName`, the local computer, ".", is assumed.

#### Examples
The following example reads entries in the event log, "MyNewLog", on the local computer.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/Entries/source.cs._

## EventLog.Log property

```csharp
public string Log { get; set; }
```

Gets or sets the name of the log to read from or write to.

Returns: The name of the log. This can be Application, System, Security, or a custom log name. The default is an empty string ("").

#### Remarks
Three log files exist by default on the server: Application, System, and Security. Applications and services use the Application log file. Device drivers use the System log file. The system generates success and failure audit events in the Security log when auditing is turned on. If you have other applications installed, like Active Directory on Windows servers, there might be other default log files. In addition, you can create custom log files on a local or remote computer. Custom logs help organize your entries in a more detailed way than is allowed when your components write events to the default Application log.

> **Note:**
> Log names are limited to eight characters. According to the system, MyLogSample1 and MyLogSample2 are the same log.

If you write to an event log, it is not enough to specify the `Log` property. You must associate a `Source` property with your event log resource to connect it to a particular log. It is not necessary to specify a `EventLog.Source` when only reading from a log, but an event source must be associated with the event log resource in the server's registry. You can specify only the `EventLog.Log` name and `EventLog.MachineName` (server computer name) to read from it.

> **Note:**
> You are not required to specify the `EventLog.MachineName` if you are connecting to a log. If you do not specify the `EventLog.MachineName`, the local computer (".") is assumed.

If the `Source` property has not been specified, a call to `EventLog.Log` returns an empty string if `EventLog.Log` has not been explicitly set (by setting the `Log` property, or through the constructor). If the `EventLog.Source` has been specified, `EventLog.Log` returns the name of the log to which that source was registered.

A source can only be registered to one log at a time. If the `Source` property was set for an instance of `EventLog`, you cannot change the `Log` property for that `EventLog` without changing the value of `EventLog.Source` or calling `EventLog.DeleteEventSource` first. If you change the `Log` property after the `Source` property has been set, writing a log entry throws an exception.

The operating system stores event logs as files. When you use `EventLogInstaller` or `EventLog.CreateEventSource` to create a new event log, the associated file is stored in the %SystemRoot%\System32\Config directory on the specified computer. The file name is set by appending the first 8 characters of the `Log` property with the ".evt" file name extension.

You cannot create a new log using the `Log` property alone (without specifying a source for the log). You can call `EventLog.CreateEventSource`, passing in a new log name as a parameter, and then call `EventLog.DeleteEventSource`. However, the intent is usually either to create (and write entries to) new application-specific logs, or to read from existing logs.

If the `EventLog.Log` value changes, the event log is closed and all event handles are released.

> **Caution:**
> If you set the `Log` property to the name of a log that does not exist, the system attaches the `EventLog` to the Application log, but does not warn you that it is using a log other than the one you specified.

#### Examples
The following example reads entries in the event log, "NewEventLog", on the local computer.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/Log/source.cs._

## EventLog.LogDisplayName property

```csharp
public string? LogDisplayName { get; }
```

Gets the event log's friendly name.

Returns: A name that represents the event log in the system's event viewer.

Exceptions:

- `InvalidOperationException`: The specified `EventLog.Log` does not exist in the registry for this computer.

#### Remarks

> **Note:**
> In Windows Vista and later, users do not have permission to access the security log. If you are running Windows Vista or later as a user, you will get a `SecurityException` when you attempt to access the display name for an event in the security log.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses the security log, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

#### Examples
The following example enumerates the event logs defined on the local computer and displays the `EventLog.LogDisplayName` for each event log.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/GetEventLogs/source1.cs._

## EventLog.MachineName property

```csharp
public string MachineName { get; set; }
```

Gets or sets the name of the computer on which to read or write events.

Returns: The name of the server on which the event log resides. The default is the local computer (".").

Exceptions:

- `ArgumentException`: The computer name is invalid.

#### Remarks
If you write to an event log, you must associate a `EventLog.Source` with your event log object to connect it to a particular log. It is not necessary to specify the `Source` property when only reading from a log. You can specify only the `EventLog.Log` name and `EventLog.MachineName` (server computer name).

> **Note:**
> You need not specify the `EventLog.MachineName` if you are connecting to a log. If you do not specify the `EventLog.MachineName`, the local computer (".") is assumed.

A source can only be registered to one log at a time. If the `Source` property was set for an instance of `EventLog`, you cannot change the `MachineName` property for that `EventLog` without changing the value of `EventLog.Source` or calling `EventLog.DeleteEventSource` first. If you change the `MachineName` property, the `EventLog` closes all handles and reattaches to the log and source on the new computer.

The `EventLog.MachineName` value cannot be an empty string. If it is not explicitly set, it defaults to the local computer (".").

#### Examples
The following example reads entries in the event log, "NewEventLog", on a specified computer.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/MachineName/source.cs._

## EventLog.MaximumKilobytes property

```csharp
public long MaximumKilobytes { get; set; }
```

Gets or sets the maximum event log size in kilobytes.

Returns: The maximum event log size in kilobytes. The default is 512, indicating a maximum file size of 512 kilobytes.

Exceptions:

- `ArgumentOutOfRangeException`: The specified value is less than 64, or greater than 4194240, or not an even multiple of 64.
- `InvalidOperationException`: The `EventLog.Log` value is not a valid log name.

-or-

The registry key for the event log could not be opened on the target computer.

#### Remarks
The `MaximumKilobytes` property represents the size limit of the event log file. When the event log reaches the size limit, the configured `EventLog.OverflowAction` value determines whether new entries are discarded, or whether new entries overwrite older entries.

> **Note:**
> This property represents a configuration setting for the event log represented by this instance. When the event log reaches its maximum size, this property specifies how the operating system handles new entries written by all event sources registered for the event log.

#### Examples
The following example enumerates the event logs defined on the local computer, and displays configuration details for each event log.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/GetEventLogs/source1.cs._

## EventLog.MinimumRetentionDays property

```csharp
public int MinimumRetentionDays { get; }
```

This property is deprecated.

Returns: To be added.

#### Remarks

> **Important:**
> Support for the `MinimumRetentionDays` property was removed in Windows Vista and later operating systems. Setting this value can cause the Event Log to never overwrite events, and to drop all events to the channel once it is full.

#### Examples
The following example enumerates the event logs defined on the local computer, and displays configuration details for each event log.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/GetEventLogs/source1.cs._

## EventLog.OverflowAction property

```csharp
public System.Diagnostics.OverflowAction OverflowAction { get; }
```

Gets the configured behavior for storing new entries when the event log reaches its maximum log file size.

Returns: The `OverflowAction` value that specifies the configured behavior for storing new entries when the event log reaches its maximum log size. The default is `OverflowAction.OverwriteOlder`.

#### Remarks
Event logs grow in size as new events are written to them. Each event log has a configured maximum size limit; the `MaximumKilobytes` property defines the maximum number of kilobytes allowed for the event log file size.

Use the `OverflowAction` property value to examine the configured overflow behavior for an event log at its maximum size. Use the `EventLog.ModifyOverflowPolicy` method to change the overflow behavior for an event log.

> **Note:**
> The overflow behavior takes effect only when an event log reaches its maximum file size. The overflow behavior does not affect writing a new entry to a log that can accommodate additional event log entries.

#### Examples
The following example enumerates the event logs defined on the local computer, and displays configuration details for each event log.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/GetEventLogs/source1.cs._
