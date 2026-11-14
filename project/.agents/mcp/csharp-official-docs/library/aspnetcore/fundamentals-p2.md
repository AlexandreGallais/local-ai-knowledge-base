---
title: "ASP.NET Core fundamentals overview (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core fundamentals overview (part 2 of 2)

## Make HTTP requests

An implementation of `System.Net.Http.IHttpClientFactory` is available for creating `System.Net.Http.HttpClient` instances. The factory:

* Provides a central location for naming and configuring logical `HttpClient` instances. For example, rely on a default client for most of the app's data requests with a web API and register a different configured client for accessing GitHub.
* Supports registration and chaining of multiple delegating handlers to build an outgoing request middleware pipeline. This pattern is similar to ASP.NET Core's inbound middleware pipeline. The pattern provides a mechanism to manage cross-cutting concerns for HTTP requests, including caching, error handling, serialization, and logging.
* Integrates with *Polly*, a popular third-party library for transient fault handling.
* Manages the pooling and lifetime of underlying `System.Net.Http.HttpClientHandler` instances to avoid common DNS problems that occur when managing `HttpClient` lifetimes manually.
* Adds a configurable logging experience via `Microsoft.Extensions.Logging.ILogger` for all requests sent through clients created by the factory.

For more information, see HTTP requests with IHttpClientFactory - ASP.NET Core and Call a web API from an ASP.NET Core Blazor app.

## Content root

The content root is the base path for:

* The executable hosting the app (`.exe`).
* Compiled assemblies that make up the app (`.dll`).
* Content files used by the app, such as Razor files (`.cshtml`, `.razor`), configuration files (`.json`, `.xml`), and data files (`.db`).
* The web root, which is typically the `wwwroot` folder.

During development, the content root defaults to the project's root directory. This directory is also the base path for both the app's content files and the web root. Specify a different content root by setting its path when building the host.

For more information, see .NET Generic Host in ASP.NET Core and Serve static files in ASP.NET Core apps.

## Web root

The web root is the base path for public, static resource files, such as stylesheets, JavaScript files, and images.

By default, static files are only served from the web root directory and its sub-directories. The web root path defaults to `{CONTENT ROOT}/wwwroot`, where the `{CONTENT ROOT}` placeholder is the content root. Specify a different web root by setting its path when building the host. You can also prevent publishing files in `wwwroot` with the `<Content>` project item in the app's project file.

In Razor `.cshtml` files, `~/` points to the web root. A path beginning with `~/` is referred to as a *virtual path*.

For more information, see .NET Generic Host in ASP.NET Core and Serve static files in ASP.NET Core apps.

## How to download a sample

Many of the articles and tutorials include links to sample code.

1. Download the ASP.NET repository zip file.
1. Unzip the `AspNetCore.Docs-main.zip` file.
1. To access an article's sample app in the unzipped repository, use the URL in the article's sample link to help you navigate to the sample's folder. Usually, an article's sample link appears at the top of the article with the link text *View or download sample code*.

To obtain a single sample app and only its last commit, use `git sparse-checkout`.

In the following example for the Blazor samples GitHub repository, the `git sparse-checkout set` command specifies the path to the sample folder:

* Replace the `{VERSION FOLDER}` placeholder with the version folder.
* Replace the `{SAMPLE FOLDER}` placeholder with the sample folder.

In a command shell, navigate to the folder where you would like to clone the sample. Execute the following commands in the command shell passing the version/sample folder path to the `git sparse-checkout set` command:

```cli
git clone --depth 1 --filter=blob:none https://github.com/dotnet/blazor-samples.git --sparse
cd blazor-samples
git sparse-checkout init --cone
git sparse-checkout set {VERSION FOLDER}/{SAMPLE FOLDER}
```

The following PowerShell example obtains the 10.0 Blazor Web App sample and places it in the user's documents folder using PowerShell's `~/documents` path for the change directory (`cd`) command:

```powershell
cd "~/documents"
git clone --depth 1 --filter=blob:none https://github.com/dotnet/blazor-samples.git --sparse
cd blazor-samples
git sparse-checkout init --cone
git sparse-checkout set 10.0/BlazorSample_BlazorWebApp
```

## Preprocessor directives in sample code

To demonstrate multiple scenarios, sample apps use the `#define` and `#if-#else/#elif-#endif` preprocessor directives to selectively compile and run different sections of sample code. For those samples that make use of this approach, set the `#define` directive at the top of the C# files to define the symbol associated with the scenario that you want to run. Some samples require defining the symbol at the top of multiple files in order to run a scenario.

For example, the following `#define` symbol list indicates that four scenarios are available (one scenario per symbol). The current sample configuration runs the `TemplateCode` scenario:

```csharp
#define TemplateCode // or LogFromMain or ExpandDefault or FilterInCode
```

To change the sample to run the `ExpandDefault` scenario, define the `ExpandDefault` symbol and leave the remaining symbols commented-out:

```csharp
#define ExpandDefault // TemplateCode or LogFromMain or FilterInCode
```

For more information on using C# preprocessor directives to selectively compile sections of code, see #define (C# Reference) and #if (C# Reference).

## Regions in sample code

Some sample apps contain sections of code surrounded by #region and #endregion C# directives. The documentation build system injects these regions into the rendered documentation topics.

Region names usually contain the word "snippet." The following example shows a region named `snippet_WebHostDefaults`:

```csharp
#region snippet_WebHostDefaults
Host.CreateDefaultBuilder(args)
    .ConfigureWebHostDefaults(webBuilder =>
    {
        webBuilder.UseStartup<Startup>();
    });
#endregion
```

The preceding C# code snippet is referenced in the topic's markdown file with the following line:

```md
[!code-csharp[](sample/SampleApp/Program.cs?name=snippet_WebHostDefaults)]
```

You may safely ignore or remove the `#region` and `#endregion` directives that surround the code. Don't alter the code within these directives if you plan to run the sample scenarios described in the topic.

For more information, see Contribute to the ASP.NET documentation: Code snippets.

## Document Object Model (DOM)

References to the *Document Object Model* throughout this documentation set use the abbreviation *DOM*.

For more information, see Introduction to the DOM (MDN documentation) and Level 1 Document Object Model Specification (W3C).

## Byte multiples

.NET byte sizes use metric prefixes for non-decimal multiples of bytes based on powers of 1024.

Name (abbreviation) | Size | Example
--- | --- | ---
Kilobyte (KB) | 1,024 bytes | 1 KB = 1,024 bytes
Megabyte (MB) | 1,0242 bytes | 1 MB = 1,048,576 bytes
Gigabyte (GB) | 1,0243 bytes | 1 GB = 1,073,741,824 bytes

## Support requests

Only documentation-related issues are appropriate for the `dotnet/AspNetCore.Docs` repository. ***For product support, don't open a documentation issue.*** Seek assistance through one or more of the following support channels:

* Stack Overflow for ASP.NET Core (tagged: `asp.net-core`)
* Stack Overflow for Blazor (tagged: `blazor`)
* General ASP.NET Core Slack Team
* Blazor Gitter

For a potential bug in the framework or product feedback, open an issue for the ASP.NET Core product unit at `dotnet/aspnetcore` issues. Bug reports usually require the following:

* **Clear explanation of the problem**: Follow the instructions in the GitHub issue template provided by the product unit when opening the issue.
* **Minimal repro project**: Place a project on GitHub for the product unit engineers to download and run. Cross-link the project into the issue's opening comment.

For a potential problem with an article, open a documentation issue. To open a documentation issue, use the **Open a documentation issue** feedback link at the bottom of the article. Metadata added to your issue provides tracking data and automatically pings the author of the article. If the subject was discussed with the product unit prior to opening the documentation issue, place a cross-link to the engineering issue in the documentation issue's opening comment.

GitHub issues for Blazor documentation are automatically marked for triage on the `Blazor.Docs` project (`dotnet/AspNetCore.Docs` GitHub repository). Please wait a short while for a response, especially over weekends and holidays. Usually, documentation authors respond within 24 hours on weekdays.

For problems or feedback on Visual Studio, use the **Report a Problem** or **Suggest a Feature** gestures from within Visual Studio, which open internal issues for Visual Studio. For more information, see Visual Studio Feedback.

For problems with Visual Studio Code, ask for support on community support forums. For bug reports and product feedback, open an issue on the `microsoft/vscode` GitHub repo.

## Related content

* Tutorials
  * Build a Blazor todo list app
  * Build a Blazor movie database app (Overview)
  * Tutorial: Create a Minimal API with ASP.NET Core
* ASP.NET Core Blazor fundamentals
