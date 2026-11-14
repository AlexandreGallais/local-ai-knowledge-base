---
title: "EventLog class (part 12 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLog.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLog class (part 12 of 15)

## EventLog.WriteEntry(String, String, EventLogEntryType, Int32, Int16, Byte[]) method

```csharp
public static void WriteEntry (string source, string? message, System.Diagnostics.EventLogEntryType type, int eventID, short category, byte[]? rawData);
```

Writes an entry with the given message text, application-defined event identifier, and application-defined category to the event log (using the specified registered event source) and appends binary data to the message.

Parameters:

- `source`: The source by which the application is registered on the specified computer.
- `message`: The string to write to the event log.
- `type`: One of the `EventLogEntryType` values.
- `eventID`: The application-specific identifier for the event.
- `category`: The application-specific subcategory associated with the message.
- `rawData`: An array of bytes that holds the binary data associated with the entry.

Exceptions:

- `ArgumentException`: The `source` value is an empty string ("").

-or-

The `source` value is `null`.

-or-

`eventID` is less than zero or greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

-or-

The message string is longer than 31,839 bytes (32,766 bytes on Windows operating systems before Windows Vista).

-or-

The source name results in a registry key path longer than 254 characters.
- `InvalidEnumArgumentException`: `type` is not a valid `EventLogEntryType`.
- `InvalidOperationException`: The registry key for the event log could not be opened.
- `Win32Exception`: The operating system reported an error when writing the event entry to the event log. A Windows error code is not available.

#### Remarks
Use this method to write application-defined event-specific data to the event log, using a source already registered as an event source for the appropriate log. The Event Viewer does not interpret this data; it displays raw data only in a combined hexadecimal and text format. Use event-specific data sparingly; include it only if you are sure it will be useful. You can also use event-specific data to store information the application can process independently of the Event Viewer. For example, you could write a viewer specifically for your events, or write a program that scans the logfile and creates reports that include information from the event-specific data.

In addition to the binary data, you can specify an application-defined category and an application-defined event identifier. The Event Viewer uses the category to filter events written by an event source. The Event Viewer can display the category as a numeric value, or it can use the category as a resource identifier to display a localized category string.

> **Note:**
> The `category` parameter should be a positive value. Negative category values appear as a complementary positive number in the Event Viewer. For example, a -10 will appear as 65,526, a -1 as 65,535.

To display localized category strings in the Event Viewer, you must use an event source configured with a category resource file, and set the `category` to a resource identifier in the category resource file. If the event source does not have a configured category resource file, or the specified `category` does not index a string in the category resource file, then the Event Viewer displays the numeric category value for that entry. Configure the category resource file, along with the number of category strings in the resource file, using the `EventLogInstaller` or the `EventSourceCreationData` class.

Event identifiers, together with the event source, uniquely identify an event. Each application can define its own numbered events and the description strings to which they map. Event viewers display these string values to help the user understand what went wrong and suggest what actions to take.

Finally, you can specify an `EventLogEntryType` for the event being written to the event log. The `type` is indicated by an icon and text in the Type column in the Event Viewer for a log. This parameter indicates whether the event type is error, warning, information, success audit, or failure audit.

You must create and configure the event source before writing the first entry with the source. Create the new event source during the installation of your application. This allows time for the operating system to refresh its list of registered event sources and their configuration. If the operating system has not refreshed its list of event sources, and you attempt to write an event with the new source, the write operation will fail. You can configure a new source using an `EventLogInstaller`, or using the `EventLog.CreateEventSource` method. You must have administrative rights on the computer to create a new event source.

The source must be configured either for writing localized entries or for writing direct strings. The `EventLog.WriteEntry` method writes the given string directly to the event log; it does not use a localizable message resource file. Use the `EventLog.WriteEvent` method to write events using a localized message resource file.

If your application writes entries using both resource identifiers and string values, you must register two separate sources. For example, configure one source with resource files, and then use that source in the `EventLog.WriteEvent` method to write entries using resource identifiers to the event log. Then create a different source without resource files, and use that source in the `EventLog.WriteEntry` method to write strings directly to the event log using that source.

> **Note:**
> If the `message` parameter contains a NUL character, the message in the event log is terminated at the NUL character.
>
> The `message` string cannot contain %*n*, where *n* is an integer value (for example, %1), because the event viewer treats it as an insertion string. Because an Internet Protocol, version 6 (IPv6) address can contain this character sequence, you cannot log an event message that contains an IPv6 address.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/WriteEntry/eventlog_writeentry_1_3.cs._

## EventLog.WriteEvent(EventInstance, Object[]) method

```csharp
public void WriteEvent (System.Diagnostics.EventInstance instance, params object?[]? values);
```

Writes a localized entry to the event log.

Parameters:

- `instance`: An `EventInstance` instance that represents a localized event log entry.
- `values`: An array of strings to merge into the message text of the event log entry.

Exceptions:

- `ArgumentException`: The `EventLog.Source` property of the `EventLog` has not been set.

-or-

The method attempted to register a new event source, but the computer name in `EventLog.MachineName` is not valid.

-or-

The source is already registered for a different event log.

-or-

`instance.InstanceId` is less than zero or greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

-or-

`values` has more than 256 elements.

-or-

One of the `values` elements is longer than 32766 bytes.

-or-

The source name results in a registry key path longer than 254 characters.
- `ArgumentNullException`: `instance` is `null`.
- `InvalidOperationException`: The registry key for the event log could not be opened.
- `Win32Exception`: The operating system reported an error when writing the event entry to the event log. A Windows error code is not available.

#### Remarks

Use this method to write a localized entry to the event log. You specify the event properties with resource identifiers rather than string values. The Event Viewer uses the resource identifiers to display the corresponding strings from the localized resource file for the `EventLog.Source`. You must register the source with the corresponding resource file before you write events using resource identifiers.

The input `instance` instance specifies the event message and properties. Set the `EventInstance.InstanceId` of the `instance` input for the defined message in the source message resource file. You can optionally set the `EventInstance.CategoryId` and `EventInstance.EntryType` of the `instance` input to define the category and event type of your event entry. You can also specify an array of language-independent strings to insert into the localized message text. Set `values` to `null` if the event message does not contain formatting placeholders for replacement strings.

You must set the `Source` property on your `EventLog` component before using `EventLog.WriteEvent`. The specified source must be configured for writing localized entries to the log; the source must at minimum have a message resource file defined.

You must create and configure the event source before writing the first entry with the source. Create the new event source during the installation of your application. This allows time for the operating system to refresh its list of registered event sources and their configuration. If the operating system has not refreshed its list of event sources, and you attempt to write an event with the new source, the write operation will fail. You can configure a new source using an `EventLogInstaller`, or using the `EventLog.CreateEventSource` method. You must have administrative rights on the computer to create a new event source.

The source must be configured either for writing localized entries or for writing direct strings. Use the `EventLog.WriteEntry` method if your application writes string values directly to the event log.

If your application writes entries using both resource identifiers and string values, you must register two separate sources. For example, configure one source with resource files, and then use that source in the `EventLog.WriteEvent` method to write entries using resource identifiers to the event log. Then create a different source without resource files, and use that source in the `EventLog.WriteEntry` method to write strings directly to the event log using that source.

> **Note:**
> If you write an entry to a remote computer, the value of the `message` string might not be what you expect if the remote computer is not running .NET. Also, the `message` string cannot contain %*n*, where *n* is an integer value (for example, %1), because the event viewer treats it as an insertion string. Because an Internet Protocol, version 6 (IPv6) address can contain this character sequence, you cannot log an event message that contains an IPv6 address.

#### Examples
The following example writes two audit entries to the event log `myNewLog`. The example creates a new event source and a new event log if they do not exist on the local computer. The event message text is specified using a resource identifier in a resource file.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventInstance/Overview/source.cs._

The example uses the following message text file, built into the resource library EventLogMsgs.dll. A message text file is the source from which the message resource file is created. The message text file defines the resource identifiers and text for the category, event message, and parameter insertion strings.

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
