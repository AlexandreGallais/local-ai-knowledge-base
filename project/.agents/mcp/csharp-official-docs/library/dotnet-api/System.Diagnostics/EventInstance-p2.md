---
title: "EventInstance class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventInstance.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventInstance class (part 2 of 3)

## EventInstance.EventInstance(Int64, Int32, EventLogEntryType) constructor

```csharp
public EventInstance (long instanceId, int categoryId, System.Diagnostics.EventLogEntryType entryType);
```

Initializes a new instance of the `EventInstance` class using the specified resource identifiers for the localized message and category text of the event entry and the specified event log entry type.

Parameters:

- `instanceId`: A resource identifier that corresponds to a string defined in the message resource file of the event source.
- `categoryId`: A resource identifier that corresponds to a string defined in the category resource file of the event source, or zero to specify no category for the event.
- `entryType`: An `EventLogEntryType` value that indicates the event type.

Exceptions:

- `InvalidEnumArgumentException`: `entryType` is not a valid `EventLogEntryType` value.
- `ArgumentOutOfRangeException`: `instanceId` is a negative value or a value larger than <see cref="F:System.UInt32.MaxValue">UInt32.MaxValue</see>.

-or-

`categoryId` is a negative value or a value larger than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Remarks
To write an entry to an event log, initialize an `EventInstance` and pass it to the `EventLog.WriteEvent` method. Set the `instanceId` to the resource identifier of the event message in the corresponding `MessageResourceFile` property for the source. Set the `categoryId` to a numeric category value, or the resource identifier of the event category in the `CategoryResourceFile` property for the source; set the `categoryId` to zero for no event category.

The Event Viewer uses the resource identifiers to display the corresponding strings from the localized resource files for the source. You must register the source with the corresponding resource files before you can write events using resource identifiers.

Set the `entryType` to one of the pre-defined entry types. The Event Viewer uses the event type to determine which icon to display in the list view of the event log.

#### Examples
The following code example writes two audit event entries to the event log `myNewLog`. The code example creates a new event source and a new event log if they do not exist on the local computer. The event message text is specified using a resource identifier in a resource file.

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

## EventInstance.CategoryId property

```csharp
public int CategoryId { get; set; }
```

Gets or sets the resource identifier that specifies the application-defined category of the event entry.

Returns: A numeric category value or resource identifier that corresponds to a string defined in the category resource file of the event source. The default is zero, which signifies that no category will be displayed for the event entry.

Exceptions:

- `ArgumentOutOfRangeException`: The property is set to a negative value or to a value larger than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

#### Remarks
Event log categories are application-defined values that help filter events, or provide further information about the event. For example, your application can define separate categories for different components or different operations.

Set the `CategoryId` property to specify the category that the Event Viewer displays for the entry. The Event Viewer can display the category as a numeric value, or it can use the `EventInstance.CategoryId` as a resource identifier to display a localized category string based on the current language settings.

To display localized category strings in the Event Viewer, you must use an event source configured with a category resource file, and set the `EventInstance.CategoryId` to a resource identifier in the category resource file. If the event source does not have a configured category resource file, or the specified `EventInstance.CategoryId` does not index a string in the category resource file, and then the Event Viewer displays the numeric category value for that entry.

You must register the source with the corresponding resource file before you write event categories using resource identifiers. Configure the category resource file, along with the number of category strings in the resource file, using the `EventLogInstaller` or the `EventSourceCreationData` class. When defining category strings in a resource file, the category resource identifiers must be numbered consecutively starting at 1, up to the configured `CategoryCount` property value.

Event categories are optional. If your application does not use categories, do not set the `EventInstance.CategoryId` for the event log entry.

For details about defining event messages and building event resource files, see the Message Compiler article in the Platform SDK documentation. For details about defining event categories in resource files, see the "Event Categories" topic in the Platform SDK

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
