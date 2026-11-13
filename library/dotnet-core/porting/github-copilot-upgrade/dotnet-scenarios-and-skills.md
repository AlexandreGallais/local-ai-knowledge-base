---
title: ".NET upgrade scenarios and skills (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/porting/github-copilot-upgrade/dotnet-scenarios-and-skills.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET scenarios and skills

GitHub Copilot upgrade for .NET helps you upgrade and modernize through _scenarios_ and _skills_:

- **Scenarios** are end-to-end managed workflows for major upgrade goals, such as upgrading from .NET Framework to .NET 10. Scenarios coordinate the full lifecycle: assessment, planning, and task-by-task execution.
- **Skills** are focused capabilities for specific upgrade tasks, such as converting EF6 to EF Core or replacing WCF with CoreWCF. Skills activate automatically when the agent encounters relevant code during an upgrade.

The agent supports both C# and Visual Basic projects.

> **Tip:**
> You don't need to memorize names. Describe what you want (_"upgrade to .NET 10"_, _"upgrade my EF6 code"_, _"replace Newtonsoft.Json"_) and the agent loads the right scenario and skills automatically. You can also ask: _"What can you help me with?"_

## Scenarios

Scenarios are the agent's top-level upgrade workflows. When you start a conversation, the agent identifies the best scenario for your goal and walks you through it step by step.

| Scenario | What it does | Example prompt |
|---|---|---|
| **.NET version upgrade** | Upgrades projects from any older .NET version to .NET 8 or later. | _"Upgrade my solution to .NET 10"_ |
| **.NET Framework version upgrade** | Upgrades .NET Framework projects to .NET Framework 4.8.1, without moving to modern .NET. | _"Upgrade to .NET Framework 4.8.1"_ |
| **SDK-style conversion** | Converts legacy project files to modern SDK-style format. | _"Convert my projects to SDK-style"_ |
| **Visual Studio extension SDK-style conversion** | Converts VSIX/VSSDK extension projects to SDK-style format. | _"Convert my VSIX project to SDK-style"_ |
| **NuGet package upgrade** | Upgrades specific NuGet packages and fixes the resulting breaking changes. | _"Upgrade Serilog to the latest version"_ |
| **Newtonsoft.Json upgrade** | Replaces Newtonsoft.Json with System.Text.Json across a solution. | _"Upgrade from Newtonsoft.Json"_ |
| **SqlClient upgrade** | Upgrades System.Data.SqlClient to Microsoft.Data.SqlClient. | _"Update SqlClient to the modern package"_ |
| **Azure Functions upgrade** | Upgrades Azure Functions from in-process to isolated worker model. | _"Upgrade my Azure Functions"_ |
| **Azure migration** | Starts an app modernization session to move an application to Azure services. | _"Migrate my app to Azure"_ |
| **ARM64 migration** | Adds ARM64 support so your app runs on Apple Silicon, Windows on ARM, and cloud ARM64 hardware. | _"Make my app run on ARM64"_ |
| **Semantic Kernel to Agents** | Upgrades from SK Agents to Microsoft Agent Framework. | _"Upgrade my SK agents"_ |
| **Aspire integration** | Adds Aspire support for inner-loop and Azure deployment. | _"Add Aspire to my app"_ |
| **Aspire version upgrade** | Upgrades existing Aspire applications to newer versions. | _"Upgrade my Aspire version"_ |
| **WebForms-to-Blazor upgrade** | Upgrades ASP.NET Web Forms applications to Blazor Server. | _"Upgrade my Web Forms app to Blazor"_ |
| **WinForms feature adoption** | Adopts modern Windows Forms features such as dark mode, async APIs, and MVVM. | _"Add dark mode to my WinForms app"_ |

For an end-to-end walkthrough, see Core concepts.

### .NET version upgrade

The most common scenario. Upgrades your projects from any older .NET variant to the latest:

| Source                       | Target                    |
|------------------------------|---------------------------|
| .NET Framework (any version) | .NET 8 or later           |
| .NET Framework (any version) | .NET Framework 4.8.1      |
| .NET Core 1.x–3.x            | .NET 8 or later           |
| .NET 5 or later              | .NET 8 or later           |

The agent analyzes your dependency graph, checks NuGet compatibility, identifies breaking changes, and creates a task plan using the best strategy for your solution (bottom-up, top-down, or all-at-once). If your projects need format conversions, the agent handles them automatically as part of the upgrade. To help you pick an appropriate target, the agent also explains release status and support lifecycle (LTS versus STS).

When the upgrade finishes, the agent can generate a report and suggest follow-on work, such as Aspire integration, an EF6-to-EF Core upgrade, WinForms feature adoption, or ARM64 migration.

### .NET Framework version upgrade

Upgrades .NET Framework projects to .NET Framework 4.8.1 (`net481`) and keeps them on full .NET Framework. Choose this scenario when you want the latest .NET Framework version but aren't ready to move to modern .NET. The agent preserves your existing project format, legacy or SDK-style, unless you explicitly ask for SDK-style conversion.

### SDK-style conversion

Converts legacy `.csproj`, `.vbproj`, and `.fsproj` files to the modern SDK-style format without changing target frameworks. The agent handles the conversion automatically during version upgrades. Run this scenario independently if needed.

### Visual Studio extension SDK-style conversion

Converts Visual Studio extension (VSIX/VSSDK) projects from the legacy project format to SDK-style. The agent handles VSSDK-specific concerns, including package references, the VSIX manifest, VSCT command tables, project capabilities, and the solution deploy markers that F5 debugging depends on.

### NuGet package upgrade

Upgrades one or more NuGet packages to a target version, or to the latest supported version, across a project, folder, solution, or the whole repository. The agent detects breaking API changes introduced by the new version and fixes the affected code.

### Newtonsoft.Json upgrade

Replaces `Newtonsoft.Json` with `System.Text.Json` across your solution. Handles custom converters, `[JsonProperty]` attributes, `JObject`/`JArray` usage, and serialization settings.

### SqlClient upgrade

Upgrades from `System.Data.SqlClient` to `Microsoft.Data.SqlClient`. Handles the `Encrypt=true` default behavior change and connection string differences.

### Azure Functions upgrade

Upgrades Azure Functions from the in-process hosting model to the isolated worker model with `Program.cs` and `HostApplicationBuilder`. Includes Application Insights upgrade.

### Azure migration

Starts an app modernization session that moves your application to Azure cloud services. Use this scenario when you ask to migrate to Azure, review Azure migration options, or begin app modernization work.

### ARM64 migration

Adds ARM64 support to your projects so they run on Apple Silicon, Windows on ARM, Linux and Alpine ARM64, and cloud ARM64 hardware such as AWS Graviton and Azure Ampere. The agent targets ARM64 runtime identifiers (`win-arm64`, `linux-arm64`, `linux-musl-arm64`, `osx-arm64`), fixes x86 and x64 assumptions, resolves missing ARM64 native NuGet assets, and guards x86 hardware intrinsics.

### Semantic Kernel to Microsoft Agent Framework

Upgrades from Semantic Kernel Agents (`ChatCompletionAgent`, `OpenAIAssistantAgent`) to Microsoft Agent Framework. Updates packages, namespaces, agent creation, tool registration, thread management, and invocation patterns.

### Aspire integration

Adds Aspire support to existing applications for inner-loop development and Azure deployment readiness. Sets up the Aspire CLI, checks target framework compatibility, maps communication between your services, and delegates AppHost wiring to the Aspire CLI agent.

### Aspire version upgrade

Upgrades existing Aspire applications to newer versions of Aspire. Handles package updates, configuration changes, and breaking API changes between Aspire versions. When your solution contains Aspire projects, the agent prefers this scenario for target framework upgrades too, because the Aspire version determines the required target framework.

### WebForms-to-Blazor upgrade

Upgrades ASP.NET Web Forms applications to Blazor Server. Converts Web Forms pages, controls, and code-behind to Blazor components, and handles project setup (side-by-side or in-place), the `Routes` component, `App.razor` interactive server render modes, and static asset migration.

### WinForms feature adoption

Adopts modern Windows Forms features in applications that already target .NET 8 or later, including dark mode (`Application.SetColorMode`), async APIs (`Control.InvokeAsync`, `Form.ShowAsync`, `Form.ShowDialogAsync`, and `TaskDialog.ShowDialogAsync`), and MVVM patterns. Dark mode and the async APIs require .NET 9 or later. In .NET 9, `Form.ShowAsync` and `Form.ShowDialogAsync` are experimental, so opt in by suppressing warning `WFO5002`. The agent often suggests this scenario after a .NET version upgrade completes.

## Upgrade skills: common

General-purpose upgrade skills that apply across project types.

| Skill | What it does |
|---|---|
| **Building projects** | Selects and runs the right build tool for your solution, then validates the build after each change. |
| **Converting to SDK-style** | Converts legacy project files to modern SDK-style format, including `packages.config` to `PackageReference`. Uses topological ordering for multi-project solutions. |
| **Converting to Central Package Management** | Converts per-project NuGet package versioning to centralized package management using `Directory.Packages.props`. |
| **Managing target frameworks** | Adds, removes, replaces, and upgrades target frameworks, including conversion between single-targeting and multi-targeting. |
| **Managing package references** | Adds, removes, and updates `PackageReference`, `ProjectReference`, and `FrameworkReference` items. Supports Central Package Management. |
| **Managing legacy .NET packages** | Manages NuGet packages in .NET Framework 4.x projects that use `packages.config` or `PackageReference` in non-SDK-style project files. |
| **Modifying project properties** | Updates MSBuild properties such as `TargetFramework`, `LangVersion`, `Nullable`, `OutputType`, and `TreatWarningsAsErrors` in project files and `Directory.Build.props`. |
| **Modernizing C# version** | Upgrades C# code to use newer language features. Batches mechanical changes through `dotnet format` and uses LLM judgment for semantic transformations. |
| **Upgrading C# nullable references** | Enables nullable reference types and systematically resolves all CS86xx warnings. Covers rollout strategies, annotation guidance, and framework-specific considerations. |

## Upgrade skills: data access

Skills for upgrading data access layers, including Entity Framework, LINQ to SQL, and SQL client libraries.

| Skill | What it does |
|---|---|
| **Upgrading EDMX to Code-First** | Converts EF6 Database-First and Model-First (`.edmx`) models to EF Core Code-First. Scaffolds entities from the database. |
| **Upgrading EF DbContext** | Moves `DbContext` registration from `Global.asax` or `Startup` into ASP.NET Core dependency injection. Handles both EF6 and EF Core patterns. |
| **Upgrading EF6 Code-First to EF Core** | Upgrades EF6 Code-First to EF Core. Swaps packages, updates namespaces, and replaces `EntityTypeConfiguration` and `DbModelBuilder`. |
| **Upgrading LINQ to SQL to EF Core** | Upgrades LINQ to SQL (`System.Data.Linq`) data access to Entity Framework Core, including DBML entity mapping and stored procedures. |
| **Upgrading to Microsoft.Data.SqlClient** | Upgrades from `System.Data.SqlClient`. Handles the `Encrypt=true` default change and connection string differences. |

## Upgrade skills: desktop

Skills for Windows Forms applications, used during upgrades and when you adopt modern WinForms features.

| Skill | What it does |
|---|---|
| **Building WinForms applications** | Structures WinForms projects with Designer-compatible patterns and separates `InitializeComponent` from application code. |
| **Creating WinForms custom controls** | Creates custom controls and user controls for modern WinForms, including custom rendering and composite controls. |
| **Managing WinForms async APIs** | Adopts `Control.InvokeAsync`, `Form.ShowAsync`, `Form.ShowDialogAsync`, and `TaskDialog.ShowDialogAsync` in place of `Control.Invoke` and `BeginInvoke`. |
| **Managing WinForms data binding** | Implements data binding with `BindingSource`, `INotifyPropertyChanged`, validation, and master-detail scenarios. |
| **Managing WinForms Designer code** | Governs `.Designer.cs` structure and `InitializeComponent` patterns. Fixes Designer load failures and round-trip issues. |
| **Managing WinForms high-DPI layout** | Builds DPI-aware layouts with `TableLayoutPanel` and `FlowLayoutPanel`, and configures Per Monitor V2 DPI awareness. |
| **Managing WinForms MVVM** | Implements MVVM in WinForms with view models, `INotifyPropertyChanged`, commands, and `DataContext`. |
| **Managing WinForms rendering** | Implements custom painting with GDI and GDI+, including `OnPaint` overrides and owner-drawn controls. |

## Upgrade skills: testing

| Skill | What it does |
|---|---|
| **Generating an upgrade test baseline** | Generates behavior-locking tests before an upgrade for projects with compatibility risks. Uses the external `dotnet-test` plugin. |
| **Managing dotnet-test installation** | Installs the external `dotnet-test` plugin when you select AI test generation but the test-generation agent isn't loaded. |
