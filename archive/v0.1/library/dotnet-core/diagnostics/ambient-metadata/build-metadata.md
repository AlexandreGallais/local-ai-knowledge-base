---
title: "Ambient metadata about build"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/ambient-metadata/build-metadata.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Ambient metadata about build

The `Microsoft.Extensions.AmbientMetadata.Build` NuGet package provides functionality to capture build-related information and access it at runtime. During the build process, source generation captures details from CI/CD pipelines (such as build IDs, commit information, and branch names) and embeds them into the compiled application, making them available for traceability, troubleshooting, and deployment tracking.

## Why use build metadata

Build metadata provides context about the specific build that produced your running application, which can be used in various scenarios, such as:

- **Traceability**: Link runtime behavior directly to specific builds and source code commits.
- **Troubleshooting**: Identify which commit or build introduced issues in production.
- **Deployment tracking**: Know exactly what code version is running in each environment.
- **Audit and compliance**: Maintain detailed records of what code was deployed and when.
- **Telemetry enrichment**: Add build context to logs, metrics, and traces.

## How build metadata works

The build metadata component uses a source generator that captures build information during compilation. When you build your application, the generator reads MSBuild properties and generates code that embeds this information into your compiled assembly.

### Automatic capture in CI/CD

When building in supported CI/CD environments (Azure DevOps or GitHub Actions), environment variables are automatically captured through a transitive MSBuild props file. This file maps CI/CD environment variables to MSBuild properties that the source generator can read:

**Azure DevOps environment variables:**

- `BUILD_BUILDID` → `BuildMetadataAzureBuildId`
- `BUILD_BUILDNUMBER` → `BuildMetadataAzureBuildNumber`
- `BUILD_SOURCEBRANCHNAME` → `BuildMetadataAzureSourceBranchName`
- `BUILD_SOURCEVERSION` → `BuildMetadataAzureSourceVersion`
- `TF_BUILD` → `BuildMetadataIsAzureDevOps` (detection flag)

**GitHub Actions environment variables:**

- `GITHUB_RUN_ID` → `BuildMetadataGitHubRunId`
- `GITHUB_RUN_NUMBER` → `BuildMetadataGitHubRunNumber`
- `GITHUB_REF_NAME` → `BuildMetadataGitHubRefName`
- `GITHUB_SHA` → `BuildMetadataGitHubSha`

The source generator detects which CI/CD platform is active and uses the appropriate set of properties to populate the `Microsoft.Extensions.AmbientMetadata.BuildMetadata` class, which you can then inject as `IOptions<BuildMetadata>` and use at runtime.

### Manual configuration with MSBuild properties

If you're building outside of a supported CI/CD environment or want to override the automatic values, you can set MSBuild properties directly in your project file or pass them as command-line arguments.

## Install the package

To get started, install the 📦 Microsoft.Extensions.AmbientMetadata.Build NuGet package:

### .NET CLI

```dotnetcli
dotnet add package Microsoft.Extensions.AmbientMetadata.Build
```

Or, if you're using .NET 10+ SDK:

```dotnetcli
dotnet package add Microsoft.Extensions.AmbientMetadata.Build
```

### PackageReference

```xml
<PackageReference Include="Microsoft.Extensions.AmbientMetadata.Build"
                  Version="*" /> <!-- Adjust version -->
```

---

## Configure build metadata

The source generator included in the `Microsoft.Extensions.AmbientMetadata.Build` package generates the `UseBuildMetadata()` extension method that simplifies configuration. During the build process, it captures build information from MSBuild properties and generates code to make this data available at runtime.

### 1. Use UseBuildMetadata() method

The simplest way to configure build metadata is to use the source-generated `UseBuildMetadata()` extension method:

```csharp
var builder = Host.CreateApplicationBuilder(args);

builder.UseBuildMetadata();

var host = builder.Build();
await host.RunAsync();
```
The `UseBuildMetadata()` method:

- Adds the build metadata configuration source (with values captured during the build process)
- Registers the `Microsoft.Extensions.AmbientMetadata.BuildMetadata` type in dependency injection
- Uses the default configuration section `ambientmetadata:build`

### 2. Use AddBuildMetadata() methods

You can also configure build metadata using the `AddBuildMetadata()` extension methods. These methods do absolutely the same thing as `UseBuildMetadata()` above, but provide more flexibility if, for instance, you configure Host Configuration and Dependency Injection in different places of your source code.

```csharp
var builder = Host.CreateApplicationBuilder(args);
builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

// Add build metadata to configuration and services
builder.Configuration.AddBuildMetadata();
builder.Services.AddBuildMetadata(builder.Configuration.GetSection("ambientmetadata:build"));

var host = builder.Build();

var metadata = host.Services.GetRequiredService<IOptions<BuildMetadata>>().Value;
Console.WriteLine($"Build ID: {metadata.BuildId}");
Console.WriteLine($"Build Number: {metadata.BuildNumber}");
Console.WriteLine($"Branch: {metadata.SourceBranchName}");
Console.WriteLine($"Commit: {metadata.SourceVersion}");

await host.RunAsync();
```
### 3. Configure with MSBuild properties

You can set build metadata by defining MSBuild properties in your project file. This is useful when building outside of a CI/CD environment or when you want to provide custom values.

```xml
<PropertyGroup>
  <OutputType>Exe</OutputType>
  <TargetFramework>net10.0</TargetFramework>
  <ImplicitUsings>enable</ImplicitUsings>
  <Nullable>enable</Nullable>
  <BuildMetadataAzureBuildId>12345</BuildMetadataAzureBuildId>
  <BuildMetadataAzureBuildNumber>1.0.0-local.1</BuildMetadataAzureBuildNumber>
  <BuildMetadataAzureSourceBranchName>feature/my-feature</BuildMetadataAzureSourceBranchName>
  <BuildMetadataAzureSourceVersion>a1b2c3d4e5f6789012345678901234567890abcd</BuildMetadataAzureSourceVersion>
  <BuildMetadataIsAzureDevOps>true</BuildMetadataIsAzureDevOps>
```
> **Note:**
> The source generator uses `BuildMetadataIsAzureDevOps` to determine which set of properties to read (Azure DevOps or GitHub Actions). If you're manually setting properties, ensure you set this flag appropriately or use the GitHub properties if the flag is not set.

## Access build metadata

Once configured, you can inject and use the `Microsoft.Extensions.AmbientMetadata.BuildMetadata` type:

```csharp
﻿using Microsoft.Extensions.AmbientMetadata;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

var builder = Host.CreateApplicationBuilder(args);
builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

// Add build metadata to configuration and services
builder.Configuration.AddBuildMetadata();
builder.Services.AddBuildMetadata(builder.Configuration.GetSection("ambientmetadata:build"));

var host = builder.Build();

var metadata = host.Services.GetRequiredService<IOptions<BuildMetadata>>().Value;
Console.WriteLine($"Build ID: {metadata.BuildId}");
Console.WriteLine($"Build Number: {metadata.BuildNumber}");
Console.WriteLine($"Branch: {metadata.SourceBranchName}");
Console.WriteLine($"Commit: {metadata.SourceVersion}");

await host.RunAsync();
```
## Complete example

Here's a complete example showing how to set up and use build metadata:

**appsettings.json:**

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  },
  "ambientmetadata": {
    "build": {
      "BuildId": "12345",
      "BuildNumber": "1.0.0-ci.20260116.1",
      "SourceBranchName": "main",
      "SourceVersion": "a1b2c3d4e5f6789012345678901234567890abcd"
    }
  }
}
```
**Program.cs:**

```csharp
﻿using Microsoft.Extensions.AmbientMetadata;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

var builder = Host.CreateApplicationBuilder(args);

// Add build metadata to configuration and services
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
builder.Services.AddBuildMetadata(builder.Configuration.GetSection("ambientmetadata:build"));

// Register application service
builder.Services.AddSingleton<ApplicationService>();

var host = builder.Build();

// Use build metadata
var appService = host.Services.GetRequiredService<ApplicationService>();
appService.Start();

await host.RunAsync();

public class ApplicationService(
    ILogger<ApplicationService> logger,
    IOptions<BuildMetadata> buildMetadata)
{
    private readonly ILogger<ApplicationService> _logger = logger;
    private readonly BuildMetadata _buildMetadata = buildMetadata.Value;

    public void Start()
    {
        _logger.LogInformation(
            "Application started - Build: {BuildNumber}, Branch: {Branch}, Commit: {Commit}",
            _buildMetadata.BuildNumber,
            _buildMetadata.SourceBranchName,
            _buildMetadata.SourceVersion?[..7]);
    }
}
```
> **Note:**
> This example uses `appsettings.json` to configure build metadata properties *manually*. This is for demonstration purposes; in a real CI/CD scenario, these values would be captured automatically from respective environment variables, and you don't need to have them in `appsettings.json`.

### Output

The output includes build metadata in the log messages:

```
info: ApplicationService[0]
      Application started - Build: 1.0.0-ci.20260116.1, Branch: main, Commit: a1b2c3d
```

## Next steps

- Learn about application metadata for capturing application-level information
