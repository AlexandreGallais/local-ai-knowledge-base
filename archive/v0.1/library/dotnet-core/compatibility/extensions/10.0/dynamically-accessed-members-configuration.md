---
title: "Breaking change: DynamicallyAccessedMembers annotation removed from trim-unsafe configuration APIs"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/extensions/10.0/dynamically-accessed-members-configuration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# DynamicallyAccessedMembers annotation removed from trim-unsafe configuration APIs

Certain APIs related to `Microsoft.Extensions.Configuration` that were marked as `System.Diagnostics.CodeAnalysis.RequiresUnreferencedCodeAttribute` were also annotated to preserve at least some of the necessary members when trimming. This made the API partially work when trimming, while still generating trimming warnings. The annotations are now removed completely. Users are encouraged to migrate to the source generator that works reliably with trimming.

## Version introduced

.NET 10

## Previous behavior

Previously, the affected APIs worked with some limited use cases while generating trimming warnings at publish time. These APIs were annotated to preserve at least some of the necessary members when trimming, making the API partially functional in trimmed scenarios.

## New behavior

Starting in .NET 10, the affected APIs now work with even more limited use cases while still generating trimming warnings at publish time.

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

The annotations were removed as part of an effort to remove uses of `System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All` from the product.

## Recommended action

Use the binding configuration source generator, which works reliably with trimming and provides a trim-safe alternative to these APIs.

## Affected APIs

- `Microsoft.Extensions.Configuration.ConfigurationBinder.Get(Microsoft.Extensions.Configuration.IConfiguration,System.Type,System.Action{Microsoft.Extensions.Configuration.BinderOptions})`
- `Microsoft.Extensions.Configuration.ConfigurationBinder.GetValue(Microsoft.Extensions.Configuration.IConfiguration,System.Type,System.String)`
- `Microsoft.Extensions.Configuration.ConfigurationBinder.GetValue(Microsoft.Extensions.Configuration.IConfiguration,System.Type,System.String,System.Object)`
- `Microsoft.Extensions.Configuration.ConfigurationBinder.GetValue``1(Microsoft.Extensions.Configuration.IConfiguration,System.String)`
- `Microsoft.Extensions.Configuration.ConfigurationBinder.GetValue``1(Microsoft.Extensions.Configuration.IConfiguration,System.String,``0)`
- `Microsoft.Extensions.Configuration.ConfigurationBinder.Get``1(Microsoft.Extensions.Configuration.IConfiguration)`
- `Microsoft.Extensions.Configuration.ConfigurationBinder.Get``1(Microsoft.Extensions.Configuration.IConfiguration,System.Action{Microsoft.Extensions.Configuration.BinderOptions})`
- `Microsoft.Extensions.Logging.Configuration.LoggerProviderOptions.RegisterProviderOptions``2(Microsoft.Extensions.DependencyInjection.IServiceCollection)`
- `Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddConsoleFormatter``2(Microsoft.Extensions.Logging.ILoggingBuilder)`
- `Microsoft.Extensions.Logging.ConsoleLoggerExtensions.AddConsoleFormatter``2(Microsoft.Extensions.Logging.ILoggingBuilder,System.Action{``1})`
- `Microsoft.Extensions.DependencyInjection.OptionsBuilderConfigurationExtensions.BindConfiguration``1(Microsoft.Extensions.Options.OptionsBuilder{``0},System.String,System.Action{Microsoft.Extensions.Configuration.BinderOptions})`
- `Microsoft.Extensions.DependencyInjection.OptionsBuilderConfigurationExtensions.Bind``1(Microsoft.Extensions.Options.OptionsBuilder{``0},Microsoft.Extensions.Configuration.IConfiguration)`
- `Microsoft.Extensions.DependencyInjection.OptionsBuilderConfigurationExtensions.Bind``1(Microsoft.Extensions.Options.OptionsBuilder{``0},Microsoft.Extensions.Configuration.IConfiguration,System.Action{Microsoft.Extensions.Configuration.BinderOptions})`
- `Microsoft.Extensions.DependencyInjection.OptionsConfigurationServiceCollectionExtensions.Configure*`
- `Microsoft.Extensions.Options.ConfigureFromConfigurationOptions`1`
- `Microsoft.Extensions.Options.NamedConfigureFromConfigurationOptions`1`
