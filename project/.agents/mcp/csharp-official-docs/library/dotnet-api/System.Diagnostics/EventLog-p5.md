---
title: "EventLog class (part 5 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLog.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLog class (part 5 of 15)

## EventLog.CreateEventSource(String, String) method

```csharp
public static void CreateEventSource (string source, string logName);
```

Establishes the specified source name as a valid event source for writing entries to a log on the local computer. This method can also create a new custom log on the local computer.

Parameters:

- `source`: The source name by which the application is registered on the local computer.
- `logName`: The name of the log the source's entries are written to. Possible values include Application, System, or a custom event log.

Exceptions:

- `ArgumentException`: `source` is an empty string ("") or `null`.

-or-

`logName` is not a valid event log name. Event log names must consist of printable characters, and cannot include the characters '*', '?', or '\\'.

-or-

`logName` is not valid for user log creation. The event log names AppEvent, SysEvent, and SecEvent are reserved for system use.

-or-

The log name matches an existing event source name.

-or-

The source name results in a registry key path longer than 254 characters.

-or-

The first 8 characters of `logName` match the first 8 characters of an existing event log name.

-or-

The source cannot be registered because it already exists on the local computer.

-or-

The source name matches an existing event log name.
- `InvalidOperationException`: The registry key for the event log could not be opened on the local computer.

#### Remarks
Use this overload to create a custom log or to create and register a `EventLog.Source` to an existing log on the local computer.

If `logName` is `null` or an empty string ("") when you call `EventLog.CreateEventSource`, the log defaults to the Application log. If the log does not exist on the local computer, the system creates a custom log and registers your application as a `EventLog.Source` for that log.

> **Note:**
> To create an event source on Windows, you must have administrative privileges.
>
> The reason for this requirement is that all event logs, including security, must be searched to determine whether the event source is unique. Starting with Windows Vista, users do not have permission to access the security log; therefore, a `SecurityException` is thrown.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses the security log, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

You only need to create an event source if you are writing to the event log. Before writing an entry to an event log, you must register the event source with the event log as a valid source of events. When you write a log entry, the system uses the `EventLog.Source` to find the appropriate log in which to place your entry. If you are reading the event log, you can either specify the `EventLog.Source`, or a `EventLog.Log` and `EventLog.MachineName`.

> **Note:**
> You are not required to specify the `EventLog.MachineName` if you are connecting to a log on the local computer. If you do not specify the `EventLog.MachineName` when reading from a log, the local computer (".") is assumed.

Use `EventLog.WriteEvent` and `EventLog.WriteEntry` to write events to an event log. You must specify an event source to write events; you must create and configure the event source before writing the first entry with the source.

Create the new event source during the installation of your application. This allows time for the operating system to refresh its list of registered event sources and their configuration. If the operating system has not refreshed its list of event sources, and you attempt to write an event with the new source, the write operation will fail. You can configure a new source using an `EventLogInstaller`, or using the `EventLog.CreateEventSource` method. You must have administrative rights on the computer to create a new event source.

You can create an event source for an existing event log or a new event log. When you create a new source for a new event log, the system registers the source for that log, but the log is not created until the first entry is written to it.

The operating system stores event logs as files. When you use `EventLogInstaller` or `EventLog.CreateEventSource` to create a new event log, the associated file is stored in the %SystemRoot%\System32\Config directory on the specified computer. The file name is set by appending the first 8 characters of the `Log` property with the ".evt" file name extension.

The source must be unique on the local computer; a new source name cannot match an existing source name or an existing event log name. Each source can write to only one event log at a time; however, your application can use multiple sources to write to multiple event logs. For example, your application might require multiple sources configured for different event logs or different resource files.

The source must be configured either for writing localized entries or for writing direct strings. If your application writes entries using both resource identifiers and string values, you must register two separate sources. For example, configure one source with resource files, and then use that source in the `EventLog.WriteEvent` method to write entries using resource identifiers to the event log. Then create a different source without resource files, and use that source in the `EventLog.WriteEntry` method to write strings directly to the event log using that source.

To change the configuration details of an existing source, you must delete the source and then create it with the new configuration. If other applications or components use the existing source, create a new source with the updated configuration rather than deleting the existing source.

> **Note:**
> If a source has already been mapped to a log and you remap it to a new log, you must restart the computer for the changes to take effect.

#### Examples
The following example creates the source `MySource` if it does not already exist, and writes an entry to the event log `MyNewLog`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/Overview/source.cs._

## EventLog.CreateEventSource(String, String, String) method

```csharp
public static void CreateEventSource (string source, string logName, string machineName);
```

Establishes the specified source name as a valid event source for writing entries to a log on the specified computer. This method can also be used to create a new custom log on the specified computer.

Parameters:

- `source`: The source by which the application is registered on the specified computer.
- `logName`: The name of the log the source's entries are written to. Possible values include Application, System, or a custom event log. If you do not specify a value, `logName` defaults to Application.
- `machineName`: The name of the computer to register this event source with, or "." for the local computer.

Exceptions:

- `ArgumentException`: The `machineName` is not a valid computer name.

-or-

`source` is an empty string ("") or `null`.

-or-

`logName` is not a valid event log name. Event log names must consist of printable characters, and cannot include the characters '*', '?', or '\\'.

-or-

`logName` is not valid for user log creation. The event log names AppEvent, SysEvent, and SecEvent are reserved for system use.

-or-

The log name matches an existing event source name.

-or-

The source name results in a registry key path longer than 254 characters.

-or-

The first 8 characters of `logName` match the first 8 characters of an existing event log name on the specified computer.

-or-

The source cannot be registered because it already exists on the specified computer.

-or-

The source name matches an existing event source name.
- `InvalidOperationException`: The registry key for the event log could not be opened on the specified computer.

#### Remarks
Use this overload to create a custom log or to create and register a `EventLog.Source` to an existing log on the specified computer.

If `logName` is `null` or an empty string ("") when you call `EventLog.CreateEventSource`, the log defaults to the Application log. If the log does not exist on the specified computer, the system creates a custom log and registers your application as a `EventLog.Source` for that log.

You only need to create an event source if you are writing to the event log. Before writing an entry to an event log, you must register the event source with the event log as a valid source of events. When you write a log entry, the system uses the `EventLog.Source` to find the appropriate log in which to place your entry. If you are reading the event log, you can either specify the `EventLog.Source`, or a `EventLog.Log` and `EventLog.MachineName`.

> **Note:**
> To create an event source on Windows, you must have administrative privileges.
>
> The reason for this requirement is that all event logs, including security, must be searched to determine whether the event source is unique. In Windows Vista and later, users do not have permission to access the security log; therefore, a `SecurityException` is thrown.
>
> In Windows Vista and later, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses the security log, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

Use `EventLog.WriteEvent` and `EventLog.WriteEntry` to write events to an event log. You must specify an event source to write events; you must create and configure the event source before writing the first entry with the source.

Create the new event source during the installation of your application. This allows time for the operating system to refresh its list of registered event sources and their configuration. If the operating system has not refreshed its list of event sources, and you attempt to write an event with the new source, the write operation will fail. You can configure a new source using an `EventLogInstaller`, or using the `EventLog.CreateEventSource` method. You must have administrative rights on the computer to create a new event source.

You can create an event source for an existing event log or a new event log. When you create a new source for a new event log, the system registers the source for that log, but the log is not created until the first entry is written to it.

The operating system stores event logs as files. When you use `EventLogInstaller` or `EventLog.CreateEventSource` to create a new event log, the associated file is stored in the %SystemRoot%\System32\Config directory on the specified computer. The file name is set by appending the first 8 characters of the `Log` property with the ".evt" file name extension.

The source must be unique on the local computer; a new source name cannot match an existing source name or an existing event log name. Each source can write to only one event log at a time; however, your application can use multiple sources to write to multiple event logs. For example, your application might require multiple sources configured for different event logs or different resource files.

The source must be configured either for writing localized entries or for writing direct strings. If your application writes entries using both resource identifiers and string values, you must register two separate sources. For example, configure one source with resource files, and then use that source in the `EventLog.WriteEvent` method to write entries using resource identifiers to the event log. Then create a different source without resource files, and use that source in the `EventLog.WriteEntry` method to write strings directly to the event log using that source.

To change the configuration details of an existing source, you must delete the source and then create it with the new configuration. If other applications or components use the existing source, create a new source with the updated configuration rather than deleting the existing source.

> **Note:**
> If a source has already been mapped to a log and you remap it to a new log, you must restart the computer for the changes to take effect.
