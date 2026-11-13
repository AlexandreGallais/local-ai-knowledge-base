---
title: "Breaking change - ToolCommandName is not set for non tool packages"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/sdk/10.0/toolcommandname-not-set.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# `ToolCommandName` not set for non-tool packages

The `ToolCommandName` property is no longer set automatically for all projects during build or package operations. It's now only set when `PackAsTool` is set to `true`, indicating that the project is a .NET tool package.

## Version introduced

.NET 10

## Previous behavior

Previously, the `ToolCommandName` property was always set during build or pack operations, regardless of whether the project was configured as a tool package.

## New behavior

Starting in .NET 10, the `ToolCommandName` property is only set when `PackAsTool` is set to `true`, indicating that the project is a .NET tool.

## Type of breaking change

This change can affect source compatibility.

## Reason for change

The `ToolCommandName` property doesn't make sense for non-tool projects. Setting it for all projects was unnecessary and could cause confusion about the project's purpose.

## Recommended action

If your project relies on the `ToolCommandName` property being set, you have two options:

- Set the property explicitly in your project file:

  ```xml
  <PropertyGroup>
    <ToolCommandName>your-command-name</ToolCommandName>
  </PropertyGroup>
  ```

- Convert your project to a .NET tool by setting `PackAsTool` to `true`:

  ```xml
  <PropertyGroup>
    <PackAsTool>true</PackAsTool>
  </PropertyGroup>
  ```

## Affected APIs

None.
