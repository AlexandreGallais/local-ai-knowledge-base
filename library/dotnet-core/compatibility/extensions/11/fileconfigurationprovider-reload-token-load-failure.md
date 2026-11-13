---
title: "Breaking change: FileConfigurationProvider doesn't raise reload token after ignored load failure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/extensions/11/fileconfigurationprovider-reload-token-load-failure.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# FileConfigurationProvider doesn't raise reload token after ignored load failure

`Microsoft.Extensions.Configuration.FileConfigurationProvider` no longer calls `OnReload` or fires its reload token after `Microsoft.Extensions.Configuration.FileConfigurationProvider.Load` fails and its `Microsoft.Extensions.Configuration.FileConfigurationSource.OnLoadException` callback ignores the exception.

## Version introduced

.NET 11

## Previous behavior

Previously, after `Load` failed and the `OnLoadException` callback set `Microsoft.Extensions.Configuration.FileLoadExceptionContext.Ignore` to `true`, `Microsoft.Extensions.Configuration.FileConfigurationProvider` called `OnReload`. The reload token <example-value> by `Microsoft.Extensions.Configuration.IConfiguration.GetReloadToken` fired even though the provider didn't load data.

## New behavior

Starting in .NET 11, `Microsoft.Extensions.Configuration.FileConfigurationProvider` doesn'<example-value>'t fire because the provider didn't load data.

## Type of breaking change

This change is a behavioral change.

## Reason for change

To avoid a notification when no data changes, `Microsoft.Extensions.Configuration.FileConfigurationProvider` calls `OnReload` only after it loads data. This behavior resulted from a control-flow fix in dotnet/runtime#126093.

## Recommended action

Don'<example-value>'t load data. If your application must run code after an ignored load failure, call that code from your `OnLoadException` callback.

## Affected APIs

- `Microsoft.Extensions.Configuration.FileConfigurationProvider.Load`
- `Microsoft.Extensions.Configuration.Ini.IniConfigurationProvider.Load(System.IO.Stream)`
- `Microsoft.Extensions.Configuration.Json.JsonConfigurationProvider.Load(System.IO.Stream)`
- `Microsoft.Extensions.Configuration.Xml.XmlConfigurationProvider.Load(System.IO.Stream)`
