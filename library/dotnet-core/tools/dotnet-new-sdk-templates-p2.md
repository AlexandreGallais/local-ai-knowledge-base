---
title: ".NET default templates for 'dotnet new' (part 2 of 4)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-new-sdk-templates.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET default templates for 'dotnet new' (part 2 of 4)

## Preinstalled templates

The following table shows the templates that come preinstalled with the .NET SDK. The default language for the template is shown inside brackets. To see any template-specific options, select the short name link.

| Templates                   | Short name                        | Language | Tags                    | Introduced |
|-----------------------------|-----------------------------------|----------|-------------------------|------------|
| ASP.NET Core API            | `webapiaot`         | [C#]     | Web/Web API/API/Service | 8.0       |
| ASP.NET Core API controller | `apicontroller` | [C#]     | Web/ASP.NET             | 8.0       |
| ASP.NET Core Empty          | `web`                     | [C#], F# | Web/Empty               | 1.0        |
| ASP.NET Core Web API | `webapi` | [C#], F# | Web/Web API/API/Service/WebAPI | 1.0 |
| ASP.NET Core Web App (Model-View-Controller) | `mvc` | [C#], F# | Web/MVC | 1.0 |
| ASP.NET Core Web App | `webapp, razor` | [C#] | Web/MVC/Razor Pages | 2.2, 2.0 |
| ASP.NET Core gRPC Service | `grpc` | [C#] | Web/gRPC | 3.0 |
| Blazor Web App | `blazor` | [C#] | Web/Blazor | 8.0.100 |
| Blazor WebAssembly Standalone App | `blazorwasm` | [C#] | Web/Blazor/WebAssembly/PWA | 3.1.300 |
| Class library | `classlib` | [C#], F#, VB | Common/Library | 1.0 |
| Console Application | `console` | [C#], F#, VB | Common/Console | 1.0 |
| Directory.Build.props file | `buildprops` |  | Config | 8.0.100 |
| Directory.Build.targets file | `buildtargets` |  | Config | 8.0.100 |
| Dotnet local tool manifest file | `tool-manifest` |  | Config | 3.0 |
| EditorConfig file | `editorconfig` |  | Config | 6.0 |
| .gitignore file | `gitignore` |  | Config | 3.0 |
| global.json file | `globaljson` |  | Config | 2.0 |
| MSTest Test Class | `mstest-class` | [C#], F#, VB | Test/MSTest | 1.0 |
| MSTest Test Project | `mstest` | [C#], F#, VB | Test/MSTest | 1.0 |
| NUnit 3 Test Item | `nunit-test` | [C#], F#, VB | Test/NUnit | 2.2 |
| NUnit 3 Test Project | `nunit` | [C#], F#, VB | Test/NUnit | 2.1.400 |
| NuGet Config | `nugetconfig` |  | Config | 1.0 |
| Protocol Buffer File | `proto` |  | Web/gRPC | 3.0 |
| Razor Class Library | `razorclasslib` | [C#] | Web/Razor/Library/Razor Class Library | 2.1 |
| Razor Component | `razorcomponent` | [C#] | Web/ASP.NET | 3.0 |
| Razor Page | `page` | [C#] | Web/ASP.NET | 2.0 |
| Solution File | `sln` |  | Solution | 1.0 |
| Web Config | `webconfig` |  | Config | 1.0 |
| Windows Forms (WinForms) Application | `winforms` | [C#], VB | Common/WinForms | 3.0 (5.0 for VB) |
| Windows Forms (WinForms) Class library | `winformslib` | [C#], VB | Common/WinForms | 3.0 (5.0 for VB) |
| Worker Service | `worker` | [C#] | Common/Worker/Web | 3.0 |
| WPF Application | `wpf` | [C#], VB | Common/WPF | 3.0 (5.0 for VB) |
| WPF Class library | `wpflib` | [C#], VB | Common/WPF | 3.0 (5.0 for VB) |
| WPF Custom Control Library | `wpfcustomcontrollib` | [C#], VB | Common/WPF | 3.0 (5.0 for VB) |
| WPF User Control Library | `wpfusercontrollib` | [C#], VB | Common/WPF | 3.0 (5.0 for VB) |
| xUnit Test Project | `xunit` | [C#], F#, VB | Test/xUnit | 1.0 |
| MVC ViewImports | `viewimports` | [C#] | Web/ASP.NET | 2.0 |
| MVC ViewStart | `viewstart` | [C#] | Web/ASP.NET | 2.0 |

### `buildprops`

Creates a *Directory.Build.props* file for customizing MSBuild properties for an entire folder tree. For more information, see Customize your build.

- **`--inherit`**

  If specified, adds an Import element for the closest *Directory.Build.props* file in the parent directory hierarchy. By default, *Directory.Build.props* files don't inherit from parent directories, so enabling this option allows you to build up a hierarchy of customizations folder-by-folder.

- **`--use-artifacts`**

  If specified, adds a property to enable the artifacts output layout. This is a common pattern for projects that produce build artifacts, such as NuGet packages, that are placed in a common folder structure. For more information, see Artifacts output layout.

***

### `buildtargets`

Creates a *Directory.Build.targets* file for customizing MSBuild targets and tasks for an entire folder tree. For more information, see Customize your build.

- **`--inherit`**

  If specified, adds an Import element for the closest *Directory.Build.targets* file in the parent directory hierarchy. By default, *Directory.Build.targets* files don't inherit from parent directories, so enabling this option allows you to build up a hierarchy of customizations folder-by-folder.

***

### `console`

- **`-f|--framework <FRAMEWORK>`**

  Specifies the framework to target.

  The following table lists the default values according to the SDK version you're using:

  | SDK version | Default value |
  |-------------|---------------|
  | 11.0        | `net11.0`     |
  | 10.0        | `net10.0`     |
  | 9.0         | `net9.0`      |
  | 8.0         | `net8.0`      |
  | 7.0         | `net7.0`      |

  The ability to create a project for an earlier TFM depends on having that version of the SDK installed. For example, if you have only the .NET 9 SDK installed, then the only value available for `--framework` is `net9.0`. If, for example, you install the .NET 8 SDK, the value `net8.0` becomes available for `--framework`. So by specifying `--framework net8.0` you can target .NET 8 even while running `dotnet new` in the .NET 9 SDK.

  Alternatively, to create a project that targets a framework earlier than the SDK that you're using, you might be able to do it by installing the NuGet package for the template. Common, web, and SPA project types use different packages per target framework moniker (TFM). For example, to create a `console` project that targets `netcoreapp1.0`, run `dotnet new install` on `Microsoft.DotNet.Common.ProjectTemplates.1.x`.

- **`--langVersion <VERSION_NUMBER>`**

  Sets the `LangVersion` property in the created project file. For example, use `--langVersion 7.3` to use C# 7.3. Not supported for F#.

  For a list of default C# versions, see Defaults.

- **`--no-restore`**

  If specified, doesn't execute an implicit restore during project creation.

- **`--use-program-main`**

  If specified, an explicit `Program` class and `Main` method will be used instead of top-level statements. Available since .NET SDK 6.0.300. Default value: `false`. Available only for C#.

***

### `classlib`

- **`-f|--framework <FRAMEWORK>`**

  Specifies the framework to target. Values: `net11.0`, `net10.0`, or `net9.0` to create a .NET Class Library, or `netstandard2.1` or `netstandard2.0` to create a .NET Standard Class Library. The default value for .NET SDK 11.0.x is `net11.0`.

  To create a project that targets a framework earlier than the SDK that you're using, see `--framework` for `console` projects earlier in this article.

- **`--langVersion <VERSION_NUMBER>`**

  Sets the `LangVersion` property in the created project file. For example, use `--langVersion 7.3` to use C# 7.3. Not supported for F#.

  For a list of default C# versions, see Defaults.

- **`--no-restore`**

  Doesn't execute an implicit restore during project creation.

***

###  `wpf`, `wpflib`, `wpfcustomcontrollib`, `wpfusercontrollib`

- **`-f|--framework <FRAMEWORK>`**

  Specifies the framework to target. For the .NET 11 SDK, the default value is `net11.0`.

- **`--langVersion <VERSION_NUMBER>`**

  Sets the `LangVersion` property in the created project file. For example, use `--langVersion 7.3` to use C# 7.3.

  For a list of default C# versions, see Defaults.

- **`--no-restore`**

  Doesn't execute an implicit restore during project creation.

***

###  `winforms`, `winformslib`

- **`--langVersion <VERSION_NUMBER>`**

  Sets the `LangVersion` property in the created project file. For example, use `--langVersion 7.3` to use C# 7.3.

  For a list of default C# versions, see Defaults.

- **`--no-restore`**

  Doesn't execute an implicit restore during project creation.

***

###  `worker`, `grpc`

- **`-f|--framework <FRAMEWORK>`**

  Specifies the framework to target. The default value for .NET 11 SDK is `net11.0`.

  To create a project that targets a framework earlier than the SDK that you're using, see `--framework` for `console` projects earlier in this article.

- **`--exclude-launch-settings`**

  Excludes *launchSettings.json* from the generated template.

- **`--no-restore`**

  Doesn't execute an implicit restore during project creation.

- **`--use-program-main`**

  If specified, an explicit `Program` class and `Main` method will be used instead of top-level statements. Available since .NET SDK 6.0.300. Default value: `false`.

***

###  `mstest`

- **`-f|--framework <FRAMEWORK>`**

  Specifies the framework to target.

  The following table lists the default values according to the SDK version number you're using:

  | SDK version | Default value |
  |-------------|---------------|
  | 11.0        | `net11.0`     |
  | 10.0        | `net10.0`     |
  | 9.0         | `net9.0`      |
  | 8.0         | `net8.0`      |

The ability to create a project for an earlier TFM depends on having that version of the SDK installed. For example, if you have only the .NET 9 SDK installed, then the only value available for `--framework` is `net9.0`. If you install, for example, the .NET 8 SDK, the value `net8.0` becomes available for `--framework`. So by specifying `--framework net8.0` you can target .NET 8 even while running `dotnet new` in the .NET 9 SDK.

- **`--no-restore`**

  Doesn't execute an implicit restore during project creation.

- **`--sdk`**

  Use MSTest.Sdk project style.

- **`--test-runner <TEST_RUNNER>`**

   The runner/platform for the test project. The possible values are:

  - `VSTest` - VSTest platform (Default).
  - `MSTest` - Microsoft.Testing.Platform (MTP).

- **`--coverage-tool <COVERAGE_TOOL>`**

  The coverage tool to use for the test project. The possible values are:

  - `Microsoft.CodeCoverage` - Microsoft Code Coverage (Default).
  - `coverlet` - coverlet coverage tool.

- **`--extensions-profile <EXTENSIONS_PROFILE>`**

  The SDK extensions profile when using MTP. The possible values are:

  - `Default` - Default extensions profile (Default).
  - `None` - No extensions are enabled.
  - `AllMicrosoft` - Enable all extensions shipped by Microsoft (including extensions with a restrictive license).

- **`--fixture <FIXTURE>`**

  The fixture kinds to include in the test project. The possible values are:

  - `None` - No fixture methods.
  - `AssemblyInitialize` - AssemblyInitialize fixture method.
  - `AssemblyCleanup` - AssemblyCleanup fixture method.
  - `ClassInitialize` - ClassInitialize fixture method.
  - `ClassCleanup` - ClassCleanup fixture method.
  - `TestInitialize` - TestInitialize fixture method.
  - `TestCleanup` - TestCleanup fixture method.

  Where multiple values are allowed.

- **`-p|--enable-pack`**

  Enables packaging for the project using dotnet pack.

***

###  `mstest-class`

- **`--fixture <FIXTURE>`**

  The fixture kinds to include in the test project. The possible values are:

  - `None` - No fixture methods.
  - `AssemblyInitialize` - AssemblyInitialize fixture method.
  - `AssemblyCleanup` - AssemblyCleanup fixture method.
  - `ClassInitialize` - ClassInitialize fixture method.
  - `ClassCleanup` - ClassCleanup fixture method.
  - `TestInitialize` - TestInitialize fixture method.
  - `TestCleanup` - TestCleanup fixture method.

  Where multiple values are allowed.

***

###  `xunit`

- **`-f|--framework <FRAMEWORK>`**

  Specifies the framework to target.

  The following table lists the default values according to the SDK version number you're using:

  | SDK version | Default value |
  |-------------|---------------|
  | 11.0        | `net11.0`     |
  | 10.0        | `net10.0`     |
  | 9.0         | `net9.0`      |
  | 8.0         | `net8.0`      |

The ability to create a project for an earlier TFM depends on having that version of the SDK installed. For example, if you have only the .NET 9 SDK installed, then the only value available for `--framework` is `net9.0`. If you install, for example, the .NET 8 SDK, the value `net8.0` becomes available for `--framework`. So by specifying `--framework net8.0` you can target .NET 8 even while running `dotnet new` in the .NET 9 SDK.

- **`-p|--enable-pack`**

  Enables packaging for the project using dotnet pack.

- **`--no-restore`**

  Doesn't execute an implicit restore during project creation.

***

###  `nunit`

- **`-f|--framework <FRAMEWORK>`**

  Specifies the framework to target.

  The following table lists the default values according to the SDK version number you're using:

  | SDK version | Default value |
  |-------------|---------------|
  | 11.0        | `net11.0`     |
  | 10.0        | `net10.0`     |
  | 9.0         | `net9.0`      |
  | 8.0         | `net8.0`      |

The ability to create a project for an earlier TFM depends on having that version of the SDK installed. For example, if you have only the .NET 9 SDK installed, then the only value available for `--framework` is `net9.0`. If you install, for example, the .NET 8 SDK, the value `net8.0` becomes available for `--framework`. So by specifying `--framework net8.0` you can target .NET 8 even while running `dotnet new` in the .NET 9 SDK.

- **`-p|--enable-pack`**

  Enables packaging for the project using dotnet pack.

- **`--no-restore`**

  Doesn't execute an implicit restore during project creation.

***

### `page`

- **`-na|--namespace <NAMESPACE_NAME>`**

  Namespace for the generated code. The default value is `MyApp.Namespace`.

- **`-np|--no-pagemodel`**

  Creates the page without a PageModel.

***

###  `viewimports`, `proto`

- **`-na|--namespace <NAMESPACE_NAME>`**

  Namespace for the generated code. The default value is `MyApp.Namespace`.

***
