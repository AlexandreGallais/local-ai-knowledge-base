---
title: "System.Diagnostics namespace"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/ns-System.Diagnostics.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# System.Diagnostics namespace

Provides classes that allow you to interact with system processes, event logs, and performance counters.

#### Remarks

- The `EventLog` component provides functionality to write to event logs, read event log entries, and create and delete event logs and event sources on the network. The `EntryWrittenEventHandler` provides a way to interact with event logs asynchronously. Supporting classes provide access to more detailed control, including: permission restrictions, the ability to specify event log types (which controls the type of default data that is written with an event log entry), and iterate through collections of event log entries. For more information about these tasks, see the `EventLogPermission`, `EventLogEntryType`, and `EventLogEntryCollection` classes.

- The `Process` class provides functionality to monitor system processes across the network, and to start and stop local system processes. In addition to retrieving lists of running processes (by specifying either the computer, the process name, or the process id) or viewing information about the process that currently has access to the processor, you can get detailed knowledge of process threads and modules both through the `Process` class itself, and by interacting with the `ProcessThread` and `ProcessModule` classes. The `ProcessStartInfo` class enables you to specify a variety of elements with which to start a new process, such as input, output, and error streams, working directories, and command line verbs and arguments. These give you fine control over the behavior of your processes. Other related classes let you specify window styles, process and thread priorities, and interact with collections of threads and modules.

- The `PerformanceCounter` class enables you to monitor system performance, while the `PerformanceCounterCategory` class provides a way to create new custom counters and categories. You can write to local custom counters and read from both local and remote counters (system as well as custom). You can sample counters using the `PerformanceCounter` class, and calculate results from successive performance counter samples using the `CounterSample` class. The `CounterCreationData` class enables you to create multiple counters in a category and specify their types. Other classes associated with the performance counter component provide access to collections of counters, counter permission, and counter types.

The `Diagnostics` namespace also provides classes that allow you to debug your application and to trace the execution of your code. For more information, see the `Trace` and `Debug` classes.
