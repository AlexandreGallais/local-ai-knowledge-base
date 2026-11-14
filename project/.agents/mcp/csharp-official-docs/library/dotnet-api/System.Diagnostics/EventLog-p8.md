---
title: "EventLog class (part 8 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLog.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLog class (part 8 of 15)

## EventLog.SourceExists(String) method

```csharp
public static bool SourceExists (string? source);
```

Determines whether an event source is registered on the local computer.

Parameters:

- `source`: The name of the event source.

Returns: `true` if the event source is registered on the local computer; otherwise, `false`.

Exceptions:

- `SecurityException`: `source` was not found, but some or all of the event logs could not be searched.

#### Remarks
Use this method to determine whether an event source exists on the local computer. If you want to determine whether a log exists on the local computer, use `EventLog.Exists`.

Because this method accesses the registry, you must have the appropriate registry permissions on the local computer; otherwise, a `SecurityException` will be thrown.

> **Note:**
> To search for an event source on Windows, you must have administrative privileges.
>
> The reason for this requirement is that all event logs, including security, must be searched to determine whether the event source is unique. Starting with Windows Vista, users do not have permission to access the security log; therefore, a `SecurityException` is thrown.
>
> Starting with Windows Vista, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

> **Note:**
> A service that is executing under the `LocalSystem` account does not have the privileges required to execute this method. The solution is to check whether the event source exists in the `ServiceInstaller`, and if it does not exist, to create the source in the installer.

Because you cannot give a new source the name of an existing source on the same computer, use this method before attempting to call `EventLog.CreateEventSource` to ensure that a source with the name specified by `source` does not already exist on the local computer. The `source` parameter is not case-sensitive.

#### Examples
The following example creates the source `MySource` if it does not already exist, and writes an entry to the event log `MyNewLog`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/Source/source.cs._

## EventLog.SourceExists(String, String) method

```csharp
public static bool SourceExists (string? source, string machineName);
```

Determines whether an event source is registered on a specified computer.

Parameters:

- `source`: The name of the event source.
- `machineName`: The name the computer on which to look, or "." for the local computer.

Returns: `true` if the event source is registered on the given computer; otherwise, `false`.

Exceptions:

- `ArgumentException`: `machineName` is an invalid computer name.
- `SecurityException`: `source` was not found, but some or all of the event logs could not be searched.

#### Remarks
Use this method to determine whether an event source exists on the computer specified by the `machineName` parameter. If you want to determine whether a log exists on the specified computer, use `EventLog.Exists`.

Because this method accesses the registry, you must have the appropriate registry permissions on the given server; otherwise, a `SecurityException` will be thrown.

> **Note:**
> To search for an event source on Windows, you must have administrative privileges.
>
> The reason for this requirement is that all event logs, including security, must be searched to determine whether the event source is unique. Starting with Windows Vista, users do not have permission to access the security log; therefore, a `SecurityException` is thrown.
>
> Starting with Windows Vista, User Account Control (UAC) determines the privileges of a user. If you are a member of the Built-in Administrators group, you are assigned two run-time access tokens: a standard user access token and an administrator access token. By default, you are in the standard user role. To execute the code that accesses performance counters, you must first elevate your privileges from standard user to administrator. You can do this when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

> **Note:**
> A service that is executing under the `LocalSystem` account does not have the privileges required to execute this method. The solution is to check whether the event source exists in the `ServiceInstaller`, and if it does not exist, to create the source in the installer.

Because you cannot give a new source the name of an existing source on the same computer, use this method before attempting to call `EventLog.CreateEventSource` to ensure that a source with the name specified by `source` does not already exist on the computer. The `source` and `machineName` parameters are not case sensitive.

`EventLog.SourceExists` is a `static` method, so it can be called on the class itself. It is not necessary to create an instance of `EventLog` to call `EventLog.SourceExists`.

#### Examples
The following example creates the source `MySource` on the computer `MyServer`, and writes an entry to the event log `MyNewLog`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/CreateEventSource/source.cs._

## EventLog.WriteEntry(String) method

```csharp
public void WriteEntry (string? message);
```

Writes an information type entry, with the given message text, to the event log.

Parameters:

- `message`: The string to write to the event log.

Exceptions:

- `ArgumentException`: The `EventLog.Source` property of the `EventLog` has not been set.

-or-

The method attempted to register a new event source, but the computer name in `EventLog.MachineName` is not valid.

-or-

The source is already registered for a different event log.

-or-

The message string is longer than 31,839 bytes (32,766 bytes on Windows operating systems before Windows Vista).

-or-

The source name results in a registry key path longer than 254 characters.
- `InvalidOperationException`: The registry key for the event log could not be opened.
- `Win32Exception`: The operating system reported an error when writing the event entry to the event log. A Windows error code is not available.

#### Remarks
Use this method to write an information entry to the event log associated with this `EventLog` instance. If you want to specify any other `EventLogEntryType`, use a different overload of `EventLog.WriteEntry`.

> **Note:**
> The `message` string cannot contain %*n*, where *n* is an integer value (for example, %1), because the event viewer treats it as an insertion string. Because an Internet Protocol, version 6 (IPv6) address can contain this character sequence, you cannot log an event message that contains an IPv6 address.

You must set the `Source` property on your `EventLog` component before you can write entries to the log. You must create and configure the event source before writing the first entry with the source.

Create the new event source during the installation of your application. This allows time for the operating system to refresh its list of registered event sources and their configuration. If the operating system has not refreshed its list of event sources, and you attempt to write an event with the new source, the write operation will fail. You can configure a new source using an `EventLogInstaller`, or using the `EventLog.CreateEventSource` method. You must have administrative rights on the computer to create a new event source.

If the source specified in the `Source` property of this `EventLog` instance is not registered on the computer that your component is writing to, `EventLog.WriteEntry` calls `EventLog.CreateEventSource` and registers the source.

> **Note:**
> If you do not specify a `EventLog.MachineName` for your `EventLog` instance before you call `EventLog.CreateEventSource` or `EventLog.WriteEntry`, the local computer (".") is assumed.

If the system needs to register the `EventLog.Source` through a call to `EventLog.WriteEntry` and the `Log` property has not been set on your `EventLog` instance, the log defaults to the Application log.

> **Note:**
> Many of the exceptions listed above are generated by errors raised during the process of registering the `EventLog.Source`.

The source must be configured either for writing localized entries or for writing direct strings. The `EventLog.WriteEntry` method writes the given string directly to the event log; it does not use a localizable message resource file. Use the `EventLog.WriteEvent` method to write events using a localized message resource file.

If your application writes entries using both resource identifiers and string values, you must register two separate sources. For example, configure one source with resource files, and then use that source in the `EventLog.WriteEvent` method to write entries using resource identifiers to the event log. Then create a different source without resource files, and use that source in the `EventLog.WriteEntry` method to write strings directly to the event log using that source.

> **Note:**
> If the `message` parameter contains a NUL character, the message in the event log is terminated at the NUL character.

#### Examples
The following example creates the source `MySource` if it does not already exist, and writes an entry to the event log `MyNewLog`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/Overview/source.cs._

## EventLog.WriteEntry(String, EventLogEntryType) method

```csharp
public void WriteEntry (string? message, System.Diagnostics.EventLogEntryType type);
```

Writes an error, warning, information, success audit, or failure audit entry with the given message text to the event log.

Parameters:

- `message`: The string to write to the event log.
- `type`: One of the `EventLogEntryType` values.

Exceptions:

- `ArgumentException`: The `EventLog.Source` property of the `EventLog` has not been set.

-or-

The method attempted to register a new event source, but the computer name in `EventLog.MachineName` is not valid.

-or-

The source is already registered for a different event log.

-or-

The message string is longer than 31,839 bytes (32,766 bytes on Windows operating systems before Windows Vista).

-or-

The source name results in a registry key path longer than 254 characters.
- `InvalidEnumArgumentException`: `type` is not a valid `EventLogEntryType`.
- `InvalidOperationException`: The registry key for the event log could not be opened.
- `Win32Exception`: The operating system reported an error when writing the event entry to the event log. A Windows error code is not available.

#### Remarks
Use this method to write an entry of a specified `EventLogEntryType` to the event log. The `type` is indicated by an icon and text in the Type column in the Event Viewer for a log.

> **Note:**
> The `message` string cannot contain %*n*, where *n* is an integer value (for example, %1), because the event viewer treats it as an insertion string. Because an Internet Protocol, version 6 (IPv6) address can contain this character sequence, you cannot log an event message that contains an IPv6 address.

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
The following example writes a warning entry to an event log, "MyNewLog", on the local computer.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/WriteEntry/source1.cs._
