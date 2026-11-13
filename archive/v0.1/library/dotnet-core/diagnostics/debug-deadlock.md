---
title: "Debugging deadlock - .NET Core (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/debug-deadlock.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Debug a deadlock in .NET Core

**This article applies to: ✔️** .NET Core 3.1 SDK and later versions

In this tutorial, you'll learn how to debug a deadlock scenario. Using the provided example ASP.NET Core web app source code repository, you can cause a deadlock intentionally. The endpoint will stop responding and experience thread accumulation. You'll learn how you can use various tools to analyze the problem, such as core dumps, core dump analysis, and process tracing.

In this tutorial, you will:

>
> - Investigate an app that has stopped responding
> - Generate a core dump file
> - Analyze process threads in the dump file
> - Analyze call stacks and sync blocks
> - Diagnose and solve a deadlock

## Prerequisites

The tutorial uses:

- .NET Core 3.1 SDK or a later version
- Sample debug target - web app to trigger the scenario
- dotnet-trace to list processes
- dotnet-dump to collect, and analyze a dump file

## Core dump generation

To investigate application unresponsiveness, a core dump or memory dump allows you to inspect the state of its threads and any possible locks that may have contention issues. Run the sample debug application using the following command from the sample root directory:

```dotnetcli
dotnet run
```

To find the process ID, use the following command:

```dotnetcli
dotnet-trace ps
```

Take note of the process ID from your command output. Our process ID was `4807`, but yours will be different. Navigate to the following URL, which is an API endpoint on the sample site:

`https://localhost:5001/api/diagscenario/deadlock`

The API request to the site will stop responding. Let the request run for about 10-15 seconds. Then create the core dump using the following command:

### Linux

```bash
sudo dotnet-dump collect -p 4807
```

### Windows

```console
dotnet-dump collect -p 4807
```

---
