---
title: "dotnet-stack diagnostic tool - .NET CLI"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/dotnet-stack.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Inspect managed stack traces (dotnet-stack)

**This article applies to:** ✔️ `dotnet-stack` version 5.0.221401 and later versions

## Install

There are two ways to download and install `dotnet-stack`:

- **dotnet global tool:**

  To install the latest release version of the `dotnet-stack` NuGet package, use the dotnet tool install command:

  ```dotnetcli
  dotnet tool install --global dotnet-stack
  ```

- **Direct download:**

  Download the tool executable that matches your platform:

  | OS  | Platform |
  | --- | -------- |
  | Windows | x86 \| x64 \| Arm \| Arm-x64 |
  | Linux   | x64 \| Arm \| Arm64 \| musl-x64 \| musl-Arm64 |

## Synopsis

```console
dotnet-stack [-h, --help] [--version] <command>
```

## Description

The `dotnet-stack` tool:

* Is a cross-platform .NET Core tool.
* Captures and prints the managed stacks for all threads in the target .NET process.
* Utilizes `EventPipe` tracing provided by the .NET Core runtime.

## Options

- **`-h|--help`**

  Shows command-line help.

- **`--version`**

  Displays the version of the dotnet-stack utility.

## Commands

| Command                                               | Description                                                             |
|-------------------------------------------------------|-------------------------------------------------------------------------|
| dotnet-stack report           | Prints the stack trace for each thread in the target process.           |
| dotnet-stack ps                   | Lists the dotnet processes that stack traces can be collected from.     |
| dotnet-stack symbolicate | Get the line number from the Method Token and IL Offset in a stacktrace.|

## dotnet-stack report

Prints the stack trace for each thread in the target process.

### Synopsis

```console
dotnet-stack report -p|--process-id <pid>
                    -n|--name <process-name>
                    [-h|--help]
```

### Options

- **`-n, --name <name>`**

  The name of the process to report the stack from.

- **`-p|--process-id <PID>`**

  The process ID to report the stack from.

## dotnet-stack ps

 Lists the dotnet processes that stack traces can be collected from.
 `dotnet-stack` version 6.0.320703 and later versions also display the command-line arguments that each process was started with, if available.

### Synopsis

```console
dotnet-stack ps [-h|--help]
```

### Example

Suppose you start a long-running app using the command ```dotnet run --configuration Release```. In another window, you run the ```dotnet-stack ps``` command. The output you'll see is as follows. The command-line arguments, if any, are shown in `dotnet-stack` version 6.0.320703 and later.

```console
> dotnet-stack ps
  
  21932 dotnet     C:\Program Files\dotnet\dotnet.exe   run --configuration Release
  36656 dotnet     C:\Program Files\dotnet\dotnet.exe
```

## dotnet-stack symbolicate

Get the line number from the Method Token and IL Offset in a stacktrace.

### Synopsis

```console
dotnet-stack symbolicate <input-path> [-d|--search-dir] [-o|--output] [-c|--stdout] [-h|--help]
```

### Options

- **`-d, --search-dir <directory1 directory2 ...>`**

  Path of multiple directories with assembly and pdb.

- **`-o, --output <output-path>`**

  Output directly to a file.

- **`-c, --stdout`**

  Output directly to a console.

### Example

```console
> cat stack.trace

Unhandled exception. System.NullReferenceException: Object reference not set to an instance of an object.
   at DotnetStackSymbolicate.App.MethodA() in DotnetStackSymbolicate.dll:token <example-value>
   at DotnetStackSymbolicate.App..ctor() in DotnetStackSymbolicate.dll:token <example-value>
   at DotnetStackSymbolicate.Program.OnCreate() in DotnetStackSymbolicate.Tizen.dll:token <example-value>
onSigabrt called
>
> dotnet-stack symbolicate stack.trace --stdout

Unhandled exception. System.NullReferenceException: Object reference not set to an instance of an object.
   at DotnetStackSymbolicate.App.MethodA() in C:\DotnetStackSymbolicate\DotnetStackSymbolicate.cs:line 19
   at DotnetStackSymbolicate.App..ctor() in C:\DotnetStackSymbolicate\DotnetStackSymbolicate.cs:line 38
   at DotnetStackSymbolicate.Program.OnCreate() in C:\DotnetStackSymbolicate.Tizen\DotnetStackSymbolicate.Tizen.cs:line 12
onSigabrt called

Output: stack.trace.symbolicated
```

## Report managed stacks with dotnet-stack

To report managed stacks using `dotnet-stack`:

- Get the process identifier (PID) of the .NET Core application to report stacks from.

  - On Windows, you can use Task Manager or the `tasklist` command, for example.
  - On Linux, for example, the `ps` command.
  - dotnet-stack ps

- Run the following command:

  ```console
  dotnet-stack report --process-id <PID>
  ```

  The preceding command generates output similar to the following:

  ```console
  Thread (0x48839B):
    [Native Frames]
    System.Console!System.IO.StdInReader.ReadKey(bool&)
    System.Console!System.IO.SyncTextReader.ReadKey(bool&)
    System.Console!System.ConsolePal.ReadKey(bool)
    System.Console!System.Console.ReadKey()
    StackTracee!Tracee.Program.Main(class System.String[])
  ```

  The output of `dotnet-stack` follows the following form:

  - Comments in the output are prefixed with `#`.
  - Each thread has a header that includes the native thread ID: `Thread (<thread-id>):`.
  - Stack frames follow the form `Module!Method`.
  - Transitions to unmanaged code are represented as `[Native Frames]` in the output.

  ```console
  # comment
  Thread (0x1234):
    module!Method
    module!Method

  Thread (0x5678):
    [Native Frames]
    Module!Method
    Module!Method
  ```

> **Note:**
> Stopping the process can take a long time (up to several minutes) for very large applications. The runtime needs to send over the type and method information for all managed code that was captured to resolve function names.

## Next steps

- Use dotnet-trace to collect CPU samples of a .NET application
- Use dotnet-dump to collect a dump of a .NET application
