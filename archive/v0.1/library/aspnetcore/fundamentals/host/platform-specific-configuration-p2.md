---
title: "Use hosting startup assemblies in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/host/platform-specific-configuration.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Use hosting startup assemblies in ASP.NET Core (part 2 of 2)

## Activation

Options for hosting startup activation are:

* Runtime store (**deprecated**): Activation doesn't require a compile-time reference for activation. The sample app places the hosting startup assembly and dependencies files into a folder, *deployment*, to facilitate deployment of the hosting startup in a multimachine environment. The *deployment* folder also includes a PowerShell script that creates or modifies environment variables on the deployment system to enable the hosting startup. The runtime package store is deprecated, so we recommend the compile-time reference options that follow.
* Compile-time reference required for activation
  * NuGet package
  * Project bin folder

### Runtime store

> **Warning:**
> The runtime package store is deprecated. It's no longer supported or under active development, and the `dotnet store` command has known issues with .NET 6 and later versions. Use a NuGet package or the project bin folder for hosting startup activation instead. For more information, see Runtime package store.

The hosting startup implementation is placed in the runtime store. A compile-time reference to the assembly isn't required by the enhanced app.

After the hosting startup is built, a runtime store is generated using the manifest project file and the dotnet store command.

```dotnetcli
dotnet store --manifest {MANIFEST FILE} --runtime {RUNTIME IDENTIFIER} --output {OUTPUT LOCATION} --skip-optimization
```

In the sample app (*RuntimeStore* project) the following command is used:

```dotnetcli
dotnet store --manifest store.manifest.csproj --runtime win7-x64 --output ./deployment/store --skip-optimization
```

For the runtime to discover the runtime store, the runtime store's location is added to the `DOTNET_SHARED_STORE` environment variable.

**Modify and place the hosting startup's dependencies file**

To activate the enhancement without a package reference to the enhancement, specify additional dependencies to the runtime with `additionalDeps`. `additionalDeps` allows you to:

* Extend the app's library graph by providing a set of additional `.deps.json` files to merge with the app's own `.deps.json` file on startup.
* Make the hosting startup assembly discoverable and loadable.

The recommended approach for generating the additional dependencies file is to:

 1. Execute `dotnet publish` on the runtime store manifest file referenced in the previous section.
 1. Remove the manifest reference from libraries and the `runtime` section of the resulting `.deps.json` file.

In the example project, the `store.manifest/1.0.0` property is removed from the `targets` and `libraries` section:

```json
{
  "runtimeTarget": {
    "name": ".NETCoreApp,Version=v3.0",
    "signature": ""
  },
  "compilationOptions": {},
  "targets": {
    ".NETCoreApp,Version=v3.0": {
      "store.manifest/1.0.0": {
        "dependencies": {
          "StartupDiagnostics": "1.0.0"
        },
        "runtime": {
          "store.manifest.dll": {}
        }
      },
      "StartupDiagnostics/1.0.0": {
        "runtime": {
          "lib/netcoreapp3.0/StartupDiagnostics.dll": {
            "assemblyVersion": "1.0.0.0",
            "fileVersion": "1.0.0.0"
          }
        }
      }
    }
  },
  "libraries": {
    "store.manifest/1.0.0": {
      "type": "project",
      "serviceable": false,
      "sha512": ""
    },
    "StartupDiagnostics/1.0.0": {
      "type": "package",
      "serviceable": true,
      "sha512": "sha512-xrhzuNSyM5/f4ZswhooJ9dmIYLP64wMnqUJSyTKVDKDVj5T+qtzypl8JmM/aFJLLpYrf0FYpVWvGujd7/FfMEw==",
      "path": "startupdiagnostics/1.0.0",
      "hashPath": "startupdiagnostics.1.0.0.nupkg.sha512"
    }
  }
}
```

Place the `.deps.json` file into the following location:

```
{ADDITIONAL DEPENDENCIES PATH}/shared/{SHARED FRAMEWORK NAME}/{SHARED FRAMEWORK VERSION}/{ENHANCEMENT ASSEMBLY NAME}.deps.json
```

* `{ADDITIONAL DEPENDENCIES PATH}`: Location added to the `DOTNET_ADDITIONAL_DEPS` environment variable.
* `{SHARED FRAMEWORK NAME}`: Shared framework required for this additional dependencies file.
* `{SHARED FRAMEWORK VERSION}`: Minimum shared framework version.
* `{ENHANCEMENT ASSEMBLY NAME}`: The enhancement's assembly name.

In the sample app (*RuntimeStore* project), the additional dependencies file is placed into the following location:

```
deployment/additionalDeps/shared/Microsoft.AspNetCore.App/3.0.0/StartupDiagnostics.deps.json
```

For runtime to discover the runtime store location, the additional dependencies file location is added to the `DOTNET_ADDITIONAL_DEPS` environment variable.

> **Note:**
> The `DOTNET_ADDITIONAL_DEPS` environment variable only works with framework-dependent applications. This environment variable is ignored for self-contained applications.

In the sample app (*RuntimeStore* project), building the runtime store and generating the additional dependencies file is accomplished using a PowerShell script.

For examples of how to set environment variables for various operating systems, see Use multiple environments.

**Deployment**

To facilitate the deployment of a hosting startup in a multimachine environment, the sample app creates a *deployment* folder in published output that contains:

* The hosting startup runtime store.
* The hosting startup dependencies file.
* A PowerShell script that creates or modifies the `ASPNETCORE_HOSTINGSTARTUPASSEMBLIES`, `DOTNET_SHARED_STORE`, and `DOTNET_ADDITIONAL_DEPS` to support the activation of the hosting startup. Run the script from an administrative PowerShell command prompt on the deployment system.

### NuGet package

A hosting startup enhancement can be provided in a NuGet package. The package has a `HostingStartup` attribute. The hosting startup types provided by the package are made available to the app using either of the following approaches:

* The enhanced app's project file makes a package reference for the hosting startup in the app's project file (a compile-time reference). With the compile-time reference in place, the hosting startup assembly and all of its dependencies are incorporated into the app's dependency file (`.deps.json`). This approach applies to a hosting startup assembly package published to nuget.org.
* The hosting startup's dependencies file is made available to the enhanced app as described in the Runtime store section (without a compile-time reference).

For more information on NuGet packages and the runtime store, see the following topics:

* How to Create a NuGet Package with Cross Platform Tools
* Publishing packages
* Runtime package store

### Project bin folder

A hosting startup enhancement can be provided by a *bin*-deployed assembly in the enhanced app. The hosting startup types provided by the assembly are made available to the app using one of the following approaches:

* The enhanced app's project file makes an assembly reference to the hosting startup (a compile-time reference). With the compile-time reference in place, the hosting startup assembly and all of its dependencies are incorporated into the app's dependency file (`.deps.json`). This approach applies when the deployment scenario calls for making a compile-time reference to the hosting startup's assembly (*.dll* file) and moving the assembly to either:
  * The consuming project.
  * A location accessible by the consuming project.
* The hosting startup's dependencies file is made available to the enhanced app as described in the Runtime store section (without a compile-time reference).
* When targeting the .NET Framework, the assembly is loadable in the default load context, which on .NET Framework means that the assembly is located at either of the following locations:
  * Application base path: The *bin* folder where the app's executable (*.exe*) is located.
  * Global Assembly Cache (GAC): The GAC stores assemblies that several .NET Framework apps share. For more information, see How to: Install an assembly into the global assembly cache in the .NET Framework documentation.

## Sample code

The sample code (how to download) demonstrates hosting startup implementation scenarios:

* Two hosting startup assemblies (class libraries) set a pair of in-memory configuration key-value pairs each:
  * NuGet package (*HostingStartupPackage*)
  * Class library (*HostingStartupLibrary*)
* A hosting startup is activated from a runtime store-deployed assembly (*StartupDiagnostics*). The assembly adds two middlewares to the app at startup that provide diagnostic information on:
  * Registered services
  * Address (scheme, host, path base, path, query string)
  * Connection (remote IP, remote port, local IP, local port, client certificate)
  * Request headers
  * Environment variables

To run the sample:

**Activation from a NuGet package**

1. Compile the *HostingStartupPackage* package with the dotnet pack command.
1. Add the package's assembly name of the *HostingStartupPackage* to the `ASPNETCORE_HOSTINGSTARTUPASSEMBLIES` environment variable.
1. Compile and run the app. A package reference is present in the enhanced app (a compile-time reference). A `<PropertyGroup>` in the app's project file specifies the package project's output (*../HostingStartupPackage/bin/Debug*) as a package source. This allows the app to use the package without uploading the package to nuget.org. For more information, see the notes in the HostingStartupApp's project file.

   ```xml
   <PropertyGroup>
     <RestoreSources>$(RestoreSources);https://api.nuget.org/v3/index.json;../HostingStartupPackage/bin/Debug</RestoreSources>
   </PropertyGroup>
   ```

1. Observe that the service configuration key <example-value> rendered by the Index page match the values set by the package's `ServiceKeyInjection.Configure` method.

If you make changes to the *HostingStartupPackage* project and recompile it, clear the local NuGet package caches to ensure that the *HostingStartupApp* receives the updated package and not a stale package from the local cache. To clear the local NuGet caches, execute the following dotnet nuget locals command:

```dotnetcli
dotnet nuget locals all --clear
```

**Activation from a class library**

1. Compile the *HostingStartupLibrary* class library with the dotnet build command.
1. Add the class library's assembly name of *HostingStartupLibrary* to the `ASPNETCORE_HOSTINGSTARTUPASSEMBLIES` environment variable.
1. *bin*-deploy the class library's assembly to the app by copying the *HostingStartupLibrary.dll* file from the class library's compiled output to the app's *bin/Debug* folder.
1. Compile and run the app. An `<ItemGroup>` in the app's project file references the class library's assembly (*.\bin\Debug\netcoreapp3.0\HostingStartupLibrary.dll*) (a compile-time reference). For more information, see the notes in the HostingStartupApp's project file.

   ```xml
   <ItemGroup>
     <Reference Include=".\\bin\\Debug\\netcoreapp3.0\\HostingStartupLibrary.dll">
       <HintPath>.\bin\Debug\netcoreapp3.0\HostingStartupLibrary.dll</HintPath>
       <SpecificVersion>False</SpecificVersion> 
     </Reference>
   </ItemGroup>
   ```

1. Observe that the service configuration key <example-value> rendered by the Index page match the values set by the class library's `ServiceKeyInjection.Configure` method.

**Activation from a runtime store-deployed assembly**

1. The *StartupDiagnostics* project uses PowerShell to modify its `StartupDiagnostics.deps.json` file. PowerShell is installed by default on Windows starting with Windows 7 SP1 and Windows Server 2008 R2 SP1. To obtain PowerShell on other platforms, see Installing various versions of PowerShell.
1. Execute the *build.ps1* script in the *RuntimeStore* folder. The script:
   * Generates the `StartupDiagnostics` package in the *obj\packages* folder.
   * Generates the runtime store for `StartupDiagnostics` in the *store* folder. The `dotnet store` command in the script uses the `win7-x64` runtime identifier (RID) for a hosting startup deployed to Windows. When providing the hosting startup for a different runtime, substitute the correct RID on line 37 of the script. The runtime store for `StartupDiagnostics` would later be moved to the user's or system's runtime store on the machine where the assembly will be consumed. The user runtime store install location for the `StartupDiagnostics` assembly is *.dotnet/store/x64/netcoreapp3.0/startupdiagnostics/1.0.0/lib/netcoreapp3.0/StartupDiagnostics.dll*.
   * Generates the `additionalDeps` for `StartupDiagnostics` in the *additionalDeps* folder. The additional dependencies would later be moved to the user's or system's additional dependencies. The user `StartupDiagnostics` additional dependencies install location is `.dotnet/x64/additionalDeps/StartupDiagnostics/shared/Microsoft.NETCore.App/3.0.0/StartupDiagnostics.deps.json`.
   * Places the *deploy.ps1* file in the *deployment* folder.
1. Run the *deploy.ps1* script in the *deployment* folder. The script appends:
   * `StartupDiagnostics` to the `ASPNETCORE_HOSTINGSTARTUPASSEMBLIES` environment variable.
   * The hosting startup dependencies path (in the RuntimeStore project's *deployment* folder) to the `DOTNET_ADDITIONAL_DEPS` environment variable.
   * The runtime store path (in the RuntimeStore project's *deployment* folder) to the `DOTNET_SHARED_STORE` environment variable.
1. Run the sample app.
1. Request the `/services` endpoint to see the app's registered services. Request the `/diag` endpoint to see the diagnostic information.
