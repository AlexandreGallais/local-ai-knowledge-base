---
title: ".NET SDK and .NET CLI telemetry (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/telemetry.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET SDK and .NET CLI telemetry

The .NET SDK includes a telemetry feature that collects usage data and sends it to Microsoft when you use .NET CLI commands. The usage data includes exception information when the .NET CLI crashes. The .NET CLI comes with the .NET SDK and is the set of verbs that enable you to build, test, and publish your .NET apps. Telemetry data helps the .NET team understand how the tools are used so they can be improved. Information on failures helps the team resolve problems and fix bugs.

The collected data is published in aggregate under the Creative Commons Attribution License. Some of the collected data is published at .NET CLI Telemetry Data.

## Scope

`dotnet` has two functions: to run apps and to execute CLI commands. Telemetry *isn't collected* when using `dotnet` to start an application in the following format:

- `dotnet [path-to-app].dll`

Telemetry *is collected* when using any of the .NET CLI commands, such as:

- `dotnet build`
- `dotnet pack`
- `dotnet run`

## How to opt out

The .NET SDK telemetry feature is enabled by default for Microsoft distributions of the SDK. To opt out of the telemetry feature, set the `DOTNET_CLI_TELEMETRY_OPTOUT` environment variable to `1` or `true`.

The .NET SDK installer sends a single telemetry entry when a successful installation happens. To opt out, set the `DOTNET_CLI_TELEMETRY_OPTOUT` environment variable before you install the .NET SDK.

> **Important:**
> To opt out after you start the installer: close the installer, set the environment variable, and then run the installer again with that value set.

## Disclosure

The .NET SDK displays text similar to the following output when you first run one of the .NET CLI commands (for example, `dotnet build`). The text might vary slightly depending on the version of the SDK you're running. This "first run" experience is how Microsoft notifies you about data collection.

```console
Telemetry
---------
The .NET tools collect usage data in order to help us improve your experience. The data is collected by Microsoft and shared with the community. You can opt-out of telemetry by setting the DOTNET_CLI_TELEMETRY_OPTOUT environment variable to '1' or 'true' using your favorite shell.

Read more about .NET CLI Tools telemetry: https://aka.ms/dotnet-cli-telemetry
```

To disable this message and the .NET welcome message, set the `DOTNET_NOLOGO` environment variable to `true`. This variable has no effect on telemetry opt out.

> **Note:**
> **Breaking change:** The behavior of telemetry messages written to `stderr` changed in recent versions of the .NET SDK. For more information, see dotnet CLI commands log non-command-relevant data to stderr.
