---
title: "EventLog class (part 4 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLog.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLog class (part 4 of 15)

## EventLog.CreateEventSource(EventSourceCreationData) method

```csharp
public static void CreateEventSource (System.Diagnostics.EventSourceCreationData sourceData);
```

Establishes a valid event source for writing localized event messages, using the specified configuration properties for the event source and the corresponding event log.

Parameters:

- `sourceData`: The configuration properties for the event source and its target event log.

Exceptions:

- `ArgumentException`: The computer name specified in `sourceData` is not valid.

-or-

The source name specified in `sourceData` is `null`.

-or-

The log name specified in `sourceData` is not valid. Event log names must consist of printable characters and cannot include the characters '*', '?', or '\\'.

-or-

The log name specified in `sourceData` is not valid for user log creation. The Event log names AppEvent, SysEvent, and SecEvent are reserved for system use.

-or-

The log name matches an existing event source name.

-or-

The source name specified in `sourceData` results in a registry key path longer than 254 characters.

-or-

The first 8 characters of the log name specified in `sourceData` are not unique.

-or-

The source name specified in `sourceData` is already registered.

-or-

The source name specified in `sourceData` matches an existing event log name.
- `InvalidOperationException`: The registry key for the event log could not be opened.
- `ArgumentNullException`: `sourceData` is `null`.

#### Remarks
Use this overload to configure a new source for writing entries to an event log on the local computer or a remote computer. It is not necessary to use this method to read from an event log.

The `EventLog.CreateEventSource` method uses the input `sourceData` `EventSourceCreationData.Source`, `EventSourceCreationData.LogName` and `EventSourceCreationData.MachineName` properties to create registry values on the target computer for the new source and its associated event log. A new source name cannot match an existing source name or an existing event log name on the target computer. If the `LogName` property is not set, the source is registered for the Application event log. If the `EventSourceCreationData.MachineName` is not set, the source is registered on the local computer.

> **Note:**
> To create an event source on Windows, you must have administrative privileges.
>
> The reason for this requirement is that all event logs, including security, must be searched to determine whether the event source is unique. Starting with Windows Vista, users do not have permission to access the security log; therefore, a `SecurityException` is thrown.
>
> Starting with Windows Vista, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses the security log, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

Use `EventLog.WriteEvent` and `EventLog.WriteEntry` to write events to an event log. You must specify an event source to write events; you must create and configure the event source before writing the first entry with the source.

Create the new event source during the installation of your application. This allows time for the operating system to refresh its list of registered event sources and their configuration. If the operating system has not refreshed its list of event sources, and you attempt to write an event with the new source, the write operation will fail. You can configure a new source using an `EventLogInstaller`, or using the `EventLog.CreateEventSource` method. You must have administrative rights on the computer to create a new event source.

You can create an event source for an existing event log or a new event log. When you create a new source for a new event log, the system registers the source for that log, but the log is not created until the first entry is written to it.

The operating system stores event logs as files. When you use `EventLogInstaller` or `EventLog.CreateEventSource` to create a new event log, the associated file is stored in the %SystemRoot%\System32\Config directory on the specified computer. The file name is set by appending the first 8 characters of the `Log` property with the ".evt" file name extension.

Each source can only write to only one event log at a time; however, your application can use multiple sources to write to multiple event logs. For example, your application might require multiple sources configured for different event logs or different resource files.

You can register the event source with localized resource file(s) for your event category and message strings. Your application can write event log entries using resource identifiers, rather than specifying the actual string. The Event Viewer uses the resource identifier to find and display the corresponding string from the localized resource file based on current language settings. You can register a separate file for event categories, messages and parameter insertion strings, or you can register the same resource file for all three types of strings. Use the `EventSourceCreationData.CategoryCount`, `EventSourceCreationData.CategoryResourceFile`, `EventSourceCreationData.MessageResourceFile`, and `EventSourceCreationData.ParameterResourceFile` properties to configure the source to write localized entries to the event log. If your application writes strings values directly to the event log, you do not need to set these properties.

The source must be configured either for writing localized entries or for writing direct strings. If your application writes entries using both resource identifiers and string values, you must register two separate sources. For example, configure one source with resource files, and then use that source in the `EventLog.WriteEvent` method to write entries using resource identifiers to the event log. Then create a different source without resource files, and use that source in the `EventLog.WriteEntry` method to write strings directly to the event log using that source.

To change the configuration details of an existing source, you must delete the source and then create it with the new configuration. If other applications or components use the existing source, create a new source with the updated configuration rather than deleting the existing source.

> **Note:**
> If a source is configured for an event log, and you reconfigure it for another event log, you must restart the computer for the changes to take effect.

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
