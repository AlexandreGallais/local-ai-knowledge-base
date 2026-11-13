---
title: "SingleFile rules (code analysis)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/deploying/single-file/warnings/overview.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# SingleFile rules

SingleFile rules for .NET.

> **Note:**
> Prior to .NET 6, this category was named `Publish`.

## In this section

|Rule|Description|
|----------|-----------------|
|IL3000 Avoid accessing Assembly file path when publishing as a single file|Avoid accessing Assembly file path when publishing as a single file|
|IL3001 Avoid accessing Assembly file path when publishing as a single file|Avoid accessing Assembly file path when publishing as a single file|
|IL3002 Avoid calling members annotated with 'RequiresAssemblyFilesAttribute' when publishing as a single file|Avoid calling members annotated with 'RequiresAssemblyFilesAttribute' when publishing as a single file|
|IL3003 'RequiresAssemblyFilesAttribute' annotations must match across all interface implementations or overrides.|'RequiresAssemblyFilesAttribute' annotations must match across all interface implementations or overrides.|
|IL3005 `RequiresAssemblyFilesAttribute` cannot be placed directly on application entry point.|`RequiresAssemblyFilesAttribute` cannot be placed directly on application entry point.|
