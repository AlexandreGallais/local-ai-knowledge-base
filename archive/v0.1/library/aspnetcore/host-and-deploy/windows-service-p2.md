---
title: "Host ASP.NET Core in a Windows Service (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/host-and-deploy/windows-service.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Host ASP.NET Core in a Windows Service (part 2 of 2)

## Troubleshoot

To troubleshoot a Windows Service app, see Troubleshoot and debug ASP.NET Core projects.

### Common errors

* An old or pre-release version of PowerShell is in use.
* The registered service doesn't use the app's **published** output from the dotnet publish command. Output of the dotnet build command isn't supported for app deployment. Published assets are found in either of the following folders depending on the deployment type:
  * *bin/Release/{TARGET FRAMEWORK}/publish* (FDD)
  * *bin/Release/{TARGET FRAMEWORK}/{RUNTIME IDENTIFIER}/publish* (SCD)
* The service isn't in the RUNNING state.
* The paths to resources that the app uses (for example, certificates) are incorrect. The base path of a Windows Service is *c:\\Windows\\System32*.
* The user doesn't have *Log on as a service* rights.
* The user's password is expired or incorrectly passed when executing the `New-Service` PowerShell command.
* The app requires ASP.NET Core authentication but isn't configured for secure connections (HTTPS).
* The request URL port is incorrect or not configured correctly in the app.

### System and Application Event Logs

Access the System and Application Event Logs:

1. Open the Start menu, search for *Event Viewer*, and select the **Event Viewer** app.
1. In **Event Viewer**, open the **Windows Logs** node.
1. Select **System** to open the System Event Log. Select **Application** to open the Application Event Log.
1. Search for errors associated with the failing app.

### Run the app at a command prompt

Many startup errors don't produce useful information in the event logs. You can find the cause of some errors by running the app at a command prompt on the hosting system. To log additional detail from the app, lower the log level or run the app in the `Development` environment.

### Clear package caches

A functioning app might fail immediately after upgrading either the .NET SDK on the development machine or changing package versions within the app. In some cases, incoherent packages might break an app when performing major upgrades. Most of these issues can be fixed by following these instructions:

1. Delete the *bin* and *obj* folders.
1. Clear the package caches by executing dotnet nuget locals all --clear from a command shell.

   Clearing package caches can also be accomplished with the nuget.exe tool and executing the command `nuget locals all -clear`. *nuget.exe* isn't a bundled install with the Windows desktop operating system and must be obtained separately from the NuGet website.

1. Restore and rebuild the project.
1. Delete all of the files in the deployment folder on the server prior to redeploying the app.

### Slow or unresponsive app

A *crash dump* is a snapshot of the system's memory and can help determine the cause of an app crash, startup failure, or slow app.

#### App crashes or encounters an exception

Obtain and analyze a dump from Windows Error Reporting (WER):

1. Create a folder to hold crash dump files at `c:\dumps`.
1. Run the EnableDumps PowerShell script with the application executable name:

   ```powershell
   .\EnableDumps {APPLICATION EXE} c:\dumps
   ```

1. Run the app under the conditions that cause the crash to occur.
1. After the crash has occurred, run the DisableDumps PowerShell script:

   ```powershell
   .\DisableDumps {APPLICATION EXE}
   ```

After an app crashes and dump collection is complete, the app is allowed to terminate normally. The PowerShell script configures WER to collect up to five dumps per app.

> **Warning:**
> Crash dumps might take up a large amount of disk space (up to several gigabytes each).

#### App is unresponsive, fails during startup, or runs normally

When an app stops responding but doesn't crash, fails during startup, or runs normally, see User-Mode Dump Files: Choosing the Best Tool to select an appropriate tool to produce the dump.

#### Analyze the dump

A dump can be analyzed using several approaches. For more information, see Analyzing a User-Mode Dump File.

## Additional resources

* View or download sample code (how to download)
* Kestrel endpoint configuration (includes HTTPS configuration and SNI support)
* .NET Generic Host in ASP.NET Core
* Troubleshoot and debug ASP.NET Core projects
