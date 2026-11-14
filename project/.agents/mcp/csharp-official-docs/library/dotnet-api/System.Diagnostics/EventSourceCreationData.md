---
title: "EventSourceCreationData class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventSourceCreationData.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventSourceCreationData class

Namespace: `System.Diagnostics`

```csharp
public class EventSourceCreationData
```

Represents the configuration settings used to create an event log source on the local computer or a remote computer.

#### Remarks
Use the `EventSourceCreationData` class to configure a new source for writing localized entries to an event log. It is not necessary to use this class to read from an event log.

This class defines the configuration settings for a new event source and its associated event log. The associated event log can be on the local computer or a remote computer. To create a new source for a new or existing event log on the local computer, set the `EventSourceCreationData.LogName` and `EventSourceCreationData.Source` properties of an `EventSourceCreationData` and call the `CreateEventSource` method. This method creates the event source you specify in the `Source` property and registers it for the event log specified in `EventSourceCreationData.LogName`. This behavior is similar to using the `EventLogInstaller` class to register an event source for an event log.

Use the `EventLog.WriteEvent` and `EventLog.WriteEntry` methods to write events to an event log. You must specify an event source to write events; you must create and configure the event source before writing the first entry with the source.

Create the new event source during the installation of your application. This allows time for the operating system to refresh its list of registered event sources and their configurations. If the operating system has not refreshed its list of event sources, and you attempt to write an event with the new source, the write operation will fail. You can configure a new source using an `EventLogInstaller`, or using the `EventLog.CreateEventSource` method. You must have administrative rights on the computer to create a new event source.

You can create an event source for an existing event log or a new event log. When you create a new source for a new event log, the system registers the source for that log, but the log is not created until the first entry is written to it.

Each source can only write to one event log at a time; however, your application can use multiple sources to write to multiple event logs. For example, your application might need multiple sources configured for different event logs or different resource files.

To change the configuration details of an existing source, you must delete the source and then create it with the new configuration. If other applications or components use the existing source, create a new source with the updated configuration rather than deleting the existing source.

You can register the event source with localized resources for your event category and message strings. Your application can write event log entries using resource identifiers, rather than specifying the actual string. The Event Viewer uses the resource identifier to find and display the corresponding string from the localized resource file based on current language settings. You can register a separate file for event categories, messages, and parameter insertion strings, or you can register the same resource file for all three types of strings. Use the `EventSourceCreationData.CategoryCount`, `EventSourceCreationData.CategoryResourceFile`, `EventSourceCreationData.MessageResourceFile`, and `EventSourceCreationData.ParameterResourceFile` properties to configure the source to write localized entries to the event log. If your application writes string values directly to the event log, you do not need to set these properties.

The source must be configured either for writing localized entries or for writing direct strings. The `EventLog.WriteEntry` method writes the given string directly to the event log; it does not use a localizable message resource file. Use the `EventLog.WriteEvent` method to write events using a localized message resource file.

If your application writes entries using both resource identifiers and string values, you must register two separate sources. For example, configure one source with resource files, and then use that source in the `EventLog.WriteEvent` method to write entries using resource identifiers to the event log. Then create a different source without resource files and use that source in the `EventLog.WriteEntry` method to write strings directly to the event log using that source.

#### Examples
The following code example sets the configuration properties for an event source from command-line arguments. The input arguments specify the event source name, event log name, computer name, and event message resource file. The code example verifies that the source does not conflict with an existing event source, and then creates the new event source for the specified event log.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventSourceCreationData/Overview/source.cs._

## EventSourceCreationData.EventSourceCreationData(String, String) constructor

```csharp
public EventSourceCreationData (string? source, string logName);
```

Initializes a new instance of the `EventSourceCreationData` class with a specified event source and event log name.

Parameters:

- `source`: The name to register with the event log as a source of entries.
- `logName`: The name of the log to which entries from the source are written.

#### Remarks
To write entries to an event log, you must first create an event source for the event log. To register a new source, initialize an `EventSourceCreationData` instance, configure the instance properties for your application, and call the `CreateEventSource` method. After the source is registered, you can write entries from the source using the `EventLog.WriteEvent` or `EventLog.WriteEntry` methods.

You can register the event source with localized resources for your event category and message strings. Your application can write event log entries using resource identifiers, rather than specifying the actual string. The Event Viewer uses the resource identifier to find and display the corresponding string from the localized resource file based on current language settings. You can register a separate file for event categories, messages, and parameter insertion strings, or you can register the same resource file for all three types of strings. Use the `EventSourceCreationData.CategoryCount`, `EventSourceCreationData.CategoryResourceFile`, `EventSourceCreationData.MessageResourceFile`, and `EventSourceCreationData.ParameterResourceFile` properties to configure the source to write localized entries to the event log. If your application writes string values directly to the event log, you do not need to set these properties.

The source must be configured either for writing localized entries or for writing direct strings. If your application writes entries using both resource identifiers and string values, you must register two separate sources. For example, configure one source with resource files, and then use that source in the `EventLog.WriteEvent` method to write entries using resource identifiers to the event log. Then create a different source without resource files and use that source in the `EventLog.WriteEntry` method to write strings directly to the event log.

The following table shows initial property values for an `EventSourceCreationData`.

|Property|Initial Value|
|--------------|-------------------|
|`EventSourceCreationData.Source`|The `source` parameter.|
|`EventSourceCreationData.LogName`|The `logName` parameter.|
|`EventSourceCreationData.MachineName`|The local computer (".").|
|`EventSourceCreationData.CategoryCount`|Zero|
|`EventSourceCreationData.CategoryResourceFile`|`null` (`Nothing` in Visual Basic).|
|`EventSourceCreationData.MessageResourceFile`|`null` (`Nothing` in Visual Basic).|
|`EventSourceCreationData.ParameterResourceFile`|`null` (`Nothing` in Visual Basic).|

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
