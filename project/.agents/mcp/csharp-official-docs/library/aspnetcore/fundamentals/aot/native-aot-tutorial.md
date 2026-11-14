---
title: "Tutorial: Publish an ASP.NET Core app using Native AOT"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/aot/native-aot-tutorial.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Tutorial: Publish an ASP.NET Core app using Native AOT

.NET native ahead-of-time (AOT) is available in ASP.NET Core.

> **Note:**
> Minimal APIs are ***not*** compatible with native AOT.

See Native AOT deployment for more information, including:

* Limitations of Native AOT deployment
* Supported platforms

# .NET CLI

* .NET SDK
* On Linux, see Prerequisites for Native AOT deployment.
* Visual Studio 2022 with the **Desktop development with C++** workload installed.

> **Note:**
> Visual Studio 2022 is required because Native AOT requires link.exe and the Visual C++ static runtime libraries. There are no plans to support Native AOT ***without*** Visual Studio.

# Visual Studio

.NET SDK

* Visual Studio 2022 with the following workloads installed:
  * **ASP.NET and web development**
  * **Desktop development with C++**

---

## Create a web app with Native AOT

Create an ASP.NET Core API app that is configured to work with Native AOT:

# .NET CLI

Run the following commands:

```dotnetcli
dotnet new webapiaot -o MyFirstAotWebApi && cd MyFirstAotWebApi
```

Output similar to the following example is displayed:

```output
The template "ASP.NET Core Web API (Native AOT)" was created successfully.

Processing post-creation actions...
Restoring C:\Code\Demos\MyFirstAotWebApi\MyFirstAotWebApi.csproj:
  Determining projects to restore...
  Restored C:\Code\Demos\MyFirstAotWebApi\MyFirstAotWebApi.csproj (in 302 ms).
Restore succeeded.
```

# Visual Studio

1. Create a new `ASP.NET Core Web API (Native AOT)` project.
1. Name the project **MyFirstAotWebApi**.
1. Select **Create**.

---

## Publish the Native AOT app

Verify the app can be published using Native AOT:

# .NET CLI

```dotnetcli
dotnet publish
```

# Visual Studio

Visual studio doesn't support publishing an AOT app. Use the CLI command:

```dotnetcli
dotnet publish
```

---

The `dotnet publish` command:

* Compiles the source files.
* Generates source code files that are compiled.
* Passes generated assemblies to a native IL compiler. The IL compiler produces the native executable. The native executable contains the native machine code.

Output similar to the following example is displayed:

```output
MSBuild version 17.<version> for .NET
  Determining projects to restore...
  Restored C:\Code\Demos\MyFirstAotWebApi\MyFirstAotWebApi.csproj (in 241 ms).
C:\Code\dotnet\aspnetcore\.dotnet\sdk\8.0.<version>\Sdks\Microsoft.NET.Sdk\targets\Microsoft.NET.RuntimeIde
ntifierInference.targets(287,5): message NETSDK1057: You are using a preview version of .NET. See: https://aka.ms/dotne
t-support-policy [C:\Code\Demos\MyFirstAotWebApi\MyFirstAotWebApi.csproj]
  MyFirstAotWebApi -> C:\Code\Demos\MyFirstAotWebApi\bin\Release\net8.0\win-x64\MyFirstAotWebApi.dll
  Generating native code
  MyFirstAotWebApi -> C:\Code\Demos\MyFirstAotWebApi\bin\Release\net8.0\win-x64\publish\
```

The output may differ from the preceding example depending on the version of .NET 8 used, directory used, and other factors.

Review the contents of the output directory:

```
dir bin\Release\net8.0\win-x64\publish
```

Output similar to the following example is displayed:

```output
    Directory: C:\Code\Demos\MyFirstAotWebApi\bin\Release\net8.0\win-x64\publish

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---          30/03/2023  1:41 PM        9480704 MyFirstAotWebApi.exe
-a---          30/03/2023  1:41 PM       43044864 MyFirstAotWebApi.pdb
```

The executable is self-contained and doesn't require a .NET runtime to run. When launched, it behaves the same as the app run in the `Development` environment. Run the AOT app:

```
.\bin\Release\net8.0\win-x64\publish\MyFirstAotWebApi.exe
```

Output similar to the following example is displayed:

```output
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Production
info: Microsoft.Hosting.Lifetime[0]
      Content root path: C:\Code\Demos\MyFirstAotWebApi
```

### Use libraries with Native AOT

Many popular libraries used in ASP.NET Core projects currently have some compatibility issues when they're incorporated into projects that target Native AOT, such as:

* Using reflection to inspect and discover types
* Loading libraries conditionally at runtime
* Generating code on the fly to implement functionality

Libraries that use these dynamic features require updates to work with Native AOT. Various tools are available for applying the necessary updates, such as Roslyn source generators.

Library authors hoping to support Native AOT are encouraged to review the following articles:

* Native AOT deployment
* Prepare .NET libraries for trimming

## See also

* ASP.NET Core support for Native AOT
* Native AOT deployment
* Using the configuration binder source generator
* The Minimal API AOT compilation template
* Comparing `WebApplication.CreateBuilder` to `CreateSlimBuilder`
* Exploring the new Minimal API source generator
* Replacing method calls with Interceptors
* Configuration-binding source generator
