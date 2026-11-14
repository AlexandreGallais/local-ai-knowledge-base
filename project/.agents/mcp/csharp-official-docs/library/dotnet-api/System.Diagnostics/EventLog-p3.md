---
title: "EventLog class (part 3 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLog.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLog class (part 3 of 15)

## EventLog.Source property

```csharp
public string Source { get; set; }
```

Gets or sets the source name to register and use when writing to the event log.

Returns: The name registered with the event log as a source of entries. The default is an empty string ("").

Exceptions:

- `ArgumentException`: The source name results in a registry key path longer than 254 characters.

#### Remarks
The event source indicates what logs the event. It is often the name of the application, or the name of a subcomponent of the application, if the application is large. Applications and services should write to the Application log or a custom log. Device drivers should write to the System log.

You only need to specify an event source if you are writing to an event log. Before writing an entry to an event log, you must register the event source with the event log as a valid source of events. When you write a log entry, the system uses the `Source` property to find the appropriate log in which to place your entry. If you are reading the event log, you can either specify the `EventLog.Source`, or a `EventLog.Log` and `EventLog.MachineName`.

> **Note:**
> You are not required to specify the `EventLog.MachineName` if you are connecting to a log on the local computer. If you do not specify the `EventLog.MachineName`, the local computer (".") is assumed.

Use `EventLog.WriteEvent` and `EventLog.WriteEntry` to write events to an event log. You must specify an event source to write events; you must create and configure the event source before writing the first entry with the source.

Create the new event source during the installation of your application. This allows time for the operating system to refresh its list of registered event sources and their configuration. If the operating system has not refreshed its list of event sources, and you attempt to write an event with the new source, the write operation will fail. You can configure a new source using an `EventLogInstaller`, or using the `EventLog.CreateEventSource` method. You must have administrative rights on the computer to create a new event source.

You can create an event source for an existing event log or a new event log. When you create a new source for a new event log, the system registers the source for that log, but the log is not created until the first entry is written to it.

The source must be unique on the local computer; a new source name cannot match an existing source name or an existing event log name. Each source can write to only one event log at a time; however, your application can use multiple sources to write to multiple event logs. For example, your application might require multiple sources configured for different event logs or different resource files.

If you change the `EventLog.Source` value, the `EventLog` to which it is registered is closed and all event handles are released.

The source must be configured either for writing localized entries or for writing direct strings. If your application writes entries using both resource identifiers and string values, you must register two separate sources. For example, configure one source with resource files, and then use that source in the `EventLog.WriteEvent` method to write entries using resource identifiers to the event log. Then create a different source without resource files, and use that source in the `EventLog.WriteEntry` method to write strings directly to the event log using that source.

To change the configuration details of an existing source, you must delete the source and then create it with the new configuration. If other applications or components use the existing source, create a new source with the updated configuration rather than deleting the existing source.

> **Note:**
> If a source has already been mapped to a log and you remap it to a new log, you must restart the computer for the changes to take effect.

#### Examples
The following example creates the source `MySource` if it does not already exist, and writes an entry to the event log `MyNewLog`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/Source/source.cs._

## EventLog.SynchronizingObject property

```csharp
public System.ComponentModel.ISynchronizeInvoke? SynchronizingObject { get; set; }
```

Gets or sets the object used to marshal the event handler calls issued as a result of an `EventLog` entry written event.

Returns: The `ISynchronizeInvoke` used to marshal event-handler calls issued as a result of an `EventLog.EntryWritten` event on the event log.

#### Remarks
When `EventLog.SynchronizingObject` is `null`, methods handling the `EntryWritten` event are called on a thread from the system thread pool. For more information on system thread pools, see `ThreadPool`.

When the `EntryWritten` event is handled by a visual Windows Forms component, such as a button, accessing the component through the system thread pool might not work, or might result in an exception. Avoid this by setting `EventLog.SynchronizingObject` to a Windows Forms component, which causes the methods handling the `EntryWritten` event to be called on the same thread on which the component was created.

If the `EventLog` is used inside Visual Studio 2005 in a Windows Forms designer, `EventLog.SynchronizingObject` is automatically set to the control containing the `EventLog`. For example, if you place an `EventLog` on a designer for Form1 (which inherits from `Form`) the `SynchronizingObject` property of `EventLog` is set to the instance of Form1.

## EventLog.BeginInit() method

```csharp
public void BeginInit ();
```

Begins the initialization of an `EventLog` used on a form or used by another component. The initialization occurs at runtime.

Exceptions:

- `InvalidOperationException`: `EventLog` is already initialized.

#### Remarks
The Visual Studio 2005 design environment uses this method to start the initialization of a component used on a form or by another component. The `EventLog.EndInit` method ends the initialization. Using the `EventLog.BeginInit` and `EventLog.EndInit` methods prevent the control from being used before it is fully initialized.

## EventLog.Clear() method

```csharp
public void Clear ();
```

Removes all entries from the event log.

Exceptions:

- `Win32Exception`: The event log was not cleared successfully.

-or-

The log cannot be opened. A Windows error code is not available.
- `ArgumentException`: A value is not specified for the `EventLog.Log` property. Make sure the log name is not an empty string.
- `InvalidOperationException`: The log does not exist.

#### Remarks
Event logs are set with a maximum size that determines how many entries they can contain. When an event log is full, it stops recording new event information or begins to overwrite earlier entries. If event recording stops, you can use this method to clear the log of existing entries and allow it to start recording events again. You must have administrator permissions to the computer on which the log resides to clear event log entries.

`EventLog.Clear` closes the event log, releases the event handles, retrieves new read and write handles, and reopens the event log. Events received after the call to the method are not cleared along with the existing events.

#### Examples
The following example clears an event log.

> **Caution:**
> Because Application, System, Security, and other non-custom logs can contain crucial information; be sure to specify a custom log before executing this example code. This example deletes the custom log `myNewLog`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/Clear/source.cs._

## EventLog.Close() method

```csharp
public void Close ();
```

Closes the event log and releases read and write handles.

Exceptions:

- `Win32Exception`: The event log's read handle or write handle was not released successfully.

#### Remarks
The `EventLog.Close` method is called by the protected `Component.Dispose` method. You do not need to invoke `EventLog.Close` before calling `Component.Dispose`.
