---
title: "EventLog class (part 6 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLog.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLog class (part 6 of 15)

## EventLog.Delete(String) method

```csharp
public static void Delete (string logName);
```

Removes an event log from the local computer.

Parameters:

- `logName`: The name of the log to delete. Possible values include: Application, Security, System, and any custom event logs on the computer.

Exceptions:

- `ArgumentException`: `logName` is an empty string ("") or `null`.
- `InvalidOperationException`: The registry key for the event log could not be opened on the local computer.

-or-

The log does not exist on the local computer.
- `Win32Exception`: The event log was not cleared successfully.

-or-

The log cannot be opened. A Windows error code is not available.

#### Remarks
Use this method when the log you want to delete is on the local computer. You can delete any log on the computer, provided you have the appropriate registry permissions.

`EventLog.Delete` removes the log specified by `logName` from the local computer. If you want to delete only the source registered to a log, call `EventLog.DeleteEventSource`. If you only want to delete the log entries, call `EventLog.Clear`. `EventLog.Delete` and `EventLog.DeleteEventSource` are `static` methods, so they can be called on the class itself. It is not necessary to create a new instance of `EventLog` to call either method.

The `EventLog.Delete` method first deletes the file that holds the contents of the log. It then accesses the registry and removes all the event sources registered for that log. If you recreate the log at a later point, you should register the event sources again, if they are to be reused. If you do not register the event sources and other users write to an event source without specifying a log name, the event source will be created in the Application event log. Therefore, applications that previously were able to write entries to the log you deleted and recreated will write to the Application log instead, because it now contains the event source.

> **Note:**
> Recreating an event log can be a difficult process. Avoid deleting any of the system-created event logs, such as the Application log.

Deleting a log through a call to `EventLog.Delete` automatically deletes the sources registered to that log. This can make other applications using that log inoperative.

#### Examples
The following example deletes a log from the local computer. The example determines the log from its source.

> **Note:**
> More than one source might write to an event log. Before deleting a custom log, make sure there are no other sources writing to that log.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/Delete/source1.cs._

## EventLog.Delete(String, String) method

```csharp
public static void Delete (string logName, string machineName);
```

Removes an event log from the specified computer.

Parameters:

- `logName`: The name of the log to delete. Possible values include: Application, Security, System, and any custom event logs on the specified computer.
- `machineName`: The name of the computer to delete the log from, or "." for the local computer.

Exceptions:

- `ArgumentException`: `logName` is an empty string ("") or `null`.

-or-

`machineName` is not a valid computer name.
- `InvalidOperationException`: The registry key for the event log could not be opened on the specified computer.

-or-

The log does not exist on the specified computer.
- `Win32Exception`: The event log was not cleared successfully.

-or-

The log cannot be opened. A Windows error code is not available.

#### Remarks
Use this method when the log you want to delete is on a remote computer. You can delete any log on the computer, provided you have the appropriate registry permissions.

`EventLog.Delete` removes the log specified by `logName` from the computer specified by `machineName`. If you want to delete only the source registered to a log, call `EventLog.DeleteEventSource`. If you only want to delete the log entries, call `EventLog.Clear`. `EventLog.Delete` and `EventLog.DeleteEventSource` are `static` methods, so they can be called on the class itself. It is not necessary to create an instance of `EventLog` to call either method.

This method first deletes the file that holds the contents of the log. It then accesses the registry and removes all the event sources registered for that log. If you recreate the log at a later point, you should register the event sources again, if they are to be reused. If you do not register the event sources and other users write to an event source without specifying a log name, the event source will be created in the Application event log. Therefore, applications that previously were able to write entries to the log you deleted and recreated will write to the Application log instead, because it now contains the event source.

> **Note:**
> Recreating an event log can be a difficult process. Avoid deleting any of the system-created event logs, such as the Application log.

Deleting a log through a call to `EventLog.Delete` automatically deletes the sources registered to that log. This can make other applications using that log inoperative.

#### Examples
The following example deletes a log from the specified computer. The example determines the log from its source.

> **Note:**
> More than one source might write to an event log. Before deleting a custom log, make sure there are no other sources writing to that log.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/Delete/source.cs._

## EventLog.DeleteEventSource(String) method

```csharp
public static void DeleteEventSource (string source);
```

Removes the event source registration from the event log of the local computer.

Parameters:

- `source`: The name by which the application is registered in the event log system.

Exceptions:

- `ArgumentException`: The `source` parameter does not exist in the registry of the local computer.

-or-

You do not have write access on the registry key for the event log.

#### Remarks
Use this method to remove the registration of a `EventLog.Source` from the local computer. `EventLog.DeleteEventSource` accesses the registry on the local computer and removes the registration of your application as a valid source of events.

You can remove your component as a valid source of events if you no longer need it to write entries to that log. For example, you might do this if you need to change your component from one log to another. Because a source can only be registered to one log at a time, changing the log requires you to remove the current registration.

`EventLog.DeleteEventSource` removes only the source registered to a log. If you want to remove the log itself, call `EventLog.Delete`. If you only want to delete the log entries, call `EventLog.Clear`. `EventLog.Delete` and `EventLog.DeleteEventSource` are `static` methods, so they can be called on the class itself. It is not necessary to create an instance of `EventLog` to call either method.

Deleting a log through a call to `EventLog.Delete` automatically deletes the sources registered to that log. This can make other applications using that log inoperative.

> **Note:**
> If a source has already been mapped to a log and you remap it to a new log, you must restart the computer for the changes to take effect.

#### Examples
The following example deletes a source from the local computer. The example determines the log from its source, and then deletes the log.

> **Note:**
> More than one source might write to an event log. Before deleting a custom log, make sure there are no other sources writing to that log.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/Delete/source1.cs._

## EventLog.DeleteEventSource(String, String) method

```csharp
public static void DeleteEventSource (string source, string machineName);
```

Removes the application's event source registration from the specified computer.

Parameters:

- `source`: The name by which the application is registered in the event log system.
- `machineName`: The name of the computer to remove the registration from, or "." for the local computer.

Exceptions:

- `ArgumentException`: The `machineName` parameter is invalid.

-or-

The `source` parameter does not exist in the registry of the specified computer.

-or-

You do not have write access on the registry key for the event log.
- `InvalidOperationException`: `source` cannot be deleted because in the registry, the parent registry key for `source` does not contain a subkey with the same name.

#### Remarks
Use this overload to remove the registration of a `EventLog.Source` from a remote computer. `EventLog.DeleteEventSource` accesses the registry on the computer specified by `machineName` and removes the registration of your application as a valid source of events.

You can remove your component as a valid source of events if you no longer need it to write entries to that log. For example, you might do this if you need to change your component from one log to another. Because a source can only be registered to one log at a time, changing the log requires you to remove the current registration.

`EventLog.DeleteEventSource` removes only the source registered to a log. If you want to remove the log itself, call `EventLog.Delete`. If you only want to delete the log entries, call `EventLog.Clear`. `EventLog.Delete` and `EventLog.DeleteEventSource` are `static` methods, so they can be called on the class itself. It is not necessary to create an instance of `EventLog` to call either method.

Deleting a log through a call to `EventLog.Delete` automatically deletes the sources registered to that log. This can make other applications using that log inoperative.

> **Note:**
> If a source has already been mapped to a log and you remap it to a new log, you must restart the computer for the changes to take effect.

#### Examples
The following example deletes a source from the specified computer. The example determines the log from its source, and then deletes the log.

> **Note:**
> More than one source might write to an event log. Before deleting a custom log, make sure there are no other sources writing to that log.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/Delete/source.cs._

## EventLog.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `EventLog`, and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is true, this method releases all resources held by any managed objects that this `EventLog` references. This method invokes the `Dispose()` method of each referenced object.

## EventLog.EndInit() method

```csharp
public void EndInit ();
```

Ends the initialization of an `EventLog` used on a form or by another component. The initialization occurs at runtime.

#### Remarks
The Visual Studio 2005 design environment uses this method to end the initialization of a component used on a form or by another component. The `EventLog.BeginInit` method starts the initialization. Using the `EventLog.BeginInit` and `EventLog.EndInit` methods prevents the control from being used before it is fully initialized.

## EventLog.Exists(String) method

```csharp
public static bool Exists (string? logName);
```

Determines whether the log exists on the local computer.

Parameters:

- `logName`: The name of the log to search for. Possible values include: Application, Security, System, other application-specific logs (such as those associated with Active Directory), or any custom log on the computer.

Returns: `true` if the log exists on the local computer; otherwise, `false`.

Exceptions:

- `ArgumentException`: The logName is `null` or the value is empty.

#### Remarks
Use this method to determine if a log exists on the local computer. If you want to determine whether a source exists on the local computer, use `EventLog.SourceExists`.

Because this method accesses the registry, you must have the appropriate registry permissions on the local computer; otherwise, the query returns `false`.

Because you cannot give a new log the name of an existing log on the same computer, use this method before creating a new log to determine if the specified `logName` already exists on the local computer. The `logName` parameter is not case sensitive.

`EventLog.Exists` is a `static` method, so it can be called on the class itself. It is not necessary to create an instance of `EventLog` to call `EventLog.Exists`.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLog/Exists/eventlog_exists_1.cs._

## EventLog.Exists(String, String) method

```csharp
public static bool Exists (string? logName, string machineName);
```

Determines whether the log exists on the specified computer.

Parameters:

- `logName`: The log for which to search. Possible values include: Application, Security, System, other application-specific logs (such as those associated with Active Directory), or any custom log on the computer.
- `machineName`: The name of the computer on which to search for the log, or "." for the local computer.

Returns: `true` if the log exists on the specified computer; otherwise, `false`.

Exceptions:

- `ArgumentException`: The `machineName` parameter is an invalid format. Make sure you have used proper syntax for the computer on which you are searching.

-or-

The `logName` is `null` or the value is empty.

#### Remarks
Use this method to determine if a log exists on a remote computer. If you want to determine whether a source exists on a remote computer, use `EventLog.SourceExists`.

Because this method accesses the registry, you must have the appropriate registry permissions on the specified computer; otherwise, the query returns `false`.

Because you cannot give a new log the name of an existing log on the same computer, use this method before creating a new log to determine if one with the specified `logName` already exists on the server specified by the `machineName` parameter. The `logName` and `machineName` parameters are not case sensitive.

`EventLog.Exists` is a `static` method, so it can be called on the class itself. It is not necessary to create a new instance of `EventLog` to call `EventLog.Exists`.
