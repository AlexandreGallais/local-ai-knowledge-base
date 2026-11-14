---
title: "EventSourceCreationData class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventSourceCreationData.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventSourceCreationData class (part 3 of 3)

## EventSourceCreationData.MessageResourceFile property

```csharp
public string? MessageResourceFile { get; set; }
```

Gets or sets the path of the message resource file that contains message formatting strings for the source.

Returns: The path of the message resource file. The default is an empty string ("").

#### Remarks
Use the `MessageResourceFile` property to configure an event log source to write localized event messages. Event messages are application-defined strings that describe the event to the user.

Your application can write event log entries using resource identifiers. A resource identifier indexes a message located in the `EventSourceCreationData.MessageResourceFile`. The Event Viewer uses the resource identifier to find and display the corresponding string from the localized message resource file based on current language settings.

The event source must be configured either for writing localized entries or for writing direct strings. Use the `EventLog.WriteEvent` method to write localized entries for a source configured with a message resource file.

If your application writes event message strings directly, rather than using a resource identifier in a localized resource file, do not set the `MessageResourceFile` property.

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

## EventSourceCreationData.ParameterResourceFile property

```csharp
public string? ParameterResourceFile { get; set; }
```

Gets or sets the path of the resource file that contains message parameter strings for the source.

Returns: The path of the parameter resource file. The default is an empty string ("").

#### Remarks
Use the `ParameterResourceFile` property to configure an event log source to write localized event messages with inserted parameter strings. Each localized event message specified in the `MessageResourceFile` property can contain placeholders for insertion strings. These placeholders are used to specify the position and resource identifier for a language-independent string within the event message. The Event Viewer fills in the placeholders using the corresponding strings from the `EventSourceCreationData.ParameterResourceFile` and formats the event log message for the localized event entry.

For example, the following section of a message text file defines a string with a parameter placeholder:

```

MessageId = 1501
Severity = Success
Facility = Application
SymbolicName = COMPONENT_STARTING
Language=English
Component %`50 is starting.
.
```

Within the parameter resource file, the insertion string must be defined with the resource identifier that corresponds to the placeholder, as shown below:

```
MessageId = 6050
Severity = Success
Facility = Application
SymbolicName = COMPONENT_NAME_MSGID
Language=English
TRIGGER.EXE
.
```

The event source must be configured either for writing localized entries or for writing direct strings. Use the `EventLog.WriteEvent` method to write localized entries for a source configured with a message resource file.

If your application writes event message strings directly to the event log, or if your `MessageResourceFile` property does not contain messages with parameter insertion placeholders, do not set the `ParameterResourceFile` property.

For details about defining event messages and building event resource files, see the Message Compiler article in the Platform SDK documentation.

#### Examples
The following code example determines whether the event source named `SampleApplicationSource` is registered on the local computer. If the event source does not exist, the example sets the message resource file for the source and creates the new event source. Finally, the code example sets the localized display name for the event log, using the resource identifier value in `DisplayNameMsgId` and the resource file path in `messageFile`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventInstance/Overview/source.cs._

The code example uses the following message text file, built into the resource library EventLogMsgs.dll. A message text file is the source from which the message resource file is created. The message text file defines the resource identifiers and text for the category, event message, and parameter insertion strings. Specifically, the message defined for resource identifier 1004 uses a placeholder for a parameter string defined for resource identifier 5002.

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

## EventSourceCreationData.Source property

```csharp
public string? Source { get; set; }
```

Gets or sets the name to register with the event log as an event source.

Returns: The name to register with the event log as a source of entries. The default is an empty string ("").

#### Remarks
The source name is often the name of the application, or the name of a component within a large application. The `CreateEventSource` method uses the `EventSourceCreationData.Source`, `EventSourceCreationData.LogName`, and `EventSourceCreationData.MachineName` properties to create registry values on the target computer for the new source and its associated event log. A new source name cannot match an existing source name or an existing event log name on the target computer.

After the registry values for the source are created, your application can use the source to write entries to the configured event log.

Each source can only write to one event log at a time; however, your application can use multiple sources to write to multiple event logs. For example, your application might require multiple sources configured for different event logs or different resource files.

#### Examples
The following code example sets the configuration properties for an event source from command-line arguments. The input arguments specify the event source name, event log name, computer name, and event message resource file. This example is part of a larger example provided for the `EventSourceCreationData` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventSourceCreationData/Overview/source.cs._
