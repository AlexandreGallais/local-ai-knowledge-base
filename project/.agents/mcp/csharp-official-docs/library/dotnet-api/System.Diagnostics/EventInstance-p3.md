---
title: "EventInstance class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventInstance.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventInstance class (part 3 of 3)

## EventInstance.EntryType property

```csharp
public System.Diagnostics.EventLogEntryType EntryType { get; set; }
```

Gets or sets the event type of the event log entry.

Returns: An `EventLogEntryType` value that indicates the event entry type. The default value is `EventLogEntryType.Information`.

Exceptions:

- `InvalidEnumArgumentException`: The property is not set to a valid `EventLogEntryType` value.

#### Remarks
Each event is of a single type, which the application indicates when it reports the event. The Event Viewer uses the event type to determine which icon to display in the list view of the event log.

#### Examples
The following code example writes an informational event entry, and then reuses the `EventInstance` to write an entry for a warning event to an existing event log. The event message text is specified using a resource identifier in a message resource file. The code example assumes that the corresponding message resource file has been registered for the source.

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

## EventInstance.InstanceId property

```csharp
public long InstanceId { get; set; }
```

Gets or sets the resource identifier that designates the message text of the event entry.

Returns: A resource identifier that corresponds to a string defined in the message resource file of the event source.

Exceptions:

- `ArgumentOutOfRangeException`: The property is set to a negative value or to a value larger than <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see>.

#### Remarks
The `InstanceId` property uniquely identifies an event entry for a configured event source. For events defined in message resource files, the `EventInstance.InstanceId` corresponds to the resource identifier compiled from the message definition fields in the message text file. Your application can write localized event log entries by setting the `EventInstance.InstanceId` to a resource identifier. The Event Viewer uses the `EventInstance.InstanceId` resource identifier to find and display the corresponding string from the localized resource file based on current language settings. You must register the source with the corresponding resource file before you write events using resource identifiers.

For details about defining event messages and building event log resource files, see the Message Compiler article in the Platform SDK documentation. For details about event log identifiers, see the Event Identifiers article in the Platform SDK documentation.

#### Examples
The following code example writes an informational event entry, and then reuses the `EventInstance` to write an entry for a warning event to an existing event log. The event message text is specified using a resource identifier in a message resource file. The code example assumes that the corresponding message resource file has been registered for the source.

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
