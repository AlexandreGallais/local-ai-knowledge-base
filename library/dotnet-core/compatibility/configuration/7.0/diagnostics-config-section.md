---
title: "Breaking change: System.diagnostics entry in app.config"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/configuration/7.0/diagnostics-config-section.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# System.diagnostics entry in app.config

For applications that have an *app.config* file, the `<configuration><configSections>` entry is no longer allowed to contain a `` entry. If present, you must remove the entry.

Having a `` entry throws the following runtime exception when the configuration system is first used:

> **ConfigurationErrorsException: Section or group name 'system.diagnostics' is already defined. Updates to this may only occur at the configuration level where it is defined.**

For example, the following *app.config* file contains the unnecessary entry:

```xml
<configuration>
 <configSections>
   <section name="system.diagnostics"
            type="System.Diagnostics.SystemDiagnosticsSection,
            System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=<example-value>"/>
 </configSections>
```

This break will likely only occur for apps that:

- Were migrated from .NET Framework to .NET.
- Had explicitly added `` to the *app.config* file to support manual reading of the `<system.diagnostics>` section.
- Were upgraded to .NET 7, which has an implicit `` entry.

## Previous behavior

Specifying `` was allowed and necessary if there was a later `<system.diagnostics>` configuration section like the following:

```xml
<configuration>
    <system.diagnostics>
```

However, the section wasn't automatically read. That's because `System.Diagnostics` did not yet support the feature to add listeners and configure other diagnostic features by processing that section.

.NET Framework, however, does support processing of a `<system.diagnostics>` section and has a `` entry in the *machine.config* file.

## New behavior

`System.Diagnostics` now supports reading the `<system.diagnostics>` section from the config file and adds an implicit `` entry. Having an explicit `` entry in the *app.config* file causes a duplicate entry, which throws `System.Configuration.ConfigurationErrorsException`.

## Version introduced

.NET 7 RC 1

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

To support a new feature where `System.Diagnostics` reads from the *app.config* file, we had to add the implicit `` element.

## Recommended action

Remove the unnecessary `` section.

## Affected APIs

N/A
