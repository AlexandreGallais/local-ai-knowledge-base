---
title: "dotnet-coverage code coverage tool - .NET CLI (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/additional-tools/dotnet-coverage.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet-coverage code coverage utility

**This article applies to:** ✔️ .NET 8 SDK and later versions

## Synopsis

```console
dotnet-coverage <command> [-h, --help] [--version]
```

## Description

The `dotnet-coverage` tool:

* Enables the cross-platform collection of code coverage data of a running process.
* Provides cross-platform merging of code coverage reports.

## Options

* **`-h|--help`**

  Shows command-line help.

* **`--version`**

  Displays the version of the dotnet-coverage utility.

## Install

To install the latest release version of the `dotnet-coverage` NuGet package, use the dotnet tool install command:

```dotnetcli
dotnet tool install --global dotnet-coverage
```

## Commands

| Command                                                   |
|-----------------------------------------------------------|
| dotnet-coverage merge           |
| dotnet-coverage collect       |
| dotnet-coverage connect       |
| dotnet-coverage snapshot     |
| dotnet-coverage shutdown     |
| dotnet-coverage instrument |
| dotnet-coverage uninstrument |

## dotnet-coverage merge

The `merge` command is used to merge several code coverage reports into one. This command is available on all platforms. This command supports the following code coverage report formats:

* `coverage`
* `cobertura`
* `xml`

### Synopsis

```console
dotnet-coverage merge
    <files>...
    [--remove-input-files]
    [-o|--output <output>] [-f|--output-format <output-format>]
    [-l|--log-file <log-file>] [-ll|--log-level <log-level>]
    [-dco|--disable-console-output] [--nologo]
    [-?|-h|--help]
```

### Arguments

* **`<files>`**

  The input code coverage reports.

### Options

* **`--remove-input-files`**

  Removes all input coverage reports that were merged.

* **`-r, --recursive`**

  .NET 7 SDK and earlier versions only Search for coverage reports in subdirectories.

* **`-o|--output <output>`**

  Sets the code coverage report output file.

* **`-f|--output-format <output-format>`**

  The output file format. Supported values: `coverage`, `xml`, and `cobertura`. Default is `coverage` (binary format that can be opened in Visual Studio).

* **`-l|--log-file <log-file>`**

  Sets the log file path. When you provide a directory (with a path separator at the end), a new log file is generated for each process under analysis.

* **`-ll|--log-level <log-level>`**

  Sets the log level. Supported values: `Error`, `Info`, and  `Verbose`.

* **`-dco|--disable-console-output`**

  Disables console output.

* **`--nologo`**

  Do not display Code Coverage banner.

## dotnet-coverage collect

The `collect` command is used to collect code coverage data for any .NET process and its subprocesses. For example, you can collect code coverage data for a console application or a Blazor application. This command supports dynamic and static instrumentation. Static instrumentation is available on all platforms. You can specify files to be statically instrumented using `include-files` option. Dynamic instrumentation is available on Windows (x86, x64 and Arm64), Linux (x64), and macOS (x64). The command supports only .NET modules. Native modules are not supported.

### Synopsis

The `collect` command can run in two modes.

#### Command Mode

The `collect` command will collect code coverage for the given process executed by the `command` argument.

```console
dotnet-coverage collect
    <command> <args>...
    [-s|--settings <settings>] [-id|--session-id <session-id>]
    [-if|--include-files <include-files>] [-o|--output <output>] [-f|--output-format <output-format>]
    [-l|--log-file <log-file>] [-ll|--log-level <log-level>]
    [-dco|--disable-console-output] [--nologo]
    [-?|-h|--help]
```

#### Server Mode

The `collect` command hosts a server for code coverage collection. Clients can connect to the server via `connect` command.

```console
dotnet-coverage collect
    [-s|--settings <settings>] [-id|--session-id <session-id>]
    [-sv|--server-mode] [-b|--background] [-t|--timeout]
    [-if|--include-files <include-files>] [-o|--output <output>] [-f|--output-format <output-format>]
    [-l|--log-file <log-file>] [-ll|--log-level <log-level>]
    [-dco|--disable-console-output] [--nologo]
    [-?|-h|--help]
```

### Arguments

* **`<command>`**

  The command for which to collect code coverage data.

* **`<args>`**

  The command line arguments for the command.

### Options

* **`-s|--settings <settings>`**

  Sets the path to the XML code coverage settings.

* **`-id|--session-id <session-id>`**

  Specifies the code coverage session ID. If not provided, the tool will generate a random GUID.

* **`-sv|--server-mode`**

  Starts the collector in server mode. Clients can connect to the server with the `connect` command.

* **`-b|--background`**

  Starts code coverage collection server in a new background process. Clients can connect to the server with the `connect` command.

* **`-t|--timeout`**

  Timeout (in milliseconds) for interprocess communication between clients and the server.

* **`-if|--include-files <include-files>`**

  Specifies list of files to be statically instrumented.

* **`-o|--output <output>`**

  Sets the code coverage report output file.

* **`-f|--output-format <output-format>`**

  The output file format. Supported values: `coverage`, `xml`, and `cobertura`. Default is `coverage` (binary format that can be opened in Visual Studio).

* **`-l|--log-file <log-file>`**

  Sets the log file path. When you provide a directory (with a path separator at the end), a new log file is generated for each process under analysis.

* **`-ll|--log-level <log-level>`**

  Sets the log level. Supported values: `Error`, `Info`, and  `Verbose`.

* **`-dco|--disable-console-output`**

  Disables console output.

* **`--nologo`**

  Do not display Code Coverage banner.

## dotnet-coverage connect

The `connect` command is used to connect with the existing server and collects code coverage data for any .NET process and its subprocesses. For example, you can collect code coverage data for a console application or a Blazor application. The command supports only .NET modules. Native modules are not supported.

> **Note:**
> Command will use dynamic instrumentation for all subprocesses which is available on Windows (x86, x64 and Arm64), Linux (x64), and macOS (x64). If you need to statically instrument any .NET module use `instrument` command (with corresponding session ID option) before executing `connect` command.

### Synopsis

```console
dotnet-coverage connect
    <session> <command> <args>...
    [-b|--background] [-t|--timeout]
    [-l|--log-file <log-file>] [-ll|--log-level <log-level>]
    [-dco|--disable-console-output] [--nologo]
    [-?|-h|--help]
```

### Arguments

* **`<session>`**

  The session ID of the server hosted by the `collect` command.

* **`<command>`**

  The command for which to collect code coverage data.

* **`<args>`**

  The command line arguments for the command.

### Options

* **`-b|--background`**

  Starts the client in a new background process.

* **`-t|--timeout`**

  Timeout (in milliseconds) for interprocess communication between the client and the server.* **`-l|--log-file <log-file>`**

* **`-l|--log-file <log-file>`**

  Sets the log file path. When you provide a directory (with a path separator at the end), a new log file is generated for each process under analysis.

* **`-ll|--log-level <log-level>`**

  Sets the log level. Supported values: `Error`, `Info`, and  `Verbose`.

* **`-dco|--disable-console-output`**

  Disables console output.

* **`--nologo`**

  Do not display Code Coverage banner.

## dotnet-coverage snapshot

Creates a coverage file for existing code coverage collection.

### Synopsis

```console
dotnet-coverage snapshot
    <session>
    [-r|--reset]
    [-tn|--tag-name <tag-name>] [-tid|--tag-identifier <tag-identifier>]
    [-o|--output <output>]
    [-t|--timeout]
    [-l|--log-file <log-file>] [-ll|--log-level <log-level>]
    [-dco|--disable-console-output] [--nologo]
    [-?|-h|--help]
```

### Arguments

* **`<session>`**

  The session ID of the collection for which a coverage file is to be generated.

### Options

* **`-r|--reset <reset>`**

  Clears existing coverage information after a coverage file is created.

* **`-tn|--tag-name <tag-name>`**

  Creates a snapshot tag name in the coverage file with current coverage information. Tag-name and tag-identifier are mutually inclusive.

* **`-tid|--tag-identifier <tag-identifier>`**

  Creates a snapshot tag identifier in the coverage file with current coverage information. Tag-name and tag-identifier are mutually inclusive.

* **`-o|--output <output>`**

  Sets the code coverage report output file. If not provided, it's generated automatically with a timestamp.

* **`-t|--timeout`**

  Timeout (in milliseconds) for interprocess communication between the client and the server.

* **`-l|--log-file <log-file>`**

  Sets the log file path. When you provide a directory (with a path separator at the end), a new log file is generated for each process under analysis.

* **`-ll|--log-level <log-level>`**

  Sets the log level. Supported values: `Error`, `Info`, and  `Verbose`.

* **`-dco|--disable-console-output`**

  Disables console output.

* **`--nologo`**

  Do not display Code Coverage banner.

## dotnet-coverage shutdown

Closes existing code coverage collection.

### Synopsis

```console
dotnet-coverage shutdown
    <session>
    [-t|--timeout]
    [-l|--log-file <log-file>] [-ll|--log-level <log-level>]
    [-dco|--disable-console-output] [--nologo]
    [-?|-h|--help]
```

### Arguments

* **`<session>`**

  The session ID of the collection to be closed.

### Options

* **`-t|--timeout`**

  Timeout (in milliseconds) for interprocess communication with the server.

* **`-l|--log-file <log-file>`**

  Sets the log file path. When you provide a directory (with a path separator at the end), a new log file is generated for each process under analysis.

* **`-ll|--log-level <log-level>`**

  Sets the log level. Supported values: `Error`, `Info`, and  `Verbose`.

* **`-dco|--disable-console-output`**

  Disables console output.

* **`--nologo`**

  Do not display Code Coverage banner.

## dotnet-coverage instrument

The instrument command is used to instrument binary on disk.

### Synopsis

```console
dotnet-coverage instrument
    <input-file>
    [-s|--settings <settings>] [-id|--session-id <session-id>]
    [-o|--output <output>]
    [-l|--log-file <log-file>] [-ll|--log-level <log-level>]
    [-dco|--disable-console-output] [--nologo]
    [-?|-h|--help]
```

### Arguments

* **``**

  The input binary.

### Options

* **`-s|--settings <settings>`**

  Sets the path to the XML code coverage settings.

* **`-id|--session-id <session-id>`**

  Specifies the code coverage session ID. If not provided, the tool will generate a random GUID.

* **`-o|--output <output>`**

  Sets the path to output file binary. If not provided, instrumentation will be performed in-place.

* **`-l|--log-file <log-file>`**

  Sets the log file path. When you provide a directory (with a path separator at the end), a new log file is generated for each process under analysis.

* **`-ll|--log-level <log-level>`**

  Sets the log level. Supported values: `Error`, `Info`, and  `Verbose`.

* **`-dco|--disable-console-output`**

  Disables console output.

* **`--nologo`**

  Do not display Code Coverage banner.

## dotnet-coverage uninstrument

The uninstrument command is used to restore original binary from the instrumented binary.

### Synopsis

```console
Microsoft.CodeCoverage.Console uninstrument
    <input-file>
    [-s|--settings <settings>]
    [-l|--log-file <log-file>] [-ll|--log-level <log-level>]
    [-dco|--disable-console-output] [--nologo]
    [-?|-h|--help]
```

### Arguments

* **``**

  The input instrumented binary.

### Options

* **`-s|--settings <settings>`**

  Sets the path to the XML code coverage settings.

* **`-l|--log-file <log-file>`**

  Sets the log file path. When you provide a directory (with a path separator at the end), a new log file is generated for each process under analysis.

* **`-ll|--log-level <log-level>`**

  Sets the log level. Supported values: `Error`, `Info`, and  `Verbose`.

* **`-dco|--disable-console-output`**

  Disables console output.

* **`--nologo`**

  Do not display Code Coverage banner.
