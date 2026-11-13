---
title: "What's new in the SDK and tooling for .NET 10 (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-10/sdk.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in the SDK and tooling for .NET 10 (part 2 of 2)

## Native shell tab-completion scripts

The `dotnet` CLI now supports generating native tab-completion scripts for popular shells using the `dotnet completions script [SHELL]` command. Supported shells include `bash`, `fish`, `nushell`, `powershell`, and `zsh`. These scripts improve usability by providing faster and more integrated tab-completion features. For example, in PowerShell, you can enable completions by adding the following to your `$PROFILE`:

```powershell
dotnet completions script pwsh | Out-String | Invoke-Expression
```

## Console apps can natively create container images

Console apps can now create container images via `dotnet publish /t:PublishContainer` without requiring the `<EnableSdkContainerSupport>` property in the project file. This aligns console apps with the behavior of ASP.NET Core and Worker SDK apps.

## Explicitly control the image format of containers

A new `<ContainerImageFormat>` property allows you to explicitly set the format of container images to either `Docker` or `OCI`. This property overrides the default behavior, which depends on the base image format and whether the container is multi-architecture.

## Support for Microsoft.Testing.Platform (MTP) in `dotnet test`

Starting in .NET 10, `dotnet test` natively supports MTP. To enable this feature, add the following configuration to your *global.json* file:

```json
{
    "test": {
        "runner": "Microsoft.Testing.Platform"
    }
}
```

For more details, see Testing with `dotnet test`.
