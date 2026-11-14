---
title: "EventLog class (part 11 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLog.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLog class (part 11 of 15)

## EventLog.WriteEntry(String, EventLogEntryType, Int32, Int16, Byte[]) method

```csharp
public void WriteEntry (string? message, System.Diagnostics.EventLogEntryType type, int eventID, short category, byte[]? rawData);
```

Writes an entry with the given message text, application-defined event identifier, and application-defined category to the event log, and appends binary data to the message.

Parameters:

- `message`: The string to write to the event log.
- `type`: One of the `EventLogEntryType` values.
- `eventID`: The application-specific identifier for the event.
- `category`: The application-specific subcategory associated with the message.
- `rawData`: An array of bytes that holds the binary data associated with the entry.

Exceptions:

- `ArgumentException`: The `EventLog.Source` property of the `EventLog` has not been set.

-or-

The method attempted to register a new event source, but the computer name in `EventLog.MachineName` is not valid.

-or-

The source is already registered for a different event log.

-or-

`eventID` is less than zero or greater than <see cref="F:System.UInt16.MaxValue">UInt16.MaxValue</see>.

-or-

The message string is longer than 31,839 bytes (32,766 bytes on Windows operating systems before Windows Vista).

-or-

The source name results in a registry key path longer than 254 characters.
- `InvalidOperationException`: The registry key for the event log could not be opened.
- `InvalidEnumArgumentException`: `type` is not a valid `EventLogEntryType`.
- `Win32Exception`: The operating system reported an error when writing the event entry to the event log. A Windows error code is not available.

#### Remarks
Use this overload to write application-defined event-specific data to the event log. The Event Viewer does not interpret this data; it displays raw data only in a combined hexadecimal and text format. Use event-specific data sparingly, including it only if you are sure it will be useful to someone debugging the problem. You can also use event-specific data to store information the application can process independently of the Event Viewer. For example, you could write a viewer specifically for your events, or write a program that scans the logfile and creates reports that include information from the event-specific data.

In addition to the binary data, you can specify an application-defined category and an application-defined event identifier. The Event Viewer uses the category to filter events written by an event source. The Event Viewer can display the category as a numeric value, or it can use the category as a resource identifier to display a localized category string.

> **Note:**
> The `message` string cannot contain %*n*, where *n* is an integer value (for example, %1), because the event viewer treats it as an insertion string. Because an Internet Protocol, version 6 (IPv6) address can contain this character sequence, you cannot log an event message that contains an IPv6 address.

> **Note:**
> The `category` parameter should be a positive value. Negative category values appear as a complementary positive number in the Event Viewer. For example, a -10 appears as 65,526, a -1 as 65,535.

To display localized category strings in the Event Viewer, you must use an event source configured with a category resource file, and set the `category` to a resource identifier in the category resource file. If the event source does not have a configured category resource file, or the specified `category` does not index a string in the category resource file, then the Event Viewer displays the numeric category value for that entry. Configure the category resource file, along with the number of category strings in the resource file, using the `EventLogInstaller` or the `EventSourceCreationData` class.

Event identifiers, along with the event source, uniquely identify an event. Each application can define its own numbered events and the description strings to which they map. Event viewers display these string values to help the user understand what went wrong and suggest what actions to take.

Finally, you can specify an `EventLogEntryType` for the event being written to the event log. The `type` is indicated by an icon and text in the Type column in the Event Viewer for a log. This parameter indicates whether the event type is error, warning, information, success audit, or failure audit.

You must set the `Source` property on your `EventLog` component before you can write entries to the log. You must create and configure the event source before writing the first entry with the source.

Create the new event source during the installation of your application. This allows time for the operating system to refresh its list of registered event sources and their configuration. If the operating system has not refreshed its list of event sources, and you attempt to write an event with the new source, the write operation will fail. You can configure a new source using an `EventLogInstaller`, or using the `EventLog.CreateEventSource` method. You must have administrative rights on the computer to create a new event source.

If the source specified in the `Source` property of this `EventLog` instance is not registered on the computer that your component is writing to, `EventLog.WriteEntry` calls `EventLog.CreateEventSource` and registers the source.

> **Note:**
> If you do not specify a `EventLog.MachineName` for your `EventLog` instance before you call `EventLog.CreateEventSource` or `EventLog.WriteEntry`, the local computer (".") is assumed.

If the system needs to register the `EventLog.Source` through a call to `EventLog.WriteEntry` and the `Log` property has not been set on your `EventLog` instance, the log defaults to the Application log.

> **Note:**
> Many exceptions listed above are generated by errors raised during the process of registering the `EventLog.Source`.

The source must be configured either for writing localized entries or for writing direct strings. The `EventLog.WriteEntry` method writes the given string directly to the event log; it does not use a localizable message resource file. Use the `EventLog.WriteEvent` method to write events using a localized message resource file.

If your application writes entries using both resource identifiers and string values, you must register two separate sources. For example, configure one source with resource files, and then use that source in the `EventLog.WriteEvent` method to write entries using resource identifiers to the event log. Then create a different source without resource files, and use that source in the `EventLog.WriteEntry` method to write strings directly to the event log using that source.

> **Note:**
> If the `message` parameter contains a NUL character, the message in the event log is terminated at the NUL character.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/WriteEntry/eventlog_writeentry_5.cs._

## EventLog.WriteEntry(String, String, EventLogEntryType, Int32, Int16) method

```csharp
public static void WriteEntry (string source, string? message, System.Diagnostics.EventLogEntryType type, int eventID, short category);
```

Writes an entry with the given message text, application-defined event identifier, and application-defined category to the event log, using the specified registered event source. The `category` can be used by the Event Viewer to filter events in the log.

Parameters:

- `source`: The source by which the application is registered on the specified computer.
- `message`: The string to write to the event log.
- `type`: One of the `EventLogEntryType` values.
- `eventID`: The application-specific identifier for the event.
- `category`: The application-specific subcategory associated with the message.

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
- `InvalidOperationException`: The registry key for the event log could not be opened.
- `InvalidEnumArgumentException`: `type` is not a valid `EventLogEntryType`.
- `Win32Exception`: The operating system reported an error when writing the event entry to the event log. A Windows error code is not available.

#### Remarks
Use this method to write an entry with an application-defined `category` to the event log, using a source that is already registered as an event source for the appropriate log. The Event Viewer uses the category to filter events written by an event source. The Event Viewer can display the category as a numeric value, or it can use the category as a resource identifier to display a localized category string.

> **Note:**
> The `category` parameter should be a positive value. Negative category values appear as a complementary positive number in the Event Viewer. For example, a -10 appears as 65,526, a -1 as 65,535.

To display localized category strings in the Event Viewer, you must use an event source configured with a category resource file, and set the `category` to a resource identifier in the category resource file. If the event source does not have a configured category resource file, or the specified `category` does not index a string in the category resource file, then the Event Viewer displays the numeric category value for that entry. Configure the category resource file, along with the number of category strings in the resource file, using the `EventLogInstaller` or the `EventSourceCreationData` class.

In addition to the category, you can specify an event identifier for the event being written to the event log. Event identifiers, along with the event source, uniquely identify an event. Each application can define its own numbered events and the description strings to which they map. Event viewers display these string values to help the user understand what went wrong and suggest what actions to take.

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
