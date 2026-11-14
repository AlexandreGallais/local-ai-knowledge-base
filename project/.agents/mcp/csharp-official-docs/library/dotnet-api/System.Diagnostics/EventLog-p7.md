---
title: "EventLog class (part 7 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLog.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLog class (part 7 of 15)

## EventLog.GetEventLogs() method

```csharp
public static System.Diagnostics.EventLog[] GetEventLogs ();
```

Searches for all event logs on the local computer and creates an array of `EventLog` objects that contain the list.

Returns: An array of type `EventLog` that represents the logs on the local computer.

Exceptions:

- `SystemException`: You do not have read access to the registry.

-or-

There is no event log service on the computer.

#### Remarks
The array of `EventLog` objects is a snapshot of all event logs on the local computer when the call to `EventLog.GetEventLogs` is made. This is not a dynamic collection, so it does not reflect the deletion or creation of logs in real time. You should verify that a log in the array exists before you read or write to it. The array usually includes at least three logs: Application, System, and Security. If you created custom logs on the local computer, they will appear in the array as well.

To retrieve the list of event logs, you must have the appropriate registry permissions. These permissions are identical to those required to call `EventLog.Exists` and `EventLog.SourceExists`.

#### Examples
The following example enumerates the event logs defined on the local computer, and displays configuration details for each event log.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/GetEventLogs/source1.cs._

## EventLog.GetEventLogs(String) method

```csharp
public static System.Diagnostics.EventLog[] GetEventLogs (string machineName);
```

Searches for all event logs on the given computer and creates an array of `EventLog` objects that contain the list.

Parameters:

- `machineName`: The computer on which to search for event logs.

Returns: An array of type `EventLog` that represents the logs on the given computer.

Exceptions:

- `ArgumentException`: The `machineName` parameter is an invalid computer name.
- `InvalidOperationException`: You do not have read access to the registry.

-or-

There is no event log service on the computer.

#### Remarks
The array of `EventLog` objects is a snapshot of all event logs on the computer specified by the `machineName` parameter when the call to `EventLog.GetEventLogs` is made. This is not a dynamic collection, so it does not reflect the deletion or creation of logs in real time. You should verify that a log in the array exists before you read or write to it. The array usually includes at least three logs: Application, System, and Security. If you created custom logs on the specified computer, they will appear in the array as well.

`EventLog.GetEventLogs` is a `static` method, so it can be called on the `EventLog` class itself. It is not necessary to create an instance of an `EventLog` object to make a call to the method.

To retrieve the list of event logs, you must have the appropriate registry permissions. These permissions are identical to those required to call `EventLog.Exists` and `EventLog.SourceExists`.

#### Examples
The following example gets a list of logs on the computer "myServer". It then outputs the name of each log.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/GetEventLogs/source.cs._

## EventLog.LogNameFromSourceName(String, String) method

```csharp
public static string LogNameFromSourceName (string source, string machineName);
```

Gets the name of the log to which the specified source is registered.

Parameters:

- `source`: The name of the event source.
- `machineName`: The name of the computer on which to look, or "." for the local computer.

Returns: The name of the log associated with the specified source in the registry.

#### Remarks
The event source indicates what logs the event. It is often the name of the application, or the name of a subcomponent of the application, if the application is large. Applications and services should write to the Application log or a custom log. Device drivers should write to the System log.

When you create a new source, which can only write to one log at a time, the system registers your application with the event log as a valid source of entries. The `Source` property can be any string, but the name cannot be used by other sources on the computer. An attempt to create a duplicated `EventLog.Source` value throws an exception. However, a single event log can have many different sources writing to it.

#### Examples
The following example deletes a source from the local computer. The example determines the log from its source, and then deletes the log.

> **Note:**
> More than one source might write to an event log. Before deleting a custom log, make sure there are no other sources writing to that log.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/Delete/source1.cs._

## EventLog.ModifyOverflowPolicy(OverflowAction, Int32) method

```csharp
public void ModifyOverflowPolicy (System.Diagnostics.OverflowAction action, int retentionDays);
```

Changes the configured behavior for writing new entries when the event log reaches its maximum file size.

Parameters:

- `action`: The overflow behavior for writing new entries to the event log. Must not be `OverwriteOlder`.
- `retentionDays`: Deprecated. Must be 0.

Exceptions:

- `InvalidEnumArgumentException`: `action` is not a valid `EventLog.OverflowAction` value.
- `ArgumentOutOfRangeException`: `retentionDays` is less than one, or larger than 365.
- `InvalidOperationException`: The `EventLog.Log` value is not a valid log name.

-or-

The registry key for the event log could not be opened on the target computer.

#### Remarks
The overflow behavior for an event log specifies what happens when new entries are to be written to a log that has reached its maximum file size.

> **Note:**
> The overflow behavior takes effect only when an event log reaches its maximum file size. The overflow behavior does not affect writing a new entry to a log that can accommodate additional event log entries.

The `EventLog.ModifyOverflowPolicy` method configures the overflow behavior of an event log. `EventLog` instance. After calling this method for the event log specified by the `Log` property, the `EventLog.OverflowAction` and `MinimumRetentionDays` property values reflect the newly configured overflow behavior.

> **Note:**
> This property represents a configuration setting for the event log represented by this instance. When the event log reaches its maximum size, this property specifies how the operating system handles new entries written by all event sources registered for the event log.

Set the `action` parameter to `OverwriteAsNeeded` to indicate that a new entry overwrites the oldest entry when the `EventLog` reaches its maximum size. If the `action` parameter is set to `OverwriteAsNeeded`, the `retentionDays` parameter value is ignored.

Set the `action` parameter to `DoNotOverwrite` to discard new events when the maximum log size is reached. If the `action` parameter is set to `DoNotOverwrite`, the `retentionDays` parameter value is ignored.

> **Warning:**
> Never set the `action` parameter to `OverwriteOlder`. This value is deprecated and might cause the log to behave as if the `DoNotOverwrite` parameter was passed instead.

> **Caution:**
> Setting the overflow policy to `DoNotOverwrite` specifies that new entries are discarded when the event log is full. If you use this setting, ensure the event log is regularly archived and cleared to avoid reaching its maximum size limit.

#### Examples
The following example displays the configured overflow policy for a specified event log, and allows the user to select a new overflow policy setting for the event log.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/GetEventLogs/source1.cs._

## EventLog.RegisterDisplayName(String, Int64) method

```csharp
public void RegisterDisplayName (string resourceFile, long resourceId);
```

Specifies the localized name of the event log, which is displayed in the server Event Viewer.

Parameters:

- `resourceFile`: The fully specified path to a localized resource file.
- `resourceId`: The resource identifier that indexes a localized string within the resource file.

Exceptions:

- `InvalidOperationException`: The `EventLog.Log` value is not a valid log name.

-or-

The registry key for the event log could not be opened on the target computer.
- `ArgumentNullException`: `resourceFile` is `null`.

#### Remarks
Use `EventLog.RegisterDisplayName` to register and display a localized name in the Event Viewer for custom event logs.

The specified resource identifier must correspond to a localized string defined in the resource file. The Event Viewer displays the custom event log name using the localized string and the current culture settings. For example, you can define multiple event log names localized for different cultures in your resource file. The Event Viewer displays the localized string corresponding to the culture settings of the current user.

If the Event Viewer cannot load the localized string from the resource file, or if no display name was registered for the event log, then the Event Viewer displays the event log name defined in `EventLog.Log`.

> **Note:**
> You do not need to register a display name for the pre-defined event logs. The operating system registers the localized display names for the Application, System, and Security event logs.

#### Examples
The following example determines whether the event source named `SampleApplicationSource` is registered on the local computer. If the event source does not exist, the example sets the message resource file for the source and creates the new event source. Finally, the example sets the localized display name for the event log, using the resource identifier value in `DisplayNameMsgId` and the resource file path in `messageFile`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventInstance/Overview/source.cs._

The example uses the following message text file, built into the resource library EventLogMsgs.dll. A message text file is the source from which the message resource file is created. The message text file defines the resource identifiers and text for the category, event message, and parameter insertion strings. Specifically, resource identifier 5001 is defined for the localized name of the event log.

```txt
; // EventLogMsgs.mc
; // ********************************************************

; // Use the following commands to build this file:

; //   mc -s EventLogMsgs.mc
; //   rc EventLogMsgs.rc
; //   link /DLL /SUBSYSTEM:WINDOWS /NOENTRY /MACHINE:x86 EventLogMsgs.Res
; // ********************************************************

; // - Event categories -
; // Categories must be numbered consecutively starting at 1.
; // ********************************************************

MessageId=0x1
Severity=Success
SymbolicName=INSTALL_CATEGORY
Language=English
Installation
.

MessageId=0x2
Severity=Success
SymbolicName=QUERY_CATEGORY
Language=English
Database Query
.

MessageId=0x3
Severity=Success
SymbolicName=REFRESH_CATEGORY
Language=English
Data Refresh
.

; // - Event messages -
; // *********************************

MessageId = 1000
Severity = Success
Facility = Application
SymbolicName = AUDIT_SUCCESS_MESSAGE_ID_1000
Language=English
My application message text, in English, for message id 1000, called from %1.
.

MessageId = 1001
Severity = Warning
Facility = Application
SymbolicName = AUDIT_FAILED_MESSAGE_ID_1001
Language=English
My application message text, in English, for message id 1001, called from %1.
.

MessageId = 1002
Severity = Success
Facility = Application
SymbolicName = GENERIC_INFO_MESSAGE_ID_1002
Language=English
My generic information message in English, for message id 1002.
.

MessageId = 1003
Severity = Warning
Facility = Application
SymbolicName = GENERIC_WARNING_MESSAGE_ID_1003
Language=English
My generic warning message in English, for message id 1003, called from %1.
.

MessageId = 1004
Severity = Success
Facility = Application
SymbolicName = UPDATE_CYCLE_COMPLETE_MESSAGE_ID_1004
Language=English
The update cycle is complete for %%5002.
.

MessageId = 1005
Severity = Warning
Facility = Application
SymbolicName = SERVER_CONNECTION_DOWN_MESSAGE_ID_1005
Language=English
The refresh operation did not complete because the connection to server %1 could not be established.
.

; // - Event log display name -
; // ********************************************************

MessageId = 5001
Severity = Success
Facility = Application
SymbolicName = EVENT_LOG_DISPLAY_NAME_MSGID
Language=English
Sample Event Log
.

; // - Event message parameters -
; //   Language independent insertion strings
; // ********************************************************

MessageId = 5002
Severity = Success
Facility = Application
SymbolicName = EVENT_LOG_SERVICE_NAME_MSGID
Language=English
SVC_UPDATE.EXE
.
```
