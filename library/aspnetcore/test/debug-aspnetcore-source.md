---
title: "Debug .NET and ASP.NET Core source code with Visual Studio"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/test/debug-aspnetcore-source.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Debug .NET and ASP.NET Core source code with Visual Studio

To debug .NET and ASP.NET Core source code in Visual Studio:

* In **Tools -> Options -> Debugging -> General**, un-check  **Enable Just My Code**.

* Verify **Enable Source Link support**  is checked.

* In **Tool -> Options -> Debugging -> Symbols**, enable **Microsoft Symbol Servers**.

When you step into any .NET or ASP.NET Core code, Visual Studio displays the source code.  For example:

* Set a break point in `OnGet` in `Pages/Privacy.cshtml.cs` and select the **Privacy** link.
* Select one of the **Download Source and Continue Debugging** options.

The preceding instructions work for basic stepping into functions, but the optimized .NET code often removes local variables and functions. To disable optimizations and allow better source debugging:

* In **Tools -> Options -> Debugging -> General**, enable **Suppress JIT optimization on module load (Managed only)**:

* Add the environment variable and value `COMPlus_ReadyToRun=0` to the `Properties/launchSettings.json` file:
  ```json
﻿{
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:10892",
      "sslPort": 44315
    }
  },
  "profiles": {
    "WebApplication18": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "https://localhost:7045;http://localhost:5045",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "COMPlus_ReadyToRun": "0"
      }
    },
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "COMPlus_ReadyToRun": "0"
      }
    }
  }
}
```

If you have debugged an app before with the previous version of .NET, delete the `%TEMP%/SymbolCache` directory as it can have old PDBs that are out of date.

## Debugging .NET Core on Unix over SSH

* Debugging .NET Core on Unix over SSH
* Debugging ASP Core on Linux with Visual Studio 2017

## Related content

* JIT Optimization and Debugging
* Limitations of the 'Suppress JIT optimization' option To set `COMPlus_ReadyToRun` to `0`
* .NET Hot Reload support for ASP.NET Core
* Test Execution with Hot Reload
* Debug ASP.NET Core Blazor apps
