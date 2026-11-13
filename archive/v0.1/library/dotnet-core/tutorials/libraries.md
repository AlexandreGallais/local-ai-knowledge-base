---
title: "Develop libraries with the .NET CLI (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tutorials/libraries.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Develop libraries with the .NET CLI

This article covers how to write libraries for .NET using the .NET CLI. The CLI provides an efficient and low-level experience that works across any supported OS. You can still build libraries with Visual Studio, and if that's your preferred experience refer to the Visual Studio guide.

## Prerequisites

You need the .NET SDK installed on your machine.

For the sections of this document dealing with .NET Framework versions, you need the .NET Framework installed on a Windows machine.

Additionally, if you wish to support older .NET Framework targets, you need to install targeting packs or developer packs from the .NET Framework downloads page. Refer to this table:

| .NET Framework version | What to download                                       |
| ---------------------- | ------------------------------------------------------ |
| 4.6.1                  | .NET Framework 4.6.1 Targeting Pack                    |
| 4.6                    | .NET Framework 4.6 Targeting Pack                      |
| 4.5.2                  | .NET Framework 4.5.2 Developer Pack                    |
| 4.5.1                  | .NET Framework 4.5.1 Developer Pack                    |
| 4.5                    | Windows Software Development Kit for Windows 8         |
| 4.0                    | Windows SDK for Windows 7 and .NET Framework 4         |
| 2.0, 3.0, and 3.5      | .NET Framework 3.5 SP1 Runtime (or Windows 8+ version) |

## How to target .NET 5+ or .NET Standard

You control your project's target framework by adding it to your project file (*.csproj* or *.fsproj*). For guidance on how to choose between targeting .NET 5+ or .NET Standard, see .NET 5+ and .NET Standard.

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
  </PropertyGroup>
</Project>
```

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
  </PropertyGroup>
</Project>
```

If you want to target .NET Framework versions 4.0 or below, or you wish to use an API available in .NET Framework but not in .NET Standard (for example, `System.Drawing`), read the following sections and learn how to multitarget.

## How to target .NET Framework

> **Note:**
> These instructions assume you have .NET Framework installed on your machine. Refer to the Prerequisites to get dependencies installed.

Keep in mind that some of the .NET Framework versions used here are no longer supported. Refer to the .NET Framework Support Lifecycle Policy FAQ about unsupported versions.

If you want to reach the maximum number of developers and projects, use .NET Framework 4.0 as your baseline target. To target .NET Framework, begin by using the correct Target Framework Moniker (TFM) that corresponds to the .NET Framework version you wish to support.

| .NET Framework version | TFM      |
| ---------------------- | -------- |
| .NET Framework 2.0     | `net20`  |
| .NET Framework 3.0     | `net30`  |
| .NET Framework 3.5     | `net35`  |
| .NET Framework 4.0     | `net40`  |
| .NET Framework 4.5     | `net45`  |
| .NET Framework 4.5.1   | `net451` |
| .NET Framework 4.5.2   | `net452` |
| .NET Framework 4.6     | `net46`  |
| .NET Framework 4.6.1   | `net461` |
| .NET Framework 4.6.2   | `net462` |
| .NET Framework 4.7     | `net47`  |
| .NET Framework 4.8     | `net48`  |

You then insert this TFM into the `TargetFramework` section of your project file. For example, here's how you would write a library that targets .NET Framework 4.0:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net40</TargetFramework>
  </PropertyGroup>
</Project>
```

And that's it! Although this compiled only for .NET Framework 4, you can use the library on newer versions of .NET Framework.

## How to multitarget

> **Note:**
> The following instructions assume you have the .NET Framework installed on your machine. Refer to the Prerequisites section to learn which dependencies you need to install and where to download them from.

You may need to target older versions of the .NET Framework when your project supports both the .NET Framework and .NET. In this scenario, if you want to use newer APIs and language constructs for the newer targets, use `#if` directives in your code. You also might need to add different packages and dependencies for each platform you're targeting to include the different APIs needed for each case.

For example, let's say you have a library that performs networking operations over HTTP. For .NET Standard and the .NET Framework versions 4.5 or higher, you can use the `HttpClient` class from the `System.Net.Http` namespace. However, earlier versions of the .NET Framework don't have the `HttpClient` class, so you could use the `WebClient` class from the `System.Net` namespace for those instead.

Your project file could look like this:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFrameworks>netstandard2.0;net40;net45</TargetFrameworks>
  </PropertyGroup>

  <!-- Need to conditionally bring in references for the .NET Framework 4.0 target -->
  <ItemGroup Condition="'$(TargetFramework)' == 'net40'">
    <Reference Include="System.Net" />
  </ItemGroup>

  <!-- Need to conditionally bring in references for the .NET Framework 4.5 target -->
  <ItemGroup Condition="'$(TargetFramework)' == 'net45'">
    <Reference Include="System.Net.Http" />
    <Reference Include="System.Threading.Tasks" />
  </ItemGroup>
</Project>
```

You'll notice three major changes here:

1. The `TargetFramework` node has been replaced by `TargetFrameworks`, and three TFMs are expressed inside.
1. There is an `<ItemGroup>` node for the `net40` target pulling in one .NET Framework reference.
1. There is an `<ItemGroup>` node for the `net45` target pulling in two .NET Framework references.

### Preprocessor Symbols

The build system is aware of the following preprocessor symbols used in `#if` directives:

| Target Frameworks | Symbols | Additional symbols(available in .NET 5+ SDKs) | Platform symbols (available onlywhen you specify an OS-specific TFM) |
| ------------------| ------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| .NET Framework    | `NETFRAMEWORK`, `NET481`, `NET48`, `NET472`, `NET471`, `NET47`, `NET462`, `NET461`, `NET46`, `NET452`, `NET451`, `NET45`, `NET40`, `NET35`, `NET20` | `NET48_OR_GREATER`, `NET472_OR_GREATER`, `NET471_OR_GREATER`, `NET47_OR_GREATER`, `NET462_OR_GREATER`, `NET461_OR_GREATER`, `NET46_OR_GREATER`, `NET452_OR_GREATER`, `NET451_OR_GREATER`, `NET45_OR_GREATER`, `NET40_OR_GREATER`, `NET35_OR_GREATER`, `NET20_OR_GREATER` | |
| .NET Standard     | `NETSTANDARD`, `NETSTANDARD2_1`, `NETSTANDARD2_0`, `NETSTANDARD1_6`, `NETSTANDARD1_5`, `NETSTANDARD1_4`, `NETSTANDARD1_3`, `NETSTANDARD1_2`, `NETSTANDARD1_1`, `NETSTANDARD1_0` | `NETSTANDARD2_1_OR_GREATER`, `NETSTANDARD2_0_OR_GREATER`, `NETSTANDARD1_6_OR_GREATER`, `NETSTANDARD1_5_OR_GREATER`, `NETSTANDARD1_4_OR_GREATER`, `NETSTANDARD1_3_OR_GREATER`, `NETSTANDARD1_2_OR_GREATER`, `NETSTANDARD1_1_OR_GREATER`, `NETSTANDARD1_0_OR_GREATER` | |
| .NET 5+ (and .NET Core) | `NET`, `NET11_0`, `NET10_0`, `NET9_0`, `NET8_0`, `NET7_0`, `NET6_0`, `NET5_0`, `NETCOREAPP`, `NETCOREAPP3_1`, `NETCOREAPP3_0`, `NETCOREAPP2_2`, `NETCOREAPP2_1`, `NETCOREAPP2_0`, `NETCOREAPP1_1`, `NETCOREAPP1_0` | `NET11_0_OR_GREATER`, `NET10_0_OR_GREATER`, `NET9_0_OR_GREATER`, `NET8_0_OR_GREATER`, `NET7_0_OR_GREATER`, `NET6_0_OR_GREATER`, `NET5_0_OR_GREATER`, `NETCOREAPP3_1_OR_GREATER`, `NETCOREAPP3_0_OR_GREATER`, `NETCOREAPP2_2_OR_GREATER`, `NETCOREAPP2_1_OR_GREATER`, `NETCOREAPP2_0_OR_GREATER`, `NETCOREAPP1_1_OR_GREATER`, `NETCOREAPP1_0_OR_GREATER` | `ANDROID`, `BROWSER`, `IOS`, `MACCATALYST`, `MACOS`, `TVOS`, `WINDOWS`,`OS` (for example `IOS15_1`),`OS_OR_GREATER` (for example `IOS15_1_OR_GREATER`) |

> **Note:**
>
> * Versionless symbols are defined regardless of the version you're targeting.
> * Version-specific symbols are only defined for the version you're targeting.
> * The `<framework>_OR_GREATER` symbols are defined for the version you're targeting and all earlier versions. For example, if you're targeting .NET Framework 2.0, the following symbols are defined: `NET20`, `NET20_OR_GREATER`, `NET11_OR_GREATER`, and `NET10_OR_GREATER`.
> * The `NETSTANDARD<x>_<y>_OR_GREATER` symbols are only defined for .NET Standard targets, and not for targets that implement .NET Standard, such as .NET Core and .NET Framework.
> * These are different from the target framework monikers (TFMs) used by the MSBuild `TargetFramework` property and NuGet.

Here is an example making use of conditional compilation per-target:

```csharp
using System;
using System.Text.RegularExpressions;
#if NET40
// This only compiles for the .NET Framework 4 targets
using System.Net;
#else
 // This compiles for all other targets
using System.Net.Http;
using System.Threading.Tasks;
#endif

namespace MultitargetLib
{
    public class Library
    {
#if NET40
        private readonly WebClient _client = new WebClient();
        private readonly object _locker = new object();
#else
        private readonly HttpClient _client = new HttpClient();
#endif

#if NET40
        // .NET Framework 4.0 does not have async/await
        public string GetDotNetCount()
        {
            string url = "https://www.dotnetfoundation.org/";

            var uri = new Uri(url);

            string result = "";

            // Lock here to provide thread-safety.
            lock(_locker)
            {
                result = _client.DownloadString(uri);
            }

            int dotNetCount = Regex.Matches(result, ".NET").Count;

            return $"Dotnet Foundation mentions .NET {dotNetCount} times!";
        }
#else
        // .NET Framework 4.5+ can use async/await!
        public async Task<string> GetDotNetCountAsync()
        {
            string url = "https://www.dotnetfoundation.org/";

            // HttpClient is thread-safe, so no need to explicitly lock here
            var result = await _client.GetStringAsync(url);

            int dotNetCount = Regex.Matches(result, ".NET").Count;

            return $"dotnetfoundation.org mentions .NET {dotNetCount} times in its HTML!";
        }
#endif
    }
}
```

If you build this project with `dotnet build`, you'll notice three directories under the `bin/` folder:

```
net40/
net45/
netstandard2.0/
```

Each of these contains the `.dll` files for each target.

## How to test libraries on .NET

It's important to be able to test across platforms. You can use either xUnit or MSTest out of the box. Both are perfectly suitable for unit testing your library on .NET. How you set up your solution with test projects will depend on the structure of your solution. The following example assumes that the test and source directories live in the same top-level directory.

> **Note:**
> This uses some .NET CLI commands. See dotnet new and dotnet sln for more information.

1. Set up your solution. You can do so with the following commands:

   ```dotnetcli
   mkdir SolutionWithSrcAndTest
   cd SolutionWithSrcAndTest
   dotnet new sln
   dotnet new classlib -o MyProject
   dotnet new xunit -o MyProject.Test
   dotnet sln add MyProject/MyProject.csproj
   dotnet sln add MyProject.Test/MyProject.Test.csproj
   ```

   This will create projects and link them together in a solution. Your directory for `SolutionWithSrcAndTest` should look like this:

   ```
   /SolutionWithSrcAndTest
   |__SolutionWithSrcAndTest.sln
   |__MyProject/
   |__MyProject.Test/
   ```

1. Navigate to the test project's directory and add a reference to `MyProject.Test` from `MyProject`.

   ```dotnetcli
   cd MyProject.Test
   dotnet reference add ../MyProject/MyProject.csproj
   ```

1. Restore packages and build projects:

   ```dotnetcli
   dotnet restore
   dotnet build
   ```

1. Verify that xUnit runs by executing the `dotnet test` command. If you chose to use MSTest, then the MSTest console runner should run instead.

And that's it! You can now test your library across all platforms using command-line tools. To continue testing now that you have everything set up, testing your library is very simple:

1. Make changes to your library.
1. Run tests from the command line, in your test directory, with `dotnet test` command.

Your code will be automatically rebuilt when you invoke `dotnet test` command.
