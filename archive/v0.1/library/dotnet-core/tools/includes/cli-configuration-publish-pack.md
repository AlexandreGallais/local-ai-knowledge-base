---
title: "cli-configuration-publish-pack"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/includes/cli-configuration-publish-pack.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# cli-configuration-publish-pack

**`-c|--configuration <CONFIGURATION>`**

Defines the build configuration. If you're developing with the .NET 8 SDK or a later version, the command uses the `Release` configuration by default for projects whose TargetFramework is set to `net8.0` or a later version. The default build configuration is `Debug` for earlier versions of the SDK and for earlier target frameworks. You can override the default in project settings or by using this option. For more information, see 'dotnet publish' uses Release configuration and 'dotnet pack' uses Release configuration.
