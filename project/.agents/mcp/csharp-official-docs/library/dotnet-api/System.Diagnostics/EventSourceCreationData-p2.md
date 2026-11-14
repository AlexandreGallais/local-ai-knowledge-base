---
title: "EventSourceCreationData class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventSourceCreationData.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventSourceCreationData class (part 2 of 3)

## EventSourceCreationData.CategoryCount property

```csharp
public int CategoryCount { get; set; }
```

Gets or sets the number of categories in the category resource file.

Returns: The number of categories in the category resource file. The default value is zero.

Exceptions:

- `ArgumentOutOfRangeException`: The property is set to a negative value or to a value larger than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Remarks
Use the `EventSourceCreationData.CategoryCount` and `EventSourceCreationData.CategoryResourceFile` properties to write events with localized category strings. The Event Viewer displays the category for an event entry if you supply a category when you write the event. Event log categories are application-defined strings that help filter events, or provide further information on the event. For example, your application can define separate categories for different components or different operations.

Event categories are optional; if your application does not use categories, do not set the `EventSourceCreationData.CategoryCount` and `EventSourceCreationData.CategoryResourceFile` properties.

For details about defining event messages and building event resource files, see the Message Compiler article in the Platform SDK documentation.

#### Examples
The following code example determines whether the event source named `SampleApplicationSource` is registered on the local computer. If the event source does not exist, the example sets the message resource file for the source and creates the new event source. Finally, the code example sets the localized display name for the event log, using the resource identifier value in `DisplayNameMsgId` and the resource file path in `messageFile`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventInstance/Overview/source.cs._

The code example uses the following message text file, built into the resource library EventLogMsgs.dll. A message text file is the source from which the message resource file is created. The message text file defines the resource identifiers and text for the category, event message, and parameter insertion strings.

```
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

## EventSourceCreationData.CategoryResourceFile property

```csharp
public string? CategoryResourceFile { get; set; }
```

Gets or sets the path of the resource file that contains category strings for the source.

Returns: The path of the category resource file. The default is an empty string ("").

#### Remarks
Use the `EventSourceCreationData.CategoryCount` and `EventSourceCreationData.CategoryResourceFile` properties to write events with localized category strings. The Event Viewer displays the category for an event entry if you supply a category when you write the event. Event log categories are application-defined strings that help filter events, or provide further information on the event. For example, your application can define separate categories for different components or different operations.

Event categories are optional; if your application does not use categories, do not set the `EventSourceCreationData.CategoryCount` and `EventSourceCreationData.CategoryResourceFile` properties.

For details about defining event messages and building event resource files, see the Message Compiler article in the Platform SDK documentation.

#### Examples
The following code example determines whether the event source named `SampleApplicationSource` is registered on the local computer. If the event source does not exist, the example sets the message resource file for the source and creates the new event source. Finally, the code example sets the localized display name for the event log, using the resource identifier value in `DisplayNameMsgId` and the resource file path in `messageFile`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventInstance/Overview/source.cs._

The code example uses the following message text file, built into the resource library EventLogMsgs.dll. A message text file is the source from which the message resource file is created. The message text file defines the resource identifiers and text for the category, event message, and parameter insertion strings.

```
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

## EventSourceCreationData.LogName property

```csharp
public string LogName { get; set; }
```

Gets or sets the name of the event log to which the source writes entries.

Returns: The name of the event log. This can be Application, System, or a custom log name. The default value is "Application."

#### Remarks
Use the `LogName` property to identify the event log that your application writes entries to using the new source. The event log can be a new log or an existing log. Applications and services should write to the Application log or a custom log. Device drivers should write to the System log. If you do not explicitly set the `LogName` property, the event log defaults to the Application log.

> **Note:**
>  The Security log is read-only.

To target an existing log for the new source, set the `LogName` property to the existing event log name. To create a new event log for the source, you must set the `LogName` property. Event log names must consist of printable characters, and cannot include the characters '*', '?', or '\\'. The first 8 characters of the event log name must be different from the first 8 characters of existing names of event logs on the specified computer.

The operating system stores event logs as files. When you use `EventLogInstaller` or the `EventLog.CreateEventSource` method to create a new event log, the associated file is stored in the %SystemRoot%\System32\Config directory on the specified computer. The file name is set by appending the first 8 characters of the `LogName` property with the ".evt" file name extension.

#### Examples
The following code example sets the configuration properties for an event source from command-line arguments. The input arguments specify the event source name, event log name, computer name, and event message resource file. This example is part of a larger example provided for the `EventSourceCreationData` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventSourceCreationData/Overview/source.cs._

## EventSourceCreationData.MachineName property

```csharp
public string MachineName { get; set; }
```

Gets or sets the name of the computer on which to register the event source.

Returns: The name of the system on which to register the event source. The default is the local computer (".").

Exceptions:

- `ArgumentException`: The computer name is invalid.

#### Remarks
The `EventSourceCreationData.MachineName` value cannot be an empty string. If the machine name is not explicitly set, it defaults to the local computer (".").

When registering a source on a remote computer, you must have administrative rights on that computer to write the registry values with sufficient permissions.

#### Examples
The following code example sets the configuration properties for an event source from command-line arguments. The input arguments specify the event source name, event log name, computer name, and event message resource file. This example is part of a larger example provided for the `EventSourceCreationData` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventSourceCreationData/Overview/source.cs._
