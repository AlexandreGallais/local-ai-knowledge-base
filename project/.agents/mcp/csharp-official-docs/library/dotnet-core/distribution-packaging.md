---
title: ".NET distribution packaging (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/distribution-packaging.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET distribution packaging

As .NET 5 (and .NET Core) and later versions become available on more and more platforms, it's useful to learn how to package, name, and version apps and libraries that use it. This way, package maintainers can help ensure a consistent experience no matter where users choose to run .NET. This article is useful for users that are:

- Attempting to build .NET from source.
- Wanting to make changes to the .NET CLI that could impact the resulting layout or packages produced.

## Disk layout

When installed, .NET consists of several components that are laid out as follows in the file system:

```
{dotnet_root}                    (0)              (*)
├── dotnet                       (1)
├── dnx                          (22)
├── LICENSE.txt                  (8)
├── ThirdPartyNotices.txt        (8)
├── host                                          (*)
│   └── fxr                                       (*)
│       └── <fxr version>        (2)
├── sdk                                           (*)
│   └── <sdk version>            (3)
├── sdk-manifests                (4)              (*)
│   └── <sdk feature band version>
├── library-packs                (21)             (*)
├── metadata                     (4)              (*)
│   └── workloads
│       └── <sdk feature band version>
├── template-packs               (4)              (*)
├── packs                                         (*)
│   ├── Microsoft.AspNetCore.App.Ref              (*)
│   │   └── <aspnetcore ref version>     (11)
│   ├── Microsoft.NETCore.App.Ref                 (*)
│   │   └── <netcore ref version>        (12)
│   ├── Microsoft.NETCore.App.Host.<rid>          (*)
│   │   └── <apphost version>            (13)
│   ├── Microsoft.WindowsDesktop.App.Ref          (*)
│   │   └── <desktop ref version>        (14)
│   ├── NETStandard.Library.Ref                   (*)
│   │   └── <netstandard version>        (15)
│   ├── Microsoft.NETCore.App.Runtime.<rid>       (*)
│   │   └── <runtime version>            (18)
│   ├── Microsoft.AspNetCore.App.Runtime.<rid>    (*)
│   │   └── <aspnetcore version>         (18)
│   ├── runtime.<rid>.Microsoft.DotNet.ILCompiler (*)
│   │   └── <runtime version>            (19)
│   └── Microsoft.NETCore.App.Runtime.NativeAOT.<rid> (*)
│       └── <runtime version>            (20)
├── shared                                        (*)
│   ├── Microsoft.NETCore.App                     (*)
│   │   └── <runtime version>     (5)
│   ├── Microsoft.AspNetCore.App                  (*)
│   │   └── <aspnetcore version>  (6)
│   ├── Microsoft.AspNetCore.All                  (*)
│   │   └── <aspnetcore version>  (6)
│   └── Microsoft.WindowsDesktop.App              (*)
│       └── <desktop app version> (7)
└── templates                                     (*)
│   └── <templates version>      (17)
/
├── etc/dotnet
│       └── install_location     (16)
├── usr/share/man/man1
│       └── dotnet.1.gz          (9)
└── usr/bin
        └── dotnet               (10)
        └── dnx                  (23)
```

- (0) **{dotnet_root}** is a shared root for all .NET major and minor versions. If multiple runtimes are installed, they share the **{dotnet_root}** folder, for example, `{dotnet_root}/shared/Microsoft.NETCore.App/6.0.11` and `{dotnet_root}/shared/Microsoft.NETCore.App/7.0.0`. The name of the `{dotnet_root}` folder should be version agnostic, that is, simply `dotnet`.

- (1) **dotnet** The host (also known as the "muxer") has two distinct roles: activate a runtime to launch an application, and activate an SDK to dispatch commands to it. The host is a native executable (`dotnet.exe`).

- (22) **dnx** The `dnx` script is an executable shell script whose purpose is to foward along user commands to the `dotnet dnx` command inside an SDK. This functionality primarily exists to make acquiring and launching various kinds of .NET applications, like .NET Tools, easier for end-users. Think of it similarly to the `npx` command from Node. It is version-independent since most of the actual functionality of the `dnx` one-shot execution process is handled in the `dotnet` CLI implementation in the versioned SDK directory.

While there's a single host, most of the other components are in versioned directories (2,3,5,6). This means multiple versions can be present on the system since they're installed side by side.

- (2) **host/fxr/\<fxr version>** contains the framework resolution logic used by the host. The host uses the latest hostfxr that is installed. The hostfxr is responsible for selecting the appropriate runtime when executing a .NET application. For example, an application built for .NET 7.0.0 uses the 7.0.5 runtime when it's available. Similarly, hostfxr selects the appropriate SDK during development.

- (3) **sdk/\<sdk version>** The SDK (also known as "the tooling") is a set of managed tools that are used to write and build .NET libraries and applications. The SDK includes the .NET CLI, the managed languages compilers, MSBuild, and associated build tasks and targets, NuGet, new project templates, and so on.

- (4) **sdk-manifests/\<sdk feature band version>** The names and versions of the assets that an optional workload installation requires are maintained in workload manifests stored in this folder. The folder name is the feature band version of the SDK. So for an SDK version such as 7.0.102, this folder would still be named 7.0.100. When a workload is installed, the following folders are created as needed for the workload's assets: *metadata* and *template-packs*. A distribution can create an empty */metadata/workloads/\<sdkfeatureband>/userlocal* file if workloads should be installed under a user path rather than in the *dotnet* folder. For more information, see GitHub issue dotnet/installer#12104.

The **shared** folder contains frameworks. A shared framework provides a set of libraries at a central location so they can be used by different applications.

- (5) **shared/Microsoft.NETCore.App/\<runtime version>** This framework contains the .NET runtime and supporting managed libraries.

- (6) **shared/Microsoft.AspNetCore.{App,All}/\<aspnetcore version>** contains the ASP.NET Core libraries. The libraries under `Microsoft.AspNetCore.App` are developed and supported as part of the .NET project. The libraries under `Microsoft.AspNetCore.All` are a superset that also contains third-party libraries.

- (7) **shared/Microsoft.WindowsDesktop.App/\<desktop app version>** contains the Windows desktop libraries. This isn't included on non-Windows platforms.

- (8) **LICENSE.txt,ThirdPartyNotices.txt** are the .NET license and licenses of third-party libraries used in .NET, respectively.

- (9,10, 23) **dotnet.1.gz, dotnet** `dotnet.1.gz` is the dotnet manual page. `dotnet` is a symlink to the dotnet host(1). `dnx` is a symlink to the `dnx` shell script (22). These files are installed at well-known locations for system integration.

- (11,12) **Microsoft.NETCore.App.Ref,Microsoft.AspNetCore.App.Ref** describe the API of an `x.y` version of .NET and ASP.NET Core respectively. These packs are used when compiling for those target versions.

- (13) **Microsoft.NETCore.App.Host.\<rid>** contains a native binary for platform `rid`. This binary is a template when compiling a .NET application into a native binary for that platform.

- (14) **Microsoft.WindowsDesktop.App.Ref** describes the API of `x.y` version of Windows Desktop applications. These files are used when compiling for that target. This isn't provided on non-Windows platforms.

- (15) **NETStandard.Library.Ref** describes the netstandard `x.y` API. These files are used when compiling for that target.

- (16) **/etc/dotnet/install_location** is a file that contains the full path for `{dotnet_root}`. On some systems, architecture-specific files are also present, such as **/etc/dotnet/install_location_arm64**. The path might end with a newline. It's not necessary to add these files when the root is `/usr/share/dotnet`.

- (17) **templates** contains the templates used by the SDK. For example, `dotnet new` finds project templates here.

- (18) **Microsoft.NETCore.App.Runtime.\<rid>/\<runtime version>,Microsoft.AspNetCore.App.Runtime.\<rid>/\<aspnetcore version>** These files enable building self-contained applications. These directories contain symbolic links to files in (2), (5) and (6).

- (19) **runtime.\<rid>.Microsoft.DotNet.ILCompiler/\<runtime version>** These files enable building NativeAOT applications on the target platform. In .NET 9, enables building NativeAOT applications for the target platform as well. May be present in .NET 9 and newer.
- (20) **Microsoft.NETCore.App.Runtime.NativeAOT.\<rid>/\<runtime version>** These files enable building NativeAOT applications for the target platform. May be present in .NET 10 and newer.

- (21) **library-packs** contains NuGet package files. The SDK is configured to use this folder as a NuGet source. The list of NuGet packages provided by a .NET build is described below.

The folders marked with `(*)` are used by multiple packages. Some package formats (for example, `rpm`) require special handling of such folders. The package maintainer must take care of this.

Package files added to `library-packs` (21) can be packages that Microsoft does not distribute for the target platform. The files can also be packages that Microsoft distributes and for which `library-packs` provides a package that was built from source to meet platform package distribution guidelines. The following packages are included by the .NET build:

| Package name | Published by Microsoft | Needed for |
|----|----|----|
| `Microsoft.DotNet.ILCompiler.<version>.nupkg``Microsoft.NET.ILLink.Tasks.<version>.nupkg` | &#x2611; | NativeAOT |
