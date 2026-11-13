---
title: "dotnet-trace diagnostic tool - .NET CLI (part 5 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/dotnet-trace.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet-trace diagnostic tool - .NET CLI (part 5 of 5)

## Launch a child application and collect a trace from its startup using dotnet-trace

Sometimes it might be useful to collect a trace of a process from its startup. For apps running .NET 5 or later, it's possible to do this by using dotnet-trace.

The following command launches `hello.exe` with `arg1` and `arg2` as its command-line arguments and collects a trace from its runtime startup:

```dotnetcli
dotnet-trace collect -- hello.exe arg1 arg2
```

The preceding command generates output similar to the following:

```output
No profile or providers specified, defaulting to trace profiles 'dotnet-common' + 'dotnet-sampled-thread-time'.

Provider Name                           Keywords            Level               Enabled By
Microsoft-Windows-DotNETRuntime         0x000000100003801D  Informational(4)    --profile
Microsoft-DotNETCore-SampleProfiler     0x0000F00000000000  Informational(4)    --profile

Process        : E:\temp\gcperfsim\bin\Debug\net5.0\gcperfsim.exe
Output File    : E:\temp\gcperfsim\trace.nettrace

[00:00:00:05]   Recording trace 122.244  (KB)
Press <Enter> or <Ctrl+C> to exit...
```

You can stop collecting the trace by pressing `Enter` or `Ctrl` + `C`. Doing this also exits `hello.exe`.

> **Note:**
> Launching `hello.exe` via dotnet-trace redirects its input/output and you won't be able to interact with it on the console by default. Use the `--show-child-io` switch to interact with its stdin/stdout.
> Exiting the tool via `Ctrl` + `C` or SIGTERM safely ends both the tool and the child process.
> If the child process exits before the tool, the tool exits as well and the trace should be safely viewable.

## Use diagnostic port to collect a trace from app startup

Diagnostic port is a runtime feature added in .NET 5 that allows you to start tracing from app startup. To do this using `dotnet-trace`, you can either use `dotnet-trace collect -- <command>` as described in the examples above, or use the `--diagnostic-port` option.

Using `dotnet-trace <collect|monitor> -- <command>` to launch the application as a child process is the simplest way to quickly trace the application from its startup.

However, when you want to gain a finer control over the lifetime of the app being traced (for example, monitor the app for the first 10 minutes only and continue executing) or if you need to interact with the app using the CLI, using `--diagnostic-port` option allows you to control both the target app being monitored and `dotnet-trace`.

1. The following command makes `dotnet-trace` create a diagnostics socket named `myport.sock` and wait for a connection.

   ```dotnetcli
   dotnet-trace collect --diagnostic-port myport.sock
   ```

   Output:

   ```output
   Waiting for connection on myport.sock
   Start an application with the following environment variable: DOTNET_DiagnosticPorts=/home/user/myport.sock
   ```

2. In a separate console, launch the target application with the environment variable `DOTNET_DiagnosticPorts` set to the value in the `dotnet-trace` output.

   ```console
   export DOTNET_DiagnosticPorts=/home/user/myport.sock
   ./my-dotnet-app arg1 arg2
   ```

   This should then enable `dotnet-trace` to start tracing `my-dotnet-app`:

   ```output
   Waiting for connection on myport.sock
   Start an application with the following environment variable: DOTNET_DiagnosticPorts=myport.sock
   Starting a counter session. Press Q to quit.
   ```

   > **Important:**
   > Launching your app with `dotnet run` can be problematic because the dotnet CLI may spawn many child processes that are not your app and they can connect to `dotnet-trace` before your app, leaving your app to be suspended at runtime. It is recommended you directly use a self-contained version of the app or use `dotnet exec` to launch the application.

## (Linux-only) Collect a machine-wide trace using dotnet-trace

### Get symbols for native runtime frames

`collect-linux` captures native frames in callstacks. To resolve native method names for runtime libraries (such as `libcoreclr.so`), place the corresponding debug symbol files on disk beside the libraries. Without these symbols, native frames appear as unresolved addresses in the trace.

`collect-linux` dynamically enables perf map generation for JIT-compiled code when the trace begins, so you don't need to restart any .NET processes.

To download native runtime symbols, use dotnet-symbol:

1. Install `dotnet-symbol`:

   ```dotnetcli
   dotnet tool install -g dotnet-symbol
   ```

1. Download the debug symbols for your runtime version. For example, if your runtime is installed at `/usr/share/dotnet/shared/Microsoft.NETCore.App/10.0.0`:

   ```dotnetcli
   dotnet-symbol --symbols /usr/share/dotnet/shared/Microsoft.NETCore.App/10.0.0/lib*.so
   ```

1. Place the downloaded `.so.dbg` files beside the runtime libraries they correspond to (for example, `libcoreclr.so.dbg` next to `libcoreclr.so`). By default, `dotnet-symbol` writes symbol files next to each input file. If your runtime libraries live under a protected path such as `/usr/share/dotnet/...`, run `dotnet-symbol` with elevated permissions (for example, by using `sudo`), or use the `-o`/`--output` option to write to a writable directory, then copy the `.so.dbg` files beside the runtime libraries.

After you place the symbols, `collect-linux` resolves native method names when it collects the trace.

This example captures CPU samples for all processes on the machine. Any processes running .NET 10+ will also include some additional lightweight events describing GC, JIT, and Assembly loading behavior.

  ```output
  $ sudo dotnet-trace collect-linux
  No providers, profiles, ClrEvents, or PerfEvents were specified, defaulting to trace profiles 'dotnet-common' + 'cpu-sampling'.

  Provider Name                           Keywords            Level               Enabled By
  Microsoft-Windows-DotNETRuntime         0x000000100003801D  Informational(4)    --profile

  Linux Perf Events                                                               Enabled By
  cpu-sampling                                                                    --profile

  Output File    : <path-to-nettrace>trace_20251008_181939.nettrace

  [00:00:00:03]   Recording trace.
  Press <Enter> or <Ctrl-C> to exit...

  Recording stopped.
  Resolving symbols.
  Finished recording trace.
  Trace written to <path-to-nettrace>trace_20251008_181939.nettrace
  ```

For environments with multiple .NET versions installed, running `collect-linux` in probe mode helps discern whether a .NET process is capable of being traced with collect-linux.

  ```output
  $ dotnet-trace collect-linux --probe
  Probing .NET processes for support of the EventPipe UserEvents IPC command used by collect-linux. Requires runtime '10.0.0' or later.
  .NET processes that support the command:
  3802935 MyApp

  .NET processes that do NOT support the command:
  3809123 dotnet - Detected runtime: '10.0.0-rc.1.25451.107'
  ```

## View the trace captured from dotnet-trace

On Windows, you can view *.nettrace* files in Visual Studio or PerfView for analysis.

On Linux, you can view the trace by changing the output format of `dotnet-trace` to `speedscope`. Change the output file format by using the `-f|--format` option. You can choose between `nettrace` (the default option) and `speedscope`. The option `-f speedscope` will make `dotnet-trace` produce a `speedscope` file. `Speedscope` files can be opened at <https://www.speedscope.app>.

For traces collected on non-Windows platforms, you can also move the trace file to a Windows machine and view it in Visual Studio or PerfView.

> **Note:**
> The .NET Core runtime generates traces in the `nettrace` format. The traces are converted to speedscope (if specified) after the trace is completed. Since some conversions may result in loss of data, the original `nettrace` file is preserved next to the converted file.

## Use .rsp file to avoid typing long commands

You can launch `dotnet-trace` with an `.rsp` file that contains the arguments to pass. This can be useful when enabling providers that expect lengthy arguments or when using a shell environment that strips characters.

For example, the following provider can be cumbersome to type out each time you want to trace:

```dotnetcli
dotnet-trace collect --providers Microsoft-Diagnostics-DiagnosticSource:0x3:5:FilterAndPayloadSpecs="SqlClientDiagnosticListener/System.Data.SqlClient.WriteCommandBefore@Activity1Start:-Command;Command.CommandText;ConnectionId;Operation;Command.Connection.ServerVersion;Command.CommandTimeout;Command.CommandType;Command.Connection.ConnectionString;Command.Connection.Database;Command.Connection.DataSource;Command.Connection.PacketSize\r\nSqlClientDiagnosticListener/System.Data.SqlClient.WriteCommandAfter@Activity1Stop:\r\nMicrosoft.EntityFrameworkCore/Microsoft.EntityFrameworkCore.Database.Command.CommandExecuting@Activity2Start:-Command;Command.CommandText;ConnectionId;IsAsync;Command.Connection.ClientConnectionId;Command.Connection.ServerVersion;Command.CommandTimeout;Command.CommandType;Command.Connection.ConnectionString;Command.Connection.Database;Command.Connection.DataSource;Command.Connection.PacketSize\r\nMicrosoft.EntityFrameworkCore/Microsoft.EntityFrameworkCore.Database.Command.CommandExecuted@Activity2Stop:",OtherProvider,AnotherProvider
```

In addition, the previous example contains `"` as part of the argument. Because quotes are not handled equally by each shell, you may experience various issues when using different shells. For example, the command to enter in `zsh` is different to the command in `cmd`.

Instead of typing this each time, you can save the following text into a file called `myprofile.rsp`.

```txt
--providers
Microsoft-Diagnostics-DiagnosticSource:0x3:5:FilterAndPayloadSpecs="SqlClientDiagnosticListener/System.Data.SqlClient.WriteCommandBefore@Activity1Start:-Command;Command.CommandText;ConnectionId;Operation;Command.Connection.ServerVersion;Command.CommandTimeout;Command.CommandType;Command.Connection.ConnectionString;Command.Connection.Database;Command.Connection.DataSource;Command.Connection.PacketSize\r\nSqlClientDiagnosticListener/System.Data.SqlClient.WriteCommandAfter@Activity1Stop:\r\nMicrosoft.EntityFrameworkCore/Microsoft.EntityFrameworkCore.Database.Command.CommandExecuting@Activity2Start:-Command;Command.CommandText;ConnectionId;IsAsync;Command.Connection.ClientConnectionId;Command.Connection.ServerVersion;Command.CommandTimeout;Command.CommandType;Command.Connection.ConnectionString;Command.Connection.Database;Command.Connection.DataSource;Command.Connection.PacketSize\r\nMicrosoft.EntityFrameworkCore/Microsoft.EntityFrameworkCore.Database.Command.CommandExecuted@Activity2Stop:",OtherProvider,AnotherProvider
```

Once you've saved `myprofile.rsp`, you can launch `dotnet-trace` with this configuration using the following command:

```dotnetcli
dotnet-trace @myprofile.rsp
```

## See also

- Well-known event providers from .NET
