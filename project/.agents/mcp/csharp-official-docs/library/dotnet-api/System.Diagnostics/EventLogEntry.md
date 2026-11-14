---
title: "EventLogEntry class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLogEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLogEntry class

Namespace: `System.Diagnostics`

```csharp
public sealed class EventLogEntry : System.ComponentModel.Component, System.Runtime.Serialization.ISerializable
```

Encapsulates a single record in the event log. This class cannot be inherited.

#### Remarks
You usually will not create instances of `EventLogEntry` directly when working with the `EventLog` class. The `EventLog.Entries` member of the `EventLog` class contains a collection of `EventLogEntry` instances, which you iterate over when reading by using the `EventLogEntryCollection.Item` class index member.

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

#### Examples
The following code example demonstrates the use of the `EventLogEntry` class. In this example, a `switch` statement uses console input to search for event log entries for the specified event type.  If a match is found, log entry source information is displayed at the console.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLogEntry/Overview/eventlogentry_source.cs._

## EventLogEntry.Category property

```csharp
public string Category { get; }
```

Gets the text associated with the `EventLogEntry.CategoryNumber` property for this entry.

Returns: The application-specific category text.

Exceptions:

- `Exception`: The space could not be allocated for one of the insertion strings associated with the category.

#### Remarks
Each application (event source) can define its own numbered categories and the text strings to which they are mapped. The Event Viewer can use the category to filter events in the log.

## EventLogEntry.CategoryNumber property

```csharp
public short CategoryNumber { get; }
```

Gets the category number of the event log entry.

Returns: The application-specific category number for this entry.

#### Remarks
Each application (event source) can define its own numbered categories and the text strings to which they are mapped. The Event Viewer can use the category to filter events in the log. The categories must be numbered consecutively beginning with the number 1. The category number is specified by the `CategoryId` property. The Event Viewer can display the category as a numeric value, or it can use the category as a resource identifier to display a localized category string. For more information, see `EventInstance`.

## EventLogEntry.Data property

```csharp
public byte[] Data { get; }
```

Gets the binary data associated with the entry.

Returns: An array of bytes that holds the binary data associated with the entry.

#### Remarks
Getting this property creates an array that holds a copy of the entry's event-specific binary data, which the Event Viewer displays in combined hexadecimal and text format. Event-specific data is sometimes used to store information that the application will process independently of the Event Viewer, for example, to make reports from the log file.

## EventLogEntry.EntryType property

```csharp
public System.Diagnostics.EventLogEntryType EntryType { get; }
```

Gets the event type of this entry.

Returns: The event type that is associated with the entry in the event log.

#### Remarks
All event types have well-defined common data and can optionally include event-specific data. Each event is of a single type, which the application indicates when it reports the event. The Event Viewer uses the event type to determine which icon to display in the list view of the event log.

#### Examples
The following code example demonstrates the use of the `EntryType` property. In this example, a `switch` statement uses console input to search for event log entries for the specified `EventLogEntry.EntryType`.  If a match is found, log entry source information is displayed at the console.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLogEntry/Overview/eventlogentry_source.cs._

## EventLogEntry.EventID property

```csharp
public int EventID { get; }
```

Gets the application-specific event identifier for the current event entry.

Returns: The application-specific identifier for the event message.

#### Remarks
This value represents the event identifier for the entry in the event log, with the top two bits masked off. The `InstanceId` property for an event log entry represents the full 32-bit resource identifier for the event in the message resource file for the event source. Two event log entries from the same source can have matching `EventLogEntry.EventID` values, but have different `EventLogEntry.InstanceId` values due to differences in the top two bits of the event identifier.

If the application wrote the event entry using one of the `EventLog.WriteEntry` methods, the `EventID` property matches the optional `eventId` parameter. If the application wrote the event using `EventLog.WriteEvent` or the Windows API `ReportEvent`, the `EventID` property matches the resource identifier for the event, with the top two bits masked off.

## EventLogEntry.Index property

```csharp
public int Index { get; }
```

Gets the index of this entry in the event log.

Returns: The index of this entry in the event log.

#### Remarks
This number is not necessarily zero-based.

## EventLogEntry.InstanceId property

```csharp
public long InstanceId { get; }
```

Gets the resource identifier that designates the message text of the event entry.

Returns: A resource identifier that corresponds to a string definition in the message resource file of the event source.

#### Remarks
The `InstanceId` property uniquely identifies an event entry for a configured event source. The `EventLogEntry.InstanceId` for an event log entry represents the full 32-bit resource identifier for the event in the message resource file for the event source. The `EventID` property equals the `EventLogEntry.InstanceId` with the top two bits masked off. Two event log entries from the same source can have matching `EventLogEntry.EventID` values, but have different `EventLogEntry.InstanceId` values due to differences in the top two bits of the resource identifier.

If the application wrote the event entry using one of the `EventLog.WriteEntry` methods, the `InstanceId` property matches the optional `eventId` parameter. If the application wrote the event using `EventLog.WriteEvent`, the `InstanceId` property matches the resource identifier specified in the `EventInstance.InstanceId` of the `instance` parameter. If the application wrote the event using the Windows API `ReportEvent`, the `InstanceId` property matches the resource identifier specified in the `dwEventID` parameter.

For details about defining event messages and building event log resource files, see the Message Compiler article in the Platform SDK documentation. For details about event log identifiers, see the Event Identifiers article in the Platform SDK documentation.

#### Examples
The following code example searches an event log for entries with a particular resource identifier. The code example displays the event message for each matching entry, and counts the total number of matching entries in the log. The message text for each entry may or may not be the same; each event message depends on the event source message file, insertion strings, and parameters used when it was written.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventInstance/Overview/source.cs._

## EventLogEntry.MachineName property

```csharp
public string MachineName { get; }
```

Gets the name of the computer on which this entry was generated.

Returns: The name of the computer that contains the event log.

To be added.

## EventLogEntry.Message property

```csharp
public string Message { get; }
```

Gets the localized message associated with this event entry.

Returns: The formatted, localized text for the message. This includes associated replacement strings.

Exceptions:

- `Exception`: The space could not be allocated for one of the insertion strings associated with the message.

#### Remarks
Getting this property opens the registry to determine the file name of the .dll file that contains the localized text. If you receive a registry error when testing your source code, verify that the .dll file exists on the computer. If insertion strings are included in the message, catch errors in their allocation.

## EventLogEntry.ReplacementStrings property

```csharp
public string[] ReplacementStrings { get; }
```

Gets the replacement strings associated with the event log entry.

Returns: An array that holds the replacement strings stored in the event entry.

#### Remarks
This property retrieves only the replacement strings for the entry. To retrieve the full message, read the `Message` property.

The `ReplacementStrings` property contains the localized versions of replacement strings that are used in the event log entry. If you provide resource files that contain strings in each target language for your application, you can emit event log messages in the language that is used on that computer. To do that, create an instance of the `ResourceManager` class for the resource assembly that contains your replacement strings. The first parameter of the `%23ctor` constructor identifies the resource assembly to be used. Use the `ResourceManager.GetString` method of that instance to supply localized messages for log events. The following code automatically sets the message to the language for the current culture.

```csharp
ResourceManager LocRM = new ResourceManager("ReplacementStrings.TestStrings",
      typeof(Program).Assembly);
EventLog e1 = new EventLog("LocTest", "MyMachine", "LocTest");
// Get the string associated with the current culture.
e1.WriteEntry(LocRM.GetString("strMessage"),
   EventLogEntryType.Information);
```

## EventLogEntry.Source property

```csharp
public string Source { get; }
```

Gets the name of the application that generated this event.

Returns: The name registered with the event log as the source of this event.

#### Remarks
The event source indicates what logged the event. It is often the name of the application or the name of a subcomponent of the application if the application is large. Applications and services usually write to (and therefore are sources for) the Application log or a custom log. Device drivers usually write to the System log.

#### Examples
The following code example demonstrates the use of the `Source` property. In this example, a `switch` statement uses console input to search for event log entries for the specified `EventLogEntry.EntryType`.  If a match is found, the `Source` property information is displayed at the console.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLogEntry/Overview/eventlogentry_source.cs._

## EventLogEntry.TimeGenerated property

```csharp
public DateTime TimeGenerated { get; }
```

Gets the local time at which this event was generated.

Returns: The local time at which this event was generated.

#### Remarks
This member holds the time that an event was generated. This might not be the same as the time when the event information was written to the event log. For the latter, read the `TimeWritten` property.

There is usually a lag between the time that an event is generated and the time it is logged. It is more important to know when the event was generated, unless you want to see if there is a significant lag in logging. That can happen if your log files are on a different server and you are experiencing a bottleneck.

## EventLogEntry.TimeWritten property

```csharp
public DateTime TimeWritten { get; }
```

Gets the local time at which this event was written to the log.

Returns: The local time at which this event was written to the log.

#### Remarks
This member holds the time that an event's information is written to the event log. This might not be the same time as when the event was generated. For the latter, read the `TimeGenerated` property.

## EventLogEntry.UserName property

```csharp
public string? UserName { get; }
```

Gets the name of the user who is responsible for this event.

Returns: The security identifier (SID) that uniquely identifies a user or group.

Exceptions:

- `SystemException`: Account information could not be obtained for the user's SID.

#### Remarks
This property is often blank for events in logs other than the Security log.

## EventLogEntry.Equals(EventLogEntry) method

```csharp
public bool Equals (System.Diagnostics.EventLogEntry? otherEntry);
```

Performs a comparison between two event log entries.

Parameters:

- `otherEntry`: The `EventLogEntry` to compare.

Returns: `true` if the `EventLogEntry` objects are identical; otherwise, `false`.

#### Remarks
This method performs a byte-by-byte comparison between the two objects. It does not determine whether the two `EventLogEntry` instances refer to the same object.

## EventLogEntry.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` with the data needed to serialize the target object.

Parameters:

- `info`: The `SerializationInfo` to populate with data.
- `context`: The destination (see `StreamingContext`) for this serialization.

To be added.
