---
title: "EventLog class (part 1 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLog.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLog class

Namespace: `System.Diagnostics`

```csharp
public class EventLog : System.ComponentModel.Component, System.ComponentModel.ISupportInitialize
```

Provides interaction with Windows event logs.

#### Remarks
`EventLog` lets you access or customize Windows event logs, which record information about important software or hardware events. Using `EventLog`, you can read from existing logs, write entries to logs, create or delete event sources, delete logs, and respond to log entries. You can also create new logs when creating an event source.

> **Important:**
> This type implements the `IDisposable` interface. When you have finished using the type, you should dispose of it either directly or indirectly. To dispose of the type directly, call its `IDisposable.Dispose` method in a `try`/`catch` block. To dispose of it indirectly, use a language construct such as `using` (in C#) or `Using` (in Visual Basic). For more information, see the "Using an Object that Implements IDisposable" section in the `IDisposable` interface topic.

In addition to providing access to individual event logs and their entries, the `EventLog` class lets you access the collection of all event logs. You can use the `static` members of `EventLog` to delete logs, get log lists, create or delete a source, or determine if a computer already contains a particular source.

There are three default event logs: Application, System, and Security. A Security log is read-only. Other applications and services you install, such as Active Directory, might have additional event logs.

On Windows, User Account Control (UAC) determines the credentials of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To run the code that accesses the Security log, you must first elevate your credentials from standard user to administrator. You can do this when you start an application by opening the shortcut menu for the application (if you're using a mouse, right-click the application icon) and indicating that you want to run as an administrator.

You can use `EventLog` to create custom event logs that you can view through the server's Event Viewer. Use the `EventLog.RegisterDisplayName` method to display a localized name for your event log in the Event Viewer. Use the `EventLog.ModifyOverflowPolicy` method to configure the behavior of your event log when it reaches its maximum log size.

To read from an event log, specify the log name (`Log` property) and server computer name (`MachineName` property for the event log. If you don't specify the server computer name, the local computer, ".", is assumed. It's not necessary to specify the event source (`Source` property), because a source is required only for writing to logs. The  `Entries` property is automatically populated with the event log's list of entries.

To write to an event log, specify or create an event source (`Source` property). You must have administrative credentials on the computer to create a new event source. The event source registers your application with the event log as a valid source of entries. You can use the event source  to write to only one log at a time. The `Source` property can be any random string, but the name must be distinct from other sources on the computer. The event source is typically the name of the application or another identifying string. Trying to create a duplicate `EventLog.Source` value throws an exception. However, a single event log can be associated with multiple sources.

If the event source for the event log associated with the `EventLog` instance doesn't exist, a new event source is created. To create an event source on Windows, you must have administrative credentials.

This requirement is because all event logs, including Security logs, must be searched to determine whether the event source is unique. Users don't have permission to access the Security log; therefore, a `SecurityException` is thrown.

> **Important:**
> Creating or deleting an event source requires synchronization of the underlying code by using a named mutex. If a highly privileged application locks the named mutex, trying to create or delete an event source causes the application to stop responding until the lock is released. To help prevent this problem, never grant `UnmanagedCode` permission to untrusted code. In addition, `UnmanagedCode` permission potentially allows other permissions to be bypassed and should only be granted to highly trusted code.

Applications and services should write to the Application log or to a custom log. Device drivers should write to the System log. If you do not explicitly set the `Log` property, the event log defaults to the Application log.

> **Note:**
> There is nothing to protect an application from writing as any registered source. If an application is granted `Write` permission, it can write events for any valid source registered on the computer.

Use the `EventLog.WriteEvent` and `EventLog.WriteEntry` methods to write events to an event log. You must specify an event source to write events; you must create and configure the event source before writing the first entry with the source.

Create the new event source during the installation of your application. This allows time for the operating system to refresh its list of registered event sources and their configuration. If the operating system hasn't refreshed its list of event sources, and you try to write an event with the new source, the write operation will fail. You can configure a new source by using an `EventLogInstaller` object or the `EventLog.CreateEventSource` method. You must have administrative credentials on the computer to create a new event source.

Each source can write to only one event log at a time; however, your application can use multiple sources to write to multiple event logs. For example, your application might require multiple sources configured for different event logs or different resource files. To change the configuration details of an existing source, you must delete the source and then create it with the new configuration. If other applications or components use the existing source, create a new source with the updated configuration instead of deleting the existing source.

You can register the event source with localized resources for your event category and message strings. Your application can write event log entries by using resource identifiers instead of specifying the actual string values. Refer to the `EventLogInstaller` and `EventSourceCreationData` classes for more information about configuring your source with resource files.

If your application writes string values directly to the event log, you do not have to set the resource file properties for the source. The source must be configured either for writing localized entries or for writing direct strings. If your application writes entries using both resource identifiers and string values, you must register two separate sources. For example, configure one source with resource files, and then use that source in the `EventLog.WriteEvent` method to write entries using resource identifiers to the event log. Then create a different source without resource files, and use that source in the `EventLog.WriteEntry` method to write strings directly to the event log using that source.

When writing events, you must at least specify either a message string or the resource identifier for a message string. Other event properties are optional. Examples of optional event settings include the following:

- You can set the `EventLogEntryType` to specify the icon that the Event Viewer displays for the entry.
- You can specify a category identifier for the event, if your application uses categories for filtering the events.
- You can attach binary data to your event entry if you want to associate additional information with a given event.

> **Important:**
> Event logging consumes disk space, processor time, and other system resources. It is important to log only essential information. We recommend that you place event log calls in an error path, rather than in the main code path, so they don't adversely affect performance.

For a list of initial property values for an instance of `EventLog`, see the `EventLog.%23ctor` constructor.

#### Examples
The following example creates the event source `MySource` if it doesn't already exist, and writes an entry to the event log `MyNewLog`.

> **Note:**
> You must run this application as an administrator.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/Overview/source.cs._

## EventLog.EventLog() constructor

```csharp
public EventLog ();
```

Initializes a new instance of the `EventLog` class. Does not associate the instance with any log.

#### Remarks
Before calling `EventLog.WriteEntry`, specify the `Source` property of the `EventLog` instance. If you are only reading `EventLog.Entries` from the log, you can alternatively specify only the `EventLog.Log` and `EventLog.MachineName` properties.

> **Note:**
> If you do not specify a `EventLog.MachineName`, the local computer (".") is assumed.

The following table shows initial property values for an instance of `EventLog`.

|Property|Initial Value|
|--------------|-------------------|
|`EventLog.Source`|An empty string ("").|
|`EventLog.Log`|An empty string ("").|
|`EventLog.MachineName`|The local computer (".").|

#### Examples
The following example creates the source `MySource` if it does not already exist, and writes an entry to the event log `MyNewLog`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/Overview/source.cs._

## EventLog.EventLog(String) constructor

```csharp
public EventLog (string logName);
```

Initializes a new instance of the `EventLog` class. Associates the instance with a log on the local computer.

Parameters:

- `logName`: The name of the log on the local computer.

Exceptions:

- `ArgumentNullException`: The log name is `null`.
- `ArgumentException`: The log name is invalid.

#### Remarks
This overload sets the `Log` property to the `logName` parameter. Before calling `EventLog.WriteEntry`, specify the `Source` property of the `EventLog` instance. If you are only reading `EventLog.Entries` from the log, you can alternatively specify only the `EventLog.Log` and `EventLog.MachineName` properties.

> **Note:**
> If you do not specify a `EventLog.MachineName`, the local computer (".") is assumed. This overload of the constructor specifies the `Log` property, but you can change this before reading the `Entries` property.

If the source you specify in the `Source` property is unique from other sources on the computer, a subsequent call to `EventLog.WriteEntry` creates a log with the specified name, if it does not already exist.

The following table shows initial property values for an instance of `EventLog`.

|Property|Initial Value|
|--------------|-------------------|
|`EventLog.Source`|An empty string ("").|
|`EventLog.Log`|The `logName` parameter.|
|`EventLog.MachineName`|The local computer (".").|

#### Examples
The following example reads entries in the event log, "myNewLog", on the local computer.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/.ctor/source.cs._

## EventLog.EventLog(String, String) constructor

```csharp
public EventLog (string logName, string machineName);
```

Initializes a new instance of the `EventLog` class. Associates the instance with a log on the specified computer.

Parameters:

- `logName`: The name of the log on the specified computer.
- `machineName`: The computer on which the log exists.

Exceptions:

- `ArgumentNullException`: The log name is `null`.
- `ArgumentException`: The log name is invalid.

-or-

The computer name is invalid.

#### Remarks
This overload sets the `Log` property to the `logName` parameter and the `MachineName` property to the `machineName` parameter. Before calling `EventLog.WriteEntry`, specify the `Source` property of the `EventLog`. If you are only reading `EventLog.Entries` from the log, you can alternatively specify only the `EventLog.Log` and `EventLog.MachineName` properties.

> **Note:**
> This overload of the constructor specifies the `EventLog.Log` and `EventLog.MachineName` properties, but you can change either before reading the `Entries` property.

The following table shows initial property values for an instance of `EventLog`.

|Property|Initial Value|
|--------------|-------------------|
|`EventLog.Source`|An empty string ("").|
|`EventLog.Log`|The `logName` parameter.|
|`EventLog.MachineName`|The `machineName` parameter.|

#### Examples
The following example reads entries in the event log, "myNewLog", on the computer "myServer".

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/.ctor/source1.cs._

## EventLog.EventLog(String, String, String) constructor

```csharp
public EventLog (string logName, string machineName, string source);
```

Initializes a new instance of the `EventLog` class. Associates the instance with a log on the specified computer and creates or assigns the specified source to the `EventLog`.

Parameters:

- `logName`: The name of the log on the specified computer.
- `machineName`: The computer on which the log exists.
- `source`: The source of event log entries.

Exceptions:

- `ArgumentNullException`: The log name is `null`.
- `ArgumentException`: The log name is invalid.

-or-

The computer name is invalid.

#### Remarks
This constructor sets the `Log` property to the `logName` parameter, the `MachineName` property to the `machineName` parameter, and the `Source` property to the `source` parameter. The `Source` property is required when writing to an event log. However, if you are only reading from an event log, only the `EventLog.Log` and `EventLog.MachineName` properties are required (as long as the event log on the server has a source already associated with it). If you are only reading from the event log, another overload of the constructor might suffice.

The following table shows initial property values for an instance of `EventLog`.

|Property|Initial Value|
|--------------|-------------------|
|`EventLog.Source`|The `source` parameter.|
|`EventLog.Log`|The `logName` parameter.|
|`EventLog.MachineName`|The `machineName` parameter.|

#### Examples
The following example writes an entry to an event log, "MyNewLog", on the local computer, using the source "MySource".

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/.ctor/source2.cs._
