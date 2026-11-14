---
title: "Port from .NET Framework to .NET"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/porting/framework-overview.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Overview of porting from .NET Framework to .NET

This article provides an overview of what you should consider when porting your code from .NET Framework to .NET (formerly named .NET Core). Porting to .NET from .NET Framework is relatively straightforward for many projects. The complexity of your projects dictates how much work you'll need to do after the initial upgrade of the project files.

Projects where the app model is available in .NET, such as libraries, console apps, and desktop apps, usually require little change. Projects that require a new app model, such as moving to ASP.NET Core from ASP.NET, require more work. Many patterns from the old app model have equivalents that can be used during the conversion.

## Windows desktop technologies

Many applications created for .NET Framework use a desktop technology such as Windows Forms or Windows Presentation Foundation (WPF). Both Windows Forms and WPF are available in .NET, but they remain Windows-only technologies.

Consider the following dependencies before you upgrade a Windows Forms or WPF application:

- Project files for .NET use a different format than .NET Framework.
- Your project might use an API that isn't available in .NET.
- Third-party controls and libraries might not have been ported to .NET and remain only available to .NET Framework.
- Your project uses a technology that is no longer available in .NET.

.NET uses the open-source versions of Windows Forms and WPF and includes enhancements over .NET Framework.

For tutorials on upgrading your desktop application to .NET, see one of the following articles:

- How to upgrade a WPF desktop app to .NET
- Upgrade .NET Framework Windows Forms apps to .NET

## Windows-specific APIs

Applications can still P/Invoke native libraries on platforms supported by .NET. This technology isn't limited to Windows. However, if the library you're referencing is Windows-specific, such as a _user32.dll_ or _kernel32.dll_, then the code only works on Windows. For each platform you want your app to run on, you have to either find platform-specific versions, or make your code generic enough to run on all platforms.

When you're porting an application from .NET Framework to .NET, your application probably used a library provided by .NET Framework. Many APIs that were available in .NET Framework weren't ported to .NET because they relied on Windows-specific technology, such as the Windows Registry or the GDI+ drawing model.

The **Windows Compatibility Pack** provides a large portion of the .NET Framework API surface to .NET and is provided via the Microsoft.Windows.Compatibility NuGet package.

For more information, see Use the Windows Compatibility Pack to port code to .NET.

## .NET Framework compatibility mode

The .NET Framework compatibility mode was introduced in .NET Standard 2.0. The compatibility mode allows .NET Standard and .NET projects to reference .NET Framework libraries as if they were compiled for the project's target framework. However, some .NET implementations might support a larger chunk of .NET Framework than others. For example, .NET Core 3.0 extends the .NET Framework compatibility mode to Windows Forms and WPF. Referencing .NET Framework libraries doesn't work for all projects, such as if the library uses WPF APIs, but it does unblock many porting scenarios. For more information, see the Analyze your dependencies to port code from .NET Framework to .NET.

Referencing .NET Framework libraries doesn't work in all cases, as it depends on which .NET Framework APIs were used and whether or not these APIs are supported by the project's target framework. Also, some of the .NET Framework APIs will only work on Windows. The .NET Framework compatibility mode unblocks many porting scenarios but you should test your projects to ensure that they also work at runtime. For more information, see the Analyze your dependencies to port code from .NET Framework to.

## Target framework changes in SDK-style projects

As previously mentioned, the project files for .NET use a different format than .NET Framework, known as the SDK-style project format. Even if you're not moving from .NET Framework to .NET, you should still upgrade the project file to the latest format. The way to specify a target framework is different in SDK-style projects. In .NET Framework, the `<TargetFrameworkVersion>` property is used with a moniker that specifies the version of .NET Framework. For example, .NET Framework 4.7.2 looks like the following snippet:

```xml
<PropertyGroup>
  <TargetFrameworkVersion>v4.7.2</TargetFrameworkVersion>
</PropertyGroup>
```

An SDK-style project uses a different property to identify the target framework, the `<TargetFramework>` property. When targeting .NET Framework, the moniker starts with `net` and ends with the version of .NET Framework without any periods. For example, the moniker to target .NET Framework 4.7.2 is `net472`:

```xml
<PropertyGroup>
  <TargetFramework>net472</TargetFramework>
</PropertyGroup>
```

For a list of all target monikers, see Target frameworks in SDK-style projects.

## Unavailable technologies

There are a few technologies in .NET Framework that don't exist in .NET:

- Application domains

  Creating other application domains isn't supported. For code isolation, use separate processes or containers as an alternative.

- Remoting

  Remoting is used for communicating across application domains, which are no longer supported. For simple communication across processes, consider inter-process communication (IPC) mechanisms as an alternative to remoting, such as the `System.IO.Pipes` class or the `System.IO.MemoryMappedFiles.MemoryMappedFile` class. For more complex scenarios, consider frameworks such as StreamJsonRpc or ASP.NET Core (either using gRPC or RESTful Web API services).

  Because remoting isn't supported, calls to `BeginInvoke()` and `EndInvoke()` on delegate objects throw `PlatformNotSupportedException`.

- Code access security (CAS)

  CAS was a sandboxing technique supported by .NET Framework but deprecated in .NET Framework 4.0. It was replaced by Security Transparency and it isn't supported in .NET. Instead, use security boundaries provided by the operating system, such as virtualization, containers, or user accounts.

- Security transparency

  Similar to CAS, the security transparency sandboxing technique is no longer recommended for .NET Framework applications and it isn't supported in .NET. Instead, use security boundaries provided by the operating system, such as virtualization, containers, or user accounts.

- `System.EnterpriseServices`

  `System.EnterpriseServices` (COM+) isn't supported in .NET.

- Windows Workflow Foundation (WF)

  WF isn't supported in .NET. For an alternative, see CoreWF.

For more information about these unsupported technologies, see .NET Framework technologies unavailable on .NET 6+.

## Cross-platform

.NET (formerly known as .NET Core) is designed to be cross-platform. If your code doesn't depend on Windows-specific technologies, it can run on other platforms such as macOS, Linux, and Android. Such code includes project types like:

- Libraries
- Console-based tools
- Automation
- ASP.NET sites

.NET Framework is a Windows-only component. When your code uses Windows-specific technologies or APIs, such as Windows Forms and WPF, the code can still run on .NET but it doesn't run on other operating systems.

It's possible that your library or console-based application can be used cross-platform without changing much. When you're porting to .NET, you might want to take this into consideration and test your application on other platforms.

## The future of .NET Standard

.NET Standard is a formal specification of .NET APIs that are available on multiple .NET implementations. The motivation behind .NET Standard was to establish greater uniformity in the .NET ecosystem. Starting with .NET 5, a different approach to establishing uniformity has been adopted, and this new approach eliminates the need for .NET Standard in many scenarios. For more information, see .NET 5+ and .NET Standard.

.NET Standard 2.0 was the last version to support .NET Framework.

## Tools to assist porting

Instead of manually porting an application from .NET Framework to .NET, you can use different tools to help automate some aspects of the upgrade. Porting a complex project is, in itself, a complex process. The tools might help in that journey.

Even if you use a tool to help port your application, you should review the Considerations when porting section in this article.

### GitHub Copilot modernization agent

GitHub Copilot modernization is a GitHub Copilot chat agent that helps you plan and upgrade projects to newer versions of .NET, migrate to Azure, update dependencies, and apply code fixes. Azure migration is powered by Application and code assessment for .NET

This chat agent supports the following upgrade paths:

- Upgrade projects from older .NET versions to the latest.
- Upgrade projects from .NET Framework to the latest version of .NET.
- Modernize your code base with new features.
- Migrate components and services to Azure.

It also works on various project types, such as:

- ASP.NET and related technologies such as MVC, Razor Pages, Web API
- Blazor
- Azure Functions
- Windows Presentation Foundation
- Windows Forms
- Class libraries
- Console apps

**When to use:**

Use GitHub Copilot modernization when you want an AI-powered, end-to-end experience to upgrade .NET Framework projects and dependencies to modern .NET—covering assessment, planning, remediation, and guidance for migrating applications to Azure.

### Application and code assessment for .NET

Azure Migrate application and code assessment for .NET provides code and application analysis, along with recommendations for planning cloud deployments. It helps you confidently run business-critical solutions in the cloud by offering a developer-focused assessment of your source code. The tool also provides recommendations and examples to optimize code and configurations for Azure, following industry best practices.

This tool is also used by the GitHub Copilot modernization for .NET experience.

**When to use:**

Use the Azure Migrate application and code assessment for .NET toolset for an assessment of and recommendations for migrating an existing code base to Azure. The Azure Migrate application and code assessment is essentially a subset of the GitHub Copilot modernization for .NET experience.

### .NET Upgrade Assistant

The .NET Upgrade Assistant is a command-line tool that can be run on different kinds of .NET Framework apps. It's designed to assist with upgrading .NET Framework apps to .NET. After running the tool, **in most cases the app will require more effort to complete the upgrade**. The tool includes the installation of analyzers that can assist with completing the upgrade. This tool works on the following types of .NET Framework applications:

- Windows Forms
- WPF
- ASP.NET MVC
- Console
- Class libraries

This tool uses the other tools listed in this article, such as **try-convert**, and guides the upgrade process. For more information about the tool, see Overview of the .NET Upgrade Assistant.

**When to use:**

Use when an AI powered solution like GitHub Copilot modernization isn't available.

### `try-convert`

The `try-convert` tool is a .NET global tool that can convert a project or entire solution to the .NET SDK, including moving desktop apps to .NET. However, this tool isn't recommended if your project has a complicated build process such as custom tasks, targets, or imports.

For more information, see the `try-convert` GitHub repository.

### Platform compatibility analyzer

The Platform compatibility analyzer analyzes whether or not you're using an API that throws a `System.PlatformNotSupportedException` at runtime. Although finding one of these APIs is unlikely if you're moving from .NET Framework 4.7.2 or higher, it's good to check. For more information about APIs that throw exceptions on .NET, see APIs that always throw exceptions on .NET Core.

For more information, see Platform compatibility analyzer.

## Considerations when porting

When porting your application to .NET, consider the following suggestions in order:

✔️ CONSIDER using the GitHub Copilot modernization to upgrade your projects. GitHub Copilot is powerful at identifying and fixing incompatibilities when porting. It automates most of the manual steps detailed in this article and gives you a great starting point for continuing your upgrade path.

✔️ CONSIDER examining your dependencies first. Your dependencies must target .NET, .NET Standard, or .NET Core.

✔️ DO upgrade from a NuGet _packages.config_ file to PackageReference settings in the project file. Use Visual Studio to convert the _package.config_ file.

✔️ CONSIDER upgrading to the latest project file format even if you can't yet port your app. .NET Framework projects use an outdated project format. Even though the latest project format, known as SDK-style projects, was created for .NET Core and beyond, the format also works with .NET Framework. Having your project file in the latest format gives you a good basis for porting your app in the future.

✔️ DO retarget your .NET Framework project to at least .NET Framework 4.7.2. This ensures the availability of the latest API alternatives for cases where .NET Standard doesn't support existing APIs.

✔️ CONSIDER targeting .NET 8, which is a long-term support (LTS) release.

✔️ DO target .NET 8+ for **Windows Forms and WPF** projects. .NET 8 and later versions contain many improvements for Desktop apps.

✔️ CONSIDER targeting .NET Standard 2.0 if you're upgrading a library that might also be used with .NET Framework projects. You can also multitarget your library, targeting both .NET Framework and .NET Standard.

✔️ DO add reference to the Microsoft.Windows.Compatibility NuGet package if, after migrating, you get errors of missing APIs. A large portion of the .NET Framework API surface is available to .NET via the NuGet package.

## See also

- What is GitHub Copilot modernization
- ASP.NET to ASP.NET Core migration
- Upgrade a WPF desktop app to .NET
- Upgrade a Windows Forms app to .NET
- .NET vs. .NET Framework for server apps
